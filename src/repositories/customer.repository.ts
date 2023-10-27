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

export function createCustomer({ name, email, tax_id }){
    return prisma.customer.create({
        data: {
            name,
            email,
            cpf: tax_id
        }
    })
}

export function createOrder(customer_id: number, { stock_id, quantity }){
    return prisma.order.create({
      data: {
        customer_id,
        stock_id,
        quantity
      }
    })
}