import { notFoundError } from '../errors/notFoundError';
import { getShippingPrice } from '../repositories/shipping.repository';

export async function calculateShippingPrice(cep: string) {
  const price = await getShippingPrice(cep)

  if(!price.valorpac) throw notFoundError("Cep not found!")

  return price
}