import app from "app"
import supertest from "supertest"
import { cleanDB } from "../helpers"
import httpStatus from "http-status"
import { faker } from "@faker-js/faker"
import { createStock } from "../factories/stock.factory"
import { createProduct } from "../factories/products.factory"

const server = supertest(app)

beforeEach(async () => await cleanDB())

describe('POST /payment', () => {
    it('should respond with status 400 when body is invalid', async () => {
        const { status } = await server.post('/payment').send({})

        expect(status).toBe(httpStatus.BAD_REQUEST)
    })

    it('should respond with status 404 when stock do not exist', async () => {
        const { status } = await server.post('/payment').send({
            cart: [{
                stock_id: 2,
                name: faker.commerce.productName(),
                unit_amount: 75,
                quantity: 2,
            }],
            customer: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                tax_id: '12345678909'
            },
            address: {
                street: faker.location.street(),
                number: faker.location.buildingNumber(),
                complement: faker.location.secondaryAddress(),
                locality: faker.location.county(),
                city: faker.location.city(),
                region_code: faker.location.state({ abbreviated: true }),
                country: faker.location.countryCode('alpha-3'),
                postal_code: faker.location.zipCode('########')
            },
            card: {
                number: "4539620659922097",
                exp_month: 12,
                exp_year: 2026,
                security_code: "123",
                holder: {
                  name: faker.person.fullName()
                }
            },
            shipping: {
                name: faker.commerce.productName(),
                unit_amount: 25
            }
        })

        expect(status).toBe(httpStatus.NOT_FOUND)
    })

    it('should respond with status 424 when the external request fail', async () => {
        const { id } = await createProduct()
        const stock = await createStock(id, "M")
        
        const { status } = await server.post('/payment').send({
            cart: [{
                stock_id: stock.id,
                name: faker.commerce.productName(),
                unit_amount: 0,
                quantity: 2,
            }],
            customer: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                tax_id: '12345678909'
            },
            address: {
                street: faker.location.street(),
                number: faker.location.buildingNumber(),
                complement: faker.location.secondaryAddress(),
                locality: faker.location.county(),
                city: faker.location.city(),
                region_code: 'SP',
                country: 'BRA',
                postal_code: faker.location.zipCode('########')
            },
            card: {
                number: "4539620659922097",
                exp_month: 12,
                exp_year: 2026,
                security_code: "123",
                holder: {
                  name: faker.person.fullName()
                }
            },
            shipping: {
                name: faker.commerce.productName(),
                unit_amount: 25
            }
        })

        // Status code escrito de forma numérica devido a bug na biblioteca httpStatus
        // Status code written numerically due to a bug in the httpStatus library
        expect(status).toBe(424)
    })

    it('should respond with status 402 when credit card is declined', async () => {
        const { id } = await createProduct()
        const stock = await createStock(id, "M")
        
        const { status } = await server.post('/payment').send({
            cart: [{
                stock_id: stock.id,
                name: faker.commerce.productName(),
                unit_amount: 75,
                quantity: 2,
            }],
            customer: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                tax_id: '12345678909'
            },
            address: {
                street: faker.location.street(),
                number: faker.location.buildingNumber(),
                complement: faker.location.secondaryAddress(),
                locality: faker.location.county(),
                city: faker.location.city(),
                region_code: 'SP',
                country: 'BRA',
                postal_code: faker.location.zipCode('########')
            },
            card: {
                number: "4929291898380766",
                exp_month: 12,
                exp_year: 2026,
                security_code: "123",
                holder: {
                  name: faker.person.fullName()
                }
            },
            shipping: {
                name: faker.commerce.productName(),
                unit_amount: 25
            }
        })

        expect(status).toBe(httpStatus.PAYMENT_REQUIRED)
    })

    it('should respond with status 201 with payment data', async () => {
        const { id } = await createProduct()
        const stock = await createStock(id, "M")
        
        const { status, body } = await server.post('/payment').send({
            cart: [{
                stock_id: stock.id,
                name: faker.commerce.productName(),
                unit_amount: 75,
                quantity: 2,
            }],
            customer: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                tax_id: '12345678909'
            },
            address: {
                street: faker.location.street(),
                number: faker.location.buildingNumber(),
                complement: faker.location.secondaryAddress(),
                locality: faker.location.county(),
                city: faker.location.city(),
                region_code: 'SP',
                country: 'BRA',
                postal_code: faker.location.zipCode('########')
            },
            card: {
                number: "4539620659922097",
                exp_month: 12,
                exp_year: 2026,
                security_code: "123",
                holder: {
                  name: faker.person.fullName()
                }
            },
            shipping: {
                name: faker.commerce.productName(),
                unit_amount: 25
            }
        })

        expect(status).toBe(httpStatus.CREATED)
        expect(body).toEqual({
            id: expect.any(String),
            created_at: expect.any(String),
            customer: {
              name: expect.any(String),
              email: expect.any(String),
              tax_id: expect.any(String)
            },
            items: [
              {
                name: expect.any(String),
                quantity: expect.any(Number),
                unit_amount: expect.any(Number)
              },
              {
                name: expect.any(String),
                quantity: expect.any(Number),
                unit_amount: expect.any(Number)
              }
            ],
            shipping: {
              address: {
                street: expect.any(String),
                number: expect.any(String),
                complement: expect.any(String),
                locality: expect.any(String),
                city: expect.any(String),
                region_code: expect.any(String),
                country: expect.any(String),
                postal_code: expect.any(String)
              }
            },
            charges: [
              {
                id: expect.any(String),
                status: expect.any(String),
                created_at: expect.any(String),
                paid_at: expect.any(String),
                description: expect.any(String),
                amount: {
                  value: expect.any(Number),
                  currency: expect.any(String),
                  summary: {
                    total: expect.any(Number),
                    paid: expect.any(Number),
                    refunded: expect.any(Number)
                  }
                },
                payment_response: {
                  code: expect.any(String),
                  message: expect.any(String),
                  reference: expect.any(String)
                },
                payment_method: {
                  type: expect.any(String),
                  installments: expect.any(Number),
                  capture: expect.any(Boolean),
                  card: {
                    brand: expect.any(String),
                    first_digits: expect.any(String),
                    last_digits: expect.any(String),
                    exp_month: expect.any(String),
                    exp_year: expect.any(String),
                    holder: {
                      name: expect.any(String)
                    },
                    store: expect.any(Boolean)
                  },
                  soft_descriptor: expect.any(String)
                },
                links: [
                  {
                    rel: expect.any(String),
                    href: expect.any(String),
                    media: expect.any(String),
                    type: expect.any(String)
                  },
                  {
                    rel: expect.any(String),
                    href: expect.any(String),
                    media: expect.any(String),
                    type: expect.any(String)
                  }
                ]
              }
            ],
            notification_urls: [
                expect.any(String)
            ],
            links: [
              {
                rel: expect.any(String),
                href: expect.any(String),
                media: expect.any(String),
                type: expect.any(String)
              },
              {
                rel: expect.any(String),
                href: expect.any(String),
                media: expect.any(String),
                type: expect.any(String)
              }
            ]
          })
    })
})