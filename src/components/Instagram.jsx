
import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './styles/social.css';

const INSTAGRAM_URL =
    'https://www.instagram.com/draraquelmeirelles/';

export default function Instagram() {
    useEffect(() => {
        const scriptId = 'zyff-instagram-script';

        // Evita carregar o script mais de uma vez.
        if (document.getElementById(scriptId)) {
            return;
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://www.zyff.app/w/instagram.js';
        script.async = true;

        document.body.appendChild(script);
    }, []);

    return (
        <section className="insta-section">
            <div className="container">
                <div className="insta-header">
                    <div>
                        <p className="eyebrow">
                            Acompanhe nas redes
                        </p>

                        <h2 className="section-title">
                            No <em>Instagram</em>
                        </h2>
                    </div>

                    <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                    >
                        @draraquelmeirelles
                        <ArrowUpRight size={16} />
                    </a>
                </div>

                <div className="insta-widget-container">
                    <div
                        className="zyff-instagram"
                        data-zyff-widget="instagram"
                        data-zyff-id="CwKMIA8Q6Arx6A"
                    />
                </div>
            </div>
        </section>
    );
}
