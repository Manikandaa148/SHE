/**
 * =========================================================================
 * ROMANTIC AUDIO ENGINE (Web Audio API + Audio File Support)
 * =========================================================================
 * Automatically plays real audio files if available in /assets/,
 * and provides beautiful procedural synthesized fallbacks so everything
 * sounds magical right out of the box even before custom MP3s are added!
 */

class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgmAudio = null;
    this.voiceAudio = null;
    this.heartbeatTimer = null;
    this.isHeartbeatPlaying = false;
    this.bgmSynthTimer = null;
    this.isBgmPlaying = false;
    this.synthBgmStep = 0;
  }

  // Initialize or resume the Web Audio Context after user interaction
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

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgmAudio) {
      this.bgmAudio.muted = this.isMuted;
    }
    if (this.voiceAudio) {
      this.voiceAudio.muted = this.isMuted;
    }
    if (this.isMuted) {
      this.stopHeartbeat();
    }
    return this.isMuted;
  }

  // Subtle crystal PIN keypad click
  playPinClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200 + Math.random() * 200, now);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // Soft gentle wrong PIN sound (warm sad minor chime)
  playWrongCode() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [349.23, 311.13]; // F4 to Eb4
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime + (i * 0.12);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.3);
      });
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // Cinematic magical unlock chime chord (ascending romantic harp/sparkle)
  playUnlock() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
      chord.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime + (i * 0.07);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.3);
      });
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // Celebratory POP! sound for confetti & party poppers
  playConfettiPop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Low pop oscillator
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320 + Math.random() * 60, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);

      // Sparkle high chime
      const sparkle = this.ctx.createOscillator();
      const sparkleGain = this.ctx.createGain();
      sparkle.type = 'sine';
      sparkle.frequency.setValueAtTime(1400 + Math.random() * 800, now + 0.03);
      sparkleGain.gain.setValueAtTime(0.08, now + 0.03);
      sparkleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      sparkle.connect(sparkleGain);
      sparkleGain.connect(this.ctx.destination);

      sparkle.start(now + 0.03);
      sparkle.stop(now + 0.45);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // Realistic deep dual-thump heartbeat (lub-dub)
  triggerHeartbeatPulse() {
    if (this.isMuted || !this.isHeartbeatPlaying) return;
    this.init();
    if (!this.ctx) return;

    try {
      const playThump = (timeOffset, intensity, freq) => {
        const now = this.ctx.currentTime + timeOffset;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.15);

        gain.gain.setValueAtTime(intensity, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.2);
      };

      // Lub
      playThump(0, 0.35, 68);
      // Dub
      playThump(0.18, 0.22, 55);
    } catch (e) {
      console.warn("Heartbeat audio error:", e);
    }
  }

  startHeartbeat(heartbeatAudioPath) {
    if (this.isHeartbeatPlaying) return;
    this.isHeartbeatPlaying = true;

    // Check if an actual audio file is provided and loaded
    if (heartbeatAudioPath) {
      const audio = new Audio(heartbeatAudioPath);
      audio.loop = true;
      audio.play().then(() => {
        this.heartbeatAudioEl = audio;
      }).catch(() => {
        // Fallback to procedural heartbeat
        this.runProceduralHeartbeat();
      });
    } else {
      this.runProceduralHeartbeat();
    }
  }

  runProceduralHeartbeat() {
    this.triggerHeartbeatPulse();
    this.heartbeatTimer = setInterval(() => {
      if (!this.isHeartbeatPlaying) {
        clearInterval(this.heartbeatTimer);
        return;
      }
      this.triggerHeartbeatPulse();
    }, 1150); // ~52 bpm romantic calm heartbeat
  }

  stopHeartbeat() {
    this.isHeartbeatPlaying = false;
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    if (this.heartbeatAudioEl) {
      this.heartbeatAudioEl.pause();
      this.heartbeatAudioEl = null;
    }
  }

  // Letter opening paper rustle & soft chime
  playLetterOpen() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Warm chime
      [880, 1174.66, 1396.91].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.1, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.85);
      });
    } catch (e) {
      console.warn("Letter audio error:", e);
    }
  }

  // Surprise gift box opening pop & flourish
  playGiftOpen() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      this.playConfettiPop();
      const notes = [587.33, 739.99, 880, 1174.66, 1479.98];
      const now = this.ctx.currentTime + 0.08;
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.12, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.95);
      });
    } catch (e) {
      console.warn("Gift open error:", e);
    }
  }

  // Triumphant romantic YES heart explosion
  playYesCelebration() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const melody = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
      const now = this.ctx.currentTime;
      melody.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);

        gain.gain.setValueAtTime(0.18, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 1.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 1.5);
      });
    } catch (e) {
      console.warn("Yes celebration error:", e);
    }
  }

  // Play background music (Pesamale.mp3 in repeat mode)
  startBgm(bgmAudioPath) {
    if (this.bgmAudio && !this.bgmAudio.paused) return;
    this.init();

    const tryPaths = [
      bgmAudioPath,
      "assets/Pesamale.mp3",
      "Pesamale.mp3"
    ].filter(Boolean);

    const playNextBgm = (index) => {
      if (index >= tryPaths.length) {
        console.log("Pesamale.mp3 not found or blocked, starting romantic music-box synth fallback");
        this.startProceduralBgm();
        return;
      }

      const currentPath = tryPaths[index];
      const audio = new Audio(currentPath);
      audio.loop = true; // Repeat mode!
      audio.volume = 0.65;
      audio.muted = this.isMuted;

      audio.play().then(() => {
        this.bgmAudio = audio;
        this.isBgmPlaying = true;
        console.log("Playing Pesamale.mp3 in repeat mode from:", currentPath);
      }).catch(err => {
        console.warn("Could not play BGM path:", currentPath, err.message);
        playNextBgm(index + 1);
      });
    };

    playNextBgm(0);
  }

  // Gentle procedural romantic music box lullaby (pentatonic, soft sine, 0 CPU strain)
  startProceduralBgm() {
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;
    this.init();

    // Canon in D / Romantic Pentatonic sequence
    const notes = [
      523.25, 659.25, 783.99, 1046.50,
      440.00, 659.25, 880.00,
      392.00, 587.33, 783.99,
      523.25, 659.25, 880.00, 1046.50
    ];

    const playStep = () => {
      if (!this.isBgmPlaying || this.isMuted || !this.ctx) return;
      const freq = notes[this.synthBgmStep % notes.length];
      this.synthBgmStep++;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.9);
      } catch (e) {}
    };

    this.bgmSynthTimer = setInterval(playStep, 900);
  }

  stopBgm() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.bgmAudio = null;
    }
    this.isBgmPlaying = false;
    if (this.bgmSynthTimer) {
      clearInterval(this.bgmSynthTimer);
      this.bgmSynthTimer = null;
    }
  }

  // Play birthday voice / audio message
  playBirthdayAudio(voiceAudioPath, onEnded, forceRestart = false) {
    if (!voiceAudioPath) return;
    this.init();

    if (this.voiceAudio && !this.voiceAudio.paused && !forceRestart) {
      return; // Already playing
    }

    if (this.voiceAudio) {
      try {
        this.voiceAudio.pause();
        this.voiceAudio.currentTime = 0;
      } catch (e) {}
    }

    const tryPaths = [
      voiceAudioPath,
      "assets/happy-birthday.ogg",
      "happy-birthday.ogg",
      "happy birthdat.ogg"
    ];

    const playNext = (index) => {
      if (index >= tryPaths.length) {
        console.warn("All audio paths failed. Playing celebratory chime chord fallback.");
        this.playUnlock();
        if (onEnded) onEnded();
        return;
      }

      const currentPath = tryPaths[index];
      const audio = new Audio(currentPath);
      audio.volume = 1.0;
      audio.muted = this.isMuted;

      audio.onended = () => {
        if (onEnded) onEnded();
        const indicator = document.getElementById('celebration-audio-indicator');
        if (indicator) indicator.classList.remove('playing');
      };

      audio.play().then(() => {
        this.voiceAudio = audio;
        const indicator = document.getElementById('celebration-audio-indicator');
        if (indicator) indicator.classList.add('playing');
        console.log("Playing birthday audio from:", currentPath);
      }).catch(err => {
        console.warn("Could not play path:", currentPath, err.message);
        playNext(index + 1);
      });
    };

    playNext(0);
  }

  replayBirthdayAudio() {
    if (this.voiceAudio) {
      this.voiceAudio.currentTime = 0;
      this.voiceAudio.play().catch(() => {});
      const indicator = document.getElementById('celebration-audio-indicator');
      if (indicator) indicator.classList.add('playing');
    } else {
      this.playBirthdayAudio("assets/happy-birthday.ogg", null, true);
    }
  }
}

// Global instance
window.romanticAudio = new RomanticAudioEngine();
