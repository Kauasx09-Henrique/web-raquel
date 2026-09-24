import { Link } from 'react-router-dom';
import './styles/marca.css';

// Arquivos em public/logo/ (troque os nomes se os seus forem diferentes)
const LOGO_HORIZONTAL = '/logo/logo-rmg-horizontal-secundaria-color@2x.png'; // desktop
const MONOGRAMA = '/logo/monogram-rmg-color.svg'; // celular
const LOGO_BRANCA = '/logo/monogram-dra-rmg-color@2x.png'; // fundos escuros (opcional)

// Uso: <Marca />  ·  <Marca clara />  (versão branca, para fundo escuro)
export default function Marca({ onClick, clara = false }) {
  return (
    <Link to="/#inicio" className="marca" onClick={onClick} aria-label="Dra. Raquel Meirelles Guimarães — início">
      <picture>
        {!clara && <source media="(max-width: 560px)" srcSet={MONOGRAMA} />}
        <img
          className="marca-logo"
          src={clara ? LOGO_BRANCA : LOGO_HORIZONTAL}
          alt="Dra. Raquel Meirelles Guimarães — Ginecologia e Reprodução Humana"
          decoding="async"
        />
      </picture>
    </Link>
  );
}
