import { postPaymentData } from "../repositories/payment.repository";
import { Cart, Payment } from "../protocols/Payment";
import { externalRequestFailedError } from "../errors/externalRequestFailed.error";
import { cardDeclinedError } from "../errors/cardDeclined.error";


export async function createPayment(body: Payment) {
    const total = calculateTotalInBRLCents(body)

    const stockCheck = await checkStock(body.cart)

    const payment = await postPaymentData(body, total)

    if(payment.error_messages || !payment) {
        const errors = payment.error_messages?.map((e: any) => `${e.parameter_name} ${e.description}`)

        throw externalRequestFailedError(errors?.join(', '))
    }

    if(payment?.charges[0]?.status === "DECLINED") throw cardDeclinedError()
}

function calculateTotalInBRLCents({ cart, shipping }: Payment){
    let total = 0;

    cart.forEach(item => total += item.quantity * item.unit_amount)

    if(shipping) total += shipping.unit_amount

    return total * 100
}

async function checkStock(cart: Cart[]){
    
}