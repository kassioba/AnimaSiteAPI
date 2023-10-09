import { Request, Response } from "express";
import { createPayment } from "../services/payment.service";
import httpStatus from "http-status";

export async function postPayment(req: Request, res: Response){
    try {
        res.status(httpStatus.CREATED).send(await createPayment(req.body))
    } catch (error) {
        if(error.name === "ExternalRequestFailedError") return res.status(httpStatus.SERVICE_UNAVAILABLE).send(error.message)
        if(error.name === "CardDeclinedError") return res.status(httpStatus.PAYMENT_REQUIRED).send(error.message)
        if(error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(error.message)

        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
  }