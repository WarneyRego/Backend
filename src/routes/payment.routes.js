const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

// Criar uma preferência de pagamento
router.post('/create-preference', paymentController.createPreference);

// Webhook para notificações do MercadoPago
router.post('/webhook', paymentController.handleWebhook);

// Verificar o status de um pagamento
router.get('/payment-status', paymentController.getPaymentStatus);

module.exports = router;