import express from 'express'
import cors from 'cors'
import mercadopago from "mercadopago";
import { MongoClient, ObjectId } from "mongodb";
import joi from "joi"
import dotenv from 'dotenv'
import {
  calcularPrecoPrazo,
  consultarCep,
  rastrearEncomendas,
} from 'correios-brasil';
import axios from 'axios'

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

mongoClient
  .connect()
  .then(() => (db = mongoClient.db()))
  .catch((err) => console.log(err.message));

// mercadopago.configure({
//   access_token:
//     "TEST-5557399308464316-041016-176a60778d427c5ec00522b0ff39e948-156684876",
//   // "APP_USR-5557399308464316-041016-eadbe9e869c89e1fb57f6405c5255f3f-156684876",
// });

app.post('/', async (req, res) =>{
  const produtos = req.body
  
  const produtoSchema = joi.object({
    nome: joi.string().required(),
    preco: joi.number().required(),
    img: joi.string().required(),
    alt: joi.string().required(),
    descricao: joi.string().required(),
    tamanho:joi.string().valid('P', 'M', 'G', 'GG', 'XG'),
  })

  for(let i = 0; i < produtos.length; i++) {
    const validation = produtoSchema.validate(produtos[i]);

    if(validation.error){
      return res.status(422).send('Formato do produto inválido')
    }
  }

  try{
   await db.collection('produtos').insertMany(produtos)
  }catch(err){
    return res.status(500).send(err.message)
  }


  res.sendStatus(201)
});

app.get('/', async (req, res) => res.send(await db.collection('produtos').find().toArray()))

app.post('/estoque', async (req, res) =>{
  const produtos = req.body
  
  const produtoSchema = joi.object({
    nome: joi.string().required(),
    tamanho:joi.string().valid('P', 'M', 'G', 'GG', 'XG'),
    estoque: joi.number().required(),
  })

  for(let i = 0; i < produtos.length; i++) {
    const validation = produtoSchema.validate(produtos[i]);

    if(validation.error){
      return res.status(422).send('Formato do produto inválido')
    }
  }

  try{
   await db.collection('estoque').insertMany(produtos)
  }catch(err){
    return res.status(500).send(err.message)
  }


  res.sendStatus(201)
})

app.get('/estoque/:nome', async (req, res) => {
  const nome = req.params.nome

  let quantidade = 0;
  let tamanhos = []

  const itens = await db.collection('estoque').find({nome: nome}).toArray()

  for(let i = 0; i < itens.length; i++){
    quantidade += itens[i].estoque
    if(itens[i].estoque > 0){
    tamanhos.push(itens[i].tamanho)
  }
}

if(!tamanhos[0]) tamanhos = 'Tamanho único'

  res.send({nome: nome, estoque: quantidade, tamanhosDisponiveis: tamanhos})
})

app.post('/attEstoque', async (req, res) =>{
  await db.collection('estoque').updateOne({tamanho: 'P'}, {$set: {estoque: 0}})
  res.send('editado')
})

app.get('/produtos/:id', async (req, res) =>{
  const {id} = req.params

  res.send(await db.collection('produtos').findOne({_id: new ObjectId(id)}))
})

app.post('/correios', async (req, res) =>{

  // body recebe apenas cep de destino

  let args = {
    // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
    sCepOrigem: '52050480',
    sCepDestino: '05432020',
    nVlPeso: '1',
    nCdFormato: '1',
    nVlComprimento: '42',
    nVlAltura: '30',
    nVlLargura: '10',
    nCdServico: ['04014', '04510'], //Array com os códigos de serviço
    nVlDiametro: '0',
  };
  
  try{
  res.send(await calcularPrecoPrazo(args))
}catch(err){
  return res.send(err.message)
}

})

app.post('/pagamento', async (req,res) => {
  const carrinho = req.body

  axios.post(
    "https://api.mercadopago.com/checkout/preferences",
    [
      {
        items: carrinho,
        back_urls: {
          success: "http://localhost:3000/sucesso",
          failure: "http://localhost:3000/teste",
          pending: "http://localhost:3000/sucesso",
        },
        auto_return: "approved",
        payment_methods: {
          installments: 1,
        },
        shipments: {
          cost: 10,
        },
      },
    ],
    {
      headers: {
        Authorization:
          "Bearer TEST-5557399308464316-041016-176a60778d427c5ec00522b0ff39e948-156684876",
      },
    }
  ).then(resp => {
    console.log(resp.data.init_point)
    res.send(resp.data.init_point)
  })
  .catch(err => {return res.status(500).send(err)})
})

app.delete('/sucesso', async (req, res) => {
  try{
    await db.collection('produtos').deleteMany({})
    res.send('deletado')
  }catch(err){
    return res.status(500).send(err.message)
  }
})

app.listen(5000);