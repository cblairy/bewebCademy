import express from 'express';

/** import des methode du controller */
import { getSessions , getSession, createSession, deleteSession, updateSession, getSessionByUserId, getSessionsExercices, getSessionsBadges, getSessionExercicesById, getSessionExercicesByBadgeId } from "../controllers/session_controller.js"



const router = express.Router();




router.get("/user/:id", getSessionByUserId)

router.get("/exercice", getSessionsExercices)
router.get("/exercice/:id", getSessionExercicesById)

router.get("/badge", getSessionsBadges)
router.get("/badge/exercice/:id", getSessionExercicesByBadgeId)

router.get('/', getSessions)
router.get('/:id', getSession);
router.post('/',createSession);
router.delete('/:id', deleteSession);
router.put('/:id', updateSession)

export default router;