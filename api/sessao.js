import { sessaoValida } from './_sessao.js';

// Diz ao site se a paciente está logada (o cookie é HttpOnly, o navegador não consegue ler)
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ logada: sessaoValida(req) });
}
