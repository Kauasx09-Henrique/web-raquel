import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Foto from '../components/Foto.jsx';
import { aoRolar } from '../components/animacoes.js';
import { ESPECIALIDADES } from '../data/especialidades.js';
import './styles/areas.css';

// a imagem de cada card vem do especialidades.js (campo miniatura): muda lá, muda aqui e na página do tema
const fotoDe = (id) => ESPECIALIDADES.find((e) => e.id === id)?.miniatura;

const AREAS = [
    {
        key: 'contracepcao',
        titulo: 'Contracepção',
        tags: ['DIU', 'Implanon', 'Anticoncepção individualizada', 'Adolescentes'],
        foto: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&h=1100&q=75',
    },
    {
        key: 'reproducao',
        titulo: 'Reprodução Humana',
        tags: ['Fertilidade', 'Planejamento reprodutivo', 'Congelamento de óvulos', 'Infertilidade'],
        foto: 'https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?auto=format&fit=crop&w=900&h=1100&q=75',
    },
    {
        key: 'climaterio',
        titulo: 'Climatério e Terapia Hormonal',
        tags: ['Menopausa', 'Sintomas do climatério', 'Terapia hormonal', 'Saúde metabólica'],
        foto: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&h=1100&q=75',
    },
    {
        key: 'saude-intima',
        titulo: 'Saúde Íntima',
        tags: ['Desconforto íntimo', 'Incontinência urinária', 'Tecnologias íntimas', 'Laser / Fraxx'],
        foto: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&h=1100&q=75',
    },
    {
        key: 'cirurgia',
        titulo: 'Cirurgias Ginecológicas',
        tags: ['Histeroscopia', 'Laparoscopia', 'Cirurgias ginecológicas'],
        foto: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&h=1100&q=75',
    },
];

export default function Areas() {
    return (
        <section className="secao areas" id="areas">
            <div className="container">
                <motion.header className="areas-head" {...aoRolar(0)}>
                    <span className="eyebrow">Especialidades</span>
                    <h2 className="titulo">
                        Encontre o atendimento que você <span className="destaque">procura</span>
                    </h2>
                    <p className="subtitulo">Clique na área de interesse e saiba mais sobre cada especialidade.</p>
                </motion.header>

                <div className="areas-grid">
                    {AREAS.map((a, i) => (
                        <motion.div key={a.key} {...aoRolar(i * 0.07)}>
                            {/* leva para /especialidades/<id>: a página se monta com o conteúdo desse tema */}
                            <Link className="area-card" to={'/especialidades/' + a.key}>
                                <div className="area-img">
                                    <Foto src={fotoDe(a.key) || a.foto} alt="" />
                                </div>
                                <div className="area-corpo">
                                    <h3 className="area-titulo">{a.titulo}</h3>
                                    <ul className="area-tags">
                                        {a.tags.map((t) => (
                                            <li key={t}>{t}</li>
                                        ))}
                                    </ul>
                                    <span className="area-mais">
                                        Saiba mais <ArrowRight size={14} />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
