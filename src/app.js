const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config({ path: './server/.env' });

const paymentRoutes = require('./routes/payment.routes');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Rotas
app.use('/api', paymentRoutes);

// Rota para verificar se o servidor está rodando
app.get('/', (req, res) => {
  res.send('SmartDocs Backend API is running');
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

module.exports = app;