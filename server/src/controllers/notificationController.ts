import { Request, Response } from 'express';
import prisma from '../models/prisma';
import { sendSMS } from '../utils/sms';
import { sendEmail } from '../utils/email';

export async function sendNotification(req: Request, res: Response) {
  const { userId, message } = req.body;
  const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (user.email) {
    await sendEmail(user.email, message);
  }

  // Assume phone stored in a custom field
  // @ts-ignore
  if (user.phone) {
    await sendSMS(user.phone, message);
  }
  res.json({ status: 'sent' });
}
