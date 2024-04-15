import { Post, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedPosts(numberOfPosts = 100) {
    const categories = await prisma.category.findMany({});
    const users = await prisma.user.findMany({});

    const posts: Post[] = [];

    for (let i = 0; i < numberOfPosts; i++) {
        const randomCategoryId =
            categories.length > 0 ? categories[Math.floor(Math.random() * categories.length)].id : null;
        const randomUserId = users.length > 0 ? users[Math.floor(Math.random() * users.length)].id : null;

        posts.push({
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(2, '<p>'),
            shortContent: faker.lorem.sentence(100),
            categoryId: randomCategoryId || 1,
            userId: randomUserId || 1,
            published: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            publishedAt: faker.date.past(),
            id: i + 1,
        });
    }

    for (const post of posts) {
        const postByTitle = await prisma.post.findFirst({ where: { id: post.id } });
        if (!postByTitle) {
            await prisma.post.create({ data: post });
        }
    }
}
