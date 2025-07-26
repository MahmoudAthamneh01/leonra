import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import asyncHandler from '../middleware/asyncHandler';
import { createComplaint } from '../controllers/complaintController';

const router = Router();
router.post('/', authenticate(), asyncHandler(createComplaint));

export default router;
