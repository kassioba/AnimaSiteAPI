import Joi from "joi";

const cepSchema = Joi.object({
    cep: Joi.string().pattern(/^[0-9]{5}-?[0-9]{3}$/).required()
})

export default cepSchema