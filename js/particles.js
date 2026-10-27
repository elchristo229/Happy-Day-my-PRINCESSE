/**
 * ==============================================================================
 * SYSTÈME DE PARTICULES CANVAS : CŒURS FLOTTANTS, ÉTOILES & PÉTALES DE ROSES
 * ==============================================================================
 */

class ParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.particles = [];
    this.petals = [];
    this.hearts = [];
    this.confetti = [];
    
    this.width = 0;
    this.height = 0;
    this.isRunning = true;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Pause automatique quand l'onglet est masqué pour préserver la batterie mobile
    document.addEventListener('visibilitychange', () => {
      this.isRunning = !document.hidden;
      if (this.isRunning) this.animate();
    });

    if (!this.reducedMotion) {
      this.createInitialParticles();
      this.animate();
    }
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  createInitialParticles() {
    // 1. Étoiles scintillantes (fond discret)
    const starCount = Math.floor(this.width / 40);
    for (let i = 0; i < starCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2
      });
    }

    // 2. Cœurs flottants doux qui s'élèvent
    const heartCount = Math.floor(this.width / 120);
    for (let i = 0; i < heartCount; i++) {
      this.hearts.push(this.createHeart());
    }

    // 3. Pétales de roses tombants
    const petalCount = Math.floor(this.width / 140);
    for (let i = 0; i < petalCount; i++) {
      this.petals.push(this.createPetal(true));
    }
  }

  createHeart() {
    return {
      x: Math.random() * this.width,
      y: this.height + Math.random() * 200,
      size: Math.random() * 14 + 10,
      speedY: Math.random() * 0.8 + 0.4,
      swaySpeed: Math.random() * 0.02 + 0.01,
      swayAmplitude: Math.random() * 40 + 20,
      alpha: Math.random() * 0.4 + 0.2,
      rotation: Math.random() * 0.4 - 0.2,
      phase: Math.random() * Math.PI * 2
    };
  }

  createPetal(randomY = false) {
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -30,
      size: Math.random() * 16 + 12,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 1.5 - 0.75,
      alpha: Math.random() * 0.6 + 0.3,
      color: Math.random() > 0.4 ? '#801D38' : '#C25975'
    };
  }

  drawHeart(ctx, x, y, size, alpha, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(size / 30, size / 30);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-15, -15, -30, 5, 0, 28);
    ctx.bezierCurveTo(30, 5, 15, -15, 0, 0);
    ctx.fillStyle = `rgba(232, 165, 152, ${alpha})`;
    ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
  }

  drawPetal(ctx, petal) {
    ctx.save();
    ctx.translate(petal.x, petal.y);
    ctx.rotate((petal.rotation * Math.PI) / 180);
    ctx.beginPath();
    ctx.ellipse(0, 0, petal.size * 0.5, petal.size, 0, 0, Math.PI * 2);
    ctx.fillStyle = petal.color;
    ctx.globalAlpha = petal.alpha;
    ctx.shadowColor = 'rgba(46, 8, 19, 0.3)';
    ctx.shadowBlur = 4;
    ctx.fill();
    ctx.restore();
  }

  animate() {
    if (!this.isRunning || this.reducedMotion) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Dessin des étoiles
    for (const star of this.particles) {
      star.phase += star.speed;
      const currentAlpha = star.alpha * (0.6 + 0.4 * Math.sin(star.phase));
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(243, 229, 171, ${currentAlpha})`;
      this.ctx.fill();
    }

    // Dessin des cœurs flottants
    for (let i = 0; i < this.hearts.length; i++) {
      const heart = this.hearts[i];
      heart.phase += heart.swaySpeed;
      heart.y -= heart.speedY;
      const swayX = heart.x + Math.sin(heart.phase) * heart.swayAmplitude;

      this.drawHeart(this.ctx, swayX, heart.y, heart.size, heart.alpha, heart.rotation);

      if (heart.y < -50) {
        this.hearts[i] = this.createHeart();
      }
    }

    // Dessin des pétales de roses
    for (let i = 0; i < this.petals.length; i++) {
      const petal = this.petals[i];
      petal.y += petal.speedY;
      petal.x += petal.speedX + Math.sin(petal.y * 0.01) * 0.5;
      petal.rotation += petal.rotationSpeed;

      this.drawPetal(this.ctx, petal);

      if (petal.y > this.height + 40) {
        this.petals[i] = this.createPetal(false);
      }
    }

    // Dessin des confettis dynamiques (si déclenchés)
    for (let i = this.confetti.length - 1; i >= 0; i--) {
      const c = this.confetti[i];
      c.x += c.vx;
      c.y += c.vy;
      c.vy += c.gravity;
      c.rotation += c.rotSpeed;
      c.alpha -= 0.008;

      this.ctx.save();
      this.ctx.translate(c.x, c.y);
      this.ctx.rotate((c.rotation * Math.PI) / 180);
      this.ctx.fillStyle = c.color;
      this.ctx.globalAlpha = Math.max(0, c.alpha);
      this.ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
      this.ctx.restore();

      if (c.alpha <= 0 || c.y > this.height) {
        this.confetti.splice(i, 1);
      }
    }

    requestAnimationFrame(() => this.animate());
  }

  // Déclenche une pluie spectaculaire de pétales de roses
  triggerPetalShower(count = 45) {
    for (let i = 0; i < count; i++) {
      const p = this.createPetal(false);
      p.speedY = Math.random() * 2.5 + 1.2;
      p.size = Math.random() * 20 + 14;
      p.alpha = Math.random() * 0.8 + 0.2;
      this.petals.push(p);
    }
  }

  // Déclenche une explosion festive de confettis dorés et roses
  triggerConfetti(originX, originY, count = 80) {
    const colors = ['#D4AF37', '#F3E5AB', '#801D38', '#E8A598', '#FFFDF7', '#A32948'];
    const x = originX !== undefined ? originX : this.width / 2;
    const y = originY !== undefined ? originY : this.height * 0.4;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      this.confetti.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        gravity: 0.22,
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 8 - 4,
        alpha: 1.0
      });
    }
  }
}

// Initialisation globale
window.ParticleEngine = ParticleEngine;
