import axios from "axios";
import { Payment } from "../protocols/Payment";
import { paymentApiConfig } from "../utils/paymentApiConfig";

export async function postPaymentData({cart, shipping, customer, address, card}: Payment, total: number){
    console.log({items: [
        ...cart,
        {
          ...shipping,
          quantity: 1
        }
      ]})
    
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
                          soft_descriptor: "Loja Ânima"
                        },
                        notification_urls: "https://webhook.site/#!/743c0d38-9982-4bc6-8c67-d924460bf1f1/e113c36e-dad5-4460-b56f-8173d70ccb64/1"
                      }
                    ]
                  }
                ,
                  {
                    headers: {
                        Authorization: `Bearer ${process.env.PAGSEGURO_TOKEN}`
                    }
                  }
                  
            )
            .then((resp) => {
                console.log(resp.data)
                return resp.data
            })
            .catch((err) => { 
                console.log(err.response.data)
                return err.response.data 
            });
}





// {
//     customer: {
//       name: "Kássio Luna",
//       email: "kassio_luna@yahoo.com",
//       tax_id: "70181278405"
//     },
//     shipping: {
//       address: {
//         street: "Rua Deputado Pedro Pires Ferreira",
//         number: "95",
//         city: "Recife",
//         region_code: "PE",
//         country: "BRA",
//         postal_code: "52050480",
//         complement: "Apto 605",
//         locality: "Graças"
//       }
//     },
//     items: [
//       {
//         name: "CAMISETA ÂNIMA M",
//         quantity: 2,
//         unit_amount: 75
//       }
//     ],
//     notification_urls: [
//       "https://webhook.site/#!/743c0d38-9982-4bc6-8c67-d924460bf1f1/e113c36e-dad5-4460-b56f-8173d70ccb64/1"
//     ],
//     charges: [
//       {
//         amount: {
//           value: 15000,
//           currency: "BRL"
//         },
//         payment_method: {
//           card: {
//             holder: {
//               name: "Jose da Silva"
//             },
//             exp_month: 12,
//             exp_year: 2026,
//             security_code: "123",
//             store: false,
//             number: "4539620659922097"
//           },
//           type: "CREDIT_CARD",
//           installments: 1,
//           capture: true,
//           soft_descriptor: "Loja Ânima"
//         },
//         notification_urls: "https://webhook.site/#!/743c0d38-9982-4bc6-8c67-d924460bf1f1/e113c36e-dad5-4460-b56f-8173d70ccb64/1"
//       }
//     ]
//   }