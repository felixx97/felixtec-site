import { useState } from 'react';
import { CATEGORIES, DATA_SOURCES, REGIONS, SAMPLE_API_SCHEMA } from '../../data/floripaCultural';
import { FcIcon } from './FloripaIcons';

export function FloripaSourcesPanel({ lastSyncedAt, syncing, onSimulateSync }) {
  const [showJson, setShowJson] = useState(false);

  return (
    <section className="fc-sources-panel">
      <div className="fc-sources-hero">
        <div>
          <span className="fc-eyebrow-pill">FONTES DE INFORMAÇÃO • ARQUITETURA DE DADOS</span>
          <h2>Integração Multi-Fonte &amp; Conectores de API</h2>
          <p>
            Protótipo concebido para a disciplina de <strong>Fontes de Informação (UFSC)</strong>, demonstrando como
            um guia cultural centraliza registros heterogêneos da Prefeitura de Florianópolis, Fundação Cultural
            Franklin Cascaes, FCC e Sympla em um esquema padronizado (Schema.org / Dublin Core).
          </p>
        </div>

        <button
          type="button"
          className="fc-primary-btn"
          disabled={syncing}
          onClick={onSimulateSync}
        >
          <FcIcon name="refresh" size={16} />
          <span>{syncing ? 'Sincronizando fontes...' : 'Simular Sincronização API'}</span>
        </button>
      </div>

      <div className="fc-sync-status-bar">
        <span className="fc-live-dot" aria-hidden="true" />
        <span>
          Última validação dos conectores: <strong>{lastSyncedAt}</strong> • Modo protótipo interativo (dados
          estruturados prontos para plugar APIs reais)
        </span>
      </div>

      <div className="fc-sources-grid">
        {DATA_SOURCES.map((src) => (
          <article key={src.id} className="fc-card-white fc-source-card">
            <div className="fc-source-card-top">
              <span className="fc-source-type" style={{ color: src.badgeColor, borderColor: `${src.badgeColor}33`, background: `${src.badgeColor}12` }}>
                {src.type}
              </span>
              <span className="fc-source-status">● {src.status}</span>
            </div>

            <h3>{src.name}</h3>
            <p>{src.description}</p>

            <div className="fc-source-tech">
              <div>
                <span>Mecanismo previsto</span>
                <strong>{src.mechanism}</strong>
              </div>
              <div>
                <span>Frequência</span>
                <strong>{src.syncInterval}</strong>
              </div>
            </div>

            <a
              href={src.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="fc-source-link"
            >
              <span>Acessar fonte oficial</span>
              <FcIcon name="external" size={14} />
            </a>
          </article>
        ))}
      </div>

      <div className="fc-card-white fc-schema-box">
        <div className="fc-schema-head">
          <div>
            <h3>Padronização de Metadados (Schema.org `Event`)</h3>
            <p>
              Todos os eventos coletados via RSS, scraping institucional ou REST API da Sympla são normalizados para o
              mesmo contrato JSON antes de irem para a interface.
            </p>
          </div>
          <button
            type="button"
            className="fc-secondary-btn"
            onClick={() => setShowJson((prev) => !prev)}
          >
            <FcIcon name="database" size={15} />
            <span>{showJson ? 'Ocultar JSON' : 'Inspecionar JSON'}</span>
          </button>
        </div>

        {showJson && (
          <pre className="fc-schema-pre">
            <code>{SAMPLE_API_SCHEMA}</code>
          </pre>
        )}
      </div>
    </section>
  );
}

export function SubmitEventModal({ isOpen, onClose, onAddEvent }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Shows');
  const [region, setRegion] = useState('Centro');
  const [venue, setVenue] = useState('');
  const [dateShort, setDateShort] = useState('Sáb, 28 Nov');
  const [priceLabel, setPriceLabel] = useState('Gratuito');
  const [organizer, setOrganizer] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !venue.trim()) return;

    const isFree = priceLabel.toLowerCase().includes('grat') || priceLabel === '0';
    const slug = `${title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}-${Date.now().toString().slice(-4)}`;

    onAddEvent({
      id: slug,
      slug,
      title: title.trim(),
      shortSubtitle: description.trim() || 'Atração cultural submetida pela comunidade de Florianópolis.',
      category,
      priceLabel: isFree ? 'Gratuito' : priceLabel.trim(),
      priceNumeric: isFree ? 0 : 25,
      isFree,
      ticketDetail: isFree ? 'Acesso Livre' : priceLabel.trim(),
      ticketNote: 'Informação enviada pelo organizador',
      dateShort: dateShort.trim() || 'Em breve',
      dateSort: '2026-11-29T18:00:00',
      timeRange: '18h00',
      startTime: '18:00',
      endTime: '21:00',
      venueShort: venue.trim(),
      venueFull: venue.trim(),
      address: `${venue.trim()} • ${region}, Florianópolis - SC`,
      reference: `Região ${region} de Florianópolis.`,
      region,
      organizer: organizer.trim() || 'Organização Cultural Independente',
      organizerShort: organizer.trim() || 'Coletivo Local',
      organizerDept: 'Submissão Comunitária Verificada',
      sourceId: 'pmf',
      sourceLabel: 'Cadastro Colaborativo (Floripa Cultural)',
      officialUrl: 'https://www.pmf.sc.gov.br/',
      mapsQuery: encodeURIComponent(`${venue.trim()} Florianopolis SC`),
      ratingAge: 'Livre',
      ratingFull: 'Classificação Livre',
      accessible: true,
      petFriendly: false,
      image: '/floripa-cultural/event-feira.webp',
      gallery: ['/floripa-cultural/event-feira.webp'],
      heroLocationTag: `${region} • Florianópolis`,
      heroStageTag: 'Novo Evento',
      tipTitle: 'Evento cadastrado no protótipo',
      tipText: 'Este registro foi inserido em tempo real na sessão atual para demonstrar o fluxo colaborativo.',
      aboutParagraphs: [
        description.trim() ||
          'Evento cultural cadastrado através do formulário colaborativo do guia Floripa Cultural.',
      ],
      scheduleNote: 'Programação informada',
      schedule: [
        {
          time: '18:00',
          title: title.trim(),
          desc: description.trim() || 'Atividade principal aberta ao público.',
          tag: 'Destaque',
          highlight: true,
        },
      ],
      transport: [
        { type: 'Ônibus', detail: 'Transporte Municipal' },
        { type: 'Bicicleta', detail: 'Acesso local' },
      ],
      infrastructure: [
        {
          title: 'Informação Pública Verificada',
          desc: 'Curadoria colaborativa sem venda de ingressos no portal.',
          icon: 'wheelchair',
        },
      ],
    });

    setTitle('');
    setVenue('');
    setOrganizer('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fc-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="fc-submit-title" onClick={onClose}>
      <div className="fc-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="fc-modal-header">
          <div>
            <span className="fc-eyebrow-pill">CURADORIA COLABORATIVA</span>
            <h3 id="fc-submit-title">Divulgar Evento Cultural</h3>
          </div>
          <button type="button" className="fc-modal-close" onClick={onClose} aria-label="Fechar formulário">
            &times;
          </button>
        </div>

        <form className="fc-submit-form" onSubmit={handleSubmit}>
          <label className="fc-field">
            <span>Nome do evento *</span>
            <input
              type="text"
              required
              placeholder="Ex.: Sarau de Poesia na Praça XV"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <div className="fc-field-row">
            <label className="fc-field">
              <span>Categoria</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.filter((c) => c.id !== 'Todas').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="fc-field">
              <span>Região</span>
              <select value={region} onChange={(e) => setRegion(e.target.value)}>
                {REGIONS.filter((r) => r !== 'Todas').map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="fc-field-row">
            <label className="fc-field">
              <span>Local *</span>
              <input
                type="text"
                required
                placeholder="Ex.: Parque da Luz"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </label>

            <label className="fc-field">
              <span>Ingresso</span>
              <input
                type="text"
                placeholder="Gratuito ou R$ 20,00"
                value={priceLabel}
                onChange={(e) => setPriceLabel(e.target.value)}
              />
            </label>
          </div>

          <div className="fc-field-row">
            <label className="fc-field">
              <span>Data</span>
              <input
                type="text"
                placeholder="Sáb, 28 Nov"
                value={dateShort}
                onChange={(e) => setDateShort(e.target.value)}
              />
            </label>

            <label className="fc-field">
              <span>Realização / Organizador</span>
              <input
                type="text"
                placeholder="Ex.: Coletivo Cultural / PMF"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
              />
            </label>
          </div>

          <label className="fc-field">
            <span>Descrição breve</span>
            <textarea
              rows="3"
              placeholder="Conte o que o público vai encontrar nesse evento..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <button type="submit" className="fc-primary-btn fc-full-btn">
            <FcIcon name="check" size={16} />
            <span>Publicar na Agenda do Protótipo</span>
          </button>
        </form>
      </div>
    </div>
  );
}
