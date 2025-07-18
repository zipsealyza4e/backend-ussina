const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const MOCK_API = 'https://680dcc99c47cb8074d913873.mockapi.io/newdata1m';

app.use(cors());
app.use(express.json());

app.get('/customer', async (req, res) => {
  const response = await fetch(MOCK_API);
  const data = await response.json();
  const emptyCustomer = data.find(c => !c.name && c.status === false);
  res.json(emptyCustomer);
});

app.put('/customer/:id', async (req, res) => {
  const response = await fetch(`${MOCK_API}/${req.params.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body)
  });
  const result = await response.json();
  res.json(result);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
