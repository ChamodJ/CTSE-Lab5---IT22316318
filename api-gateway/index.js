const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'API Gateway is running',
    routes: {
      items:    'http://localhost:8080/items/**',
      orders:   'http://localhost:8080/orders/**',
      payments: 'http://localhost:8080/payments/**'
    }
  });
});

// Route: /items/** → item-service:8081
app.use('/items', createProxyMiddleware({
  target: 'http://item-service:8081',
  changeOrigin: true,
  on: {
    error: (err, req, res) => {
      res.status(502).json({ error: 'Item Service unavailable', detail: err.message });
    }
  }
}));

// Route: /orders/** → order-service:8082
app.use('/orders', createProxyMiddleware({
  target: 'http://order-service:8082',
  changeOrigin: true,
  on: {
    error: (err, req, res) => {
      res.status(502).json({ error: 'Order Service unavailable', detail: err.message });
    }
  }
}));

// Route: /payments/** → payment-service:8083
app.use('/payments', createProxyMiddleware({
  target: 'http://payment-service:8083',
  changeOrigin: true,
  on: {
    error: (err, req, res) => {
      res.status(502).json({ error: 'Payment Service unavailable', detail: err.message });
    }
  }
}));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log('  /items    → item-service:8081');
  console.log('  /orders   → order-service:8082');
  console.log('  /payments → payment-service:8083');
});
