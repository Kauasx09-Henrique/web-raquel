import { useEffect, useRef, useState } from 'react';
import { Play, VideoOff } from 'lucide-react';

// link do Google Drive → link do player (/preview). Precisa estar como "Qualquer pessoa com o link".
function driveEmbed(url) {
  if (!url || !url.includes('drive.google.com')) return null;
  const m = url.match(/\/file\/d\/([\w-]+)/) || url.match(/[?&]id=([\w-]+)/);
  return m ? 'https://drive.google.com/file/d/' + m[1] + '/preview' : null;
}

/* Player dos temas. Aceita link do Google Drive ou arquivo .mp4.
   Antes de tocar mostra a capa com o play no estilo do site. */
export default function VideoTema({ src, capa, chamada, className = '', onPronto, autoPlay = false }) {
  const drive = driveEmbed(src);
  const ref = useRef(null);
  const [tocando, setTocando] = useState(false);
  const [erro, setErro] = useState(false);
  const [proporcao, setProporcao] = useState(null);

  const tocar = () => {
    if (drive) {
      setTocando(true);
      return;
    }
    const v = ref.current;
    if (!v || erro) return;
    const p = v.play();
    if (p && p.catch) {
      p.then(() => setTocando(true)).catch((e) => {
        if (e && e.name === 'NotAllowedError') return;
        console.warn('Vídeo não encontrado:', src);
        setErro(true);
      });
    }
  };

  useEffect(() => {
    if (onPronto) onPronto(tocar);
  });

  useEffect(() => {
    setErro(false);
    if (autoPlay) tocar();
  }, [autoPlay, src]);

  // link do Drive que não é de arquivo (ex.: link de pasta)
  const linkInvalido = src && src.includes('drive.google.com') && !drive;

  return (
    <div
      className={'video-tema' + (tocando ? ' is-tocando' : '') + (className ? ' ' + className : '')}
      style={proporcao ? { aspectRatio: proporcao } : undefined}
    >
      {drive ? (
        tocando ? (
          <iframe title={chamada} src={drive} allow="autoplay; fullscreen" allowFullScreen />
        ) : (
          capa && <img className="video-tema-poster" src={capa} alt="" onError={(e) => (e.currentTarget.style.display = 'none')} />
        )
      ) : (
        !linkInvalido && (
          <video
            ref={ref}
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
        )
      )}

      {erro || linkInvalido ? (
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
