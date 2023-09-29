import express, { Request, Response } from 'express'
import cors from 'cors'
import { MongoClient } from "mongodb";
import joi from "joi"
import dotenv from 'dotenv'
import axios from 'axios'
import router from './routes/index.routes';

const app = express();
app.use(cors())
.use(express.json())
.use(router)
dotenv.config()

app.get("/health", (req: Request, res: Response) => res.send("I'm okay!"))

const mongoClient = new MongoClient(process.env.MONGODB_DATABASE_URL);
export let db;

mongoClient
  .connect()
  .then(() => (db = mongoClient.db()))
  .catch((err) => console.log(err.message));

// Token Sandbox:  "TEST-5557399308464316-041016-176a60778d427c5ec00522b0ff39e948-156684876"
// Token Produção: "APP_USR-5557399308464316-041016-eadbe9e869c89e1fb57f6405c5255f3f-156684876"


// app.post("/webhooks", (req, res) => {
//   console.log(req.body);

//   if (req.body.data) {
//     if (req.body.data.id) {
//       axios
//         .get(
//           `https://api.mercadopago.com/v1/payments/${req.body.data.id}`,
//           paymentApiConfig
//         )
//         .then((res) => {
//           console.log(res.data.status);
//           console.log(res.data.additional_info.payer.address);
//         })
//         .catch((err) => console.log("Get falhou"));
//     }
//   }
//   res.sendStatus(200);
// });

const PORT = process.env.SERVER_PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));