import { Prisma } from '@libs';
import { Post } from '@prisma/client';

export async function deletePost(id): Promise<Post> {
    const prisma = await Prisma.getInstance().prisma;

    return await prisma.post.delete({
        where: {
            id: id,
        },
    });
}
