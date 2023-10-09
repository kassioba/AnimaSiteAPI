import { Request, Response } from 'express';
import { calculateShippingPrice } from '../services/shipping.service';
import httpStatus from 'http-status';

export async function calculateShipping(req: Request, res: Response){
    const { cep } = req.body;

    try {
      res.send(await calculateShippingPrice(cep));
    } catch (err) {
      if(err.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(err.message);
      if(err.name === "ExternalRequestFailedError") return res.status(httpStatus.SERVICE_UNAVAILABLE).send(err.message);

      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }