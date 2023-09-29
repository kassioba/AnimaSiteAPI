import { ApplicationError } from "protocols/ApplicationError";

export function paymentFailedError(message?: string): ApplicationError{
    return{
        name: "PaymentFailedError",
        message: message || 'Payment failed'
    }
}