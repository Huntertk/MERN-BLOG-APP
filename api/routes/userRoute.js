import express from 'express';
import { text, updateUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', text)
router.put('/update/:userId', verifyToken, updateUser)

export default router;