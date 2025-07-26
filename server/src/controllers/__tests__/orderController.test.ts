import request from 'supertest';
import jwt from 'jsonwebtoken';

const mockPrisma = {
  user: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
  verificationToken: { create: jest.fn(), findUnique: jest.fn(), delete: jest.fn() },
  product: { create: jest.fn(), update: jest.fn() },
  order: { create: jest.fn(), findMany: jest.fn() }
};

jest.mock('../../models/prisma', () => ({ __esModule: true, default: mockPrisma }));

import app from '../../index';

const token = jwt.sign({ id: 1, role: 'buyer' }, 'secret');

describe('orderController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates order', async () => {
    mockPrisma.order.create.mockResolvedValue({ id: 1, userId: 1, total: 10 });
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ total: 10 });
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('fetches orders', async () => {
    mockPrisma.order.findMany.mockResolvedValue([{ id: 1, userId: 1, total: 10 }]);
    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });
});
