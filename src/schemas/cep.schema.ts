import Joi from "joi";

const cepSchema = Joi.object({
    cep: Joi.string().min(8).max(9).required()
})

export default cepSchema