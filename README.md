# Ânima Back End (Node.js)

Aplicação Back-end voltada para a promoção e venda de produtos da banda pernambucana Ânima. O Front-end está em desenvolvimento.

## Tecnologias utilizadas

- TypeScript
- Node.js
- PostgreSQL
- Prisma
- API PagSeguro
- API Melhor Envio

## Setup

- Arquivo .env.example presente na raiz do projeto com todos os campos necessários para conectar ao banco de dados, escolher a porta da aplicação e adicionar os tokens das API's do PagSeguro e Melhor Envio;
- Utilize o comando "npm i" ou "npm install" para instalar as dependências do projeto;
- Utilize o comando "npx prisma migrate dev" para gerar as migrações do Prisma e aplica-las no banco de dados;
- Utilize o comando "npm run dev" para iniciar a aplicação.

## Rotas

- GET /products
    - Response: [ { "id": number,
    "name": string,
    "price": number,
    "image": string,
    "image_alt": string,
    "description": string,
    "createdAt": Date,
    "updatedAt": Date 
    } ]

    - Status: 200 (OK)

- GET /products/:id
    - Response: { "id": number,
    "name": string,
    "price": number,
    "image": string,
    "image_alt": string,
    "description": string,
    "createdAt": Date,
    "updatedAt": Date 
    }

    - Status: 200 (OK)

- GET /stock/:productId
    - Response: [ {
    "id": number,
    "product_id": number,
    "size": string,
    "quantity": number,
    "createdAt": Date,
    "updatedAt": Date
  } ]

  - Status: 200 (OK)

- POST /shipping
    - Body: { cep: string }

    - Response: Como na documentação da API do Melhor Envio: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

    - Status: 200 (OK)

- POST /payment
    - Body: {
        cart: [ {
            stock_id: number,
            name: string,
            unit_amount: number,
            quantity: number
        } ],  
        customer: {
            name: string,
            email: string,
            tax_id: string
        },  
        address: {
            street: string,
            number: string,
            complement: string,
            locality: string,
            city: string,
            region_code: string,
            country: string,
            postal_code: string
        },  
        card: {
            number: string,
            exp_month: number,
            exp_year: number,
            security_code: string,
            holder: {
                name: string
            }
        },  
        shipping?: {
            name: string,
            unit_amount: number
        }
    }

    - Response: Como na documentação da API do PagSeguro: https://dev.pagbank.uol.com.br/reference/criar-pedido

    - Status: 201 (Created)

## Funcionalidades futuras

- Implementar sistema de cadastro e login;
- Criar sistema de acompanhamento dos pedidos para o vendedor (outro aplicativo, parecido com o do repositório: https://github.com/kassioba/Shopper-Teste-Front);
- Testes automatizados;
- Proxy reverso para reforçar a segurança da aplicação em produção.
