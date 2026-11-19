import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePerformance } from '../../context/PerformanceContext';
import { useInView } from '../../hooks/useInView';
import { DevFelixMascot } from '../illustrations/DevFelixMascot';

const CODE_LINES = [
  { raw: 'import robot_api', html: '<span class="token-keyword">import</span> robot_api' },
  { raw: '', html: '' },
  { raw: 'dev = robot_api.DevFelix()', html: 'dev = robot_api.<span class="token-class">DevFelix</span>()' },
  { raw: '', html: '' },
  { raw: 'dev.ouvir_musica()', html: 'dev.<span class="token-method">ouvir_musica</span>()' },
  { raw: 'dev.programar()', html: 'dev.<span class="token-method">programar</span>()' },
  { raw: 'dev.tomar_cafe()', html: 'dev.<span class="token-method">tomar_cafe</span>()' },
  { raw: 'dev.dormir()', html: 'dev.<span class="token-method">dormir</span>()' },
];

export default function PythonIdeWidget() {
  const { reducedMotion } = usePerformance();
  const panelRef = useRef(null);
  const typingRef = useRef(null);
  const idleTlRef = useRef(null);
  const timersRef = useRef([]);
  const cooldownRef = useRef({ music: false, code: false, coffee: false, sleep: false });

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const [collapsed, setCollapsed] = useState(isMobile);
  const [gamepadOpen, setGamepadOpen] = useState(false);
  const [editable, setEditable] = useState(false);

  const inView = useInView(panelRef);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => {
      if (t.type === 'interval') clearInterval(t.id);
      else clearTimeout(t.id);
    });
    timersRef.current = [];
  }, []);

  const addTimeout = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push({ type: 'timeout', id });
    return id;
  }, []);

  const addInterval = useCallback((fn, ms) => {
    const id = setInterval(fn, ms);
    timersRef.current.push({ type: 'interval', id });
    return id;
  }, []);

  // Pause/resume continuous idle breathing loop based on viewport visibility
  useEffect(() => {
    if (!idleTlRef.current) return;
    if (inView && !reducedMotion) {
      idleTlRef.current.resume();
    } else {
      idleTlRef.current.pause();
    }
  }, [inView, reducedMotion]);

  const triggerRobotAction = useCallback((lineIndex) => {
    const root = panelRef.current;
    if (!root) return;
    const q = gsap.utils.selector(root);

    if (lineIndex === 4) {
      gsap.to(q('.ide-robot-container'), {
        x: '+=8',
        rotation: 12,
        duration: 0.12,
        yoyo: true,
        repeat: 7,
        ease: 'sine.inOut',
        onComplete: () => {
          gsap.to(q('.ide-robot-container'), { x: 0, rotation: 0, duration: 0.15, ease: 'sine.out' });
        },
      });
      gsap.timeline()
        .to(q('.phone-cup-left, .phone-cup-right'), { stroke: '#ff007f', duration: 0.2 })
        .to(q('.phone-cup-left, .phone-cup-right'), { stroke: 'var(--accent-cyan)', duration: 0.2 });

      gsap.set(q('.music-note'), { y: 0, opacity: 0, scale: 0.7 });
      gsap.timeline()
        .to(q('.music-note'), { opacity: 1, scale: 1.1, y: -25, stagger: 0.15, duration: 0.6, ease: 'power1.out' })
        .to(q('.music-note'), { opacity: 0, y: -40, stagger: 0.12, duration: 0.4, ease: 'power1.in' });
    } else if (lineIndex === 5) {
      gsap.to(q('.left-arm'), { y: '+=3', rotation: -12, duration: 0.05, yoyo: true, repeat: 19, ease: 'sine.inOut' });
      gsap.to(q('.right-arm'), { y: '-=3', rotation: 12, duration: 0.05, yoyo: true, repeat: 19, ease: 'sine.inOut' });

      gsap.timeline()
        .to(q('.glasses-rim, .glasses-bridge'), { fill: 'rgba(0, 210, 255, 0.4)', stroke: '#ffffff', duration: 0.08, yoyo: true, repeat: 9 })
        .to(q('.glasses-rim, .glasses-bridge'), { fill: 'rgba(0, 210, 255, 0.08)', stroke: 'var(--accent-cyan)', duration: 0.1 });

      gsap.timeline()
        .set(q('.felix-laptop-group'), { opacity: 0, y: 15, scale: 0.8, transformOrigin: '50% 90%' })
        .to(q('.felix-laptop-group'), { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'back.out(1.5)' })
        .to(q('.felix-laptop-group'), { y: '-=1.2', x: '+=0.6', rotation: 1, duration: 0.05, yoyo: true, repeat: 17, ease: 'sine.inOut' })
        .to(q('.felix-laptop-group'), { opacity: 0, scale: 0.8, y: 15, duration: 0.25 });
    } else if (lineIndex === 6) {
      gsap.to(q('.left-arm'), { rotation: -15, duration: 0.3 });
      gsap.timeline()
        .set(q('.felix-coffee-mug'), { opacity: 0, y: 10, scale: 0.8 })
        .to(q('.felix-coffee-mug'), { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'back.out(1.5)' })
        .to(q('.coffee-steam'), { opacity: 0.7, y: -4, stagger: 0.1, duration: 0.3, yoyo: true, repeat: 3 })
        .to(q('.felix-coffee-mug'), { y: -16, x: 8, rotation: -10, duration: 0.4, ease: 'power2.out' })
        .to(q('.felix-eye'), { scaleY: 0.1, transformOrigin: 'center center', duration: 0.15 })
        .to(q('.felix-eye'), { scaleY: 1, duration: 0.15, delay: 0.4 })
        .to(q('.felix-coffee-mug'), { y: 0, x: 0, rotation: 0, duration: 0.4, ease: 'power2.inOut' })
        .to(q('.felix-coffee-mug'), {
          opacity: 0,
          scale: 0.8,
          duration: 0.25,
          onComplete: () => gsap.to(q('.left-arm'), { rotation: 0, duration: 0.3 }),
        });
    } else if (lineIndex === 7) {
      gsap.to(q('.left-arm'), { rotation: 10, duration: 0.4 });
      gsap.to(q('.right-arm'), { rotation: -10, duration: 0.4 });

      gsap.timeline()
        .to(q('.ide-robot-container'), { y: 5, rotation: 4, transformOrigin: 'bottom center', duration: 0.8, ease: 'power1.inOut' })
        .to(q('.felix-eye, .glasses-rim, .glasses-bridge'), { opacity: 0.15, duration: 0.6, ease: 'sine.inOut' }, '-=0.6');

      gsap.set(q('.sleep-z'), { y: 0, opacity: 0, scale: 0.7 });
      gsap.timeline()
        .to(q('.sleep-z'), { opacity: 0.8, scale: 1.1, y: -20, stagger: 0.2, duration: 0.8, ease: 'power1.out' })
        .to(q('.sleep-z'), { opacity: 0, y: -35, stagger: 0.15, duration: 0.5, ease: 'power1.in' })
        .to(q('.ide-robot-container'), { y: 0, rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
        .to(q('.felix-eye, .glasses-rim, .glasses-bridge'), { opacity: 1, duration: 0.4 }, '-=0.5')
        .to(q('.left-arm, .right-arm'), { rotation: 0, duration: 0.4 }, '-=0.4');
    }
  }, []);

  const highlightEditorLine = useCallback(
    (lineIdx) => {
      const el = typingRef.current?.querySelector(`.line-idx-${lineIdx}`);
      if (!el) return;
      el.classList.add('highlight-line');
      addTimeout(() => el.classList.remove('highlight-line'), 1500);
    },
    [addTimeout]
  );

  const retypeEditorLine = useCallback(
    (lineIdx) => {
      const lineObj = CODE_LINES[lineIdx];
      const lineEl = typingRef.current?.querySelector(`.line-idx-${lineIdx}`);
      if (!lineEl || !lineObj) return;

      lineEl.classList.add('highlight-line');
      lineEl.textContent = '';
      let charIndex = 0;

      const id = addInterval(() => {
        lineEl.textContent = `${lineObj.raw.slice(0, charIndex)}█`;
        charIndex++;
        if (charIndex > lineObj.raw.length) {
          clearInterval(id);
          lineEl.innerHTML = lineObj.html;
          addTimeout(() => lineEl.classList.remove('highlight-line'), 800);
        }
      }, 42);
    },
    [addInterval, addTimeout]
  );

  const startTypewriter = useCallback(() => {
    const area = typingRef.current;
    const root = panelRef.current;
    if (!area || !root) return;

    clearTimers();
    area.innerHTML = '';
    setEditable(false);

    if (reducedMotion) {
      CODE_LINES.forEach((line, idx) => {
        const div = document.createElement('div');
        div.className = `ide-line line-idx-${idx}`;
        div.innerHTML = line.html;
        area.appendChild(div);
      });
      setEditable(true);
      return;
    }

    let currentLine = 0;

    const typeNextLine = () => {
      if (!typingRef.current) return;

      if (currentLine >= CODE_LINES.length) {
        const q = gsap.utils.selector(root);
        gsap.to(q('.ide-robot-container'), {
          y: -15,
          scaleY: 1.1,
          scaleX: 0.9,
          yoyo: true,
          repeat: 1,
          duration: 0.25,
          ease: 'power2.out',
          onComplete: () => {
            setEditable(true);
            idleTlRef.current?.kill();
            idleTlRef.current = gsap
              .timeline({ repeat: -1, yoyo: true })
              .to(q('.ide-robot'), {
                y: '-=4',
                scaleY: 1.04,
                scaleX: 0.97,
                transformOrigin: 'bottom center',
                duration: 1.6,
                ease: 'sine.inOut',
              });
          },
        });
        return;
      }

      const lineObj = CODE_LINES[currentLine];
      const lineDiv = document.createElement('div');
      lineDiv.className = `ide-line line-idx-${currentLine}`;
      area.appendChild(lineDiv);

      if (!lineObj.raw) {
        currentLine++;
        addTimeout(typeNextLine, 90);
        return;
      }

      let charIndex = 0;
      const id = addInterval(() => {
        lineDiv.textContent = `${lineObj.raw.slice(0, charIndex)}█`;
        charIndex++;
        if (charIndex > lineObj.raw.length) {
          clearInterval(id);
          lineDiv.innerHTML = lineObj.html;
          currentLine++;
          addTimeout(typeNextLine, 200);
        }
      }, 24);
    };

    typeNextLine();
  }, [addInterval, addTimeout, clearTimers, reducedMotion]);

  // Run typewriter on desktop after hero entrance
  useEffect(() => {
    if (!isMobile) {
      const id = addTimeout(startTypewriter, 750);
      return () => {
        clearTimeout(id);
        clearTimers();
        idleTlRef.current?.kill();
      };
    }
    return () => {
      clearTimers();
      idleTlRef.current?.kill();
    };
  }, [isMobile, addTimeout, startTypewriter, clearTimers]);

  // Close gamepad when clicking outside panel
  useEffect(() => {
    if (!gamepadOpen) return;
    const handleOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setGamepadOpen(false);
      }
    };
    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, [gamepadOpen]);

  const handlePanelClick = (e) => {
    if (!collapsed) return;
    e.preventDefault();
    setCollapsed(false);
    setGamepadOpen(true);
    startTypewriter();

    const robotEl = panelRef.current?.querySelector('#main-robot');
    if (robotEl && !reducedMotion) {
      gsap.from(robotEl, {
        y: -180,
        x: 20,
        scale: 0.76,
        duration: 0.9,
        ease: 'elastic.out(1, 0.6)',
        onComplete: () => gsap.set(robotEl, { clearProps: 'transform' }),
      });
    }
  };

  const handleTabClick = (e) => {
    if (!isMobile || collapsed) return;
    e.preventDefault();
    e.stopPropagation();
    clearTimers();
    idleTlRef.current?.kill();
    setCollapsed(true);
    setGamepadOpen(false);
    setEditable(false);
    if (typingRef.current) typingRef.current.innerHTML = '';

    const robotEl = panelRef.current?.querySelector('#main-robot');
    if (robotEl) {
      gsap.to(robotEl, {
        y: 0,
        x: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => gsap.set(robotEl, { clearProps: 'all' }),
      });
    }
  };

  const handleEditorInput = () => {
    const text = typingRef.current?.innerText || typingRef.current?.textContent || '';
    const map = [
      { key: 'music', token: 'ouvir_musica(', idx: 4 },
      { key: 'code', token: 'programar(', idx: 5 },
      { key: 'coffee', token: 'tomar_cafe(', idx: 6 },
      { key: 'sleep', token: 'dormir(', idx: 7 },
    ];
    map.forEach(({ key, token, idx }) => {
      if (text.includes(token) && !cooldownRef.current[key]) {
        triggerRobotAction(idx);
        highlightEditorLine(idx);
        cooldownRef.current[key] = true;
        addTimeout(() => {
          cooldownRef.current[key] = false;
        }, 2000);
      }
    });
  };

  const handleControlClick = (action) => {
    const idxMap = { music: 4, code: 5, coffee: 6, sleep: 7 };
    const idx = idxMap[action];
    if (idx !== undefined) {
      triggerRobotAction(idx);
      retypeEditorLine(idx);
    }
  };

  return (
    <div
      className={`python-ide-panel${collapsed ? ' collapsed' : ''}${!inView ? ' offscreen-paused' : ''}`}
      ref={panelRef}
      onClick={handlePanelClick}
    >
      <div className="ide-header">
        <span className="ide-dot red" />
        <span className="ide-dot yellow" />
        <span className="ide-dot green" />
        <span className="ide-tab" onClick={handleTabClick}>
          py-automation.py
        </span>
        <span className="ide-tab-hint">💡 Toque para ver o jogo</span>
      </div>

      <div className="ide-mobile-collapsed-trigger" id="ide-mobile-collapsed-trigger">
        <div className="ide-mobile-trigger-glow" />
        <svg
          className="ide-mobile-play-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <span>Toque para ver o jogo</span>
      </div>

      <button
        type="button"
        className="gamepad-trigger-btn"
        id="gamepad-trigger"
        title="Abrir Controle de Videogame"
        aria-label="Abrir controles do mascote"
        onClick={(e) => {
          e.stopPropagation();
          setGamepadOpen((prev) => !prev);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="6" width="20" height="12" rx="3" ry="3" />
          <path d="M6 12h4M8 10v4M15 11h.01M18 13h.01" />
        </svg>
      </button>

      <div
        className="ide-body"
        id="python-typing-area"
        ref={typingRef}
        contentEditable={editable}
        suppressContentEditableWarning
        onInput={handleEditorInput}
      />

      <div className={`ide-editable-badge${editable ? ' active' : ''}`} id="ide-edit-badge">
        <span>
          💡 <strong>Modo Interativo:</strong> Use o botão e controle o mascote Félix
        </span>
      </div>

      <div
        className={`gamepad-panel${gamepadOpen ? ' active' : ''}`}
        id="gamepad-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="gamepad-header">
          <span>🎮 CONTROLES</span>
          <button
            type="button"
            className="gamepad-close-btn"
            id="gamepad-close"
            title="Fechar"
            aria-label="Fechar controles"
            onClick={() => setGamepadOpen(false)}
          >
            &times;
          </button>
        </div>

        <div className="gamepad-group">
          <div className="gamepad-group-title">DEV FÉLIX</div>
          <div className="gamepad-btn-list">
            <button type="button" className="control-btn gamepad-btn" onClick={() => handleControlClick('music')} title="Ouvir Música">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
              <span>Música</span>
            </button>

            <button type="button" className="control-btn gamepad-btn" onClick={() => handleControlClick('code')} title="Programar Código">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span>Programar</span>
            </button>

            <button type="button" className="control-btn gamepad-btn" onClick={() => handleControlClick('coffee')} title="Tomar Café">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
              </svg>
              <span>Café</span>
            </button>

            <button type="button" className="control-btn gamepad-btn" onClick={() => handleControlClick('sleep')} title="Dormir / Standby">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              <span>Dormir</span>
            </button>
          </div>
        </div>
      </div>

      <DevFelixMascot />
    </div>
  );
}

