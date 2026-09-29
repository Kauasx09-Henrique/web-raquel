import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import './styles/consulta.css';

// Vídeo do YouTube
const VIDEO = 'https://www.youtube.com/embed/FzNy4YCOnYg';

const CAPA = '/capas/consulta.png';

const EASE = [0.16, 1, 0.3, 1];

const entra = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.9, delay, ease: EASE },
});

const PASSOS = [
    {
        n: '01',
        titulo: 'Escuta',
        texto: 'Sua história e o que te trouxe até aqui.'
    },
    {
        n: '02',
        titulo: 'Avaliação',
        texto: 'Exame e exames quando necessários.'
    },
    {
        n: '03',
        titulo: 'Plano de cuidado',
        texto: 'Construído junto com você.'
    },
];

export default function Consulta() {
    const reelRef = useRef(null);
    const [tocando, setTocando] = useState(false);

    const assistir = () => {
        setTocando(true);

        // No celular, rola até o vídeo
        const el = reelRef.current;

        if (!el) return;

        const r = el.getBoundingClientRect();

        if (r.top < 0 || r.bottom > window.innerHeight) {
            window.scrollTo({
                top:
                    window.scrollY +
                    r.top -
                    (window.innerHeight - r.height) / 2,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="consulta" id="consulta">
            <div className="container">
                <div className="consulta-card">

                    <motion.div
                        className="consulta-video"
                        {...entra(0)}
                    >
                        <div
                            ref={reelRef}
                            className={
                                'reel' +
                                (tocando ? ' is-tocando' : '')
                            }
                        >
                            {tocando ? (
                                <iframe
                                    title="Como é a minha consulta"
                                    src={"./consulta.mp4"}
                                    allow="autoplay; fullscreen"
                                    allowFullScreen
                                />
                            ) : (
                                <>
                                    <img
                                        className="reel-poster"
                                        src={CAPA}
                                        alt=""
                                        onError={(e) => {
                                            e.currentTarget.style.display =
                                                'none';
                                        }}
                                    />

                                    <button
                                        className="reel-capa"
                                        onClick={assistir}
                                        aria-label="Assistir ao vídeo"
                                    >
                                        <span className="reel-play">
                                            <Play
                                                size={22}
                                                fill="currentColor"
                                                strokeWidth={0}
                                            />
                                        </span>

                                        <span className="reel-chamada">
                                            O que acontece na consulta?
                                        </span>
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>

                    <div className="consulta-copy">

                        <motion.p
                            className="eyebrow"
                            {...entra(0.05)}
                        >
                            Como é a minha consulta?
                        </motion.p>

                        <motion.h2
                            className="titulo-secao"
                            {...entra(0.1)}
                        >
                            Mais do que uma consulta,{' '}
                            <em>
                                um momento para cuidar de você.
                            </em>
                        </motion.h2>

                        <motion.p
                            className="consulta-texto"
                            {...entra(0.16)}
                        >
                            Cada mulher chega ao consultório com uma
                            história, uma necessidade e um momento de
                            vida diferentes. Minha consulta começa pela
                            escuta, passa por uma avaliação
                            individualizada e termina com um plano de
                            cuidado construído junto com você.
                        </motion.p>

                        <motion.ol
                            className="passos"
                            {...entra(0.22)}
                        >
                            {PASSOS.map((p) => (
                                <li key={p.n}>
                                    <span className="passo-n">
                                        {p.n}
                                    </span>

                                    <strong>
                                        {p.titulo}
                                    </strong>

                                    <span className="passo-txt">
                                        {p.texto}
                                    </span>
                                </li>
                            ))}
                        </motion.ol>

                        <motion.div {...entra(0.28)}>
                            <button
                                className="btn btn-light"
                                onClick={assistir}
                            >
                                <Play
                                    size={14}
                                    fill="currentColor"
                                    strokeWidth={0}
                                />

                                Assista: como é a minha consulta
                            </button>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}