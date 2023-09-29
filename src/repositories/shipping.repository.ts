import axios from "axios";

export function getShippingPrice(cep: string) {
    return axios
      .get(`https://www.cepcerto.com/ws/json-frete/52050480/${cep.replace('-', '')}/300/50/40/30`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }