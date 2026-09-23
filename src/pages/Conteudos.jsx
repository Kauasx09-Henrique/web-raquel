import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, LogOut, Loader2 } from 'lucide-react';
import VideoTema from '../components/VideoTema.jsx';
import './styles/especialidade.css'; // estilos do player (VideoTema)
import './styles/conteudos.css';

const EASE = [0.16, 1, 0.3, 1];

export default function Conteudos() {
  const navigate = useNavigate();
  const [lista, setLista] = useState(null);
  const [tema, setTema] = useState('Todos');
  const [aberto, setAberto] = useState(null);
  const [falha, setFalha] = useState('');

  // busca os conteúdos; sem login → volta para /login
  useEffect(() => {
    let ativo = true;
    fetch('/api/conteudos', { credentials: 'same-origin' })
      .then((r) => {
        if (r.status === 401) {
          navigate('/login', { replace: true });
          return null;
        }
        return r.json().then((d) => {
          if (!r.ok || !Array.isArray(d.conteudos)) throw new Error(`erro ${r.status}${d.erro ? ': ' + d.erro : ''}`);
          return d;
        });
      })
      .then((d) => ativo && d && setLista(d.conteudos))
      .catch((e) => {
        if (!ativo) return;
        console.error('Falha ao carregar conteúdos:', e);
        setFalha(e.message || 'erro desconhecido');
        setLista([]);
      });
    return () => {
      ativo = false;
    };
  }, [navigate]);

  // Esc fecha o vídeo
  useEffect(() => {
    if (!aberto) return;
    const esc = (e) => e.key === 'Escape' && setAberto(null);
    window.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', esc);
      document.body.style.overflow = '';
    };
  }, [aberto]);

  const temas = useMemo(() => ['Todos', ...new Set((lista || []).map((c) => c.tema))], [lista]);
  const visiveis = (lista || []).filter((c) => tema === 'Todos' || c.tema === tema);

  const sair = async () => {
    await fetch('/api/logout', { method: 'POST' }).catch(() => {});
    navigate('/login', { replace: true });
  };

  if (!lista) {
    return (
      <main className="conteudos conteudos-carregando">
        <Loader2 size={28} className="girando" />
      </main>
    );
  }

  return (
    <main className="conteudos">
      <section className="conteudos-topo">
        <div className="container conteudos-topo-inner">
          <div>
            <p className="eyebrow">Área exclusiva</p>
            <h1>
              Biblioteca de <em>conteúdos</em>
            </h1>
            <p className="conteudos-lead">
              Vídeos curtos, feitos pela Dra. Raquel, para você entender cada etapa do seu cuidado.
            </p>
          </div>
          <button type="button" className="btn btn-outline conteudos-sair" onClick={sair}>
            <LogOut size={14} /> Sair
          </button>
        </div>
      </section>

      <section className="container conteudos-corpo">
        {lista.length > 0 && (
        <div className="conteudos-filtros" role="tablist" aria-label="Filtrar por tema">
          {temas.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tema === t}
              className={tema === t ? 'is-ativo' : undefined}
              onClick={() => setTema(t)}
            >
              {t}
              <span>{t === 'Todos' ? lista.length : lista.filter((c) => c.tema === t).length}</span>
            </button>
          ))}
        </div>
        )}

        <motion.div layout className="conteudos-grid">
          <AnimatePresence mode="popLayout">
            {visiveis.map((c, i) => (
              <motion.button
                layout
                key={c.id}
                type="button"
                className="conteudo-card"
                onClick={() => setAberto(c)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: i * 0.03, ease: EASE }}
              >
                <span className="conteudo-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="conteudo-play">
                  <Play size={16} fill="currentColor" strokeWidth={0} />
                </span>
                <span className="conteudo-tema">{c.tema}</span>
                <span className="conteudo-titulo">{c.titulo}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {visiveis.length === 0 && (
          <p className="conteudos-vazio">
            {falha ? 'Não foi possível carregar os vídeos.' : 'Nenhum conteúdo por aqui ainda.'}
            {falha && <small>({falha})</small>}
          </p>
        )}
      </section>

      <AnimatePresence>
        {aberto && (
          <motion.div
            className="conteudo-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAberto(null)}
          >
            <motion.div
              className="conteudo-modal-caixa"
              initial={{ y: 30, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.97 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <VideoTema key={aberto.id} src={aberto.src} chamada={aberto.titulo} autoPlay />
              <div className="conteudo-modal-info">
                <span>{aberto.tema}</span>
                <p>{aberto.titulo}</p>
              </div>
            </motion.div>
            <button type="button" className="conteudo-modal-fechar" onClick={() => setAberto(null)} aria-label="Fechar">
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
