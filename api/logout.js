import { apagarCookie } from './_sessao.js';

export default function handler(req, res) {
  res.setHeader('Set-Cookie', apagarCookie(req));
  return res.status(200).json({ ok: true });
}
