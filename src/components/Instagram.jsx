import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './styles/social.css';

const INSTAGRAM_URL = 'https://www.instagram.com/draraquelmeirelles/';

const InstaIcon = ({ size = 20, className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

export default function InstagramSection() {
    return (
        <section className="insta-section">
            <div className="container">
                <motion.div
                    className="insta-minimal-container"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="insta-minimal-content">
                        <div className="insta-minimal-badge">
                            <InstaIcon size={16} />
                            <span>Instagram</span>
                        </div>

                        <h2 className="insta-minimal-title">
                            Acompanhe bastidores, dicas e o dia a dia da clínica.
                        </h2>

                        <p className="insta-minimal-subtitle">
                            Conteúdo educativo e humanizado sobre saúde feminina e reprodução assistida.
                        </p>
                    </div>

                    <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="insta-minimal-link"
                    >
                        <span>@draraquelmeirelles</span>
                        <ArrowUpRight size={16} strokeWidth={1.5} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}