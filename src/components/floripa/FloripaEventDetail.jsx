import { useState } from 'react';
import { FcIcon, FloripaBrandLogo } from './FloripaIcons';

export default function FloripaEventDetail({
  event,
  isSaved,
  onToggleSave,
  onBack,
  onOpenSources,
  onNotify,
}) {
  const [lightboxImg, setLightboxImg] = useState(null);

  if (!event) return null;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${event.mapsQuery}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${event.mapsQuery}`;

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/floripa-cultural/evento/${event.slug}`;
    const shareData = {
      title: `${event.title} | Floripa Cultural`,
      text: `${event.title} — ${event.dateShort} em ${event.venueShort}. Confira no Guia Floripa Cultural!`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        onNotify('Link do evento copiado para compartilhar!');
      }
    } catch {
      // User dismissed native share sheet
    }
  };

  return (
    <div className="fc-detail-page">
      {/* Top App Bar */}
      <header className="fc-detail-topbar">
        <div className="fc-container fc-detail-topbar-inner">
          <button type="button" className="fc-icon-btn" onClick={onBack} aria-label="Voltar para a agenda">
            <FcIcon name="back" size={20} />
            <span className="fc-back-label">Voltar</span>
          </button>

          <div className="fc-detail-brand">
            <FloripaBrandLogo size={24} />
            <span>Floripa Cultural</span>
            <small>Detalhes</small>
          </div>

          <button type="button" className="fc-icon-btn" onClick={handleShare} aria-label="Compartilhar evento">
            <FcIcon name="share" size={18} />
          </button>
        </div>
      </header>

      <main className="fc-container fc-detail-layout">
        {/* Main Column */}
        <div className="fc-detail-main">
          {/* Hero Cover Photo */}
          <div className="fc-detail-hero-card">
            <img src={event.image} alt={event.title} className="fc-detail-hero-img" />
            <div className="fc-detail-hero-scrim" aria-hidden="true" />

            <div className="fc-detail-hero-top">
              <div className="fc-detail-hero-pills">
                <span className="fc-pill-white">♪ {event.category}</span>
                <span className={`fc-pill-price${event.isFree ? ' is-free' : ''}`}>{event.priceLabel}</span>
              </div>

              <button
                type="button"
                className={`fc-fav-circle${isSaved ? ' active' : ''}`}
                onClick={() => onToggleSave(event.id)}
                aria-label={isSaved ? 'Remover dos salvos' : 'Salvar evento'}
              >
                <FcIcon name={isSaved ? 'heart-filled' : 'heart'} size={18} />
              </button>
            </div>

            <div className="fc-detail-hero-bottom">
              <span className="fc-hero-caption-pill">✦ {event.heroLocationTag}</span>
              <span className="fc-hero-stage-pill">• {event.heroStageTag}</span>
            </div>
          </div>

          {/* Title, Subtitle & Attribute Chips */}
          <section className="fc-detail-intro">
            <h1 className="fc-detail-title">{event.title}</h1>
            <p className="fc-detail-subtitle">{event.shortSubtitle}</p>

            <div className="fc-attr-chips">
              <span className="fc-attr-chip is-teal">
                {event.isFree ? '✓ Entrada Franca' : `🎟 ${event.priceLabel}`}
              </span>
              <span className="fc-attr-chip">{event.ratingFull}</span>
              {event.accessible && <span className="fc-attr-chip is-blue">♿ 100% Acessível</span>}
              {event.petFriendly && <span className="fc-attr-chip">🐾 Pet Friendly</span>}
              <button type="button" className="fc-attr-chip is-source" onClick={onOpenSources}>
                <FcIcon name="database" size={12} />
                <span>Fonte: {event.sourceLabel}</span>
              </button>
            </div>
          </section>

          {/* 2x2 Key Info Grid */}
          <section className="fc-info-grid-2x2" aria-label="Resumo rápido do evento">
            <div className="fc-info-box">
              <span className="fc-info-label">
                <FcIcon name="calendar" size={14} /> QUANDO
              </span>
              <strong>{event.dateShort}</strong>
              <small>
                Início: {event.startTime} • Término: {event.endTime}
              </small>
            </div>

            <div className="fc-info-box">
              <span className="fc-info-label">
                <FcIcon name="pin" size={14} /> ONDE
              </span>
              <strong>{event.venueShort}</strong>
              <small>{event.region}, Florianópolis</small>
            </div>

            <div className="fc-info-box">
              <span className="fc-info-label">
                <FcIcon name="ticket" size={14} /> INGRESSO
              </span>
              <strong>{event.ticketDetail}</strong>
              <small>{event.ticketNote}</small>
            </div>

            <div className="fc-info-box">
              <span className="fc-info-label">
                <FcIcon name="building" size={14} /> REALIZAÇÃO
              </span>
              <strong>{event.organizerShort}</strong>
              <small>{event.organizerDept}</small>
            </div>
          </section>

          {/* Local Tip Banner */}
          <div className="fc-tip-callout">
            <span className="fc-tip-icon" aria-hidden="true">☀</span>
            <div>
              <strong>{event.tipTitle}</strong>
              <p>{event.tipText}</p>
            </div>
          </div>

          {/* About Section */}
          <section className="fc-detail-section">
            <h2 className="fc-detail-h2">
              <FcIcon name="info" size={18} /> Sobre o Evento
            </h2>
            <div className="fc-card-white fc-about-text">
              {event.aboutParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </section>

          {/* Official Schedule Timeline */}
          <section className="fc-detail-section">
            <div className="fc-detail-h2-row">
              <h2 className="fc-detail-h2">
                <FcIcon name="clock" size={18} /> Programação Oficial
              </h2>
              <span className="fc-detail-h2-meta">{event.scheduleNote}</span>
            </div>

            <div className="fc-card-white fc-schedule-list">
              {event.schedule.map((slot) => (
                <div key={`${slot.time}-${slot.title}`} className={`fc-schedule-item${slot.highlight ? ' is-highlight' : ''}`}>
                  <div className="fc-schedule-time">{slot.time}</div>
                  <div className="fc-schedule-content">
                    <div className="fc-schedule-title-row">
                      <strong>{slot.title}</strong>
                      {slot.tag && (
                        <span className={`fc-schedule-badge${slot.highlight ? ' is-special' : ''}`}>{slot.tag}</span>
                      )}
                    </div>
                    <p>{slot.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Stage Location & Map Card */}
          <section className="fc-detail-section">
            <h2 className="fc-detail-h2">
              <FcIcon name="pin" size={18} /> Localização do Palco
            </h2>

            <div className="fc-card-white fc-location-card">
              <div className="fc-map-preview">
                <div className="fc-map-grid-lines" aria-hidden="true" />
                <div className="fc-map-pin-badge">
                  <span className="fc-map-pin-label">📍 {event.venueShort}</span>
                  <span className="fc-map-pin-dot" />
                </div>
                <span className="fc-map-corner-tag">{event.region} • Florianópolis</span>
              </div>

              <div className="fc-location-details">
                <h3>{event.venueFull}</h3>
                <p className="fc-location-address">{event.address}</p>
                <div className="fc-location-ref">
                  <strong>Referência:</strong> {event.reference}
                </div>

                <div className="fc-transport-grid">
                  {event.transport.map((t) => (
                    <div key={t.type} className="fc-transport-pill">
                      <strong>{t.type}</strong>
                      <span>{t.detail}</span>
                    </div>
                  ))}
                </div>

                <div className="fc-maps-actions">
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="fc-map-btn">
                    <FcIcon name="pin" size={15} />
                    <span>Google Maps</span>
                  </a>
                  <a href={appleMapsUrl} target="_blank" rel="noopener noreferrer" className="fc-map-btn">
                    <FcIcon name="external" size={15} />
                    <span>Apple Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Infrastructure & Accessibility */}
          <section className="fc-detail-section">
            <h2 className="fc-detail-h2">
              <FcIcon name="shield" size={18} /> Infraestrutura &amp; Acessibilidade
            </h2>
            <div className="fc-card-white fc-infra-list">
              {event.infrastructure.map((item) => (
                <div key={item.title} className="fc-infra-item">
                  <span className="fc-infra-icon">
                    <FcIcon name={item.icon === 'wheelchair' ? 'wheelchair' : 'check'} size={16} />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Atmosphere Mini Gallery */}
          {event.gallery?.length > 0 && (
            <section className="fc-detail-section">
              <div className="fc-detail-h2-row">
                <h2 className="fc-detail-h2">Atmosfera da Edição</h2>
                <span className="fc-detail-h2-meta">Registros de referência</span>
              </div>
              <div className="fc-gallery-grid">
                {event.gallery.map((imgUrl, idx) => (
                  <button
                    key={`${imgUrl}-${idx}`}
                    type="button"
                    className="fc-gallery-thumb"
                    onClick={() => setLightboxImg(imgUrl)}
                    aria-label="Ampliar foto do evento"
                  >
                    <img src={imgUrl} alt={`${event.title} foto ${idx + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Transparency & Provenance Notice */}
          <div className="fc-transparency-card">
            <span className="fc-transparency-icon">
              <FcIcon name="shield" size={18} />
            </span>
            <div>
              <strong>Compromisso Cultural &amp; Transparência</strong>
              <p>
                Dados indexados a partir de fonte pública/oficial ({event.sourceLabel}). O Floripa Cultural centraliza
                informações culturais para incentivar o acesso à cultura em Florianópolis e não realiza cobrança ou
                intermediação de ingressos.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Sticky Action Sidebar */}
        <aside className="fc-detail-sidebar">
          <div className="fc-card-white fc-sidebar-box">
            <span className={`fc-pill-price${event.isFree ? ' is-free' : ''}`}>{event.priceLabel}</span>
            <h3>{event.title}</h3>
            <p className="fc-sidebar-meta">
              {event.dateShort} • {event.startTime} às {event.endTime}
            </p>
            <p className="fc-sidebar-venue">{event.venueFull}</p>

            <a
              href={event.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="fc-primary-btn fc-full-btn"
            >
              <FcIcon name="ticket" size={16} />
              <span>Canal Oficial / Ingressos</span>
              <FcIcon name="external" size={14} />
            </a>

            <button
              type="button"
              className={`fc-secondary-btn fc-full-btn${isSaved ? ' is-saved' : ''}`}
              onClick={() => onToggleSave(event.id)}
            >
              <FcIcon name={isSaved ? 'bookmark-filled' : 'bookmark'} size={16} />
              <span>{isSaved ? 'Evento Salvo na Minha Lista' : 'Salvar na Minha Lista'}</span>
            </button>

            <div className="fc-sidebar-source">
              <span>Origem do registro</span>
              <strong>{event.sourceLabel}</strong>
              <button type="button" className="fc-text-link" onClick={onOpenSources}>
                Ver arquitetura de fontes &amp; API →
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fc-detail-sticky-bar">
        <button
          type="button"
          className={`fc-sticky-save-btn${isSaved ? ' active' : ''}`}
          onClick={() => onToggleSave(event.id)}
          aria-label={isSaved ? 'Remover dos salvos' : 'Salvar evento'}
        >
          <FcIcon name={isSaved ? 'bookmark-filled' : 'bookmark'} size={20} />
        </button>

        <a
          href={event.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fc-primary-btn fc-sticky-cta"
        >
          <FcIcon name="ticket" size={16} />
          <span>Canal Oficial / Ingressos</span>
          <FcIcon name="external" size={14} />
        </a>
      </div>

      {/* Lightbox Preview */}
      {lightboxImg && (
        <div
          className="fc-modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxImg(null)}
        >
          <div className="fc-lightbox-frame" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="fc-modal-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Fechar imagem"
            >
              &times;
            </button>
            <img src={lightboxImg} alt={event.title} />
          </div>
        </div>
      )}
    </div>
  );
}
