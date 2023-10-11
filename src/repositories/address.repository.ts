import axios from "axios";

export async function findAddressByCep(cep: string) {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => { return res })
            .catch(err => { return err })
}