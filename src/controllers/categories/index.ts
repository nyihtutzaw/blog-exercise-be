import { Request, Response } from 'express';
import { getAllCategories } from '@services';
import { ResponseType } from '@types';
import { Category } from '@prisma/client';
import { BaseController } from '@controllers/baseController';

class CategoryController extends BaseController<Category[]> {
    async getAll(req: Request, res: Response<ResponseType<Category[]>>) {
        const data = await getAllCategories();

        if (data.length > 0) {
            super.handleCache(req.originalUrl, data);
        }

        return res.send({ message: 'All Categories', data });
    }
}

export default new CategoryController();
