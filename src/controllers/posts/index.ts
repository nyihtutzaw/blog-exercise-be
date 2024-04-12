import { Request, Response } from 'express';
import { getAllPosts } from '@services';
import { ResponseType } from '@types';
import { Post } from '@prisma/client';
import { BaseController } from '@controllers/baseController';

class PostController extends BaseController<Post[]> {
    async getAll(req: Request, res: Response<ResponseType<Post[]>>) {
        const data = await getAllPosts();

        if (data.length > 0) {
            super.handleCache(req.originalUrl, data);
        }

        return res.send({ message: 'All Posts', data });
    }
}

export default new PostController();
