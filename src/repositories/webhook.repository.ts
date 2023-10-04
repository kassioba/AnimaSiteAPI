import axios from "axios";
import { paymentApiConfig } from "../utils/paymentApiConfig";

export function getOrderDataByWebhookData(id: number) {
    return axios
            .get(
              `https://api.mercadopago.com/v1/payments/${id}`,
              paymentApiConfig
            )
            .then((res) => {
              console.log(res.data.status);
              console.log(res.data.additional_info.payer.address);
            })
            .catch((err) => console.log("Get falhou"));
}