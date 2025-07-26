import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import prisma from '../models/prisma';
import { sendVerificationEmail } from '../utils/email';

export async function register(req: Request, res: Response) {
  const { email, password, role, name, phone } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed, role, name, phone }
  });
  const token = uuid();
  await prisma.verificationToken.create({
    data: { token, userId: user.id, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) }
  });
  await sendVerificationEmail(email, token);
  res.json({ id: user.id, email: user.email });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  res.json({ token });
}

export async function verifyEmail(req: Request, res: Response) {
  const { token } = req.params;
  const record = await prisma.verificationToken.findUnique({ where: { token } });
  if (!record || record.expires < new Date()) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
  await prisma.user.update({ where: { id: record.userId }, data: { isVerified: true } });
  await prisma.verificationToken.delete({ where: { id: record.id } });
  res.json({ message: 'Email verified' });
}
