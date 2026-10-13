import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { ScaleLoader } from "react-spinners";

export default function VideoTema({ src, chamada, autoPlay }) {
  const [isLoaded, setIsLoaded] = useState(false);

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
  const isLocalVideo = !isGoogleDrive && !src.includes('youtube.com') && !src.includes('youtu.be') && !src.includes('vimeo.com');

  let finalUrl = src;

  // CORREÇÃO INFALÍVEL PARA VÍDEOS LOCAIS:
  // Remove qualquer ponto ou barra inicial e adiciona apenas uma barra '/'
  if (isLocalVideo) {
    finalUrl = '/' + finalUrl.replace(/^\.?\/?/, '');
  }

  if (isGoogleDrive) {
    const match = finalUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      finalUrl = `https://drive.google.com/file/d/${match[1]}/preview`;
    }
  }

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000' }}>

      {!isLoaded && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'
        }}>
          <ScaleLoader color="#ec4899" height={40} width={5} />
          <span style={{ color: '#ec4899', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
            A carregar...
          </span>
        </div>
      )}

      <div style={{ width: '100%', height: '100%', opacity: isLoaded ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        {isGoogleDrive ? (
          <iframe
            src={finalUrl} title={chamada || "Vídeo"} allow="autoplay; fullscreen; encrypted-media" allowFullScreen
            onLoad={() => setIsLoaded(true)}
            style={{ width: '100%', height: '100%', border: 'none', backgroundColor: '#000' }}
          />
        ) : isLocalVideo ? (
          <video
            src={finalUrl} title={chamada || "Vídeo"} controls autoPlay={autoPlay} controlsList="nodownload"
            onCanPlay={() => setIsLoaded(true)} onError={() => setIsLoaded(true)}
            style={{ width: '100%', height: '100%', objectFit: 'contain', border: 'none', backgroundColor: '#000' }}
          />
        ) : (
          <ReactPlayer
            url={finalUrl} playing={autoPlay} controls={true} width="100%" height="100%" onReady={() => setIsLoaded(true)}
            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
          />
        )}
      </div>
    </div>
  );
}