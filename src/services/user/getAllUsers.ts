import { Prisma } from '@libs';
import { User } from '@prisma/client';

export async function getAllUsers(): Promise<User[]> {
    return await Prisma.getInstance().prisma.user.findMany({
        include: {
            _count: {
                select: {
                    posts: {
                        where: { published: true },
                    },
                },
            },
        },
        orderBy: {
            posts: {
                _count: 'desc',
            },
        },
    });
}
