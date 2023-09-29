import Joi from "joi";

const paymentSchema = Joi.object({
    cart: Joi.array().items(Joi.object({
        title: Joi.string().required(),
        unit_price: Joi.number().positive().required(),
        quantity: Joi.number().positive().required()
    })).required(),
    customer: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        adress: Joi.object({
            zip_code: Joi.string().min(8).max(8).required(),
            street_name: Joi.string().required()
        })
    }).required(),
    shipping_price: Joi.number().positive()
})

export default paymentSchema