import request from 'supertest';
import app from '../../index';
import jwt from 'jsonwebtoken';

jest.mock('../../models/prisma', () => ({
  __esModule: true,
  default: {
    product: {
      findMany: jest.fn(),
      create: jest.fn()
    }
  }
}));

const prisma = require('../../models/prisma').default;

describe('Product Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('lists products', async () => {
    prisma.product.findMany.mockResolvedValue([{ id: 1, name: 'p1' }]);

    const res = await request(app).get('/api/products');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: 'p1' }]);
  });

  test('creates a product with auth', async () => {
    prisma.product.create.mockResolvedValue({ id: 1, name: 'p1' });
    jest.spyOn(jwt, 'verify').mockReturnValue({ id: 1, role: 'admin' } as any);

    const res = await request(app)
      .post('/api/products')
      .set('Authorization', 'Bearer token')
      .send({ name: 'p1', description: 'd', price: 10 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, name: 'p1' });
  });
});
