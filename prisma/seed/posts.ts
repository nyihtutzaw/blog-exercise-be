import { Post, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedPosts() {
    const posts: Post[] = [
        {
            id: 1,
            title: 'Travel',
            content:
                "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
            categoryId: 1,
            userId: 1,
            published: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            title: 'Travel 2',
            content:
                "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
            categoryId: 1,
            userId: 1,
            published: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    for (const post of posts) {
        const postByID = await prisma.post.findFirst({ where: { id: post.id } });
        if (!postByID) await prisma.post.create({ data: post });
    }
}
