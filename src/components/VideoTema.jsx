import React, { useState } from 'react';
import { ScaleLoader } from "react-spinners";

export default function VideoTema({ src, chamada, autoPlay }) {
  // Estado que controla se o vídeo já carregou ou não
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontFamily: 'sans-serif' }}>
        Vídeo em produção...
      </div>
    );
  }

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
    // CORREÇÃO CRÍTICA PARA VÍDEOS LOCAIS: 
    // Remove o "." no início para evitar que o React se perca nas pastas.
    if (finalUrl.startsWith('./')) {
      finalUrl = finalUrl.replace('./', '/');
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* TELA DE CARREGAMENTO (SPINNER) */}
      {!isLoaded && (
        <div style={{ position: 'absolute', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <ScaleLoader color="#ec4899" height={40} width={5} />
          <span style={{ color: '#ec4899', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
            A carregar vídeo...
          </span>
        </div>
      )}

      {/* RENDERIZAÇÃO DO VÍDEO / IFRAME */}
      {isGoogleDrive ? (
        <iframe
          src={finalUrl}
          title={chamada || "Vídeo"}
          allow={autoPlay ? "autoplay; fullscreen; encrypted-media" : "fullscreen; encrypted-media"}
          allowFullScreen
          onLoad={() => setIsLoaded(true)} /* Remove o spinner quando carregar */
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            opacity: isLoaded ? 1 : 0, /* Esconde o vídeo até estar pronto */
            transition: 'opacity 0.6s ease' /* Efeito de surgimento suave */
          }}
        />
      ) : (
        <video
          src={finalUrl}
          title={chamada || "Vídeo"}
          controls
          autoPlay={autoPlay}
          controlsList="nodownload"
          onCanPlay={() => setIsLoaded(true)} /* Remove o spinner quando tiver dados para tocar */
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