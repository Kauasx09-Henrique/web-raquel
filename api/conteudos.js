import { sessaoValida } from './_sessao.js';

const comLink = (lista, campo = 'src') => (lista || []).filter((x) => x && x[campo]);

// Só entrega os conteúdos para quem fez login
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (!sessaoValida(req)) return res.status(401).json({ erro: 'Faça login' });
    const m = await import('./_conteudos.js');
    return res.status(200).json({
      conteudos: comLink(m.CONTEUDOS),
      guias: m.GUIAS || {},
      antesDepois: (m.ANTES_DEPOIS || []).filter((x) => x.antes && x.depois),
      casos: comLink(m.CASOS),
    });
  } catch (e) {
    console.error('Erro em /api/conteudos:', e);
    return res.status(500).json({ erro: 'Arquivo api/_conteudos.js não encontrado ou com erro' });
  }
}
