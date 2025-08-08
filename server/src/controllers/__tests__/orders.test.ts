import request from 'supertest';
import app from '../../index';
import jwt from 'jsonwebtoken';

jest.mock('../../models/prisma', () => ({
  __esModule: true,
  default: {
    order: {
      findMany: jest.fn(),
      create: jest.fn()
    }
  }
}));

const prisma = require('../../models/prisma').default;

describe('Order Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('lists orders for user', async () => {
    prisma.order.findMany.mockResolvedValue([{ id: 1 }]);
    jest.spyOn(jwt, 'verify').mockReturnValue({ id: 2, role: 'buyer' } as any);

    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', 'Bearer token');

    expect(res.status).toBe(200);
    expect(prisma.order.findMany).toHaveBeenCalledWith({ where: { userId: 2 } });
    expect(res.body).toEqual([{ id: 1 }]);
  });

  test('creates an order', async () => {
    prisma.order.create.mockResolvedValue({ id: 1 });
    jest.spyOn(jwt, 'verify').mockReturnValue({ id: 2, role: 'buyer' } as any);

    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', 'Bearer token')
      .send({ total: 10 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1 });
  });
});
