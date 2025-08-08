import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import asyncHandler from '../middleware/asyncHandler';
import { getProfile, updateProfile } from '../controllers/userController';

const router = Router();
router.get('/me', authenticate(), asyncHandler(getProfile));
router.put('/me', authenticate(), asyncHandler(updateProfile));

export default router;
