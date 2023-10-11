import app from "app"
import supertest from "supertest"
import { cleanDB } from "../helpers"
import { faker } from "@faker-js/faker"
import httpStatus from "http-status"

const server = supertest(app)

beforeEach(async () => await cleanDB())

describe('GET /address/:cep', () => {
    it('should respond with status 400 when param is invalid', async () => {
        const { status } = await server.get(`/address/${faker.number.bigInt({ min: 100000000})}`)

        expect(status).toBe(httpStatus.BAD_REQUEST)
    })

    it('should respond with status 404 when cep is not found', async () => {
        const { status, text } = await server.get(`/address/00000-000`)

        expect(status).toBe(httpStatus.NOT_FOUND)
        expect(text).toBe('Cep not found!')
    })

    it('should respond with status 200 and address', async () => {
        const cep = '70150-900'
        
        const { status, body } = await server.get(`/address/${cep}`)

        expect(status).toBe(httpStatus.OK)
        expect(body).toEqual({
            cep,
            logradouro: "Praça dos Três Poderes",
            complemento: "",
            bairro: "Zona Cívico-Administrativa",
            localidade: "Brasília",
            uf: "DF",
            ibge: "5300108",
            gia: "",
            ddd: "61",
            siafi: "9701"
          })
    })
})