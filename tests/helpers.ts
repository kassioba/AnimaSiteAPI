import { prisma } from "config/database";

export async function cleanDB(){
    await prisma.order.deleteMany()
    await prisma.stock.deleteMany()
    await prisma.address.deleteMany()
    await prisma.customer.deleteMany()
    await prisma.product.deleteMany()
}