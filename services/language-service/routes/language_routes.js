import express, { Router } from 'express'

//* import des methodes du controller */
import { getLanguages, getLanguage, updateLanguage, createLanguage, deleteLanguage } from '../controllers/language_controller.js'

//* Créer un router pour le language */
const router = express.Router()

//* Créer les routes pour le language */
router.get('/', getLanguages);
router.get('/:id', getLanguage);
router.post('/', createLanguage);
router.put('/:id', updateLanguage);
router.delete('/:id', deleteLanguage);

export default router;