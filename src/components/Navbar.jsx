import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Marca from './Marca.jsx';
import { whatsapp } from '../config.js';
import './styles/navbar.css';

// Quando existirem as partes Sobre e Conteúdos, é só acrescentar aqui
const LINKS = [
  { to: '/#inicio', label: 'Início' },
  { to: '/#consulta', label: 'A consulta' },
  { to: '/#areas', label: 'Especialidades' },
  { to: '/#onde-atendo', label: 'Onde atendo' },
  { to: '/login', label: 'Login' },
];

export default function Navbar() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [aberto]);

  const fechar = () => setAberto(false);

  return (
    <header className={'nav' + (rolou ? ' is-rolou' : '')}>
      <div className="container nav-inner">
        <Marca onClick={fechar} />

        <nav className={'nav-links' + (aberto ? ' is-aberto' : '')} aria-label="Principal">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} onClick={fechar}>
              {l.label}
            </Link>
          ))}
          <a className="btn btn-primary nav-btn" href={whatsapp('menu')} target="_blank" rel="noopener noreferrer">
            Agendar consulta
          </a>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setAberto((v) => !v)}
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberto}
        >
          {aberto ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
