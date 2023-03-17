import express from 'express';
import { getBeforedrafts, getBeforedraft, createBeforedraft, deleteBeforedraft, updateBeforedraft } from '../controllers/beforedraft_controller.js'

const router = express.Router();

router.get('/', getBeforedrafts);
router.get('/:id', getBeforedraft);
router.post('/', createBeforedraft);
router.put('/:id', updateBeforedraft);
router.delete('/:id', deleteBeforedraft); 

export default router;