import { User } from '@prisma/client';
import { Prisma } from '@libs';
import * as bcrypt from 'bcryptjs';

export async function createUser(body): Promise<User> {
    const { name, email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);
    return await Prisma.getInstance().prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
}
