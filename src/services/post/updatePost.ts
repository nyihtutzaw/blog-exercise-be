import { Prisma } from '@libs';
import { Post } from '@prisma/client';

export async function updatePost(id, data): Promise<Post> {
    const prisma = await Prisma.getInstance().prisma;

    return await prisma.post.update({
        data: data,
        where: {
            id: id,
        },
    });
}
