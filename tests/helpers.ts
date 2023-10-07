import { prisma } from "config/database";

export async function cleanDB(){
    await prisma.address.deleteMany()
    await prisma.customer.deleteMany()
    await prisma.order.deleteMany()
    await prisma.product.deleteMany()
    await prisma.stock.deleteMany()
}