import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Lock, Loader2 } from 'lucide-react';
import './styles/login.css';

const EASE = [0.16, 1, 0.3, 1];
const sobe = (d = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: d, ease: EASE },
});

export default function Login() {
  const navigate = useNavigate();
  const tremer = useAnimation();
  const [codigo, setCodigo] = useState('');
  const [ver, setVer] = useState(false);
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  const entrar = async (e) => {
    e.preventDefault();
    if (!codigo.trim() || enviando) return;
    setEnviando(true);
    setErro('');
    try {
      const r = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo }),
      });
      if (r.ok) {
        navigate('/conteudos', { replace: true });
        return;
      }
      const info = await r.json().catch(() => ({}));
      if (r.status !== 401) console.error('Login falhou:', r.status, info);
      setErro(r.status === 401 ? 'Código incorreto. Confira e tente novamente.' : `Não foi possível entrar agora (erro ${r.status}${info.erro ? ': ' + info.erro : ''}).`);
      tremer.start({ x: [0, -10, 10, -6, 6, 0], transition: { duration: 0.45 } });
    } catch {
      setErro('Sem conexão. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="login">
      <div className="login-arte" aria-hidden="true">
        <motion.span className="login-monograma" {...sobe(0.1)}>
          R<em>G</em>
        </motion.span>
        <motion.p className="login-frase" {...sobe(0.25)}>
          Informação de qualidade para cada fase da sua vida.
        </motion.p>
        <motion.span className="login-assinatura" {...sobe(0.4)}>
          Dra. Raquel Guimarães
        </motion.span>
      </div>

      <div className="login-lado">
        <motion.form className="login-card" onSubmit={entrar} animate={tremer} {...sobe(0.15)}>
          <span className="login-icone">
            <Lock size={20} strokeWidth={1.8} />
          </span>
          <p className="eyebrow">Área exclusiva</p>
          <h1>Conteúdos para pacientes</h1>
          <p className="login-texto">
            Digite o código de acesso que você recebeu da clínica para assistir aos vídeos.
          </p>

          <label className="login-campo">
            <span>Código de acesso</span>
            <div className={'login-input' + (erro ? ' tem-erro' : '')}>
              <input
                type={ver ? 'text' : 'password'}
                value={codigo}
                onChange={(e) => {
                  setCodigo(e.target.value);
                  if (erro) setErro('');
                }}
                placeholder="••••••"
                autoComplete="one-time-code"
                autoFocus
                aria-invalid={!!erro}
              />
              <button type="button" onClick={() => setVer((v) => !v)} aria-label={ver ? 'Esconder código' : 'Mostrar código'}>
                {ver ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <p className="login-erro" role="alert">{erro}</p>

          <button type="submit" className="btn btn-primary login-btn" disabled={enviando || !codigo.trim()}>
            {enviando ? <Loader2 size={17} className="girando" /> : null}
            {enviando ? 'Entrando…' : 'Entrar'}
            {!enviando && <ArrowRight size={16} />}
          </button>

          <p className="login-ajuda">Não tem o código? Peça à secretaria da clínica pelo WhatsApp.</p>
        </motion.form>
      </div>
    </main>
  );
}
