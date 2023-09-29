import axios from "axios";
import { Payment } from "../protocols/Payment";
import { paymentApiConfig } from "../utils/paymentApiConfig";

export function postPaymentReturnLink({cart, shipping_price, customer}: Payment){
    return axios
            .post(
                "https://api.mercadopago.com/checkout/preferences",
                [
                {
                    items: cart,
                    back_urls: {
                    success: `${process.env.FRONT_END_URL}/sucesso`,
                    failure: `${process.env.FRONT_END_URL}`,
                    pending: `${process.env.FRONT_END_URL}/sucesso`,
                    },
                    auto_return: "approved",
                    payment_methods: {
                    installments: 1,
                    },
                    shipments: {
                    cost: shipping_price,
                    },
                    payer: customer,
                    notification_url: "https://animasiteapi.onrender.com/webhooks",
                },
                ],
                paymentApiConfig
            )
            .then((resp) => { return resp.data.init_point })
            .catch((err) => { return err.response.data });
}