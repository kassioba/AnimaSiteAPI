import { postPaymentData } from "../repositories/payment.repository";
import { Payment } from "../protocols/Payment";
import { externalRequestFailedError } from "../errors/externalRequestFailed.error";
import { cardDeclinedError } from "../errors/cardDeclined.error";
import { notFoundError } from "../errors/notFound.error";
import { checkStock, updateStock } from "./stock.service";
import { storeCustomerData } from "./customer.service";


export async function createPayment(body: Payment) {
    const { cart } = body
    
    const total = calculateTotalInBRLCents(body)

    const stockCheck = await checkStock(cart)

    if(stockCheck) throw notFoundError(stockCheck)

    // Criptografar cartão
    const payment = await postPaymentData(body, total)
    // Criptografar cartão

    if(payment.error_messages || !payment) {
        const errors = payment.error_messages?.map((e: any) => `${e.parameter_name} ${e.description}`)

        throw externalRequestFailedError(errors?.join(', '))
    }

    if(payment?.charges[0]?.status === "DECLINED") throw cardDeclinedError()
    
    await updateStock(cart)

    await storeCustomerData(payment.customer, payment.shipping.address, cart)

    return payment
}

function calculateTotalInBRLCents({ cart, shipping }: Payment){
    let total = 0;

    cart.forEach(item => total += item.quantity * item.unit_amount)

    if(shipping) total += shipping.unit_amount

    return total * 100
}

