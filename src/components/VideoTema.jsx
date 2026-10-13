import React from 'react';

export default function VideoTema({ src, chamada, autoPlay }) {
  if (!src) return null;

  // Verifica se é um link externo que precisa de Iframe
  const precisaIframe = src.includes('drive.google.com') ||
    src.includes('youtube.com') ||
    src.includes('youtu.be') ||
    src.includes('vimeo.com');

  if (precisaIframe) {
    let finalUrl = src;

    // Tratamento especial para o Google Drive
    if (src.includes('drive.google.com')) {
      const match = src.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        finalUrl = `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }

    // Remove qualquer autoplay original para controlar manualmente
    finalUrl = finalUrl.replace('?autoplay=1', '').replace('&autoplay=1', '');

    if (autoPlay) {
      finalUrl += finalUrl.includes('?') ? '&autoplay=1' : '?autoplay=1';
    }

    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <iframe
          src={finalUrl}
          title={chamada || "Vídeo"}
          allow={autoPlay ? "autoplay; fullscreen; encrypted-media" : "fullscreen; encrypted-media"}
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    );
  }

  // Tratamento para vídeos locais do projeto (.mp4, .webm, etc)
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <video
        src={src}
        title={chamada || "Vídeo"}
        controls
        autoPlay={autoPlay}
        controlsList="nodownload" // Opcional: esconde o botão de download nativo
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover', /* Preenche o espaço lindamente */
          border: 'none',
          backgroundColor: '#000'
        }}
      />
    </div>
  );
}