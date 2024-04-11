import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function seedUsers() {
    const users: User[] = [
        {
            id: 1,
            name: 'David',
            email: 'david@gmail.com',
            password: '12345',
        },
        {
            id: 2,
            name: 'Frank',
            email: 'frank@gmail.com',
            password: '12345',
        },
    ];

    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const userByEmail = await prisma.user.findFirst({ where: { email: user.email } });
        if (!userByEmail)
            await prisma.user.create({
                data: { ...user, password: hashedPassword },
            });
    }
}
