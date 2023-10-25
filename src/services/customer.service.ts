import { notFoundError } from "../errors/notFound.error";
import { findAllCustomers, findCustomerWithOrderById } from "../repositories/customer.repository";

export async function getAllCustomers() {
    return await findAllCustomers()
}

export async function getCustomerWithOrderData(id: number) {
    const customer = await findCustomerWithOrderById(id)

    if(!customer) throw notFoundError('Customer not found')

    return customer
}