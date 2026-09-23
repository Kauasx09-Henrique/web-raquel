import { Link } from 'react-router-dom';

export default function Marca({ onClick }) {
  return (
    <Link to="/#inicio" className="marca" onClick={onClick} aria-label="Dra. Raquel Guimarães — início">
      <span className="monograma" aria-hidden="true">
        R<span>G</span>
      </span>
      <span className="marca-txt">
        <strong>Dra. Raquel Guimarães</strong>
        <small>Ginecologia | Reprodução Humana</small>
      </span>
    </Link>
  );
}
