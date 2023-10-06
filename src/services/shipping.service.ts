import { notFoundError } from '../errors/notFound.error';
import { externalRequestFailedError } from '../errors/externalRequestFailed.error';
import { getShippingPrice } from '../repositories/shipping.repository';

export async function calculateShippingPrice(cep: string) {
  // REVER A API DE CÁLCULO DE FRETE!!!!!
  
  const { data } = await getShippingPrice(cep)

  if(!data) throw externalRequestFailedError()

  if(data[0].error === "Transportadora não atende este trecho.") throw notFoundError("Cep not found!")

  return data
}