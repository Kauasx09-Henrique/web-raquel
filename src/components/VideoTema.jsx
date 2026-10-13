import React, { useState } from 'react';
import { ScaleLoader } from "react-spinners";

export default function VideoTema({ src, chamada, autoPlay }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Se não houver vídeo, mostra um fundo de aviso
  if (!src) {
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontFamily: 'sans-serif' }}>
        Vídeo em produção...
      </div>
    );
  }

  // 2. Preparar e limpar o link
  const isGoogleDrive = src.includes('drive.google.com');
  let finalUrl = src;

  if (isGoogleDrive) {
    const match = src.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      finalUrl = `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    finalUrl = finalUrl.replace('?autoplay=1', '').replace('&autoplay=1', '');
    if (autoPlay) {
      finalUrl += finalUrl.includes('?') ? '&autoplay=1' : '?autoplay=1';
    }
  } else {
    // Corrige os vídeos locais (ex: remove o "." de "./aulas/fertilidade.mp4")
    if (finalUrl.startsWith('./')) {
      finalUrl = finalUrl.replace('./', '/');
    }
  }

  return (
    /* CAIXA PRINCIPAL DO VÍDEO (AGORA CORRIGIDA COM POSITION ABSOLUTE) */
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000' }}>

      {/* TELA DE CARREGAMENTO ROSA (SPINNER CENTRALIZADO) */}
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', /* Centraliza perfeitamente no meio do quadro preto */
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

      {/* RENDERIZAÇÃO DO VÍDEO / IFRAME DO GOOGLE DRIVE */}
      {isGoogleDrive ? (
        <iframe
          src={finalUrl}
          title={chamada || "Vídeo"}
          allow={autoPlay ? "autoplay; fullscreen; encrypted-media" : "fullscreen; encrypted-media"}
          allowFullScreen
          onLoad={() => setIsLoaded(true)} /* Avisa que carregou para sumir o spinner */
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            opacity: isLoaded ? 1 : 0, /* Esconde o iframe até estar pronto */
            transition: 'opacity 0.6s ease' /* Efeito Fade-in suave */
          }}
        />
      ) : (
        /* RENDERIZAÇÃO DE VÍDEO LOCAL (.MP4) */
        <video
          src={finalUrl}
          title={chamada || "Vídeo"}
          controls
          autoPlay={autoPlay}
          controlsList="nodownload"
          onCanPlay={() => setIsLoaded(true)} /* Avisa que carregou para sumir o spinner */
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            border: 'none',
            opacity: isLoaded ? 1 : 0, /* Esconde o vídeo até estar pronto */
            transition: 'opacity 0.6s ease'
          }}
        />
      )}
    </div>
  );
}