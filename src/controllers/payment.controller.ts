import { Request, Response } from "express";
import { createPayment } from "../services/payment.service";
import httpStatus from "http-status";

export async function postPayment(req: Request, res: Response){
    try {
        res.status(httpStatus.CREATED).send(await createPayment(req.body))
    } catch (error) {
        // Status code escrito de forma numérica devido a bug na biblioteca httpStatus
        // Status code written numerically due to a bug in the httpStatus library
        if(error.name === "ExternalRequestFailedError") return res.status(424).send(error.message)
        if(error.name === "CardDeclinedError") return res.status(httpStatus.PAYMENT_REQUIRED).send(error.message)
        if(error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(error.message)

        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
  }