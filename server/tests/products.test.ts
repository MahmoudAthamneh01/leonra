import request from 'supertest';
import app from '../src/app';

jest.mock('../src/middleware/auth', () => ({
  __esModule: true,
  authenticate: () => (req: any, _res: any, next: any) => {
    req.user = { id: 1, role: 'tajira' };
    next();
  }
}));

jest.mock('../src/models/prisma', () => ({
  __esModule: true,
  default: require('./prismaMock').default
}));
import prisma from './prismaMock';

describe('Product APIs', () => {
  beforeEach(() => jest.resetAllMocks());

  it('lists products', async () => {
    (prisma.product.findMany as jest.Mock).mockResolvedValue([{ id: 1, name: 'P' }]);
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: 'P' }]);
  });

  it('creates product', async () => {
    (prisma.product.create as jest.Mock).mockResolvedValue({ id: 2, name: 'New', tajiraId: 1 });
    const res = await request(app)
      .post('/api/products')
      .send({ name: 'New' })
      .set('Authorization', 'Bearer token');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 2, name: 'New', tajiraId: 1 });
  });
});
