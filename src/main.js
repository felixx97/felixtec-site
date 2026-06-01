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
    .fromTo('.python-ide-panel', 
      { opacity: 0, y: 30, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        onComplete: () => {
          // Trigger typewriter code typing immediately on desktop, or wait for expand on mobile
          if (!isMobile) {
            typeCode();
          }
        }
      }, 
      '-=0.8'
    );

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

    // 3. Minimize back when clicking on the tab title (py-automation.py) on mobile
    const ideTab = pythonIdePanel.querySelector('.ide-tab');
    if (ideTab) {
      ideTab.addEventListener('click', (e) => {
        if (isMobile && !pythonIdePanel.classList.contains('collapsed')) {
          e.preventDefault();
          e.stopPropagation(); // Crucial: Stop click propagation so we don't trigger the parent click (expand) again!
          
          // Collapse IDE panel
          pythonIdePanel.classList.add('collapsed');
          
          // Reset editor text and badge state so it re-types from scratch when expanded again
          const typingArea = document.getElementById('python-typing-area');
          if (typingArea) {
            typingArea.innerHTML = '';
            typingArea.contentEditable = "false";
          }
          const badge = document.getElementById('ide-edit-badge');
          if (badge) badge.classList.remove('active');

          // Return Félix to his peeking position animatedly
          gsap.to('#main-robot', {
            y: 0,
            x: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set('#main-robot', { clearProps: 'all' });
            }
          });
        }
      });
    }
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
    title: "Desenvolvimento Web & UI/UX",
    content: `
      <div style="display: flex; gap: 30px; align-items: flex-start; flex-wrap: wrap-reverse;">
        <!-- Left Side: Copy and Details -->
        <div style="flex: 1.25; min-width: 280px;">
          <p style="font-size: 15px; line-height: 1.6; color: var(--text-primary); margin-bottom: 24px;">
            Unimos design de interface refinado (UI) e usabilidade focada na experiência do usuário (UX) para criar páginas dinâmicas e atraentes. Desenvolvemos soluções sob medida que guiam seus clientes de forma natural e geram mais oportunidades de negócio.
          </p>
          
          <h4 style="font-size: 16px; font-weight: 700; color: var(--accent-cyan); margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px; letter-spacing: 0.5px;">
            Boas Práticas de UI/UX
          </h4>
          <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.5;">
            Um design premium coloca o cliente no centro de tudo. Cuidamos de cada detalhe visual e funcional:
          </p>
          
          <ul style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px;">
            <li style="position: relative; padding-left: 28px; font-size: 14px; line-height: 1.5;">
              <span style="position: absolute; left: 0; color: var(--accent-cyan); font-weight: bold;">✓</span>
              <strong>Hierarquia Visual & Escaneabilidade:</strong> Organização inteligente de tamanhos, cores e espaçamentos. As informações cruciais do seu negócio ganham destaque imediato, facilitando a leitura rápida.
            </li>
            <li style="position: relative; padding-left: 28px; font-size: 14px; line-height: 1.5;">
              <span style="position: absolute; left: 0; color: var(--accent-cyan); font-weight: bold;">✓</span>
              <strong>Tipografia & Leitura Confortável:</strong> Proporções tipográficas refinadas e contraste de cores perfeito, garantindo uma leitura leve, agradável e sem cansaço visual em qualquer tipo de tela.
            </li>
            <li style="position: relative; padding-left: 28px; font-size: 14px; line-height: 1.5;">
              <span style="position: absolute; left: 0; color: var(--accent-cyan); font-weight: bold;">✓</span>
              <strong>Navegação Mobile Inteligente:</strong> Layout desenhado sob medida para a área de alcance confortável dos dedos nos celulares, com botões bem espaçados para evitar toques errados.
            </li>
            <li style="position: relative; padding-left: 28px; font-size: 14px; line-height: 1.5;">
              <span style="position: absolute; left: 0; color: var(--accent-cyan); font-weight: bold;">✓</span>
              <strong>Foco em Conversão e Vendas:</strong> Botões de ação bem sinalizados e localizados nos melhores pontos da página para incentivar o visitante a iniciar uma conversa no WhatsApp com facilidade.
            </li>
          </ul>

          <h4 style="font-size: 16px; font-weight: 700; color: var(--accent-cyan); margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px; letter-spacing: 0.5px;">
            Desenvolvimento Inteligente & Sob Medida
          </h4>
          <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.5;">
            Oferecemos total flexibilidade técnica para construir a melhor versão do seu projeto:
          </p>
          
          <ul style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 14px; margin-bottom: 10px;">
            <li style="position: relative; padding-left: 28px; font-size: 14px; line-height: 1.5;">
              <span style="position: absolute; left: 0; color: var(--accent-cyan); font-weight: bold;">✓</span>
              <strong>Abordagem Híbrida (Código Puro ou Low-Code):</strong> Desenvolvemos seu site programando o código do zero para máxima performance e exclusividade técnica, ou utilizando plataformas modernas de baixo código (Low-Code) que aceleram a entrega e permitem que você mesmo atualize textos e imagens facilmente.
            </li>
            <li style="position: relative; padding-left: 28px; font-size: 14px; line-height: 1.5;">
              <span style="position: absolute; left: 0; color: var(--accent-cyan); font-weight: bold;">✓</span>
              <strong>Movimento & Elegância Visual:</strong> Animações sutis e fluidas que reagem de forma inteligente às ações do usuário. A página ganha vida e transmite profissionalismo, credibilidade e sofisticação de alto nível.
            </li>
            <li style="position: relative; padding-left: 28px; font-size: 14px; line-height: 1.5;">
              <span style="position: absolute; left: 0; color: var(--accent-cyan); font-weight: bold;">✓</span>
              <strong>Velocidade e Carregamento Rápido:</strong> Páginas leves que carregam de forma ágil, diminuindo a desistência de novos clientes e melhorando muito a visibilidade da sua empresa nas buscas orgânicas do Google.
            </li>
          </ul>
        </div>
        
        <!-- Right Side: Mascot and Case Collages -->
        <div style="flex: 0.75; min-width: 260px; display: flex; flex-direction: column; gap: 20px; width: 100%;">
          
          <!-- Animated Mascot Container -->
          <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); border-radius: 20px; padding: 20px; box-shadow: inset 0 0 15px rgba(0, 210, 255, 0.05); text-align: center;">
            <div style="width: 120px; height: 120px; animation: modalMascotFloat 3.5s ease-in-out infinite alternate; position: relative; margin: 0 auto 10px;">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
                <defs>
                  <filter id="modal-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <linearGradient id="modal-grad-skin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ffe5c4" />
                    <stop offset="100%" stop-color="#fca88f" />
                  </linearGradient>
                  <linearGradient id="modal-grad-hoodie" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#2d2d3a" />
                    <stop offset="100%" stop-color="#14141a" />
                  </linearGradient>
                </defs>
                
                <!-- Floating code elements in SVG background -->
                <text x="5" y="30" fill="var(--accent-cyan)" font-size="8" font-family="monospace" opacity="0.6">&lt;/&gt;</text>
                <text x="80" y="25" fill="var(--accent-blue)" font-size="7" font-family="monospace" opacity="0.6">{ UX }</text>
                <circle cx="10" cy="75" r="1.5" fill="var(--accent-cyan)" opacity="0.5" />
                <circle cx="90" cy="65" r="2" fill="var(--accent-blue)" opacity="0.5" />

                <!-- Headphone Band -->
                <path d="M23 42 A 28 28 0 0 1 77 42" fill="none" stroke="var(--accent-cyan)" stroke-width="1.8" filter="url(#modal-glow-cyan)" />
                <!-- Gamer Cups -->
                <rect x="15" y="38" width="8" height="15" rx="4" fill="#15151c" stroke="var(--accent-cyan)" stroke-width="1.2" filter="url(#modal-glow-cyan)" />
                <rect x="77" y="38" width="8" height="15" rx="4" fill="#15151c" stroke="var(--accent-cyan)" stroke-width="1.2" filter="url(#modal-glow-cyan)" />
                <!-- Head -->
                <path d="M22 42 C22 60, 78 60, 78 42 Z" fill="url(#modal-grad-skin)" />
                <!-- Hair -->
                <path d="M23 40 Q50 25 77 40 Q64 35 50 38 Q36 35 23 40 Z" fill="#15151c" />
                <!-- Glasses -->
                <circle cx="37" cy="46" r="9.5" fill="rgba(0, 210, 255, 0.05)" stroke="var(--accent-cyan)" stroke-width="1.2" filter="url(#modal-glow-cyan)" />
                <circle cx="63" cy="46" r="9.5" fill="rgba(0, 210, 255, 0.05)" stroke="var(--accent-cyan)" stroke-width="1.2" filter="url(#modal-glow-cyan)" />
                <line x1="46.5" y1="46" x2="53.5" y2="46" stroke="var(--accent-cyan)" stroke-width="1.2" filter="url(#modal-glow-cyan)" />
                <!-- Eyes -->
                <circle cx="37" cy="46" r="3.2" fill="#15151c" />
                <circle cx="63" cy="46" r="3.2" fill="#15151c" />
                <circle cx="38.5" cy="44.5" r="1" fill="#ffffff" />
                <circle cx="64.5" cy="44.5" r="1" fill="#ffffff" />
                <!-- Blush -->
                <circle cx="25" cy="51" r="2.5" fill="#ff3366" fill-opacity="0.4" />
                <circle cx="75" cy="51" r="2.5" fill="#ff3366" fill-opacity="0.4" />
                <!-- Hoodie -->
                <path d="M23 60 C23 60, 50 56, 77 60 L80 92 L20 92 Z" fill="url(#modal-grad-hoodie)" stroke="#2d2d3a" stroke-width="1.2" />
                <!-- Logo FT -->
                <path d="M44.8 69.5 V63.5 H48.5 V64.7 H45.8 V66.1 H48 V67.2 H45.8 V69.5 Z" fill="var(--accent-cyan)" filter="url(#modal-glow-cyan)" />
                <path d="M50 63.5 H55.2 V64.7 H53.5 V69.5 H51.9 V64.7 H50 Z" fill="var(--accent-cyan)" filter="url(#modal-glow-cyan)" />
              </svg>
            </div>
            <span style="font-size: 11px; font-weight: 700; color: var(--accent-cyan); letter-spacing: 0.5px; text-transform: uppercase;">Dev Félix</span>
            <p style="font-size: 11px; color: var(--text-secondary); line-height: 1.4; margin: 4px 0 0;">Mascote FélixTec programando cada pixel com foco em design e usabilidade.</p>
          </div>
          
          <!-- Cases Collage Section -->
          <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 16px; display: flex; flex-direction: column; gap: 12px;">
            <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); letter-spacing: 1px; text-transform: uppercase; border-left: 2px solid var(--accent-cyan); padding-left: 6px; display: block;">Casos de Sucesso</span>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <!-- High Tech -->
              <div style="position: relative; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); aspect-ratio: 16/10; background: #000; cursor: pointer; transition: border-color 0.3s ease;" onmouseover="this.style.borderColor='var(--accent-cyan)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.05)'" onclick="window.open('https://hightechfloripa.com.br/', '_blank')">
                <img src="/site-high-tech.png" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.6; transition: transform 0.3s ease, opacity 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'; this.style.opacity='1';" onmouseout="this.style.transform='scale(1)'; this.style.opacity='0.6';" alt="High Tech" />
                <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 4px 6px; background: linear-gradient(to top, rgba(0,0,0,0.85), transparent); pointer-events: none;">
                  <span style="font-size: 9px; font-weight: 700; color: #fff; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">High Tech</span>
                </div>
              </div>
              
              <!-- At Work -->
              <div style="position: relative; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); aspect-ratio: 16/10; background: #000; cursor: pointer; transition: border-color 0.3s ease;" onmouseover="this.style.borderColor='var(--accent-cyan)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.05)'" onclick="window.open('https://atworksc.com.br/', '_blank')">
                <img src="/Site-At-work.png" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.6; transition: transform 0.3s ease, opacity 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'; this.style.opacity='1';" onmouseout="this.style.transform='scale(1)'; this.style.opacity='0.6';" alt="At Work" />
                <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 4px 6px; background: linear-gradient(to top, rgba(0,0,0,0.85), transparent); pointer-events: none;">
                  <span style="font-size: 9px; font-weight: 700; color: #fff; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">At Work</span>
                </div>
              </div>
              
              <!-- Jukere -->
              <div style="position: relative; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); aspect-ratio: 16/10; background: #000; cursor: pointer; transition: border-color 0.3s ease;" onmouseover="this.style.borderColor='var(--accent-cyan)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.05)'" onclick="window.open('https://jukere.com.br/', '_blank')">
                <img src="/Site-Jukere.png" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.6; transition: transform 0.3s ease, opacity 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'; this.style.opacity='1';" onmouseout="this.style.transform='scale(1)'; this.style.opacity='0.6';" alt="Jukerê" />
                <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 4px 6px; background: linear-gradient(to top, rgba(0,0,0,0.85), transparent); pointer-events: none;">
                  <span style="font-size: 9px; font-weight: 700; color: #fff; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Jukerê</span>
                </div>
              </div>
              
              <!-- Vips TV -->
              <div style="position: relative; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); aspect-ratio: 16/10; background: #000; cursor: pointer; transition: border-color 0.3s ease;" onmouseover="this.style.borderColor='var(--accent-cyan)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.05)'" onclick="window.open('https://vipstv.com.br/', '_blank')">
                <img src="/Site-vips-tv.png" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.6; transition: transform 0.3s ease, opacity 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'; this.style.opacity='1';" onmouseout="this.style.transform='scale(1)'; this.style.opacity='0.6';" alt="Vips TV" />
                <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 4px 6px; background: linear-gradient(to top, rgba(0,0,0,0.85), transparent); pointer-events: none;">
                  <span style="font-size: 9px; font-weight: 700; color: #fff; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Vips TV</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      <style>
        @keyframes modalMascotFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-6px) rotate(2deg); }
        }
      </style>
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

// ----------------------------------------------------
// 8. Banner Dinâmico de Cookies e Termos de Uso (Segurança & Privacidade)
// ----------------------------------------------------
const initCookieBanner = () => {
  if (localStorage.getItem('ft_cookie_consent_accepted')) {
    return;
  }

  // Injetar estilos CSS de forma dinâmica
  const style = document.createElement('style');
  style.innerHTML = `
    /* Garantir que o cursor fluido customizado fique acima do banner */
    .custom-cursor, #custom-cursor,
    .custom-cursor-dot, #custom-cursor-dot {
      z-index: 999999 !important;
    }

    #ft-cookie-banner {
      position: fixed;
      bottom: 24px;
      left: 24px; /* Posicionado à esquerda conforme solicitação */
      right: auto;
      width: calc(100% - 48px);
      max-width: 360px;
      background: rgba(10, 10, 12, 0.95);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(0, 210, 255, 0.03);
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transform: translateY(40px) scale(0.95);
      opacity: 0;
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
      pointer-events: none;
    }

    #ft-cookie-banner.active {
      transform: translateY(0) scale(1);
      opacity: 1;
      pointer-events: all;
    }

    #ft-cookie-banner p {
      font-size: 13px;
      color: #86868b;
      line-height: 1.6;
      margin: 0;
    }

    #ft-cookie-banner p a {
      color: #00d2ff;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s ease;
    }

    #ft-cookie-banner p a:hover {
      color: #0071e3;
      text-decoration: underline;
    }

    #ft-cookie-banner-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    #ft-cookie-banner-title {
      font-size: 14px;
      font-weight: 700;
      color: #f5f5f7;
      margin: 0;
      letter-spacing: 0.3px;
    }

    #ft-cookie-banner-btn {
      align-self: flex-end;
      padding: 8px 18px;
      background: linear-gradient(135deg, #0071e3 0%, #00d2ff 100%);
      border: none;
      border-radius: 8px;
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      font-family: inherit;
      transition: transform 0.2s ease, opacity 0.2s ease;
      cursor: pointer;
    }

    #ft-cookie-banner-btn:hover {
      transform: scale(1.02);
      opacity: 0.95;
    }

    #ft-cookie-banner-btn:active {
      transform: scale(0.98);
    }

    @media (max-width: 480px) {
      #ft-cookie-banner {
        bottom: 16px;
        left: 16px;
        right: 16px;
        width: auto;
        max-width: none;
        padding: 16px;
      }
    }
  `;
  document.head.appendChild(style);

  // Criar elemento do banner
  const banner = document.createElement('div');
  banner.id = 'ft-cookie-banner';
  banner.innerHTML = `
    <div id="ft-cookie-banner-title-row">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 4px rgba(0, 210, 255, 0.4));">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
      <h4 id="ft-cookie-banner-title">Segurança & Privacidade</h4>
    </div>
    <p>
      Utilizamos cookies essenciais para analisar o tráfego de visitas e medir a segurança deste site. Ao continuar navegando, você concorda com nossos <a href="/politicas.html#termos">Termos de Uso</a> e <a href="/politicas.html#privacidade">Política de Privacidade</a>.
    </p>
    <button id="ft-cookie-banner-btn">Aceitar</button>
  `;
  document.body.appendChild(banner);

  // Exibir com transição após 1.5 segundos
  setTimeout(() => {
    banner.classList.add('active');
  }, 1500);

  // Ação de fechar e salvar consentimento
  const acceptBtn = banner.querySelector('#ft-cookie-banner-btn');
  acceptBtn.addEventListener('click', () => {
    banner.classList.remove('active');
    localStorage.setItem('ft_cookie_consent_accepted', 'true');
    setTimeout(() => {
      banner.remove();
    }, 600);
  });
};

// ----------------------------------------------------
// 9. Botão Flutuante do WhatsApp e Popup de Captura Integrado
// ----------------------------------------------------
const initWhatsAppWidget = () => {
  // Injetar estilos do WhatsApp
  const style = document.createElement('style');
  style.innerHTML = `
    #ft-wa-float {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      background: #25D366;
      border-radius: 50%;
      box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
      cursor: pointer;
    }

    #ft-wa-float:hover {
      transform: scale(1.1) translateY(-2px);
      box-shadow: 0 6px 25px rgba(37, 211, 102, 0.6);
    }

    #ft-wa-float:active {
      transform: scale(0.95);
    }

    #ft-wa-float svg {
      width: 32px;
      height: 32px;
      fill: #fff;
    }

    #ft-wa-float::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid #25D366;
      border-radius: 50%;
      animation: waPulse 2s infinite;
      pointer-events: none;
      box-sizing: border-box;
    }

    @keyframes waPulse {
      0% { transform: scale(1); opacity: 0.6; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    #ft-wa-popup {
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 320px;
      background: rgba(10, 10, 12, 0.96);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(0, 210, 255, 0.02);
      z-index: 9998;
      display: flex;
      flex-direction: column;
      gap: 14px;
      transform: translateY(20px) scale(0.9);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
    }

    #ft-wa-popup.active {
      transform: translateY(0) scale(1);
      opacity: 1;
      pointer-events: all;
    }

    #ft-wa-popup-header {
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      padding-bottom: 10px;
    }

    #ft-wa-popup-title {
      font-size: 15px;
      font-weight: 700;
      color: #f5f5f7;
      margin: 0;
    }

    #ft-wa-popup p {
      font-size: 12px;
      color: #86868b;
      line-height: 1.5;
      margin: 0;
    }

    .ft-wa-field {
      width: 100%;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 8px;
      color: #fff;
      padding: 10px 12px;
      font-size: 13px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.25s ease, box-shadow 0.25s ease;
      box-sizing: border-box;
    }

    .ft-wa-field:focus {
      border-color: #00d2ff;
      box-shadow: 0 0 8px rgba(0, 210, 255, 0.15);
    }

    #ft-wa-popup-btn {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
      border: none;
      border-radius: 8px;
      color: #fff;
      font-size: 13px;
      font-weight: 700;
      font-family: inherit;
      transition: transform 0.2s ease, opacity 0.2s ease;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 15px rgba(37, 211, 102, 0.2);
    }

    #ft-wa-popup-btn:hover {
      transform: scale(1.02);
      opacity: 0.95;
    }

    #ft-wa-popup-btn:active {
      transform: scale(0.98);
    }

    #ft-wa-popup-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: none;
      border: none;
      color: #86868b;
      font-size: 18px;
      cursor: pointer;
      transition: color 0.2s ease;
      line-height: 1;
    }

    #ft-wa-popup-close:hover {
      color: #fff;
    }

    @media (max-width: 480px) {
      #ft-wa-popup {
        bottom: 96px;
        left: 16px;
        right: 16px;
        width: auto;
      }
    }
  `;
  document.head.appendChild(style);

  // Criar botão flutuante
  const waFloat = document.createElement('div');
  waFloat.id = 'ft-wa-float';
  waFloat.title = 'Falar no WhatsApp';
  waFloat.innerHTML = `
    <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  `;
  document.body.appendChild(waFloat);

  // Criar popup de captura
  const waPopup = document.createElement('div');
  waPopup.id = 'ft-wa-popup';
  waPopup.innerHTML = `
    <button id="ft-wa-popup-close" title="Fechar">&times;</button>
    <div id="ft-wa-popup-header">
      <svg width="24" height="24" viewBox="0 0 448 512" fill="#25D366">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
      </svg>
      <h4 id="ft-wa-popup-title">Iniciar conversa</h4>
    </div>
    <p>Olá! Insira suas informações para falar diretamente no meu WhatsApp comercial.</p>
    
    <input type="text" id="ft-wa-name" class="ft-wa-field" placeholder="Seu nome" required />
    <input type="tel" id="ft-wa-phone" class="ft-wa-field" placeholder="Seu WhatsApp (com DDD)" required />
    <input type="email" id="ft-wa-email" class="ft-wa-field" placeholder="Seu e-mail" required />
    
    <button id="ft-wa-popup-btn">
      <span>Iniciar Chat</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    </button>
  `;
  document.body.appendChild(waPopup);

  // Toggle Popup ao clicar no botão flutuante
  waFloat.addEventListener('click', (e) => {
    e.stopPropagation();
    waPopup.classList.toggle('active');
  });

  // Fechar no botão X
  const closeBtn = waPopup.querySelector('#ft-wa-popup-close');
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    waPopup.classList.remove('active');
  });

  // Impedir fechar ao clicar dentro do popup
  waPopup.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Fechar ao clicar fora
  document.addEventListener('click', () => {
    waPopup.classList.remove('active');
  });

  // Evento do botão enviar
  const sendBtn = waPopup.querySelector('#ft-wa-popup-btn');
  sendBtn.addEventListener('click', () => {
    const name = waPopup.querySelector('#ft-wa-name').value.trim();
    const phone = waPopup.querySelector('#ft-wa-phone').value.trim();
    const email = waPopup.querySelector('#ft-wa-email').value.trim();

    if (!name || !phone || !email) {
      alert('Por favor, preencha todos os campos do formulário.');
      return;
    }

    // Enviar dados em tempo real para o Google Sheets Apps Script Webhook
    const webhookUrl = 'https://script.google.com/macros/s/AKfycby2ReFA66FpTSvlCTdQuI3buSn_KrZWEDbMwTwWus_32yJSryICn2WsNhaqErCepdnyuA/exec';
    
    fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        origem: 'Formulario_WhatsApp',
        nome: name,
        whatsapp: phone,
        email: email
      })
    }).catch(err => console.error('Erro ao registrar lead do WhatsApp:', err));

    // Construir mensagem personalizada
    const message = `Olá! Meu nome é ${name} (E-mail: ${email}, WhatsApp: ${phone}). Gostaria de idealizar um projeto estratégico e solicitar um orçamento comercial com a FélixTec!`;
    const waUrl = `https://wa.me/5547989224775?text=${encodeURIComponent(message)}`;

    // Redirecionar para o WhatsApp real
    window.open(waUrl, '_blank');
    
    // Fechar popup
    waPopup.classList.remove('active');
  });
};

// ----------------------------------------------------
// 10. Formulário de Contato do Footer
// ----------------------------------------------------
const initContactForm = () => {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service-select').value;
    const message = document.getElementById('message').value.trim();
    const submitBtn = document.getElementById('submit-btn');

    if (!name || !email || !service || !message) {
      alert('Por favor, preencha todos os campos do formulário.');
      return;
    }

    // Mudar estado do botão para indicar processamento
    const originalText = submitBtn.innerHTML;
    submitBtn.style.pointerEvents = 'none';
    submitBtn.innerHTML = '<span>Processando...</span>';

    // Enviar dados em tempo real para o Google Sheets Apps Script Webhook
    const webhookUrl = 'https://script.google.com/macros/s/AKfycby2ReFA66FpTSvlCTdQuI3buSn_KrZWEDbMwTwWus_32yJSryICn2WsNhaqErCepdnyuA/exec';
    
    fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        origem: 'Formulario_Footer',
        nome: name,
        email: email,
        servico: service,
        mensagem: message
      })
    }).catch(err => console.error('Erro ao registrar lead do rodapé:', err));

    // Feedback visual premium de sucesso
    setTimeout(() => {
      submitBtn.innerHTML = '<span>Solicitação Enviada!</span>';
      submitBtn.style.background = 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)'; // Verde de sucesso

      // Resetar formulário
      contactForm.reset();

      // Voltar ao estado original após 3 segundos
      setTimeout(() => {
        submitBtn.style.pointerEvents = 'all';
        submitBtn.style.background = '';
        submitBtn.innerHTML = originalText;
      }, 3000);
    }, 1000);
  });
};

// Inicializar tudo após carregamento
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initCookieBanner();
    initWhatsAppWidget();
    initContactForm();
  });
} else {
  initCookieBanner();
  initWhatsAppWidget();
  initContactForm();
}




