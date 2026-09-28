import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import Marca from './Marca.jsx';
import { whatsapp } from '../config.js';
import './styles/navbar.css';

const LINKS = [
  { to: '/#inicio', label: 'Início' },
  { to: '/#sobre', label: 'Sobre' },
  { to: '/#consulta', label: 'A consulta' },
  { to: '/#areas', label: 'Especialidades' },
  { to: '/#onde-atendo', label: 'Onde atendo' },
  { to: '/publicacoes', label: 'Publicações' },
];

export default function Navbar() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const [logada, setLogada] = useState(false);
  const [saindo, setSaindo] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

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

  // Verifica a sessão sempre que muda de página (ex.: depois do login)
  useEffect(() => {
    let ativo = true;

    fetch('/api/sessao', { credentials: 'include', cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : { logada: false }))
      .then((d) => ativo && setLogada(d.logada === true))
      .catch(() => ativo && setLogada(false));

    return () => {
      ativo = false;
    };
  }, [pathname]);

  const fechar = () => setAberto(false);

  const fazerLogout = async () => {
    if (saindo) return;
    fechar();
    setSaindo(true);

    try {
      const r = await fetch('/api/logout', { method: 'POST', credentials: 'include' });
      if (!r.ok) throw new Error('Não foi possível encerrar a sessão.');
      setLogada(false);
      navigate('/login', { replace: true });
    } catch (erro) {
      console.error('Erro ao sair:', erro);
      alert('Não foi possível encerrar a sessão. Tente novamente.');
    } finally {
      setSaindo(false);
    }
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
              Área exclusiva
            </Link>
          )}

          {logada ? (
            <button
              type="button"
              className="nav-acesso"
              onClick={fazerLogout}
              disabled={saindo}
              aria-label="Sair da conta"
            >
              <LogOut size={16} strokeWidth={1.8} aria-hidden="true" />
              {saindo ? 'Saindo...' : 'Sair'}
            </button>
          ) : (
            <Link to="/login" className="nav-acesso" onClick={fechar}>
              <LogIn size={16} strokeWidth={1.8} aria-hidden="true" />
              Área exclusiva para pacientes
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
