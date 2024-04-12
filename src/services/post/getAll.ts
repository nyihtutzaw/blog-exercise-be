import { Post, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllPosts(): Promise<Post[]> {
    return await prisma.post.findMany();
}
