const express = require('express');
const app = express();
app.use(express.json());

// In-memory data store
let items = [
  { id: 1, name: 'Book' },
  { id: 2, name: 'Laptop' },
  { id: 3, name: 'Phone' }
];
let idCounter = 4;

// GET /items - Return all items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST /items - Add a new item
app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Item name is required' });
  }
  const newItem = { id: idCounter++, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// GET /items/:id - Get item by ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Item Service running on port ${PORT}`);
});
