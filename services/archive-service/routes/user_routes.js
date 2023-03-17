import express from 'express';
import { getUser, getUsers } from "../controllers/user_controller.js"

const router = express.Router();

router.get('/user', getUsers);
router.get('/user/:email', getUser)

export default router;