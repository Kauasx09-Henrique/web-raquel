import { useEffect, useState } from 'react';
import { WhatsIcon } from './Icones.jsx';
import { whatsapp } from '../config.js';
import './styles/whatsfab.css';

// Botão redondo de WhatsApp — aparece depois que a paciente rola o hero
export default function WhatsFab() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      className={'fab' + (visivel ? ' is-visivel' : '')}
      href={whatsapp('botão flutuante')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar pelo WhatsApp"
      tabIndex={visivel ? 0 : -1}
    >
      <WhatsIcon size={24} />
    </a>
  );
}
