
import { ArrowUpRight } from 'lucide-react';

const DOCTORALIA_URL =
    'https://www.doctoralia.com.br/raquel-meirelles-g-c-guimaraes-2/ginecologista/brasilia#profile-reviews';

export default function Doctoralia() {
    return (
        <section className="doctoralia-section">
            <div className="container">
                <div className="doctoralia-header">
                    <p className="eyebrow">
                        A experiência de quem confia
                    </p>

                    <h2 className="section-title">
                        Opiniões de <em>pacientes</em>
                    </h2>

                    <p>
                        Confira as avaliações e experiências
                        compartilhadas pelos pacientes.
                    </p>
                </div>

                <div className="doctoralia-grid">

                </div>

                <div className="doctoralia-cta">
                    <a
                        href={DOCTORALIA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                    >
                        Ver todas as opiniões no Doctoralia
                        <ArrowUpRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
}
