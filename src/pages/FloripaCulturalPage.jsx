import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FloripaEventDetail from '../components/floripa/FloripaEventDetail';
import { FcIcon, FloripaBrandLogo } from '../components/floripa/FloripaIcons';
import { FloripaSourcesPanel, SubmitEventModal } from '../components/floripa/FloripaSourcesModal';
import {
  CATEGORIES,
  CULTURAL_VENUES,
  DATA_SOURCES,
  FLORIPA_EVENTS,
  FLORIPA_META,
  REGIONS,
} from '../data/floripaCultural';

const SAVED_STORAGE_KEY = 'fc_saved_events_v1';

const SOURCE_SHORT_MAP = {
  pmf: 'PMF',
  fcfc: 'Franklin Cascaes',
  sympla: 'Sympla API',
  fcc: 'FCC SC',
};

export default function FloripaCulturalPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [events, setEvents] = useState(FLORIPA_EVENTS);
  const [activeTab, setActiveTab] = useState('agenda');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [region, setRegion] = useState('Todas');
  const [sourceFilter, setSourceFilter] = useState('todas');
  const [onlyFree, setOnlyFree] = useState(false);
  const [onlyAccessible, setOnlyAccessible] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState('Hoje, há 12 min');
  const [toast, setToast] = useState(null);

  const [savedIds, setSavedIds] = useState(() => {
    try {
      const raw = localStorage.getItem(SAVED_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const selectedEvent = useMemo(
    () => (slug ? events.find((ev) => ev.slug === slug) || null : null),
    [events, slug]
  );

  // Sync document title & meta for the standalone cultural route
  useEffect(() => {
    const prevTitle = document.title;
    document.title = selectedEvent
      ? `${selectedEvent.title} | Floripa Cultural`
      : FLORIPA_META.title;

    return () => {
      document.title = prevTitle;
    };
  }, [selectedEvent]);

  // Persist saved events
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedIds]);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(window.__fcToastTimer);
    window.__fcToastTimer = window.setTimeout(() => setToast(null), 3200);
  };

  const toggleSaveEvent = (eventId) => {
    setSavedIds((prev) => {
      const exists = prev.includes(eventId);
      const next = exists ? prev.filter((id) => id !== eventId) : [...prev, eventId];
      showToast(exists ? 'Removido dos seus eventos salvos.' : 'Evento salvo na sua lista!');
      return next;
    });
  };

  const handleSimulateSync = () => {
    if (syncing) return;
    setSyncing(true);
    window.setTimeout(() => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      setLastSyncedAt(`Hoje às ${hh}:${mm} (4 conectores OK)`);
      setSyncing(false);
      showToast('Sincronização concluída: PMF, Franklin Cascaes, FCC e Sympla validados.');
    }, 900);
  };

  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
    setActiveTab('agenda');
    setCategory('Todas');
    setRegion('Todas');
    setSourceFilter('todas');
    setOnlyFree(false);
    setOnlyAccessible(false);
    setShowSavedOnly(false);
    showToast(`"${newEvent.title}" publicado na agenda do protótipo!`);
  };

  const resetFilters = () => {
    setSearch('');
    setCategory('Todas');
    setRegion('Todas');
    setSourceFilter('todas');
    setOnlyFree(false);
    setOnlyAccessible(false);
    setShowSavedOnly(false);
  };

  const filteredEvents = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = events.filter((ev) => {
      if (category !== 'Todas' && ev.category !== category) return false;
      if (region !== 'Todas' && ev.region !== region) return false;
      if (sourceFilter !== 'todas' && ev.sourceId !== sourceFilter) return false;
      if (onlyFree && !ev.isFree) return false;
      if (onlyAccessible && !ev.accessible) return false;
      if (showSavedOnly && !savedIds.includes(ev.id)) return false;

      if (q) {
        const hay = `${ev.title} ${ev.shortSubtitle} ${ev.venueShort} ${ev.region} ${ev.category} ${ev.organizer} ${ev.sourceLabel}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'free') {
        if (a.isFree !== b.isFree) return a.isFree ? -1 : 1;
        return a.priceNumeric - b.priceNumeric;
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title, 'pt-BR');
      }
      return a.dateSort.localeCompare(b.dateSort);
    });
  }, [events, search, category, region, sourceFilter, onlyFree, onlyAccessible, showSavedOnly, savedIds, sortBy]);

  const freeCount = useMemo(() => events.filter((e) => e.isFree).length, [events]);

  const hasActiveFilters =
    Boolean(search.trim()) ||
    category !== 'Todas' ||
    region !== 'Todas' ||
    sourceFilter !== 'todas' ||
    onlyFree ||
    onlyAccessible ||
    showSavedOnly;

  const openEventDetail = (evSlug) => {
    navigate(`/floripa-cultural/evento/${evSlug}`);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleOpenSourcesFromDetail = () => {
    setActiveTab('fontes');
    navigate('/floripa-cultural');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const jumpToCategory = (catId) => {
    setCategory(catId);
    setShowSavedOnly(false);
    setActiveTab('agenda');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const jumpToVenue = (venueName, venueRegion) => {
    setSearch(venueName.split('(')[0].trim());
    setRegion(venueRegion || 'Todas');
    setCategory('Todas');
    setShowSavedOnly(false);
    setActiveTab('agenda');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Detail route view (/floripa-cultural/evento/:slug)
  if (selectedEvent) {
    return (
      <div className="fc-app">
        <FloripaEventDetail
          event={selectedEvent}
          isSaved={savedIds.includes(selectedEvent.id)}
          onToggleSave={toggleSaveEvent}
          onBack={() => navigate('/floripa-cultural')}
          onOpenSources={handleOpenSourcesFromDetail}
          onNotify={showToast}
        />
        {toast && (
          <div className="fc-toast" role="status" aria-live="polite">
            <FcIcon name="check" size={16} />
            <span>{toast}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fc-app">
      {/* Top App Header */}
      <header className="fc-topbar">
        <div className="fc-container fc-topbar-inner">
          <button
            type="button"
            className="fc-brand-btn"
            onClick={() => {
              setActiveTab('agenda');
              resetFilters();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="fc-brand-mark">
              <FloripaBrandLogo size={26} />
            </span>
            <span className="fc-brand-text">
              <strong>Floripa Cultural</strong>
              <small>Guia Digital de Eventos Culturais e de Lazer</small>
            </span>
          </button>

          {/* Desktop Navigation Tabs */}
          <nav className="fc-desktop-nav" aria-label="Navegação principal do guia">
            {[
              { id: 'agenda', label: 'Agenda', icon: 'calendar' },
              { id: 'categorias', label: 'Categorias', icon: 'grid' },
              { id: 'locais', label: 'Locais', icon: 'pin' },
              { id: 'fontes', label: 'Fontes & API', icon: 'database' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`fc-desktop-nav-btn${activeTab === tab.id ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <FcIcon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Utilities */}
          <div className="fc-topbar-actions">
            <button
              type="button"
              className={`fc-saved-pill-btn${showSavedOnly ? ' active' : ''}`}
              onClick={() => {
                setShowSavedOnly((prev) => !prev);
                setActiveTab('agenda');
              }}
              aria-label="Filtrar eventos salvos"
              title="Meus eventos salvos"
            >
              <FcIcon name={showSavedOnly ? 'bookmark-filled' : 'bookmark'} size={16} />
              <span className="fc-saved-label">Salvos</span>
              {savedIds.length > 0 && <span className="fc-saved-count">{savedIds.length}</span>}
            </button>

            <button
              type="button"
              className="fc-api-mini-btn"
              onClick={() => setActiveTab('fontes')}
              aria-label="Ver fontes de dados e APIs"
              title="Fontes integradas: PMF, Franklin Cascaes, FCC e Sympla"
            >
              <FcIcon name="database" size={16} />
              <span className="fc-api-mini-label">Fontes</span>
            </button>
          </div>
        </div>
      </header>

      <main className="fc-main">
        {activeTab === 'agenda' && (
          <>
            {/* Editorial Civic Hero */}
            <section className="fc-hero">
              <div className="fc-container">
                <div className="fc-hero-card">
                  <div className="fc-hero-content">
                    <span className="fc-eyebrow-pill">
                      <FcIcon name="pin" size={13} />
                      FLORIANÓPOLIS • SC
                    </span>
                    <h1 className="fc-hero-title">Cultura e Lazer em Florianópolis</h1>
                    <p className="fc-hero-subtitle">
                      Descubra apresentações musicais, teatro, feiras de rua, exposições e oficinas por toda a Ilha de
                      Santa Catarina e Continente — reunindo fontes públicas e oficiais em um só lugar.
                    </p>

                    <div className="fc-hero-sources-strip">
                      <span>Fontes indexadas:</span>
                      <button type="button" onClick={() => setActiveTab('fontes')}>
                        Prefeitura de Florianópolis
                      </button>
                      <button type="button" onClick={() => setActiveTab('fontes')}>
                        Fundação Franklin Cascaes
                      </button>
                      <button type="button" onClick={() => setActiveTab('fontes')}>
                        FCC
                      </button>
                      <button type="button" onClick={() => setActiveTab('fontes')}>
                        Sympla API
                      </button>
                    </div>
                  </div>

                  <div className="fc-hero-stats" aria-label="Resumo da agenda cultural">
                    <div className="fc-stat-box">
                      <strong>100%</strong>
                      <span>Curadoria Pública</span>
                    </div>
                    <div className="fc-stat-box">
                      <strong>{events.length}</strong>
                      <span>Destaques</span>
                    </div>
                    <div className="fc-stat-box">
                      <strong>{freeCount}</strong>
                      <span>Gratuitos</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Search & Filters Bar */}
            <section className="fc-filters-section" aria-label="Busca e filtros de eventos">
              <div className="fc-container">
                <div className="fc-search-row">
                  <div className="fc-search-input-wrap">
                    <FcIcon name="search" size={18} className="fc-search-icon" />
                    <input
                      type="search"
                      className="fc-search-input"
                      placeholder="Buscar shows, teatro, exposições, bairros ou fontes..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      aria-label="Buscar eventos culturais"
                    />
                    {search && (
                      <button
                        type="button"
                        className="fc-search-clear"
                        onClick={() => setSearch('')}
                        aria-label="Limpar busca"
                      >
                        &times;
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    className="fc-sync-chip-btn"
                    onClick={handleSimulateSync}
                    disabled={syncing}
                    title="Simular consulta às fontes PMF, Franklin Cascaes e Sympla"
                  >
                    <FcIcon name="refresh" size={15} />
                    <span>{syncing ? 'Atualizando...' : 'Sincronizar Fontes'}</span>
                  </button>
                </div>

                {/* Horizontal Pills / Dropdowns */}
                <div className="fc-filter-bar">
                  <label className="fc-select-pill">
                    <span>Categoria:</span>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filtrar por categoria">
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="fc-select-pill">
                    <span>Região:</span>
                    <select value={region} onChange={(e) => setRegion(e.target.value)} aria-label="Filtrar por região">
                      {REGIONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="fc-select-pill">
                    <span>Fonte:</span>
                    <select
                      value={sourceFilter}
                      onChange={(e) => setSourceFilter(e.target.value)}
                      aria-label="Filtrar por fonte de dados"
                    >
                      <option value="todas">Todas</option>
                      {DATA_SOURCES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.shortName}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button
                    type="button"
                    className={`fc-filter-toggle-pill${onlyFree ? ' active' : ''}`}
                    onClick={() => setOnlyFree((prev) => !prev)}
                  >
                    <span>Gratuitos</span>
                  </button>

                  {hasActiveFilters && (
                    <button type="button" className="fc-clear-filters-btn" onClick={resetFilters}>
                      Limpar filtros
                    </button>
                  )}
                </div>

                {/* Accessibility Switch Row */}
                <div className="fc-accessibility-bar">
                  <label className="fc-switch-label" htmlFor="fc-accessible-toggle">
                    <span className="fc-switch-text">
                      <FcIcon name="wheelchair" size={16} />
                      <span>Apenas locais com acessibilidade</span>
                    </span>
                    <span className={`fc-switch${onlyAccessible ? ' checked' : ''}`}>
                      <input
                        id="fc-accessible-toggle"
                        type="checkbox"
                        checked={onlyAccessible}
                        onChange={(e) => setOnlyAccessible(e.target.checked)}
                      />
                      <span className="fc-switch-thumb" />
                    </span>
                  </label>
                </div>
              </div>
            </section>

            {/* Events Feed */}
            <section className="fc-events-section">
              <div className="fc-container">
                <div className="fc-feed-header">
                  <div>
                    <h2 className="fc-feed-title">
                      {showSavedOnly ? 'Meus Eventos Salvos' : 'Eventos em Destaque'}
                    </h2>
                    <p className="fc-feed-count">
                      {filteredEvents.length}{' '}
                      {filteredEvents.length === 1 ? 'evento encontrado' : 'eventos encontrados'} • Fonte sincronizada:{' '}
                      {lastSyncedAt}
                    </p>
                  </div>

                  <label className="fc-sort-select">
                    <span>Ordenar:</span>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Ordenar eventos">
                      <option value="date">Por data</option>
                      <option value="free">Gratuitos primeiro</option>
                      <option value="title">Ordem alfabética</option>
                    </select>
                  </label>
                </div>

                {filteredEvents.length === 0 ? (
                  <div className="fc-empty-state">
                    <FcIcon name="search" size={32} />
                    <h3>Nenhum evento encontrado com esses filtros</h3>
                    <p>
                      Experimente limpar os filtros ou selecionar outra região/fonte para explorar toda a programação
                      cultural de Florianópolis.
                    </p>
                    <button type="button" className="fc-primary-btn" onClick={resetFilters}>
                      Mostrar todos os eventos
                    </button>
                  </div>
                ) : (
                  <div className="fc-events-grid">
                    {filteredEvents.map((ev) => {
                      const saved = savedIds.includes(ev.id);
                      return (
                        <article
                          key={ev.id}
                          className="fc-event-card"
                          onClick={() => openEventDetail(ev.slug)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              openEventDetail(ev.slug);
                            }
                          }}
                        >
                          <div className="fc-event-media">
                            <img src={ev.image} alt={ev.title} loading="lazy" decoding="async" />
                            <span className="fc-card-cat-badge">{ev.category}</span>
                            <span className={`fc-card-price-badge${ev.isFree ? ' is-free' : ''}`}>
                              {ev.priceLabel}
                            </span>
                            <button
                              type="button"
                              className={`fc-card-fav-btn${saved ? ' active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSaveEvent(ev.id);
                              }}
                              aria-label={saved ? 'Remover dos salvos' : 'Salvar evento'}
                            >
                              <FcIcon name={saved ? 'heart-filled' : 'heart'} size={16} />
                            </button>
                          </div>

                          <div className="fc-event-body">
                            <h3 className="fc-event-title">{ev.title}</h3>
                            <p className="fc-event-desc">{ev.shortSubtitle}</p>

                            <ul className="fc-event-meta">
                              <li>
                                <FcIcon name="calendar" size={14} />
                                <span>
                                  {ev.dateShort} • {ev.timeRange}
                                </span>
                              </li>
                              <li>
                                <FcIcon name="pin" size={14} />
                                <span>
                                  {ev.venueShort} • {ev.region}
                                </span>
                              </li>
                              <li>
                                <FcIcon name="building" size={14} />
                                <span>Org.: {ev.organizer}</span>
                              </li>
                            </ul>

                            <div className="fc-event-footer">
                              <div className="fc-event-tags">
                                <span className="fc-mini-tag">{ev.ratingAge}</span>
                                {ev.accessible && <span className="fc-mini-tag is-blue">♿ Acessível</span>}
                                <span className="fc-mini-tag is-source">
                                  {SOURCE_SHORT_MAP[ev.sourceId] || 'Oficial'}
                                </span>
                              </div>

                              <a
                                href={ev.officialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="fc-card-official-btn"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span>Canal Oficial</span>
                                <FcIcon name="external" size={13} />
                              </a>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}

                {/* Collaborative Submit CTA Card */}
                <div className="fc-submit-banner">
                  <div className="fc-submit-banner-left">
                    <span className="fc-submit-banner-icon">
                      <FcIcon name="plus" size={20} />
                    </span>
                    <div>
                      <h3>Organiza um evento cultural?</h3>
                      <p>Divulgue sua atração gratuitamente no guia colaborativo de Florianópolis.</p>
                    </div>
                  </div>
                  <button type="button" className="fc-primary-btn" onClick={() => setSubmitModalOpen(true)}>
                    Cadastrar evento
                  </button>
                </div>

                {/* Transparency Notice Card */}
                <div className="fc-transparency-card">
                  <span className="fc-transparency-icon">
                    <FcIcon name="shield" size={18} />
                  </span>
                  <div>
                    <strong>TRANSPARÊNCIA &amp; PROPÓSITO</strong>
                    <p>
                      Este portal é um guia colaborativo público que centraliza a programação cultural de Florianópolis
                      a partir de fontes institucionais (Prefeitura de Florianópolis, Fundação Cultural Franklin
                      Cascaes, FCC) e plataformas de eventos (Sympla). Não realizamos venda nem reserva de ingressos: os
                      links direcionam diretamente aos canais oficiais dos produtores e organizadores.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'categorias' && (
          <section className="fc-subview-section">
            <div className="fc-container">
              <div className="fc-subview-head">
                <span className="fc-eyebrow-pill">TAXONOMIA CULTURAL</span>
                <h1>Explorar por Categoria</h1>
                <p>Selecione uma linguagem artística para filtrar imediatamente a agenda cultural de Florianópolis.</p>
              </div>

              <div className="fc-category-grid">
                {CATEGORIES.filter((c) => c.id !== 'Todas').map((cat) => {
                  const count = events.filter((e) => e.category === cat.id).length;
                  const freeInCat = events.filter((e) => e.category === cat.id && e.isFree).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className="fc-card-white fc-category-card"
                      onClick={() => jumpToCategory(cat.id)}
                    >
                      <span className="fc-category-icon">
                        <FcIcon name="sparkles" size={20} />
                      </span>
                      <div className="fc-category-info">
                        <strong>{cat.label}</strong>
                        <span>
                          {count} {count === 1 ? 'evento' : 'eventos'} • {freeInCat} gratuito(s)
                        </span>
                      </div>
                      <FcIcon name="external" size={16} />
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'locais' && (
          <section className="fc-subview-section">
            <div className="fc-container">
              <div className="fc-subview-head">
                <span className="fc-eyebrow-pill">EQUIPAMENTOS &amp; ESPAÇOS PÚBLICOS</span>
                <h1>Locais Culturais da Ilha</h1>
                <p>
                  Teatros históricos, museus, praças e centros culturais mapeados em Florianópolis. Clique em um local
                  para filtrar sua agenda.
                </p>
              </div>

              <div className="fc-venues-grid">
                {CULTURAL_VENUES.map((venue) => (
                  <article key={venue.id} className="fc-card-white fc-venue-card">
                    <div className="fc-venue-card-top">
                      <span className="fc-mini-tag">{venue.region}</span>
                      {venue.accessible && <span className="fc-mini-tag is-blue">♿ Acessível</span>}
                    </div>
                    <h3>{venue.name}</h3>
                    <p className="fc-venue-highlight">{venue.highlight}</p>
                    <p className="fc-venue-address">
                      <FcIcon name="pin" size={14} /> {venue.address}
                    </p>
                    <button
                      type="button"
                      className="fc-secondary-btn fc-full-btn"
                      onClick={() => jumpToVenue(venue.name, venue.region)}
                    >
                      Ver eventos neste local
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'fontes' && (
          <section className="fc-subview-section">
            <div className="fc-container">
              <FloripaSourcesPanel
                lastSyncedAt={lastSyncedAt}
                syncing={syncing}
                onSimulateSync={handleSimulateSync}
              />
            </div>
          </section>
        )}
      </main>

      {/* Civic Footer */}
      <footer className="fc-footer">
        <div className="fc-container fc-footer-inner">
          <span className="fc-footer-badge">
            <FcIcon name="pin" size={13} />
            Feito para cultura, Florianópolis
          </span>
          <p>
            Floripa Cultural — Guia Digital de Eventos Culturais e de Lazer de Florianópolis. Este guia centraliza
            informações públicas e direciona para os canais oficiais dos organizadores, sem comercialização direta de
            ingressos.
          </p>
          <small>
            Projeto acadêmico • Fontes de Informação (UFSC) • Protótipo interativo com arquitetura pronta para APIs da
            PMF, Fundação Franklin Cascaes, FCC e Sympla.
          </small>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Navigation (Matches Stitch Design) */}
      <nav className="fc-bottom-nav" aria-label="Menu inferior">
        {[
          { id: 'agenda', label: 'Agenda', icon: 'calendar' },
          { id: 'categorias', label: 'Categorias', icon: 'grid' },
          { id: 'locais', label: 'Locais', icon: 'pin' },
          { id: 'fontes', label: 'Fontes', icon: 'info' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            className={`fc-bottom-nav-btn${activeTab === item.id ? ' active' : ''}`}
            onClick={() => {
              setActiveTab(item.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <FcIcon name={item.icon} size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Collaborative Event Submission Modal */}
      <SubmitEventModal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        onAddEvent={handleAddEvent}
      />

      {/* Feedback Toast */}
      {toast && (
        <div className="fc-toast" role="status" aria-live="polite">
          <FcIcon name="check" size={16} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
