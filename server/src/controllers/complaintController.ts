import { Request, Response } from 'express';
import prisma from '../models/prisma';

export async function createComplaint(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const { title, detail } = req.body;
  const complaint = await prisma.complaint.create({
    data: { title, detail, userId }
  });
  res.json(complaint);
}
