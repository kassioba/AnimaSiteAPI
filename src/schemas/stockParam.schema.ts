import Joi from "joi";

const stockParamSchema = Joi.object({
    product_id: Joi.number().positive()
})

export default stockParamSchema