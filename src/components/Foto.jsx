import { useState } from 'react';

export default function Foto({ src, alt = '', posicao, prioridade = false, className = '' }) {
  const [erro, setErro] = useState(false);
  return (
    <div className={'foto ' + className}>
      {src && !erro && (
        <img
          src={src}
          alt={alt}
          loading={prioridade ? 'eager' : 'lazy'}
          onError={() => setErro(true)}
          style={posicao ? { objectPosition: posicao } : undefined}
        />
      )}
    </div>
  );
}