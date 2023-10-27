import axios from "axios";
import { Payment } from "../protocols/Payment";
import { prisma } from "../config/database";

export async function postPaymentData({cart, shipping, customer, address, card}: Payment, total: number){
    return axios
            .post('https://sandbox.api.pagseguro.com/orders', {
                    customer,
                    shipping: {
                      address
                    },
                    items: shipping ? [
                      ...cart,
                      {
                        ...shipping,
                        quantity: 1
                      }
                    ] : [
                        ...cart
                    ],
                    notification_urls: [
                      "https://webhook.site/#!/743c0d38-9982-4bc6-8c67-d924460bf1f1/e113c36e-dad5-4460-b56f-8173d70ccb64/1"
                    ],
                    charges: [
                      {
                        amount: {
                          value: total,
                          currency: "BRL"
                        },
                        payment_method: {
                          card: {
                            ...card,
                            store: false, 
                          },
                          type: "CREDIT_CARD",
                          installments: 1,
                          capture: true,
                          soft_descriptor: "Lojânima"
                        },
                        notification_urls: "https://webhook.site/#!/743c0d38-9982-4bc6-8c67-d924460bf1f1/e113c36e-dad5-4460-b56f-8173d70ccb64/1"
                      }
                    ]
                  }
                ,
                  {
                    headers: {
                        Authorization: `Bearer ${process.env.PAGBANK_TOKEN}`
                    }
                  }
                  
            )
            .then((resp) => {
                return resp.data
            })
            .catch((err) => { 
                return err.response.data 
            });
}