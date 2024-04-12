import { Prisma } from '@libs';
import { Post } from '@prisma/client';

export async function getPost(id: number): Promise<Post> {
    const prisma = await Prisma.getInstance().prisma;

    return await prisma.post.findFirst({
        where: {
            id: id,
        },
        include: {
            category: true,
            user: {
                select: {
                    name: true,
                    id: true,
                },
            },
        },
    });
}
