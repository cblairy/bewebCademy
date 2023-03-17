import express from 'express';
import { getExerciceByBadgeId } from '../controllers/Badge_Controller.js';

// import des méthodes du controller
import { getExercices, getExercice, createExercice, deleteExercice, updateExercice } from "../controllers/Exercice_Controller.js";

// créer un router pour l'exercice
const router = express.Router();

//route pour prendre les exercice ayant le meme badge
router.get('/badge/:id', getExerciceByBadgeId)

// créer les route pour l'exercice
router.get('/', getExercices);
router.get('/:id', getExercice);
router.post('/', createExercice);
router.delete('/:id', deleteExercice);
router.put('/:id', updateExercice);


export default router;