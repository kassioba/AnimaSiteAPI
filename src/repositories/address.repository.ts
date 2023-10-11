import axios from "axios";
import { prisma } from "../config/database";

export async function findAddressByCep(cep: string) {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => { return res })
            .catch(err => { return err })
}

export function createAddress(customer_id: number, { street, number, complement, locality , city, region_code, postal_code }){
    return prisma.address.create({
      data: {
        customer_id,
        street,
        number,
        complement,
        neighborhood: locality,
        city,
        postal_code,
        state_code: region_code
      }
    })
}