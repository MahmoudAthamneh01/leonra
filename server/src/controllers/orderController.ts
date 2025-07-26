import { Request, Response } from 'express';
import prisma from '../models/prisma';

export async function listOrders(req: Request, res: Response) {
  const orders = await prisma.order.findMany({
    where: { userId: (req as any).user.id },
  });
  res.json(orders);
}

export async function getOrder(req: Request, res: Response) {
  const { id } = req.params;
  const order = await prisma.order.findFirst({
    where: { id: Number(id), userId: (req as any).user.id },
    include: { items: true },
  });
  if (!order) return res.status(404).json({ message: 'Not found' });
  res.json(order);
}

export async function createOrder(req: Request, res: Response) {
  const data = req.body;
  const order = await prisma.order.create({
    data: { ...data, userId: (req as any).user.id },
  });
  res.json(order);
}
