import express from 'express';
import { getSessions } from '../controllers/session_controller.js';

const router = express.Router();

router.get('/', getSessions);

export default router;