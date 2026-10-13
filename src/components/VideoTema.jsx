import React from 'react';

export default function VideoTema({ src, chamada, autoPlay }) {
  if (!src) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#1a0f14', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontFamily: 'sans-serif' }}>
        Vídeo em breve...
      </div>
    );
  }

  const isGoogleDrive = src.includes('drive.google.com');

  if (isGoogleDrive) {
    let finalUrl = src;

    const match = src.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      finalUrl = `https://drive.google.com/file/d/${match[1]}/preview`;
    }

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

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#000' }}>
      <video
        src={src}
        title={chamada || "Vídeo"}
        controls
        autoPlay={autoPlay}
        controlsList="nodownload"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          border: 'none',
          backgroundColor: '#000'
        }}
      />
    </div>
  );
}