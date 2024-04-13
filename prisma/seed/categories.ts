import { Category, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCategories() {
    const categories: Category[] = [
        {
            id: 1,
            name: 'Clothing',
        },
        {
            id: 2,
            name: 'Sport',
        },
        {
            id: 3,
            name: 'Housing',
        },
        {
            id: 4,
            name: 'Jobs',
        },
        {
            id: 5,
            name: 'Study',
        },
        {
            id: 6,
            name: 'Travel',
        },
        {
            id: 7,
            name: 'Food',
        },
        {
            id: 8,
            name: 'Movie',
        },
        {
            id: 9,
            name: 'Music',
        },
        {
            id: 10,
            name: 'Drink',
        },
    ];

    for (const category of categories) {
        const categoryByID = await prisma.category.findFirst({
            where: { id: category.id },
        });
        if (!categoryByID) {
            await prisma.category.create({ data: category });
        }
    }
}
