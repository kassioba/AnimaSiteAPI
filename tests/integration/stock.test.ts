import app from "app"
import supertest from "supertest"
import { cleanDB } from "../helpers"
import httpStatus from "http-status"
import { createProduct } from "../factories/products.factory"
import { createStock } from "../factories/stock.factory"

const server = supertest(app)

beforeEach(async () => await cleanDB())

describe("GET /stock/:product_id", () => {
    it('should respond with status 400 when param is invalid', async () => {
        const { status } = await server.get('/stock/a')

        expect(status).toBe(httpStatus.BAD_REQUEST)
    })
   
    it('should respond with status 404 when no stock is found', async () => {
        const { status } = await server.get(`/stock/2147483647`)

        expect(status).toBe(httpStatus.NOT_FOUND)
    })

    it('should respond with status 200 with stock data', async () => {
        const product = await createProduct()
        await createStock(product.id, "P")
        await createStock(product.id, "M")
        await createStock(product.id, "G")
        await createStock(product.id, "GG")
        await createStock(product.id, "XG")

        const { status, body } = await server.get(`/stock/${product.id}`)

        expect(body).toHaveLength(5)
        expect(body).toEqual(expect.arrayContaining([
            {
                id: expect.any(Number),
                product_id: expect.any(Number),
                size: expect.stringMatching(/(P|M|G|GG|XG)/i),
                quantity: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        ]))
        expect(status).toBe(httpStatus.OK)
    })
})