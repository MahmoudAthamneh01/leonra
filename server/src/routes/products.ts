import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import asyncHandler from '../middleware/asyncHandler';
import { listProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { upload } from '../middleware/upload';

const router = Router();
router.get('/', asyncHandler(listProducts));
router.post(
  '/',
  authenticate(['tajira', 'admin']),
  upload.single('image'),
  asyncHandler(createProduct)
);
router.put(
  '/:id',
  authenticate(['tajira', 'admin']),
  upload.single('image'),
  asyncHandler(updateProduct)
);
router.delete(
  '/:id',
  authenticate(['tajira', 'admin']),
  asyncHandler(deleteProduct)
);

export default router;
