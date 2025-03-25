const mercadopago = require('mercadopago');
require('dotenv').config({ path: '../../server/.env' });

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

module.exports = mercadopago;