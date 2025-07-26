import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { listUsers, listComplaints } from '../controllers/adminController';

const router = Router();
router.get('/users', authenticate(['admin']), listUsers);
router.get('/complaints', authenticate(['admin']), listComplaints);

export default router;
