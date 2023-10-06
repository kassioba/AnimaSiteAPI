import axios from "axios";

export function getShippingPrice(cep: string) {
    return axios
      .post(`https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate`, {
        from: {postal_code: '52050480'},
        to: {postal_code: `${cep}`}
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MELHOR_ENVIO_API_ACCESS_TOKEN}`
        }
      }
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {return err});
  }