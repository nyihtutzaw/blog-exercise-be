import { Request, Response } from 'express';
import { getAllCategories } from '@services';
import { ResponseType } from '@types';
import { Category } from '@prisma/client';

class CategoryController {
    async getAll(req: Request, res: Response<ResponseType<Category[]>>) {
        const data = await getAllCategories();
        return res.send({ message: 'All Categories', data });
    }
}

export default new CategoryController();
