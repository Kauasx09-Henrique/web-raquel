import { useEffect, useRef, useState } from 'react';
import { Play, VideoOff } from 'lucide-react';

/* Vídeo local com capa + play. A moldura assume o formato real do vídeo (sem faixas pretas).
   Se o arquivo não existir, mostra um aviso em vez de quebrar. */
export default function VideoTema({ src, capa, chamada, className = '', onPronto, autoPlay = false }) {
  const ref = useRef(null);
  const [tocando, setTocando] = useState(false);
  const [erro, setErro] = useState(false);
  const [proporcao, setProporcao] = useState(null);

  const tocar = () => {
    const v = ref.current;
    if (!v || erro) return;
    // play() devolve uma promessa: se o arquivo faltar, cai aqui em vez de estourar no console
    const p = v.play();
    if (p && p.catch) {
      p.then(() => setTocando(true)).catch((e) => {
        if (e && e.name === 'NotAllowedError') return; // navegador bloqueou autoplay: fica a capa
        console.warn('Vídeo não encontrado:', src);
        setErro(true);
        setTocando(false);
      });
    }
  };

  useEffect(() => {
    setErro(false);
    if (autoPlay) tocar();
  }, [autoPlay, src]);

  return (
    <div
      className={'video-tema' + (tocando ? ' is-tocando' : '') + (className ? ' ' + className : '')}
      style={proporcao ? { aspectRatio: proporcao } : undefined}
    >
      <video
        ref={(el) => {
          ref.current = el;
          if (el && onPronto) onPronto(tocar);
        }}
        src={src}
        poster={capa}
        preload="metadata"
        playsInline
        controls={tocando}
        onError={() => setErro(true)}
        onLoadedMetadata={(e) => {
          const { videoWidth, videoHeight } = e.currentTarget;
          if (videoWidth && videoHeight) setProporcao(videoWidth + ' / ' + videoHeight);
        }}
        onPlay={() => setTocando(true)}
        onPause={() => setTocando(false)}
        onEnded={() => setTocando(false)}
      />

      {erro ? (
        <div className="video-tema-erro">
          <VideoOff size={26} strokeWidth={1.6} />
          <p>Vídeo em breve</p>
          <span>{chamada}</span>
        </div>
      ) : (
        !tocando && (
          <button type="button" className="video-tema-capa" onClick={tocar} aria-label={'Assistir: ' + chamada}>
            <span className="video-tema-play">
              <Play size={22} fill="currentColor" strokeWidth={0} />
            </span>
            <span className="video-tema-chamada">{chamada}</span>
          </button>
        )
      )}
    </div>
  );
}
