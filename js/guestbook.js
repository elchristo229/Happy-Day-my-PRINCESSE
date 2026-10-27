/**
 * ==============================================================================
 * LIVRE D'OR : MUR DE VŒUX ET FORMULAIRE DE CONTRIBUTION (MODES STATIQUE & EN LIGNE)
 * ==============================================================================
 */

class GuestbookManager {
  constructor() {
    this.messagesListEl = document.getElementById('guestbook-messages-list');
    this.formEl = document.getElementById('guestbook-form');
    this.authorInput = document.getElementById('guestbook-author');
    this.relationInput = document.getElementById('guestbook-relation');
    this.messageInput = document.getElementById('guestbook-message');
    this.charCounter = document.getElementById('guestbook-char-counter');
    this.honeypot = document.getElementById('guestbook-website'); // Champ anti-spam masqué
    this.toastEl = document.getElementById('toast-notification');
    this.toastMessageEl = document.getElementById('toast-message');
    this.formCard = document.querySelector('.guestbook-form-card');
    this.staticNote = document.getElementById('guestbook-static-note');
    this.layout = document.querySelector('.guestbook-layout');
    this.contributorsListEl = document.getElementById('guestbook-contributors');

    this.storageKey = 'anniversaire_local_wishes';
    this.maxChars = 500;
    this.isOnline = Boolean(
      window.CONFIG &&
      CONFIG.firebase &&
      CONFIG.firebase.enabled &&
      window.firebaseFirestore
    );

    this.init();
  }

  init() {
    if (this.formCard) this.formCard.hidden = !this.isOnline;
    if (this.staticNote) this.staticNote.hidden = this.isOnline;
    if (this.layout) this.layout.classList.toggle('is-static', !this.isOnline);
    this.renderMessages();
    this.renderContributors();
    this.initFormEvents();
  }

  getMessages() {
    const defaultMessages = (window.CONFIG && CONFIG.guestbookMessages) || [];
    if (!this.isOnline) return defaultMessages;

    let localMessages = [];

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        localMessages = JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Impossible d'accéder au localStorage", e);
    }

    return [...localMessages, ...defaultMessages];
  }

  renderMessages() {
    if (!this.messagesListEl) return;
    const messages = this.getMessages();
    this.messagesListEl.innerHTML = '';

    if (messages.length === 0) {
      const emptyState = document.createElement('p');
      emptyState.className = 'guestbook-empty-state';
      emptyState.textContent = 'Les mots doux préparés pour toi apparaîtront ici.';
      this.messagesListEl.appendChild(emptyState);
      return;
    }

    messages.forEach((msg) => {
      const card = document.createElement('article');
      card.className = 'guestbook-card reveal-on-scroll';
      card.innerHTML = `
        <div class="guestbook-header">
          <div class="guestbook-author-info">
            ${msg.authorImage
              ? `<button class="guestbook-avatar-button" type="button"><img class="guestbook-avatar guestbook-avatar-image" src="${this.escapeHTML(msg.authorImage)}" alt=""></button>`
              : `<div class="guestbook-avatar" aria-hidden="true">${this.escapeHTML(msg.avatar || '❤️')}</div>`}
            <div>
              <div class="guestbook-author-name">${this.escapeHTML(msg.author)}</div>
              ${msg.relation ? `<span class="guestbook-relation-tag">${this.escapeHTML(msg.relation)}</span>` : ''}
            </div>
          </div>
          <span class="guestbook-date">${this.escapeHTML(msg.date || '2 Novembre 2026')}</span>
        </div>
        <p class="guestbook-text">« ${this.escapeHTML(msg.text)} »</p>
      `;
      this.messagesListEl.appendChild(card);
      const avatarButton = card.querySelector('.guestbook-avatar-button');
      if (avatarButton) {
        avatarButton.setAttribute('aria-label', `Agrandir la photo de ${msg.author}`);
        avatarButton.addEventListener('click', () => {
          this.openContributorImage(msg.authorImage, msg.author);
        });
      }
    });
  }

  renderContributors() {
    if (!this.contributorsListEl) return;
    const contributors = (window.CONFIG && CONFIG.guestbookContributors) || [];
    this.contributorsListEl.innerHTML = '';

    contributors.forEach((contributor) => {
      const card = document.createElement('button');
      card.className = 'guestbook-contributor';
      card.type = 'button';
      card.setAttribute('aria-label', `Agrandir la photo de ${contributor.name}`);
      card.innerHTML = `
        <img src="${this.escapeHTML(contributor.image)}" alt="" loading="lazy">
        <span>${this.escapeHTML(contributor.name)}</span>
      `;
      card.addEventListener('click', () => {
        this.openContributorImage(contributor.image, contributor.name);
      });
      this.contributorsListEl.appendChild(card);
    });
  }

  openContributorImage(image, name) {
    if (!window.polaroidGallery) return;
    const portraits = (window.CONFIG.guestbookContributors || []).map((contributor) => ({
      image: contributor.image,
      caption: contributor.name
    }));

    if (!portraits.some((portrait) => portrait.image === image)) {
      portraits.push({ image, caption: name });
    }

    window.polaroidGallery.openImage(image, name, portraits);
  }

  initFormEvents() {
    if (!this.formEl) return;

    // Compteur de caractères en direct
    if (this.messageInput && this.charCounter) {
      this.messageInput.addEventListener('input', () => {
        const count = this.messageInput.value.length;
        this.charCounter.textContent = `${count} / ${this.maxChars}`;
        if (count > this.maxChars) {
          this.charCounter.style.color = '#F3A6B2';
        } else {
          this.charCounter.style.color = '';
        }
      });
    }

    // Soumission du formulaire
    this.formEl.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();

    // 1. Protection anti-spam par pot de miel (honeypot)
    if (this.honeypot && this.honeypot.value.trim() !== '') {
      console.warn("Tentative de spam détectée.");
      return;
    }

    const author = this.authorInput.value.trim();
    const relation = this.relationInput.value.trim();
    const text = this.messageInput.value.trim();

    // Validation
    if (!author) {
      this.showToast("Merci d'indiquer ton nom ou ton surnom.");
      this.authorInput.focus();
      return;
    }

    if (!text || text.length < 5) {
      this.showToast("Ton message doit contenir au moins 5 caractères.");
      this.messageInput.focus();
      return;
    }

    if (text.length > this.maxChars) {
      this.showToast(`Ton message ne doit pas dépasser ${this.maxChars} caractères.`);
      return;
    }

    const newMsg = {
      id: 'local-' + Date.now(),
      author: author,
      relation: relation || 'Proche',
      text: text,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      avatar: '💌'
    };

    // Mode Participatif en ligne (Firebase optionnel)
    if (window.CONFIG && CONFIG.firebase && CONFIG.firebase.enabled && window.firebaseFirestore) {
      this.saveToFirebase(newMsg);
    } else {
      // Mode Statique par défaut (sauvegarde locale instantanée)
      this.saveToLocal(newMsg);
    }

    // Réinitialisation du formulaire
    this.formEl.reset();
    if (this.charCounter) this.charCounter.textContent = `0 / ${this.maxChars}`;

    // Effet festif
    if (window.particleEngine) {
      window.particleEngine.triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.5, 60);
    }

    this.showToast("Ton vœu d'anniversaire a été ajouté avec succès au livre d'or ! ❤️");
  }

  saveToLocal(newMsg) {
    try {
      const stored = localStorage.getItem(this.storageKey);
      let localMessages = stored ? JSON.parse(stored) : [];
      localMessages.unshift(newMsg);
      localStorage.setItem(this.storageKey, JSON.stringify(localMessages));
    } catch (e) {
      console.warn("Erreur d'écriture dans localStorage", e);
    }

    this.renderMessages();
  }

  saveToFirebase(newMsg) {
    // Si Firebase est configuré par l'utilisateur
    try {
      window.firebaseFirestore.collection(CONFIG.firebase.collectionName).add({
        ...newMsg,
        createdAt: new Date().toISOString()
      }).then(() => {
        this.saveToLocal(newMsg);
      }).catch((err) => {
        console.error("Erreur Firebase:", err);
        // Fallback local
        this.saveToLocal(newMsg);
      });
    } catch (e) {
      this.saveToLocal(newMsg);
    }
  }

  showToast(message) {
    if (!this.toastEl || !this.toastMessageEl) return;
    this.toastMessageEl.textContent = message;
    this.toastEl.classList.add('is-visible');

    setTimeout(() => {
      this.toastEl.classList.remove('is-visible');
    }, 4500);
  }

  escapeHTML(str) {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  }
}

window.GuestbookManager = GuestbookManager;
