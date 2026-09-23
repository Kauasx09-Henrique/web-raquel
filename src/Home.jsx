import { motion } from 'framer-motion';
import { ChevronDown, GraduationCap, HeartHandshake, FlaskConical, Flower2 } from 'lucide-react';
import Foto from '../components/Foto.jsx';
import { WhatsIcon } from '../components/Icones.jsx';
import { EASE, aoCarregar, aoRolar } from '../components/animacoes.js';
import { whatsapp } from '../config.js';
import './styles/home.css';

const fotoHero = '/fotos/ensaio.jpg'; // public/fotos/ensaio.jpg

const DIFERENCIAIS = [
  { icone: GraduationCap, texto: 'Experiência e atualização constante' },
  { icone: HeartHandshake, texto: 'Atendimento humanizado' },
  { icone: FlaskConical, texto: 'Ciência e tecnologia a seu favor' },
  { icone: Flower2, texto: 'Acompanhamento em todas as fases' },
];

// Hero + faixa de diferenciais. Sem <main> aqui: ele fica no App.jsx.
export default function Home() {
  return (
    <>
      <section className="hero" id="inicio">
        <motion.div
          className="hero-foto"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <Foto src={fotoHero} alt="Dra. Raquel Guimarães" posicao="50% 18%" prioridade />
        </motion.div>

        <div className="container hero-inner">
          <div className="hero-copy">
            <motion.p className="hero-areas" {...aoCarregar(0.1)}>
              Ginecologia | Reprodução Humana | Cirurgia Ginecológica | Climatério
            </motion.p>

            <motion.h1 {...aoCarregar(0.2)}>
              Cuidado ginecológico para <span className="destaque">cada fase</span> da vida{' '}
              <span className="destaque">da mulher.</span>
            </motion.h1>

            <motion.p className="hero-lead" {...aoCarregar(0.3)}>
              Uma consulta individualizada, construída a partir da escuta, da avaliação clínica e da
              ciência — para decidir com você o melhor caminho.
            </motion.p>

            <motion.div className="hero-acoes" {...aoCarregar(0.4)}>
              <a className="btn btn-primary" href={whatsapp('início')} target="_blank" rel="noopener noreferrer">
                <WhatsIcon size={17} />
                Agendar consulta pelo WhatsApp
              </a>
              <a className="btn-link" href="#consulta">
                Conheça minha abordagem
                <span className="btn-link-icone">
                  <ChevronDown size={16} strokeWidth={2} />
                </span>
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="hero-citacao"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE }}
        >
          <p>Saúde da mulher em todas as fases da vida.</p>
          <span className="hero-assinatura">Dra. Raquel Guimarães</span>
        </motion.div>
      </section>

      <section className="diferenciais" aria-label="Diferenciais">
        <div className="container diferenciais-grid">
          {DIFERENCIAIS.map(({ icone: Icone, texto }, i) => (
            <motion.div className="diferencial" key={texto} {...aoRolar(i * 0.06)}>
              <Icone size={26} strokeWidth={1.3} />
              <span>{texto}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
