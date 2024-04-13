import { User } from '@prisma/client';
import { Prisma } from '@libs';

export async function getUserById(id: number): Promise<User> {
    return await Prisma.getInstance().prisma.user.findFirst({
        where: {
            id: id,
        },
        include: {
            posts: true,
        },
    });
}
