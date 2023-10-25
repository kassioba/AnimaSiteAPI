import { validateSchema } from "../middlewares/validateSchema.middleware";
import { getProducts, getProduct } from "../controllers/products.controller";
import { Router } from "express";
import { idParamSchema } from "../schemas/idParam.schema";

const productsRouter = Router()

productsRouter
.get("", getProducts)
.get("/:id", validateSchema(idParamSchema, "params"), getProduct);

export default productsRouter