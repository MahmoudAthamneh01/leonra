import { Router } from 'express';
import { register, login, verifyEmail } from '../controllers/authController';
import validate from '../middleware/validate';
import { registerValidation, loginValidation } from '../validators/authValidators';

const router = Router();
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/verify/:token', verifyEmail);

export default router;
