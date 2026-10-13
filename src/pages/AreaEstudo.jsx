import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, FileText, FileDown, BookOpen } from 'lucide-react';
import jsPDF from 'jspdf';
import VideoTema from '../components/VideoTema.jsx';

export default function AreaEstudo({ conteudo, fechar }) {
    const [notas, setNotas] = useState('');
    const containerRef = useRef(null);

    // Faz scroll suave automático para a área de estudo quando ela abre
    useEffect(() => {
        if (containerRef.current) {
            setTimeout(() => {
                const y = containerRef.current.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }, 300);
        }
    }, [conteudo]);

    const baixarTXT = () => {
        if (!notas.trim()) return alert('Escreva algo para guardar!');
        const elemento = document.createElement("a");
        const arquivo = new Blob([notas], { type: 'text/plain' });
        elemento.href = URL.createObjectURL(arquivo);
        elemento.download = `Anotacoes_${conteudo.titulo}.txt`;
        document.body.appendChild(elemento);
        elemento.click();
        document.body.removeChild(elemento);
    };

    const baixarPDF = () => {
        if (!notas.trim()) return alert('Escreva algo para guardar!');
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.setTextColor(74, 32, 44);
        doc.text(`Anotações: ${conteudo.titulo}`, 20, 20);
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
        const textoFormatado = doc.splitTextToSize(notas, 170);
        doc.text(textoFormatado, 20, 35);
        doc.save(`Anotacoes_${conteudo.titulo}.pdf`);
    };

    return (
        <motion.div
            ref={containerRef}
            className="painel-estudo-wrapper"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="painel-estudo-inner">
                <button className="painel-fechar-btn" onClick={fechar}>
                    <X size={18} /> Fechar
                </button>

                <div className="painel-grid">
                    {/* ESQUERDA: VÍDEO */}
                    <div className="painel-video-col">
                        <div className="painel-header">
                            <span className="painel-tag">{conteudo.tema || conteudo.categoria || "Tema"}</span>
                            <h2 className="painel-titulo">{conteudo.titulo}</h2>
                        </div>

                        <div className="painel-video-container">
                            <VideoTema
                                key={conteudo.id}
                                src={conteudo.src}
                                chamada={conteudo.titulo}
                                autoPlay={false} /* ZERO AUTOPLAY AQUI */
                            />
                        </div>

                        {conteudo.descricao && (
                            <p className="painel-descricao">{conteudo.descricao}</p>
                        )}
                    </div>

                    {/* DIREITA: NOTAS */}
                    <div className="painel-notas-col">
                        <div className="notas-header-clean">
                            <BookOpen size={20} />
                            <h3>Bloco de Anotações</h3>
                        </div>

                        <textarea
                            className="notas-textarea custom-scrollbar"
                            placeholder="Registe os seus insights, resumos e pontos importantes da aula aqui..."
                            value={notas}
                            onChange={(e) => setNotas(e.target.value)}
                        ></textarea>

                        <div className="notas-botoes">
                            <button className="btn-salvar txt" onClick={baixarTXT}>
                                <FileText size={16} /> .TXT
                            </button>
                            <button className="btn-salvar pdf" onClick={baixarPDF}>
                                <FileDown size={16} /> .PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}