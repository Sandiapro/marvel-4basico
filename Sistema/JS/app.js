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
  initMouseBackgroundParallax();
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

function verificarDesbloqueoSimce() {
  const p = AppState.perfil;
  if (!p) return { completado: true, entrenadas: 9, total: 9, pendientes: [] };
  p.tablasEntrenadas = p.tablasEntrenadas || {};
  let count = 0;
  const pendientes = [];
  for (let t = 2; t <= 10; t++) {
    if (p.tablasEntrenadas[t]) {
      count++;
    } else {
      pendientes.push(t);
    }
  }
  return { completado: count >= 9, entrenadas: count, total: 9, pendientes };
}

function actualizarBarraDesbloqueoSimce() {
  const estado = verificarDesbloqueoSimce();
  const counterEl = document.getElementById('simceUnlockCounter');
  const fillEl = document.getElementById('simceUnlockBarFill');
  const textEl = document.getElementById('simceUnlockStatusText');

  if (counterEl) {
    counterEl.innerText = `${estado.entrenadas} / 9 Tablas Dominadas`;
  }
  if (fillEl) {
    const pct = Math.round((estado.entrenadas / 9) * 100);
    fillEl.style.width = `${pct}%`;
  }
  if (textEl) {
    if (estado.completado) {
      textEl.innerHTML = `<strong style="color:#10B981;">🎉 ¡ENTRENAMIENTO COMPLETO!</strong> El Ensayo Oficial SIMCE está 100% desbloqueado.`;
    } else {
      textEl.innerText = `Completa el entrenamiento en las 9 tablas (del 2 al 10) para desbloquear el examen oficial. Te faltan ${estado.pendientes.length} tablas.`;
    }
  }
}

function cambiarVista(viewName) {
  // Requisito: Debe terminar todo su entrenamiento previo para ingresar al SIMCE
  if (viewName === 'simce') {
    const estadoDesbloqueo = verificarDesbloqueoSimce();
    if (!estadoDesbloqueo.completado) {
      window.sound.playError();
      const nombresPendientes = estadoDesbloqueo.pendientes.map(t => `Tabla del ${t}`).join(', ');
      mostrarModalCelebracion(
        "🔒 ¡ENTRENAMIENTO INCOMPLETO PARA EL SIMCE!",
        `<div style="text-align:center;">
          <div style="font-size:46px; margin-bottom:10px;">🛡️ ⛏️ 🔒</div>
          <p style="font-size:18px; font-weight:800; color:#1E1B4B; margin-bottom:10px;">
            Para ingresar al <strong>Ensayo Oficial SIMCE</strong> debes completar todo tu entrenamiento previo en las 9 tablas de multiplicar (Tablas del 2 al 10).
          </p>
          <div style="background:#FEF3C7; border:2px solid #F59E0B; border-radius:12px; padding:12px 18px; margin-bottom:12px; font-weight:800; color:#92400E;">
            📊 Progreso Actual: Llevas <strong>${estadoDesbloqueo.entrenadas} de 9</strong> tablas completadas.
          </div>
          <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:10px; padding:8px 14px; margin-bottom:14px; font-size:13px; color:#1E40AF; font-weight:700;">
            ⏳ Tablas pendientes por entrenar: <strong>${nombresPendientes}</strong>
          </div>
          <p style="font-size:14px; color:#4B5563; margin-bottom:16px;">
            ¡Entrena cada tabla con los superhéroes y Minecraft en la Academia para dominar sus poderes y desbloquear el examen!
          </p>
          <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
            <button type="button" class="btn-stepper" id="btnIrAprenderTablas" style="width:auto; padding:8px 18px; border-radius:999px; background:#2563EB; color:#FFF; font-size:14px;">
              📘 Ir a Entrenar Tablas
            </button>
            <button type="button" class="btn-stepper" id="btnDesbloquearSimceDirecto" style="width:auto; padding:8px 18px; border-radius:999px; background:#10B981; color:#FFF; font-size:14px;" title="Completar entrenamiento y desbloquear">
              ⚡ Completar Entrenamiento y Entrar
            </button>
          </div>
        </div>`,
        true
      );

      setTimeout(() => {
        const btnGo = document.getElementById('btnIrAprenderTablas');
        const btnUnlock = document.getElementById('btnDesbloquearSimceDirecto');
        if (btnGo) {
          btnGo.onclick = () => {
            cerrarModalCelebracion();
            cambiarVista('aprender');
          };
        }
        if (btnUnlock) {
          btnUnlock.onclick = () => {
            for (let i = 2; i <= 10; i++) {
              AppState.perfil.tablasEntrenadas[i] = true;
              AppState.perfil.tablasProgreso[i] = 100;
            }
            guardarPerfil();
            cerrarModalCelebracion();
            cambiarVista('simce');
          };
        }
      }, 100);
      return;
    }

    // Al ingresar al SIMCE, si es un nuevo intento, asegurar preguntas variadas y no repetidas
    if (AppState.simce.entregado || Object.keys(AppState.simce.respuestas).length === 0) {
      if (typeof obtenerDiezPreguntasSimceAleatorias === 'function') {
        SIMCE_PREGUNTAS = obtenerDiezPreguntasSimceAleatorias(AppState.simce.ultimasPreguntasIds || []);
        AppState.simce.ultimasPreguntasIds = SIMCE_PREGUNTAS.map(q => q.id);
      }
      AppState.simce.respuestas = {};
      AppState.simce.entregado = false;
      AppState.simce.currentQuestionIndex = 0;
      const resCard = document.getElementById('simceResultsCard');
      const testCont = document.getElementById('simceTestContainer');
      if (resCard) resCard.style.display = 'none';
      if (testCont) testCont.style.display = 'grid';
      renderizarSidebarSimce();
      mostrarPreguntaSimce(0);
    }
  }

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
// MÓDULO 1: APRENDER TABLAS (CONCRETO-PICTÓRICO-SIMBÓLICO CON HÉROES & 3D VOXEL)
// ============================================================================
let rhythmInterval = null;

// Estado para la manipulación e interactividad 3D de los cubos de multiplicación
const Voxel3DState = {
  rotX: -22,
  rotY: 35,
  isDragging: false,
  startX: 0,
  startY: 0,
  autoSpin: true,
  exploded: false,
  mode: '3d'
};

function aplicarRotacionVoxel3D() {
  const scene = document.getElementById('voxel3DScene');
  if (scene) {
    scene.style.transform = `rotateX(${Voxel3DState.rotX}deg) rotateY(${Voxel3DState.rotY}deg)`;
  }
}

let voxelSpinLoopStarted = false;
function iniciarLoopAnimacionVoxel3D() {
  if (voxelSpinLoopStarted) return;
  voxelSpinLoopStarted = true;

  function spinLoop() {
    if (Voxel3DState.autoSpin && !Voxel3DState.isDragging && AppState.activeView === 'aprender') {
      Voxel3DState.rotY = (Voxel3DState.rotY + 0.35) % 360;
      aplicarRotacionVoxel3D();
    }
    requestAnimationFrame(spinLoop);
  }
  requestAnimationFrame(spinLoop);
}

function renderizarSelectorTablas() {
  const strip = document.getElementById('tableSelectorStrip');
  if (!strip) return;

  strip.innerHTML = '';
  const p = AppState.perfil || {};
  const entrenadas = p.tablasEntrenadas || {};

  for (let num = 2; num <= 10; num++) {
    const btn = document.createElement('button');
    const isMastered = !!entrenadas[num];
    const isActive = num === AppState.activeTable;
    btn.className = `btn-select-table ${isActive ? 'active' : ''} ${isMastered ? 'mastered' : ''}`;
    const tData = TABLAS_INFO[num];
    const icon = tData ? tData.icono : '📘';
    const checkmark = isMastered ? ' <span style="color:#10B981; font-size:14px; margin-left:4px;" title="Tabla Dominada">✅</span>' : '';
    btn.innerHTML = `<span>${icon}</span> <span>Tabla del ${num}</span>${checkmark}`;
    btn.addEventListener('click', () => {
      window.sound.playMinecraftPop();
      if (rhythmInterval) {
        clearInterval(rhythmInterval);
        rhythmInterval = null;
        const btnR = document.getElementById('btnRhythmWalkthrough');
        if (btnR) btnR.innerHTML = `<span class="rhythm-icon">⚡</span><span>▶️ Racha Rítmica Animada</span>`;
      }
      AppState.activeTable = num;
      AppState.activeMultiplier = 3;
      AppState.isCommutativeInverted = false;
      renderizarSelectorTablas();

      const mentorInfo = TABLAS_INFO[num];
      if (mentorInfo && mentorInfo.sonido && typeof window.sound[mentorInfo.sonido] === 'function') {
        window.sound[mentorInfo.sonido]();
      }

      actualizarVistaTabla();
      actualizarBarraDesbloqueoSimce();
    });
    strip.appendChild(btn);
  }
}

function inicializarAprenderTablas() {
  renderizarSelectorTablas();
  actualizarBarraDesbloqueoSimce();

  // Botón para Marcar la Tabla como Dominada y avanzar hacia el SIMCE
  const btnMaster = document.getElementById('btnMasterCurrentTable');
  if (btnMaster) {
    btnMaster.addEventListener('click', () => {
      const t = AppState.activeTable;
      AppState.perfil.tablasEntrenadas = AppState.perfil.tablasEntrenadas || {};
      AppState.perfil.tablasProgreso = AppState.perfil.tablasProgreso || {};
      AppState.perfil.tablasEntrenadas[t] = true;
      AppState.perfil.tablasProgreso[t] = 100;
      guardarPerfil();

      window.sound.playMarvelFanfare();
      window.sound.playMinecraftLevelUp();
      lanzarSerpentinasYBrillos();
      sumarRecompensa(35, 3);

      const tInfo = TABLAS_INFO[t];
      const estado = verificarDesbloqueoSimce();

      renderizarSelectorTablas();
      actualizarBarraDesbloqueoSimce();
      actualizarVistaTabla();

      if (estado.completado) {
        mostrarModalCelebracion(
          "🎉 ¡MISIÓN CUMPLIDA: ENSAYO SIMCE DESBLOQUEADO!",
          `<div style="text-align:center;">
            <div style="font-size:52px; margin-bottom:12px;">🏆 🛡️ 💎 📝</div>
            <h3 style="font-size:22px; font-weight:900; color:#059669; margin-bottom:10px;">
              ¡Felicidades, Súper Héroe Matemático!
            </h3>
            <p style="font-size:16px; font-weight:700; color:#1E293B; line-height:1.5; margin-bottom:14px;">
              Has completado el entrenamiento de las <strong>9 tablas de multiplicar (2 al 10)</strong>. 
              ¡Tus poderes están en su máximo nivel y el <strong>Ensayo Oficial SIMCE</strong> ya está 100% desbloqueado para ti!
            </p>
            <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:14px;">
              <button type="button" class="btn-stepper" id="btnCelebrarIrSimce" style="width:auto; padding:10px 24px; border-radius:999px; background:#DC2626; color:#FFF; font-size:15px; font-weight:900; border:2px solid #FDE047;">
                📝 ¡Rendir Ensayo SIMCE Ahora!
              </button>
              <button type="button" class="btn-stepper" onclick="cerrarModalCelebracion()" style="width:auto; padding:10px 20px; border-radius:999px; background:#3B82F6; color:#FFF; font-size:15px; font-weight:900;">
                👍 Seguir Practicando
              </button>
            </div>
          </div>`,
          true
        );

        setTimeout(() => {
          const btnSimce = document.getElementById('btnCelebrarIrSimce');
          if (btnSimce) {
            btnSimce.onclick = () => {
              cerrarModalCelebracion();
              cambiarVista('simce');
            };
          }
        }, 100);
      } else {
        mostrarModalCelebracion(
          `⭐ ¡${tInfo.nombre} DOMINADA!`,
          `<div style="text-align:center;">
            <div style="font-size:42px; margin-bottom:10px;">${tInfo.icono} ⚡ 💎</div>
            <p style="font-size:18px; font-weight:900; color:#059669; margin-bottom:8px;">
              ¡Genial! Has dominado la ${tInfo.nombre} con ${tInfo.mentor}.
            </p>
            <div style="background:#FEF3C7; border:2px solid #F59E0B; border-radius:12px; padding:10px; margin-bottom:12px; font-weight:800; color:#92400E;">
              Llevas ${estado.entrenadas} de 9 tablas completadas. ¡Faltan solo ${estado.pendientes.length} para el SIMCE!
            </div>
            <p style="font-size:14px; color:#4B5563;">
              Ganaste +35 XP y +3 Diamantes.
            </p>
          </div>`,
          false
        );
      }
    });
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

  // Modos de Aprendizaje: Cubos 3D vs Grupos
  const btnM3D = document.getElementById('btnMode3D');
  const btnMGrupos = document.getElementById('btnModeGrupos');
  const vViewport = document.getElementById('voxel3DViewport');
  const vToolbar = document.getElementById('voxel3DToolbar');
  const stageBox = document.getElementById('groupsStageBox');

  if (btnM3D && btnMGrupos) {
    btnM3D.addEventListener('click', () => {
      window.sound.playClick();
      btnM3D.classList.add('active');
      btnMGrupos.classList.remove('active');
      Voxel3DState.mode = '3d';
      if (vViewport) vViewport.style.display = 'flex';
      if (vToolbar) vToolbar.style.display = 'flex';
      if (stageBox) stageBox.style.display = 'none';
      actualizarVistaTabla();
    });

    btnMGrupos.addEventListener('click', () => {
      window.sound.playClick();
      btnMGrupos.classList.add('active');
      btnM3D.classList.remove('active');
      Voxel3DState.mode = 'grupos';
      if (vViewport) vViewport.style.display = 'none';
      if (vToolbar) vToolbar.style.display = 'none';
      if (stageBox) stageBox.style.display = 'flex';
      actualizarVistaTabla();
    });
  }

  // Herramientas 3D
  const btnSpin = document.getElementById('btnToggleAutoSpin');
  if (btnSpin) {
    btnSpin.addEventListener('click', () => {
      window.sound.playClick();
      Voxel3DState.autoSpin = !Voxel3DState.autoSpin;
      btnSpin.classList.toggle('active', Voxel3DState.autoSpin);
    });
  }

  const btnExplode = document.getElementById('btnExplode3DCubes');
  if (btnExplode) {
    btnExplode.addEventListener('click', () => {
      window.sound.playCapShieldRing();
      Voxel3DState.exploded = !Voxel3DState.exploded;
      btnExplode.classList.toggle('active', Voxel3DState.exploded);
      actualizarVistaTabla();
    });
  }

  const btnReset = document.getElementById('btnReset3DView');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      window.sound.playClick();
      Voxel3DState.rotX = -22;
      Voxel3DState.rotY = 35;
      aplicarRotacionVoxel3D();
    });
  }

  // Interacción de Arrastre 3D con Mouse y Touch en el Viewport
  if (vViewport) {
    const onStart = (clientX, clientY) => {
      Voxel3DState.isDragging = true;
      Voxel3DState.startX = clientX;
      Voxel3DState.startY = clientY;
    };

    const onMove = (clientX, clientY) => {
      if (!Voxel3DState.isDragging) return;
      const dx = clientX - Voxel3DState.startX;
      const dy = clientY - Voxel3DState.startY;
      Voxel3DState.rotY += dx * 0.55;
      Voxel3DState.rotX -= dy * 0.55;
      Voxel3DState.rotX = Math.max(-80, Math.min(80, Voxel3DState.rotX));
      Voxel3DState.startX = clientX;
      Voxel3DState.startY = clientY;
      aplicarRotacionVoxel3D();
    };

    const onEnd = () => {
      Voxel3DState.isDragging = false;
    };

    vViewport.addEventListener('mousedown', (e) => onStart(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onEnd);

    vViewport.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) onStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchend', onEnd);
  }

  iniciarLoopAnimacionVoxel3D();

  // Botón conmutativo con rotación 3D
  const btnConmutativa = document.getElementById('btnToggleCommutative');
  if (btnConmutativa) {
    btnConmutativa.addEventListener('click', () => {
      window.sound.playMarvelShield();
      AppState.isCommutativeInverted = !AppState.isCommutativeInverted;
      const stage = document.getElementById('groupsStageBox');
      if (stage) {
        stage.style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
        stage.style.transform = 'scale(0.92) rotateY(180deg)';
        setTimeout(() => {
          actualizarVistaTabla();
          stage.style.transform = 'scale(1) rotateY(0deg)';
        }, 180);
      } else {
        actualizarVistaTabla();
      }
    });
  }

  // Botón modo racha rítmica
  const btnRhythm = document.getElementById('btnRhythmWalkthrough');
  if (btnRhythm) {
    btnRhythm.addEventListener('click', () => {
      iniciarRachaRitmica();
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
        `🛡️ Consejo de ${tInfo.mentor} (Tabla del ${AppState.activeTable})`,
        `<div style="font-size:16px; line-height:1.6; color:#1E3A8A; font-weight:700;">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:14px; background:#EFF6FF; padding:10px 16px; border-radius:12px; border:2px solid #60A5FA;">
            <img src="${tInfo.avatarImg}" style="width:48px; height:48px;" alt="${tInfo.mentor}">
            <div>
              <div style="font-size:12px; color:#DC2626; font-weight:900;">${tInfo.universo}</div>
              <div style="font-size:17px; font-weight:900; color:#1E3A8A;">${tInfo.mentor}</div>
            </div>
          </div>
          <p style="margin-bottom:12px;">⚡ <strong>${pistaAzar}</strong></p>
          <div style="background:#FFFBEB; border-left:4px solid #F59E0B; padding:12px; border-radius:8px; color:#78350F;">
            ${tInfo.truco}
          </div>
        </div>`,
        true
      );
    });
  }

  // Botón Desafío Rápido
  const btnQuizTabla = document.getElementById('btnLaunchTableQuiz');
  if (btnQuizTabla) {
    btnQuizTabla.addEventListener('click', () => {
      window.sound.playMarvelLaser();
      lanzarQuizRapidoTabla(AppState.activeTable);
    });
  }

  actualizarVistaTabla();
}

// Renderizado de Cubos Voxel 3D en Perspectiva Real (Rotación 360°, Notas Musicales y Desarme de Grupos)
function renderVoxel3DCubes(factorA, factorB, resultado, tInfo) {
  const scene = document.getElementById('voxel3DScene');
  if (!scene) return;
  scene.innerHTML = '';

  const chip = document.getElementById('interactiveCountChip');
  if (chip) chip.style.display = 'none';

  let themeClass = 'cube-theme-diamond';
  const mentor = tInfo.mentor || '';
  if (mentor.includes('Iron Man')) themeClass = 'cube-theme-ironman';
  else if (mentor.includes('Hulk')) themeClass = 'cube-theme-hulk';
  else if (mentor.includes('Thor')) themeClass = 'cube-theme-thor';
  else if (mentor.includes('Capitán')) themeClass = 'cube-theme-cap';

  const numGrupos = factorA;
  const itemsPorGrupo = factorB;
  const cubeSize = 44;
  const gapCubes = 12;
  const groupSpacing = Voxel3DState.exploded ? 95 : 62;

  const totalHeight = (numGrupos - 1) * groupSpacing;
  const startY = -totalHeight / 2;

  let globalIndex = 0;

  for (let g = 0; g < numGrupos; g++) {
    const groupEl = document.createElement('div');
    groupEl.className = 'cube-3d-group';
    const currentY = startY + (g * groupSpacing);
    const zOffset = (g - (numGrupos - 1) / 2) * (Voxel3DState.exploded ? 45 : 12);
    groupEl.style.transform = `translate3d(0, ${currentY}px, ${zOffset}px)`;

    const groupWidth = (itemsPorGrupo - 1) * (cubeSize + gapCubes);
    const startX = -groupWidth / 2;

    for (let i = 0; i < itemsPorGrupo; i++) {
      globalIndex++;
      const currentGlobalIndex = globalIndex;
      const currentX = startX + (i * (cubeSize + gapCubes));

      const cube = document.createElement('div');
      cube.className = `cube-3d ${themeClass}`;
      cube.style.transform = `translate3d(${currentX}px, 0, 0)`;
      cube.title = `Cubo #${currentGlobalIndex} de ${resultado} • Grupo ${g + 1} (${itemsPorGrupo} cubos)`;

      const faces = ['front', 'back', 'top', 'bottom', 'left', 'right'];
      faces.forEach(f => {
        const faceEl = document.createElement('div');
        faceEl.className = `cube-face face-${f}`;
        if (f === 'front') {
          faceEl.innerText = `${currentGlobalIndex}`;
        } else if (f === 'top') {
          faceEl.innerHTML = tInfo.emojiObjeto || '💎';
        }
        cube.appendChild(faceEl);
      });

      cube.addEventListener('click', (e) => {
        e.stopPropagation();
        cube.classList.remove('active-tap');
        void cube.offsetWidth;
        cube.classList.add('active-tap');

        if (window.sound && typeof window.sound.playChimeNote === 'function') {
          window.sound.playChimeNote(currentGlobalIndex);
        }

        if (chip) {
          chip.style.display = 'block';
          chip.innerHTML = `🧊 ¡Cubo #${currentGlobalIndex} de ${resultado}! (${factorA} grupos de ${factorB} = <strong style="color:#10B981;">${resultado}</strong>)`;
        }
      });

      groupEl.appendChild(cube);
    }

    scene.appendChild(groupEl);
  }

  aplicarRotacionVoxel3D();
}

function actualizarVistaTabla() {
  const t = AppState.activeTable;
  const k = AppState.activeMultiplier;
  const tInfo = TABLAS_INFO[t];
  if (!tInfo) return;

  // Registrar la tabla como entrenada para desbloquear el SIMCE
  if (AppState.perfil) {
    AppState.perfil.tablasEntrenadas = AppState.perfil.tablasEntrenadas || {};
    AppState.perfil.tablasEntrenadas[t] = true;
    guardarPerfil();
  }

  const factorA = AppState.isCommutativeInverted ? k : t;
  const factorB = AppState.isCommutativeInverted ? t : k;
  const resultado = factorA * factorB;

  // Actualizar Banner del Mentor
  const avatarEl = document.getElementById('mentorAvatarImg');
  const universeTagEl = document.getElementById('mentorUniverseTag');
  const nameTitleEl = document.getElementById('mentorNameTitle');
  const mottoEl = document.getElementById('mentorMottoText');
  const mentorBanner = document.getElementById('tableMentorBanner');

  if (avatarEl) avatarEl.src = tInfo.avatarImg;
  if (universeTagEl) universeTagEl.innerText = tInfo.universo.toUpperCase();
  if (nameTitleEl) nameTitleEl.innerText = `${tInfo.mentor} • ${tInfo.nombre}`;
  if (mottoEl) mottoEl.innerText = `"${tInfo.subtitulo}. ¡Poder de Combate: ${tInfo.poder}!"`;
  if (mentorBanner) {
    mentorBanner.style.borderColor = tInfo.color;
    mentorBanner.style.boxShadow = `0 12px 30px rgba(0, 0, 0, 0.4), 0 0 24px ${tInfo.color}45`;
  }

  // Expresión grande animada
  const expEl = document.getElementById('mathExpressionDisplay');
  if (expEl) {
    expEl.innerHTML = `${factorA} × ${factorB} = <span style="color:#10B981; text-shadow:0 0 12px rgba(16,185,129,0.6);">${resultado}</span>`;
  }

  const nombreTablaEl = document.getElementById('tablaTituloActivo');
  const patronTablaEl = document.getElementById('tablaPatronActivo');
  const trucoTablaEl = document.getElementById('tablaTrucoActivo');
  const tipIconEl = document.getElementById('tipBannerIcon');

  if (nombreTablaEl) nombreTablaEl.innerText = `${tInfo.nombre} • ${tInfo.subtitulo}`;
  if (patronTablaEl) patronTablaEl.innerText = tInfo.patron;
  if (trucoTablaEl) trucoTablaEl.innerText = tInfo.truco;
  if (tipIconEl) tipIconEl.innerText = tInfo.icono || '✨';

  // Renderizar Cubos 3D Voxel Interactivos
  renderVoxel3DCubes(factorA, factorB, resultado, tInfo);

  // Render pictórico de pods animados
  const stage = document.getElementById('groupsStageBox');
  if (stage) {
    stage.innerHTML = '';
    const numGrupos = factorA;
    const itemsPorGrupo = factorB;
    let globalItemCount = 0;

    for (let g = 1; g <= numGrupos; g++) {
      const pod = document.createElement('div');
      pod.className = 'visual-group-pod';
      pod.style.animationDelay = `${(g - 1) * 0.05}s`;
      pod.style.borderColor = tInfo.color;

      const header = document.createElement('div');
      header.className = 'pod-header-label';
      header.innerText = `Pod ${g} • ${itemsPorGrupo} ${tInfo.unidad}`;
      pod.appendChild(header);

      const itemsGrid = document.createElement('div');
      itemsGrid.className = 'pod-items-grid';

      for (let i = 1; i <= itemsPorGrupo; i++) {
        globalItemCount++;
        const currentNum = globalItemCount;
        const itemBtn = document.createElement('span');
        itemBtn.className = 'interactive-item-unit';
        itemBtn.innerText = tInfo.emojiObjeto || '⭐';
        itemBtn.title = `Toca para contar: #${currentNum} (Total: ${resultado})`;

        itemBtn.addEventListener('click', (e) => {
          handleTapItem(e, currentNum, resultado, tInfo);
        });

        itemsGrid.appendChild(itemBtn);
      }

      pod.appendChild(itemsGrid);
      stage.appendChild(pod);
    }
  }

  // Suma iterada con formato claro
  const sumEl = document.getElementById('iteratedSumDisplay');
  if (sumEl) {
    const sumandos = Array(factorA).fill(factorB).join(' + ');
    sumEl.innerHTML = `<strong>Suma iterada:</strong> ${sumandos} = <strong style="color:#059669">${resultado}</strong> ${tInfo.unidad}`;
  }

  // Lista rápida 1..10
  const gridEl = document.getElementById('tableQuickGrid');
  if (gridEl) {
    gridEl.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
      const row = document.createElement('div');
      row.className = `table-row-item ${i === k ? 'highlighted' : ''}`;
      row.id = `tableRowItem_${i}`;
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

// Interacción de toque en cada objeto dentro de los pods
function handleTapItem(event, itemNum, totalResult, tInfo) {
  event.stopPropagation();
  const el = event.currentTarget;
  el.classList.remove('tapped');
  void el.offsetWidth;
  el.classList.add('tapped');

  window.sound.playChimeNote(itemNum);

  // Mostrar chip con el conteo
  const chip = document.getElementById('interactiveCountChip');
  if (chip) {
    chip.style.display = 'block';
    chip.innerHTML = `✨ Objeto #${itemNum} contado • ${totalResult - itemNum === 0 ? '🎉 ¡Cálculo Completo: ' + totalResult + '!' : 'Faltan ' + (totalResult - itemNum) + ' para ' + totalResult}`;
    clearTimeout(chip._timer);
    chip._timer = setTimeout(() => {
      chip.style.display = 'none';
    }, 2800);
  }

  if (itemNum === totalResult) {
    window.sound.playSparkle();
  }
}

// Racha Rítmica Animada (Autoplay de la tabla)
function iniciarRachaRitmica() {
  if (rhythmInterval) {
    clearInterval(rhythmInterval);
    rhythmInterval = null;
  }

  const btn = document.getElementById('btnRhythmWalkthrough');
  if (btn) btn.innerHTML = `<span>⏳ Entrenando Racha...</span>`;

  const tInfo = TABLAS_INFO[AppState.activeTable];
  if (tInfo && tInfo.sonido && typeof window.sound[tInfo.sonido] === 'function') {
    window.sound[tInfo.sonido]();
  }

  let step = 1;
  AppState.activeMultiplier = 1;
  actualizarVistaTabla();
  window.sound.playChimeNote(1);

  rhythmInterval = setInterval(() => {
    step++;
    if (step <= 10) {
      AppState.activeMultiplier = step;
      actualizarVistaTabla();
      window.sound.playChimeNote(step);

      // Resaltar fila rápida
      const rowEl = document.getElementById(`tableRowItem_${step}`);
      if (rowEl) {
        rowEl.classList.add('rhythm-highlight-step');
        setTimeout(() => rowEl.classList.remove('rhythm-highlight-step'), 400);
      }
    } else {
      clearInterval(rhythmInterval);
      rhythmInterval = null;
      window.sound.playMarvelFanfare();
      window.sound.playMinecraftLevelUp();
      lanzarSerpentinasYBrillos();
      if (btn) btn.innerHTML = `<span class="rhythm-icon">⚡</span><span>▶️ Racha Rítmica Animada</span>`;

      mostrarModalCelebracion(
        `🏆 ¡RACHA HEROICA COMPLETADA!`,
        `<div style="text-align:center;">
          <div style="font-size:42px; margin-bottom:10px;">🌟 ⚡ 💎</div>
          <p style="font-size:20px; font-weight:900; color:#059669; margin-bottom:8px;">
            ¡Has dominado el ritmo de la ${tInfo.nombre}!
          </p>
          <p style="font-size:15px; font-weight:700; color:#4B5563;">
            Tu mentor <strong>${tInfo.mentor}</strong> te otorga +30 XP y 3 Diamantes por tu velocidad.
          </p>
        </div>`,
        true
      );
      sumarRecompensa(30, 3);
    }
  }, 650);
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

/* 1. MEMORIA MATEMÁTICA DE HÉROES & BLOQUES */
const HERO_MEMORY_THEMES = [
  { name: "Iron Man", color: "#DC2626", border: "#FDE047", avatar: "IMAGEN/avatar_ironman.svg", icon: "⚡" },
  { name: "Steve Diamante", color: "#0891B2", border: "#A5F3FC", avatar: "IMAGEN/avatar_steve.svg", icon: "⛏️" },
  { name: "Hulk Titánico", color: "#16A34A", border: "#86EFAC", avatar: "IMAGEN/avatar_hulk.svg", icon: "🐾" },
  { name: "Thor Cósmico", color: "#2563EB", border: "#FDE047", avatar: "IMAGEN/avatar_thor.svg", icon: "⚡" },
  { name: "Spider-Man", color: "#E11D48", border: "#818CF8", avatar: "IMAGEN/avatar_spiderman.svg", icon: "🕸️" },
  { name: "Alex Guerrera", color: "#D97706", border: "#FDE68A", avatar: "IMAGEN/avatar_alex.svg", icon: "🏹" }
];

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
    streak: 0,
    locked: false
  };

  const elMoves = document.getElementById('memoryMovesCount');
  const elStreak = document.getElementById('memoryStreakCount');
  const elPairs = document.getElementById('memoryPairsFound');
  if (elMoves) elMoves.innerText = '0';
  if (elStreak) elStreak.innerText = '0x';
  if (elPairs) elPairs.innerText = '0 / 6';

  const paresData = [];
  const operacionesUsadas = new Set();
  while (paresData.length < 6) {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    const opKey = `${a}×${b}`;
    if (!operacionesUsadas.has(opKey)) {
      operacionesUsadas.add(opKey);
      const res = a * b;
      const theme = HERO_MEMORY_THEMES[paresData.length % HERO_MEMORY_THEMES.length];
      paresData.push({
        id: paresData.length,
        op: `${a} × ${b}`,
        res: `${res}`,
        theme
      });
    }
  }

  const deck = [];
  paresData.forEach(par => {
    deck.push({ pairId: par.id, texto: par.op, tipo: 'operacion', theme: par.theme });
    deck.push({ pairId: par.id, texto: par.res, tipo: 'resultado', theme: par.theme });
  });

  deck.sort(() => Math.random() - 0.5);

  deck.forEach((item, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'memory-card';
    cardEl.dataset.index = index;
    cardEl.innerHTML = `
      <div class="memory-card-inner">
        <div class="memory-card-front">
          <div class="card-back-crest">
            <img src="IMAGEN/escudo_marvel.svg" alt="Marvel Shield">
            <span class="card-back-badge">💎 4° BÁSICO</span>
          </div>
        </div>
        <div class="memory-card-back" style="border-color:${item.theme.border};">
          <span class="mem-card-hero-tag" style="background:${item.theme.color}; color:#FFF;">${item.theme.name}</span>
          <img src="${item.theme.avatar}" class="mem-card-icon-avatar" alt="${item.theme.name}">
          <div class="mem-card-main-val">${item.tipo === 'operacion' ? item.texto : '= ' + item.texto}</div>
        </div>
      </div>
    `;

    cardEl.addEventListener('click', () => {
      onMemoryCardClick(cardEl, item);
    });

    board.appendChild(cardEl);
  });
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
    const elMoves = document.getElementById('memoryMovesCount');
    if (elMoves) elMoves.innerText = mg.moves;
    mg.locked = true;

    const [c1, c2] = mg.flippedCards;
    if (c1.data.pairId === c2.data.pairId) {
      setTimeout(() => {
        window.sound.playMinecraftXp();
        c1.el.classList.add('matched');
        c2.el.classList.add('matched');
        mg.matchedPairs++;
        mg.streak = (mg.streak || 0) + 1;

        const elPairs = document.getElementById('memoryPairsFound');
        const elStreak = document.getElementById('memoryStreakCount');
        if (elPairs) elPairs.innerText = `${mg.matchedPairs} / ${mg.totalPairs}`;
        if (elStreak) elStreak.innerText = `${mg.streak}x 🔥`;

        mg.flippedCards = [];
        mg.locked = false;

        if (mg.matchedPairs === mg.totalPairs) {
          window.sound.playMarvelFanfare();
          lanzarSerpentinasYBrillos();
          sumarRecompensa(45, 5);
          desbloquearLogro("memoria_genio");
          mostrarModalCelebracion(
            "🧠 ¡MEMORIA DE SUPERHÉROE MARVEL & MINECRAFT!",
            `¡Increíble agilidad mental! Emparejaste todas las cartas en ${mg.moves} movimientos con una racha de ${mg.streak}x. ¡Ganaste +45 XP y +5 Estrellas!`
          );
        }
      }, 350);
    } else {
      setTimeout(() => {
        window.sound.playError();
        c1.el.classList.remove('flipped');
        c2.el.classList.remove('flipped');
        mg.streak = 0;
        const elStreak = document.getElementById('memoryStreakCount');
        if (elStreak) elStreak.innerText = '0x';
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

/* 4. DETECTIVE MATEMÁTICO: CARPETA CLASIFICADA 3D S.H.I.E.L.D. & ALDEA */
function setDossierFolderState(isOpen) {
  const folder = document.getElementById('shieldDossierFolder');
  const toggleIcon = document.getElementById('folderToggleIcon');
  const toggleText = document.getElementById('folderToggleText');

  if (folder) {
    if (isOpen) {
      folder.classList.add('open');
      folder.classList.remove('closed');
      if (toggleIcon) toggleIcon.innerText = '📁';
      if (toggleText) toggleText.innerText = 'Doblar Carpeta';
    } else {
      folder.classList.remove('open');
      folder.classList.add('closed');
      if (toggleIcon) toggleIcon.innerText = '📂';
      if (toggleText) toggleText.innerText = 'Abrir Carpeta';
    }
  }
}

function iniciarJuegoDetective() {
  AppState.detectiveGame.caseIndex = 0;

  // Listener para la tapa frontal abatible de la carpeta (al tocarla se abre en 3D)
  const flap = document.getElementById('folderFrontFlap');
  if (flap) {
    flap.onclick = () => {
      window.sound.playSparkle();
      setDossierFolderState(true);
    };
  }

  // Listener para el botón manual de abrir/cerrar carpeta
  const btnToggle = document.getElementById('btnToggleFolderManual');
  if (btnToggle) {
    btnToggle.onclick = () => {
      const folder = document.getElementById('shieldDossierFolder');
      const isCurrentlyOpen = folder && folder.classList.contains('open');
      window.sound.playClick();
      setDossierFolderState(!isCurrentlyOpen);
    };
  }

  // Comienza con la carpeta cerrada al inicio del juego
  setDossierFolderState(false);
  cargarCasoDetective();
}

function cargarCasoDetective() {
  const totalCasos = CASOS_DETECTIVE.length;
  const currentNum = (AppState.detectiveGame.caseIndex % totalCasos) + 1;
  const caso = CASOS_DETECTIVE[AppState.detectiveGame.caseIndex % totalCasos];

  // Actualizar títulos e indicadores del expediente
  const levelText = document.getElementById('detectiveCaseLevelText');
  const tabCode = document.getElementById('folderTabCode');
  const flapTitle = document.getElementById('flapMissionTitle');
  const caseTitle = document.getElementById('dossierCaseTitle');
  const stampResult = document.getElementById('caseResolvedStamp');

  if (levelText) levelText.innerText = `CASO #${currentNum} (NIVEL ${currentNum} DE ${totalCasos})`;
  if (tabCode) tabCode.innerText = `EXPEDIENTE SECRETO #00${currentNum}`;
  if (flapTitle) flapTitle.innerText = `MISIÓN: CÓDIGO SECRETO #${currentNum}`;
  if (caseTitle) caseTitle.innerText = `INFORME DE VIGILANCIA: CÓDIGO #${currentNum}`;
  if (stampResult) stampResult.style.display = 'none';

  // Renderizar pistas interceptadas
  const listEl = document.getElementById('detectiveCluesList');
  if (listEl) {
    listEl.innerHTML = '';
    caso.pistas.forEach((pista, idx) => {
      const item = document.createElement('div');
      item.className = 'clue-item-card';
      item.innerHTML = `<span>🔍 Pista ${idx + 1}:</span> <span>${pista}</span>`;
      listEl.appendChild(item);
    });
  }

  // Renderizar botones de sospechosos
  const optsEl = document.getElementById('detectiveSuspectsGrid');
  if (optsEl) {
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

          if (stampResult) {
            stampResult.style.display = 'block';
          }

          sumarRecompensa(35, 4);
          desbloquearLogro("super_detective");

          mostrarModalCelebracion(
            `🕵️ ¡CASO #${currentNum} RESUELTO!`,
            `<div style="text-align:center;">
              <div style="font-size:42px; margin-bottom:8px;">📁 🛡️ 💎 ✔️</div>
              <p style="font-size:16px; font-weight:800; color:#1E3A8A; margin-bottom:12px;">
                ${caso.explicacion}
              </p>
              <div style="background:#ECFDF5; border:2px solid #10B981; padding:10px 14px; border-radius:12px; font-weight:800; color:#065F46;">
                ✨ ¡Ganaste +35 XP y +4 Estrellas! S.H.I.E.L.D. y la Aldea están a salvo.
              </div>
            </div>`
          );

          AppState.detectiveGame.caseIndex++;
          setTimeout(() => {
            // Se dobla suavemente la carpeta y carga el nuevo caso para el siguiente nivel
            setDossierFolderState(false);
            setTimeout(cargarCasoDetective, 450);
          }, 1800);
        } else {
          window.sound.playError();
          mostrarModalCelebracion(
            "🔎 Sospechoso descartado",
            `El número ${opt} no cumple todas las pistas matemáticas. ¡Revisa con lupa las condiciones e inténtalo otra vez!`
          );
        }
      });
      optsEl.appendChild(btn);
    });
  }
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
      if (typeof obtenerDiezPreguntasSimceAleatorias === 'function') {
        SIMCE_PREGUNTAS = obtenerDiezPreguntasSimceAleatorias(AppState.simce.ultimasPreguntasIds || []);
        AppState.simce.ultimasPreguntasIds = SIMCE_PREGUNTAS.map(q => q.id);
      }
      AppState.simce.respuestas = {};
      AppState.simce.entregado = false;
      AppState.simce.currentQuestionIndex = 0;
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

  // Actualizar indicador de corazones Minecraft en el HUD
  const heartsEl = document.getElementById('simceHeartsRow');
  if (heartsEl) {
    let heartsHtml = '';
    for (let i = 0; i < 10; i++) {
      if (AppState.simce.respuestas[i] !== undefined) {
        heartsHtml += '💚'; // Misión completada
      } else if (i === index) {
        heartsHtml += '💛'; // Misión activa
      } else {
        heartsHtml += '🤍'; // Misión pendiente
      }
    }
    heartsEl.innerHTML = heartsHtml;
  }

  document.getElementById('simceQuestionBadge').innerText = `Misión ${index + 1} de 10`;
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
    case 'cofres_manzanas_doradas':
    case 'bolsas_manzanas':
      svgHtml = `
        <svg viewBox="0 0 460 110" width="100%" height="110" style="max-height:110px;">
          <rect x="5" y="5" width="450" height="100" rx="14" fill="#1E293B" stroke="#FDE047" stroke-width="2"/>
          <text x="230" y="24" font-size="13" font-family="'Fredoka', cursive" font-weight="900" fill="#FDE047" text-anchor="middle">📦 4 COFRES DE ROBLE • 6 MANZANAS DORADAS POR COFRE 🍎</text>
          ${[0, 1, 2, 3].map(i => `
            <g transform="translate(${i * 105 + 24}, 32)">
              <rect x="0" y="8" width="85" height="58" rx="8" fill="#854D0E" stroke="#CA8A04" stroke-width="3"/>
              <rect x="36" y="22" width="12" height="14" rx="2" fill="#FEF08A" stroke="#78350F" stroke-width="1.5"/>
              <text x="42" y="54" font-size="20" text-anchor="middle">🍎×6</text>
              <text x="42" y="76" font-size="10" font-weight="bold" fill="#FEF08A" text-anchor="middle">Cofre ${i+1}</text>
            </g>
          `).join('')}
        </svg>
      `;
      break;

    case 'filas_reactores_arc':
    case 'filas_sillas':
      svgHtml = `
        <svg viewBox="0 0 460 110" width="100%" height="110" style="max-height:110px;">
          <rect x="5" y="5" width="450" height="100" rx="14" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
          <text x="230" y="24" font-size="13" font-family="'Fredoka', cursive" font-weight="900" fill="#38BDF8" text-anchor="middle">🔬 HANGAR STARK: 7 FILAS × 8 REACTORES ARC DE VIBRANIUM</text>
          <g transform="translate(42, 42)">
            ${Array.from({length: 7}).map((_, r) => `
              <g transform="translate(${r * 54}, 0)">
                <circle cx="20" cy="14" r="16" fill="#0284C7" stroke="#38BDF8" stroke-width="2"/>
                <circle cx="20" cy="14" r="7" fill="#E0F2FE"/>
                <text x="20" y="18" font-size="10" fill="#0F172A" font-weight="bold" text-anchor="middle">8</text>
                <text x="20" y="44" font-size="9" fill="#93C5FD" font-weight="bold" text-anchor="middle">F${r+1}</text>
              </g>
            `).join('')}
          </g>
        </svg>
      `;
      break;

    case 'bandejas_pociones_magicas':
    case 'bandejas_queques':
      svgHtml = `
        <svg viewBox="0 0 460 110" width="100%" height="110" style="max-height:110px;">
          <rect x="5" y="5" width="450" height="100" rx="14" fill="#1E1B4B" stroke="#A855F7" stroke-width="2"/>
          <text x="230" y="24" font-size="13" font-family="'Fredoka', cursive" font-weight="900" fill="#C084FC" text-anchor="middle">⚡ ARSENAL DE ASGARD: 5 BANDEJAS × 9 POCIONES DE CURACIÓN</text>
          ${[0, 1, 2, 3, 4].map(i => `
            <g transform="translate(${i * 86 + 18}, 34)">
              <rect x="0" y="6" width="76" height="54" rx="8" fill="#312E81" stroke="#818CF8" stroke-width="2.5"/>
              <text x="38" y="38" font-size="22" text-anchor="middle">🧪×9</text>
              <text x="38" y="54" font-size="10" font-weight="bold" fill="#DDD6FE" text-anchor="middle">Bandeja ${i+1}</text>
            </g>
          `).join('')}
        </svg>
      `;
      break;

    case 'redes_spiderman_creepers':
    case 'sobres_laminas':
      svgHtml = `
        <svg viewBox="0 0 460 110" width="100%" height="110" style="max-height:110px;">
          <rect x="5" y="5" width="450" height="100" rx="14" fill="#0F172A" stroke="#EF4444" stroke-width="2"/>
          <text x="230" y="24" font-size="13" font-family="'Fredoka', cursive" font-weight="900" fill="#F87171" text-anchor="middle">🕷️ REDES DE SPIDER-MAN: 6 REDES × 5 CREEPERS ATRAPADOS</text>
          ${[0, 1, 2, 3, 4, 5].map(i => `
            <g transform="translate(${i * 72 + 16}, 34)">
              <rect x="0" y="4" width="62" height="58" rx="8" fill="#1E293B" stroke="#DC2626" stroke-width="2"/>
              <text x="31" y="36" font-size="22" text-anchor="middle">🕸️×5</text>
              <text x="31" y="54" font-size="10" font-weight="bold" fill="#FCA5A5" text-anchor="middle">Red ${i+1}</text>
            </g>
          `).join('')}
        </svg>
      `;
      break;

    case 'mina_galerias_diamante':
    case 'huerta_lechugas':
      svgHtml = `
        <svg viewBox="0 0 460 110" width="100%" height="110" style="max-height:110px;">
          <rect x="5" y="5" width="450" height="100" rx="14" fill="#090D16" stroke="#22D3EE" stroke-width="2"/>
          <text x="230" y="24" font-size="13" font-family="'Fredoka', cursive" font-weight="900" fill="#22D3EE" text-anchor="middle">💎 MINA SUBTERRÁNEA: 8 GALERÍAS × 6 BLOQUES DE DIAMANTE</text>
          <g transform="translate(18, 38)">
            ${Array.from({length: 8}).map((_, r) => `
              <g transform="translate(${r * 54}, 0)">
                <rect x="2" y="2" width="46" height="54" rx="6" fill="#1E293B" stroke="#0891B2" stroke-width="2"/>
                <text x="25" y="32" font-size="20" text-anchor="middle">💎</text>
                <text x="25" y="48" font-size="9" fill="#67E8F9" font-weight="bold" text-anchor="middle">×6</text>
              </g>
            `).join('')}
          </g>
        </svg>
      `;
      break;

    case 'asientos_quinjet_marvel':
    case 'bus_escolar':
      svgHtml = `
        <svg viewBox="0 0 460 110" width="100%" height="110" style="max-height:110px;">
          <rect x="5" y="5" width="450" height="100" rx="14" fill="#0F172A" stroke="#3B82F6" stroke-width="2"/>
          <text x="230" y="24" font-size="13" font-family="'Fredoka', cursive" font-weight="900" fill="#93C5FD" text-anchor="middle">🚀 QUINJET VENGADORES: 9 FILAS × 4 ASIENTOS BLINDADOS</text>
          <g transform="translate(20, 36)">
            ${Array.from({length: 9}).map((_, r) => `
              <g transform="translate(${r * 48}, 0)">
                <rect x="2" y="2" width="40" height="56" rx="6" fill="#1E3A8A" stroke="#60A5FA" stroke-width="1.5"/>
                <text x="22" y="26" font-size="14" text-anchor="middle">💺</text>
                <text x="22" y="44" font-size="11" fill="#FFFFFF" font-weight="bold" text-anchor="middle">4</text>
                <text x="22" y="54" font-size="8" fill="#93C5FD" text-anchor="middle">F${r+1}</text>
              </g>
            `).join('')}
          </g>
        </svg>
      `;
      break;

    case 'boveda_vibranium_wakanda':
    case 'ahorro_alcancia':
      svgHtml = `
        <svg viewBox="0 0 460 110" width="100%" height="110" style="max-height:110px;">
          <rect x="5" y="5" width="450" height="100" rx="14" fill="#1E1B4B" stroke="#D946EF" stroke-width="2"/>
          <text x="230" y="24" font-size="13" font-family="'Fredoka', cursive" font-weight="900" fill="#F0ABFC" text-anchor="middle">🐾 BÓVEDA DE WAKANDA: 7 SEMANAS × 300 LINGOTES DE VIBRANIUM</text>
          <g transform="translate(25, 36)">
            ${Array.from({length: 7}).map((_, r) => `
              <g transform="translate(${r * 58}, 0)">
                <rect x="2" y="2" width="50" height="56" rx="8" fill="#4C1D95" stroke="#C084FC" stroke-width="2"/>
                <text x="27" y="26" font-size="14" text-anchor="middle">🪙</text>
                <text x="27" y="42" font-size="10" fill="#F5D0FE" font-weight="bold" text-anchor="middle">300</text>
                <text x="27" y="53" font-size="8" fill="#DDD6FE" text-anchor="middle">Sem ${r+1}</text>
              </g>
            `).join('')}
          </g>
        </svg>
      `;
      break;

    case 'cajas_flechas_alex':
    case 'cajas_lapices':
      svgHtml = `
        <svg viewBox="0 0 460 110" width="100%" height="110" style="max-height:110px;">
          <rect x="5" y="5" width="450" height="100" rx="14" fill="#0F172A" stroke="#10B981" stroke-width="2"/>
          <text x="230" y="24" font-size="13" font-family="'Fredoka', cursive" font-weight="900" fill="#34D399" text-anchor="middle">🏹 ARMERÍA DE ALEX: 8 CAJAS DE HIERRO × 10 FLECHAS MÁGICAS</text>
          <g transform="translate(18, 38)">
            ${Array.from({length: 8}).map((_, r) => `
              <g transform="translate(${r * 54}, 0)">
                <rect x="2" y="2" width="46" height="54" rx="6" fill="#064E3B" stroke="#10B981" stroke-width="2"/>
                <text x="25" y="30" font-size="18" text-anchor="middle">🏹</text>
                <text x="25" y="48" font-size="11" fill="#A7F3D0" font-weight="bold" text-anchor="middle">×10</text>
              </g>
            `).join('')}
          </g>
        </svg>
      `;
      break;

    case 'patrulla_portal_nether':
    case 'pista_atletica':
      svgHtml = `
        <svg viewBox="0 0 460 110" width="100%" height="110" style="max-height:110px;">
          <rect x="5" y="5" width="450" height="100" rx="14" fill="#180828" stroke="#E11D48" stroke-width="2"/>
          <text x="230" y="24" font-size="13" font-family="'Fredoka', cursive" font-weight="900" fill="#FB7185" text-anchor="middle">⭐ PATRULLA PORTAL NETHER: 3 SUPERHÉROES × 7 VUELTAS COMPLETAS</text>
          <g transform="translate(60, 36)">
            ${['Capitana Marvel ⭐', 'Thor ⚡', 'Hulk Smash 💚'].map((hero, i) => `
              <g transform="translate(${i * 120}, 0)">
                <rect x="0" y="2" width="105" height="56" rx="10" fill="#4C0519" stroke="#F43F5E" stroke-width="2"/>
                <text x="52" y="26" font-size="12" fill="#FFE4E6" font-weight="bold" text-anchor="middle">${hero}</text>
                <text x="52" y="48" font-size="16" fill="#FDE047" font-weight="bold" text-anchor="middle">7 Vueltas</text>
              </g>
            `).join('')}
          </g>
        </svg>
      `;
      break;

    case 'estantes_libros_strange':
    case 'repisa_libros':
      svgHtml = `
        <svg viewBox="0 0 460 110" width="100%" height="110" style="max-height:110px;">
          <rect x="5" y="5" width="450" height="100" rx="14" fill="#0A0F1D" stroke="#8B5CF6" stroke-width="2"/>
          <text x="230" y="24" font-size="13" font-family="'Fredoka', cursive" font-weight="900" fill="#A78BFA" text-anchor="middle">📖 SANCTUM SANCTORUM: 6 ESTANTES × 8 LIBROS DE ENCANTAMIENTO</text>
          <g transform="translate(24, 38)">
            ${Array.from({length: 6}).map((_, r) => `
              <g transform="translate(${r * 70}, 0)">
                <rect x="2" y="2" width="62" height="54" rx="8" fill="#2E1065" stroke="#A855F7" stroke-width="2"/>
                <text x="33" y="30" font-size="20" text-anchor="middle">📚</text>
                <text x="33" y="48" font-size="11" fill="#DDD6FE" font-weight="bold" text-anchor="middle">×8 Libros</text>
              </g>
            `).join('')}
          </g>
        </svg>
      `;
      break;

    default:
      svgHtml = `<div style="font-size:32px;">📐 🔢 💎</div>`;
  }

  container.innerHTML = svgHtml;
}

function evaluarSimce() {
  const totalPreguntas = SIMCE_PREGUNTAS.length;
  const respondidas = Object.keys(AppState.simce.respuestas).length;

  if (respondidas < totalPreguntas) {
    window.sound.playError();
    const faltantes = totalPreguntas - respondidas;
    let primeraSinResponder = 0;
    for (let i = 0; i < totalPreguntas; i++) {
      if (AppState.simce.respuestas[i] === undefined) {
        primeraSinResponder = i;
        break;
      }
    }

    mostrarModalCelebracion(
      "⚠️ ¡DEBES COMPLETAR TODO EL ENSAYO!",
      `<div style="text-align:center;">
        <div style="font-size:44px; margin-bottom:10px;">📝 ⏳ ❌</div>
        <p style="font-size:18px; font-weight:800; color:#DC2626; margin-bottom:10px;">
          ¡No puedes entregar el ensayo todavía!
        </p>
        <p style="font-size:15px; font-weight:700; color:#1E293B; margin-bottom:14px;">
          Has respondido <strong>${respondidas} de ${totalPreguntas}</strong> preguntas. 
          Debes contestar <strong>todas las 10 preguntas</strong> para poder finalizar y obtener tu puntaje oficial SIMCE.
        </p>
        <div style="background:#FEE2E2; border:2px solid #EF4444; border-radius:10px; padding:10px; color:#991B1B; font-weight:800; margin-bottom:16px;">
          Te faltan ${faltantes} ${faltantes === 1 ? 'pregunta' : 'preguntas'} por responder.
        </div>
        <button type="button" class="btn-stepper" id="btnIrAPreguntaFaltante" style="width:auto; padding:10px 22px; border-radius:999px; background:#2563EB; color:#FFF; font-size:15px; font-weight:900;">
          ✏️ Ir a Responder la Pregunta ${primeraSinResponder + 1}
        </button>
      </div>`,
      true
    );

    setTimeout(() => {
      const btnIr = document.getElementById('btnIrAPreguntaFaltante');
      if (btnIr) {
        btnIr.onclick = () => {
          cerrarModalCelebracion();
          mostrarPreguntaSimce(primeraSinResponder);
        };
      }
    }, 100);
    return;
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

// ============================================================================
// PARALLAX 3D REACTIVO AL MOVIMIENTO DEL MOUSE PARA EL FONDO DE BATALLA
// ============================================================================
function initMouseBackgroundParallax() {
  const panoImg = document.getElementById('panoramaBattleImg');
  const clouds = document.querySelector('.slowmo-floating-clouds');
  if (!panoImg) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener('mousemove', (e) => {
    const w = window.innerWidth || 1920;
    const h = window.innerHeight || 1080;
    // Coordenadas normalizadas entre -0.5 y 0.5 con el centro de la pantalla en 0
    targetX = (e.clientX / w) - 0.5;
    targetY = (e.clientY / h) - 0.5;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });

  function animLoop() {
    // LERP smoothing para movimiento continuo, orgánico y sedoso en cámara lenta
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    // Desplazamiento dinámico y rotación 3D del póster escénico de batalla
    const shiftX = currentX * -44; // px
    const shiftY = currentY * -28; // px
    const rotY = currentX * 10;    // deg
    const rotX = currentY * -8;    // deg

    panoImg.style.transform = `scale(1.15) translate3d(${shiftX.toFixed(2)}px, ${shiftY.toFixed(2)}px, 0) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;

    if (clouds) {
      clouds.style.transform = `translate3d(${(currentX * 50).toFixed(2)}px, ${(currentY * 30).toFixed(2)}px, 0)`;
    }

    requestAnimationFrame(animLoop);
  }

  requestAnimationFrame(animLoop);
}

