import { PrismaClient, User } from "@prisma/client";
const crypto = require("crypto")
const prisma = new PrismaClient();


export async function seedUsers() {
    const users: User[] = [
        {
            id: 1,
            name: "David",
            email: "david@gmail.com",
            password: "12345"
        },
        {
            id: 2,
            name: "Frank",
            email: "frank@gmail.com",
            password: "12345"
        }
    ]

    for (const user of users) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = crypto.pbkdf2Sync(user.password, salt,
            1000, 64, `sha512`).toString(`hex`);
        const userByEmail = await prisma.user.findFirst({ where: { email: user.email } });
        if (!userByEmail)
            await prisma.user.create({
                data: { ...user, password: hashedPassword },
        });
    }




}