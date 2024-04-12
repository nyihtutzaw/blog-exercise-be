import { Category } from '@prisma/client';
import { Prisma } from '@libs';

export async function getAllCategories(): Promise<Category[]> {
    return await Prisma.getInstance().prisma.category.findMany();
}
