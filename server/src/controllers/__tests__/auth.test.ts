import request from 'supertest';
import app from '../../index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../../models/prisma', () => ({
  __esModule: true,
  default: {
    user: {
      create: jest.fn(),
      findUnique: jest.fn()
    },
    verificationToken: {
      create: jest.fn()
    }
  }
}));

jest.mock('../../utils/email', () => ({
  __esModule: true,
  sendVerificationEmail: jest.fn()
}));

const prisma = require('../../models/prisma').default;
const sendVerificationEmail = require('../../utils/email').sendVerificationEmail;

describe('Auth Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('registers a user', async () => {
    prisma.user.create.mockResolvedValue({ id: 1, email: 'test@example.com' });
    prisma.verificationToken.create.mockResolvedValue({});

    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'pass', role: 'buyer' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, email: 'test@example.com' });
    expect(sendVerificationEmail).toHaveBeenCalled();
  });

  test('logs in a user', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'hashed',
      role: 'buyer'
    });
    jest.spyOn(bcrypt as any, 'compare').mockResolvedValue(true);
    jest.spyOn(jwt as any, 'sign').mockReturnValue('token123');

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'pass' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ token: 'token123' });
  });
});
