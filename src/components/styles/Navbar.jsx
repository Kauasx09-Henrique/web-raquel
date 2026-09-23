import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import Marca from './Marca.jsx';
import { whatsapp } from '../config.js';
import { useLogada, sair } from './sessao.js';
import './styles/navbar.css';

const LINKS = [
  { to: '/#inicio', label: 'Início' },
  { to: '/#consulta', label: 'A consulta' },
  { to: '/#areas', label: 'Especialidades' },
  { to: '/#onde-atendo', label: 'Onde atendo' },
];

export default function Navbar() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const logada = useLogada();
  const navigate = useNavigate();

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

  const fazerLogout = async () => {
    fechar();
    await sair();
    navigate('/login', { replace: true });
  };

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

          {logada && (
            <Link to="/conteudos" onClick={fechar}>
              Conteúdos
            </Link>
          )}

          {logada ? (
            <button type="button" className="nav-acesso" onClick={fazerLogout}>
              <LogOut size={16} strokeWidth={1.8} aria-hidden="true" />
              Sair
            </button>
          ) : (
            <Link to="/login" className="nav-acesso" onClick={fechar}>
              <LogIn size={16} strokeWidth={1.8} aria-hidden="true" />
              Login
            </Link>
          )}

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
