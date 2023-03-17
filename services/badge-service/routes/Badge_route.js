import express from 'express';

// import des méthodes du controller 
import { getBadges, getBadge, createBadge, updateBadge, deleteBadge } from '../controllers/Badge_controller.js';

// créer un router pour le badge 
const router = express.Router();

// Créer les routes pour le badge
router.get('/', getBadges);
router.get('/:id', getBadge);
router.post('/', createBadge);
router.put('/:id', updateBadge)
router.delete('/:id', deleteBadge);

export default router;