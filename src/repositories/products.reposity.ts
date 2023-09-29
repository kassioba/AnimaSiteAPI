import { prisma } from "../database/database.connection";

export async function findProducts(){
    return prisma.product.findMany()
}

export async function findProductById(id: number) {
    return prisma.product.findUnique({
        where: { id }
    })
}