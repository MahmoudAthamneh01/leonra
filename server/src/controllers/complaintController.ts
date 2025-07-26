import { Request, Response, NextFunction } from 'express';
import prisma from '../models/prisma';

export async function createComplaint(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const { title, detail } = req.body;
    const complaint = await prisma.complaint.create({
      data: { title, detail, userId }
    });
    res.json(complaint);
  } catch (err) {
    next(err);
  }
}
