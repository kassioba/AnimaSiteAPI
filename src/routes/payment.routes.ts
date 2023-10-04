import { validateSchema } from "../middlewares/validateSchema.middleware";
import { postPayment } from "../controllers/payment.controller";
import { Router } from "express";
import paymentSchema from "../schemas/payment.schema";

const paymentRouter = Router()

paymentRouter.post('', validateSchema(paymentSchema, 'body'), postPayment)

export default paymentRouter