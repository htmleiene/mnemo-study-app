// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const users = [];

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }

  users.push({ username, password });
  return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
});

app.use('/api', require('./routes/aiRoutes')); // monta a rota da IA

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
