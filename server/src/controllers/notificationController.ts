import { Request, Response } from 'express';

export async function sendNotification(req: Request, res: Response) {
  const { userId, message } = req.body;
  // Placeholder logic for sending notifications
  console.log(`Notify ${userId}: ${message}`);
  res.json({ status: 'sent' });
}
