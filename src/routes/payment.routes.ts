import { validateSchema } from "../middlewares/validateSchema.middleware";
import { createPayment } from "../controllers/payment.controller";
import { Router } from "express";
import paymentSchema from "../schemas/payment.schema";

const paymentRouter = Router()

paymentRouter.post('', validateSchema(paymentSchema, 'body'), createPayment)

export default paymentRouter