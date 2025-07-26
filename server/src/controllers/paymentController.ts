import { Request, Response } from 'express';

export async function createPayment(req: Request, res: Response) {
  const { amount, currency } = req.body;
  // placeholder for integration with payment provider
  const fakeSession = { id: 'sess_123', amount, currency };
  res.json({ session: fakeSession });
}
