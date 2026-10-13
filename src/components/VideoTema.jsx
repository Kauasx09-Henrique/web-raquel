import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { ScaleLoader } from "react-spinners";

export default function VideoTema({ src, chamada, autoPlay }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Se não houver vídeo, mostra um aviso elegante
  if (!src) {
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontFamily: 'sans-serif' }}>
        Vídeo em produção...
      </div>
    );
  }

  // 2. Preparar o link (tratamento de caminhos locais e Google Drive)
  let finalUrl = src;

  // Corrige os vídeos locais (remove o "." de "./aulas/fertilidade.mp4")
  if (finalUrl.startsWith('./')) {
    finalUrl = finalUrl.replace('./', '/');
  }

  // Prepara links do Google Drive para o formato adequado do React Player
  if (finalUrl.includes('drive.google.com')) {
    const match = finalUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      // O Drive requer o formato /preview para funcionar em iframes ou players genéricos
      finalUrl = `https://drive.google.com/file/d/${match[1]}/preview`;
    }
  }

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000' }}>

      {/* TELA DE CARREGAMENTO (SPINNER) */}
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

      {/* REACT PLAYER: O Reprodutor Universal */}
      <div
        style={{
          width: '100%',
          height: '100%',
          opacity: isLoaded ? 1 : 0, /* Esconde até estar pronto */
          transition: 'opacity 0.6s ease' /* Efeito Fade-in suave */
        }}
      >
        <ReactPlayer
          url={finalUrl}
          playing={autoPlay}       // Controla se toca automaticamente
          controls={true}          // Mostra sempre os controlos (play, pause, volume)
          width="100%"
          height="100%"
          onReady={() => setIsLoaded(true)} // O Segredo: Esconde o spinner apenas quando estiver 100% pronto para tocar
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload' // Esconde botão de download em MP4
              }
            }
          }}
        />
      </div>
    </div>
  );
}