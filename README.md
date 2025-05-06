# Carteira Financeira

API de Carteira Financeira desenvolvida em **NestJS** com **arquitetura hexagonal**, **TypeORM**, **PostgreSQL**, **JWT**, **Swagger** e testes automatizados.

---

## Tecnologias

- Node.js
- NestJS
- Prisma
- PostgreSQL
- Docker + Docker Compose
- Swagger
- JWT Authentication
- Testes Unitários e de Integração

---

## Estrutura dos Domínios

- **User/auth**: Cadastro e login de usuários.
- **Wallet**: Carteiras vinculadas a cada usuário.
- **Transaction**: Transferência e reversão de transações entre carteiras.

---

## Como rodar o projeto com Docker

### 1. Clone o repositório
```bash
git clone https://github.com/TheNeoCarvalho/carteira-financeira.git
cd carteira-financeira
```

###  Renomei o arquivo .env-example para .env e adicione valores as variáveis

```bash
### API
PORT=
API_VERSION=
BASE_URL=http://localhost:${PORT}
API_URL=${BASE_URL}/api/${API_VERSION}

## DB
POSTGRES_HOST=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=

DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:{POSTGRES_PORT}/${POSTGRES_DB}?schema=public"

## JWT
JWT_SECRET=
JWT_EXPIRES_IN=1d
```

### Suba o ambiente com Docker
```bash
docker-compose up -d --build
```

### Documentação Swagger
Acesse: http://localhost:3000/api/docs

## Rotas Principais

| Método | Rota                           | Descrição                                          |
|--------|--------------------------------|----------------------------------------------------|
| GET    | /api                           | Health Check                                       |
| POST   | /api/auth/register             | Cadastra um novo usuário                           |
| POST   | /api/auth/login                | Realiza login e retorna token                      |
| GET    | /api/users/me                  | Consulta dados do usuário                          |
| POST   | /api/transactions              | Realiza uma transferência                          |
| GET    | /api/transactions              | Retorna todas as transferência do usuário          |
| POST   | /api/transactions/:id/revert/  | Reverte uma transação realizada                    |
| GET    | /api/wallets                   | Retorna as carteira do usuário                     |
| POST   | /api/wallets                   | Cadastra uma carteira para o usuário               |
| POST   | /api/wallets/add-balance       | Adiciona fundos uma carteira                       |


## Testes
### Executar os Testes Unitários
```bash
docker exec -it api npm run test
```
### Executar os Testes de Integração (e2e)
```bash
docker exec -it api npm run test:e2e
```

### Documentação API e a documentção Online do Swagger
Acesse: https://carteira-financeira.fly.dev/api/docs