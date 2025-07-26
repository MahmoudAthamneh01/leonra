import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { createComplaint } from '../controllers/complaintController';

const router = Router();
router.post('/', authenticate(), createComplaint);

export default router;
