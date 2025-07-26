import express from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { authenticate } from './auth';

process.env.JWT_SECRET = "testsecret";
describe('authenticate middleware', () => {
  const app = express();
  app.get('/protected', authenticate(), (_req, res) => {
    res.json({ ok: true });
  });

  const token = jwt.sign({ id: 1, role: 'buyer' }, 'testsecret');

  it('rejects missing token', async () => {
    const res = await request(app).get('/protected');
    expect(res.status).toBe(401);
  });

  it('accepts valid token', async () => {
    const res = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
