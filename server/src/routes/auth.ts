import { Router } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import { register, login, verifyEmail } from '../controllers/authController';

const router = Router();
router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.get('/verify/:token', asyncHandler(verifyEmail));

export default router;
