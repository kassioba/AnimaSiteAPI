import { prisma } from "../config/database";

export function findAllCustomers(){
    return prisma.customer.findMany()
}

export function findCustomerWithOrderById(id: number){
    return prisma.customer.findUnique({
        where: { id },
        include: {
            Order: {
                include: {
                    Stock: {
                        include: {
                            Product: true
                        }
                    }
                }
            },
            Address: true
        }
    })
}