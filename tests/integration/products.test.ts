import app from 'app'
import supertest from 'supertest'
import { cleanDB } from '../helpers'
import { createProduct } from '../factories/products.factory'
import httpStatus from 'http-status'

const server = supertest(app)

beforeEach(async () => await cleanDB())

describe('GET /products', () => {
    it('should respond with status 200 and empty array when there are no products', async () => {
        const { body, status } = await server.get('/products')
        
        expect(body).toHaveLength(0)
        expect(body).toEqual([])
        expect(status).toBe(httpStatus.OK)
    })

    it('should respond with status 200 and products data', async () => {
        await createProduct()
        await createProduct()
        await createProduct()

        const { body, status } = await server.get('/products')
        
        expect(body).toHaveLength(3)
        expect(body).toEqual(expect.arrayContaining([{
                id: expect.any(Number),
                name: expect.any(String),
                price: expect.any(Number),
                image: expect.any(String),
                image_alt: expect.any(String),
                description: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        ]))
        expect(status).toBe(httpStatus.OK)
    })
})

describe('GET /products/:id', () => {
    it('should respond with status 400 when param is invalid', async () => {
        const { status } = await server.get('/products/a')

        expect(status).toBe(httpStatus.BAD_REQUEST)
    })

    it('should respond with status 404 when no product is found', async () => {
        const { status } = await server.get('/products/2147483647')

        expect(status).toBe(httpStatus.NOT_FOUND)
    })

    it('should respond with status 200 and product data', async () => {
        const product = await createProduct()
        
        const { status, body } = await server.get(`/products/${product.id}`)

        expect(status).toBe(httpStatus.OK)
        expect(body).toEqual({
            ...product,
            createdAt: product.createdAt.toISOString(),
            updatedAt: product.updatedAt.toISOString()
        })
    })
})