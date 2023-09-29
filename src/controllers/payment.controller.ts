import { Request, Response } from "express";
import { createPaymentLink } from "../services/payment.service";
import httpStatus from "http-status";

export async function createPayment(req: Request, res: Response){
    try {
        res.status(httpStatus.FOUND).redirect(await createPaymentLink(req.body))
    } catch (error) {
        // Status code escrito de forma manual devido a bug na biblioteca httpStatus
        // Status code written manually due to a bug in the httpStatus library
        if(error.name === "PaymentFailedError") return res.status(424).send(error.message)

        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
  }