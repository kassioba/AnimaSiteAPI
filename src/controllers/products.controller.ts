import { Request, Response } from "express";
import httpStatus from "http-status";
import { getAllProducts, getProductById } from "../services/products.service";

export async function getProducts(req: Request, res: Response) {
    try {
        res.send(await getAllProducts())
  } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
  }
}

export async function getProduct(req: Request, res: Response) {
      const { id } = req.params;
           
      try {
            res.send(await getProductById(+id))
      } catch (error) {
            if(error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(error.message)

            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
      }
          
}