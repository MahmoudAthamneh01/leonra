import request from 'supertest';
import app from '../src/app';

jest.mock('../src/middleware/auth', () => ({
  __esModule: true,
  authenticate: () => (req: any, _res: any, next: any) => {
    req.user = { id: 1, role: 'buyer' };
    next();
  }
}));

jest.mock('../src/models/prisma', () => ({
  __esModule: true,
  default: require('./prismaMock').default
}));
import prisma from './prismaMock';

describe('Order APIs', () => {
  beforeEach(() => jest.resetAllMocks());

  it('lists orders', async () => {
    (prisma.order.findMany as jest.Mock).mockResolvedValue([{ id: 1 }]);
    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', 'Bearer token');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 1 }]);
    expect(prisma.order.findMany).toHaveBeenCalledWith({ where: { userId: 1 } });
  });

  it('creates order', async () => {
    (prisma.order.create as jest.Mock).mockResolvedValue({ id: 2, userId: 1 });
    const res = await request(app)
      .post('/api/orders')
      .send({ total: 10 })
      .set('Authorization', 'Bearer token');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 2, userId: 1 });
  });
});
