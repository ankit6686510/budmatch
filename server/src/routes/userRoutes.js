import express from 'express';
import { protect } from '../middleware/auth.js';
import { registerUser, loginUser, getProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);

export default router;