import { PrismaClient } from '@prisma/client';

export class Prisma {
    private static instance: Prisma;
    prisma: PrismaClient;

    private constructor() {
        this.prisma = new PrismaClient();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Prisma();
        }
        return this.instance;
    }
}
