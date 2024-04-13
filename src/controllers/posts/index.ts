import { Request, Response } from 'express';
import { getAllPosts, getPost, createPost, updatePost, deletePost } from '@services';
import { PaginatedResponse, ResponseType } from '@types';
import { Post } from '@prisma/client';
import { BaseController } from '@controllers/baseController';
import { logger } from '@libs';

class PostController extends BaseController<PaginatedResponse<Post> | Post> {
    async getAll(req: Request, res: Response<ResponseType<PaginatedResponse<Post>>>) {
        const query = req.query;
        const data = await getAllPosts(query);

        if (data.data.length > 0) {
            super.handleCache(req.originalUrl, data);
        }

        return res.json({ message: 'All Posts', data });
    }

    async get(req: Request, res: Response<ResponseType<Post>>) {
        const { id = '0' } = req.params;

        try {
            const data = await getPost(parseInt(id));

            if (data) {
                super.handleCache(req.originalUrl, data);
            }

            return res.json({ message: 'All Posts', data });
        } catch (err) {
            return res.json({ message: 'Not Found' }).status(404);
        }
    }

    async store(req: Request, res: Response<ResponseType<Post>>) {
        try {
            const postData = req.body;
            const data = await createPost({ ...postData, userId: req.user.id });
            return res.json({ message: 'Post Created', data });
        } catch (err) {
            logger.error(err);
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }

    async update(req: Request, res: Response<ResponseType<Post>>) {
        const { id = '0' } = req.params;
        const updateData = req.body;

        try {
            const postByID = await getPost(parseInt(id));

            if (!postByID) {
                return res.json({ message: 'Post Not Found' }).status(404);
            }

            if (postByID.userId !== req.user.id) {
                return res.json({ message: 'Unauthorized' }).status(405);
            }

            const data = await updatePost(parseInt(id), updateData);

            return res.json({ message: 'Post Updated', data });
        } catch (err) {
            logger.error(err);
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }

    async delete(req: Request, res: Response<ResponseType<string>>) {
        const { id = '0' } = req.params;

        try {
            const postByID = await getPost(parseInt(id));

            if (!postByID) {
                return res.json({ message: 'Post Not Found' }).status(404);
            }

            if (postByID.userId !== req.user.id) {
                return res.json({ message: 'Unauthorized' }).status(405);
            }

            await deletePost(parseInt(id));
            return res.json({ message: 'Post Deleted' });
        } catch (err) {
            logger.error(err);
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
}

export default new PostController();
