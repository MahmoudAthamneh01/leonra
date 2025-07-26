import { Request, Response } from 'express';
import prisma from '../models/prisma';

export async function listProducts(req: Request, res: Response) {
  const products = await prisma.product.findMany();
  res.json(products);
}

export async function createProduct(req: Request, res: Response) {
  const data = req.body;
  if (req.file) {
    (data as any).imageUrl = `/uploads/${req.file.filename}`;
  }
  const product = await prisma.product.create({ data });
  res.json(product);
}

export async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  if (req.file) {
    (data as any).imageUrl = `/uploads/${req.file.filename}`;
  }
  const product = await prisma.product.update({
    where: { id: Number(id) },
    data,
  });
  res.json(product);
}

export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.product.delete({ where: { id: Number(id) } });
  res.json({ id });
}
