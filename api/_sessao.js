// Funções compartilhadas pelas rotas /api (arquivos com _ não viram rota na Vercel)
import crypto from 'node:crypto';

const COOKIE = 'acesso_conteudos';
const COOKIE_DISP = 'rmg_disp';
const DIA = 60 * 60 * 24;

// Cada tema tem o seu código no .env. Pode ter vários separados por vírgula: CODIGO_REPRODUCAO=0101,0102
export const TEMAS = {
  reproducao: { nome: 'Reprodução Humana', env: 'CODIGO_REPRODUCAO' },
  climaterio: { nome: 'Climatério', env: 'CODIGO_CLIMATERIO' },
  intimas: { nome: 'Cirurgias íntimas', env: 'CODIGO_INTIMAS' },
  casos: { nome: 'Casos reais', env: 'CODIGO_CASOS' },
};

export const NOMES = {
  todos: 'Acesso completo',
  admin: 'Médica',
  ...Object.fromEntries(Object.entries(TEMAS).map(([k, v]) => [k, v.nome])),
};

const TODAS_ABAS = ['reproducao', 'climaterio', 'intimas', 'casos', 'videos'];
export const abasDo = (escopo) =>
  escopo === 'todos' || escopo === 'admin' ? TODAS_ABAS : TEMAS[escopo] ? [escopo] : [];

const lista = (v) => String(v || '').split(',').map((s) => s.trim()).filter(Boolean);

function tabelaCodigos() {
  const t = [];
  lista(process.env.CODIGO_ADMIN).forEach((c) => t.push([c, 'admin']));
  lista(process.env.CODIGO_ACESSO).forEach((c) => t.push([c, 'todos']));
  for (const [k, v] of Object.entries(TEMAS)) lista(process.env[v.env]).forEach((c) => t.push([c, k]));
  return t;
}

export const algumCodigoConfigurado = () => tabelaCodigos().length > 0;

const hash = (s) => crypto.createHash('sha256').update(String(s)).digest();

// Descobre de qual tema é o código (compara todos, sem vazar informação pelo tempo)
export function identificarCodigo(digitado) {
  if (typeof digitado !== 'string' || !digitado.trim()) return null;
  const a = hash(digitado.trim());
  let achado = null;
  for (const [codigo, escopo] of tabelaCodigos()) {
    if (crypto.timingSafeEqual(a, hash(codigo)) && !achado) achado = escopo;
  }
  return achado;
}

const segredo = () => process.env.SESSAO_SEGREDO || process.env.CODIGO_ADMIN || process.env.CODIGO_ACESSO || '';
const assinar = (v) => crypto.createHmac('sha256', segredo()).update(v).digest('hex');

// Em localhost (http) o navegador descarta cookie "Secure"
const seguro = (req) => (/^(localhost|127\.0\.0\.1)(:|$)/.test((req && req.headers && req.headers.host) || '') ? '' : ' Secure;');
const montar = (req, nome, valor, maxAge) => `${nome}=${valor}; Path=/; HttpOnly;${seguro(req)} SameSite=Lax; Max-Age=${maxAge}`;

export function criarCookie(req, escopo) {
  const dur = escopo === 'admin' ? DIA / 2 : DIA * 30; // médica: 12h · paciente: 30 dias
  const expira = Math.floor(Date.now() / 1000) + dur;
  const base = escopo + '.' + expira;
  return montar(req, COOKIE, base + '.' + assinar(base), dur);
}

export const apagarCookie = (req) => montar(req, COOKIE, '', 0);
export const cookieDispositivo = (req, id) => montar(req, COOKIE_DISP, id, DIA * 365);

export function lerCookie(req, nome) {
  for (const parte of (req.headers.cookie || '').split(';')) {
    const i = parte.indexOf('=');
    if (i > 0 && parte.slice(0, i).trim() === nome) return parte.slice(i + 1).trim();
  }
  return '';
}

export const lerDispositivo = (req) => lerCookie(req, COOKIE_DISP);

// { escopo, abas } ou null
export function lerSessao(req) {
  const token = lerCookie(req, COOKIE);
  if (!token || !segredo()) return null;
  const [escopo, expira, assinatura] = token.split('.');
  if (!escopo || !expira || !assinatura || Number(expira) < Date.now() / 1000) return null;
  if (escopo !== 'todos' && escopo !== 'admin' && !TEMAS[escopo]) return null;
  const esperada = assinar(escopo + '.' + expira);
  if (assinatura.length !== esperada.length || !crypto.timingSafeEqual(Buffer.from(assinatura), Buffer.from(esperada))) return null;
  return { escopo, abas: abasDo(escopo) };
}

export const sessaoValida = (req) => !!lerSessao(req);
