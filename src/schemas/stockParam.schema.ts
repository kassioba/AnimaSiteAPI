import Joi from "joi";

const stockParamSchema = Joi.object({
    productId: Joi.number().positive()
})

export default stockParamSchema