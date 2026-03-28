const express = require('express');
const app = express();
app.use(express.json());

// In-memory data store
let payments = [];
let idCounter = 1;

// GET /payments - Return all payments
app.get('/payments', (req, res) => {
  res.json(payments);
});

// POST /payments/process - Process a payment
app.post('/payments/process', (req, res) => {
  const { orderId, amount, method } = req.body;
  if (!orderId || !amount || !method) {
    return res.status(400).json({ error: 'orderId, amount, and method are required' });
  }
  const newPayment = {
    id: idCounter++,
    orderId,
    amount,
    method,
    status: 'SUCCESS',
    processedAt: new Date().toISOString()
  };
  payments.push(newPayment);
  res.status(201).json(newPayment);
});

// GET /payments/:id - Get payment by ID
app.get('/payments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const payment = payments.find(p => p.id === id);
  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }
  res.json(payment);
});

const PORT = 8083;
app.listen(PORT, () => {
  console.log(`Payment Service running on port ${PORT}`);
});
