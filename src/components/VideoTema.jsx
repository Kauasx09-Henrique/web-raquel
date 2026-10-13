import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { ScaleLoader } from "react-spinners";

export default function VideoTema({ src, chamada, autoPlay }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // SALVAGUARDA (Timeout): Se o carregamento demorar mais de 3 segundos,
  // força a exibição do player para evitar o carregamento infinito.
  useEffect(() => {
    if (!src) return;
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [src]);

  if (!src) {
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontFamily: 'sans-serif' }}>
        Vídeo em breve...
      </div>
    );
  }

  const isGoogleDrive = src.includes('drive.google.com');
  let finalUrl = src;

  // Corrige os caminhos de vídeos locais
  if (finalUrl.startsWith('./')) {
    finalUrl = finalUrl.replace('./', '/');
  }

  // Se for Google Drive, extrai o ID do ficheiro
  if (isGoogleDrive) {
    const match = finalUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      finalUrl = `https://drive.google.com/file/d/${match[1]}/preview`;
    }
  }

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000' }}>

      {/* TELA DE CARREGAMENTO (SPINNER CENTRALIZADO) */}
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <ScaleLoader color="#ec4899" height={40} width={5} />
          <span style={{ color: '#ec4899', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
            A carregar...
          </span>
        </div>
      )}

      {/* ÁREA DO PLAYER */}
      <div
        style={{
          width: '100%',
          height: '100%',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.6s ease'
        }}
      >
        {isGoogleDrive ? (
          /* PARA GOOGLE DRIVE: Iframe nativo (resolve o carregamento infinito de vez) */
          <iframe
            src={finalUrl}
            title={chamada || "Vídeo"}
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
            onLoad={() => setIsLoaded(true)} /* Remove o spinner assim que o HTML do Drive carrega */
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
          />
        ) : (
          /* PARA MP4 LOCAIS / OUTROS: ReactPlayer universal */
          <ReactPlayer
            url={finalUrl}
            playing={autoPlay}
            controls={true}
            width="100%"
            height="100%"
            onReady={() => setIsLoaded(true)} /* Retira o spinner quando o vídeo está pronto */
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload'
                }
              }
            }}
          />
        )}
      </div>
    </div>
  );
}