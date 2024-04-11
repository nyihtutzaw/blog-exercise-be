import { Category, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function seedCategories() {
    const categories: Category[] = [
        {
            id: 1,
            name: "Travel",

        },
        {
            id: 2,
            name: "Sport",

        },
        {
            id: 2,
            name: "Work",

        },
        {
            id: 3,
            name: "Culture",

        },
        {
            id: 4,
            name: "Movie",

        },
        {
            id: 5,
            name: "Music",

        },
    ]

    for (const category of categories) {

        const categoryByID = await prisma.category.findFirst({ where: { id: category.id } })
        if (!categoryByID)
            await prisma.category.create({ data: category });
    }




}