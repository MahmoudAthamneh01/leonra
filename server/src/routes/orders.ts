import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import asyncHandler from '../middleware/asyncHandler';
import { listOrders, createOrder } from '../controllers/orderController';

const router = Router();
router.get('/', authenticate(), asyncHandler(listOrders));
router.post('/', authenticate(), asyncHandler(createOrder));

export default router;
