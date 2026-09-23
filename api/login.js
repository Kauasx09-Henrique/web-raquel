import { codigoConfere, criarCookie } from './_sessao.js';

async function lerCorpo(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch { return {}; } }
  const partes = [];
  for await (const p of req) partes.push(p);
  try { return JSON.parse(Buffer.concat(partes).toString() || '{}'); } catch { return {}; }
}

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ erro: 'Método não permitido' });

    if (!process.env.CODIGO_ACESSO) {
      console.error('CODIGO_ACESSO não definido nas variáveis de ambiente');
      return res.status(500).json({ erro: 'CODIGO_ACESSO não configurado' });
    }

    const { codigo } = await lerCorpo(req);

    if (!codigoConfere(codigo)) {
      await new Promise((r) => setTimeout(r, 800));
      return res.status(401).json({ erro: 'Código inválido' });
    }

    res.setHeader('Set-Cookie', criarCookie(req));
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Erro no login:', e);
    return res.status(500).json({ erro: String(e && e.message || e) });
  }
}
