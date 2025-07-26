import { Request, Response, NextFunction } from 'express';
import prisma from '../models/prisma';

export async function listUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function listComplaints(req: Request, res: Response, next: NextFunction) {
  try {
    const complaints = await prisma.complaint.findMany();
    res.json(complaints);
  } catch (err) {
    next(err);
  }
}
