import { getAddress } from "../controllers/address.controller";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import cepSchema from "../schemas/cep.schema";
import { Router } from "express";

const addressRouter = Router()

addressRouter.get('/:cep', validateSchema(cepSchema, "params"), getAddress)

export default addressRouter