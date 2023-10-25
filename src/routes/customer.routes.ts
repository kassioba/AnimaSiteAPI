import { validateSchema } from "../middlewares/validateSchema.middleware";
import { getCustomerById, getCustomers } from "../controllers/customer.controller";
import { Router } from "express";
import { idParamSchema } from "../schemas/idParam.schema";

const customerRouter = Router()

customerRouter
.get('/', getCustomers)
.get('/:id', validateSchema(idParamSchema, "params"), getCustomerById)

export default customerRouter