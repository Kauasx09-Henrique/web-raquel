import React from 'react';

export default function VideoTema({ src, chamada, autoPlay }) {
  const getVideoSrc = (url) => {
    if (!url) return '';
    if (url.includes('drive.google.com/file/d/')) {
      const match = url.match(/\/d\/(.*?)\//);
      const id = match ? match[1] : null;
      return id ? `https://drive.google.com/file/d/${id}/preview` : url;
    }
    return url;
  };

  const iframeSrc = autoPlay ? `${getVideoSrc(src)}?autoplay=1` : getVideoSrc(src);

  return (
    <div className="video-tema-container">
      <iframe
        src={iframeSrc}
        title={chamada || "Vídeo"}
        allow="autoplay; fullscreen; encrypted-media"
        allowFullScreen
        className="video-tema-iframe"
      />
    </div>
  );
}