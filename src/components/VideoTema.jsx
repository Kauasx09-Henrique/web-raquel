import React from 'react';

export default function VideoTema({ src, chamada, autoPlay }) {
  const getVideoSrc = (url) => {
    if (!url) return '';
    let finalUrl = url;

    // Converte links do Drive para o formato correto
    if (url.includes('drive.google.com/file/d/')) {
      const match = url.match(/\/d\/(.*?)\//);
      const id = match ? match[1] : null;
      finalUrl = id ? `https://drive.google.com/file/d/${id}/preview` : url;
    }

    // Remove qualquer autoplay que venha no link original para garantir que não toca sozinho
    finalUrl = finalUrl.replace('?autoplay=1', '').replace('&autoplay=1', '');

    if (autoPlay) {
      finalUrl += finalUrl.includes('?') ? '&autoplay=1' : '?autoplay=1';
    }

    return finalUrl;
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <iframe
        src={getVideoSrc(src)}
        title={chamada || "Vídeo"}
        allow={autoPlay ? "autoplay; fullscreen; encrypted-media" : "fullscreen; encrypted-media"}
        allowFullScreen
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
}