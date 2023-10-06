import { createAddress, createCustomer, createOrder, postPaymentData } from "../repositories/payment.repository";
import { Address, Cart, Customer, Payment } from "../protocols/Payment";
import { externalRequestFailedError } from "../errors/externalRequestFailed.error";
import { cardDeclinedError } from "../errors/cardDeclined.error";
import { findStockById } from "../repositories/stock.repository";
import { notFoundError } from "../errors/notFound.error";


export async function createPayment(body: Payment) {
    const { cart } = body
    
    const total = calculateTotalInBRLCents(body)

    const stockCheck = await checkStock(cart)

    if(stockCheck.length) throw notFoundError(`Product(s) ${stockCheck.join(', ')} out of stock`)

    // Criptografar cartão
    const payment = await postPaymentData(body, total)
    // Criptografar cartão

    if(payment.error_messages || !payment) {
        const errors = payment.error_messages?.map((e: any) => `${e.parameter_name} ${e.description}`)

        throw externalRequestFailedError(errors?.join(', '))
    }

    if(payment?.charges[0]?.status === "DECLINED") throw cardDeclinedError()

    
    // testar
    await storeCustomerData(payment.customer, payment.shipping.address, cart)
    // testar

    console.log(new Date(2592000))

    return payment
}

function calculateTotalInBRLCents({ cart, shipping }: Payment){
    let total = 0;

    cart.forEach(item => total += item.quantity * item.unit_amount)

    if(shipping) total += shipping.unit_amount

    return total * 100
}

async function checkStock(cart: Cart[]){
    const errors: string[] = [];

    for (const item of cart) {
        const check = await findStockById(item.stock_id)

        if(!check.quantity) errors.push(item.name)
    };

    return errors
}

async function storeCustomerData(customerData: Customer, address: Address, cart: Cart[]){
    const customer = await createCustomer(customerData)

    await createAddress(customer.id, address)

    for (const item of cart){
        await createOrder(customer.id, item)
    }
}