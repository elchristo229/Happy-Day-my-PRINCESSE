/**
 * ==============================================================================
 * APPLICATION PRINCIPALE : ORCHESTRATION, INJECTION CONFIG & NAVIGATION
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialisation des composants
  window.particleEngine = new ParticleEngine('particles-canvas');
  window.musicPlayer = new RomanticMusicPlayer();
  window.mysteryGame = new MysteryGame();
  window.countdownTimer = new CountdownTimer();
  window.interactiveEnvelope = new InteractiveEnvelope();
  window.polaroidGallery = new PolaroidGallery();
  window.surprisesManager = new SurprisesManager();
  window.guestbookManager = new GuestbookManager();

  // 2. Injection des données de configuration dans le DOM
  populateContentFromConfig();

  // 3. Gestion de la navigation et des animations au scroll
  initNavigation();
  initScrollObserver();
  initFinalScreenActions();
});

function populateContentFromConfig() {
  if (!window.CONFIG) return;

  const { fiancee, author, mysteryScreen, revealScreen, loveLetter, finalScreen, event } = CONFIG;

  // Prénom et surnoms
  const fianceeName = fiancee.firstName || "Mon Amour";
  const fianceePet = fiancee.petName || "Mon Cœur";
  const authorName = author.name || "Ton Amour";

  // Mises à jour des textes dynamiques
  document.querySelectorAll('.dyn-fiancee-name').forEach(el => el.textContent = fianceeName);
  document.querySelectorAll('.dyn-fiancee-pet').forEach(el => el.textContent = fianceePet);
  document.querySelectorAll('.dyn-author-name').forEach(el => el.textContent = authorName);

  // Écran 1 : Le Mystère
  const headlineEl = document.getElementById('mystery-headline');
  if (headlineEl && mysteryScreen.headline) headlineEl.textContent = mysteryScreen.headline;

  const questionEl = document.getElementById('mystery-question');
  if (questionEl && mysteryScreen.question) questionEl.textContent = mysteryScreen.question;

  const btnYes = document.getElementById('btn-mystery-yes');
  if (btnYes && mysteryScreen.btnYesText) btnYes.innerHTML = mysteryScreen.btnYesText;

  const btnNo = document.getElementById('btn-mystery-no');
  if (btnNo && mysteryScreen.btnNoText) btnNo.innerHTML = mysteryScreen.btnNoText;

  const reassuranceEl = document.getElementById('mystery-reassurance');
  if (reassuranceEl && mysteryScreen.reassuranceText) reassuranceEl.textContent = mysteryScreen.reassuranceText;

  // Écran 2 : Le Dévoilement
  const revealIntroEl = document.getElementById('reveal-intro');
  if (revealIntroEl && revealScreen.introText) revealIntroEl.textContent = revealScreen.introText;

  const revealNameEl = document.getElementById('reveal-fiancee-name');
  if (revealNameEl) revealNameEl.textContent = fiancee.fullName || fianceeName;

  const revealMsgEl = document.getElementById('reveal-message');
  if (revealMsgEl && revealScreen.revealMessage) revealMsgEl.textContent = revealScreen.revealMessage;

  const btnDiscover = document.getElementById('btn-discover-surprise');
  if (btnDiscover && revealScreen.ctaButtonText) btnDiscover.innerHTML = revealScreen.ctaButtonText;

  // Lettre d'amour
  const waxInitialsEl = document.getElementById('wax-seal-initials');
  if (waxInitialsEl && loveLetter.waxSealText) waxInitialsEl.textContent = loveLetter.waxSealText;

  const letterDateEl = document.getElementById('parchment-date');
  if (letterDateEl && loveLetter.date) letterDateEl.textContent = loveLetter.date;

  const letterHeadingEl = document.getElementById('parchment-heading');
  if (letterHeadingEl && loveLetter.heading) letterHeadingEl.textContent = loveLetter.heading;

  // Sections de la lettre
  if (loveLetter.sections) {
    const s = loveLetter.sections;
    setSectionText('letter-sec-intro', s.introduction);
    setSectionText('letter-sec-love', s.whatILoveAboutYou);
    setSectionText('letter-sec-memories', s.favoriteMemories);
    setSectionText('letter-sec-meaning', s.whatYouMeanToMe);
    setSectionText('letter-sec-wishes', s.wishesForFuture);
    setSectionText('letter-sec-closing', s.closingDeclaration);
  }

  const letterSigEl = document.getElementById('parchment-signature-author');
  if (letterSigEl) letterSigEl.textContent = authorName;

  const letterPsEl = document.getElementById('parchment-ps');
  if (letterPsEl && loveLetter.postScriptum) letterPsEl.textContent = loveLetter.postScriptum;

  // Écran Final
  const finalTitleEl = document.getElementById('celebration-title-text');
  if (finalTitleEl) {
    finalTitleEl.textContent = `JOYEUX ANNIVERSAIRE ${fianceeName.toUpperCase()} ❤️`;
  }

  const finalQuoteEl = document.getElementById('celebration-quote-text');
  if (finalQuoteEl && finalScreen.closingWish) {
    finalQuoteEl.textContent = `« ${finalScreen.closingWish} »`;
  }
}

function setSectionText(id, text) {
  const el = document.getElementById(id);
  if (el && text) el.textContent = text;
}

function initNavigation() {
  const navbar = document.getElementById('navbar-floating');
  const navToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const btnDiscover = document.getElementById('btn-discover-surprise');
  const revealScreen = document.getElementById('reveal-screen');
  const mainExp = document.getElementById('main-experience');

  // Menu mobile hamburger
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
      const isExpanded = navLinks.classList.contains('is-open');
      navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Fermeture automatique lors du clic sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Clic sur "DÉCOUVRIR MA SURPRISE ❤️"
  if (btnDiscover) {
    btnDiscover.addEventListener('click', () => {
      if (mainExp) mainExp.style.display = 'block';
      if (navbar) navbar.style.display = 'flex';
      if (revealScreen) {
        revealScreen.classList.remove('is-active');
        revealScreen.style.display = 'none';
      }

      // Défilement doux vers la première section
      const firstSection = document.getElementById('countdown-section');
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Pluie de célébration
      if (window.particleEngine) {
        window.particleEngine.triggerPetalShower(40);
        window.particleEngine.triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.3, 80);
      }
    });
  }
}

function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

function initFinalScreenActions() {
  const btnReplayMemories = document.getElementById('btn-final-memories');
  const btnReplayLetter = document.getElementById('btn-final-letter');
  const btnRestart = document.getElementById('btn-final-restart');

  if (btnReplayMemories) {
    btnReplayMemories.addEventListener('click', () => {
      const gallery = document.getElementById('gallery-section');
      if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (btnReplayLetter) {
    btnReplayLetter.addEventListener('click', () => {
      const letter = document.getElementById('letter-section');
      if (letter) {
        letter.scrollIntoView({ behavior: 'smooth' });
        if (window.interactiveEnvelope) {
          window.interactiveEnvelope.openEnvelope();
        }
      }
    });
  }

  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  }
}
