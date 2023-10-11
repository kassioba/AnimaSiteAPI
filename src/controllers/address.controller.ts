import { Request, Response } from "express";
import httpStatus from "http-status";
import { getAddressByCep } from "../services/address.service";

export async function getAddress(req: Request, res: Response){
    const { cep } = req.params

    try {
        res.send(await getAddressByCep(cep))
    } catch (error) {
        if(error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(error.message)
        if(error.name === "ExternalRequestFailedError") return res.status(httpStatus.SERVICE_UNAVAILABLE).send(error.message)

        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
}