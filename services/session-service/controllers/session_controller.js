import Session from '../models/session.js'
import { sendToQueue } from '../message_bus/message_bus.js'
import Badge from '../models/badge.js'
import Exercice from '../models/exercice.js'
import log from '../log.js'

export const getSessions = async (req, res) => {
    try {
        const sessions = await Session.find();
        log("success", "getSessions",)
        res.status(200).json(sessions);
    }
    catch (error) {
        log("error", "getSessions", error.message)
        res.status(404).json({ message: error.message })
    }
}

export const getSession = async (req, res) => {
    try {
        const sessions = await Session.findById(req.params.id);
        log("success", "getSession",)
        res.status(200).json(sessions);
    }
    catch (error) {
        log("error", "getSession", error.message)
        res.status(404).json({ message: error.message })
    }
}

export const createSession = async (req, res) => {
    let body = req.body
    const newSession = new Session(body)
    const session = await Session.findOne({ fk_user_id: body.user.id });
    if (session) {
        log("error", "createSession", "user already have a session")
        res.status(404).json({ message: "user already have a session" })
    } else {
        try {
            await newSession.save();
            log("success", "createSession",)
            res.status(201).json(newSession);
        }
        catch (error) {
            log("error", "createSession", error.message)
            res.status(404).json({ message: error.message })
        }
    }
}

export const deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
        sendToQueue('session_deleted', session)
        log("rabbit", "deleteSession",)
        try {
            await Session.findByIdAndDelete(req.params.id)
            log("success", "deleteSession",)
            res.status(200).json(`${req.params.id} : supprimé`);
        }
        catch (error) {
            log("error", "deleteSession", error.message)
            res.status(404).json({ message: error.message })
        }
    } catch (error) {
        log("rabbit", "deleteSession", error.message)
        res.status(404).json({ message: error.message })
    }
}

export const updateSession = async (req, res) => {
    const body = req.body.formData
    const newSession = new Session(body)
    try {
        await Session.findByIdAndUpdate(req.params.id, newSession)
        log("success", "updateSession",)
        res.status(201).json(`${req.params.id}: modifié`)

    } catch (error) {
        log("error", "updateSession", error.message)
        res.status(404).json({ message: error.message })
    }
}


export const getSessionByUserId = async (req, res) => {
    const userId = req.params.id
    try {
        // find session by userobjet id
        const session = await Session.findOne({ "user.id": userId });
        log("success", "getSessionByUserId",)
        res.status(200).json(session);
    }
    catch (error) {
        log("error", "getSessionByUserId", error.message)
        res.status(404).json({ message: error.message })
    }
}



export const getSessionExercicesByBadgeId = async (req, res) => {
    try {
        const session = await Session.find({ "badges.$[]._id": req.params.id }, 'exercices')
        log("success", "getSessionExercicesByBadgeId",)
        res.status(200).json(session);
    }
    catch (error) {
        log("error", "getSessionExercicesByBadgeId", error.message)
        res.status(404).json({ message: error.message })
    }
}

export const getSessionExercicesById = async (req, res) => {
    try {
        const sessions = await Session.find({ _id: req.params.id }, { exercices: 1, _id: 0 });
        log("success", "getSessionExercicesById",)
        res.status(200).json(sessions);
    }
    catch (error) {
        log("error", "getSessionExercicesById", error.message)
        res.status(404).json({ message: error.message })
    }
}

export const getSessionsBadges = async (req, res) => {
    try {
        const sessions = await Session.find({}, { badges: 1, _id: 0 });
        log("success", "getSessionsBadges",)
        res.status(200).json(sessions);
    }
    catch (error) {
        log("error", "getSessionsBadges", error.message)
        res.status(404).json({ message: error.message })
    }
}


export const getSessionsExercices = async (req, res) => {
    try {
        const sessions = await Session.find({}, { exercices: 1, _id: 0 });
        log("success", "getSessionsExercices",)
        res.status(200).json(sessions);
    }
    catch (error) {
        log("error", "getSessionsExercices", error.message)
        res.status(404).json({ message: error.message })
    }
}

export const updateBadgeById = async (data) => {
    const newBadge = new Badge(data);
    try {
        // update badge in exercice in session 
        await Session.updateOne(
            { "exercices.badges._id": data._id },
            { $set: { "exercices.$[elem].badges.$[elem2]": newBadge } },
            { arrayFilters: [{ "elem.badges._id": data._id }, { "elem2._id": data._id }] }
        )
        // update badge in session
        await Session.updateOne(
            { "badges._id": data._id },
            { $set: { "badges.$[elem]": newBadge } },
            { arrayFilters: [{ "elem._id": data._id }] }
        )
        log("rabbit", "updateBadgeById",)
    }
    catch (error) {
        log("rabbit", "updateBadgeById", error.message)
    }


}

export const updateExerciceById = async (data) => {
    const newExercice = new Exercice(data);
    try {
        await Session.updateMany({ "exercices.$[]._id": data._id }, { "$set": { "exercices.$[element]": newExercice } }, { "arrayFilters": [{ "element._id": data._id }] })
        log("rabbit", "updateExerciceById",)
    }
    catch (error) {
        log("rabbit", "updateExerciceById", error.message)
    }


}


