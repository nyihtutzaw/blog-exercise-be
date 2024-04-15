import { Prisma } from '@libs';
import { Post } from '@prisma/client';

export async function updatePost(id, data): Promise<Post> {
    const prisma = await Prisma.getInstance().prisma;

    return await prisma.post.update({
        data: {
            title: data.title,
            content: data.content,
            shortContent: data.shortContent,
            categoryId: data.categoryId,
            userId: data.userId,
            published: data.published,
        },
        where: {
            id: id,
        },
    });
}
