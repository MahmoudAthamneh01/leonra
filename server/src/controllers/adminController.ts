import { Request, Response } from 'express';
import prisma from '../models/prisma';

export async function listUsers(req: Request, res: Response) {
  const users = await prisma.user.findMany();
  res.json(users);
}

export async function listComplaints(req: Request, res: Response) {
  const complaints = await prisma.complaint.findMany();
  res.json(complaints);
}
