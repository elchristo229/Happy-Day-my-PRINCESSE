/**
 * ==============================================================================
 * ÉCRAN 1 : LE JEU MYSTÈRE OUI / NON (FONCTIONNALITÉ PRIORITAIRE)
 * ==============================================================================
 */

class MysteryGame {
  constructor() {
    this.btnYes = document.getElementById('btn-mystery-yes');
    this.btnNo = document.getElementById('btn-mystery-no');
    this.reactionText = document.getElementById('playful-reaction');
    this.mysteryScreen = document.getElementById('mystery-screen');
    this.revealScreen = document.getElementById('reveal-screen');
    this.mainExperience = document.getElementById('main-experience');
    this.navbar = document.getElementById('navbar-floating');

    this.rejectionCount = 0;
    this.maxRejections = (window.CONFIG && CONFIG.mysteryScreen && CONFIG.mysteryScreen.maxRejections) || 7;
    this.playfulReplies = (window.CONFIG && CONFIG.mysteryScreen && CONFIG.mysteryScreen.playfulReplies) || [
      "Tu es sûre ? Regarde comme le bouton OUI brille ! ✨",
      "Allez, juste un petit clic sur le OUI… 😉",
      "Tu ne pourras pas résister bien longtemps ! 🥰",
      "Le bouton OUI grandit par amour pour toi ! 💖",
      "Il n'y a pas d'échappatoire à mon amour ! 🌹",
      "Presque absorbé… le OUI est irrésistible ! 💫",
      "Tu as capitulé devant tant d'amour ! Prépare-toi… ❤️"
    ];

    this.init();
  }

  init() {
    if (!this.btnYes || !this.btnNo) return;

    // Écouteur pour le bouton NON
    this.btnNo.addEventListener('click', (e) => this.handleNoClick(e));
    this.btnNo.addEventListener('touchstart', (e) => {
      // Touch-friendly sans déclencher double-tap
      e.stopPropagation();
    }, { passive: true });

    // Écouteur pour le bouton OUI
    this.btnYes.addEventListener('click', () => this.handleYesClick());
  }

  handleNoClick(e) {
    if (e) e.preventDefault();
    this.rejectionCount++;

    // 1. CALCUL DYNAMIQUE DU NOMBRE DE "I" :
    // OUI ❤️ (initial) -> OUII ❤️ (1) -> OUIII ❤️ (2) ... jusqu'à OUIIIIIIIII ❤️ (9 "I")
    const totalIs = Math.min(this.rejectionCount + 1, 9);
    const newYesText = "OU" + "I".repeat(totalIs) + " ❤️";
    this.btnYes.innerHTML = newYesText;
    this.btnYes.setAttribute('aria-label', `Oui, je veux voir la surprise (${newYesText})`);

    // 2. CALCUL DES ÉCHELLES RESPECTIVES (avec clamp pour ne jamais déborder de l'écran)
    const isMobile = window.innerWidth <= 600;
    const maxYesScale = isMobile ? 1.4 : 1.7;
    const yesScale = Math.min(1 + this.rejectionCount * 0.1, maxYesScale);
    const noScale = Math.max(0.3, 1 - this.rejectionCount * 0.11);

    this.btnYes.style.setProperty('--btn-scale', yesScale.toFixed(2));
    this.btnNo.style.setProperty('--btn-non-scale', noScale.toFixed(2));

    // 3. ANIMATION DE REBOND LUDIQUE
    this.btnYes.style.animation = 'none';
    // Force reflow
    void this.btnYes.offsetWidth;
    this.btnYes.style.animation = 'playfulBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';

    this.btnNo.style.animation = 'none';
    void this.btnNo.offsetWidth;
    this.btnNo.style.animation = 'timidShake 0.4s ease-in-out';

    // 4. ATTRACTION MAGNÉTIQUE PROGRESSIVE DU BOUTON NON VERS LE OUI
    const yesRect = this.btnYes.getBoundingClientRect();
    const noRect = this.btnNo.getBoundingClientRect();
    const deltaX = (yesRect.left + yesRect.width / 2) - (noRect.left + noRect.width / 2);
    const pullFactor = Math.min(this.rejectionCount * 0.12, 0.7);
    const shiftX = deltaX * pullFactor;

    this.btnNo.style.transform = `scale(${noScale.toFixed(2)}) translateX(${shiftX.toFixed(1)}px)`;

    // 5. APPARITION DE PETITS CŒURS AUTOUR DU BOUTON OUI
    this.spawnHeartBurstAroundYes();

    // 6. MISE À JOUR DU MESSAGE LUDIQUE
    const replyIndex = Math.min(this.rejectionCount - 1, this.playfulReplies.length - 1);
    if (this.reactionText && this.playfulReplies[replyIndex]) {
      this.reactionText.style.opacity = '0';
      setTimeout(() => {
        this.reactionText.textContent = this.playfulReplies[replyIndex];
        this.reactionText.style.opacity = '1';
      }, 150);
    }

    // 7. ABSORPTION DU BOUTON NON QUAND LE SEUIL EST ATTEINT
    if (this.rejectionCount >= this.maxRejections) {
      this.absorbNoButton();
    }
  }

  spawnHeartBurstAroundYes() {
    const rect = this.btnYes.getBoundingClientRect();
    const heartsCount = 6;
    const symbols = ['❤️', '💖', '✨', '💕', '🌹'];

    for (let i = 0; i < heartsCount; i++) {
      const heart = document.createElement('span');
      heart.className = 'heart-burst-particle';
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

      const startX = rect.left + rect.width / 2 + (Math.random() * 40 - 20);
      const startY = rect.top + rect.height / 2 + (Math.random() * 20 - 10);

      const tx = (Math.random() - 0.5) * 140;
      const ty = -(Math.random() * 80 + 40);
      const rot = (Math.random() - 0.5) * 90;

      heart.style.left = `${startX}px`;
      heart.style.top = `${startY}px`;
      heart.style.setProperty('--tx', `${tx}px`);
      heart.style.setProperty('--ty', `${ty}px`);
      heart.style.setProperty('--rot', `${rot}deg`);

      document.body.appendChild(heart);

      setTimeout(() => {
        if (heart.parentNode) heart.parentNode.removeChild(heart);
      }, 1000);
    }
  }

  absorbNoButton() {
    this.btnNo.style.pointerEvents = 'none';
    this.btnNo.style.animation = 'absorbIntoYes 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';

    setTimeout(() => {
      this.btnNo.style.display = 'none';

      // Le OUI devient un bouton spectaculaire
      this.btnYes.innerHTML = "OUIIIIIIIII ❤️";
      this.btnYes.style.animation = 'grandOuiEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      this.btnYes.style.setProperty('--btn-scale', '1.2');

      if (this.reactionText) {
        this.reactionText.textContent = "Le bouton NON a été absorbé par tant d'amour ! Il ne reste qu'à cliquer sur OUI ❤️";
      }
    }, 600);
  }

  handleYesClick() {
    // 1. Déclenche une pluie spectaculaire de confettis et de pétales
    if (window.particleEngine) {
      const rect = this.btnYes.getBoundingClientRect();
      window.particleEngine.triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 100);
      window.particleEngine.triggerPetalShower(50);
    }

    // 2. Démarre la musique romantique suite à l'action utilisateur
    if (window.musicPlayer) {
      window.musicPlayer.play();
    }

    // 3. Transition douce vers l'écran de dévoilement
    this.mysteryScreen.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    this.mysteryScreen.style.opacity = '0';
    this.mysteryScreen.style.transform = 'scale(0.96)';

    setTimeout(() => {
      this.mysteryScreen.style.display = 'none';
      if (this.revealScreen) {
        this.revealScreen.classList.add('is-active');
        // Révélation douce
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 700);
  }
}

window.MysteryGame = MysteryGame;
