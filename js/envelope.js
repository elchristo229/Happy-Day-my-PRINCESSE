/**
 * ==============================================================================
 * LETTRE D'AMOUR INTERACTIVE : SCEAU DE CIRE 3D & DÉPLOIEMENT DU PARCHEMIN
 * ==============================================================================
 */

class InteractiveEnvelope {
  constructor() {
    this.envelopeEl = document.getElementById('envelope-3d');
    this.waxSealEl = document.getElementById('wax-seal');
    this.flapTopEl = document.getElementById('envelope-flap-top');
    this.parchmentEl = document.getElementById('parchment-letter');
    this.btnRefold = document.getElementById('btn-refold-letter');
    this.btnReread = document.getElementById('btn-reread-letter');

    this.isOpen = false;
    this.init();
  }

  init() {
    if (!this.envelopeEl || !this.waxSealEl) return;

    // Clic sur le sceau ou l'enveloppe
    this.waxSealEl.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openEnvelope();
    });

    this.envelopeEl.addEventListener('click', () => {
      if (!this.isOpen) this.openEnvelope();
    });

    // Bouton pour replier l'enveloppe
    if (this.btnRefold) {
      this.btnRefold.addEventListener('click', () => this.closeEnvelope());
    }

    // Bouton pour relire
    if (this.btnReread) {
      this.btnReread.addEventListener('click', () => {
        this.parchmentEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.particleEngine) {
          window.particleEngine.triggerPetalShower(30);
        }
      });
    }
  }

  openEnvelope() {
    if (this.isOpen) return;
    this.isOpen = true;

    // 1. Rupture du sceau de cire avec étincelles
    this.waxSealEl.style.animation = 'sealBreak 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';

    // 2. Déploiement du rabat supérieur en 3D
    setTimeout(() => {
      if (this.flapTopEl) {
        this.flapTopEl.style.animation = 'openEnvelopeFlap 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
      }
    }, 200);

    // 3. Déploiement du parchemin
    setTimeout(() => {
      if (this.parchmentEl) {
        this.parchmentEl.classList.add('is-unfolded');
        this.parchmentEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Effet romantique : petite pluie de cœurs et de pétales
      if (window.particleEngine) {
        window.particleEngine.triggerPetalShower(35);
      }
    }, 700);
  }

  closeEnvelope() {
    if (!this.isOpen) return;
    this.isOpen = false;

    if (this.parchmentEl) {
      this.parchmentEl.classList.remove('is-unfolded');
    }

    if (this.flapTopEl) {
      this.flapTopEl.style.animation = 'none';
      void this.flapTopEl.offsetWidth;
      this.flapTopEl.style.transform = 'rotateX(0deg)';
    }

    if (this.waxSealEl) {
      this.waxSealEl.style.animation = 'none';
      void this.waxSealEl.offsetWidth;
      this.waxSealEl.style.transform = 'translate(-50%, -50%)';
      this.waxSealEl.style.opacity = '1';
    }

    if (this.envelopeEl) {
      this.envelopeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

window.InteractiveEnvelope = InteractiveEnvelope;
