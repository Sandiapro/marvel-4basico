/**
 * SISTEMA DE SONIDOS SINTETIZADOS - MIS TABLAS
 * Efectos de sonido épicos MARVEL & MINECRAFT con Web Audio API
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

  playClick() {
    this.playTone(620, 'triangle', 0.08, 0.08);
  }

  // =========================================================================
  // EFECTOS CINEMÁTICOS DE SUPERHÉROES MARVEL
  // =========================================================================

  // 1. HULK: Rugido sísmico y temblor de tierra
  playHulkRoar() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Sub-oscilador para impacto en el pecho
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.45);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);

    // Ruido rugiente añadido
    this.playNoise(0.35, 0.18, 0.05);
  }

  // 2. BLACK PANTHER: Tambor de guerra y grito de Wakanda
  playWakandaCry() {
    if (this.muted) return;
    this.init();
    // Golpe doble de tambor tribal + vibranium
    this.playTone(180, 'triangle', 0.18, 0.22, 0.0);
    this.playTone(140, 'triangle', 0.22, 0.25, 0.12);
    this.playTone(880, 'sine', 0.35, 0.12, 0.18);
  }

  // 3. IRON MAN: Secuencia de Jarvis + Carga de Repulsor
  playJarvisChime() {
    if (this.muted) return;
    this.init();
    // Chime futurista de interfaz holográfica
    this.playTone(1200, 'sine', 0.08, 0.12, 0.0);
    this.playTone(1600, 'sine', 0.09, 0.14, 0.07);
    this.playTone(2400, 'sine', 0.16, 0.16, 0.15);
    // Láser
    setTimeout(() => this.playMarvelLaser(), 180);
  }

  // 4. THOR: Trueno atronador y chispas de relámpago
  playThunderClap() {
    if (this.muted) return;
    this.init();
    this.playTone(1100, 'sawtooth', 0.12, 0.18, 0.0);
    this.playTone(440, 'triangle', 0.25, 0.20, 0.05);
    this.playNoise(0.6, 0.22, 0.08);
  }

  // 5. SPIDER-MAN: Disparo de telaraña "Thwip-Thwip"
  playWebThwip() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.08);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);

    // Segundo "thwip" rápido
    setTimeout(() => {
      if (!this.ctx) return;
      const n2 = this.ctx.currentTime;
      const o2 = this.ctx.createOscillator();
      const g2 = this.ctx.createGain();
      o2.type = 'sine';
      o2.frequency.setValueAtTime(400, n2);
      o2.frequency.exponentialRampToValueAtTime(2100, n2 + 0.09);
      g2.gain.setValueAtTime(0.16, n2);
      g2.gain.exponentialRampToValueAtTime(0.001, n2 + 0.09);
      o2.connect(g2);
      g2.connect(this.ctx.destination);
      o2.start(n2);
      o2.stop(n2 + 0.09);
    }, 90);
  }

  // 6. CAPITÁN AMÉRICA: Rebote y resonancia de escudo
  playCapShieldRing() {
    if (this.muted) return;
    this.init();
    this.playTone(880, 'triangle', 0.4, 0.18, 0.0);
    this.playTone(1320, 'sine', 0.5, 0.14, 0.02);
    this.playTone(1760, 'sine', 0.6, 0.10, 0.04);
  }

  // 7. CREEPER: Silbido "Tssssss" y explosión "BOOM"
  playCreeperExplode() {
    if (this.muted) return;
    this.init();
    // Silbido de fusible Tsssss
    this.playNoise(0.5, 0.12, 0.0);
    // Boom explosivo
    setTimeout(() => {
      this.playTone(80, 'sawtooth', 0.4, 0.25, 0.0);
      this.playNoise(0.4, 0.28, 0.02);
    }, 450);
  }

  // 8. MINECRAFT SWORD HIT: Golpe de espada de diamante
  playSwordHit() {
    if (this.muted) return;
    this.init();
    this.playTone(450, 'sawtooth', 0.1, 0.14, 0.0);
    this.playTone(900, 'sine', 0.12, 0.12, 0.02);
  }

  // Generador de Ruido Blanco para impactos y explosiones
  playNoise(duration = 0.3, volume = 0.1, delay = 0) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime + delay);

    const gain = this.ctx.createGain();
    const startTime = this.ctx.currentTime + delay;
    gain.gain.setValueAtTime(volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(startTime);
  }

  // =========================================================================
  // SONIDOS DE INTERFAZ MINECRAFT & MARVEL
  // =========================================================================
  playMinecraftXp() {
    if (this.muted) return;
    this.init();
    const pitch = 850 + Math.random() * 200;
    this.playTone(pitch, 'sine', 0.12, 0.15, 0.0);
    this.playTone(pitch * 1.5, 'triangle', 0.08, 0.09, 0.03);
  }

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

  playMinecraftLevelUp() {
    if (this.muted) return;
    this.init();
    const notes = [440, 554, 659, 880, 1108];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 0.22, 0.15, idx * 0.09);
    });
  }

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

  playMarvelShield() {
    this.playCapShieldRing();
  }

  playMarvelFanfare() {
    if (this.muted) return;
    this.init();
    // Tema triunfal heroico Avengers
    const notes = [392, 523.25, 659.25, 783.99, 1046.50, 1174.66, 1318.51];
    const times = [0.0, 0.12, 0.24, 0.38, 0.54, 0.72, 0.92];
    const lens  = [0.12, 0.12, 0.14, 0.16, 0.18, 0.22, 0.60];

    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', lens[idx], 0.18, times[idx]);
    });
  }

  playSparkle() {
    if (this.muted) return;
    this.init();
    const sparkles = [1318.51, 1567.98, 1760.00, 2093.00, 2349.32, 2637.02];
    sparkles.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 0.12, 0.08, idx * 0.05);
    });
  }

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
