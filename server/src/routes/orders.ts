import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { listOrders, createOrder } from '../controllers/orderController';

const router = Router();
router.get('/', authenticate(), listOrders);
router.post('/', authenticate(), createOrder);

export default router;
