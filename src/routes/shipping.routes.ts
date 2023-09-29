import { validateSchema } from "../middlewares/validateSchema.middleware";
import { calculateShipping } from "../controllers/shipping.controller";
import { Router } from "express";
import cepSchema from "../schemas/cep.schema";

const cargoRouter = Router()

cargoRouter.post("", validateSchema(cepSchema, "body"), calculateShipping);

export default cargoRouter