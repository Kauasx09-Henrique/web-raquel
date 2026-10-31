// Contagem de acessos no Upstash Redis (Vercel → Storage → Upstash for Redis).
// Sem banco conectado o login continua funcionando — só não conta.

const URL_BANCO = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const TOKEN = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

export const bancoConfigurado = () => !!(URL_BANCO() && TOKEN());

async function redis(comandos) {
  const r = await fetch(URL_BANCO().replace(/\/$/, '') + '/pipeline', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + TOKEN(), 'Content-Type': 'application/json' },
    body: JSON.stringify(comandos.map((c) => c.map(String))),
  });
  if (!r.ok) throw new Error('Redis respondeu ' + r.status);
  return (await r.json()).map((x) => x.result);
}

// data no fuso de Brasília: 2026-10-31
const dia = (d = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(d);
const GUARDAR = 60 * 60 * 24 * 120; // contagem diária fica 120 dias

export async function registrarAcesso(escopo, dispositivo) {
  if (!bancoConfigurado()) return;
  const hoje = dia();
  try {
    await redis([
      ['INCR', 'acessos:total'],
      ['INCR', 'acessos:escopo:' + escopo],
      ['INCR', 'acessos:dia:' + hoje],
      ['EXPIRE', 'acessos:dia:' + hoje, GUARDAR],
      ['PFADD', 'acessos:pessoas', dispositivo],
      ['PFADD', 'acessos:pessoas:' + escopo, dispositivo],
      ['LPUSH', 'acessos:recentes', JSON.stringify({ t: Date.now(), escopo, d: dispositivo.slice(0, 4) })],
      ['LTRIM', 'acessos:recentes', 0, 99],
    ]);
  } catch (e) {
    console.error('Não foi possível registrar o acesso:', e);
  }
}

export async function registrarFalha() {
  if (!bancoConfigurado()) return;
  try {
    await redis([['INCR', 'acessos:falhas']]);
  } catch (e) {
    console.error('Não foi possível registrar a falha:', e);
  }
}

const ESCOPOS = ['todos', 'reproducao', 'climaterio', 'intimas', 'casos'];

export async function lerEstatisticas() {
  const dias = [];
  for (let i = 29; i >= 0; i--) dias.push(dia(new Date(Date.now() - i * 864e5)));

  const r = await redis([
    ['GET', 'acessos:total'],
    ['PFCOUNT', 'acessos:pessoas'],
    ['GET', 'acessos:falhas'],
    ...ESCOPOS.flatMap((e) => [['GET', 'acessos:escopo:' + e], ['PFCOUNT', 'acessos:pessoas:' + e]]),
    ...dias.map((d) => ['GET', 'acessos:dia:' + d]),
    ['LRANGE', 'acessos:recentes', 0, 49],
  ]);

  let i = 0;
  const n = () => Number(r[i++] || 0);
  const total = n();
  const pessoas = n();
  const falhas = n();
  const porTema = ESCOPOS.map((escopo) => ({ escopo, acessos: n(), pessoas: n() }));
  const porDia = dias.map((d) => ({ dia: d, acessos: n() }));
  const recentes = (r[i] || [])
    .map((x) => {
      try {
        return JSON.parse(x);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  return {
    total,
    pessoas,
    falhas,
    hoje: porDia[porDia.length - 1].acessos,
    semana: porDia.slice(-7).reduce((s, d) => s + d.acessos, 0),
    porTema,
    porDia,
    recentes,
  };
}
