import { Category, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedCategories() {
    const categories: Category[] = [];

    for (let i = 0; i < 20; i++) {
        categories.push({
            id: i + 1,
            name: faker.commerce.department(),
        });
    }

    for (const category of categories) {
        const categoryByID = await prisma.category.findFirst({
            where: { id: category.id },
        });
        if (!categoryByID) {
            await prisma.category.create({ data: category });
        }
    }
}
