/**
 * ==============================================================================
 * SURPRISES CACHÉES, CARTES RETOURNABLES & BONS D'AMOUR
 * ==============================================================================
 */

class SurprisesManager {
  constructor() {
    this.reasonsContainer = document.getElementById('reasons-grid');
    this.couponsContainer = document.getElementById('coupons-grid');
    this.timelineContainer = document.getElementById('timeline-wrapper');
    this.btnPetals = document.getElementById('btn-trigger-petals');
    this.btnConfetti = document.getElementById('btn-trigger-confetti');

    this.init();
  }

  init() {
    this.renderTimeline();
    this.renderReasons();
    this.renderCoupons();
    this.initButtons();
  }

  renderTimeline() {
    if (!this.timelineContainer) return;
    const timeline = (window.CONFIG && CONFIG.timeline) || [];
    this.timelineContainer.innerHTML = '';

    timeline.forEach((item) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'timeline-item reveal-on-scroll';
      itemEl.innerHTML = `
        <div class="timeline-dot" aria-hidden="true">${item.icon || '✨'}</div>
        <div class="timeline-content">
          <span class="timeline-date">${item.date}</span>
          <h3 class="timeline-title">${item.title}</h3>
          <p class="timeline-desc">${item.description}</p>
        </div>
      `;
      this.timelineContainer.appendChild(itemEl);
    });
  }

  renderReasons() {
    if (!this.reasonsContainer) return;
    const reasons = (window.CONFIG && CONFIG.loveReasons) || [];
    this.reasonsContainer.innerHTML = '';

    reasons.forEach((reason) => {
      const card = document.createElement('div');
      card.className = 'reason-flip-card reveal-on-scroll';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Raison ${reason.id} : ${reason.title}. Clique pour retourner.`);

      card.innerHTML = `
        <div class="reason-card-inner">
          <div class="reason-card-front">
            <span class="reason-heart-icon">❤️</span>
            <h4 class="reason-card-title">${reason.title}</h4>
            <span class="reason-tap-hint">Touchez pour découvrir ✨</span>
          </div>
          <div class="reason-card-back">
            <p class="reason-card-text">« ${reason.text} »</p>
          </div>
        </div>
      `;

      const toggleFlip = () => {
        card.classList.toggle('is-flipped');
        if (card.classList.contains('is-flipped') && window.particleEngine) {
          window.particleEngine.triggerPetalShower(6);
        }
      };

      card.addEventListener('click', toggleFlip);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFlip();
        }
      });

      this.reasonsContainer.appendChild(card);
    });
  }

  renderCoupons() {
    if (!this.couponsContainer) return;
    const coupons = (window.CONFIG && CONFIG.loveCoupons) || [];
    this.couponsContainer.innerHTML = '';

    coupons.forEach((coupon) => {
      const card = document.createElement('div');
      card.className = 'coupon-card reveal-on-scroll';
      card.innerHTML = `
        <div class="coupon-icon" aria-hidden="true">${coupon.icon || '🎁'}</div>
        <h4 class="coupon-title">${coupon.title}</h4>
        <p class="coupon-desc">${coupon.desc}</p>
        <span class="coupon-tag">Valable sans modération</span>
      `;

      card.addEventListener('click', () => {
        if (window.particleEngine) {
          const rect = card.getBoundingClientRect();
          window.particleEngine.triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);
        }
      });

      this.couponsContainer.appendChild(card);
    });
  }

  initButtons() {
    if (this.btnPetals) {
      this.btnPetals.addEventListener('click', () => {
        if (window.particleEngine) {
          window.particleEngine.triggerPetalShower(50);
        }
      });
    }

    if (this.btnConfetti) {
      this.btnConfetti.addEventListener('click', () => {
        if (window.particleEngine) {
          window.particleEngine.triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.4, 100);
        }
      });
    }
  }
}

window.SurprisesManager = SurprisesManager;
