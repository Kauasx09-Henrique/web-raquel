import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, LogIn, CalendarDays, ShieldAlert, RefreshCw, LogOut, Lock, Loader2, Database, ArrowRight } from 'lucide-react';
import './styles/painel.css';

const EASE = [0.16, 1, 0.3, 1];

const NOMES = {
    todos: 'Acesso completo',
    reproducao: 'Reprodução Humana',
    climaterio: 'Climatério',
    intimas: 'Cirurgias íntimas',
    casos: 'Casos reais',
};

const fmtDia = (iso) => iso.slice(8, 10) + '/' + iso.slice(5, 7);
const fmtHora = (t) =>
    new Date(t).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
const num = (n) => Number(n || 0).toLocaleString('pt-BR');

const entra = (d = 0) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: d, ease: EASE },
});

export default function Painel() {
    const navigate = useNavigate();
    const [estado, setEstado] = useState('carregando'); // carregando | login | ok | erro
    const [dados, setDados] = useState(null);
    const [erro, setErro] = useState('');
    const [codigo, setCodigo] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [atualizando, setAtualizando] = useState(false);

    const carregar = useCallback(async () => {
        setAtualizando(true);
        try {
            const r = await fetch('/api/painel', { credentials: 'include', cache: 'no-store' });
            if (r.status === 401 || r.status === 403) {
                setEstado('login');
                return;
            }
            const d = await r.json().catch(() => ({}));
            if (!r.ok) throw new Error(d.erro || 'erro ' + r.status);
            setDados(d);
            setEstado('ok');
        } catch (e) {
            setErro(e.message);
            setEstado('erro');
        } finally {
            setAtualizando(false);
        }
    }, []);

    useEffect(() => {
        carregar();
    }, [carregar]);

    const entrar = async (e) => {
        e.preventDefault();
        if (!codigo.trim() || enviando) return;
        setEnviando(true);
        setErro('');
        try {
            const r = await fetch('/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ codigo }),
            });
            const d = await r.json().catch(() => ({}));
            if (!r.ok) return setErro(r.status === 401 ? 'Código incorreto.' : 'Não foi possível entrar (erro ' + r.status + ').');
            if (d.escopo !== 'admin') return setErro('Este é um código de paciente — não abre o painel.');
            setCodigo('');
            setEstado('carregando');
            carregar();
        } catch {
            setErro('Sem conexão. Tente novamente.');
        } finally {
            setEnviando(false);
        }
    };

    const sair = async () => {
        await fetch('/api/logout', { method: 'POST', credentials: 'include' }).catch(() => { });
        navigate('/', { replace: true });
    };

    if (estado === 'carregando') {
        return (
            <main className="painel painel-centro">
                <Loader2 size={28} className="girando" />
            </main>
        );
    }

    if (estado === 'login') {
        return (
            <main className="painel painel-centro">
                <motion.form className="painel-login" onSubmit={entrar} {...entra()}>
                    <span className="painel-login-icone">
                        <Lock size={20} strokeWidth={1.8} />
                    </span>
                    <p className="eyebrow">Acesso restrito</p>
                    <h1>Painel da médica</h1>
                    <p className="painel-login-txt">Digite o código de administradora para ver os acessos à área exclusiva.</p>
                    <input
                        type="password"
                        value={codigo}
                        onChange={(e) => {
                            setCodigo(e.target.value);
                            if (erro) setErro('');
                        }}
                        placeholder="Código da médica"
                        autoFocus
                        aria-label="Código da médica"
                    />
                    <p className="painel-erro" role="alert">{erro}</p>
                    <button type="submit" className="btn btn-primary" disabled={enviando || !codigo.trim()}>
                        {enviando ? <Loader2 size={16} className="girando" /> : null}
                        {enviando ? 'Entrando…' : 'Entrar'}
                        {!enviando && <ArrowRight size={16} />}
                    </button>
                </motion.form>
            </main>
        );
    }

    if (estado === 'erro') {
        return (
            <main className="painel painel-centro">
                <div className="painel-login">
                    <p className="eyebrow">Algo deu errado</p>
                    <h1>Não foi possível carregar</h1>
                    <p className="painel-login-txt">{erro}</p>
                    <button type="button" className="btn btn-primary" onClick={carregar}>
                        Tentar novamente
                    </button>
                </div>
            </main>
        );
    }

    const maxDia = Math.max(1, ...(dados.porDia || []).map((d) => d.acessos));
    const maxTema = Math.max(1, ...(dados.porTema || []).map((t) => t.acessos));

    return (
        <main className="painel">
            <section className="painel-topo">
                <div className="container painel-topo-inner">
                    <div>
                        <p className="eyebrow">Painel da médica</p>
                        <h1>
                            Acessos à área <em>exclusiva</em>
                        </h1>
                    </div>
                    <div className="painel-acoes">
                        <button type="button" className="btn btn-outline" onClick={carregar} disabled={atualizando}>
                            <RefreshCw size={14} className={atualizando ? 'girando' : undefined} /> Atualizar
                        </button>
                        <button type="button" className="btn btn-outline" onClick={sair}>
                            <LogOut size={14} /> Sair
                        </button>
                    </div>
                </div>
            </section>

            <section className="container painel-corpo">
                {!dados.configurado ? (
                    <motion.div className="painel-aviso" {...entra()}>
                        <Database size={22} strokeWidth={1.6} />
                        <div>
                            <strong>Contagem ainda não ativada</strong>
                            <p>
                                Na Vercel, abra <b>Storage → Create Database → Upstash for Redis</b>, conecte a este projeto e faça
                                Redeploy. A partir daí cada login de paciente passa a ser contado aqui.
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <>
                        <div className="painel-cards">
                            {[
                                { icone: LogIn, rotulo: 'Logins no total', valor: dados.total },
                                { icone: Users, rotulo: 'Pessoas diferentes', valor: dados.pessoas, nota: 'aparelhos únicos' },
                                { icone: CalendarDays, rotulo: 'Logins hoje', valor: dados.hoje, nota: num(dados.semana) + ' nos últimos 7 dias' },
                                { icone: ShieldAlert, rotulo: 'Código errado', valor: dados.falhas, nota: 'tentativas recusadas' },
                            ].map((c, i) => {
                                const Icone = c.icone;
                                return (
                                    <motion.article key={c.rotulo} className="painel-card" {...entra(i * 0.06)}>
                                        <span className="painel-card-icone">
                                            <Icone size={17} strokeWidth={1.7} />
                                        </span>
                                        <span className="painel-card-rotulo">{c.rotulo}</span>
                                        <strong className="painel-card-valor">{num(c.valor)}</strong>
                                        {c.nota && <span className="painel-card-nota">{c.nota}</span>}
                                    </motion.article>
                                );
                            })}
                        </div>

                        <div className="painel-duas">
                            <motion.article className="painel-bloco" {...entra(0.2)}>
                                <h2>Últimos 30 dias</h2>
                                <div className="painel-grafico" role="img" aria-label="Logins por dia nos últimos 30 dias">
                                    {dados.porDia.map((d) => (
                                        <span key={d.dia} className="painel-barra" title={fmtDia(d.dia) + ': ' + d.acessos + ' login(s)'}>
                                            <span style={{ height: (d.acessos / maxDia) * 100 + '%' }} />
                                        </span>
                                    ))}
                                </div>
                                <div className="painel-grafico-eixo">
                                    <span>{fmtDia(dados.porDia[0].dia)}</span>
                                    <span>Hoje</span>
                                </div>
                            </motion.article>

                            <motion.article className="painel-bloco" {...entra(0.26)}>
                                <h2>Por tema</h2>
                                <ul className="painel-temas">
                                    {dados.porTema.map((t) => (
                                        <li key={t.escopo}>
                                            <div className="painel-tema-linha">
                                                <span>{NOMES[t.escopo] || t.escopo}</span>
                                                <strong>{num(t.acessos)}</strong>
                                            </div>
                                            <span className="painel-tema-trilho">
                                                <span style={{ width: (t.acessos / maxTema) * 100 + '%' }} />
                                            </span>
                                            <small>{num(t.pessoas)} pessoa(s)</small>
                                        </li>
                                    ))}
                                </ul>
                            </motion.article>
                        </div>

                        <motion.article className="painel-bloco" {...entra(0.32)}>
                            <h2>Logins recentes</h2>
                            {dados.recentes.length ? (
                                <ol className="painel-recentes">
                                    {dados.recentes.map((r, i) => (
                                        <li key={r.t + '-' + i}>
                                            <span className="painel-rec-hora">{fmtHora(r.t)}</span>
                                            <span className="painel-rec-tema">{NOMES[r.escopo] || r.escopo}</span>
                                            <span className="painel-rec-disp">Aparelho {r.d || '—'}</span>
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <p className="painel-vazio">Nenhum login de paciente ainda.</p>
                            )}
                        </motion.article>

                        <p className="painel-nota">
                            “Pessoas diferentes” conta aparelhos: a mesma paciente no celular e no computador conta como 2. Como os
                            códigos são compartilhados por tema, o painel não identifica quem é a paciente.
                        </p>
                    </>
                )}
            </section>
        </main>
    );
}
