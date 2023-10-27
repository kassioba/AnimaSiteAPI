import { createAddress } from "../repositories/address.repository";
import { notFoundError } from "../errors/notFound.error";
import { createCustomer, createOrder, findAllCustomers, findCustomerWithOrderById } from "../repositories/customer.repository";
import { Address, Cart, Customer } from "../protocols/Payment";

export async function getAllCustomers() {
    return await findAllCustomers()
}

export async function getCustomerWithOrderData(id: number) {
    const customer = await findCustomerWithOrderById(id)

    if(!customer) throw notFoundError('Customer not found')

    return customer
}

export async function storeCustomerData(customerData: Customer, address: Address, cart: Cart[]){
    const customer = await createCustomer(customerData)

    await createAddress(customer.id, address)

    for (const item of cart){
        await createOrder(customer.id, item)
    }
}