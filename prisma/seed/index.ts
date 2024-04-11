import { PrismaClient } from '@prisma/client';
import { seedUsers } from './users';
import { seedCategories } from './categories';
import { seedPosts } from './posts';

const prisma = new PrismaClient();
async function main() {
    await seedUsers();
    await seedCategories();
    await seedPosts();
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
