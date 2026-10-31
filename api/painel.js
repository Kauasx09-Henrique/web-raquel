import { lerSessao } from './_sessao.js';
import { bancoConfigurado, lerEstatisticas } from './_estatisticas.js';

// Números de acesso — só para a médica (CODIGO_ADMIN)
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const s = lerSessao(req);
  if (!s) return res.status(401).json({ erro: 'Faça login' });
  if (s.escopo !== 'admin') return res.status(403).json({ erro: 'Acesso restrito à médica' });
  if (!bancoConfigurado()) return res.status(200).json({ configurado: false });
  try {
    return res.status(200).json({ configurado: true, ...(await lerEstatisticas()) });
  } catch (e) {
    console.error('Erro em /api/painel:', e);
    return res.status(500).json({ erro: String((e && e.message) || e) });
  }
}
