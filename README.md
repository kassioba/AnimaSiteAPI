# Ânima Back End (Node.js)

Aplicação Back-end voltada para a promoção e venda de produtos da banda pernambucana Ânima. O Front-end está em desenvolvimento. Essa mesma aplicação está disponível nas seguintes tecnologias:
- NestJS: https://github.com/kassioba/anima-back-end-nest

## Tecnologias utilizadas

- TypeScript
- Node.js
- PostgreSQL
- Prisma
- Jest
- API PagBank
- API Melhor Envio

## Setup

- Arquivo .env.example presente na raiz do projeto com todos os campos necessários para conectar ao banco de dados, escolher a porta da aplicação e adicionar os tokens das API's do PagBank e Melhor Envio;
- Idealmente, crie um arquivo .env.development, voltado para as variáveis de desenvolvimento, e um arquivo .env.test, voltado para as variáveis de teste. Caso só um arquivo .env seja criado, a aplicação funcionará perfeitamente, com o detalhe de que as variáveis de ambiente serão as mesmas para desenvolvimento e para testes;
- Utilize o comando "npm i" ou "npm install" para instalar as dependências do projeto;
- Utilize o comando "npm run dev:migration:generate" para gerar as migrações do Prisma e aplicá-las no banco de dados;
- Utilize o comando "npm run dev" para iniciar a aplicação.

## Testes

- Para testar a aplicação, utilize o comando "npm run test";
- Caso queria testar uma funcionalidade específica, utilize o comando "npm run test" seguido do nome da funcionalidade (cada arquivo de testes testa todas as rotas da respectiva funcionalidade);
- Perceba que é de suma importância preencher o arquivo .env ou, idealmente, o arquivo .env.test corretamente para que os teste funcionem conforme o esperado.

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
    - Param: { id: number }

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

- GET /stock/:product_id
    - Param: { product_id: number }

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

    - Response: Como na documentação da API do PagBank: https://dev.pagbank.uol.com.br/reference/criar-pedido

    - Status: 201 (Created)

## Funcionalidades futuras

- Implementar sistema de cadastro e login;
- Criar sistema de acompanhamento dos pedidos para o vendedor (outra aplicação, parecida com a do repositório: https://github.com/kassioba/Shopper-Teste-Front);
- Criptografia do cartão usado para o pagamento na rota /payment;
- Rota para identificar o endereço automaticamente a partir do cep inserido pelo usuário;
- Testes unitários;
- Proxy reverso para reforçar a segurança da aplicação em produção.
