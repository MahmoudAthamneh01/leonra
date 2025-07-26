import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import csurf from 'csurf';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import adminRoutes from './routes/admin';
import complaintRoutes from './routes/complaints';

dotenv.config();
const app = express();
app.use(cors());
app.use(helmet());
app.use(csurf());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/complaints', complaintRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }
  res.status(500).json({ message: 'Unexpected error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
