import { Request, Response } from "express";
import { receiveWebhookReturnOrderData } from "../services/webhook.service";
import httpStatus from "http-status";

export async function handleExternalApiWebhooks(req: Request, res: Response) {
    try {
        res.send(await receiveWebhookReturnOrderData(req.body))
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
}