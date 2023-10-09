import app from "app"
import supertest from "supertest"
import { cleanDB } from "../helpers"

const server = supertest(app)

beforeEach(async () => await cleanDB())

describe('GET /health', () => {
    it(`should respond with status 200 and "I'm okay!" text`, async () => {
        const { status, text } = await server.get('/health')

        expect(status).toBe(200)
        expect(text).toBe("I'm okay!")
    })
})