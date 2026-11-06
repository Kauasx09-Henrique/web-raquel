import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, X, LogOut, Loader2, Sprout, Flower2, Sparkles, Microscope, Clapperboard,
  BookOpen, ArrowUpRight, Clock, Eye, ShieldCheck, MoveHorizontal, Volume2, VolumeX,
} from 'lucide-react';
import { driveEmbed, driveImagem } from '../components/drive.js';
import './styles/especialidade.css';
import './styles/conteudos.css';
import AreaEstudo from './AreaEstudo';

const EASE = [0.16, 1, 0.3, 1];

const ABAS = [
  { id: 'reproducao', rotulo: 'Reprodução Humana', icone: Sprout, tema: 'Reprodução Humana' },
  { id: 'climaterio', rotulo: 'Climatério', icone: Flower2, tema: 'Climatério' },
  { id: 'intimas', rotulo: 'Cirurgias íntimas', icone: Sparkles, tema: 'Saúde Íntima' },
  { id: 'casos', rotulo: 'Casos reais', icone: Microscope },
  { id: 'videos', rotulo: 'Todos os vídeos', icone: Clapperboard },
];

const INTRO = {
  reproducao: { eyebrow: 'Reprodução Humana', titulo: <>A sua jornada pela <em>fertilidade</em></>, texto: 'O guia completo e os vídeos para entender cada etapa.' },
  climaterio: { eyebrow: 'Climatério', titulo: <>Uma nova fase, <em>com cuidado</em></>, texto: 'Informação clara sobre as mudanças do corpo.' },
  intimas: { eyebrow: 'Cirurgias íntimas', titulo: <>Expectativas <em>reais</em></>, texto: 'Casos reais de pacientes para visualizar o que é possível alcançar.' },
  casos: { eyebrow: 'Casos reais', titulo: <>O que a medicina <em>vê</em></>, texto: 'Imagens e vídeos curtos de procedimentos reais.' },
  videos: { eyebrow: 'Biblioteca', titulo: <>Todos os <em>vídeos</em></>, texto: 'Vídeos curtos para entender cada etapa do seu cuidado.' },
};

function EmBreve({ texto = 'Conteúdo em preparação. Em breve por aqui.' }) {
  return (
    <div className="cx-embreve">
      <Clock size={18} strokeWidth={1.6} />
      <p>{texto}</p>
    </div>
  );
}

function GradeVideos({ videos, onAbrir }) {
  if (!videos.length) return <EmBreve texto="Os vídeos deste tema estão em produção." />;
  return (
    <div className="conteudos-grid">
      {videos.map((c, i) => (
        <motion.button
          key={c.id}
          type="button"
          className="conteudo-card"
          onClick={() => onAbrir({ tipo: 'video', ...c })}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.04, ease: EASE }}
        >
          <span className="conteudo-num">{String(i + 1).padStart(2, '0')}</span>
          <span className="conteudo-play"><Play size={16} fill="currentColor" strokeWidth={0} /></span>
          <span className="conteudo-tema">{c.tema}</span>
          <span className="conteudo-titulo">{c.titulo}</span>
        </motion.button>
      ))}
    </div>
  );
}

// Guia: poster como capa → no hover desfoca e o vídeo aparece nítido
function Guia({ guia, onAbrir }) {
  const videoRef = useRef(null);
  const ativoRef = useRef(false);
  const ponteiroRef = useRef('mouse');
  const [tocando, setTocando] = useState(false);
  const [mudo, setMudo] = useState(true);

  if (!guia) return null;
  const pronto = !!guia.link;
  const temVideo = !!guia.video;
  const nome = guia.titulo.replace(/^Guia (d[aoe] )?/i, '');

  const ligar = () => {
    const v = videoRef.current;
    if (!temVideo || !v || ativoRef.current) return;
    ativoRef.current = true;
    v.play()
      .then(() => (ativoRef.current ? setTocando(true) : v.pause()))
      .catch(() => (ativoRef.current = false));
  };

  const desligar = () => {
    ativoRef.current = false;
    setTocando(false);
    videoRef.current?.pause();
  };

  const alternarSom = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMudo(v.muted);
    if (!ativoRef.current) ligar();
  };

  return (
    <motion.article
      className="cx-guia"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div
        className={'cx-guia-midia' + (tocando ? ' is-tocando' : '') + (guia.poster ? '' : ' sem-poster')}
        onPointerEnter={(e) => { ponteiroRef.current = e.pointerType; if (e.pointerType === 'mouse') ligar(); }}
        onPointerLeave={(e) => e.pointerType === 'mouse' && desligar()}
        onPointerDown={(e) => (ponteiroRef.current = e.pointerType)}
        onClick={() => ponteiroRef.current !== 'mouse' && (tocando ? desligar() : ligar())}
      >
        {guia.poster ? (
          <img className="cx-guia-poster" src={guia.poster} alt={guia.titulo} />
        ) : (
          <span className="cx-guia-poster cx-guia-poster-vazio" aria-hidden="true">
            <span>Guia</span>
            <strong>{nome}</strong>
          </span>
        )}

        {temVideo && (
          <>
            <video
              ref={videoRef}
              className="cx-guia-video"
              src={guia.video}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
            <span className="cx-guia-selo">
              <Play size={10} fill="currentColor" strokeWidth={0} /> Prévia
            </span>
            <button
              type="button"
              className="cx-guia-som"
              onClick={alternarSom}
              aria-label={mudo ? 'Ligar o som' : 'Desligar o som'}
            >
              {mudo ? <VolumeX size={16} strokeWidth={1.8} /> : <Volume2 size={16} strokeWidth={1.8} />}
            </button>
          </>
        )}
      </div>

      <div className="cx-guia-txt">
        <span className="cx-rotulo"><BookOpen size={14} strokeWidth={1.8} /> Material exclusivo</span>
        <h3>{guia.titulo}</h3>
        <p>{guia.descricao}</p>
        {pronto ? (
          <div className="cx-guia-acoes">
            <button type="button" className="btn btn-primary" onClick={() => onAbrir({ tipo: 'pdf', titulo: guia.titulo, src: guia.link })}>Ler o guia</button>
            <a className="btn-link" href={guia.link} target="_blank" rel="noopener noreferrer">Abrir num novo separador <span className="btn-link-icone"><ArrowUpRight size={16} strokeWidth={2} /></span></a>
          </div>
        ) : (
          <span className="cx-selo-embreve"><Clock size={14} strokeWidth={1.8} /> Em produção</span>
        )}
      </div>
    </motion.article>
  );
}

function Comparador({ item }) {
  const [pos, setPos] = useState(50);
  return (
    <figure className="cx-comp">
      <div className="cx-comp-area" style={{ '--pos': pos + '%' }}>
        <img src={driveImagem(item.depois)} alt={item.procedimento + ' — depois'} loading="lazy" draggable="false" />
        <div className="cx-comp-antes"><img src={driveImagem(item.antes)} alt={item.procedimento + ' — antes'} loading="lazy" draggable="false" /></div>
        <span className="cx-comp-tag cx-comp-tag-antes">Antes</span>
        <span className="cx-comp-tag cx-comp-tag-depois">Depois</span>
        <span className="cx-comp-linha" aria-hidden="true"><span className="cx-comp-alca"><MoveHorizontal size={18} strokeWidth={1.8} /></span></span>
        <input className="cx-comp-range" type="range" min="0" max="100" value={pos} onChange={(e) => setPos(Number(e.target.value))} />
      </div>
      <figcaption>
        <strong>{item.procedimento}</strong>
        {item.legenda && <span>{item.legenda}</span>}
      </figcaption>
    </figure>
  );
}

function CardCaso({ caso, revelado, onRevelar, onAbrir, i }) {
  const foto = caso.tipo === 'foto';
  return (
    <motion.article
      layout
      className={'cx-caso' + (revelado ? ' is-revelado' : '')}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: i * 0.04, ease: EASE }}
    >
      <button type="button" className="cx-caso-midia" onClick={() => (revelado ? onAbrir(caso) : onRevelar(caso.id))}>
        {foto ? <img src={driveImagem(caso.src, 900)} alt={caso.titulo} loading="lazy" /> : <span className="cx-caso-video-fundo" />}
        {!revelado ? (
          <span className="cx-caso-aviso">
            <Eye size={18} strokeWidth={1.6} />
            <strong>Imagem médica</strong><small>Toque para visualizar</small>
          </span>
        ) : (
          !foto && <span className="conteudo-play cx-caso-play"><Play size={16} fill="currentColor" strokeWidth={0} /></span>
        )}
      </button>
      <div className="cx-caso-info">
        <span className="cx-rotulo">{caso.categoria} · {foto ? 'Foto' : 'Vídeo'}</span>
        <p>{caso.titulo}</p>
      </div>
    </motion.article>
  );
}

export default function Conteudos() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [dados, setDados] = useState(null);
  const [aberto, setAberto] = useState(null);
  const [falha, setFalha] = useState('');
  const [categoria, setCategoria] = useState('Todos');
  const [revelados, setRevelados] = useState({});

  // abas liberadas pelo código usado no login (vem da API)
  const permitidas = dados && Array.isArray(dados.abas) ? ABAS.filter((a) => dados.abas.includes(a.id)) : ABAS;
  const aba = permitidas.some((a) => a.id === params.get('aba')) ? params.get('aba') : (permitidas[0] || ABAS[0]).id;

  const trocarAba = (id) => {
    setParams({ aba: id }, { replace: true });
    setCategoria('Todos');
    setAberto(null);
  };

  useEffect(() => {
    let ativo = true;
    fetch('/api/conteudos', { credentials: 'include', cache: 'no-store' })
      .then((r) => {
        if (r.status === 401) { navigate('/login', { replace: true }); return null; }
        return r.json().then((d) => { if (!r.ok || !Array.isArray(d.conteudos)) throw new Error(`erro ${r.status}`); return d; });
      })
      .then((d) => ativo && d && setDados({ conteudos: d.conteudos, guias: d.guias || {}, antesDepois: d.antesDepois || [], casos: d.casos || [], abas: d.abas }))
      .catch((e) => {
        if (!ativo) return;
        setFalha(e.message || 'erro desconhecido');
        setDados({ conteudos: [], guias: {}, antesDepois: [], casos: [], abas: [] });
      });
    return () => { ativo = false; };
  }, [navigate]);

  // Modais de foto/pdf ainda fecham no ESC
  useEffect(() => {
    if (!aberto || aberto.tipo === 'video') return;
    const esc = (e) => e.key === 'Escape' && setAberto(null);
    window.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [aberto]);

  const categorias = useMemo(() => ['Todos', ...new Set((dados?.casos || []).map((c) => c.categoria))], [dados]);

  const sair = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' }).catch(() => { });
    navigate('/login', { replace: true });
  };

  if (!dados) {
    return (
      <main className="conteudos conteudos-carregando">
        <Loader2 size={28} className="girando" />
      </main>
    );
  }

  const abaAtual = ABAS.find((a) => a.id === aba);
  const intro = INTRO[aba];
  const videosDoTema = abaAtual.tema ? dados.conteudos.filter((c) => c.tema === abaAtual.tema) : [];
  const casosVisiveis = dados.casos.filter((c) => categoria === 'Todos' || c.categoria === categoria);

  return (
    <main className="conteudos">
      <section className="conteudos-topo">
        <div className="container conteudos-topo-inner">
          <div>
            <p className="eyebrow">Área exclusiva</p>
            <h1>Bem-vinda ao seu <em>espaço</em></h1>
            <p className="conteudos-lead">Guias, vídeos e casos reais preparados para acompanhar cada etapa do cuidado.</p>
          </div>
          <button type="button" className="btn btn-outline conteudos-sair" onClick={sair}><LogOut size={14} /> Sair</button>
        </div>

        <div className="container">
          <nav className="cx-abas" role="tablist">
            {permitidas.map((a) => {
              const Icone = a.icone;
              return (
                <button
                  key={a.id} type="button" role="tab" aria-selected={aba === a.id}
                  className={'cx-aba' + (aba === a.id ? ' is-ativo' : '')} onClick={() => trocarAba(a.id)}
                >
                  <Icone size={16} strokeWidth={1.7} /> {a.rotulo}
                  {aba === a.id && <motion.span layoutId="cx-aba-marca" className="cx-aba-marca" transition={{ duration: 0.5, ease: EASE }} />}
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      <section className="container conteudos-corpo">
        <AnimatePresence mode="wait">
          <motion.div key={aba} className="cx-painel" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: EASE }}>

            <header className="cx-intro">
              <p className="eyebrow">{intro.eyebrow}</p>
              <h2>{intro.titulo}</h2>
              <p>{intro.texto}</p>
            </header>

            {(aba === 'reproducao' || aba === 'climaterio') && (
              <>
                <Guia guia={dados.guias[aba]} onAbrir={setAberto} />

                <AnimatePresence>
                  {aberto && aberto.tipo === 'video' && (
                    <AreaEstudo key="estudo-inline" conteudo={aberto} fechar={() => setAberto(null)} />
                  )}
                </AnimatePresence>

                <h3 className="cx-subtitulo">Vídeos sobre {abaAtual.rotulo.toLowerCase()}</h3>
                <GradeVideos videos={videosDoTema} onAbrir={setAberto} />
              </>
            )}

            {aba === 'intimas' && (
              <>
                <div className="cx-nota"><ShieldCheck size={18} strokeWidth={1.6} /><p>Imagens publicadas com autorização. Os resultados variam.</p></div>
                {dados.antesDepois.length ? (
                  <div className="cx-comp-grade">{dados.antesDepois.map((item) => <Comparador key={item.id} item={item} />)}</div>
                ) : <EmBreve />}

                <AnimatePresence>
                  {aberto && aberto.tipo === 'video' && (
                    <AreaEstudo key="estudo-inline" conteudo={aberto} fechar={() => setAberto(null)} />
                  )}
                </AnimatePresence>

                <h3 className="cx-subtitulo">Vídeos sobre saúde íntima</h3>
                <GradeVideos videos={videosDoTema} onAbrir={setAberto} />
              </>
            )}

            {aba === 'casos' && (
              <>
                <div className="cx-nota"><Eye size={18} strokeWidth={1.6} /><p>Conteúdo médico real. Imagens desfocadas até escolha de visualização.</p></div>
                {dados.casos.length > 0 && (
                  <div className="conteudos-filtros" role="tablist">
                    {categorias.map((c) => (
                      <button
                        key={c} type="button" role="tab" aria-selected={categoria === c}
                        className={categoria === c ? 'is-ativo' : undefined} onClick={() => setCategoria(c)}
                      >
                        {c}<span>{c === 'Todos' ? dados.casos.length : dados.casos.filter((x) => x.categoria === c).length}</span>
                      </button>
                    ))}
                  </div>
                )}

                <AnimatePresence>
                  {aberto && aberto.tipo === 'video' && (
                    <AreaEstudo key="estudo-inline" conteudo={aberto} fechar={() => setAberto(null)} />
                  )}
                </AnimatePresence>

                {casosVisiveis.length ? (
                  <motion.div layout className="cx-casos-grade">
                    <AnimatePresence mode="popLayout">
                      {casosVisiveis.map((c, i) => (
                        <CardCaso key={c.id} caso={c} i={i} revelado={!!revelados[c.id]} onRevelar={(id) => setRevelados((r) => ({ ...r, [id]: true }))} onAbrir={setAberto} />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : <EmBreve />}
              </>
            )}

            {aba === 'videos' && (
              <>
                <AnimatePresence>
                  {aberto && aberto.tipo === 'video' && (
                    <AreaEstudo key="estudo-inline" conteudo={aberto} fechar={() => setAberto(null)} />
                  )}
                </AnimatePresence>
                <GradeVideos videos={dados.conteudos} onAbrir={setAberto} />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* APENAS PARA PDF E FOTO (MODAL ANTIGO MANTIDO INTACTO) */}
      <AnimatePresence>
        {aberto && aberto.tipo !== 'video' && (
          <motion.div className="conteudo-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAberto(null)}>
            <motion.div
              className={'conteudo-modal-caixa' + (aberto.tipo === 'pdf' ? ' is-pdf' : aberto.tipo === 'foto' ? ' is-foto' : '')}
              initial={{ y: 30, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.97 }} transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              {aberto.tipo === 'pdf' && <iframe className="cx-modal-pdf" src={driveEmbed(aberto.src) || aberto.src} title={aberto.titulo} allow="autoplay" />}
              {aberto.tipo === 'foto' && <img className="cx-modal-foto" src={driveImagem(aberto.src, 2000)} alt={aberto.titulo} />}
              <div className="conteudo-modal-info"><span>{aberto.tema || aberto.categoria || 'Guia'}</span><p>{aberto.titulo}</p></div>
            </motion.div>
            <button type="button" className="conteudo-modal-fechar" onClick={() => setAberto(null)} aria-label="Fechar"><X size={20} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
