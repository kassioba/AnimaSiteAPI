import { prisma } from "../database/database.connection";

export function findStockByProductId(productId: number){
    return prisma.stock.findMany({
        where: { product_id: productId }
    })
}