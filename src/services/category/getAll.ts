import { Category, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllCategories(): Promise<Category[]> {
    return await prisma.category.findMany();
}
