import { Router } from "express";
import productsRouter from "./products.routes";
import stockRouter from "./stock.routes";
import cargoRouter from "./shipping.routes";

const router = Router()

router
.use("/products", productsRouter)
.use("/stock", stockRouter)
.use("/shipping", cargoRouter)

export default router