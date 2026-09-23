import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Car, ArrowUpRight, X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import WhatsIcon from '../components/WhatsIcon.jsx';
import { whatsapp, MAPS_EMBED } from './javascript/config.js';
import './styles/clinica.css';

const EASE = [0.16, 1, 0.3, 1];
const entra = (delay = 0) => ({
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.9, delay, ease: EASE },
});

const FOTOS = [
    { src: '/clinica/fachada.jpg', legenda: 'Fachada' },
    { src: '/clinica/recepcao.jpg', legenda: 'Recepção' },
    { src: '/clinica/consultorio.jpg', legenda: 'Consultório' },
    { src: '/clinica/atendimento.png', legenda: 'Sala de atendimento' },
    { src: '/clinica/detalhe.jpg', legenda: 'Conforto e privacidade' },
];

const INFOS = [
    { icone: MapPin, titulo: 'Endereço', texto: 'Clínica Saúde da Mulher\nAsa Sul — Brasília, DF' },
    { icone: Clock, titulo: 'Horário', texto: 'Segunda a sexta\ndas 8h às 18h' },
    { icone: Car, titulo: 'Acesso', texto: 'Estacionamento\nno local' },
];

const LINK_MAPA = 'https://maps.google.com/?q=Cl%C3%ADnica+Sa%C3%BAde+da+Mulher+Bras%C3%ADlia';

export default function Clinica() {
    const [aberta, setAberta] = useState(null); // índice da foto ampliada

    // teclado na foto ampliada: Esc fecha, setas navegam
    useEffect(() => {
        if (aberta === null) return;
        const tecla = (e) => {
            if (e.key === 'Escape') setAberta(null);
            if (e.key === 'ArrowRight') setAberta((i) => (i + 1) % FOTOS.length);
            if (e.key === 'ArrowLeft') setAberta((i) => (i - 1 + FOTOS.length) % FOTOS.length);
        };
        window.addEventListener('keydown', tecla);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', tecla);
            document.body.style.overflow = '';
        };
    }, [aberta]);

    return (
        <section className="clinica" id="onde-atendo">
            <div className="container">
                {/* cabeçalho */}
                <motion.header className="clinica-head" {...entra(0)}>
                    <div>
                        <p className="eyebrow">Onde você será atendida</p>
                        <h2 className="clinica-titulo">
                            Clínica Saúde da Mulher <em>— Brasília</em>
                        </h2>
                    </div>
                    <p className="clinica-nota">
                        Um espaço pensado para oferecer uma experiência acolhedora, confortável e segura
                        em todas as etapas do seu cuidado.
                    </p>
                </motion.header>

                {/* galeria: fachada grande + 4 fotos; clique amplia */}
                <div className="clinica-fotos">
                    {FOTOS.map((f, i) => (
                        <motion.button
                            type="button"
                            key={f.src}
                            className="clinica-foto"
                            onClick={() => setAberta(i)}
                            aria-label={'Ampliar foto: ' + f.legenda}
                            {...entra(0.05 + i * 0.06)}
                        >
                            <img src={f.src} alt={f.legenda + ' da clínica'} loading="lazy" />
                            <span className="clinica-foto-legenda">{f.legenda}</span>
                            <span className="clinica-foto-ampliar">
                                <Expand size={15} strokeWidth={2} />
                            </span>
                        </motion.button>
                    ))}
                </div>

                {/* informações + mapa */}
                <div className="clinica-local">
                    <motion.div className="clinica-infos" {...entra(0)}>
                        <p className="eyebrow">Localização</p>
                        <ul>
                            {INFOS.map(({ icone: Icone, titulo, texto }) => (
                                <li key={titulo}>
                                    <span className="info-icone">
                                        <Icone size={18} strokeWidth={1.7} />
                                    </span>
                                    <span>
                                        <strong>{titulo}</strong>
                                        {texto}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <a className="btn btn-outline" href={LINK_MAPA} target="_blank" rel="noopener noreferrer">
                            Como chegar <ArrowUpRight size={14} />
                        </a>
                    </motion.div>

                    <motion.div className="clinica-mapa" {...entra(0.08)}>
                        <iframe
                            title="Localização da Clínica Saúde da Mulher"
                            src={MAPS_EMBED}
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </motion.div>
                </div>
            </div>

            {/* faixa vinho de ponta a ponta: agendar */}
            <motion.div className="clinica-agenda" {...entra(0)}>
                <div className="container clinica-agenda-inner">
                    <div>
                        <p className="eyebrow">Agende sua consulta</p>
                        <p className="agenda-frase">“Um espaço para você se sentir segura, ouvida e bem cuidada.”</p>
                    </div>
                    <div className="agenda-acao">
                        {/* abre o WhatsApp DA CLÍNICA (número em javascript/config.js) */}
                        <a className="btn btn-light" href={whatsapp('onde atendo')} target="_blank" rel="noopener noreferrer">
                            <WhatsIcon size={17} /> Falar com a clínica pelo WhatsApp
                        </a>
                        <p className="agenda-obs">Atendimento da secretaria da clínica</p>
                    </div>
                </div>
            </motion.div>

            {/* foto ampliada */}
            <AnimatePresence>
                {aberta !== null && (
                    <motion.div
                        className="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setAberta(null)}
                    >
                        <motion.figure
                            key={aberta}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.45, ease: EASE }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={FOTOS[aberta].src} alt={FOTOS[aberta].legenda} />
                            <figcaption>
                                {FOTOS[aberta].legenda}
                                <span>
                                    {aberta + 1} / {FOTOS.length}
                                </span>
                            </figcaption>
                        </motion.figure>

                        <button
                            type="button"
                            className="lightbox-btn lightbox-anterior"
                            onClick={(e) => {
                                e.stopPropagation();
                                setAberta((i) => (i - 1 + FOTOS.length) % FOTOS.length);
                            }}
                            aria-label="Foto anterior"
                        >
                            <ChevronLeft size={22} />
                        </button>
                        <button
                            type="button"
                            className="lightbox-btn lightbox-proxima"
                            onClick={(e) => {
                                e.stopPropagation();
                                setAberta((i) => (i + 1) % FOTOS.length);
                            }}
                            aria-label="Próxima foto"
                        >
                            <ChevronRight size={22} />
                        </button>
                        <button type="button" className="lightbox-btn lightbox-fechar" onClick={() => setAberta(null)} aria-label="Fechar">
                            <X size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
