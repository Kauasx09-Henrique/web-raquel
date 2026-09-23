import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { FaInstagram } from "react-icons/fa6";
import Marca from './Marca.jsx';
import { WhatsIcon } from './Icones.jsx';
import { CLINICA, whatsapp } from '../config.js';
import './styles/footer.css';

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="container">
        <div className="rodape-topo">
          <Marca />
          <nav className="rodape-links" aria-label="Rodapé">
            <Link to="/#inicio">Início</Link>
            <Link to="/#consulta">A consulta</Link>
            <Link to="/#areas">Especialidades</Link>
            <Link to="/#onde-atendo">Onde atendo</Link>
          </nav>
          <div className="rodape-sociais">
            <a href={CLINICA.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={17} strokeWidth={1.8} />
            </a>
            <a href={whatsapp('rodapé')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da clínica">
              <WhatsIcon size={16} />
            </a>
            <a href={CLINICA.mapsLink} target="_blank" rel="noopener noreferrer" aria-label="Ver no mapa">
              <MapPin size={17} strokeWidth={1.8} />
            </a>
          </div>
        </div>

        <div className="rodape-base">
          <p>© {new Date().getFullYear()} Dra. Raquel Guimarães. Todos os direitos reservados.</p>
          <p>Brasília — DF</p>
          <p>Responsável técnica: Dra. Raquel Guimarães — {CLINICA.crm}</p>
        </div>

        <p className="rodape-aviso">
          As informações deste site têm caráter informativo e não substituem a consulta médica.
        </p>
      </div>
    </footer>
  );
}
