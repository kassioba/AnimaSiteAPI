import { Router } from "express";
import productsRouter from "./products.routes";
import stockRouter from "./stock.routes";
import shippingRouter from "./shipping.routes";
import paymentRouter from "./payment.routes";
import addressRouter from "./address.routes";

const router = Router()

router
.use("/products", productsRouter)
.use("/stock", stockRouter)
.use("/shipping", shippingRouter)
.use('/payment', paymentRouter)
.use('/address', addressRouter)

export default router