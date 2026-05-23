const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'ecommerce-api',
    time: new Date().toISOString(),
  });
});

// Placeholder route for products list
app.get('/api/products', (req, res) => {
  // For now, return a small static array as a placeholder
  res.json([
    { id: 1, name: 'Sample Product 1', price: 19.99 },
    { id: 2, name: 'Sample Product 2', price: 29.99 },
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`E‑commerce API listening on http://localhost:${PORT}`);
});