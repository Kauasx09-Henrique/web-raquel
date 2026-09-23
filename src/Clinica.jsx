import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import Foto from '../components/Foto.jsx';
import { WhatsIcon } from '../components/Icones.jsx';
import { aoRolar } from '../components/animacoes.js';
import { CLINICA, whatsapp } from '../config.js';
import './styles/clinica.css';

const FOTOS = [
  { src: '/fotos/clinica/fachada.jpg', legenda: 'Fachada' },
  { src: '/fotos/clinica/recepcao.jpg', legenda: 'Recepção' },
  { src: '/fotos/clinica/consultorio.jpg', legenda: 'Consultório' },
  { src: '/fotos/clinica/atendimento.jpg', legenda: 'Sala de atendimento' },
  { src: '/fotos/clinica/detalhe.jpg', legenda: 'Conforto e privacidade' },
];

export default function Clinica() {
  return (
    <section className="secao clinica" id="onde-atendo">
      <div className="container">
        <motion.header className="clinica-head" {...aoRolar(0)}>
          <div>
            <span className="eyebrow">Onde você será atendida</span>
            <h2 className="titulo">
              {CLINICA.nome} — <span className="destaque">Brasília</span>
            </h2>
          </div>
          <p className="texto">
            Um espaço pensado para oferecer uma experiência acolhedora, confortável e segura em todas
            as etapas do seu cuidado.
          </p>
        </motion.header>

        <div className="galeria">
          {FOTOS.map((f, i) => (
            <motion.figure key={f.src} {...aoRolar(i * 0.06)}>
              <Foto src={f.src} alt={f.legenda + ' da clínica'} />
              <figcaption>{f.legenda}</figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="local">
          <motion.div className="mapa" {...aoRolar(0)}>
            <iframe
              title={'Mapa — ' + CLINICA.nome}
              src={CLINICA.mapsEmbed}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </motion.div>

          <motion.div className="local-info" {...aoRolar(0.08)}>
            <h3>Localização</h3>
            <ul className="local-lista">
              <li>
                <MapPin size={18} strokeWidth={1.8} />
                <span>
                  <strong>{CLINICA.nome}</strong>
                  {CLINICA.endereco}
                  <br />
                  {CLINICA.bairro}
                </span>
              </li>
              <li>
                <Clock size={18} strokeWidth={1.8} />
                <span>
                  <strong>Atendimento</strong>
                  {CLINICA.horario}
                </span>
              </li>
            </ul>
            <a className="btn btn-outline" href={CLINICA.mapsLink} target="_blank" rel="noopener noreferrer">
              Ver no mapa
            </a>
          </motion.div>
        </div>

        <motion.div className="agende" {...aoRolar(0)}>
          <div>
            <h3>Agende sua consulta</h3>
            {/* abre o WhatsApp DA CLÍNICA (config.js), não um número pessoal */}
            <a className="btn btn-primary" href={whatsapp('onde atendo')} target="_blank" rel="noopener noreferrer">
              <WhatsIcon size={17} />
              Falar com a clínica pelo WhatsApp
            </a>
          </div>
          <blockquote>“Um espaço para você se sentir segura, ouvida e bem cuidada.”</blockquote>
        </motion.div>
      </div>
    </section>
  );
}
