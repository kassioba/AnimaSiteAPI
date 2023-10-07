import { prisma } from "../config/database";

export function findStockByProductId(productId: number){
    return prisma.stock.findMany({
        where: { product_id: productId }
    })
}

export function findStockById(id: number){
    return prisma.stock.findUnique({
        where: { id }
    })
}

export function findStocksById(ids: number[]){
    return prisma.stock.findMany({
        where: { id: { in: ids } },
        select: {
            id: true,
            quantity: true
        }
    })
}

export function updateStockQuantity(id: number, quantity: number){
    return prisma.stock.update({
        where: { id },
        data: { quantity }
    })
}