import { Request, Response, NextFunction } from 'express';
import prisma from '../models/prisma';

export async function listOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await prisma.order.findMany({ where: { userId: (req as any).user.id } });
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body;
    const order = await prisma.order.create({ data: { ...data, userId: (req as any).user.id } });
    res.json(order);
  } catch (err) {
    next(err);
  }
}
