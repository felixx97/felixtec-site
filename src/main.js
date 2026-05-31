import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------
// 1. Custom Fluid Cursor & Background Ambient Glow
// ----------------------------------------------------
const cursorOuter = document.getElementById('custom-cursor');
const cursorInner = document.getElementById('custom-cursor-dot');
const body = document.body;

let mouseX = 0;
let mouseY = 0;
let cursorOuterX = 0;
let cursorOuterY = 0;

// Particle system for floating programming code symbols
const codeSnippets = [
  // User custom words
  'gaga', 'paramore', 
  // Brand words
  'FelixTec', 'GSAP', 'Vite',
  // JS Keywords
  'const', 'let', 'function', '=>', 'class', 'return', 'import', 'export', 
  'async', 'await', 'api', '&&', '||', '===', 'true', 'false', '{}', '[]', 
  'if', 'else', 'try', 'catch', 'new', 'this', 'null', 'undefined',
  // Web Dev & API
  'fetch', 'promise', 'json', 'window', 'document', 'console.log', 'map', 
  'filter', 'reduce', 'deploy', 'git', 'npm', 'yarn',
  // HTML tags
  '<html>', '</div>', '<body>', '<section>', '<button>', 'class=""', 'id=""',
  // CSS styling
  'display: flex', 'position: absolute', 'grid-template', 'backdrop-filter', 'mix-blend-mode'
];

let lastSpawnX = 0;
let lastSpawnY = 0;
const minSpawnDist = 30; // Spawn a code symbol cluster every 30 pixels of mouse movement

function spawnCodeParticleCluster(x, y) {
  const numParticles = gsap.utils.random(3, 5, 1); // Spawn 3 to 5 particles in a cluster
  
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('span');
    particle.className = 'code-particle';
    particle.innerText = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    
    // Choose random colors from our premium brand palette
    const colors = ['var(--accent-cyan)', 'var(--accent-blue)', 'rgba(255, 255, 255, 0.45)'];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.color = chosenColor;
    
    // Subtle text glow
    particle.style.textShadow = `0 0 4px ${chosenColor}`;
    
    // Set position with slight random offset from the mouse position to gather them
    const offsetX = gsap.utils.random(-25, 25);
    const offsetY = gsap.utils.random(-25, 25);
    particle.style.left = `${x + offsetX}px`;
    particle.style.top = `${y + offsetY}px`;
    
    // Random start configurations
    gsap.set(particle, {
      rotation: gsap.utils.random(-30, 30),
      scale: gsap.utils.random(0.6, 1.1),
      opacity: gsap.utils.random(0.3, 0.7)
    });
    
    document.body.appendChild(particle);
    
    // Animate the particle floating up and fading out
    gsap.to(particle, {
      y: `-=${gsap.utils.random(70, 130)}`, // rising
      x: `+=${gsap.utils.random(-60, 60)}`, // drifting left/right
      opacity: 0,
      scale: 0.3,
      rotation: `+=${gsap.utils.random(-45, 45)}`,
      duration: gsap.utils.random(1.2, 2.2),
      ease: 'power1.out',
      onComplete: () => {
        particle.remove();
      }
    });
  }
}

// Track mouse coordinates
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Directly move inner dot without lag
  if (cursorInner) {
    cursorInner.style.left = `${mouseX}px`;
    cursorInner.style.top = `${mouseY}px`;
  }

  // Set background radial ambient light CSS variables
  document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);

  // Calculate distance for code particle spawning
  const dx = mouseX - lastSpawnX;
  const dy = mouseY - lastSpawnY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist > minSpawnDist) {
    spawnCodeParticleCluster(mouseX, mouseY);
    lastSpawnX = mouseX;
    lastSpawnY = mouseY;
  }
});

// Linear interpolation loop for smooth cursor lag
function updateCursorPosition() {
  const speed = 0.15; // Higher values mean less lag

  cursorOuterX += (mouseX - cursorOuterX) * speed;
  cursorOuterY += (mouseY - cursorOuterY) * speed;

  if (cursorOuter) {
    cursorOuter.style.left = `${cursorOuterX}px`;
    cursorOuter.style.top = `${cursorOuterY}px`;
  }

  requestAnimationFrame(updateCursorPosition);
}
updateCursorPosition();

// Add hover effect states for interactive elements
const hoverables = document.querySelectorAll('a, button, select, input, textarea, .flow-step, .bento-card, .btn-primary, .btn-secondary, .hero-offer-card');
hoverables.forEach(item => {
  item.addEventListener('mouseenter', () => {
    cursorOuter.classList.add('hovering');
    cursorInner.classList.add('hovering');
  });
  item.addEventListener('mouseleave', () => {
    cursorOuter.classList.remove('hovering');
    cursorInner.classList.remove('hovering');
  });
});

// ----------------------------------------------------
// ----------------------------------------------------
// 2. Mouse Glow Tracking on Cards (Tilt removed)
// ----------------------------------------------------
const tiltCards = document.querySelectorAll('.card-hover-tilt');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse position relative to element
    const y = e.clientY - rect.top;

    // Update custom card variables for card glow (native scale and translateY are handled in CSS)
    card.style.setProperty('--card-glow-x', `${x}px`);
    card.style.setProperty('--card-glow-y', `${y}px`);
  });
});

// ----------------------------------------------------
// 3. Mobile Navigation Menu Toggle
// ----------------------------------------------------
const mobileToggle = document.getElementById('mobile-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileToggle && navLinksContainer) {
  mobileToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    mobileToggle.classList.toggle('active');

    // Animate menu bars into X
    const bars = mobileToggle.querySelectorAll('.bar');
    if (mobileToggle.classList.contains('active')) {
      bars[0].style.transform = 'translateY(6px) rotate(45deg)';
      bars[1].style.transform = 'translateY(-6px) rotate(-45deg)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.transform = 'none';
    }
  });

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('active');
      mobileToggle.classList.remove('active');
      const bars = mobileToggle.querySelectorAll('.bar');
      bars[0].style.transform = 'none';
      bars[1].style.transform = 'none';
    });
  });
}

// ----------------------------------------------------
// 4. Interactive FélixTec Simulator Flow
// ----------------------------------------------------
const flowSteps = document.querySelectorAll('.flow-step');
const consoleEl = document.getElementById('demo-console');

const consoleMessages = {
  1: [
    '> [FélixTec System]: Carregando landing page comercial...',
    '> [FélixTec System]: Alta conversão ativada (Vite & Vanilla JS).',
    '> [Tráfego Pago]: Pixel do Meta Ads e Tag do Google Ads prontos para aquisição.'
  ],
  2: [
    '> [Automação IA]: Agente de IA detecta nova conversão de lead.',
    '> [Automação IA]: Processando mensagem através de LLM integrada...',
    '> [Automação IA]: Lead qualificado automaticamente. Perfil: Premium.'
  ],
  3: [
    '> [CRM Sync]: Sincronizando dados com o CRM de Vendas do cliente.',
    '> [Automação IA]: Mensagem personalizada de follow-up enviada via WhatsApp.',
    '> [Tráfego Pago]: Retargeting iniciado automaticamente com público semelhante (Lookalike).'
  ]
};

if (flowSteps.length > 0 && consoleEl) {
  flowSteps.forEach(step => {
    step.addEventListener('click', () => {
      // Toggle active states
      flowSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');

      const stepNum = step.getAttribute('data-step');

      // Update console panel with a simulated typewriter reveal
      consoleEl.innerHTML = '';
      const messages = consoleMessages[stepNum];

      messages.forEach((msg, idx) => {
        const line = document.createElement('p');
        line.className = 'console-line';
        line.style.opacity = '0';
        line.innerText = msg;
        consoleEl.appendChild(line);

        // Stagger fade-in of console lines
        gsap.to(line, {
          opacity: 1,
          x: 5,
          duration: 0.4,
          delay: idx * 0.25,
          ease: 'power1.out'
        });
      });
    });
  });
}

// ----------------------------------------------------
// 5. GSAP Premium Timeline Reveals
// ----------------------------------------------------

// Check if we are on the Home Page
if (document.querySelector('.hero-section')) {
  // Code snippets for the Python Typewriter effect — controlling the single Dev Félix character!
  const codeLines = [
    '<span class="token-keyword">import</span> robot_api',
    '',
    'dev = robot_api.<span class="token-class">DevFelix</span>()',
    '',
    'dev.<span class="token-method">ouvir_musica</span>()',
    'dev.<span class="token-method">programar</span>()',
    'dev.<span class="token-method">tomar_cafe</span>()',
    'dev.<span class="token-method">dormir</span>()'
  ];

  const typingArea = document.getElementById('python-typing-area');

  // Trigger interactive mascot micro-animations depending on the line index typed
  function triggerRobotAction(lineIndex) {
    if (lineIndex === 0) {
      // Pulse tech glasses and FT logo signaling startup
      gsap.fromTo('.glasses-rim', 
        { stroke: 'var(--accent-cyan)', fill: 'rgba(0, 210, 255, 0.08)' },
        { stroke: '#ffffff', fill: 'rgba(0, 210, 255, 0.3)', duration: 0.2, yoyo: true, repeat: 3 }
      );
    } else if (lineIndex === 2) {
      // Blush cheeks glow on activation
      gsap.fromTo('.felix-blush',
        { fillOpacity: 0 },
        { fillOpacity: 0.4, duration: 0.5, ease: 'power1.out' }
      );
    } else if (lineIndex === 4) {
      // Ouvir Música
      // Energetic head-bob and wiggle dance
      gsap.to('.ide-robot-container', {
        x: '+=8',
        rotation: 12,
        duration: 0.12,
        yoyo: true,
        repeat: 7,
        ease: 'sine.inOut',
        onComplete: () => {
          gsap.to('.ide-robot-container', { x: 0, rotation: 0, duration: 0.15, ease: 'sine.out' });
        }
      });
      // Pulse gamer headphones
      gsap.timeline()
        .to(['.phone-cup-left', '.phone-cup-right'], { stroke: '#ff007f', filter: 'drop-shadow(0 0 6px #ff007f)', duration: 0.2 })
        .to(['.phone-cup-left', '.phone-cup-right'], { stroke: 'var(--accent-cyan)', filter: 'drop-shadow(0 0 4px var(--accent-cyan))', duration: 0.2 });

      // Animate musical notes rising
      gsap.set('.music-note', { y: 0, opacity: 0, scale: 0.7 });
      gsap.timeline()
        .to('.music-note', {
          opacity: 1,
          scale: 1.1,
          y: -25,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power1.out'
        })
        .to('.music-note', {
          opacity: 0,
          y: -40,
          stagger: 0.12,
          duration: 0.4,
          ease: 'power1.in'
        });
    } else if (lineIndex === 5) {
      // Programar (Fast typing arms + screen lenses reflection flicker + floating laptop wiggle)
      const tl = gsap.timeline();
      
      gsap.to('.left-arm', { y: '+=3', rotation: -12, duration: 0.05, yoyo: true, repeat: 19, ease: 'sine.inOut' });
      gsap.to('.right-arm', { y: '-=3', rotation: 12, duration: 0.05, yoyo: true, repeat: 19, ease: 'sine.inOut' });
      
      gsap.timeline()
        .to(['.glasses-rim', '.glasses-bridge'], { fill: 'rgba(0, 210, 255, 0.4)', stroke: '#ffffff', duration: 0.08, yoyo: true, repeat: 9 })
        .to(['.glasses-rim', '.glasses-bridge'], { fill: 'rgba(0, 210, 255, 0.08)', stroke: 'var(--accent-cyan)', duration: 0.1 });

      tl.set('.felix-laptop-group', { opacity: 0, y: 15, scale: 0.8, transformOrigin: '50% 90%' })
        .to('.felix-laptop-group', { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'back.out(1.5)' })
        .to('.felix-laptop-group', {
          y: '-=1.2',
          x: '+=0.6',
          rotation: 1,
          duration: 0.05,
          yoyo: true,
          repeat: 17,
          ease: 'sine.inOut'
        })
        .to('.felix-laptop-group', { opacity: 0, scale: 0.8, y: 15, duration: 0.25 });
    } else if (lineIndex === 6) {
      // Tomar Café (Lift coffee cup with hot steam + satisfaction blink)
      const tl = gsap.timeline();
      gsap.to('.left-arm', { rotation: -15, duration: 0.3 });
      
      tl.set('.felix-coffee-mug', { opacity: 0, y: 10, scale: 0.8 })
        .to('.felix-coffee-mug', { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'back.out(1.5)' })
        .to('.coffee-steam', { opacity: 0.7, y: -4, stagger: 0.1, duration: 0.3, yoyo: true, repeat: 3 })
        .to('.felix-coffee-mug', { y: -16, x: 8, rotation: -10, duration: 0.4, ease: 'power2.out' })
        .to('.felix-eye', { scaleY: 0.1, transformOrigin: 'center center', duration: 0.15 })
        .to('.felix-eye', { scaleY: 1, duration: 0.15, delay: 0.4 })
        .to('.felix-coffee-mug', { y: 0, x: 0, rotation: 0, duration: 0.4, ease: 'power2.inOut' })
        .to('.felix-coffee-mug', { opacity: 0, scale: 0.8, duration: 0.25, onComplete: () => {
           gsap.to('.left-arm', { rotation: 0, duration: 0.3 });
        }});
    } else if (lineIndex === 7) {
      // Dormir (Head slump + glasses dim + floating Zzzs + elastic wake up)
      const tl = gsap.timeline();
      gsap.to('.left-arm', { rotation: 10, duration: 0.4 });
      gsap.to('.right-arm', { rotation: -10, duration: 0.4 });

      tl.to('.ide-robot-container', {
        y: 5,
        rotation: 4,
        transformOrigin: 'bottom center',
        duration: 0.8,
        ease: 'power1.inOut'
      })
      .to(['.felix-eye', '.glasses-rim', '.glasses-bridge'], {
        opacity: 0.15,
        duration: 0.6,
        ease: 'sine.inOut'
      }, '-=0.6');

      gsap.set('.sleep-z', { y: 0, opacity: 0, scale: 0.7 });
      gsap.timeline()
        .to('.sleep-z', {
          opacity: 0.8,
          scale: 1.1,
          y: -20,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power1.out'
        })
        .to('.sleep-z', {
          opacity: 0,
          y: -35,
          stagger: 0.15,
          duration: 0.5,
          ease: 'power1.in'
        })
        .to('.ide-robot-container', {
          y: 0,
          rotation: 0,
          duration: 0.4,
          ease: 'elastic.out(1, 0.4)',
          delay: 0.5
        })
        .to(['.felix-eye', '.glasses-rim', '.glasses-bridge'], {
          opacity: 1,
          duration: 0.3,
          onComplete: () => {
            gsap.to('.left-arm', { rotation: 0, duration: 0.3 });
            gsap.to('.right-arm', { rotation: 0, duration: 0.3 });
          }
        }, '-=0.4');
    }
  }

  // Helper to dynamically highlight the editor line of code with a ciano neon glow
  function highlightEditorLine(lineIdx) {
    if (!typingArea) return;
    const lineEl = typingArea.querySelector(`.line-idx-${lineIdx}`);
    if (lineEl) {
      lineEl.classList.add('highlight-line');
      setTimeout(() => {
        lineEl.classList.remove('highlight-line');
      }, 1500);
    }
  }

  // Helper to dynamically erase and re-type the clicked line with a glowing ciano neon typewriter cursor!
  function retypeEditorLine(lineIdx, lineText) {
    if (!typingArea) return;
    const lineEl = typingArea.querySelector(`.line-idx-${lineIdx}`);
    if (!lineEl) return;

    // Highlight the line immediately
    lineEl.classList.add('highlight-line');
    
    // Clear and do character typing simulation
    lineEl.innerHTML = '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = lineText;
    const rawText = tempDiv.textContent;
    let charIndex = 0;

    const interval = setInterval(() => {
      lineEl.textContent = rawText.slice(0, charIndex) + '█';
      charIndex++;
      
      if (charIndex > rawText.length) {
        clearInterval(interval);
        lineEl.innerHTML = lineText; // restore syntax highlighted HTML
        setTimeout(() => {
          lineEl.classList.remove('highlight-line');
        }, 800);
      }
    }, 45); // slight typographic rhythm delay!
  }

  function typeCode() {
    if (!typingArea) return;
    let currentLine = 0;
    
    function typeNextLine() {
      if (currentLine >= codeLines.length) {
        // Complete type sequence final salute with a happy bounce
        gsap.to('.ide-robot-container', {
          y: -15,
          scaleY: 1.1,
          scaleX: 0.9,
          yoyo: true,
          repeat: 1,
          duration: 0.25,
          ease: 'power2.out',
          onComplete: () => {
            // Unlock content editable mode for the user to type
            typingArea.contentEditable = "true";
            const badge = document.getElementById('ide-edit-badge');
            if (badge) badge.classList.add('active');

            // Initialize gentle quiet standby squishy breathing hover loop for the character
            gsap.timeline({ repeat: -1, yoyo: true })
              .to('.ide-robot', {
                y: '-=4',
                scaleY: 1.04,
                scaleX: 0.97,
                transformOrigin: 'bottom center',
                duration: 1.5,
                ease: 'sine.inOut'
              });
          }
        });
        return;
      }
      
      const lineText = codeLines[currentLine];
      const lineDiv = document.createElement('div');
      lineDiv.className = `ide-line line-idx-${currentLine}`;
      typingArea.appendChild(lineDiv);
      
      if (lineText === '') {
        currentLine++;
        setTimeout(typeNextLine, 100);
        return;
      }
      
      // Separate raw text from HTML for standard character typing simulation
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = lineText;
      const rawText = tempDiv.textContent;
      let charIndex = 0;
      
      const interval = setInterval(() => {
        lineDiv.textContent = rawText.slice(0, charIndex) + '█';
        charIndex++;
        
        if (charIndex > rawText.length) {
          clearInterval(interval);
          lineDiv.innerHTML = lineText; // snap to highlighted syntax HTML
          // triggerRobotAction(currentLine); // REMOVED to keep mascot calm on page load as requested!
          currentLine++;
          setTimeout(typeNextLine, 220); // Delay before next line
        }
      }, 25);
    }
    
    typeNextLine();
  }

  // Register interactive editing handlers to trigger mechanical moves as the user types
  let lastActiveCommands = {
    music: false,
    code: false,
    coffee: false,
    sleep: false
  };

  typingArea.addEventListener('input', () => {
    const text = typingArea.innerText || typingArea.textContent;
    
    if (text.includes('ouvir_musica(') && !lastActiveCommands.music) {
      triggerRobotAction(4);
      highlightEditorLine(4);
      lastActiveCommands.music = true;
      setTimeout(() => { lastActiveCommands.music = false; }, 2000);
    }
    if (text.includes('programar(') && !lastActiveCommands.code) {
      triggerRobotAction(5);
      highlightEditorLine(5);
      lastActiveCommands.code = true;
      setTimeout(() => { lastActiveCommands.code = false; }, 2000);
    }
    if (text.includes('tomar_cafe(') && !lastActiveCommands.coffee) {
      triggerRobotAction(6);
      highlightEditorLine(6);
      lastActiveCommands.coffee = true;
      setTimeout(() => { lastActiveCommands.coffee = false; }, 2000);
    }
    if (text.includes('dormir(') && !lastActiveCommands.sleep) {
      triggerRobotAction(7);
      highlightEditorLine(7);
      lastActiveCommands.sleep = true;
      setTimeout(() => { lastActiveCommands.sleep = false; }, 2000);
    }
  });

  // Wire up tactile dashboard buttons to trigger both physical robot moves and corresponding code line flashes
  const controlButtons = document.querySelectorAll('.control-btn');
  controlButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      
      if (action === 'music') {
        triggerRobotAction(4);
        retypeEditorLine(4, codeLines[4]);
      } else if (action === 'code') {
        triggerRobotAction(5);
        retypeEditorLine(5, codeLines[5]);
      } else if (action === 'coffee') {
        triggerRobotAction(6);
        retypeEditorLine(6, codeLines[6]);
      } else if (action === 'sleep') {
        triggerRobotAction(7);
        retypeEditorLine(7, codeLines[7]);
      }
    });
  });

  // Gamepad popup central control toggle
  const gamepadTrigger = document.getElementById('gamepad-trigger');
  const gamepadPanel = document.getElementById('gamepad-panel');
  const gamepadClose = document.getElementById('gamepad-close');

  if (gamepadTrigger && gamepadPanel) {
    gamepadTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      gamepadPanel.classList.toggle('active');
    });

    if (gamepadClose) {
      gamepadClose.addEventListener('click', (e) => {
        e.stopPropagation();
        gamepadPanel.classList.remove('active');
      });
    }

    document.addEventListener('click', (e) => {
      if (!gamepadPanel.contains(e.target) && e.target !== gamepadTrigger) {
        gamepadPanel.classList.remove('active');
      }
    });
  }

  const isMobile = window.innerWidth <= 768;

  // Hero Load Animations
  const heroTl = gsap.timeline();
  heroTl.to('.hero-title', {
      opacity: 1,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1,
      ease: 'power4.out'
    })
    .from('.hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-offer-card', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-actions', {
      opacity: 0,
      y: 15,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.4')
    .from('.python-ide-panel', {
      opacity: 0,
      x: 40,
      scale: 0.96,
      duration: 0.8,
      ease: 'power3.out',
      onComplete: () => {
        // Trigger typewriter code typing immediately on desktop, or wait for expand on mobile
        if (!isMobile) {
          typeCode();
        }
      }
    }, '-=0.8');

  // Minimized Mobile IDE collapsed/expand interaction
  const pythonIdePanel = document.querySelector('.python-ide-panel');
  if (pythonIdePanel) {
    // 1. If mobile, start as collapsed by default
    if (isMobile) {
      pythonIdePanel.classList.add('collapsed');
    }

    // 2. Expand on click/tap
    pythonIdePanel.addEventListener('click', (e) => {
      if (pythonIdePanel.classList.contains('collapsed')) {
        e.preventDefault();
        
        // Remove collapsed class to expand
        pythonIdePanel.classList.remove('collapsed');
        
        // Trigger typewriter code animations
        typeCode();

        // Trigger gorgeous mascot elastic jump jump down!
        gsap.from('#main-robot', {
          y: -180,
          x: 20,
          scale: 0.76,
          duration: 0.9,
          ease: 'elastic.out(1, 0.6)',
          onComplete: () => {
             // Clear GSAP inline styles to allow standard CSS absolute position breathing loops to function perfectly!
             gsap.set('#main-robot', { clearProps: 'transform' });
          }
        });
      }
    });
  }

  // ScrollTrigger interactive animations for the coding robots
  // Conforme rola para baixo, eles olham e se movem para baixo. Ao rolar para cima, retornam.
  gsap.to('#main-robot', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: '40% top',
      end: 'bottom top',
      scrub: 0.8
    },
    y: 40,
    rotation: 20,
    scale: 0.95,
    ease: 'power1.out'
  });


  // isMobile is already declared globally above
  const bentoCards = document.querySelectorAll('.bento-card');
  if (bentoCards.length > 0) {
    bentoCards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: isMobile ? 'top 92%' : 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: isMobile ? 30 : 50,
        scale: 0.95,
        rotation: isMobile ? (index % 2 === 0 ? 1.5 : -1.5) : (index % 2 === 0 ? 1 : -1),
        duration: isMobile ? 0.6 : 0.8,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(card, { clearProps: 'transform' });
        }
      });
    });
  }

  // Pricing Section Cards Scroll Animation (individual entrance with scale & subtle rotation)
  const pricingCards = document.querySelectorAll('.pricing-card');
  if (pricingCards.length > 0) {
    pricingCards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: isMobile ? 'top 92%' : 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: isMobile ? 40 : 60,
        scale: 0.94,
        rotation: isMobile ? (index % 2 === 0 ? 2 : -2) : (index % 2 === 0 ? 1.5 : -1.5),
        duration: isMobile ? 0.7 : 0.9,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(card, { clearProps: 'transform' });
        }
      });
    });
  }

  // Academic & Professional Experience list items scroll animation
  const experienceItems = document.querySelectorAll('.profile-experience-item');
  if (experienceItems.length > 0) {
    experienceItems.forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: isMobile ? 'top 95%' : 'top 90%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -30,
        y: 15,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  }

  // Profile photo container reveal
  const profileMedia = document.querySelector('.profile-media-container');
  if (profileMedia) {
    gsap.from(profileMedia, {
      scrollTrigger: {
        trigger: profileMedia,
        start: isMobile ? 'top 92%' : 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      scale: 0.92,
      y: 40,
      duration: 1.0,
      ease: 'power3.out'
    });
  }

  // Services page panels reveal (slide in from the right with rotation on mobile)
  const servicePanels = document.querySelectorAll('.services-grid-container .service-detail-card');
  if (servicePanels.length > 0) {
    servicePanels.forEach(panel => {
      gsap.from(panel, {
        scrollTrigger: {
          trigger: panel,
          start: isMobile ? 'top 90%' : 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        x: isMobile ? 40 : 100,
        rotation: isMobile ? 4 : 0,
        duration: isMobile ? 0.8 : 1.0,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(panel, { clearProps: 'transform' });
        }
      });
    });
  }

  // Speedometer scroll reveal (draw arc and count up score to 99)
  const speedScoreEl = document.querySelector('.speed-score');
  if (speedScoreEl) {
    const scoreObj = { val: 0 };
    gsap.to(scoreObj, {
      scrollTrigger: {
        trigger: '.details-section',
        start: 'top 75%'
      },
      val: 99,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => {
        speedScoreEl.innerText = Math.floor(scoreObj.val);
      }
    });
  }

  gsap.fromTo('.speedometer-progress', 
    { strokeDashoffset: 126 },
    {
      scrollTrigger: {
        trigger: '.details-section',
        start: 'top 75%'
      },
      strokeDashoffset: 1.26, // 99% of 126 (full is 126, remaining is 1.26)
      duration: 1.8,
      ease: 'power2.out'
    }
  );

  // Left/Right scroll reveals in Details
  gsap.from('.scroll-reveal-left', {
    scrollTrigger: {
      trigger: '.details-section',
      start: 'top 80%'
    },
    opacity: 0,
    x: -50,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.scroll-reveal-right', {
    scrollTrigger: {
      trigger: '.details-section',
      start: 'top 80%'
    },
    opacity: 0,
    x: 50,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Naruto Career Video Section Scroll Reveal Animations (Scroll-tied Scrubbing)
  const videoTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.video-section',
      start: 'top 90%',
      end: 'bottom 40%',
      scrub: 1.5
    }
  });

  videoTimeline.fromTo('.video-panel', 
    { opacity: 0.7, y: 40, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, ease: 'none' }
  );

  videoTimeline.fromTo('.video-wrapper', 
    { scale: 0.88, rotation: isMobile ? -2 : -3 },
    { scale: 1, rotation: 0, ease: 'none' },
    '<='
  );

  videoTimeline.fromTo('.video-glow', 
    { opacity: 0, scale: 0.75 },
    { opacity: 0.85, scale: 1.15, ease: 'none' },
    '<='
  );
}

// Section headers triggers (Runs on any page containing section-header)
const sectionHeaders = document.querySelectorAll('.section-header');
sectionHeaders.forEach(header => {
  gsap.from(header, {
    scrollTrigger: {
      trigger: header,
      start: 'top 85%'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
  });
});

// Interactive Career Video Audio Toggle
const videoWrapper = document.querySelector('.video-wrapper');
const careerVideo = document.querySelector('.career-video');
const audioBadge = document.querySelector('.video-audio-badge');
const muteIcon = document.querySelector('.speaker-muted-icon');
const soundIcon = document.querySelector('.speaker-on-icon');
const badgeText = audioBadge ? audioBadge.querySelector('span') : null;

if (videoWrapper && careerVideo) {
  videoWrapper.addEventListener('click', () => {
    // Toggle muted state
    careerVideo.muted = !careerVideo.muted;

    // Animate audio state transitions
    if (audioBadge) {
      if (careerVideo.muted) {
        audioBadge.classList.remove('unmuted');
        if (muteIcon) muteIcon.classList.remove('hidden');
        if (soundIcon) soundIcon.classList.add('hidden');
        if (badgeText) badgeText.innerText = 'Clique para som';
      } else {
        audioBadge.classList.add('unmuted');
        if (muteIcon) muteIcon.classList.add('hidden');
        if (soundIcon) soundIcon.classList.remove('hidden');
        if (badgeText) badgeText.innerText = 'Áudio ativado';
      }
    }
  });
}

// ----------------------------------------------------
// 6. Modal Interativo de Oferta Exclusiva & Cases
// ----------------------------------------------------
const offerCard = document.querySelector('.hero-offer-card');
const offerModal = document.getElementById('offer-modal');
const offerModalCard = document.getElementById('offer-modal-card');
const offerModalClose = document.getElementById('offer-modal-close');

if (offerCard && offerModal && offerModalCard) {
  offerCard.addEventListener('click', (e) => {
    // Do not open if clicking actual links or the inner elements of a link
    if (e.target.closest('.btn-primary') || e.target.closest('a')) {
      return;
    }
    
    e.preventDefault();
    
    // Open overlay
    offerModal.classList.add('active');
    
    // Animate modal card scaling/growing elastically from the hero offer card region
    gsap.killTweensOf(offerModalCard);
    gsap.killTweensOf(offerModal);
    
    gsap.fromTo(offerModal, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    
    gsap.fromTo(offerModalCard,
      { scale: 0.2, opacity: 0, rotation: -2, y: 30, transformOrigin: '15% 35%' },
      { scale: 1, opacity: 1, rotation: 0, y: 0, duration: 0.6, ease: 'back.out(1.15)' }
    );
  });
  
  const closeModal = () => {
    gsap.to(offerModalCard, {
      scale: 0.75,
      opacity: 0,
      y: 20,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        offerModal.classList.remove('active');
      }
    });
    
    gsap.to(offerModal, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in'
    });
  };
  
  if (offerModalClose) {
    offerModalClose.addEventListener('click', closeModal);
  }
  
  offerModal.addEventListener('click', (e) => {
    if (e.target === offerModal) {
      closeModal();
    }
  });
}

// ----------------------------------------------------
// 7. Modal Interativo de Artigos de Especialidades (Saber Mais)
// ----------------------------------------------------
const serviceArticles = {
  webdev: {
    tag: "Desenvolvimento Web & UI/UX",
    title: "Engenharia Web de Alta Performance",
    content: `
      <p>Desenvolvemos aplicações web e landing pages minimalistas com código 100% puro (Vite & Vanilla JavaScript), priorizando a <strong>velocidade e usabilidade extrema</strong>. Em um mercado saturado de construtores de arrastar-e-soltar pesados (como WordPress e Elementor), destacamos sua marca com carregamento abaixo de 0.5s e código cirúrgico.</p>
      
      <h4>Nossa Abordagem de Engenharia</h4>
      <p>Utilizamos um design system modular baseado em CSS sob medida. Cada transição é otimizada com o framework <strong>GSAP (GreenSock Animation Platform)</strong> para rodar a uma taxa constante de 60 frames por segundo. Isso reflete diretamente na retenção do usuário e na credibilidade digital do seu negócio.</p>
      
      <h4>Benefícios Estratégicos:</h4>
      <ul>
        <li><strong>Velocidade Superior:</strong> Indexação prioritária nos motores de busca do Google (Core Web Vitals).</li>
        <li><strong>Foco em Conversão (UI/UX):</strong> Jornada de navegação fluida desenhada por um especialista para capturar leads.</li>
        <li><strong>Design Apple-Inspired:</strong> Minimalismo premium, tipografias modernas e harmonia cromática impecável.</li>
      </ul>
      
      <p><em>"O design não é apenas o que parece ou se sente. O design é como funciona."</em> Com essa premissa, garantimos que seu site se torne uma máquina autônoma de aquisição de novos clientes.</p>
    `
  },
  automation: {
    tag: "Automação & IA Generativa",
    title: "Sistemas Inteligentes no Piloto Automático",
    content: `
      <p>Conectamos as ferramentas essenciais do seu negócio (como CRM, planilhas e e-mails) a modelos de linguagem de inteligência artificial de ponta (<strong>Gemini e Claude via Google AI Studio</strong>). O objetivo é eliminar gargalos manuais e escalar a produtividade da sua empresa em até 80%.</p>
      
      <h4>Integrações & Processamento Inteligente</h4>
      <p>Criamos pipelines inteligentes e fluxos automatizados com plataformas líderes como <strong>n8n e Make</strong>. Desenvolvemos agentes de qualificação de leads, bots integrados para WhatsApp e sistemas que estruturam e processam dados não organizados de forma imediata.</p>
      
      <h4>Benefícios Estratégicos:</h4>
      <ul>
        <li><strong>Economia de Tempo:</strong> Reduza tarefas manuais e repetitivas em rotinas automáticas de frações de segundos.</li>
        <li><strong>Qualificação com IA:</strong> Respostas contextuais, triagem e envio de alertas em tempo real.</li>
        <li><strong>IA Generativa Prática:</strong> Conexão nativa com APIs das melhores LLMs do mercado global.</li>
      </ul>
      
      <p>Modernize sua estrutura operacional. Traga a potência das IAs modernas e APIs de automação robustas para trabalhar 24 horas por dia focando na geração de leads do seu negócio.</p>
    `
  },
  backend: {
    tag: "Arquitetura & Engenharia",
    title: "Backend Robusto & Bancos de Dados Seguros",
    content: `
      <p>Abaixo de uma bela interface visual, reside a engenharia lógica que garante a integridade, velocidade e segurança dos seus dados comerciais. Desenvolvemos soluções backend complexas focadas em alto desempenho, segurança de informação e estabilidade operacional.</p>
      
      <h4>Tecnologia & Bancos de Dados Relacionais</h4>
      <p>Com forte experiência técnica desenvolvida em laboratórios acadêmicos e corporativos (UFSC Telemedicina e Paradigma Business), implementamos APIs performáticas sob o ecossistema <strong>NodeJS (Express/HapiJS) e Python</strong>, aliadas a bancos de dados robustos como <strong>SQL Server, MySQL e PostgreSQL</strong> e ambientes isolados com <strong>Docker</strong>.</p>
      
      <h4>Benefícios Estratégicos:</h4>
      <ul>
        <li><strong>Integridade Absoluta:</strong> Bancos relacionais modelados sob rígidos padrões de consistência física e lógica.</li>
        <li><strong>Escalabilidade Avançada:</strong> Estrutura de rotas de servidor preparadas para alta concorrência de requisições.</li>
        <li><strong>Segurança e Isolamento:</strong> Docker containers para portabilidade e controle rígido contra invasões.</li>
      </ul>
      
      <p>Garanta que as informações do seu negócio estejam armazenadas com segurança e velocidade estrutural de nível enterprise.</p>
    `
  },
  traffic: {
    tag: "Tráfego Pago & Web Analytics",
    title: "Meta/Google Ads & Rastreamento Avançado",
    content: `
      <p>Não basta ter um sistema veloz se ele não atrai o público certo. Desenvolvemos a gestão técnica de campanhas comerciais em <strong>Google Ads</strong> e **Facebook Meta Business Suite (Meta Ads)** de forma orientada a dados, focando no retorno estratégico sobre o seu investimento (ROI).</p>
      
      <h4>Business Intelligence & Rastreamento Cirúrgico</h4>
      <p>Nosso diferencial é a integração profunda de dados. Configuramos e depuramos ferramentas como <strong>Google Tag Manager, Google Analytics 4 e APIs de conversão direta</strong>. Isso garante que cada clique, visualização e compra seja rastreado, alimentando o algoritmo de anúncios com dados limpos para otimizar suas conversões.</p>
      
      <h4>Benefícios Estratégicos:</h4>
      <ul>
        <li><strong>Precisão nos Dados:</strong> Rastreamento sem perdas por meio de APIs de conversão no servidor.</li>
        <li><strong>Públicos Inteligentes:</strong> Otimização constante de públicos Lookalike e testes de criativos de alta conversão.</li>
        <li><strong>Retorno Mensurável:</strong> Relatórios transparentes focados no Custo de Aquisição de Clientes (CAC) e ROI real.</li>
      </ul>
      
      <p>Atraia os leads mais quentes do mercado direto para suas páginas otimizadas e veja as vendas operarem em escala geométrica.</p>
    `
  }
};

const serviceModal = document.getElementById('service-modal');
const serviceModalCard = document.getElementById('service-modal-card');
const serviceModalClose = document.getElementById('service-modal-close');
const serviceModalTag = document.getElementById('service-modal-tag');
const serviceModalTitle = document.getElementById('service-modal-title');
const serviceModalBody = document.getElementById('service-modal-body');

if (serviceModal && serviceModalCard) {
  const bentoCards = document.querySelectorAll('.bento-card');
  bentoCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Evitar abrir se o clique foi diretamente no link CTA do WhatsApp (caso exista)
      if (e.target.closest('a') && !e.target.closest('.bento-card-link')) {
        return;
      }
      
      const serviceKey = card.getAttribute('data-card');
      const article = serviceArticles[serviceKey];
      
      if (article) {
        e.preventDefault();
        
        // Injetar conteúdo
        serviceModalTag.innerText = article.tag;
        serviceModalTitle.innerText = article.title;
        serviceModalBody.innerHTML = article.content;
        
        // Ativar modal
        serviceModal.classList.add('active');
        
        // Animá-lo com GSAP Grow
        gsap.killTweensOf(serviceModalCard);
        gsap.killTweensOf(serviceModal);
        
        gsap.fromTo(serviceModal,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
        
        gsap.fromTo(serviceModalCard,
          { scale: 0.85, opacity: 0, y: 25 },
          { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.1)' }
        );
      }
    });
  });
  
  const closeServiceModal = () => {
    gsap.to(serviceModalCard, {
      scale: 0.85,
      opacity: 0,
      y: 20,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        serviceModal.classList.remove('active');
      }
    });
    
    gsap.to(serviceModal, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in'
    });
  };
  
  if (serviceModalClose) {
    serviceModalClose.addEventListener('click', closeServiceModal);
  }
  
  serviceModal.addEventListener('click', (e) => {
    if (e.target === serviceModal) {
      closeServiceModal();
    }
  });
}


