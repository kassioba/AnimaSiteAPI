import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/index.routes';
import rateLimit from 'express-rate-limit';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later",
});

app.use(cors())
.use(express.json())
.use(router)
.use(limiter)
dotenv.config()

app.get("/health", (req: Request, res: Response) => res.send("I'm okay!"))

const PORT = process.env.SERVER_PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));