import { handleExternalApiWebhooks } from "../controllers/webhooks.controller";
import { Router } from "express";

const webhookRouter = Router()

webhookRouter.post('/', handleExternalApiWebhooks)

// app.post("/webhooks", (req, res) => {
//   console.log(req.body);

//     if (req.body.data?.id) {
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
  
//   res.sendStatus(200);
// });

export default webhookRouter