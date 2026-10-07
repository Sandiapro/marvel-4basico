/**
 * SISTEMA DE SONIDOS SINTETIZADOS - MIS TABLAS
 * Efectos de sonido estilo MARVEL & MINECRAFT con Web Audio API
 * 100% nativo, sin archivos externos ni dependencias.
 */

class SoundSystem {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('mis_tablas_muted') === 'true';
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  isMuted() {
    return this.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('mis_tablas_muted', this.muted);
    return this.muted;
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1, delay = 0) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const startTime = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(gainVal, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  // Clic general de botón
  playClick() {
    this.playTone(620, 'triangle', 0.08, 0.08);
  }

  // =========================================================================
  // SONIDOS ESTILO MINECRAFT
  // =========================================================================

  // Orbe de Experiencia Minecraft (XP Orb Ding: plink agudo y cristalino)
  playMinecraftXp() {
    if (this.muted) return;
    this.init();
    // Sonido icónico de recoger orbe de XP verde
    const pitch = 850 + Math.random() * 200;
    this.playTone(pitch, 'sine', 0.12, 0.14, 0.0);
    this.playTone(pitch * 1.5, 'triangle', 0.08, 0.08, 0.03);
  }

  // Pop de recoger ítem / bloque de Minecraft
  playMinecraftPop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(250, now);
    osc.frequency.exponentialRampToValueAtTime(650, now + 0.09);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Campana / Yunque de Minecraft
  playMinecraftAnvil() {
    if (this.muted) return;
    this.init();
    this.playTone(1200, 'sine', 0.4, 0.12, 0.0);
    this.playTone(1760, 'sine', 0.5, 0.09, 0.05);
  }

  // Subida de nivel al estilo Minecraft (Level Up Ding Chime)
  playMinecraftLevelUp() {
    if (this.muted) return;
    this.init();
    // Melodía clásica de nivel de Minecraft: notas arpegiadas limpias
    const notes = [440, 554, 659, 880, 1108];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 0.22, 0.15, idx * 0.09);
    });
  }

  // =========================================================================
  // SONIDOS ESTILO MARVEL
  // =========================================================================

  // Disparo de Repulsor Iron Man / Rayo Láser Heroico
  playMarvelLaser() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.18);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  // Rebote de Escudo Capitán América (Vibranium Ping metálico)
  playMarvelShield() {
    if (this.muted) return;
    this.init();
    this.playTone(980, 'triangle', 0.25, 0.15, 0.0);
    this.playTone(1470, 'sine', 0.35, 0.12, 0.02);
  }

  // Fanfarria Épica de Los Vengadores / Victoria Marvel
  playMarvelFanfare() {
    if (this.muted) return;
    this.init();
    // Tema triunfal heroico (Avengers Brass Theme)
    const notes = [392, 523.25, 659.25, 783.99, 1046.50, 1174.66, 1318.51];
    const times = [0.0, 0.12, 0.24, 0.38, 0.54, 0.72, 0.92];
    const lens  = [0.12, 0.12, 0.14, 0.16, 0.18, 0.22, 0.60];

    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', lens[idx], 0.18, times[idx]);
    });
  }

  // Brillos mágicos y serpentinas estelares (Chispas)
  playSparkle() {
    if (this.muted) return;
    this.init();
    const sparkles = [1318.51, 1567.98, 1760.00, 2093.00, 2349.32, 2637.02];
    sparkles.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 0.12, 0.08, idx * 0.05);
    });
  }

  // Compatibilidad con funciones del sistema
  playSuccess() {
    this.playMinecraftXp();
    setTimeout(() => this.playSparkle(), 60);
  }

  playError() {
    if (this.muted) return;
    this.init();
    this.playTone(280, 'sawtooth', 0.15, 0.09, 0.0);
    this.playTone(210, 'sawtooth', 0.22, 0.08, 0.10);
  }

  playCardFlip() {
    this.playMinecraftPop();
  }

  playPop() {
    this.playMinecraftPop();
  }

  playFanfare() {
    this.playMarvelFanfare();
  }

  playLevelUp() {
    this.playMinecraftLevelUp();
  }
}

// Instancia global
window.sound = new SoundSystem();
