import { ApplicationError } from "../protocols/ApplicationError";

export function notFoundError(message?: string): ApplicationError{
    return {
        name: 'NotFoundError',
        message: message || "Not Found"
    }
}