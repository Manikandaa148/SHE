/**
 * =========================================================================
 * ROMANTIC PARTICLE & CELEBRATION ENGINE
 * =========================================================================
 * High-performance, GPU-accelerated, lightweight canvas particle system.
 * Designed specifically for mobile: auto-caps active particle counts,
 * cleans up immediately, and respects prefers-reduced-motion.
 */

class RomanticParticleEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.balloons = [];
    this.isRunning = false;
    this.ambientRunning = false;
    this.animFrameId = null;
    this.lastTime = 0;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  init(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });
  }

  resize() {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    if (this.ctx) {
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  // Draw a smooth vector heart on canvas
  drawHeart(ctx, x, y, size, color, alpha = 1, rotation = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.fillStyle = color;
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.15);
    ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Draw a realistic rose petal
  drawPetal(ctx, x, y, size, color, alpha = 1, rotation = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.5, size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Draw a celebration balloon
  drawBalloon(ctx, b) {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(Math.sin(b.wobble) * 0.15);
    ctx.globalAlpha = b.alpha;

    // Balloon body
    ctx.fillStyle = b.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, b.size * 0.75, b.size, 0, 0, Math.PI * 2);
    ctx.fill();

    // Balloon knot
    ctx.beginPath();
    ctx.moveTo(-4, b.size);
    ctx.lineTo(4, b.size);
    ctx.lineTo(0, b.size + 6);
    ctx.closePath();
    ctx.fill();

    // String
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, b.size + 6);
    ctx.quadraticCurveTo(Math.sin(b.wobble) * 10, b.size + 25, 0, b.size + 45);
    ctx.stroke();

    ctx.restore();
  }

  // Draw sparkle star
  drawStar(ctx, x, y, size, color, alpha = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      ctx.lineTo(0, size);
      ctx.quadraticCurveTo(0, 0, -size, 0);
      ctx.rotate(Math.PI / 2);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Spawn a floating heart on touch/click anywhere
  spawnTapHeart(x, y) {
    if (this.prefersReducedMotion) return;
    const colors = ['#ff1744', '#ff2a55', '#e60039', '#d50000', '#ff4d6d', '#ffffff'];
    const count = 4;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        type: 'heart',
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 3,
        vy: -Math.random() * 3.5 - 1.5,
        size: 10 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 1,
        decay: 0.02 + Math.random() * 0.015,
        rotation: (Math.random() - 0.5) * 0.5,
        rotSpeed: (Math.random() - 0.5) * 0.04
      });
    }
    this.startLoop();
  }

  // Ambient floating background hearts for the PIN screen
  startAmbientHearts() {
    this.ambientRunning = true;
    this.startLoop();
  }

  stopAmbientHearts() {
    this.ambientRunning = false;
  }

  // Unlock transition burst
  burstUnlockHearts(centerX, centerY) {
    if (this.prefersReducedMotion) return;
    const colors = ['#ff1744', '#e60039', '#ff2a55', '#d50000', '#ff4081', '#ffd700', '#ffffff'];
    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 8;
      this.particles.push({
        type: Math.random() > 0.35 ? 'heart' : 'star',
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 10 + Math.random() * 14,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 1,
        decay: 0.012 + Math.random() * 0.015,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.1
      });
    }
    this.startLoop();
  }

  // Birthday celebration: party poppers, confetti, rose petals, balloons, sparkles
  launchCelebration(durationMs = 5000) {
    if (this.prefersReducedMotion) return;
    const startTime = performance.now();
    const colors = ['#ff1744', '#e60039', '#E83C91', '#f062a4', '#ffd700', '#ffffff', '#ff385c'];

    // Spawn balloons
    for (let b = 0; b < 10; b++) {
      this.balloons.push({
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50 + Math.random() * 200,
        vy: -1.2 - Math.random() * 1.8,
        size: 22 + Math.random() * 16,
        color: colors[Math.floor(Math.random() * colors.length)],
        wobble: Math.random() * Math.PI,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        alpha: 0.95
      });
    }

    // Interval to spawn bursts
    const burstInterval = setInterval(() => {
      if (performance.now() - startTime > durationMs) {
        clearInterval(burstInterval);
        return;
      }

      // Left and right popper origins
      const origins = [
        { x: window.innerWidth * 0.15, y: window.innerHeight * 0.75, angleBase: -Math.PI / 3 },
        { x: window.innerWidth * 0.85, y: window.innerHeight * 0.75, angleBase: -2 * Math.PI / 3 },
        { x: window.innerWidth * 0.5, y: window.innerHeight * 0.45, angleBase: -Math.PI / 2 }
      ];

      const origin = origins[Math.floor(Math.random() * origins.length)];
      for (let i = 0; i < 30; i++) {
        const spread = (Math.random() - 0.5) * 1.2;
        const angle = origin.angleBase + spread;
        const speed = 4 + Math.random() * 9;
        const pTypes = ['confetti', 'heart', 'petal', 'star'];
        const pType = pTypes[Math.floor(Math.random() * pTypes.length)];

        this.particles.push({
          type: pType,
          x: origin.x,
          y: origin.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          gravity: 0.15,
          size: 8 + Math.random() * 12,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          life: 1,
          decay: 0.008 + Math.random() * 0.012,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.15
        });
      }
    }, 450);

    this.startLoop();
  }

  // Surprise Gift opening explosion
  burstGift(x, y) {
    if (this.prefersReducedMotion) return;
    const colors = ['#ffd700', '#ff3366', '#f4aee2', '#ffffff', '#ffb6c1', '#e0c3fc'];
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 11;
      const pTypes = ['heart', 'star', 'confetti', 'petal'];
      this.particles.push({
        type: pTypes[Math.floor(Math.random() * pTypes.length)],
        x: x || window.innerWidth / 2,
        y: y || window.innerHeight / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.12,
        size: 9 + Math.random() * 14,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 1,
        decay: 0.01 + Math.random() * 0.012,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2
      });
    }
    this.startLoop();
  }

  // Final YES romantic climax explosion
  burstYesLove() {
    if (this.prefersReducedMotion) return;
    const colors = ['#ff1744', '#ff4081', '#f50057', '#ff80ab', '#ffffff', '#ffd700'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.6;

    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 10;
      this.particles.push({
        type: 'heart',
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.08,
        size: 10 + Math.random() * 16,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 1,
        decay: 0.009 + Math.random() * 0.01,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.1
      });
    }
    this.startLoop();
  }

  startLoop() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.render();
  }

  render() {
    if (!this.canvas || !this.ctx) return;

    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Spawn ambient hearts if enabled and active count is low
    if (this.ambientRunning && this.particles.length < 28 && Math.random() < 0.14) {
      const redColors = ['#ff1744', '#e60039', '#ff2a55', '#d50000', '#ff385c'];
      this.particles.push({
        type: 'heart',
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 20,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.6 - Math.random() * 0.9,
        size: 9 + Math.random() * 14,
        color: redColors[Math.floor(Math.random() * redColors.length)],
        alpha: 0.45 + Math.random() * 0.45,
        life: 1,
        decay: 0.003 + Math.random() * 0.003,
        rotation: (Math.random() - 0.5) * 0.4,
        rotSpeed: (Math.random() - 0.5) * 0.02
      });
    }

    // Update and draw particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.gravity) p.vy += p.gravity;
      p.rotation += p.rotSpeed;
      p.life -= p.decay;
      p.alpha = Math.max(0, p.life);

      if (p.life <= 0 || p.y > window.innerHeight + 80) {
        this.particles.splice(i, 1);
        continue;
      }

      if (p.type === 'heart') {
        this.drawHeart(this.ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
      } else if (p.type === 'petal') {
        this.drawPetal(this.ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
      } else if (p.type === 'star') {
        this.drawStar(this.ctx, p.x, p.y, p.size, p.color, p.alpha);
      } else {
        // Confetti rectangle
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.globalAlpha = p.alpha;
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        this.ctx.restore();
      }
    }

    // Update and draw balloons
    for (let b = this.balloons.length - 1; b >= 0; b--) {
      const balloon = this.balloons[b];
      balloon.y += balloon.vy;
      balloon.wobble += balloon.wobbleSpeed;
      balloon.x += Math.sin(balloon.wobble) * 0.7;

      this.drawBalloon(this.ctx, balloon);

      if (balloon.y < -100) {
        this.balloons.splice(b, 1);
      }
    }

    if (this.particles.length > 0 || this.balloons.length > 0 || this.ambientRunning) {
      this.animFrameId = requestAnimationFrame(() => this.render());
    } else {
      this.isRunning = false;
    }
  }
}

// Global instance
window.romanticParticles = new RomanticParticleEngine();
