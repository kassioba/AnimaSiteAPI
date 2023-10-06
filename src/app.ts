import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/index.routes';
import rateLimit from 'express-rate-limit';
import axios from 'axios';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests, please try again later",
});

app.use(cors())
.use(express.json())
.use(router)
.use(limiter)
dotenv.config()

app
.get("/health", (req: Request, res: Response) => res.send("I'm okay!"))
.get('/teste', (req: Request, res: Response) => {
  axios.get('https://sandbox.melhorenvio.com.br/oauth/authorize?client_id=3617&redirect_uri=https://webhook.site/#!/743c0d38-9982-4bc6-8c67-d924460bf1f1/e113c36e-dad5-4460-b56f-8173d70ccb64/1&response_type=code&state=teste&scope=cart-read cart-write companies-read companies-write coupons-read coupons-write notifications-read orders-read products-read products-write purchases-read shipping-calculate shipping-cancel shipping-checkout shipping-companies shipping-generate shipping-preview shipping-print shipping-share shipping-tracking ecommerce-shipping transactions-read users-read users-write')
  .then(resp => console.log(resp.data))
})

const PORT = process.env.SERVER_PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));