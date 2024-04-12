import { Request, Response } from 'express';
import { getAllPosts } from '@services';
import { ResponseType } from '@types';
import { Post } from '@prisma/client';

class PostController {
    async getAll(req: Request, res: Response<ResponseType<Post[]>>) {
        const data = await getAllPosts();
        return res.send({ message: 'All Posts', data });
    }
}

export default new PostController();
