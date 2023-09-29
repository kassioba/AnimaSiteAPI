import Joi from "joi";

export const productParamSchema = Joi.object({
    id: Joi.number().positive()
})