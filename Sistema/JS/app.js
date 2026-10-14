/**
 * APLICACIÓN PRINCIPAL - MIS TABLAS (4° BÁSICO)
 * Temática MARVEL & MINECRAFT • Sonidos Épicos • Serpentinas y Brillos
 */

// Estado global de la aplicación
const AppState = {
  perfil: null,
  activeView: 'menu',
  activeTable: 2,
  activeMultiplier: 3,
  isCommutativeInverted: false,
  
  // Estado de juegos
  activeGame: null,
  memoryGame: {
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    totalPairs: 6,
    moves: 0,
    locked: false
  },
  bubbleGame: {
    active: false,
    timer: null,
    timeLeft: 35,
    score: 0,
    vidas: 3,
    maxVidas: 3,
    currentQuestion: null
  },
  builderGame: {
    target: 24,
    rows: 3,
    cols: 4,
    puzzleIndex: 0
  },
  detectiveGame: {
    caseIndex: 0
  },
  speedGame: {
    active: false,
    timer: null,
    timeLeft: 60,
    score: 0,
    streak: 0,
    vidas: 3,
    maxVidas: 3,
    currentProblem: null,
    bossHp: 100,
    bossMaxHp: 100,
    bossStage: 'thanos'
  },

  // Estado del Ensayo SIMCE
  simce: {
    currentQuestionIndex: 0,
    respuestas: {},
    entregado: false
  }
};

// ============================================================================
// INICIALIZACIÓN
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  cargarPerfil();
  inicializarEventosNavegacion();
  inicializarHeader();
  inicializarAprenderTablas();
  inicializarJuegos();
  inicializarSimce();
  renderizarProgresoYLogros();
  inicializarEfectosParticulas();
  initMenuInteractiveBackground();
});

// Carga o verificación del estudiante
function cargarPerfil() {
  const data = localStorage.getItem('mis_tablas_perfil');
  if (!data) {
    AppState.perfil = {
      nombre: "Súper Estudiante",
      curso: "4° Básico A",
      avatarId: "spiderman",
      avatarNombre: "Spider-Multi",
      avatarImg: "IMAGEN/avatar_spiderman.svg",
      xp: 150,
      estrellas: 20,
      nivel: 1,
      tablasProgreso: { 2: 75, 3: 50, 4: 25, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 },
      logrosDesbloqueados: ["primer_paso"],
      simceRealizado: false,
      simcePuntaje: 0,
      simceAciertos: 0
    };
    guardarPerfil();
  } else {
    try {
      AppState.perfil = JSON.parse(data);
      if (!AppState.perfil.tablasProgreso) {
        AppState.perfil.tablasProgreso = { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 };
      }
      if (!AppState.perfil.logrosDesbloqueados) {
        AppState.perfil.logrosDesbloqueados = ["primer_paso"];
      }
      // Asegurar que el avatar activo pertenezca a la colección Marvel o Minecraft
      const avataresValidos = ['spiderman', 'ironman', 'capitan', 'thor', 'hulk', 'pantera', 'steve', 'creeper', 'gwen', 'capitanamarvel', 'alex'];
      if (!AppState.perfil.avatarId || !avataresValidos.includes(AppState.perfil.avatarId)) {
        AppState.perfil.avatarImg = "IMAGEN/avatar_spiderman.svg";
        AppState.perfil.avatarNombre = "Spider-Multi";
        AppState.perfil.avatarId = "spiderman";
      }
    } catch (e) {
      console.error("Error al cargar perfil:", e);
    }
  }
}

function guardarPerfil() {
  localStorage.setItem('mis_tablas_perfil', JSON.stringify(AppState.perfil));
  actualizarHUD();
}

function actualizarHUD() {
  const p = AppState.perfil;
  if (!p) return;

  const elNombre = document.getElementById('hudNombre');
  const elAvatar = document.getElementById('hudAvatarImg');
  const elNivel = document.getElementById('hudNivel');
  const elEstrellas = document.getElementById('hudEstrellas');
  const elXP = document.getElementById('hudXP');

  if (elNombre) elNombre.innerText = p.nombre;
  if (elAvatar) elAvatar.src = p.avatarImg || 'IMAGEN/avatar_spiderman.svg';
  if (elNivel) elNivel.innerText = `Nivel ${p.nivel || 1} • ${p.curso || '4° Básico'}`;
  if (elEstrellas) elEstrellas.innerText = p.estrellas || 0;
  if (elXP) elXP.innerText = `${p.xp || 0} XP`;

  // Hero banner stats
  const heroNombre = document.getElementById('heroNombreEstudiante');
  const heroTablasCount = document.getElementById('heroTablasDominadasCount');
  if (heroNombre) heroNombre.innerText = p.nombre;
  
  if (heroTablasCount) {
    let count = 0;
    for (const t in p.tablasProgreso) {
      if (p.tablasProgreso[t] >= 80) count++;
    }
    heroTablasCount.innerText = `${count} / 9`;
  }
}

function sumarRecompensa(xpGanados, estrellasGanadas, mensajeToast = "") {
  AppState.perfil.xp = (AppState.perfil.xp || 0) + xpGanados;
  AppState.perfil.estrellas = (AppState.perfil.estrellas || 0) + estrellasGanadas;

  // Comprobar si sube de nivel (cada 150 XP)
  const nuevoNivel = Math.floor(AppState.perfil.xp / 150) + 1;
  if (nuevoNivel > (AppState.perfil.nivel || 1)) {
    AppState.perfil.nivel = nuevoNivel;
    window.sound.playMinecraftLevelUp();
    lanzarSerpentinasYBrillos();
    mostrarModalCelebracion(
      "⛏️ ¡SUBISTE DE NIVEL HEROICO!",
      `<div style="text-align:center;">
        <div style="font-size:42px; margin-bottom:10px;">🌟 💎 🛡️</div>
        <p style="font-size:18px; font-weight:800; color:#1E1B4B; margin-bottom:12px;">
          ¡Felicitaciones, <strong>${AppState.perfil.nombre}</strong>! Ahora eres <strong>Nivel ${nuevoNivel}</strong>.
        </p>
        <div style="background:#F0FDF4; border:2px solid #86EFAC; border-radius:12px; padding:10px; font-weight:800; color:#15803D;">
          +10 Diamantes de experiencia desbloqueados
        </div>
      </div>`,
      true
    );
  }

  guardarPerfil();
  if (mensajeToast) {
    window.sound.playMinecraftXp();
  }
}

function desbloquearLogro(logroId) {
  if (!AppState.perfil.logrosDesbloqueados.includes(logroId)) {
    AppState.perfil.logrosDesbloqueados.push(logroId);
    guardarPerfil();
    renderizarProgresoYLogros();
    
    const logro = LISTA_LOGROS.find(l => l.id === logroId);
    if (logro) {
      window.sound.playMarvelFanfare();
      lanzarSerpentinasYBrillos();
      mostrarModalCelebracion(
        `🏆 ¡LOGRO DESBLOQUEADO: ${logro.titulo}!`,
        `<div style="text-align:center;">
          <div style="font-size:52px; margin-bottom:8px;">${logro.icono}</div>
          <h4 style="font-size:20px; font-weight:800; color:#B45309; margin-bottom:6px;">${logro.titulo}</h4>
          <p style="font-size:15px; color:#4B5563; font-weight:700;">${logro.descripcion}</p>
        </div>`,
        true
      );
    }
  }
}

// ============================================================================
// NAVEGACIÓN Y HEADER
// ============================================================================
function inicializarHeader() {
  actualizarHUD();

  // Botón de sonido
  const btnSound = document.getElementById('btnToggleSound');
  const soundIcon = document.getElementById('soundIcon');
  if (btnSound && soundIcon) {
    soundIcon.innerText = window.sound.isMuted() ? '🔇' : '🔊';
    btnSound.addEventListener('click', () => {
      const isMuted = window.sound.toggleMute();
      soundIcon.innerText = isMuted ? '🔇' : '🔊';
      if (!isMuted) window.sound.playMinecraftXp();
    });
  }

  // Botón cambiar usuario / salir
  const btnExit = document.getElementById('btnExitUser');
  if (btnExit) {
    btnExit.addEventListener('click', () => {
      if (confirm("¿Deseas volver a la pantalla de héroes para cambiar de estudiante o avatar?")) {
        window.sound.playMarvelLaser();
        window.location.href = '../index.html';
      }
    });
  }

  // Click en el logo vuelve al menú principal
  const brandSection = document.getElementById('brandSection');
  if (brandSection) {
    brandSection.addEventListener('click', () => {
      window.sound.playMarvelShield();
      cambiarVista('menu');
    });
  }
}

function inicializarEventosNavegacion() {
  const tabs = document.querySelectorAll('.nav-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      window.sound.playMinecraftPop();
      const targetView = tab.dataset.view;
      cambiarVista(targetView);
    });
  });

  // Tarjetas del Menú Principal
  document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('click', () => {
      window.sound.playMarvelLaser();
      const targetView = card.dataset.target;
      cambiarVista(targetView);
    });
  });

  // Botón directo a SIMCE desde el hero
  const btnHeroSimce = document.getElementById('btnHeroSimce');
  if (btnHeroSimce) {
    btnHeroSimce.addEventListener('click', () => {
      window.sound.playMarvelFanfare();
      cambiarVista('simce');
    });
  }
}

function cambiarVista(viewName) {
  AppState.activeView = viewName;

  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
  });

  document.querySelectorAll('.app-view').forEach(view => {
    view.classList.remove('active');
  });

  const activeEl = document.getElementById(`view-${viewName}`);
  if (activeEl) {
    activeEl.classList.add('active');
  }

  if (viewName === 'progreso') {
    renderizarProgresoYLogros();
  } else if (viewName === 'aprender') {
    actualizarVistaTabla();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================================
// MÓDULO 1: APRENDER TABLAS (CONCRETO-PICTÓRICO-SIMBÓLICO)
// ============================================================================
function inicializarAprenderTablas() {
  const strip = document.getElementById('tableSelectorStrip');
  if (!strip) return;

  strip.innerHTML = '';
  for (let num = 2; num <= 10; num++) {
    const btn = document.createElement('button');
    btn.className = `btn-select-table ${num === AppState.activeTable ? 'active' : ''}`;
    btn.innerText = `Tabla del ${num}`;
    btn.addEventListener('click', () => {
      window.sound.playMinecraftPop();
      AppState.activeTable = num;
      AppState.activeMultiplier = 3;
      AppState.isCommutativeInverted = false;
      document.querySelectorAll('.btn-select-table').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      actualizarVistaTabla();
    });
    strip.appendChild(btn);
  }

  // Steppers para aumentar o disminuir el multiplicador
  const btnPrev = document.getElementById('btnStepDown');
  const btnNext = document.getElementById('btnStepUp');
  if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
      if (AppState.activeMultiplier > 1) {
        window.sound.playMinecraftPop();
        AppState.activeMultiplier--;
        actualizarVistaTabla();
      }
    });

    btnNext.addEventListener('click', () => {
      if (AppState.activeMultiplier < 10) {
        window.sound.playMinecraftXp();
        AppState.activeMultiplier++;
        actualizarVistaTabla();
      }
    });
  }

  // Botón conmutativo
  const btnConmutativa = document.getElementById('btnToggleCommutative');
  if (btnConmutativa) {
    btnConmutativa.addEventListener('click', () => {
      window.sound.playMarvelShield();
      AppState.isCommutativeInverted = !AppState.isCommutativeInverted;
      actualizarVistaTabla();
    });
  }

  // Botón pista heroica
  const btnPistaHeroica = document.getElementById('btnPistaHeroica');
  if (btnPistaHeroica) {
    btnPistaHeroica.addEventListener('click', () => {
      window.sound.playSparkle();
      const tInfo = TABLAS_INFO[AppState.activeTable];
      const pistaAzar = tInfo.pistas[Math.floor(Math.random() * tInfo.pistas.length)];
      mostrarModalCelebracion(
        `🛡️ Pista Heroica (Tabla del ${AppState.activeTable})`,
        `<div style="font-size:16px; line-height:1.6; color:#1E3A8A; font-weight:700;">
          <p style="margin-bottom:12px;">⚡ <strong>${pistaAzar}</strong></p>
          <div style="background:#EFF6FF; border-left:4px solid #3B82F6; padding:12px; border-radius:8px;">
            ${tInfo.truco}
          </div>
        </div>`,
        true
      );
    });
  }

  // Botón Desafío Rápido corregido y mejorado
  const btnQuizTabla = document.getElementById('btnLaunchTableQuiz');
  if (btnQuizTabla) {
    btnQuizTabla.addEventListener('click', () => {
      window.sound.playMarvelLaser();
      lanzarQuizRapidoTabla(AppState.activeTable);
    });
  }

  actualizarVistaTabla();
}

function actualizarVistaTabla() {
  const t = AppState.activeTable;
  const k = AppState.activeMultiplier;
  const tInfo = TABLAS_INFO[t];
  if (!tInfo) return;

  const factorA = AppState.isCommutativeInverted ? k : t;
  const factorB = AppState.isCommutativeInverted ? t : k;
  const resultado = factorA * factorB;

  const expEl = document.getElementById('mathExpressionDisplay');
  if (expEl) {
    expEl.innerHTML = `${factorA} × ${factorB} = <span style="color:#059669">${resultado}</span>`;
  }

  const nombreTablaEl = document.getElementById('tablaTituloActivo');
  const patronTablaEl = document.getElementById('tablaPatronActivo');
  const trucoTablaEl = document.getElementById('tablaTrucoActivo');

  if (nombreTablaEl) nombreTablaEl.innerText = `${tInfo.nombre} • ${tInfo.subtitulo}`;
  if (patronTablaEl) patronTablaEl.innerText = tInfo.patron;
  if (trucoTablaEl) trucoTablaEl.innerText = tInfo.truco;

  // Render pictórico de canastas
  const stage = document.getElementById('groupsStageBox');
  if (stage) {
    stage.innerHTML = '';
    const numGrupos = factorA;
    const itemsPorGrupo = factorB;

    for (let g = 1; g <= numGrupos; g++) {
      const basket = document.createElement('div');
      basket.className = 'visual-group-basket';

      const tag = document.createElement('span');
      tag.className = 'basket-tag';
      tag.innerText = `Bloque ${g}`;
      basket.appendChild(tag);

      for (let i = 1; i <= itemsPorGrupo; i++) {
        const item = document.createElement('span');
        item.className = 'basket-item-emoji';
        item.innerText = tInfo.emojiObjeto || '⭐';
        basket.appendChild(item);
      }

      stage.appendChild(basket);
    }
  }

  // Suma iterada
  const sumEl = document.getElementById('iteratedSumDisplay');
  if (sumEl) {
    const sumandos = Array(factorA).fill(factorB).join(' + ');
    sumEl.innerHTML = `<strong>Suma iterada:</strong> ${sumandos} = <strong>${resultado}</strong> ${tInfo.unidad}`;
  }

  // Lista rápida 1..10
  const gridEl = document.getElementById('tableQuickGrid');
  if (gridEl) {
    gridEl.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
      const row = document.createElement('div');
      row.className = `table-row-item ${i === k ? 'highlighted' : ''}`;
      row.innerHTML = `
        <span>${t} × ${i}</span>
        <span class="res">${t * i}</span>
      `;
      row.addEventListener('click', () => {
        window.sound.playMinecraftPop();
        AppState.activeMultiplier = i;
        actualizarVistaTabla();
      });
      gridEl.appendChild(row);
    }
  }
}

// CORRECCIÓN TOTAL DEL DESAFÍO RÁPIDO:
// Ahora renderiza un modal HTML interactivo, colorido y con sonidos de Marvel y Minecraft
function lanzarQuizRapidoTabla(numTabla) {
  const mult = Math.floor(Math.random() * 9) + 2;
  const respuestaCorrecta = numTabla * mult;
  
  const opciones = new Set([respuestaCorrecta]);
  while (opciones.size < 3) {
    const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1) * numTabla;
    const fake = respuestaCorrecta + delta;
    if (fake > 0 && fake !== respuestaCorrecta) opciones.add(fake);
  }
  const arrayOpciones = Array.from(opciones).sort(() => Math.random() - 0.5);

  const opcionesHtml = arrayOpciones.map(opt => `
    <button 
      class="btn-suspect-number" 
      style="font-size:22px; padding:14px 24px; min-width:90px; border-radius:16px; border:3px solid #3B82F6; background:#FFFFFF; cursor:pointer; font-weight:800; box-shadow:0 6px 0 #1D4ED8; transition:all 0.15s ease;"
      onmouseover="this.style.transform='translateY(-3px)'"
      onmouseout="this.style.transform='translateY(0)'"
      onclick="verificarQuizRapido(${numTabla}, ${mult}, ${opt}, ${respuestaCorrecta})"
    >
      ${opt}
    </button>
  `).join('');

  mostrarModalCelebracion(
    `⚡ Desafío Heroico: Tabla del ${numTabla}`,
    `<div style="text-align:center; padding:10px 0;">
      <div style="font-size:16px; font-weight:800; color:#4B5563; margin-bottom:10px;">¡Demuestra tu poder de cálculo!</div>
      <div style="font-family:'Fredoka', cursive; font-size:42px; font-weight:900; margin-bottom:24px; color:#1E1B4B; background:#EFF6FF; border:3px dashed #60A5FA; border-radius:18px; padding:16px;">
        ${numTabla} × ${mult} = <span style="color:#DC2626;">?</span>
      </div>
      <div style="font-size:15px; font-weight:700; color:#374151; margin-bottom:14px;">Elige el resultado correcto:</div>
      <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
        ${opcionesHtml}
      </div>
    </div>`,
    true
  );
}

window.verificarQuizRapido = function(numTabla, mult, seleccion, correcta) {
  if (seleccion === correcta) {
    window.sound.playMarvelFanfare();
    window.sound.playMinecraftXp();
    lanzarSerpentinasYBrillos();
    sumarRecompensa(20, 3);
    
    const actual = AppState.perfil.tablasProgreso[numTabla] || 0;
    AppState.perfil.tablasProgreso[numTabla] = Math.min(100, actual + 25);
    guardarPerfil();
    desbloquearLogro("maestro_tablas");

    mostrarModalCelebracion(
      "⭐ ¡GOLPE CRÍTICO PERFECTO!",
      `<div style="text-align:center;">
        <div style="font-size:48px; margin-bottom:10px;">💥 🦸 💎</div>
        <p style="font-size:22px; font-weight:900; color:#059669; margin-bottom:8px;">
          ¡${numTabla} × ${mult} = ${correcta}!
        </p>
        <p style="font-size:16px; font-weight:700; color:#4B5563; margin-bottom:16px;">
          ¡Excelente cálculo, héroe! Tu maestría en la tabla del ${numTabla} ha aumentado.
        </p>
        <div style="display:inline-flex; gap:12px; background:#ECFDF5; border:2px solid #6EE7B7; border-radius:999px; padding:8px 20px; font-weight:900; color:#065F46;">
          <span>+20 XP</span> • <span>+3 ⭐ Estrellas</span>
        </div>
      </div>`,
      true
    );
  } else {
    window.sound.playError();
    mostrarModalCelebracion(
      "🛡️ ¡Casi lo logras!",
      `<div style="text-align:center;">
        <div style="font-size:40px; margin-bottom:8px;">🤔 ⚡</div>
        <p style="font-size:18px; font-weight:800; color:#B91C1C; margin-bottom:8px;">
          Elegiste ${seleccion}, pero ${numTabla} × ${mult} es igual a <strong>${correcta}</strong>.
        </p>
        <p style="font-size:14px; color:#4B5563; font-weight:700;">
          ¡No te desanimes! Recuerda que puedes pensar en ${mult} grupos de ${numTabla}. ¡Inténtalo de nuevo!
        </p>
      </div>`,
      true
    );
  }
};

// ============================================================================
// MÓDULO 2: JUEGOS Y DESAFÍOS (MINIJUEGOS DINÁMICOS)
// ============================================================================
function inicializarJuegos() {
  document.querySelectorAll('.game-select-card').forEach(card => {
    card.addEventListener('click', () => {
      window.sound.playMarvelLaser();
      const gameType = card.dataset.game;
      abrirJuego(gameType);
    });
  });

  const btnVolver = document.getElementById('btnBackToGamesList');
  if (btnVolver) {
    btnVolver.addEventListener('click', () => {
      window.sound.playMinecraftPop();
      cerrarJuegoActivo();
    });
  }
}

function abrirJuego(gameType) {
  AppState.activeGame = gameType;
  const listEl = document.getElementById('gamesSelectionList');
  const arenaEl = document.getElementById('gameActiveArena');

  if (listEl) listEl.style.display = 'none';
  if (arenaEl) arenaEl.style.display = 'block';

  document.querySelectorAll('.game-specific-container').forEach(c => c.style.display = 'none');

  if (gameType === 'memoria') {
    document.getElementById('arenaMemoria').style.display = 'block';
    iniciarJuegoMemoria();
  } else if (gameType === 'burbujas') {
    document.getElementById('arenaBurbujas').style.display = 'block';
    iniciarJuegoBurbujas();
  } else if (gameType === 'constructor') {
    document.getElementById('arenaConstructor').style.display = 'block';
    iniciarJuegoConstructor();
  } else if (gameType === 'detective') {
    document.getElementById('arenaDetective').style.display = 'block';
    iniciarJuegoDetective();
  } else if (gameType === 'reloj') {
    document.getElementById('arenaReloj').style.display = 'block';
    iniciarJuegoReloj();
  }
}

function cerrarJuegoActivo() {
  if (AppState.bubbleGame.timer) clearInterval(AppState.bubbleGame.timer);
  if (AppState.speedGame.timer) clearInterval(AppState.speedGame.timer);

  AppState.activeGame = null;
  const listEl = document.getElementById('gamesSelectionList');
  const arenaEl = document.getElementById('gameActiveArena');

  if (listEl) listEl.style.display = 'grid';
  if (arenaEl) arenaEl.style.display = 'none';
}

/* 1. MEMORIA MATEMÁTICA */
function iniciarJuegoMemoria() {
  const board = document.getElementById('memoryBoard');
  if (!board) return;
  board.innerHTML = '';

  AppState.memoryGame = {
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    totalPairs: 6,
    moves: 0,
    locked: false
  };

  const paresData = [];
  const operacionesUsadas = new Set();
  while (paresData.length < 6) {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    const opKey = `${a}×${b}`;
    if (!operacionesUsadas.has(opKey)) {
      operacionesUsadas.add(opKey);
      const res = a * b;
      paresData.push({ id: paresData.length, op: `${a} × ${b}`, res: `${res}` });
    }
  }

  const deck = [];
  paresData.forEach(par => {
    deck.push({ pairId: par.id, texto: par.op, tipo: 'operacion' });
    deck.push({ pairId: par.id, texto: par.res, tipo: 'resultado' });
  });

  deck.sort(() => Math.random() - 0.5);

  deck.forEach((item, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'memory-card';
    cardEl.dataset.index = index;
    cardEl.innerHTML = `
      <div class="memory-card-inner">
        <div class="memory-card-front">❓</div>
        <div class="memory-card-back">${item.texto}</div>
      </div>
    `;

    cardEl.addEventListener('click', () => {
      onMemoryCardClick(cardEl, item);
    });

    board.appendChild(cardEl);
  });

  document.getElementById('memoryMovesCount').innerText = '0';
}

function onMemoryCardClick(cardEl, item) {
  const mg = AppState.memoryGame;
  if (mg.locked || cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) {
    return;
  }

  window.sound.playMinecraftPop();
  cardEl.classList.add('flipped');
  mg.flippedCards.push({ el: cardEl, data: item });

  if (mg.flippedCards.length === 2) {
    mg.moves++;
    document.getElementById('memoryMovesCount').innerText = mg.moves;
    mg.locked = true;

    const [c1, c2] = mg.flippedCards;
    if (c1.data.pairId === c2.data.pairId) {
      setTimeout(() => {
        window.sound.playMinecraftXp();
        c1.el.classList.add('matched');
        c2.el.classList.add('matched');
        mg.matchedPairs++;
        mg.flippedCards = [];
        mg.locked = false;

        if (mg.matchedPairs === mg.totalPairs) {
          window.sound.playMarvelFanfare();
          lanzarSerpentinasYBrillos();
          sumarRecompensa(40, 5);
          desbloquearLogro("memoria_genio");
          mostrarModalCelebracion(
            "🧠 ¡MEMORIA DE SUPERHÉROE!",
            `¡Increíble agilidad mental! Emparejaste todas las cartas en ${mg.moves} movimientos. ¡Ganaste +40 XP y +5 Estrellas!`
          );
        }
      }, 350);
    } else {
      setTimeout(() => {
        window.sound.playError();
        c1.el.classList.remove('flipped');
        c2.el.classList.remove('flipped');
        mg.flippedCards = [];
        mg.locked = false;
      }, 850);
    }
  }
}

/* 2. ATRAPA EL RESULTADO (GEMAS DEL INFINITO & ORBES XP) */
const INFINITY_GEMS_DATA = [
  {
    name: "Gema del Poder",
    color: "#9333EA",
    svg: `<svg class="gem-facet-svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="powGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C084FC"/>
          <stop offset="50%" stop-color="#9333EA"/>
          <stop offset="100%" stop-color="#581C87"/>
        </linearGradient>
      </defs>
      <polygon points="50,6 88,24 94,62 50,94 6,62 12,24" fill="url(#powGrad)" stroke="#E9D5FF" stroke-width="2"/>
      <polygon points="50,6 88,24 72,36 50,22" fill="#D8B4FE" opacity="0.7"/>
      <polygon points="88,24 94,62 76,58 72,36" fill="#7E22CE" opacity="0.75"/>
      <polygon points="94,62 50,94 50,72 76,58" fill="#581C87" opacity="0.9"/>
      <polygon points="50,94 6,62 24,58 50,72" fill="#3B0764" opacity="0.9"/>
      <polygon points="6,62 12,24 28,36 24,58" fill="#7E22CE" opacity="0.75"/>
      <polygon points="12,24 50,6 50,22 28,36" fill="#E9D5FF" opacity="0.6"/>
      <polygon points="50,22 72,36 76,58 50,72 24,58 28,36" fill="#A855F7" stroke="#F3E8FF" stroke-width="1.5"/>
    </svg>`
  },
  {
    name: "Gema del Espacio",
    color: "#0284C7",
    svg: `<svg class="gem-facet-svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="spcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7DD3FC"/>
          <stop offset="50%" stop-color="#0284C7"/>
          <stop offset="100%" stop-color="#0C4A6E"/>
        </linearGradient>
      </defs>
      <polygon points="50,8 92,50 50,92 8,50" fill="url(#spcGrad)" stroke="#BAE6FD" stroke-width="2"/>
      <polygon points="50,8 92,50 68,50 50,30" fill="#BAE6FD" opacity="0.75"/>
      <polygon points="92,50 50,92 50,70 68,50" fill="#0369A1" opacity="0.8"/>
      <polygon points="50,92 8,50 32,50 50,70" fill="#0C4A6E" opacity="0.9"/>
      <polygon points="8,50 50,8 50,30 32,50" fill="#E0F2FE" opacity="0.7"/>
      <polygon points="50,30 68,50 50,70 32,50" fill="#38BDF8" stroke="#FFFFFF" stroke-width="1.5"/>
    </svg>`
  },
  {
    name: "Gema de la Realidad",
    color: "#DC2626",
    svg: `<svg class="gem-facet-svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="realGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FCA5A5"/>
          <stop offset="50%" stop-color="#DC2626"/>
          <stop offset="100%" stop-color="#7F1D1D"/>
        </linearGradient>
      </defs>
      <polygon points="26,10 74,10 94,36 50,94 6,36" fill="url(#realGrad)" stroke="#FECDD3" stroke-width="2"/>
      <polygon points="26,10 74,10 64,28 36,28" fill="#FCA5A5" opacity="0.75"/>
      <polygon points="74,10 94,36 68,44 64,28" fill="#EF4444" opacity="0.6"/>
      <polygon points="94,36 50,94 50,56 68,44" fill="#991B1B" opacity="0.85"/>
      <polygon points="50,94 6,36 32,44 50,56" fill="#7F1D1D" opacity="0.9"/>
      <polygon points="6,36 26,10 36,28 32,44" fill="#F87171" opacity="0.6"/>
      <polygon points="36,28 64,28 68,44 50,56 32,44" fill="#DC2626" stroke="#FFE4E6" stroke-width="1.5"/>
    </svg>`
  },
  {
    name: "Gema del Tiempo",
    color: "#059669",
    svg: `<svg class="gem-facet-svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="timeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6EE7B7"/>
          <stop offset="50%" stop-color="#059669"/>
          <stop offset="100%" stop-color="#064E3B"/>
        </linearGradient>
      </defs>
      <polygon points="30,8 70,8 92,30 92,70 70,92 30,92 8,70 8,30" fill="url(#timeGrad)" stroke="#A7F3D0" stroke-width="2"/>
      <polygon points="30,8 70,8 62,24 38,24" fill="#A7F3D0" opacity="0.7"/>
      <polygon points="70,8 92,30 76,38 62,24" fill="#34D399" opacity="0.6"/>
      <polygon points="92,30 92,70 76,62 76,38" fill="#047857" opacity="0.75"/>
      <polygon points="92,70 70,92 62,76 76,62" fill="#065F46" opacity="0.85"/>
      <polygon points="70,92 30,92 38,76 62,76" fill="#064E3B" opacity="0.9"/>
      <polygon points="30,92 8,70 24,62 38,76" fill="#065F46" opacity="0.85"/>
      <polygon points="8,70 8,30 24,38 24,62" fill="#047857" opacity="0.75"/>
      <polygon points="8,30 30,8 38,24 24,38" fill="#6EE7B7" opacity="0.6"/>
      <polygon points="38,24 62,24 76,38 76,62 62,76 38,76 24,62 24,38" fill="#10B981" stroke="#D1FAE5" stroke-width="1.5"/>
    </svg>`
  },
  {
    name: "Gema de la Mente",
    color: "#D97706",
    svg: `<svg class="gem-facet-svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="mindGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FDE047"/>
          <stop offset="50%" stop-color="#EAB308"/>
          <stop offset="100%" stop-color="#854D0E"/>
        </linearGradient>
      </defs>
      <polygon points="50,6 94,34 76,94 24,94 6,34" fill="url(#mindGrad)" stroke="#FEF08A" stroke-width="2"/>
      <polygon points="50,6 94,34 72,40 50,24" fill="#FEF08A" opacity="0.7"/>
      <polygon points="94,34 76,94 62,74 72,40" fill="#CA8A04" opacity="0.8"/>
      <polygon points="76,94 24,94 38,74 62,74" fill="#713F12" opacity="0.9"/>
      <polygon points="24,94 6,34 28,40 38,74" fill="#A16207" opacity="0.85"/>
      <polygon points="6,34 50,6 50,24 28,40" fill="#FACC15" opacity="0.65"/>
      <polygon points="50,24 72,40 62,74 38,74 28,40" fill="#FBBF24" stroke="#FFFFFF" stroke-width="1.5"/>
    </svg>`
  },
  {
    name: "Diamante Minecraft",
    color: "#0891B2",
    svg: `<svg class="gem-facet-svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="mcDiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#A5F3FC"/>
          <stop offset="40%" stop-color="#22D3EE"/>
          <stop offset="100%" stop-color="#0E7490"/>
        </linearGradient>
      </defs>
      <polygon points="28,14 72,14 90,38 50,92 10,38" fill="url(#mcDiaGrad)" stroke="#CFFAFE" stroke-width="2.5"/>
      <polygon points="28,14 72,14 62,32 38,32" fill="#E0F2FE" opacity="0.85"/>
      <polygon points="72,14 90,38 68,44 62,32" fill="#38BDF8" opacity="0.65"/>
      <polygon points="90,38 50,92 50,56 68,44" fill="#0369A1" opacity="0.9"/>
      <polygon points="50,92 10,38 32,44 50,56" fill="#0C4A6E" opacity="0.9"/>
      <polygon points="10,38 28,14 38,32 32,44" fill="#67E8F9" opacity="0.75"/>
      <polygon points="38,32 62,32 68,44 50,56 32,44" fill="#06B6D4" stroke="#FFFFFF" stroke-width="1.5"/>
    </svg>`
  }
];

function iniciarJuegoBurbujas() {
  const bg = AppState.bubbleGame;
  bg.score = 0;
  bg.timeLeft = 35;
  bg.vidas = 3;
  bg.maxVidas = 3;

  const elScore = document.getElementById('bubbleScore');
  const elTimer = document.getElementById('bubbleTimer');
  const elLives = document.getElementById('bubbleLives');
  const elPenalty = document.getElementById('bubblePenalty');

  if (elScore) elScore.innerText = bg.score;
  if (elTimer) elTimer.innerText = `${bg.timeLeft}s`;
  if (elLives) elLives.innerText = '❤️❤️❤️';
  if (elPenalty) elPenalty.style.display = 'none';

  if (bg.timer) clearInterval(bg.timer);
  bg.timer = setInterval(() => {
    bg.timeLeft--;
    if (elTimer) elTimer.innerText = `${bg.timeLeft}s`;
    if (bg.timeLeft <= 0) {
      clearInterval(bg.timer);
      finalizarJuegoBurbujas(false);
    }
  }, 1000);

  siguientePreguntaBurbujas();
}

function finalizarJuegoBurbujas(sinVidas = false) {
  const bg = AppState.bubbleGame;
  if (bg.timer) clearInterval(bg.timer);

  if (sinVidas) {
    window.sound.playError();
    sumarRecompensa(bg.score * 3, Math.floor(bg.score / 3));
    mostrarModalCelebracion(
      "💔 ¡TE QUEDASTE SIN VIDAS O TIEMPO!",
      `<div style="text-align:center;">
        <div style="font-size:44px; margin-bottom:10px;">⚡💥💔</div>
        <p style="font-size:20px; font-weight:800; color:#EF4444; margin-bottom:8px;">
          ¡Cuidado, héroe! Las gemas inestables drenaron tu energía.
        </p>
        <p style="font-size:16px; font-weight:700; color:#4B5563; margin-bottom:14px;">
          Cada fallo resta 1 vida y acelera el tiempo (-4s). Lograste recolectar <strong>${bg.score}</strong> gemas cósmicas. ¡Vuelve a intentarlo!
        </p>
        <div style="display:inline-flex; gap:12px; background:#FEF2F2; border:2px solid #FCA5A5; border-radius:999px; padding:8px 20px; font-weight:900; color:#991B1B;">
          <span>+${bg.score * 3} XP</span>
        </div>
      </div>`,
      true
    );
  } else {
    window.sound.playMarvelFanfare();
    lanzarSerpentinasYBrillos();
    sumarRecompensa(bg.score * 5, Math.floor(bg.score / 2));
    if (bg.score >= 5) desbloquearLogro("atrapa_burbujas");
    mostrarModalCelebracion(
      "💎 ¡RECOLECCIÓN CÓSMICA FINALIZADA!",
      `<div style="text-align:center;">
        <div style="font-size:44px; margin-bottom:10px;">💎✨🪐</div>
        <p style="font-size:20px; font-weight:800; color:#059669; margin-bottom:8px;">
          ¡Puntaje total: ${bg.score} gemas cósmicas aseguradas!
        </p>
        <p style="font-size:15px; font-weight:700; color:#4B5563; margin-bottom:14px;">
          ¡Tu agilidad con las multiplicaciones ha protegido el universo!
        </p>
        <div style="display:inline-flex; gap:12px; background:#ECFDF5; border:2px solid #6EE7B7; border-radius:999px; padding:8px 20px; font-weight:900; color:#065F46;">
          <span>+${bg.score * 5} XP</span> • <span>+${Math.floor(bg.score / 2)} ⭐</span>
        </div>
      </div>`,
      true
    );
  }
}

function siguientePreguntaBurbujas() {
  const a = Math.floor(Math.random() * 8) + 2;
  const b = Math.floor(Math.random() * 8) + 2;
  const correcta = a * b;

  document.getElementById('bubbleTargetText').innerText = `${a} × ${b} = ?`;

  const opciones = new Set([correcta]);
  while (opciones.size < 4) {
    const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 4) + 1);
    const fake = correcta + delta;
    if (fake > 0 && fake !== correcta) opciones.add(fake);
  }

  const container = document.getElementById('bubblesContainer');
  container.innerHTML = '';

  const shuffledGems = [...INFINITY_GEMS_DATA].sort(() => Math.random() - 0.5);

  Array.from(opciones).sort(() => Math.random() - 0.5).forEach((num, idx) => {
    const gemData = shuffledGems[idx % shuffledGems.length];
    const gemBtn = document.createElement('button');
    gemBtn.className = 'infinity-gem-btn';
    gemBtn.title = gemData.name;
    gemBtn.innerHTML = `
      ${gemData.svg}
      <span class="gem-number-label">${num}</span>
      <span class="gem-title-pill">${gemData.name}</span>
    `;

    gemBtn.addEventListener('click', () => {
      const bg = AppState.bubbleGame;
      if (num === correcta) {
        window.sound.playMinecraftPop();
        window.sound.playMinecraftXp();
        bg.score++;
        document.getElementById('bubbleScore').innerText = bg.score;
        gemBtn.style.transform = 'scale(1.4) rotate(15deg)';
        gemBtn.style.filter = 'brightness(2) drop-shadow(0 0 25px #FDE047)';
        setTimeout(siguientePreguntaBurbujas, 240);
      } else {
        // PENALIZACIÓN: Pierde 1 vida y 4 segundos del tiempo
        window.sound.playError();
        bg.vidas = Math.max(0, bg.vidas - 1);
        bg.timeLeft = Math.max(0, bg.timeLeft - 4);

        const elLives = document.getElementById('bubbleLives');
        if (elLives) elLives.innerText = '❤️'.repeat(bg.vidas) + '💔'.repeat(3 - bg.vidas);

        const elTimer = document.getElementById('bubbleTimer');
        if (elTimer) elTimer.innerText = `${bg.timeLeft}s`;

        const elPenalty = document.getElementById('bubblePenalty');
        if (elPenalty) {
          elPenalty.innerText = '-4s! 💥💔';
          elPenalty.style.display = 'inline';
          setTimeout(() => { if (elPenalty) elPenalty.style.display = 'none'; }, 900);
        }

        gemBtn.style.transform = 'translateX(-10px)';
        gemBtn.style.filter = 'drop-shadow(0 0 15px #EF4444) brightness(0.7)';
        setTimeout(() => gemBtn.style.transform = 'translateX(10px)', 80);
        setTimeout(() => {
          gemBtn.style.transform = '';
          gemBtn.style.filter = '';
        }, 180);

        if (bg.vidas <= 0 || bg.timeLeft <= 0) {
          if (bg.timer) clearInterval(bg.timer);
          finalizarJuegoBurbujas(true);
        }
      }
    });

    container.appendChild(gemBtn);
  });
}

/* 3. MESA DE CRAFTEO STEVE & STARK (BLOQUES AUTÉNTICOS MINECRAFT) */
const MISIONES_CONSTRUCTOR = [
  { meta: 18, texto: "Steve necesita apilar 18 bloques de pasto y tierra en filas y columnas iguales.", bloque: "IMAGEN/bloque_minecraft.svg" },
  { meta: 24, texto: "Iron Man debe ordenar 24 bloques de diamante en una matriz de reactor.", bloque: "IMAGEN/bloque_diamante.svg" },
  { meta: 20, texto: "Capitán América necesita forjar 20 bloques de entrenamiento en filas parejas.", bloque: "IMAGEN/bloque_minecraft.svg" },
  { meta: 36, texto: "La armería de Wakanda necesita 36 bloques de diamante para armaduras.", bloque: "IMAGEN/bloque_diamante.svg" }
];

function iniciarJuegoConstructor() {
  const bg = AppState.builderGame;
  bg.puzzleIndex = 0;
  cargarMisionConstructor();

  document.getElementById('btnRowsDown').onclick = () => cambiarDimensionesConstructor(-1, 0);
  document.getElementById('btnRowsUp').onclick = () => cambiarDimensionesConstructor(1, 0);
  document.getElementById('btnColsDown').onclick = () => cambiarDimensionesConstructor(0, -1);
  document.getElementById('btnColsUp').onclick = () => cambiarDimensionesConstructor(0, 1);
  document.getElementById('btnVerificarConstructor').onclick = verificarConstructor;
}

function cargarMisionConstructor() {
  const bg = AppState.builderGame;
  const mision = MISIONES_CONSTRUCTOR[bg.puzzleIndex % MISIONES_CONSTRUCTOR.length];
  bg.target = mision.meta;
  bg.rows = 2;
  bg.cols = 4;

  document.getElementById('builderMissionText').innerText = mision.texto;
  document.getElementById('builderTargetVal').innerText = bg.target;
  actualizarGridConstructor();
}

function cambiarDimensionesConstructor(dRows, dCols) {
  const bg = AppState.builderGame;
  bg.rows = Math.max(1, Math.min(10, bg.rows + dRows));
  bg.cols = Math.max(1, Math.min(10, bg.cols + dCols));
  window.sound.playMinecraftPop();
  actualizarGridConstructor();
}

function actualizarGridConstructor() {
  const bg = AppState.builderGame;
  document.getElementById('builderRowsVal').innerText = bg.rows;
  document.getElementById('builderColsVal').innerText = bg.cols;
  const actualProd = bg.rows * bg.cols;
  document.getElementById('builderCurrentCalc').innerText = `${bg.rows} × ${bg.cols} = ${actualProd}`;

  const grid = document.getElementById('builderGridDisplay');
  grid.innerHTML = '';

  const mision = MISIONES_CONSTRUCTOR[bg.puzzleIndex % MISIONES_CONSTRUCTOR.length];
  const blockImgSrc = mision.bloque || 'IMAGEN/bloque_minecraft.svg';

  for (let r = 0; r < bg.rows; r++) {
    const rowEl = document.createElement('div');
    rowEl.className = 'builder-row';
    for (let c = 0; c < bg.cols; c++) {
      const itemEl = document.createElement('div');
      itemEl.className = 'mc-block-grid-item';
      itemEl.title = `Bloque (${r + 1}, ${c + 1})`;
      itemEl.innerHTML = `<img src="${blockImgSrc}" alt="Bloque Minecraft 3D" class="mc-block-grid-img">`;
      rowEl.appendChild(itemEl);
    }
    grid.appendChild(rowEl);
  }
}

function verificarConstructor() {
  const bg = AppState.builderGame;
  if (bg.rows * bg.cols === bg.target) {
    window.sound.playMarvelFanfare();
    lanzarSerpentinasYBrillos();
    sumarRecompensa(30, 3);
    desbloquearLogro("gran_arquitecto");
    mostrarModalCelebracion(
      "⛏️ ¡CRAFTEO MATEMÁTICO PERFECTO!",
      `¡Brillante! Lograste exactamente ${bg.rows} filas × ${bg.cols} columnas = ${bg.target} bloques de Minecraft en la mesa.`
    );
    bg.puzzleIndex++;
    setTimeout(cargarMisionConstructor, 1200);
  } else {
    window.sound.playError();
    mostrarModalCelebracion(
      "🤔 ¡Ajusta tu cuadrícula de bloques!",
      `Actualmente tienes ${bg.rows} × ${bg.cols} = ${bg.rows * bg.cols} bloques. La meta de crafteo es exactamente ${bg.target}.`
    );
  }
}

/* 4. DETECTIVE MATEMÁTICO */
function iniciarJuegoDetective() {
  AppState.detectiveGame.caseIndex = 0;
  cargarCasoDetective();
}

function cargarCasoDetective() {
  const caso = CASOS_DETECTIVE[AppState.detectiveGame.caseIndex % CASOS_DETECTIVE.length];
  const listEl = document.getElementById('detectiveCluesList');
  listEl.innerHTML = '';

  caso.pistas.forEach((pista, idx) => {
    const item = document.createElement('div');
    item.className = 'clue-item-card';
    item.innerHTML = `<span>🔍 Pista ${idx + 1}:</span> <span>${pista}</span>`;
    listEl.appendChild(item);
  });

  const optsEl = document.getElementById('detectiveSuspectsGrid');
  optsEl.innerHTML = '';

  caso.opciones.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'btn-suspect-number';
    btn.innerText = opt;
    btn.addEventListener('click', () => {
      if (opt === caso.respuestaCorrecta) {
        window.sound.playCapShieldRing();
        window.sound.playMinecraftXp();
        lanzarSerpentinasYBrillos();
        sumarRecompensa(35, 4);
        desbloquearLogro("super_detective");
        mostrarModalCelebracion(
          "🕵️ ¡CASO RESUELTO!",
          `${caso.explicacion}\n\n¡Ganaste +35 XP y +4 Estrellas!`
        );
        AppState.detectiveGame.caseIndex++;
        setTimeout(cargarCasoDetective, 1400);
      } else {
        window.sound.playError();
        mostrarModalCelebracion(
          "🔎 Ese sospechoso no cumple las pistas",
          `Revisa con cuidado las condiciones matemáticas e inténtalo otra vez.`
        );
      }
    });
    optsEl.appendChild(btn);
  });
}

/* 5. BATALLA CONTRA THANOS & ENDER DRAGON (DUELO ÉPICO FUNCIONAL) */
function iniciarJuegoReloj() {
  const sg = AppState.speedGame;
  sg.score = 0;
  sg.streak = 0;
  sg.timeLeft = 60;
  sg.vidas = 3;
  sg.maxVidas = 3;
  sg.bossHp = 100;
  sg.bossMaxHp = 100;
  sg.bossStage = 'thanos';

  const elScore = document.getElementById('speedScore');
  if (elScore) elScore.innerText = sg.score;

  const elStreak = document.getElementById('speedStreak');
  if (elStreak) elStreak.innerText = 'x1 🔥';

  const elTimer = document.getElementById('speedTimer');
  if (elTimer) elTimer.innerText = `${sg.timeLeft}s`;

  const elLives = document.getElementById('speedHeroLives');
  if (elLives) elLives.innerText = '❤️❤️❤️';

  const elPenalty = document.getElementById('speedPenalty');
  if (elPenalty) elPenalty.style.display = 'none';

  actualizarHPArenaJefe();

  const bossAvatar = document.getElementById('bossAvatarImg');
  if (bossAvatar) bossAvatar.src = 'IMAGEN/guantelete.svg';

  const bossIcon = document.getElementById('bossIconEmoji');
  if (bossIcon) bossIcon.innerText = '🦾';

  const bossTitle = document.getElementById('bossTitle');
  if (bossTitle) bossTitle.innerText = 'JEFE FASE 1: THANOS (GUANTELETE)';

  const bossQuote = document.getElementById('bossQuoteCloud');
  if (bossQuote) bossQuote.innerText = '¡Tengo las Gemas del Infinito! ¡Intenta resolver mis cálculos!';

  if (sg.timer) clearInterval(sg.timer);
  sg.timer = setInterval(() => {
    sg.timeLeft--;
    if (elTimer) elTimer.innerText = `${sg.timeLeft}s`;

    if (sg.timeLeft <= 0) {
      clearInterval(sg.timer);
      finalizarBatallaJefe(false, false);
    }
  }, 1000);

  siguienteProblemaReloj();
}

function actualizarHPArenaJefe() {
  const sg = AppState.speedGame;
  const hpFill = document.getElementById('bossHpFill');
  const hpLabel = document.getElementById('bossHpLabel');
  if (hpFill) hpFill.style.width = `${Math.max(0, sg.bossHp)}%`;
  if (hpLabel) hpLabel.innerText = `VIDA DEL JEFE: ${Math.max(0, sg.bossHp)} / ${sg.bossMaxHp} HP`;
}

function siguienteProblemaReloj() {
  const a = Math.floor(Math.random() * 8) + 2;
  const b = Math.floor(Math.random() * 9) + 2;
  const res = a * b;
  AppState.speedGame.currentProblem = { a, b, res };

  document.getElementById('speedOperationText').innerText = `${a} × ${b} = ?`;

  const opts = new Set([res]);
  while (opts.size < 4) {
    const fake = res + (Math.floor(Math.random() * 7) - 3) * (a > 4 ? 2 : 3);
    if (fake > 0 && fake !== res) opts.add(fake);
  }

  const container = document.getElementById('speedOptionsGrid');
  container.innerHTML = '';

  Array.from(opts).sort(() => Math.random() - 0.5).forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'battle-answer-btn';
    btn.innerText = val;
    btn.onclick = () => procesarGolpeBatalla(val, res);
    container.appendChild(btn);
  });
}

function procesarGolpeBatalla(val, res) {
  const sg = AppState.speedGame;

  if (val === res) {
    // ACIERTO: Ataque del héroe al jefe
    sg.score++;
    sg.streak++;
    
    // Daño base 20, con racha aumenta a 25 o 30
    const damage = sg.streak >= 4 ? 30 : (sg.streak >= 2 ? 25 : 20);
    sg.bossHp = Math.max(0, sg.bossHp - damage);

    // Actualizar HUD
    const elScore = document.getElementById('speedScore');
    if (elScore) elScore.innerText = sg.score;

    const elStreak = document.getElementById('speedStreak');
    const multiplier = sg.streak >= 5 ? 'x3 🔥🔥🔥' : (sg.streak >= 3 ? 'x2 ⚡⚡' : 'x1 🔥');
    if (elStreak) elStreak.innerText = multiplier;

    actualizarHPArenaJefe();

    // Efecto visual de golpe y sacudida del jefe
    animarImpactoJefe(damage);

    // Sonido según racha
    if (sg.streak >= 3) {
      window.sound.playThunderClap();
    } else {
      window.sound.playSwordHit();
    }
    setTimeout(() => window.sound.playMinecraftXp(), 80);

    // Verificar si el jefe fue derrotado
    if (sg.bossHp <= 0) {
      if (sg.bossStage === 'thanos') {
        // Fase 2: Aparece el Ender Dragon!
        sg.bossStage = 'dragon';
        sg.bossHp = 100;
        sg.timeLeft = Math.min(60, sg.timeLeft + 25); // Tiempo bonus
        const bossAvatar = document.getElementById('bossAvatarImg');
        if (bossAvatar) bossAvatar.src = 'IMAGEN/espada_diamante.svg';
        const bossTitle = document.getElementById('bossTitle');
        if (bossTitle) bossTitle.innerText = '¡FASE 2: ENDER DRAGON DE MINECRAFT! 🐉';
        const bossIcon = document.getElementById('bossIconEmoji');
        if (bossIcon) bossIcon.innerText = '🐉';
        const bossQuote = document.getElementById('bossQuoteCloud');
        if (bossQuote) bossQuote.innerText = '¡GRROOOAAR! ¡El Ender Dragon desciende del Fin!';
        window.sound.playCreeperExplode();
        actualizarHPArenaJefe();
        setTimeout(siguienteProblemaReloj, 700);
      } else {
        // Derrota final de ambos jefes!
        clearInterval(sg.timer);
        finalizarBatallaJefe(true);
      }
    } else {
      setTimeout(siguienteProblemaReloj, 400);
    }
  } else {
    // ERROR: Contraataque del jefe, pérdida de vida y penalización de tiempo (-5s)
    window.sound.playError();
    sg.streak = 0;
    sg.vidas = Math.max(0, sg.vidas - 1);
    sg.timeLeft = Math.max(0, sg.timeLeft - 5);

    const elStreak = document.getElementById('speedStreak');
    if (elStreak) elStreak.innerText = 'x1';

    const elTimer = document.getElementById('speedTimer');
    if (elTimer) elTimer.innerText = `${sg.timeLeft}s`;

    const elLives = document.getElementById('speedHeroLives');
    if (elLives) elLives.innerText = '❤️'.repeat(sg.vidas) + '💔'.repeat(3 - sg.vidas);

    const elPenalty = document.getElementById('speedPenalty');
    if (elPenalty) {
      elPenalty.innerText = '-5s! 💥💔';
      elPenalty.style.display = 'inline';
      setTimeout(() => { if (elPenalty) elPenalty.style.display = 'none'; }, 900);
    }

    // Animación de bloqueo / contraataque
    const bossQuote = document.getElementById('bossQuoteCloud');
    const frasesFallo = [
      "¡Thanos contraataca con el Guantelete! ¡Pierdes 1 vida y 5 segundos!",
      "¡El Ender Dragon lanza fuego de dragón! ¡Pierdes vida y tiempo!",
      "¡Cálculo incorrecto! ¡El jefe absorbe tu energía!",
      "¡El jefe esquivó tu ataque y contraatacó con furia!"
    ];
    if (bossQuote) bossQuote.innerText = frasesFallo[Math.floor(Math.random() * frasesFallo.length)];

    const bossStageEl = document.getElementById('bossBattleStage');
    if (bossStageEl) {
      bossStageEl.style.boxShadow = '0 0 35px rgba(239, 68, 68, 0.9)';
      setTimeout(() => {
        bossStageEl.style.boxShadow = '';
      }, 400);
    }

    if (sg.vidas <= 0 || sg.timeLeft <= 0) {
      if (sg.timer) clearInterval(sg.timer);
      finalizarBatallaJefe(false, true);
    }
  }
}

function animarImpactoJefe(damage) {
  const wrapper = document.getElementById('bossAvatarWrapper');
  if (wrapper) {
    wrapper.classList.remove('boss-hit-active');
    void wrapper.offsetWidth;
    wrapper.classList.add('boss-hit-active');
  }

  const attackFx = document.getElementById('heroAttackFx');
  if (attackFx) {
    const fxList = ['⚡', '💥', '⚔️', '✨', '💎'];
    attackFx.innerText = fxList[Math.floor(Math.random() * fxList.length)];
    attackFx.classList.remove('hero-attack-active');
    void attackFx.offsetWidth;
    attackFx.classList.add('hero-attack-active');
  }

  const popup = document.getElementById('bossDamagePopup');
  if (popup) {
    popup.innerText = `-${damage} HP! 💥`;
    popup.classList.remove('damage-number-active');
    void popup.offsetWidth;
    popup.classList.add('damage-number-active');
  }

  const bossQuote = document.getElementById('bossQuoteCloud');
  const frasesDolor = [
    "¡Aaargh! ¡Ese cálculo me dolió!",
    "¡Siento el impacto del rayo matemático!",
    "¡Tu multiplicación fue demasiado certera!"
  ];
  if (bossQuote) bossQuote.innerText = frasesDolor[Math.floor(Math.random() * frasesDolor.length)];
}

function finalizarBatallaJefe(victoria, sinVidas = false) {
  const sg = AppState.speedGame;
  if (sg.timer) clearInterval(sg.timer);

  if (victoria) {
    window.sound.playMarvelFanfare();
    window.sound.playMinecraftLevelUp();
    lanzarSerpentinasYBrillos();
    sumarRecompensa(120, 10);
    desbloquearLogro("reloj_veloz");
    mostrarModalCelebracion(
      "🏆 ¡VICTORIA ÉPICA! ¡THANOS & ENDER DRAGON DERROTADOS!",
      `<div style="text-align:center;">
        <div style="font-size:48px; margin-bottom:10px;">👑 ⚡ 🐉 💎</div>
        <p style="font-size:22px; font-weight:900; color:#059669; margin-bottom:8px;">
          ¡Has derrotado a ambos jefes legendarios!
        </p>
        <p style="font-size:16px; font-weight:700; color:#4B5563; margin-bottom:14px;">
          Has demostrado la velocidad de un verdadero Vengador y guerrero de Minecraft con ${sg.score} golpes matemáticos certeros.
        </p>
        <div style="display:inline-flex; gap:12px; background:#ECFDF5; border:2px solid #6EE7B7; border-radius:999px; padding:8px 20px; font-weight:900; color:#065F46;">
          <span>+120 XP</span> • <span>+10 💎 Diamantes</span>
        </div>
      </div>`,
      true
    );
  } else if (sinVidas) {
    window.sound.playError();
    sumarRecompensa(sg.score * 5, Math.floor(sg.score / 4));
    mostrarModalCelebracion(
      "💔 ¡TE HAS QUEDADO SIN VIDAS EN LA ARENA!",
      `<div style="text-align:center;">
        <div style="font-size:48px; margin-bottom:10px;">💀 💥 💔</div>
        <p style="font-size:20px; font-weight:900; color:#DC2626; margin-bottom:8px;">
          ¡El contraataque del jefe agotó tus corazones!
        </p>
        <p style="font-size:15px; font-weight:700; color:#4B5563; margin-bottom:14px;">
          Cada error resta vidas y reduce 5 segundos de tu tiempo. Lograste acertar ${sg.score} golpes antes de caer. ¡Recupera tu energía y vuelve a intentarlo!
        </p>
        <div style="display:inline-flex; gap:12px; background:#FEF2F2; border:2px solid #FCA5A5; border-radius:999px; padding:8px 20px; font-weight:900; color:#991B1B;">
          <span>+${sg.score * 5} XP</span>
        </div>
      </div>`,
      true
    );
  } else {
    window.sound.playMarvelFanfare();
    sumarRecompensa(sg.score * 5, Math.floor(sg.score / 3));
    mostrarModalCelebracion(
      "⏱️ ¡TIEMPO AGOTADO EN LA ARENA!",
      `<div style="text-align:center;">
        <div style="font-size:44px; margin-bottom:10px;">⏳ 🦾</div>
        <p style="font-size:20px; font-weight:800; color:#D97706; margin-bottom:8px;">
          El jefe logró escapar con ${sg.bossHp} HP restantes.
        </p>
        <p style="font-size:15px; font-weight:700; color:#4B5563; margin-bottom:14px;">
          Lograste acertar ${sg.score} golpes matemáticos. ¡Aumenta tu velocidad de cálculo y desafíalo de nuevo!
        </p>
        <div style="display:inline-flex; gap:12px; background:#FFFBEB; border:2px solid #FCD34D; border-radius:999px; padding:8px 20px; font-weight:900; color:#92400E;">
          <span>+${sg.score * 5} XP</span> • <span>+${Math.floor(sg.score / 3)} ⭐</span>
        </div>
      </div>`,
      true
    );
  }
}

// ============================================================================
// MÓDULO 3: MI PROGRESO Y LOGROS
// ============================================================================
function renderizarProgresoYLogros() {
  const p = AppState.perfil;
  if (!p) return;

  const elTotalXP = document.getElementById('progresoTotalXP');
  const elTotalEstrellas = document.getElementById('progresoTotalEstrellas');
  const elNivelJugador = document.getElementById('progresoNivelJugador');
  const elTablasListas = document.getElementById('progresoTablasListas');

  if (elTotalXP) elTotalXP.innerText = `${p.xp || 0} XP`;
  if (elTotalEstrellas) elTotalEstrellas.innerText = p.estrellas || 0;
  if (elNivelJugador) elNivelJugador.innerText = `Nivel ${p.nivel || 1}`;

  let tablasDominadas = 0;
  for (let num = 2; num <= 10; num++) {
    if ((p.tablasProgreso[num] || 0) >= 80) tablasDominadas++;
  }
  if (elTablasListas) elTablasListas.innerText = `${tablasDominadas} / 9`;

  const pathContainer = document.getElementById('homePathPillsRow');
  if (pathContainer) {
    pathContainer.innerHTML = '';
    for (let num = 2; num <= 10; num++) {
      const pct = p.tablasProgreso[num] || 0;
      const isMastered = pct >= 80;
      const item = document.createElement('div');
      item.className = `table-pill-item ${isMastered ? 'mastered' : ''}`;
      item.innerHTML = `
        <div class="table-pill-number">×${num}</div>
        <div class="table-pill-status">${isMastered ? '⭐ Dominada' : `${pct}%`}</div>
      `;
      item.addEventListener('click', () => {
        window.sound.playMinecraftPop();
        AppState.activeTable = num;
        cambiarVista('aprender');
      });
      pathContainer.appendChild(item);
    }
  }

  const achGrid = document.getElementById('achievementsGrid');
  if (achGrid) {
    achGrid.innerHTML = '';
    LISTA_LOGROS.forEach(logro => {
      const isUnlocked = p.logrosDesbloqueados.includes(logro.id);
      const card = document.createElement('div');
      card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
      card.innerHTML = `
        <div class="achievement-icon-circle">${logro.icono}</div>
        <div class="achievement-info">
          <h4>${logro.titulo}</h4>
          <p>${logro.descripcion}</p>
        </div>
      `;
      achGrid.appendChild(card);
    });
  }
}

// ============================================================================
// MÓDULO 4: ENSAYO MATEMÁTICO TIPO SIMCE 4° BÁSICO
// ============================================================================
function inicializarSimce() {
  renderizarSidebarSimce();
  mostrarPreguntaSimce(0);

  const btnPrev = document.getElementById('btnSimcePrev');
  const btnNext = document.getElementById('btnSimceNext');
  const btnSubmit = document.getElementById('btnFinalizarSimce');

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (AppState.simce.currentQuestionIndex > 0) {
        window.sound.playMinecraftPop();
        mostrarPreguntaSimce(AppState.simce.currentQuestionIndex - 1);
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (AppState.simce.currentQuestionIndex < SIMCE_PREGUNTAS.length - 1) {
        window.sound.playMinecraftPop();
        mostrarPreguntaSimce(AppState.simce.currentQuestionIndex + 1);
      }
    });
  }

  if (btnSubmit) {
    btnSubmit.addEventListener('click', evaluarSimce);
  }

  const btnReintentar = document.getElementById('btnReintentarSimce');
  if (btnReintentar) {
    btnReintentar.addEventListener('click', () => {
      window.sound.playMarvelLaser();
      AppState.simce.respuestas = {};
      AppState.simce.entregado = false;
      document.getElementById('simceResultsCard').style.display = 'none';
      document.getElementById('simceTestContainer').style.display = 'grid';
      renderizarSidebarSimce();
      mostrarPreguntaSimce(0);
    });
  }

  const btnVolverMenu = document.getElementById('btnVolverMenuDesdeSimce');
  if (btnVolverMenu) {
    btnVolverMenu.addEventListener('click', () => {
      window.sound.playMinecraftPop();
      cambiarVista('menu');
    });
  }
}

function renderizarSidebarSimce() {
  const sidebar = document.getElementById('simceSidebarGrid');
  if (!sidebar) return;
  sidebar.innerHTML = '';

  SIMCE_PREGUNTAS.forEach((q, idx) => {
    const btn = document.createElement('button');
    const isAnswered = AppState.simce.respuestas[idx] !== undefined;
    const isCurrent = idx === AppState.simce.currentQuestionIndex;

    btn.className = `btn-simce-nav ${isCurrent ? 'current' : ''} ${isAnswered ? 'answered' : ''}`;
    btn.innerHTML = `
      <span>P${idx + 1}</span>
      <span>${isAnswered ? '✓' : ''}</span>
    `;

    btn.addEventListener('click', () => {
      window.sound.playMinecraftPop();
      mostrarPreguntaSimce(idx);
    });

    sidebar.appendChild(btn);
  });

  const totalResp = Object.keys(AppState.simce.respuestas).length;
  const pillCounter = document.getElementById('simceCounterPill');
  if (pillCounter) pillCounter.innerText = `${totalResp} de 10 respondidas`;
}

function mostrarPreguntaSimce(index) {
  AppState.simce.currentQuestionIndex = index;
  const q = SIMCE_PREGUNTAS[index];
  if (!q) return;

  renderizarSidebarSimce();

  document.getElementById('simceQuestionBadge').innerText = `Pregunta ${index + 1} de 10`;
  document.getElementById('simceContextBadge').innerText = q.contexto;
  document.getElementById('simceQuestionText').innerText = q.enunciado;

  renderizarDiagramaSimce(q.svgType, document.getElementById('simceDiagramBox'));

  const optsContainer = document.getElementById('simceOptionsList');
  optsContainer.innerHTML = '';

  const seleccionada = AppState.simce.respuestas[index];

  q.opciones.forEach(opt => {
    const isSelected = seleccionada === opt.id;
    const btn = document.createElement('button');
    btn.className = `option-choice-btn ${isSelected ? 'selected' : ''}`;
    btn.innerHTML = `
      <div class="option-letter-circle">${opt.id}</div>
      <div class="option-text-content">${opt.texto}</div>
    `;

    btn.addEventListener('click', () => {
      window.sound.playMinecraftPop();
      AppState.simce.respuestas[index] = opt.id;
      renderizarSidebarSimce();
      mostrarPreguntaSimce(index);
    });

    optsContainer.appendChild(btn);
  });

  const btnPrev = document.getElementById('btnSimcePrev');
  const btnNext = document.getElementById('btnSimceNext');
  if (btnPrev) btnPrev.disabled = index === 0;
  if (btnNext) btnNext.disabled = index === SIMCE_PREGUNTAS.length - 1;
}

function renderizarDiagramaSimce(tipo, container) {
  if (!container) return;

  let svgHtml = '';
  switch (tipo) {
    case 'bolsas_manzanas':
      svgHtml = `
        <svg viewBox="0 0 400 100" width="100%" height="100" style="max-height:100px;">
          ${[0, 1, 2, 3].map(i => `
            <g transform="translate(${i * 100 + 10}, 10)">
              <rect x="0" y="15" width="75" height="70" rx="12" fill="#FEF3C7" stroke="#D97706" stroke-width="3"/>
              <path d="M20 15 C20 0 55 0 55 15" fill="none" stroke="#D97706" stroke-width="4"/>
              <text x="37" y="55" font-size="24" text-anchor="middle">🍎×6</text>
              <text x="37" y="75" font-size="11" font-weight="bold" fill="#78350F" text-anchor="middle">Bolsa ${i+1}</text>
            </g>
          `).join('')}
        </svg>
      `;
      break;

    case 'filas_sillas':
      svgHtml = `
        <svg viewBox="0 0 380 110" width="100%" height="110" style="max-height:110px;">
          <rect x="10" y="5" width="360" height="100" rx="12" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
          <text x="190" y="32" font-size="16" font-weight="bold" fill="#15803D" text-anchor="middle">🪑 Gimnasio: 7 filas de 8 sillas</text>
          <g transform="translate(60, 48)">
            ${Array.from({length: 7}).map((_, r) => `
              <circle cx="${r * 40}" cy="10" r="12" fill="#22C55E"/>
              <text x="${r * 40}" y="14" font-size="10" fill="white" font-weight="bold" text-anchor="middle">8</text>
            `).join('')}
          </g>
          <text x="190" y="92" font-size="12" fill="#166534" text-anchor="middle">7 grupos de 8 sillas = 7 × 8</text>
        </svg>
      `;
      break;

    case 'bandejas_queques':
      svgHtml = `
        <svg viewBox="0 0 400 90" width="100%" height="90">
          ${[0, 1, 2, 3, 4].map(i => `
            <g transform="translate(${i * 80 + 5}, 10)">
              <rect x="0" y="10" width="70" height="60" rx="8" fill="#FDF2F8" stroke="#DB2777" stroke-width="2"/>
              <text x="35" y="44" font-size="20" text-anchor="middle">🧁×9</text>
              <text x="35" y="62" font-size="10" font-weight="bold" fill="#9D174D" text-anchor="middle">Bandeja ${i+1}</text>
            </g>
          `).join('')}
        </svg>
      `;
      break;

    case 'sobres_laminas':
      svgHtml = `
        <svg viewBox="0 0 380 90" width="100%" height="90">
          ${[0, 1, 2, 3, 4, 5].map(i => `
            <g transform="translate(${i * 62 + 5}, 10)">
              <rect x="0" y="5" width="54" height="70" rx="6" fill="#EFF6FF" stroke="#2563EB" stroke-width="2"/>
              <text x="27" y="42" font-size="18" text-anchor="middle">🏷️×5</text>
              <text x="27" y="62" font-size="10" font-weight="bold" fill="#1E40AF" text-anchor="middle">Sobre ${i+1}</text>
            </g>
          `).join('')}
        </svg>
      `;
      break;

    case 'huerta_lechugas':
      svgHtml = `
        <svg viewBox="0 0 380 90" width="100%" height="90">
          <rect x="10" y="5" width="360" height="80" rx="10" fill="#FEFCE8" stroke="#CA8A04" stroke-width="2"/>
          <text x="190" y="32" font-size="16" font-weight="bold" fill="#854D0E" text-anchor="middle">🌱 8 hileras con 6 lechugas cada una</text>
          <text x="190" y="62" font-size="20" text-anchor="middle">🥬 🥬 🥬 🥬 🥬 🥬 🥬 🥬</text>
        </svg>
      `;
      break;

    case 'bus_escolar':
      svgHtml = `
        <svg viewBox="0 0 380 90" width="100%" height="90">
          <rect x="20" y="10" width="340" height="70" rx="14" fill="#FEF3C7" stroke="#D97706" stroke-width="3"/>
          <text x="190" y="44" font-size="26" text-anchor="middle">🚌 9 filas × 4 asientos</text>
          <text x="190" y="68" font-size="13" font-weight="bold" fill="#92400E" text-anchor="middle">Capacidad para 4° Básico</text>
        </svg>
      `;
      break;

    case 'ahorro_alcancia':
      svgHtml = `
        <svg viewBox="0 0 380 90" width="100%" height="90">
          <rect x="10" y="10" width="360" height="70" rx="12" fill="#FDF2F8" stroke="#E11D48" stroke-width="2"/>
          <text x="190" y="42" font-size="24" text-anchor="middle">🐷 7 semanas × $300 cada una</text>
          <text x="190" y="66" font-size="13" font-weight="bold" fill="#BE123C" text-anchor="middle">¡Ahorro semanal constante!</text>
        </svg>
      `;
      break;

    case 'cajas_lapices':
      svgHtml = `
        <svg viewBox="0 0 380 90" width="100%" height="90">
          <rect x="10" y="10" width="360" height="70" rx="12" fill="#F0FDFA" stroke="#0D9488" stroke-width="2"/>
          <text x="190" y="42" font-size="24" text-anchor="middle">✏️ 8 cajas con 10 lápices cada una</text>
          <text x="190" y="66" font-size="13" font-weight="bold" fill="#0F766E" text-anchor="middle">8 × 10 lápices de colores</text>
        </svg>
      `;
      break;

    case 'pista_atletica':
      svgHtml = `
        <svg viewBox="0 0 380 90" width="100%" height="90">
          <rect x="10" y="10" width="360" height="70" rx="12" fill="#FFF7ED" stroke="#EA580C" stroke-width="2"/>
          <text x="190" y="42" font-size="24" text-anchor="middle">🏃‍♂️ 3 alumnos × 7 vueltas</text>
          <text x="190" y="66" font-size="13" font-weight="bold" fill="#C2410C" text-anchor="middle">7 + 7 + 7 = 3 × 7</text>
        </svg>
      `;
      break;

    case 'repisa_libros':
      svgHtml = `
        <svg viewBox="0 0 380 90" width="100%" height="90">
          <rect x="10" y="10" width="360" height="70" rx="12" fill="#EEF2FF" stroke="#4F46E5" stroke-width="2"/>
          <text x="190" y="42" font-size="24" text-anchor="middle">📚 6 repisas × 8 historietas</text>
          <text x="190" y="66" font-size="13" font-weight="bold" fill="#3730A3" text-anchor="middle">Biblioteca Escolar</text>
        </svg>
      `;
      break;

    default:
      svgHtml = `<div style="font-size:32px;">📐 🔢 ✏️</div>`;
  }

  container.innerHTML = svgHtml;
}

function evaluarSimce() {
  const totalPreguntas = SIMCE_PREGUNTAS.length;
  const respondidas = Object.keys(AppState.simce.respuestas).length;

  if (respondidas < totalPreguntas) {
    const confirmEntrega = confirm(
      `Has respondido ${respondidas} de ${totalPreguntas} preguntas.\n¿Estás seguro de que deseas finalizar el ensayo ahora? Te recomendamos responder todas.`
    );
    if (!confirmEntrega) return;
  }

  window.sound.playMarvelFanfare();
  lanzarSerpentinasYBrillos();

  let aciertos = 0;
  SIMCE_PREGUNTAS.forEach((q, idx) => {
    if (AppState.simce.respuestas[idx] === q.correcta) {
      aciertos++;
    }
  });

  const puntajeSimce = Math.round(190 + (aciertos / totalPreguntas) * 140);
  const porcentaje = Math.round((aciertos / totalPreguntas) * 100);

  let nivelLogro = 'Inicial';
  let claseNivel = 'inicial';
  let mensajeMotivador = '';

  if (porcentaje >= 80) {
    nivelLogro = 'Nivel Adecuado 🌟';
    claseNivel = 'adecuado';
    mensajeMotivador = '¡Poder total de superhéroe! Demuestras un dominio sólido y sobresaliente de las tablas de multiplicar y problemas de 4° básico.';
  } else if (porcentaje >= 50) {
    nivelLogro = 'Nivel Elemental 👍';
    claseNivel = 'elemental';
    mensajeMotivador = '¡Gran batalla matemática! Tienes una base adecuada, pero aún puedes reforzar algunas tablas para alcanzar el nivel adecuado.';
  } else {
    nivelLogro = 'Nivel Inicial 💪';
    claseNivel = 'inicial';
    mensajeMotivador = '¡Ánimo! Este es el entrenamiento de todo héroe. Practica en el módulo "Aprender Tablas" y pronto dominarás todos los desafíos.';
  }

  AppState.perfil.simceRealizado = true;
  AppState.perfil.simcePuntaje = puntajeSimce;
  AppState.perfil.simceAciertos = aciertos;
  sumarRecompensa(aciertos * 10, Math.floor(aciertos / 2));
  desbloquearLogro("simce_campeon");

  document.getElementById('simceTestContainer').style.display = 'none';
  const resCard = document.getElementById('simceResultsCard');
  resCard.style.display = 'block';

  document.getElementById('simceScoreValue').innerText = `${puntajeSimce} pts`;
  const badgeEl = document.getElementById('simceLevelBadge');
  badgeEl.className = `simce-level-badge ${claseNivel}`;
  badgeEl.innerText = nivelLogro;
  document.getElementById('simceFeedbackText').innerText = mensajeMotivador;

  document.getElementById('simceCorrectasCount').innerText = `${aciertos} / 10`;
  document.getElementById('simcePorcentajeVal').innerText = `${porcentaje}%`;

  const reviewList = document.getElementById('simceReviewList');
  reviewList.innerHTML = '';

  SIMCE_PREGUNTAS.forEach((q, idx) => {
    const respEstudiante = AppState.simce.respuestas[idx];
    const esCorrecta = respEstudiante === q.correcta;

    const itemCard = document.createElement('div');
    itemCard.className = `review-item-card ${esCorrecta ? 'correct' : 'incorrect'}`;

    itemCard.innerHTML = `
      <div class="review-item-top">
        <strong>Pregunta ${idx + 1}: ${q.contexto}</strong>
        <span style="font-weight:900; color:${esCorrecta ? '#059669' : '#DC2626'}">
          ${esCorrecta ? '✓ Correcta (+1 punto)' : '✗ Incorrecta'}
        </span>
      </div>
      <p style="font-size:15px; margin-bottom:8px;"><strong>Enunciado:</strong> ${q.enunciado}</p>
      <div style="font-size:14px; margin-bottom:8px;">
        Tu respuesta: <strong>${respEstudiante ? `${respEstudiante}` : 'Sin responder'}</strong> 
        • Respuesta correcta: <strong style="color:#059669">${q.correcta}</strong>
      </div>
      <div class="review-feedback-bubble">
        <strong>💡 Explicación pedagógica paso a paso:</strong><br>
        ${q.explicacion}
      </div>
    `;

    reviewList.appendChild(itemCard);
  });

  window.scrollTo({ top: 100, behavior: 'smooth' });
}

// ============================================================================
// MODAL GENERAL CON SOPORTE COMPLETO DE HTML
// ============================================================================
function mostrarModalCelebracion(titulo, contenidoHtml, esHtml = true) {
  const overlay = document.getElementById('modalCelebracion');
  const titleEl = document.getElementById('modalCelebracionTitulo');
  const bodyEl = document.getElementById('modalCelebracionBody');

  if (titleEl) titleEl.innerText = titulo;
  if (bodyEl) {
    if (esHtml) bodyEl.innerHTML = contenidoHtml;
    else bodyEl.innerText = contenidoHtml;
  }

  if (overlay) overlay.classList.add('active');

  const btnClose = document.getElementById('btnCerrarModalCelebracion');
  if (btnClose) {
    btnClose.onclick = () => {
      window.sound.playMinecraftPop();
      overlay.classList.remove('active');
    };
  }
}

// ============================================================================
// SISTEMA DE SERPENTINAS, BRILLOS Y CONFETTI (CANVAS AVANZADO)
// ============================================================================
let particleCanvas, particleCtx, activeParticles = [];

function inicializarEfectosParticulas() {
  particleCanvas = document.getElementById('confettiCanvas');
  if (!particleCanvas) return;
  particleCtx = particleCanvas.getContext('2d');
  resizeParticles();
  window.addEventListener('resize', resizeParticles);
}

function resizeParticles() {
  if (particleCanvas) {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }
}

// Lanza serpentinas, confeti y brillos estelares
function lanzarSerpentinasYBrillos() {
  if (!particleCanvas || !particleCtx) return;
  const colors = ['#EF4444', '#F59E0B', '#10B981', '#06B6D4', '#8B5CF6', '#EC4899', '#FDE047', '#3B82F6'];
  activeParticles = [];

  // 1. Serpentinas ondulantes (Streamers / Ribbons)
  for (let i = 0; i < 28; i++) {
    activeParticles.push({
      tipo: 'serpentina',
      x: window.innerWidth * (0.2 + Math.random() * 0.6),
      y: window.innerHeight * 0.4,
      vx: (Math.random() - 0.5) * 14,
      vy: -(Math.random() * 12 + 6),
      ancho: Math.random() * 6 + 6,
      largo: Math.random() * 30 + 25,
      color: colors[Math.floor(Math.random() * colors.length)],
      angulo: Math.random() * Math.PI * 2,
      vAngulo: (Math.random() - 0.5) * 0.15,
      waveOffset: Math.random() * Math.PI,
      life: 1
    });
  }

  // 2. Brillos / Chispas mágicas de 4 puntas (Sparkles)
  for (let i = 0; i < 40; i++) {
    activeParticles.push({
      tipo: 'brillo',
      x: window.innerWidth * (0.1 + Math.random() * 0.8),
      y: window.innerHeight * (0.2 + Math.random() * 0.6),
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      radio: Math.random() * 10 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotacion: 0,
      vRotacion: (Math.random() - 0.5) * 0.2,
      life: 1
    });
  }

  // 3. Confeti tradicional
  for (let i = 0; i < 60; i++) {
    activeParticles.push({
      tipo: 'confeti',
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 18,
      vy: -(Math.random() * 16 + 4),
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotacion: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      life: 1
    });
  }

  animateParticles();
}

function animateParticles() {
  if (!particleCtx) return;
  particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

  let anyActive = false;

  activeParticles.forEach(p => {
    p.life -= 0.014;
    p.x += p.vx;
    p.y += p.vy;

    if (p.life > 0) {
      anyActive = true;
      particleCtx.save();
      particleCtx.globalAlpha = Math.max(0, p.life);

      if (p.tipo === 'serpentina') {
        p.vy += 0.28; // Gravedad suave
        p.angulo += p.vAngulo;
        particleCtx.translate(p.x, p.y);
        particleCtx.rotate(p.angulo);
        particleCtx.fillStyle = p.color;
        // Dibujo de cinta ondulante
        particleCtx.beginPath();
        particleCtx.moveTo(-p.ancho / 2, 0);
        particleCtx.bezierCurveTo(p.ancho, p.largo / 3, -p.ancho, (p.largo * 2) / 3, 0, p.largo);
        particleCtx.lineTo(p.ancho / 2, p.largo);
        particleCtx.bezierCurveTo(-p.ancho / 2, (p.largo * 2) / 3, p.ancho / 2, p.largo / 3, p.ancho / 2, 0);
        particleCtx.closePath();
        particleCtx.fill();
      } else if (p.tipo === 'brillo') {
        p.vy += 0.05;
        p.rotacion += p.vRotacion;
        particleCtx.translate(p.x, p.y);
        particleCtx.rotate(p.rotacion);
        particleCtx.fillStyle = p.color;
        // Estrella de 4 puntas brillante
        particleCtx.beginPath();
        const r = p.radio;
        const inner = r * 0.25;
        for (let s = 0; s < 4; s++) {
          const a1 = (s * Math.PI) / 2;
          const a2 = a1 + Math.PI / 4;
          particleCtx.lineTo(Math.cos(a1) * r, Math.sin(a1) * r);
          particleCtx.lineTo(Math.cos(a2) * inner, Math.sin(a2) * inner);
        }
        particleCtx.closePath();
        particleCtx.fill();
      } else {
        // Confeti
        p.vy += 0.32;
        p.rotacion += p.vRot;
        particleCtx.translate(p.x, p.y);
        particleCtx.rotate((p.rotacion * Math.PI) / 180);
        particleCtx.fillStyle = p.color;
        particleCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
      }

      particleCtx.restore();
    }
  });

  if (anyActive) {
    requestAnimationFrame(animateParticles);
  } else {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  }
}

// ============================================================================
// FONDO INTERACTIVO TEMÁTICO MARVEL & MINECRAFT PARA EL MENÚ Y SISTEMA
// ============================================================================
function initMenuInteractiveBackground() {
  const canvas = document.getElementById('menuInteractiveCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: -1000, y: -1000, active: false };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
    if (Math.random() < 0.35) {
      particles.push(crearParticulaMouse(mouse.x, mouse.y));
    }
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  window.addEventListener('click', (e) => {
    // Al hacer clic en cualquier lugar, generar explosión de orbes y diamantes
    for (let i = 0; i < 9; i++) {
      particles.push(crearParticulaClick(e.clientX, e.clientY));
    }
  });

  const particleTypes = ['diamond', 'xp_orb', 'star_red', 'star_gold', 'math_op'];
  const mathSymbols = ['×', '+', '=', '4', '7', '8', '9', '💎', '⭐'];

  function crearParticulaAleatoria() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: -(Math.random() * 0.7 + 0.3),
      size: Math.random() * 6 + 6,
      type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
      symbol: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
      alpha: Math.random() * 0.5 + 0.25,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.04 + 0.02
    };
  }

  function crearParticulaMouse(mx, my) {
    const isDiamond = Math.random() > 0.5;
    return {
      x: mx + (Math.random() - 0.5) * 14,
      y: my + (Math.random() - 0.5) * 14,
      vx: (Math.random() - 0.5) * 1.6,
      vy: (Math.random() - 0.5) * 1.6 - 0.6,
      size: Math.random() * 6 + 4,
      type: isDiamond ? 'diamond' : 'xp_orb',
      alpha: 0.85,
      fade: 0.025,
      isTransient: true
    };
  }

  function crearParticulaClick(cx, cy) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4.5 + 2;
    return {
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 8 + 5,
      type: Math.random() > 0.5 ? 'diamond' : 'star_gold',
      alpha: 1,
      fade: 0.028,
      isTransient: true
    };
  }

  const particles = [];
  const TOTAL_BASE = 36;
  for (let i = 0; i < TOTAL_BASE; i++) {
    particles.push(crearParticulaAleatoria());
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (mouse.active && !p.isTransient) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.6;
          p.y += (dy / dist) * force * 1.6;

          // Líneas de conexión luminosa estilo red vibranium / energía estelar
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - dist / 120) * 0.3})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      if (p.isTransient) {
        p.alpha -= p.fade;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
      } else {
        if (p.y < -30) p.y = height + 20;
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;
        p.pulse += p.pulseSpeed;
      }

      ctx.save();
      const currentAlpha = p.isTransient ? p.alpha : (p.alpha + Math.sin(p.pulse) * 0.15);
      ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));

      if (p.type === 'diamond') {
        // Diamante estilo Minecraft (rombo 4 puntas cyan)
        ctx.fillStyle = '#22D3EE';
        ctx.shadowColor = '#06B6D4';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        const s = p.size;
        ctx.moveTo(p.x, p.y - s);
        ctx.lineTo(p.x + s * 0.65, p.y);
        ctx.lineTo(p.x, p.y + s);
        ctx.lineTo(p.x - s * 0.65, p.y);
        ctx.closePath();
        ctx.fill();
      } else if (p.type === 'xp_orb') {
        // Orbe de Experiencia Minecraft (verde esmeralda pulsante)
        ctx.fillStyle = '#4ADE80';
        ctx.shadowColor = '#10B981';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FEF08A';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.25, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'star_gold' || p.type === 'star_red') {
        // Chispa / Estrella Marvel
        ctx.fillStyle = p.type === 'star_gold' ? '#FACC15' : '#F87171';
        ctx.shadowColor = p.type === 'star_gold' ? '#EAB308' : '#EF4444';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.45, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'math_op') {
        // Símbolo matemático
        ctx.font = `bold ${Math.round(p.size * 1.5)}px 'Fredoka', cursive`;
        ctx.fillStyle = '#38BDF8';
        ctx.shadowColor = '#0284C7';
        ctx.shadowBlur = 6;
        ctx.fillText(p.symbol, p.x, p.y);
      }

      ctx.restore();
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

