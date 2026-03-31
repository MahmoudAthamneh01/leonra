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

const token = jwt.sign({ id: 1, role: 'tajira' }, 'secret');

describe('productController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates product', async () => {
    mockPrisma.product.create.mockResolvedValue({ id: 1, name: 'Test', description: 'Desc', price: 10, imageUrl: null, tajiraId: 1 });
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test', description: 'Desc', price: 10, tajiraId: 1 });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Test');
  });

  it('updates product', async () => {
    mockPrisma.product.update.mockResolvedValue({ id: 1, name: 'Updated', description: 'Desc', price: 10, imageUrl: null, tajiraId: 1 });
    const res = await request(app)
      .put('/api/products/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated');
  });
});
