import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ArrowRight } from 'lucide-react';
import Foto from '../components/Foto.jsx';
import { EASE, aoRolar } from '../components/animacoes.js';
import { REEL_CONSULTA, CLINICA } from '../config.js';
import './styles/consulta.css';

export default function Consulta() {
  const [aberto, setAberto] = useState(false);

  // fecha com Esc e trava o scroll do fundo enquanto o vídeo está aberto
  useEffect(() => {
    if (!aberto) return;
    const esc = (e) => e.key === 'Escape' && setAberto(false);
    window.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', esc);
      document.body.style.overflow = '';
    };
  }, [aberto]);

  return (
    <section className="secao consulta" id="consulta">
      <div className="container consulta-grid">
        <motion.div {...aoRolar(0)}>
          <button
            type="button"
            className="video-card"
            onClick={() => setAberto(true)}
            aria-label="Assistir: o que acontece na consulta"
          >
            <Foto src={REEL_CONSULTA.capa} alt="" posicao="50% 25%" />
            <span className="video-play">
              <Play size={24} fill="currentColor" strokeWidth={0} />
            </span>
            <span className="video-legenda">O que acontece na consulta?</span>
          </button>
        </motion.div>

        <div className="consulta-copy">
          <motion.span className="eyebrow" {...aoRolar(0.05)}>
            Como é a minha consulta?
          </motion.span>
          <motion.h2 className="titulo" {...aoRolar(0.1)}>
            Mais do que uma consulta, um momento para cuidar de você.
          </motion.h2>
          <motion.p className="texto" {...aoRolar(0.15)}>
            Cada mulher chega ao consultório com uma história, uma necessidade e um momento de vida
            diferentes. Minha consulta começa pela escuta, passa por uma avaliação individualizada e
            termina com um plano de cuidado construído junto com você.
          </motion.p>
          <motion.div {...aoRolar(0.2)}>
            <button type="button" className="btn btn-primary" onClick={() => setAberto(true)}>
              <Play size={13} fill="currentColor" strokeWidth={0} />
              Assista: como é a minha consulta
              <ArrowRight size={15} />
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.div
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAberto(false)}
          >
            <motion.div
              className="modal-video"
              initial={{ y: 30, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.97 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              {REEL_CONSULTA.embed ? (
                <iframe
                  title="Como é a minha consulta"
                  src={REEL_CONSULTA.embed}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="modal-vazio">
                  <p>Assista ao vídeo completo no Instagram da Dra. Raquel.</p>
                  <a className="btn btn-light" href={CLINICA.instagram} target="_blank" rel="noopener noreferrer">
                    Abrir no Instagram
                  </a>
                </div>
              )}
            </motion.div>
            <button type="button" className="modal-fechar" onClick={() => setAberto(false)} aria-label="Fechar vídeo">
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
