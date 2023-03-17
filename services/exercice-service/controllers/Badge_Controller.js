import Badge from '../models/badge.js';
import { sendToQueue } from '../message_bus/message_bus.js';
import Exercice from '../models/exercice.js';
import log from '../log.js';

export const updateBadgeById = async (data) => {
    const newBadge = new Badge(data);
    try {
        await Exercice.updateMany({ "badges._id": data._id }, { "$set": { "badges": newBadge } })
        const exerciceUpdated = await Exercice.find({ "badges._id": data._id })
        exerciceUpdated.forEach(element => {
            sendToQueue("exercice_updated", element)
        });
        log("rabbit", "updateBadgeById",)
    } catch (error) {
        log("rabbit", "updateBadgeById", error.message)
    }
}

export const getExerciceByBadgeId = async(req, res) => {
    try {
        const exercices = await Exercice.find( { "badges._id": req.params.id } )
        log("success", "getExerciceByBadgeId",)
        res.status(200).json(exercices);
    }catch(error){
        log("rabbit", "getExerciceByBadgeId", error.message)
    }
}