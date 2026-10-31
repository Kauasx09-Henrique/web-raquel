import { lerSessao } from './_sessao.js';

// Diz ao site se está logada e o que pode ver (o cookie é HttpOnly, o navegador não lê)
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const s = lerSessao(req);
  return res.status(200).json(s ? { logada: true, escopo: s.escopo, abas: s.abas } : { logada: false });
}
