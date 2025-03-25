# DietGen Backend

API de backend para o aplicativo DietGen, fornecendo integração com o sistema de pagamentos Asaas.

## Requisitos

- Node.js 16+ 
- NPM ou Yarn

## Instalação

1. Clone este repositório
2. Navegue até a pasta backend:
   ```
   cd backend
   ```
3. Instale as dependências:
   ```
   npm install
   ```
   ou
   ```
   yarn
   ```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```
   PORT=3000
   ASAAS_API_KEY=sua_chave_api_asaas
   CLIENT_URL=http://seu-frontend-url
   ```

## Execução

Para desenvolvimento:
```
npm run dev
```

Para produção:
```
npm start
```

## Endpoints da API

### Clientes

- `POST /api/customers` - Criar um novo cliente

### Pagamentos

- `POST /api/payments` - Criar um novo pagamento
- `GET /api/payments/:paymentId` - Verificar o status de um pagamento 