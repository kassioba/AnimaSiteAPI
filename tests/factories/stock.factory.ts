import { Size } from "@prisma/client";
import { prisma } from "config/database";

export async function createStock(product_id: number, size: Size) {
    return prisma.stock.create({
        data: {
            product_id,
            size,
            quantity: 5
        }
    })
}