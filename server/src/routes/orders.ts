import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  listOrders,
  createOrder,
  getOrder,
} from '../controllers/orderController';

const router = Router();
router.get('/', authenticate(), listOrders);
router.get('/:id', authenticate(), getOrder);
router.post('/', authenticate(), createOrder);

export default router;
