import { lerSessao } from './_sessao.js';

const comLink = (lista, campo = 'src') => (lista || []).filter((x) => x && x[campo]);

// tema dos vídeos (em _conteudos.js) que cada aba mostra
const TEMA_VIDEO = { reproducao: 'Reprodução Humana', climaterio: 'Climatério', intimas: 'Saúde Íntima' };

// Entrega só o conteúdo liberado pelo código usado no login
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const s = lerSessao(req);
    if (!s) return res.status(401).json({ erro: 'Faça login' });

    const m = await import('./_conteudos.js');
    const pode = (aba) => s.abas.includes(aba);
    const completo = pode('videos');
    const temas = s.abas.map((a) => TEMA_VIDEO[a]).filter(Boolean);

    return res.status(200).json({
      escopo: s.escopo,
      abas: s.abas,
      conteudos: comLink(m.CONTEUDOS).filter((c) => completo || temas.includes(c.tema)),
      guias: Object.fromEntries(Object.entries(m.GUIAS || {}).filter(([k]) => pode(k))),
      antesDepois: pode('intimas') ? (m.ANTES_DEPOIS || []).filter((x) => x.antes && x.depois) : [],
      casos: pode('casos') ? comLink(m.CASOS) : [],
    });
  } catch (e) {
    console.error('Erro em /api/conteudos:', e);
    return res.status(500).json({ erro: 'Arquivo api/_conteudos.js não encontrado ou com erro' });
  }
}
