import app from "app"
import supertest from "supertest"
import { cleanDB } from "../helpers"
import httpStatus from "http-status"

const server = supertest(app)

beforeEach(async () => await cleanDB())

describe('POST /shipping', () => {
    it('should respond with status 400 when body is invalid', async () => {
        const { status } = await server.post('/shipping').send({ cep: '00000000000' })

        expect(status).toBe(httpStatus.BAD_REQUEST)
    })

    it('should respond with status 404 when cep do not exist', async () => {
        const { status } = await server.post('/shipping').send({ cep: '00000000' })

        expect(status).toBe(httpStatus.NOT_FOUND)
    })

    it('should responde with status 200 with shipping data', async () => {
        const { status, body } = await server.post('/shipping').send({ cep: '05432-020' })

        expect(status).toBe(httpStatus.OK)
        expect(body).toEqual(expect.arrayContaining([{
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(String),
            custom_price: expect.any(String),
            discount: expect.any(String),
            currency: expect.any(String),
            delivery_time: expect.any(Number),
            delivery_range: {
              min: expect.any(Number),
              max: expect.any(Number)
            },
            custom_delivery_time: expect.any(Number),
            custom_delivery_range: {
              min: expect.any(Number),
              max: expect.any(Number)
            },
            packages: [
              {
                price: expect.any(String),
                discount: expect.any(String),
                format: expect.any(String),
                dimensions: {
                  height: expect.any(Number),
                  width: expect.any(Number),
                  length: expect.any(Number)
                },
                weight: expect.any(String),
                insurance_value: expect.any(String)
              }
            ],
            additional_services: {
              receipt: expect.any(Boolean),
              own_hand: expect.any(Boolean),
              collect: expect.any(Boolean)
            },
            company: {
              id: expect.any(Number),
              name: expect.any(String),
              picture: expect.any(String)
            }
          }]))
    })
})