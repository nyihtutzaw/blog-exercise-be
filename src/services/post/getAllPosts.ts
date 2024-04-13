import { Prisma } from '@libs';
import { Post } from '@prisma/client';
import { PaginatedResponse } from '@types';

export async function getAllPosts(query): Promise<PaginatedResponse<Post>> {
    const prisma = await Prisma.getInstance().prisma;

    const filters: { categoryId?: number; published: boolean } = {
        published: true,
    };
    const limit = 20;

    const paginateQuery = { skip: 0, take: limit };

    if (query.page && query.page > 1) {
        paginateQuery.skip = parseInt(query.page) * limit;
    }

    if (query.categoryId) {
        filters.categoryId = parseInt(query.categoryId);
    }

    const totalCount = await prisma.post.count({ where: filters });
    const pages = totalCount / limit - 1;

    const data = await prisma.post.findMany({
        where: filters,
        ...paginateQuery,
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
            publishedAt: 'desc',
        },
    });

    return {
        data,
        pages: pages < 0 ? 1 : pages,
        totalCount,
    };
}
