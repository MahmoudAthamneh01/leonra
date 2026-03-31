import request from 'supertest';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const mockPrisma = {
  user: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
  verificationToken: { create: jest.fn(), findUnique: jest.fn(), delete: jest.fn() },
  product: { create: jest.fn(), update: jest.fn() },
  order: { create: jest.fn(), findMany: jest.fn() }
};

jest.mock('../../models/prisma', () => ({ __esModule: true, default: mockPrisma }));
jest.mock('../../utils/email', () => ({
  __esModule: true,
  sendVerificationEmail: jest.fn()
}));

import app from '../../index';

describe('authController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('registers successfully', async () => {
    mockPrisma.user.create.mockResolvedValue({ id: 1, email: 'test@example.com', password: 'hash', role: 'buyer' });
    mockPrisma.verificationToken.create.mockResolvedValue({});
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'pass', role: 'buyer' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, email: 'test@example.com' });
  });

  it('logs in successfully', async () => {
    const hashed = await bcrypt.hash('pass', 10);
    mockPrisma.user.findUnique.mockResolvedValue({ id: 1, email: 'test@example.com', password: hashed, role: 'buyer' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'pass' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('verifies email', async () => {
    mockPrisma.verificationToken.findUnique.mockResolvedValue({ id: 1, token: 'abc', userId: 1, expires: new Date(Date.now() + 1000) });
    mockPrisma.user.update.mockResolvedValue({});
    mockPrisma.verificationToken.delete.mockResolvedValue({});
    const res = await request(app).get('/api/auth/verify/abc');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Email verified' });
  });
});
