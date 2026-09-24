import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { EASE, aoRolar } from '../components/animacoes.js';
import { whatsapp } from '../config.js';
import './styles/sobre.css';

const fotoSobre = '/fotos/sobre.jpg'; // public/fotos/sobre.jpg — retrato vertical

const AREAS = ['Ginecologia', 'Reprodução Humana', 'Cirurgia Ginecológica'];

const FORMACAO = [
  { tipo: 'Especialização', titulo: 'Ginecologia', local: 'Secretaria de Saúde do Distrito Federal' },
  { tipo: 'Especialização', titulo: 'Reprodução Humana', local: 'Genesis — Centro de Assistência em Reprodução Assistida / DF' },
  { tipo: 'Especialização', titulo: 'Laparoscopia Ginecológica e Histeroscopia', local: 'Febrasgo' },
  { tipo: 'Mestrado', titulo: 'Saúde Feminina', local: 'Escola Superior de Ciências da Saúde (ESCS) / DF' },
  { tipo: 'Docência', titulo: 'Preceptora da Graduação em Medicina', local: 'Escola Superior de Ciências da Saúde (ESCS) / DF' },
];

export default function Sobre() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const fotoY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const molduraY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);

  return (
    <section className="sobre" id="sobre" ref={ref}>
      {/* ---------- apresentação ---------- */}
      <div className="container sobre-intro">
        <div className="sobre-retrato">
          <motion.span className="sobre-moldura" style={{ y: molduraY }} aria-hidden="true"
            initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.4, ease: EASE }} />

          <div className="sobre-arco">
            <motion.img
              className="sobre-arco-img"
              src={fotoSobre}
              alt="Dra. Raquel Meirelles Guimarães"
              style={{ y: fotoY }}
              onError={(e) => console.error('Foto do Sobre não encontrada em', e.currentTarget.src)}
            />
            {/* cortina que sobe revelando a foto */}
            <motion.span
              className="sobre-arco-cortina"
              aria-hidden="true"
              initial={{ scaleY: 1 }}
              whileInView={{ scaleY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.3, ease: EASE }}
            />
          </div>

          <motion.div className="sobre-selo" {...aoRolar(0.5)}>
            <span className="sobre-selo-estrela" aria-hidden="true">✦</span>
            <span>
              <strong>Mestre em Saúde Feminina</strong>
              <small>ESCS · Brasília</small>
            </span>
          </motion.div>
        </div>

        <div className="sobre-copy">
          <motion.p className="eyebrow sobre-eyebrow" {...aoRolar(0)}>
            <span aria-hidden="true" /> Sobre a médica
          </motion.p>

          <motion.h2 className="sobre-nome" {...aoRolar(0.08)}>
            Dra. Raquel
            <em>Meirelles Guimarães</em>
          </motion.h2>

          <motion.p className="sobre-lead" {...aoRolar(0.16)}>
            Ginecologista em Brasília, com atuação em reprodução humana e cirurgia ginecológica
            minimamente invasiva. Une prática clínica, pesquisa e docência para oferecer um cuidado
            baseado em ciência — e em escuta.
          </motion.p>

          <motion.ul className="sobre-areas" {...aoRolar(0.22)}>
            {AREAS.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </motion.ul>

          <motion.div className="sobre-acoes" {...aoRolar(0.28)}>
            <a className="btn btn-primary" href={whatsapp('sobre')} target="_blank" rel="noopener noreferrer">
              Agendar consulta
            </a>
            <Link className="btn-link" to="/publicacoes">
              Ver publicações
              <span className="btn-link-icone">
                <ArrowRight size={16} strokeWidth={2} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ---------- formação ---------- */}
      <div className="sobre-formacao-faixa">
        <div className="container sobre-formacao">
          <motion.header className="sobre-formacao-head" {...aoRolar(0)}>
            <p className="eyebrow">Trajetória</p>
            <h3>
              Formação <em>acadêmica</em>
            </h3>
            <p>Especializações, mestrado e docência que sustentam cada decisão clínica.</p>
          </motion.header>

          <ol className="sobre-lista">
            {FORMACAO.map((f, i) => (
              <motion.li key={f.titulo} className="sobre-item" {...aoRolar(0.05 + i * 0.07)}>
                <span className="sobre-item-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="sobre-item-txt">
                  <strong>{f.titulo}</strong>
                  <span>{f.local}</span>
                </div>
                <span className="sobre-item-tipo">{f.tipo}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
