import { useRef, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight, Info, Play } from 'lucide-react';
import Foto from '../components/Foto.jsx';
import VideoTema from '../components/VideoTema.jsx';
import { WhatsIcon } from '../components/Icones.jsx';
import { EASE, aoCarregar, aoRolar } from '../components/animacoes.js';
import { ESPECIALIDADES, buscarEspecialidade } from '../data/especialidades.js';
import { whatsapp } from '../config.js';
import './styles/especialidade.css';

export default function Especialidade() {
    const { id } = useParams();
    const esp = buscarEspecialidade(id);

    if (!esp) return <Navigate to="/#areas" replace />;

    return <Conteudo key={esp.id} esp={esp} />;
}

function Conteudo({ esp }) {
    const tocarVideo = useRef(null);
    const [atual, setAtual] = useState(0);
    const [autoPlay, setAutoPlay] = useState(false);
    const video = esp.videos[atual];
    const varios = esp.videos.length > 1;
    const indice = ESPECIALIDADES.findIndex((e) => e.id === esp.id);
    const anterior = ESPECIALIDADES[(indice - 1 + ESPECIALIDADES.length) % ESPECIALIDADES.length];
    const proxima = ESPECIALIDADES[(indice + 1) % ESPECIALIDADES.length];
    const outras = ESPECIALIDADES.filter((e) => e.id !== esp.id);
    const linkWpp = whatsapp(esp.titulo.toLowerCase());

    const assistir = () => {
        const alvo = document.getElementById('video');
        if (alvo) window.scrollTo({ top: alvo.getBoundingClientRect().top + window.scrollY - 84, behavior: 'smooth' });
        setTimeout(() => tocarVideo.current && tocarVideo.current(), 500);
    };

    return (
        <main className="esp">
            <section className="esp-hero">
                <div className="esp-hero-copy">
                    <motion.nav className="esp-trilha" aria-label="Você está em" {...aoCarregar(0)}>
                        <Link to="/#areas">Especialidades</Link>
                        <ChevronRight size={13} />
                        <span>{esp.titulo}</span>
                    </motion.nav>

                    <motion.span className="esp-contador" {...aoCarregar(0.05)}>
                        <em>{esp.n}</em> / {String(ESPECIALIDADES.length).padStart(2, '0')}
                    </motion.span>

                    <motion.h1 {...aoCarregar(0.12)}>{esp.titulo}</motion.h1>
                    <motion.p className="esp-headline" {...aoCarregar(0.2)}>{esp.headline}</motion.p>
                    <motion.p className="esp-texto" {...aoCarregar(0.28)}>{esp.texto}</motion.p>

                    <motion.div className="esp-acoes" {...aoCarregar(0.36)}>
                        <a className="btn btn-primary" href={linkWpp} target="_blank" rel="noopener noreferrer">
                            <WhatsIcon size={17} />
                            {esp.cta}
                        </a>
                        <button type="button" className="btn-link" onClick={assistir}>
                            {varios ? 'Assistir aos ' + esp.videos.length + ' vídeos' : 'Assistir ao vídeo'}
                            <span className="btn-link-icone">
                                <Play size={12} fill="currentColor" strokeWidth={0} />
                            </span>
                        </button>
                    </motion.div>
                </div>

                <motion.div
                    className="esp-hero-foto"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: EASE }}
                >
                    <Foto src={esp.foto} alt="" posicao={esp.posicaoFoto || 'center 15%'} prioridade />                    <motion.blockquote
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6, ease: EASE }}
                    >
                        “{esp.citacao}”
                    </motion.blockquote>
                </motion.div>
            </section>

            <section className="esp-video" id="video">
                <div className="esp-video-inner">
                    <motion.div className="esp-video-midia" {...aoRolar(0)}>
                        <VideoTema
                            key={video.src}
                            src={video.src}
                            capa={video.capa}
                            chamada={video.titulo}
                            autoPlay={autoPlay}
                            onPronto={(fn) => (tocarVideo.current = fn)}
                        />
                    </motion.div>

                    <div className="esp-video-copy">
                        <motion.span className="eyebrow" {...aoRolar(0.05)}>
                            {varios ? 'Em vídeo · ' + (atual + 1) + ' de ' + esp.videos.length : 'Em vídeo'}
                        </motion.span>
                        <motion.h2 key={video.titulo} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
                            {video.titulo}
                        </motion.h2>
                        <motion.p {...aoRolar(0.16)}>
                            Conteúdos curtos, diretos e baseados em evidência para você chegar à consulta já sabendo
                            o que perguntar.
                        </motion.p>

                        {varios ? (
                            <motion.ol className="esp-playlist" {...aoRolar(0.22)}>
                                {esp.videos.map((v, i) => (
                                    <li key={v.src}>
                                        <button
                                            type="button"
                                            className={i === atual ? 'is-atual' : undefined}
                                            aria-current={i === atual}
                                            onClick={() => {
                                                if (i === atual) {
                                                    tocarVideo.current && tocarVideo.current();
                                                    return;
                                                }
                                                setAtual(i);
                                                setAutoPlay(false);
                                            }}
                                        >
                                            <span className="esp-playlist-n">{String(i + 1).padStart(2, '0')}</span>
                                            <span className="esp-playlist-titulo">{v.titulo}</span>
                                            <span className="esp-playlist-icone">
                                                <Play size={11} fill="currentColor" strokeWidth={0} />
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </motion.ol>
                        ) : (
                            <motion.div {...aoRolar(0.22)}>
                                <button type="button" className="btn btn-light" onClick={() => tocarVideo.current && tocarVideo.current()}>
                                    <Play size={14} fill="currentColor" strokeWidth={0} />
                                    Assistir agora
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            <section className="secao esp-topicos">
                <div className="container">
                    <motion.header className="esp-secao-head" {...aoRolar(0)}>
                        <span className="eyebrow">O que acompanho</span>
                        <h2 className="titulo">
                            Temas em <span className="destaque">{esp.titulo.toLowerCase()}</span>
                        </h2>
                    </motion.header>

                    <ol className="esp-cards">
                        {esp.topicos.map((t, i) => (
                            <motion.li key={t.titulo} {...aoRolar(i * 0.07)}>
                                <span className="esp-card-n">{String(i + 1).padStart(2, '0')}</span>
                                <h3>{t.titulo}</h3>
                                <p>{t.texto}</p>
                            </motion.li>
                        ))}
                    </ol>

                    {esp.situacoes && <Situacoes dados={esp.situacoes} />}

                    {esp.nota && (
                        <motion.aside className="esp-nota" {...aoRolar(0)}>
                            <Info size={18} strokeWidth={1.8} />
                            <p>
                                <strong>Importante</strong>
                                {esp.nota}
                            </p>
                        </motion.aside>
                    )}

                    {esp.emBreve?.length > 0 && (
                        <motion.div className="esp-embreve" {...aoRolar(0)}>
                            <span>Em breve</span>
                            <ul>
                                {esp.emBreve.map((t) => (
                                    <li key={t}>{t}</li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </div>
            </section>

            <section className="esp-cta">
                <motion.div className="container esp-cta-inner" {...aoRolar(0)}>
                    <h2>
                        Vamos conversar sobre o <em>seu momento?</em>
                    </h2>
                    <a className="btn btn-light" href={linkWpp} target="_blank" rel="noopener noreferrer">
                        <WhatsIcon size={17} />
                        {esp.cta}
                    </a>
                </motion.div>
            </section>

            <section className="secao esp-outras">
                <div className="container">
                    <div className="esp-outras-head">
                        <div>
                            <span className="eyebrow">Continue explorando</span>
                            <h2 className="titulo">Outras especialidades</h2>
                        </div>
                        <div className="esp-setas">
                            <Link to={'/especialidades/' + anterior.id} aria-label={'Anterior: ' + anterior.titulo}>
                                <ArrowLeft size={18} />
                            </Link>
                            <Link to={'/especialidades/' + proxima.id} aria-label={'Próxima: ' + proxima.titulo}>
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>

                    <div className="esp-outras-grid">
                        {outras.map((o, i) => (
                            <motion.div key={o.id} {...aoRolar(i * 0.06)}>
                                <Link className="esp-mini" to={'/especialidades/' + o.id}>
                                    <Foto src={o.miniatura} alt="" />
                                    <span className="esp-mini-info">
                                        <em>{o.n}</em>
                                        <strong>{o.titulo}</strong>
                                    </span>
                                    <span className="esp-mini-seta">
                                        <ArrowUpRight size={16} />
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

function Situacoes({ dados }) {
    const trilho = useRef(null);
    const [pos, setPos] = useState(0);

    const mover = (dir) => {
        const el = trilho.current;
        if (!el) return;
        const card = el.querySelector('li');
        el.scrollBy({ left: dir * ((card ? card.offsetWidth : 300) + 16), behavior: 'smooth' });
    };

    return (
        <motion.div className="esp-situacoes" {...aoRolar(0)}>
            <div className="esp-situacoes-head">
                <h3>{dados.titulo}</h3>
                <div className="esp-setas">
                    <button type="button" onClick={() => mover(-1)} aria-label="Anterior" disabled={pos === 0}>
                        <ArrowLeft size={18} />
                    </button>
                    <button type="button" onClick={() => mover(1)} aria-label="Próxima" disabled={pos === dados.itens.length - 1}>
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
            <ol
                ref={trilho}
                className="esp-situacoes-trilho"
                onScroll={(e) => {
                    const el = e.currentTarget;
                    const card = el.querySelector('li');
                    if (card) setPos(Math.round(el.scrollLeft / (card.offsetWidth + 16)));
                }}
            >
                {dados.itens.map((item, i) => (
                    <li key={item}>
                        <span>{String(i + 1).padStart(2, '0')}</span>
                        <p>{item}</p>
                    </li>
                ))}
            </ol>
        </motion.div>
    );
}