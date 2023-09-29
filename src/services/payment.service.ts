import { postPaymentReturnLink } from "../repositories/payment.repository";
import { Payment } from "../protocols/Payment";
import { paymentFailedError } from "../errors/paymentFailed.error";

export async function createPaymentLink(body: Payment) {
    const paymentLink = await postPaymentReturnLink(body)

    if(paymentLink.error) throw paymentFailedError(paymentLink.message)

    return paymentLink
}