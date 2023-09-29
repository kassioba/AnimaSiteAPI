import { Request, Response } from "express";
import httpStatus from "http-status";
import { getStockByProductId } from "../services/stock.service"

export async function getStock(req: Request, res: Response) {
        const { productId } = req.params;
      
        try {
            res.send(await getStockByProductId(+productId))
        } catch (error) {
            if(error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(error.message)

            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
        }
}