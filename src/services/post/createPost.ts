import { Prisma } from '@libs';
import { Post } from '@prisma/client';

export async function createPost(data): Promise<Post> {
    const prisma = await Prisma.getInstance().prisma;

    return await prisma.post.create({
        data: {
            title: data.title,
            content: data.content,
            shortContent: data.shortContent,
            categoryId: data.categoryId,
            userId: data.userId,
            published: data.published,
        },
    });
}
