const mercadopago = require('../config/mercadopago.config');

exports.createPreference = async (req, res) => {
  try {
    const { planId, planName, tokens, price, isFirstPurchase } = req.body;
    
    let preferenceItems = [{
      id: planId,
      title: `${planName} - ${tokens} Tokens`,
      quantity: 1,
      unit_price: parseFloat(price),
      description: `Pacote de ${tokens} tokens para documentação de código`,
      currency_id: 'BRL'
    }];
    
    // Configurar preferência
    const preference = {
      items: preferenceItems,
      back_urls: {
        success: `${process.env.FRONTEND_URL}/payment/success`,
        failure: `${process.env.FRONTEND_URL}/payment/failure`,
        pending: `${process.env.FRONTEND_URL}/payment/pending`
      },
      auto_return: 'approved',
      statement_descriptor: 'SmartDocs.AI',
      external_reference: JSON.stringify({
        planId,
        tokens,
        isFirstPurchase
      }),
      metadata: {
        planId,
        tokens,
        isFirstPurchase
      }
    };

    const response = await mercadopago.preferences.create(preference);
    
    return res.status(200).json({
      preferenceId: response.body.id,
      initPoint: response.body.init_point
    });
  } catch (error) {
    console.error('Error creating preference:', error);
    return res.status(500).json({ 
      error: 'Error creating payment preference',
      details: error.message 
    });
  }
};

exports.handleWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;
    
    if (type === 'payment') {
      const paymentId = data.id;
      const payment = await mercadopago.payment.findById(paymentId);
      
      if (payment.body.status === 'approved') {
        // Extrair informações relevantes
        const externalReference = JSON.parse(payment.body.external_reference);
        const { tokens, planId } = externalReference;
        
        // Aqui você implementaria a lógica para adicionar tokens à conta do usuário
        console.log(`Pagamento aprovado: Adicionar ${tokens} tokens ao usuário`);
      }
    }
    
    return res.status(200).send('OK');
  } catch (error) {
    console.error('Error in webhook:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getPaymentStatus = async (req, res) => {
  try {
    const { payment_id } = req.query;
    
    if (!payment_id) {
      return res.status(400).json({ error: 'Payment ID is required' });
    }
    
    const payment = await mercadopago.payment.findById(parseInt(payment_id));
    
    return res.status(200).json({
      status: payment.body.status,
      statusDetail: payment.body.status_detail,
      paymentMethod: payment.body.payment_method_id,
      issuerId: payment.body.issuer_id,
      installments: payment.body.installments
    });
  } catch (error) {
    console.error('Error getting payment status:', error);
    return res.status(500).json({ error: error.message });
  }
};