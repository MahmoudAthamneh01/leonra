import { Request, Response, NextFunction } from 'express';
import prisma from '../models/prisma';

export async function getProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const data = req.body;
    const user = await prisma.user.update({ where: { id: userId }, data });
    res.json(user);
  } catch (err) {
    next(err);
  }
}
