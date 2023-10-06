import { ApplicationError } from "protocols/ApplicationError";

export function externalRequestFailedError(message?: string): ApplicationError{
    return{
        name: "ExternalRequestFailedError",
        message: message || 'External request failed'
    }
}