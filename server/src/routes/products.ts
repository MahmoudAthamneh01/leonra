import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { listProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController';

const router = Router();
router.get('/', listProducts);
router.post('/', authenticate(['tajira','admin']), createProduct);
router.put('/:id', authenticate(['tajira','admin']), updateProduct);
router.delete('/:id', authenticate(['tajira','admin']), deleteProduct);

export default router;
