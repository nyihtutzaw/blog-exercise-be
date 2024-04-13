import { body } from 'express-validator';

export const createPostSchema = [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('categoryId').notEmpty().withMessage('Category is required'),
];
