import { Request, Response } from 'express';
import { getAllPosts, getPost } from '@services';
import { PaginatedResponse, ResponseType } from '@types';
import { Post } from '@prisma/client';
import { BaseController } from '@controllers/baseController';

class PostController extends BaseController<PaginatedResponse<Post> | Post> {
    async getAll(req: Request, res: Response<ResponseType<PaginatedResponse<Post>>>) {
        const query = req.query;
        const data = await getAllPosts(query);

        if (data.data.length > 0) {
            super.handleCache(req.originalUrl, data);
        }

        return res.send({ message: 'All Posts', data });
    }

    async get(req: Request, res: Response<ResponseType<Post>>) {
        const { id = '0' } = req.params;

        try {
            const data = await getPost(parseInt(id));

            if (data) {
                super.handleCache(req.originalUrl, data);
            }

            return res.send({ message: 'All Posts', data });
        } catch (err) {
            return res.send({ message: 'Not Found' }).status(404);
        }
    }
}

export default new PostController();
