import './mae.css';
import gsap from 'gsap';

// ----------------------------------------------------
// 1. Cursor Fluido Customizado & Glow de Fundo
// ----------------------------------------------------
const cursorOuter = document.getElementById('custom-cursor');
const cursorInner = document.getElementById('custom-cursor-dot');

let mouseX = 0;
let mouseY = 0;
let cursorOuterX = 0;
let cursorOuterY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Move a bolinha interna imediatamente
  if (cursorInner) {
    cursorInner.style.left = `${mouseX}px`;
    cursorInner.style.top = `${mouseY}px`;
  }

  // Atualiza as variáveis CSS para o glow de fundo
  document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);
});

// Suavização do cursor externo (interpolação linear)
function updateCursorPosition() {
  const speed = 0.15;
  cursorOuterX += (mouseX - cursorOuterX) * speed;
  cursorOuterY += (mouseY - cursorOuterY) * speed;

  if (cursorOuter) {
    cursorOuter.style.left = `${cursorOuterX}px`;
    cursorOuter.style.top = `${cursorOuterY}px`;
  }

  requestAnimationFrame(updateCursorPosition);
}
updateCursorPosition();

// Efeito de hover nos botões e elementos clicáveis
const hoverables = document.querySelectorAll('a, button, .wax-seal, .letter-card');
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
// 2. Sistema de Partículas: Orquídeas Caindo
// ----------------------------------------------------
const orchidsContainer = document.getElementById('orchids-container');
const numberOfOrchids = window.innerWidth < 600 ? 45 : 90;

const orchidTemplates = [
  // Orquídea com pétalas cheias
  `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,15 C40,25 20,30 32,48 C44,66 47,75 50,80 C53,75 56,66 68,48 C80,30 60,25 50,15 Z" fill="#ebdef0" opacity="0.85"/>
    <path d="M50,30 C44,38 32,40 38,50 C44,60 47,65 50,68 C53,65 56,60 62,50 C68,40 56,38 50,30 Z" fill="#d7bde2" />
    <path d="M50,42 C47,46 42,48 45,52 C48,56 49,58 50,60 C51,58 52,56 55,52 C58,48 53,46 50,42 Z" fill="#c39bd3" />
    <circle cx="50" cy="52" r="5" fill="#f1c40f"/>
  </svg>`,
  // Pétala flutuante
  `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,20 Q32,42 50,80 Q68,42 50,20 Z" fill="#f5eef8" opacity="0.9" />
    <path d="M50,35 Q38,50 50,70 Q62,50 50,35 Z" fill="#e8daef" />
    <path d="M50,48 Q44,56 50,62 Q56,56 50,48 Z" fill="#d7bde2" />
  </svg>`,
  // Flor de orquídea estilizada menor
  `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,22 C30,22 25,48 50,78 C75,48 70,22 50,22 Z" fill="#ebdef0" opacity="0.8"/>
    <path d="M22,50 C22,30 48,25 78,50 C48,75 30,70 22,50 Z" fill="#e8daef" opacity="0.85"/>
    <circle cx="50" cy="50" r="7" fill="#f1c40f"/>
    <circle cx="50" cy="50" r="3" fill="#e74c3c"/>
  </svg>`
];

function createOrchidParticle() {
  const particle = document.createElement('div');
  particle.className = 'orchid-particle';
  
  // Escolhe um template aleatório
  const randomTemplate = orchidTemplates[Math.floor(Math.random() * orchidTemplates.length)];
  particle.innerHTML = randomTemplate;
  
  // Define largura/altura aleatórias (entre 20px e 40px)
  const size = gsap.utils.random(20, 42);
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  
  orchidsContainer.appendChild(particle);
  animateOrchid(particle);
}

function animateOrchid(el) {
  const duration = gsap.utils.random(9, 16);
  const startX = gsap.utils.random(0, window.innerWidth);
  const driftX = gsap.utils.random(-150, 150);
  
  gsap.set(el, {
    x: startX,
    y: -50 - gsap.utils.random(0, 100),
    rotation: gsap.utils.random(0, 360),
    scale: gsap.utils.random(0.5, 1.1),
    opacity: gsap.utils.random(0.65, 0.9)
  });
  
  gsap.to(el, {
    y: window.innerHeight + 50,
    x: `+=${driftX}`,
    rotation: `+=${gsap.utils.random(180, 540)}`,
    duration: duration,
    ease: 'none',
    onComplete: () => {
      // Quando sai da tela, reinicia no topo
      animateOrchid(el);
    }
  });
}

// Inicializa a chuva de orquídeas
for (let i = 0; i < numberOfOrchids; i++) {
  createOrchidParticle();
}

// ----------------------------------------------------
// 3. Gerador de Fotos Polaroid (Pipocando)
// ----------------------------------------------------
const photosContainer = document.getElementById('floating-photos-container');

const photoList = [
  { src: '/fotos-mae/Abraao_telma (1).jpg', caption: 'Amor incondicional ❤️' },
  { src: '/fotos-mae/Abraao_telma (2).jpg', caption: 'Melhores lembranças ✨' },
  { src: '/fotos-mae/Abraao_telma (3).jpg', caption: 'Sempre juntos! 🌸' },
  { src: '/fotos-mae/Abraao_telma (4).jpg', caption: 'Sorrisos cúmplices 🥰' },
  { src: '/fotos-mae/Abraao_telma (5).jpg', caption: 'Minha inspiração 💜' },
  { src: '/fotos-mae/Abraao_telma (6).jpg', caption: 'Amor eterno! 💖' }
];

let activeZoomedPhoto = null;

// Instancia as fotos ocultas no centro da tela
function setupPhotos() {
  photoList.forEach((photoData) => {
    const photoDiv = document.createElement('div');
    photoDiv.className = 'polaroid-photo';
    
    photoDiv.innerHTML = `
      <div class="polaroid-img-wrapper">
        <img src="${photoData.src}" class="polaroid-img" alt="Foto de Homenagem" />
      </div>
      <span class="polaroid-caption">${photoData.caption}</span>
    `;
    
    const isMobile = window.innerWidth <= 600;
    // Inicializa na posição oculta (escala 0, no centro)
    gsap.set(photoDiv, {
      scale: 0,
      opacity: 0,
      x: window.innerWidth / 2 - (isMobile ? 47.5 : 90),
      y: window.innerHeight / 2 - (isMobile ? 57.5 : 110),
      transformOrigin: 'center center'
    });
    
    // Evento de clique para zoom/ampliação
    photoDiv.addEventListener('click', (e) => {
      e.stopPropagation();
      if (envelopeContainer.classList.contains('opened')) {
        toggleZoomPhoto(photoDiv);
      }
    });
    
    photosContainer.appendChild(photoDiv);
  });
}
setupPhotos();

// ----------------------------------------------------
// 4. Sintetizador de Áudio (Caixinha de Música - Web Audio API)
// ----------------------------------------------------
let audioCtx = null;
let scheduleTimeout = null;
let isPlayingMusic = false;
let currentNoteIndex = 0;

// Melodia de "Parabéns pra Você"
const melody = [
  { note: 'C4', dur: 0.5 }, { note: 'C4', dur: 0.5 }, { note: 'D4', dur: 1 }, { note: 'C4', dur: 1 }, { note: 'F4', dur: 1 }, { note: 'E4', dur: 2 },
  { note: 'C4', dur: 0.5 }, { note: 'C4', dur: 0.5 }, { note: 'D4', dur: 1 }, { note: 'C4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'F4', dur: 2 },
  { note: 'C4', dur: 0.5 }, { note: 'C4', dur: 0.5 }, { note: 'C5', dur: 1 }, { note: 'A4', dur: 1 }, { note: 'F4', dur: 1 }, { note: 'E4', dur: 1 }, { note: 'D4', dur: 2 },
  { note: 'Bb4', dur: 0.5 }, { note: 'Bb4', dur: 0.5 }, { note: 'A4', dur: 1 }, { note: 'F4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'F4', dur: 2 }
];

const noteFreqs = {
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'Bb4': 466.16, 'C5': 523.25
};

function playMusicBoxNote(freq, startTime, duration) {
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  // Onda senoidal pura combinada com leve ganho de harmônicos cria o efeito límpido metálico de caixinha de música
  osc.type = 'sine';
  osc.frequency.value = freq;
  
  // Envelope de volume: ataque imediato com decaimento suave
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(0.18, startTime + 0.015);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration - 0.01);
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  osc.start(startTime);
  osc.stop(startTime + duration);
}

function scheduleNextNote(time) {
  if (!isPlayingMusic) return;

  const currentNote = melody[currentNoteIndex];
  const freq = noteFreqs[currentNote.note];
  
  // Efeito plinc plinc da caixinha (notas ligeiramente mais curtas que o tempo real)
  const soundDuration = currentNote.dur * 0.75;
  playMusicBoxNote(freq, time, soundDuration);
  
  // Tempo de passo
  const nextTime = time + (currentNote.dur * 0.72); // Ajusta o andamento
  
  currentNoteIndex = (currentNoteIndex + 1) % melody.length;
  
  const timeDifferenceMs = (nextTime - audioCtx.currentTime) * 1000;
  scheduleTimeout = setTimeout(() => {
    scheduleNextNote(nextTime);
  }, timeDifferenceMs);
}

function startMusic() {
  if (isPlayingMusic) return;
  
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  isPlayingMusic = true;
  currentNoteIndex = 0;
  
  const toggleBtn = document.getElementById('music-toggle');
  toggleBtn.classList.add('playing');
  document.getElementById('music-icon-off').classList.add('hidden');
  document.getElementById('music-icon-on').classList.remove('hidden');
  
  scheduleNextNote(audioCtx.currentTime + 0.15);
}

function stopMusic() {
  isPlayingMusic = false;
  if (scheduleTimeout) {
    clearTimeout(scheduleTimeout);
  }
  
  const toggleBtn = document.getElementById('music-toggle');
  toggleBtn.classList.remove('playing');
  document.getElementById('music-icon-off').classList.remove('hidden');
  document.getElementById('music-icon-on').classList.add('hidden');
}

// ----------------------------------------------------
// 5. Fluxo de Animação do Envelope e da Carta (Abertura/Fechamento)
// ----------------------------------------------------
const envelopeContainer = document.getElementById('envelope-container');
const waxSeal = document.getElementById('wax-seal');
const letterCard = document.getElementById('letter-card');
const musicToggleBtn = document.getElementById('music-toggle');

// Função para abrir o envelope
function openEnvelope(e) {
  e.stopPropagation();
  
  if (envelopeContainer.classList.contains('opened')) return;

  // Vibração Tátil no celular (se suportado)
  if ('vibrate' in navigator) {
    navigator.vibrate([100, 50, 100]);
  }

  // Ativa a classe que dispara as transformações CSS
  envelopeContainer.classList.add('opened');

  // Disparar o popup de fotos flutuantes ("pipocar")
  triggerPhotosPopup();

  // Iniciar a melodia da caixinha de música
  startMusic();
}

// Função para fechar o envelope
function closeEnvelope() {
  if (!envelopeContainer.classList.contains('opened')) return;

  // Se houver alguma foto com zoom ativo, desfaz o zoom antes de fechar
  if (activeZoomedPhoto) {
    zoomOutPhoto(activeZoomedPhoto);
  }

  // Remove a classe
  envelopeContainer.classList.remove('opened');

  // Retrai as fotos
  closePhotosPopup();

  // Para a música
  stopMusic();
}

// Lógica de Pop de Fotos (Symmetrical 3 top, 3 bottom)
function triggerPhotosPopup() {
  const photos = document.querySelectorAll('.polaroid-photo');
  const isMobile = window.innerWidth <= 600;
  
  photos.forEach((photo, index) => {
    let targetX, targetY;
    
    // Coordenadas de dispersão da tela otimizadas de forma perfeitamente simétrica: 3 em cima, 3 embaixo
    if (isMobile) {
      // Ajuste de posições para evitar sobreposição com o cartão e scroll lateral
      const positions = [
        // 3 no Topo (alinhados e recuados da borda)
        { x: 10, y: 55 },                                  // Superior Esquerda
        { x: window.innerWidth / 2 - 47.5, y: 45 },        // Superior Centro
        { x: window.innerWidth - 105, y: 55 },             // Superior Direita
        // 3 na Base (empurrados para baixo perto do rodapé, sem tocar a borda)
        { x: 10, y: window.innerHeight - 145 },            // Inferior Esquerda
        { x: window.innerWidth / 2 - 47.5, y: window.innerHeight - 135 }, // Inferior Centro
        { x: window.innerWidth - 105, y: window.innerHeight - 145 }  // Inferior Direita
      ];
      targetX = positions[index].x;
      targetY = positions[index].y;
    } else {
      const positions = [
        // 3 no Topo (mais próximos da carta)
        { x: 60, y: 100 },                                 // Superior Esquerda
        { x: window.innerWidth / 2 - 90, y: 70 },          // Superior Centro
        { x: window.innerWidth - 240, y: 100 },            // Superior Direita
        // 3 na Base (mais próximos da carta)
        { x: 80, y: window.innerHeight - 285 },            // Inferior Esquerda
        { x: window.innerWidth / 2 - 90, y: window.innerHeight - 305 }, // Inferior Centro
        { x: window.innerWidth - 270, y: window.innerHeight - 285 }  // Inferior Direita
      ];
      targetX = positions[index].x;
      targetY = positions[index].y;
    }
    
    // Pequeno offset aleatório para quebrar a simetria mecânica
    const rx = gsap.utils.random(-8, 8);
    const ry = gsap.utils.random(-8, 8);
    const finalRot = gsap.utils.random(-10, 10);

    // Reinicia a posição no centro da tela (envelope)
    gsap.set(photo, {
      x: window.innerWidth / 2 - (isMobile ? 47.5 : 90),
      y: window.innerHeight / 2 - (isMobile ? 57.5 : 110),
      scale: 0,
      opacity: 0,
      rotation: gsap.utils.random(-45, 45),
      zIndex: 14 + index
    });

    // Animação de popout ("pipocar no ar") com elasticidade
    gsap.to(photo, {
      x: targetX + rx,
      y: targetY + ry,
      scale: 1,
      opacity: 1,
      rotation: finalRot,
      duration: 1.2,
      delay: 0.35 + (index * 0.12),
      ease: 'back.out(1.3)',
      onComplete: () => {
        // Iniciar animação contínua de flutuação
        startFloatingPhoto(photo, index);
      }
    });
  });
}

// Animação de flutuação suave contínua no ar
function startFloatingPhoto(photo, index) {
  if (photo._floatTimeline) {
    photo._floatTimeline.kill();
  }

  const floatTimeline = gsap.timeline({
    repeat: -1,
    yoyo: true,
    defaults: { ease: 'sine.inOut' }
  });

  const durationY = 2.5 + gsap.utils.random(0, 1.5);
  const durationX = 2.0 + gsap.utils.random(0, 1.5);
  const driftY = 12 + gsap.utils.random(0, 6);
  const driftX = 8 + gsap.utils.random(0, 6);
  const driftRot = 3 + gsap.utils.random(0, 2);

  floatTimeline.to(photo, {
    y: `+=${driftY}`,
    rotation: `+=${driftRot}`,
    duration: durationY
  }).to(photo, {
    y: `-=${driftY}`,
    rotation: `-=${driftRot}`,
    x: `+=${driftX}`,
    duration: durationX
  }).to(photo, {
    x: `-=${driftX}`,
    duration: 1.8
  });

  photo._floatTimeline = floatTimeline;
}

// Fechamento das fotos (retração)
function closePhotosPopup() {
  const photos = document.querySelectorAll('.polaroid-photo');
  const isMobile = window.innerWidth <= 600;

  photos.forEach((photo) => {
    // Para a flutuação
    if (photo._floatTimeline) {
      photo._floatTimeline.kill();
      photo._floatTimeline = null;
    }

    gsap.to(photo, {
      x: window.innerWidth / 2 - (isMobile ? 47.5 : 90),
      y: window.innerHeight / 2 - (isMobile ? 57.5 : 110),
      scale: 0,
      opacity: 0,
      rotation: 0,
      duration: 0.55,
      ease: 'power3.in',
      onComplete: () => {
        photo.classList.remove('zoomed');
      }
    });
  });
}

// ----------------------------------------------------
// 6. Lógica de Ampliação (Zoom/Lightbox) das Fotos
// ----------------------------------------------------
const zoomOverlay = document.getElementById('zoom-overlay');

function toggleZoomPhoto(photo) {
  if (photo.classList.contains('zoomed')) {
    zoomOutPhoto(photo);
  } else {
    // Se houver outra foto com zoom, fecha primeiro
    if (activeZoomedPhoto) {
      zoomOutPhoto(activeZoomedPhoto);
    }
    zoomInPhoto(photo);
  }
}

function zoomInPhoto(photo) {
  const isMobile = window.innerWidth <= 600;
  const targetScale = isMobile ? 1.8 : 2.5;

  // Pausa a flutuação da foto
  if (photo._floatTimeline) {
    photo._floatTimeline.pause();
  }

  // Armazena as coordenadas flutuantes atuais antes do zoom
  photo._preZoomX = gsap.getProperty(photo, 'x');
  photo._preZoomY = gsap.getProperty(photo, 'y');
  photo._preZoomRot = gsap.getProperty(photo, 'rotation');

  // Ajusta o contexto de z-index do contêiner geral
  document.getElementById('floating-photos-container').classList.add('top-context');
  
  photo.classList.add('zoomed');
  zoomOverlay.classList.add('active');
  activeZoomedPhoto = photo;

  // Anima para o centro e escala
  gsap.to(photo, {
    x: window.innerWidth / 2 - (isMobile ? 47.5 : 90),
    y: window.innerHeight / 2 - (isMobile ? 57.5 : 110),
    scale: targetScale,
    rotation: 0,
    duration: 0.65,
    ease: 'power3.out'
  });

  // Dispara a chuva mágica de corações e textos
  triggerFallingLoveEffects();
}

function zoomOutPhoto(photo) {
  if (!photo) return;
  
  gsap.to(photo, {
    x: photo._preZoomX || 0,
    y: photo._preZoomY || 0,
    scale: 1,
    rotation: photo._preZoomRot || 0,
    duration: 0.55,
    ease: 'power3.inOut',
    onComplete: () => {
      photo.classList.remove('zoomed');
      // Retoma a flutuação
      if (photo._floatTimeline) {
        photo._floatTimeline.resume();
      }
    }
  });

  zoomOverlay.classList.remove('active');
  document.getElementById('floating-photos-container').classList.remove('top-context');
  activeZoomedPhoto = null;
}

// Lógica de Geração da Chuva de Carinhos (Corações & Mensagens)
const loveEmojis = ['❤️', '💖', '💜', '🌸', '✨', '💕', '💌', '🌸'];
const loveTexts = [
  'Te amo, Mãe!', 'Parabéns pelo seu dia! 👑', 'Você é tudo para mim! 🌟',
  'Feliz Aniversário! 🎂', 'Amor infinito! 💞', 'Melhor mãe do mundo! 🥇',
  'Te amo mil milhões! 💜', 'Obrigado por ser tudo! 🙏'
];

function triggerFallingLoveEffects() {
  const count = window.innerWidth < 600 ? 18 : 32;
  
  for (let i = 0; i < count; i++) {
    const isText = Math.random() < 0.35; // 35% de chance de ser texto, 65% emoji
    const element = document.createElement('div');
    element.className = 'falling-love-element';
    
    if (isText) {
      element.classList.add('text-style');
      element.innerText = loveTexts[Math.floor(Math.random() * loveTexts.length)];
    } else {
      element.innerText = loveEmojis[Math.floor(Math.random() * loveEmojis.length)];
      element.style.fontSize = `${gsap.utils.random(18, 38)}px`;
    }
    
    document.body.appendChild(element);
    
    const startX = gsap.utils.random(0, window.innerWidth);
    const endX = startX + gsap.utils.random(-150, 150);
    const startY = -60 - gsap.utils.random(0, 100);
    const duration = gsap.utils.random(2.8, 4.8);
    
    gsap.set(element, {
      x: startX,
      y: startY,
      rotation: gsap.utils.random(-30, 30),
      opacity: gsap.utils.random(0.75, 1)
    });
    
    gsap.to(element, {
      y: window.innerHeight + 60,
      x: endX,
      rotation: `+=${gsap.utils.random(-180, 180)}`,
      opacity: 0,
      duration: duration,
      ease: 'power1.out',
      onComplete: () => {
        element.remove();
      }
    });
  }
}

// ----------------------------------------------------
// 7. Configuração de Listeners de Evento
// ----------------------------------------------------

// Escuta clique no selo de cera
waxSeal.addEventListener('click', openEnvelope);

// Clicar na carta aberta fecha a carta de volta
letterCard.addEventListener('click', (e) => {
  e.stopPropagation();
  closeEnvelope();
});

// Clicar no escurecido (zoomOverlay) desfaz o zoom da foto
zoomOverlay.addEventListener('click', (e) => {
  e.stopPropagation();
  if (activeZoomedPhoto) {
    zoomOutPhoto(activeZoomedPhoto);
  }
});

// Clicar fora do envelope aberto também fecha
document.body.addEventListener('click', (e) => {
  if (envelopeContainer.classList.contains('opened') && 
      !envelopeContainer.contains(e.target) &&
      !musicToggleBtn.contains(e.target) &&
      !photosContainer.contains(e.target) &&
      e.target !== zoomOverlay) {
    closeEnvelope();
  }
});

// Botão de toggle manual de música
musicToggleBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (isPlayingMusic) {
    stopMusic();
  } else {
    startMusic();
  }
});
