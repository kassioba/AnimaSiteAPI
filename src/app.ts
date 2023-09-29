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

const config = {
  headers: {
    Authorization:
      `Bearer ${process.env.MERCADO_PAGO_TOKEN}`,
  },
};





app.post("/pagamento", async (req, res) => {
  const carrinho = req.body.carrinho;
  const comprador = req.body.comprador;
  let frete = req.body.frete;

  if (!frete) frete = 0;

  const carrinhoSchema = joi.object({
    title: joi.string().required(),
    unit_price: joi.number().required(),
    quantity: joi.number().required(),
  });

  for (let i = 0; i < carrinho.length; i++) {
    const validacao = carrinhoSchema.validate(carrinho[i], {
      abortEarly: false,
    });

    if (validacao.error) {
      const erros = validacao.error.details.map((err) => err.message);
      return res.status(422).send(erros);
    }
  }

  axios
    .post(
      "https://api.mercadopago.com/checkout/preferences",
      [
        {
          items: carrinho,
          back_urls: {
            success: "http://localhost:3000/sucesso",
            failure: "http://localhost:3000/",
            pending: "http://localhost:3000/sucesso",
          },
          auto_return: "approved",
          payment_methods: {
            installments: 1,
          },
          shipments: {
            cost: frete,
          },
          payer: comprador,
          notification_url: "https://animasiteapi.onrender.com/webhooks",
        },
      ],
      config
    )
    .then((resp) => res.send(resp.data.init_point))
    .catch((err) => {
      return res.status(500).send(err);
    });
});

app.post("/webhooks", (req, res) => {
  console.log(req.body);

  if (req.body.data) {
    if (req.body.data.id) {
      axios
        .get(
          `https://api.mercadopago.com/v1/payments/${req.body.data.id}`,
          config
        )
        .then((res) => {
          console.log(res.data.status);
          console.log(res.data.additional_info.payer.address);
        })
        .catch((err) => console.log("Get falhou"));
    }
  }
  res.sendStatus(200);
});

const PORT = process.env.SERVER_PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));