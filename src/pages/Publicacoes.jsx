import { motion } from 'framer-motion';
import { ArrowUpRight, ShoppingBag, Clock } from 'lucide-react';
import { EASE, aoRolar } from '../components/animacoes.js';
import { PUBLICACOES } from '../data/publicacoes.js';
import './styles/publicacoes.css';

const ACAO = {
  gratuito: { rotulo: 'Acessar', selo: 'Acesso gratuito', icone: ArrowUpRight },
  compra: { rotulo: 'Comprar', selo: 'Disponível para compra', icone: ShoppingBag },
  producao: { rotulo: 'Em breve', selo: 'Em produção', icone: Clock },
};

export default function Publicacoes() {
  return (
    <main className="publicacoes">
      <section className="pub-topo">
        <div className="container pub-topo-inner">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            Produção científica
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.08, ease: EASE }}>
            Publicações
          </motion.h1>
          <motion.p className="pub-lead" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.16, ease: EASE }}>
            Artigos, posicionamentos e capítulos de livros com participação da Dra. Raquel em
            ginecologia e reprodução humana.
          </motion.p>
        </div>
      </section>

      <section className="container pub-corpo">
        <ol className="pub-lista">
          {PUBLICACOES.map((p, i) => {
            const acao = ACAO[p.tipo] || ACAO.gratuito;
            const Icone = acao.icone;
            const temLink = p.tipo !== 'producao' && p.link;
            return (
              <motion.li key={p.id} className="pub-item" {...aoRolar(i * 0.06)}>
                <span className="pub-num">{String(i + 1).padStart(2, '0')}</span>

                <div className="pub-info">
                  <div className="pub-meta">
                    <span className="pub-categoria">{p.categoria}</span>
                    <span className={'pub-selo pub-selo-' + p.tipo}>{acao.selo}</span>
                  </div>
                  <h2 className="pub-titulo">{p.titulo}</h2>
                  <p className="pub-fonte">
                    {p.fonte}
                    {p.participacao && <span> · {p.participacao}</span>}
                  </p>
                </div>

                {temLink ? (
                  <a
                    className={'btn pub-btn ' + (p.tipo === 'compra' ? 'btn-outline' : 'btn-primary')}
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {acao.rotulo} <Icone size={15} strokeWidth={1.8} />
                  </a>
                ) : (
                  <span className="btn pub-btn pub-btn-off" aria-disabled="true">
                    {p.tipo === 'producao' ? acao.rotulo : 'Link em breve'} <Clock size={15} strokeWidth={1.8} />
                  </span>
                )}
              </motion.li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
