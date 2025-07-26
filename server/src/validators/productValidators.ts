import { body } from 'express-validator';

export const productValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('description').optional().isString()
];
