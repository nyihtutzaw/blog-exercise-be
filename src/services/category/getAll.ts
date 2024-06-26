import { Category } from '@prisma/client';
import { Prisma } from '@libs';

export async function getAllCategories(): Promise<Category[]> {
    return await Prisma.getInstance().prisma.category.findMany({
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
