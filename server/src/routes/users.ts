import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getProfile, updateProfile } from '../controllers/userController';

const router = Router();
router.get('/me', authenticate(), getProfile);
router.put('/me', authenticate(), updateProfile);

export default router;
