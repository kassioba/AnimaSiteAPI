import { ApplicationError } from "../protocols/ApplicationError";

export function cardDeclinedError(): ApplicationError{
    return {
        name: "CardDeclinedError",
        message: "Credit card declined. Unable to complete transaction."
    }
}