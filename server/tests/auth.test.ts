import request from 'supertest';
import app from '../src/app';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../src/models/prisma', () => ({
  __esModule: true,
  default: require('./prismaMock').default
}));
import prisma from './prismaMock';

jest.mock('../src/utils/email', () => ({
  __esModule: true,
  sendVerificationEmail: jest.fn()
}));

import { sendVerificationEmail } from '../src/utils/email';

describe('Auth APIs', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('registers a new user', async () => {
    (prisma.user.create as jest.Mock).mockResolvedValue({ id: 1, email: 't@example.com', password: 'h', role: 'buyer' });
    (prisma.verificationToken.create as jest.Mock).mockResolvedValue({});
    const res = await request(app).post('/api/auth/register').send({ email: 't@example.com', password: 'pass', role: 'buyer' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, email: 't@example.com' });
    expect(sendVerificationEmail).toHaveBeenCalled();
  });

  it('logs in a user', async () => {
    const hashed = await bcrypt.hash('pass', 10);
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1, email: 't@example.com', password: hashed, role: 'buyer' });
    const res = await request(app).post('/api/auth/login').send({ email: 't@example.com', password: 'pass' });
    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe('string');
    const payload: any = jwt.decode(res.body.token);
    expect(payload.id).toBe(1);
  });

  it('verifies email', async () => {
    (prisma.verificationToken.findUnique as jest.Mock).mockResolvedValue({ id: 1, token: 'abc', userId: 1, expires: new Date(Date.now() + 1000) });
    (prisma.user.update as jest.Mock).mockResolvedValue({});
    (prisma.verificationToken.delete as jest.Mock).mockResolvedValue({});
    const res = await request(app).get('/api/auth/verify/abc');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Email verified' });
  });
});
