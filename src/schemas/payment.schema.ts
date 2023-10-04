import Joi from "joi";
import { Payment } from "../protocols/Payment";

const paymentSchema = Joi.object<Payment>({
    cart: Joi.array().items(Joi.object({
        stock_id: Joi.number().positive().required(),
        name: Joi.string().required(),
        unit_amount: Joi.number().min(0).required(),
        quantity: Joi.number().positive().required()
    })).required(),
    customer: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        tax_id: Joi.string().min(11).max(14).required()
    }).required(),
    address: Joi.object({
        street: Joi.string().required(),
        number: Joi.string().required(),
        complement: Joi.string().required(),
        locality: Joi.string().required(),
        city: Joi.string().required(),
        region_code: Joi.string().required(),
        country: Joi.string().required(),
        postal_code: Joi.string().required(),
    }).required(),
    card: Joi.object({
        number: Joi.string().required(),
        exp_month: Joi.number().required(),
        exp_year: Joi.number().required(),
        security_code: Joi.string().required(),
        holder: Joi.object({
            name: Joi.string().required()
        }).required()
    }).required(),
    shipping: Joi.object({
        name: Joi.string().required(),
        unit_amount: Joi.number().min(0).required()
    })
})

export default paymentSchema