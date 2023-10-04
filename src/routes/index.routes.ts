import { Router } from "express";
import productsRouter from "./products.routes";
import stockRouter from "./stock.routes";
import cargoRouter from "./shipping.routes";
import paymentRouter from "./payment.routes";
import webhookRouter from "./webhook.routes";

const router = Router()

router
.use("/products", productsRouter)
.use("/stock", stockRouter)
.use("/shipping", cargoRouter)
.use('/payment', paymentRouter)
.use('/webhook', webhookRouter)

export default router