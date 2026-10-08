import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, FileDown } from 'lucide-react';
import jsPDF from 'jspdf';
import VideoTema from '../components/VideoTema.jsx';

export default function VideoModal({ conteudo, fecharModal }) {
    const [notas, setNotas] = useState('');

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
        <AnimatePresence>
            <motion.div
                className="conteudo-modal imersivo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="conteudo-modal-caixa-expandida"
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    <button className="modal-btn-fechar" onClick={fecharModal} aria-label="Fechar">
                        <X size={24} />
                    </button>

                    <div className="modal-area-video">
                        <div className="pub-video-wrapper">
                            <VideoTema
                                key={conteudo.id}
                                src={conteudo.src}
                                chamada={conteudo.titulo}
                                autoPlay
                            />
                        </div>

                        <div className="conteudo-modal-info">
                            <span>{conteudo.tema || conteudo.categoria || "Tema"}</span>
                            <h2>{conteudo.titulo}</h2>
                            {conteudo.descricao && (
                                <div className="descricao-video">
                                    {conteudo.descricao}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="modal-area-notas">
                        <div className="notas-header">
                            <FileText size={20} />
                            <h3>As suas Anotações</h3>
                        </div>

                        <textarea
                            className="notas-input custom-scroll"
                            placeholder="Registe os seus insights, resumos e pontos importantes da aula aqui..."
                            value={notas}
                            onChange={(e) => setNotas(e.target.value)}
                        ></textarea>

                        <div className="notas-acoes">
                            <button className="btn-nota txt" onClick={baixarTXT}>
                                <FileText size={16} /> .TXT
                            </button>
                            <button className="btn-nota pdf" onClick={baixarPDF}>
                                <FileDown size={16} /> .PDF
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}