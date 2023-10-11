import { externalRequestFailedError } from "../errors/externalRequestFailed.error";
import { findAddressByCep } from "../repositories/address.repository";
import { notFoundError } from "../errors/notFound.error";

export async function getAddressByCep(cep: string) {
    const { data } = await findAddressByCep(cep)

    if(!data) throw externalRequestFailedError()
    else if(data.erro) throw notFoundError('Cep not found!')

    return data
}