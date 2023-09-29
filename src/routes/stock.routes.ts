import { validateSchema } from "../middlewares/validateSchema.middleware";
import { getStock } from "../controllers/stock.controller";
import { Router } from "express";
import stockParamSchema from "../schemas/stockParam.schema";

const stockRouter = Router()

stockRouter.get("/:productId", validateSchema(stockParamSchema, "params"), getStock);

export default stockRouter