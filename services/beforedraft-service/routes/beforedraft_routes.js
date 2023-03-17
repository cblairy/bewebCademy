import express from 'express';
import { getBeforedrafts, getBeforedraft, createBeforedraft, deleteBeforedraft, updateBeforedraft, addUsertoPreSelect, addUsertoSelect, checkBeforedraft } from '../controllers/beforedraft_controller.js'

const router = express.Router();

router.get('/', getBeforedrafts);
router.get('/:id', getBeforedraft);
router.get('/draft/check', checkBeforedraft);
router.post('/', createBeforedraft);
router.put('/:id', updateBeforedraft);
router.put('/pre-select/:id', addUsertoPreSelect);
router.put('/select/:id', addUsertoSelect);
router.delete('/:id', deleteBeforedraft); 

export default router;