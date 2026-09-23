import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import WhatsIcon from '../components/WhatsIcon.jsx';
import { whatsapp, MAPS_EMBED } from './javascript/config.js';
import './styles/clinica.css';

const EASE = [0.16, 1, 0.3, 1];
const entra = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.85, delay, ease: EASE },
});

const FOTOS = [
    { src: '/fotos/clinica/fachada.jpg', legenda: 'Fachada', destaque: true },
    { src: '/fotos/clinica/recepcao.jpg', legenda: 'Recepção' },
    { src: '/fotos/clinica/consultorio.jpg', legenda: 'Consultório' },
    { src: '/fotos/clinica/atendimento.jpg', legenda: 'Sala de atendimento' },
    { src: '/fotos/clinica/detalhe.jpg', legenda: 'Detalhes' },
];

export default function Clinica() {
    return (
        <section className="clinica" id="onde-atendo">
            <div className="container">
                <motion.header className="secao-head" {...entra(0)}>
                    <div>
                        <p className="eyebrow">Onde você será atendida</p>
                        <h2 className="titulo-secao">Clínica Saúde da Mulher <em>— Brasília</em></h2>
                    </div>
                    <p className="secao-nota">
                        Um espaço pensado para oferecer uma experiência acolhedora, confortável e segura
                        em todas as etapas do seu cuidado.
                    </p>
                </motion.header>

                <motion.div className="clinica-fotos" {...entra(0.06)}>
                    {FOTOS.map((f) => (
                        <figure key={f.src} className={f.destaque ? 'is-destaque' : undefined}>
                            <img src={f.src} alt={f.legenda + ' da clínica'} loading="lazy" />
                            <figcaption>{f.legenda}</figcaption>
                        </figure>
                    ))}
                </motion.div>

                <motion.div className="clinica-base" {...entra(0.1)}>
                    <div className="clinica-mapa">
                        <div className="mapa-frame">
                            <iframe
                                title="Localização da Clínica Saúde da Mulher"
                                src={MAPS_EMBED}
                                loading="lazy"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                        <div className="mapa-info">
                            <p className="mapa-label"><MapPin size={15} strokeWidth={2.2} /> Localização</p>
                            <p><strong>Clínica Saúde da Mulher</strong><br />Asa Sul — Brasília, DF</p>
                            <a
                                className="btn btn-outline"
                                href="https://maps.google.com/?q=Clínica+Saúde+da+Mulher+Brasília"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Ver no mapa
                            </a>
                        </div>
                    </div>

                    <div className="clinica-agenda">
                        <div>
                            <p className="eyebrow">Agende sua consulta</p>
                            <p className="agenda-frase">“Um espaço para você se sentir segura, ouvida e bem cuidada.”</p>
                        </div>
                        <div>
                            {/* abre o WhatsApp DA CLÍNICA (número em config.js) */}
                            <a className="btn btn-light" href={whatsapp('onde atendo')} target="_blank" rel="noopener noreferrer">
                                <WhatsIcon /> Falar com a clínica pelo WhatsApp
                            </a>
                            <p className="agenda-obs">Atendimento da secretaria da clínica</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
