import { Router } from 'express';
import { sendNotification } from '../controllers/notificationController';

const router = Router();
router.post('/', sendNotification);
export default router;
