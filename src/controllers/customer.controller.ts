import { Request, Response } from "express";
import httpStatus from "http-status";
import { getAllCustomers, getCustomerWithOrderData } from "../services/customer.service";

export async function getCustomers(req: Request, res: Response){
    try {
        res.send(await getAllCustomers())
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
}

export async function getCustomerById(req: Request, res: Response) {
    const { id } = req.params
    
    try {
        res.send(await getCustomerWithOrderData(+id))
    } catch (error) {
        if(error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(error.message)

        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
}