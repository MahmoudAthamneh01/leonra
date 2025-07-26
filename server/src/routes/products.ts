import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { listProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { upload } from '../middleware/upload';

const router = Router();
router.get('/', listProducts);
router.post('/', authenticate(['tajira','admin']), upload.single('image'), createProduct);
router.put('/:id', authenticate(['tajira','admin']), upload.single('image'), updateProduct);
router.delete('/:id', authenticate(['tajira','admin']), deleteProduct);

export default router;
