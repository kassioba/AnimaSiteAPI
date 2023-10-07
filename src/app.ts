import express, { Request, Response } from 'express'
import cors from 'cors'
import router from './routes/index.routes';
import rateLimit from 'express-rate-limit';
import { loadEnv } from './config/envs';

const app = express();

loadEnv()

app.set('trust proxy', true);

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

app
.get("/health", (req: Request, res: Response) => res.send("I'm okay!")) 

export default app