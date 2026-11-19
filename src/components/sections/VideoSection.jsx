import { useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';

export default function VideoSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const inView = useInView(sectionRef, { rootMargin: '150px 0px', threshold: 0.1 });

  // Auto-pause video when scrolled offscreen to save CPU/GPU decoding on weak PCs
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      video.play().catch(() => {
        // Autoplay may be blocked by browser policy until interaction
      });
    } else {
      video.pause();
    }
  }, [inView]);

  const toggleAudio = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    if (video.paused) {
      video.play().catch(() => {});
    }
  };

  return (
    <section className="video-section" ref={sectionRef}>
      <div className="section-container">
        <div className="video-panel glass-panel">
          <span className="section-tag">Breve apresentação</span>
          <h3 className="video-panel-title">Trajetória Acadêmica e Profissional</h3>
          <p className="video-panel-desc">
            Sou aluno de Ciência da Informação na UFSC, trabalho com tecnologia e desenvolvimento desde 2021 e vou gerar
            resultados concretos e valor real para o projeto da sua empresa.
          </p>
          <div className="video-wrapper-container">
            <div className="video-glow" />
            <div
              className="video-wrapper"
              role="button"
              tabIndex={0}
              aria-label={muted ? 'Ativar áudio do vídeo' : 'Silenciar vídeo'}
              onClick={toggleAudio}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleAudio();
                }
              }}
            >
              <video
                ref={videoRef}
                className="career-video"
                src="/gemini_poderia_criar_outra_ve.mp4"
                loop
                muted={muted}
                playsInline
                preload="metadata"
              />
              <div className={`video-audio-badge${!muted ? ' unmuted' : ''}`}>
                {muted ? (
                  <svg
                    className="speaker-muted-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg
                    className="speaker-on-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
                <span>{muted ? 'Clique para som' : 'Áudio ativado'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

