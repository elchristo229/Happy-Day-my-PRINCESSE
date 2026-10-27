/**
 * ==============================================================================
 * COMPTE À REBOURS DU 2 NOVEMBRE 2026 AVEC GESTION DU JOUR J
 * ==============================================================================
 */

class CountdownTimer {
  constructor() {
    this.daysEl = document.getElementById('countdown-days');
    this.hoursEl = document.getElementById('countdown-hours');
    this.minutesEl = document.getElementById('countdown-minutes');
    this.secondsEl = document.getElementById('countdown-seconds');
    this.gridEl = document.getElementById('countdown-grid');
    this.bannerEl = document.getElementById('countdown-celebration');

    // Date cible configurée
    const targetStr = (window.CONFIG && CONFIG.event && CONFIG.event.targetDate) || "2026-11-02T00:00:00";
    this.targetDate = new Date(targetStr).getTime();
    this.timerId = null;

    this.init();
  }

  init() {
    this.update();
    this.timerId = setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    // Si la date est atteinte ou dépassée (Jour J ou après)
    if (distance <= 0) {
      if (this.daysEl) this.daysEl.textContent = "00";
      if (this.hoursEl) this.hoursEl.textContent = "00";
      if (this.minutesEl) this.minutesEl.textContent = "00";
      if (this.secondsEl) this.secondsEl.textContent = "00";

      if (this.bannerEl) {
        this.bannerEl.classList.add('is-active');
      }

      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      return;
    }

    // Calculs précis du temps restant
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (this.daysEl) this.daysEl.textContent = String(days).padStart(2, '0');
    if (this.hoursEl) this.hoursEl.textContent = String(hours).padStart(2, '0');
    if (this.minutesEl) this.minutesEl.textContent = String(minutes).padStart(2, '0');
    if (this.secondsEl) this.secondsEl.textContent = String(seconds).padStart(2, '0');
  }
}

window.CountdownTimer = CountdownTimer;
