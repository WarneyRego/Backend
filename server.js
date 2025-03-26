import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: (origin, callback) => {
    callback(null, true); // Permite qualquer origem
  },
  credentials: true
}));


app.use(express.json());

const asaasApi = axios.create({
  baseURL: 'https://www.asaas.com/api/v3',
  headers: {
    'access_token': '$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmIwNTM5ZDFkLWZmYTctNDQ5My05MzNmLTk0YjlkY2Q3YWU4Nzo6JGFhY2hfYjJjOTFkZjUtYTcyZC00ZGI1LWIzMzctZGYyOWY2OTI3ZWIz',
    'Content-Type': 'application/json'
  }
});

app.post('/api/customers', async (req, res) => {
  try {
    const { name, email, cpfCnpj } = req.body;
    const response = await asaasApi.post('/customers', {
      name,
      email,
      cpfCnpj
    });
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao criar cliente:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Erro no servidor'
    });
  }
});

app.post('/api/payments', async (req, res) => {
  try {
    const paymentData = req.body;
    const response = await asaasApi.post('/payments', paymentData);
    
    console.log('Resposta da API do Asaas:', {
      status: response.data.status,
      invoiceUrl: response.data.invoiceUrl,
      bankSlipUrl: response.data.bankSlipUrl,
      pixQrCodeUrl: response.data.pixQrCodeUrl
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao criar pagamento:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Erro no servidor'
    });
  }
});

app.get('/api/payments/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    const response = await asaasApi.get(`/payments/${paymentId}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao verificar status do pagamento:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Erro no servidor'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 
