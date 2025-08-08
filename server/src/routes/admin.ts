import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import asyncHandler from '../middleware/asyncHandler';
import { listUsers, listComplaints } from '../controllers/adminController';

const router = Router();
router.get('/users', authenticate(['admin']), asyncHandler(listUsers));
router.get('/complaints', authenticate(['admin']), asyncHandler(listComplaints));

export default router;
