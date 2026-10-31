
import express from 'express';
import loginHandler from './api/login.js';
import conteudosHandler from './api/conteudos.js';

const app = express();

app.use(express.json());

// Login
app.post('/api/login', (req, res) => {
  return loginHandler(req, res);
});

// Conteúdos protegidos
app.get('/api/conteudos', (req, res) => {
  return conteudosHandler(req, res);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`API local rodando em http://localhost:${PORT}`);
  console.log('Rotas disponíveis:');
  console.log('POST /api/login');
  console.log('GET  /api/conteudos');
});
