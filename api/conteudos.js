import { sessaoValida } from './_sessao.js';

// Só entrega a lista de vídeos para quem fez login
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (!sessaoValida(req)) return res.status(401).json({ erro: 'Faça login' });
    const { CONTEUDOS } = await import('./_conteudos.js');
    return res.status(200).json({ conteudos: CONTEUDOS || [] });
  } catch (e) {
    console.error('Erro em /api/conteudos:', e);
    return res.status(500).json({ erro: 'Arquivo api/_conteudos.js não encontrado ou com erro' });
  }
}
