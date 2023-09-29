import { notFoundError } from '../errors/notFound.error';
import { getShippingPrice } from '../repositories/shipping.repository';

export async function calculateShippingPrice(cep: string) {
  // REVER A API DE CÁLCULO DE FRETE!!!!!
  
  const price = await getShippingPrice(cep)

  if(!price.valorpac) throw notFoundError("Cep not found!")

  return price
}