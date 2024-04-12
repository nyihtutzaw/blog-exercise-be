import { Prisma } from '@libs';
import { Post } from '@prisma/client';

export async function getAllPosts(): Promise<Post[]> {
    return await Prisma.getInstance().prisma.post.findMany();
}
