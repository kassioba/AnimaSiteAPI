import { ApplicationError } from "protocols/ApplicationError";

export function externalRequestFailedError(message?: string): ApplicationError{
    return{
        name: "PaymentFailedError",
        message: message || 'Payment failed'
    }
}