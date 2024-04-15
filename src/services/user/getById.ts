import { User } from '@prisma/client';
import { Prisma } from '@libs';

export async function getUserById(id: number, hideDraft?: boolean): Promise<User> {
    const postQuery: { published?: boolean } = {};

    if (hideDraft) {
        postQuery.published = true;
    }
    return await Prisma.getInstance().prisma.user.findFirst({
        where: {
            id: id,
        },
        include: {
            posts: {
                where: postQuery,
                include: {
                    category: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
                orderBy: {
                    id: 'desc',
                },
            },
        },
    });
}
