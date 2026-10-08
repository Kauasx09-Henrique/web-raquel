import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, FileDown } from 'lucide-react';
import jsPDF from 'jspdf';
import VideoTema from '../components/VideoTema.jsx'; // <-- Importando o seu player!

export default function VideoModal({ conteudo, fecharModal }) {
    const [notas, setNotas] = useState('');

    const baixarTXT = () => {
        if (!notas.trim()) return alert('Digite algo para salvar!');
        const elemento = document.createElement("a");
        const arquivo = new Blob([notas], { type: 'text/plain' });
        elemento.href = URL.createObjectURL(arquivo);
        elemento.download = `Anotacoes_${conteudo.titulo}.txt`;
        document.body.appendChild(elemento);
        elemento.click();
        document.body.removeChild(elemento);
    };

    const baixarPDF = () => {
        if (!notas.trim()) return alert('Digite algo para salvar!');
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
                    <button className="modal-btn-fechar" onClick={fecharModal}>
                        <X size={24} />
                    </button>

                    {/* LADO ESQUERDO: VÍDEO GIGANTE */}
                    <div className="modal-area-video">
                        <div className="pub-video-wrapper">
                            {/* AQUI ENTRA O SEU COMPONENTE VIDEOTEMA */}
                            <VideoTema
                                key={conteudo.id}
                                src={conteudo.src}
                                chamada={conteudo.titulo}
                                autoPlay
                            />
                        </div>

                        <div className="conteudo-modal-info">
                            <span>{conteudo.tema || conteudo.categoria || "Tema do Vídeo"}</span>
                            <p>{conteudo.titulo}</p>
                            {conteudo.descricao && (
                                <div className="descricao-video">
                                    {conteudo.descricao}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* LADO DIREITO: CADERNO DE ANOTAÇÕES */}
                    <div className="modal-area-notas">
                        <div className="notas-header">
                            <FileText size={20} />
                            <h3>Suas Anotações</h3>
                        </div>

                        <textarea
                            className="notas-input custom-scroll"
                            placeholder="Escreva seus insights, resumos e pontos importantes da aula aqui..."
                            value={notas}
                            onChange={(e) => setNotas(e.target.value)}
                        ></textarea>

                        <div className="notas-acoes">
                            <button className="btn-nota txt" onClick={baixarTXT}>
                                <FileText size={16} /> Salvar .TXT
                            </button>
                            <button className="btn-nota pdf" onClick={baixarPDF}>
                                <FileDown size={16} /> Salvar .PDF
                            </button>
                        </div>
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}