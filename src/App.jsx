import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsFab from './components/WhatsFab.jsx';
import Home from './pages/Home.jsx';
import Sobre from './pages/Sobre.jsx';
import Publicacoes from './pages/Publicacoes.jsx';
import Consulta from './pages/Consulta.jsx';
import Areas from './pages/Areas.jsx';
import Clinica from './pages/Clinica.jsx';
import Especialidade from './pages/Especialidades.jsx';
import Login from './pages/Login.jsx';
import Conteudos from './pages/Conteudos.jsx';

const ALTURA_MENU = 84;

function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    // A seção pode ainda não estar na tela logo após trocar de rota:
    // tenta por aproximadamente 1 segundo.
    let tentativas = 0;
    let timer;

    const rola = () => {
      const el = document.getElementById(
        decodeURIComponent(hash.slice(1))
      );

      if (el) {
        const top =
          el.getBoundingClientRect().top +
          window.scrollY -
          ALTURA_MENU;

        window.scrollTo({
          top: Math.max(top, 0),
          behavior: 'smooth',
        });
      } else if (tentativas++ < 20) {
        timer = setTimeout(rola, 50);
      }
    };

    rola();

    return () => clearTimeout(timer);
  }, [pathname, hash, key]);

  return null;
}

function PaginaInicial() {
  return (
    <main>
      <Home />
      <Sobre />
      <Consulta />
      <Areas />
      <Clinica />
    </main>
  );
}

export default function App() {
  return (
    <>
      <ScrollManager />

      <Navbar />

      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/publicacoes" element={<Publicacoes />} />
        <Route
          path="/especialidades/:id"
          element={<Especialidade />}
        />
        <Route
          path="/especialidades"
          element={<Navigate to="/#areas" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/conteudos" element={<Conteudos />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
      <WhatsFab />

      {/* Vercel Web Analytics */}
      <Analytics />
    </>
  );
}