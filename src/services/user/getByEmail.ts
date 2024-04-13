import { User } from '@prisma/client';
import { Prisma } from '@libs';

export async function getUserByEmail(email: string): Promise<User> {
    return await Prisma.getInstance().prisma.user.findFirst({
        where: {
            email: email,
        },
    });
}
