// Funções compartilhadas pelas rotas /api (arquivos com _ não viram rota na Vercel)
import crypto from 'node:crypto';

const COOKIE = 'acesso_conteudos';
const DURACAO = 60 * 60 * 24 * 30; // 30 dias

const segredo = () => process.env.SESSAO_SEGREDO || process.env.CODIGO_ACESSO || '';

const assinar = (valor) => crypto.createHmac('sha256', segredo()).update(valor).digest('hex');

// Em localhost (http) o navegador descarta cookie "Secure" — só usa Secure em https
const seguro = (req) => {
  const host = (req && req.headers && req.headers.host) || '';
  return /^(localhost|127\.0\.0\.1)(:|$)/.test(host) ? '' : ' Secure;';
};

export function criarCookie(req) {
  const expira = Math.floor(Date.now() / 1000) + DURACAO;
  const token = expira + '.' + assinar(String(expira));
  return COOKIE + '=' + token + '; Path=/; HttpOnly;' + seguro(req) + ' SameSite=Lax; Max-Age=' + DURACAO;
}

export function apagarCookie(req) {
  return COOKIE + '=; Path=/; HttpOnly;' + seguro(req) + ' SameSite=Lax; Max-Age=0';
}

export function sessaoValida(req) {
  const cookies = Object.fromEntries(
    (req.headers.cookie || '').split(';').map((c) => {
      const i = c.indexOf('=');
      return [c.slice(0, i).trim(), c.slice(i + 1).trim()];
    })
  );
  const token = cookies[COOKIE];
  if (!token || !segredo()) return false;
  const [expira, assinatura] = token.split('.');
  if (!expira || !assinatura || Number(expira) < Date.now() / 1000) return false;
  const esperada = assinar(expira);
  return (
    assinatura.length === esperada.length &&
    crypto.timingSafeEqual(Buffer.from(assinatura), Buffer.from(esperada))
  );
}

// compara o código sem vazar informação pelo tempo de resposta
export function codigoConfere(digitado) {
  const certo = (process.env.CODIGO_ACESSO || '').trim();
  if (!certo || typeof digitado !== 'string') return false;
  const a = crypto.createHash('sha256').update(digitado.trim()).digest();
  const b = crypto.createHash('sha256').update(certo).digest();
  return crypto.timingSafeEqual(a, b);
}
