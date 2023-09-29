import { validateSchema } from "../middlewares/validateSchema.middleware";
import { getProducts, getProduct } from "../controllers/products.controller";
import { Router } from "express";
import { productParamSchema } from "../schemas/productParam.schema";

const productsRouter = Router()

productsRouter
.get("", getProducts)
.get("/:id", validateSchema(productParamSchema, "params"), getProduct);

export default productsRouter