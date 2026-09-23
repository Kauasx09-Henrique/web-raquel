import { useRef, useState } from 'react';
import { Play } from 'lucide-react';

/* Vídeo local com capa + play. A moldura assume o formato real do vídeo (sem faixas pretas).
   Exponha o "tocar" para botões de fora via onPronto(fn). */
export default function VideoTema({ src, capa, chamada, className = '', onPronto }) {
  const ref = useRef(null);
  const [tocando, setTocando] = useState(false);
  const [proporcao, setProporcao] = useState(null);

  const tocar = () => {
    const v = ref.current;
    if (!v) return;
    v.play();
    setTocando(true);
  };

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
        onLoadedMetadata={(e) => {
          const { videoWidth, videoHeight } = e.currentTarget;
          if (videoWidth && videoHeight) setProporcao(videoWidth + ' / ' + videoHeight);
        }}
        onPlay={() => setTocando(true)}
        onPause={() => setTocando(false)}
        onEnded={() => setTocando(false)}
      />
      {!tocando && (
        <button type="button" className="video-tema-capa" onClick={tocar} aria-label={'Assistir: ' + chamada}>
          <span className="video-tema-play">
            <Play size={22} fill="currentColor" strokeWidth={0} />
          </span>
          <span className="video-tema-chamada">{chamada}</span>
        </button>
      )}
    </div>
  );
}
