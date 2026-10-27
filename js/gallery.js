/**
 * ==============================================================================
 * GALERIE STYLE POLAROID & VISIONNEUSE PLEIN ÉCRAN (LIGHTBOX)
 * ==============================================================================
 */

class PolaroidGallery {
  constructor() {
    this.container = document.getElementById('gallery-grid');
    this.lightbox = document.getElementById('lightbox-modal');
    this.lightboxImg = document.getElementById('lightbox-image');
    this.lightboxCaption = document.getElementById('lightbox-caption');
    this.lightboxDate = document.getElementById('lightbox-date');
    this.lightboxCounter = document.getElementById('lightbox-counter');
    this.closeBtn = document.getElementById('lightbox-close-btn');
    this.prevBtn = document.getElementById('lightbox-prev-btn');
    this.nextBtn = document.getElementById('lightbox-next-btn');

    this.media = (window.CONFIG && CONFIG.gallery) || [];
    this.photos = this.media.filter((item) => item.type !== 'video');
    this.currentIndex = 0;
    this.lightboxItems = [];
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    this.renderCards();
    this.initLightboxEvents();
  }

  renderCards() {
    if (!this.container || !this.media.length) return;
    this.container.innerHTML = '';
    const groups = new Map();

    this.media.forEach((item) => {
      const key = item.type === 'video' ? `video-${item.id}` : item.groupId || `photo-${item.id}`;
      if (!groups.has(key)) {
        groups.set(key, {
          title: item.groupTitle || item.caption,
          items: []
        });
      }
      groups.get(key).items.push(item);
    });

    groups.forEach((group) => {
      this.container.appendChild(group.items[0].type === 'video'
        ? this.createVideoCard(group.items[0])
        : this.createPhotoCard(group));
    });
  }

  createPhotoCard(group) {
    const card = document.createElement('article');
    card.className = 'polaroid-card reveal-on-scroll';
    const tape = document.createElement('div');
    tape.className = 'polaroid-tape';
    tape.setAttribute('aria-hidden', 'true');
    const wrapper = document.createElement('div');
    wrapper.className = 'polaroid-image-wrapper';
    const expandButton = document.createElement('button');
    expandButton.className = 'polaroid-expand-button';
    expandButton.type = 'button';
    expandButton.setAttribute('aria-label', `Agrandir : ${group.title}`);
    const image = document.createElement('img');
    image.className = 'polaroid-img';
    image.loading = 'lazy';
    const expandHint = document.createElement('span');
    expandHint.className = 'polaroid-expand-hint';
    expandHint.textContent = '⤢ Agrandir';
    expandButton.append(image, expandHint);
    wrapper.appendChild(expandButton);

    const controls = document.createElement('div');
    controls.className = 'slideshow-controls';
    const previous = document.createElement('button');
    previous.className = 'slideshow-control';
    previous.type = 'button';
    previous.textContent = '‹';
    previous.setAttribute('aria-label', 'Photo précédente');
    const counter = document.createElement('span');
    counter.className = 'slideshow-counter';
    counter.setAttribute('aria-live', 'polite');
    const next = document.createElement('button');
    next.className = 'slideshow-control';
    next.type = 'button';
    next.textContent = '›';
    next.setAttribute('aria-label', 'Photo suivante');
    controls.append(previous, counter, next);
    if (group.items.length > 1) wrapper.appendChild(controls);

    const title = document.createElement('p');
    title.className = 'polaroid-caption';
    title.textContent = group.title;
    const meta = document.createElement('p');
    meta.className = 'polaroid-meta';
    card.append(tape, wrapper, title, meta);

    let activeIndex = 0;
    const showSlide = (index) => {
      activeIndex = (index + group.items.length) % group.items.length;
      const item = group.items[activeIndex];
      image.src = item.image;
      image.alt = item.caption;
      expandButton.setAttribute('aria-label', `Agrandir : ${item.caption}`);
      counter.textContent = `${activeIndex + 1} / ${group.items.length}`;
      const details = [item.caption, item.date, item.location].filter(Boolean);
      meta.textContent = details.join(' • ');
    };

    expandButton.addEventListener('click', () => {
      this.openImageGallery(group.items, activeIndex);
    });
    previous.addEventListener('click', () => showSlide(activeIndex - 1));
    next.addEventListener('click', () => showSlide(activeIndex + 1));
    let slideshowTimer = null;
    const startSlideshow = () => {
      if (group.items.length < 2 || slideshowTimer) return;
      slideshowTimer = setInterval(() => showSlide(activeIndex + 1), 4500);
    };
    const pauseSlideshow = () => {
      if (!slideshowTimer) return;
      clearInterval(slideshowTimer);
      slideshowTimer = null;
    };
    wrapper.addEventListener('focusin', pauseSlideshow);
    wrapper.addEventListener('focusout', (event) => {
      if (!wrapper.contains(event.relatedTarget)) startSlideshow();
    });
    wrapper.addEventListener('keydown', (event) => {
      if (group.items.length < 2) return;
      if (event.key === 'ArrowLeft') showSlide(activeIndex - 1);
      if (event.key === 'ArrowRight') showSlide(activeIndex + 1);
    });
    if (group.items.length === 1) controls.hidden = true;
    showSlide(0);
    startSlideshow();
    return card;
  }

  createVideoCard(video) {
    const card = document.createElement('article');
    card.className = 'polaroid-card reveal-on-scroll';
    const tape = document.createElement('div');
    tape.className = 'polaroid-tape';
    tape.setAttribute('aria-hidden', 'true');
    const wrapper = document.createElement('div');
    wrapper.className = 'polaroid-image-wrapper';
    const player = document.createElement('video');
    player.className = 'polaroid-video';
    player.controls = true;
    player.preload = 'metadata';
    player.playsInline = true;
    player.setAttribute('aria-label', video.caption);
    const source = document.createElement('source');
    source.src = video.image;
    source.type = 'video/mp4';
    player.appendChild(source);
    player.append('La lecture de cette vidéo n’est pas prise en charge par ce navigateur.');
    wrapper.appendChild(player);
    const caption = document.createElement('p');
    caption.className = 'polaroid-caption';
    caption.textContent = video.groupTitle || video.caption;
    const meta = document.createElement('p');
    meta.className = 'polaroid-meta';
    meta.textContent = [video.date, video.location].filter(Boolean).join(' • ');
    card.append(tape, wrapper, caption, meta);
    return card;
  }

  initLightboxEvents() {
    if (!this.lightbox) return;

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeLightbox());
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prevPhoto();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.nextPhoto();
      });
    }

    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.prevPhoto();
      if (e.key === 'ArrowRight') this.nextPhoto();
    });

    this.lightbox.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.lightbox.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });
  }

  handleSwipe() {
    const swipeDistance = this.touchEndX - this.touchStartX;
    const threshold = 50;

    if (swipeDistance > threshold) this.prevPhoto();
    else if (swipeDistance < -threshold) this.nextPhoto();
  }

  openImageGallery(items, index = 0) {
    this.lightboxItems = items;
    this.currentIndex = index;
    this.showLightbox();
  }

  openImage(image, caption, items = [{ image, caption }]) {
    const index = items.findIndex((item) => item.image === image);
    this.openImageGallery(items, Math.max(0, index));
  }

  showLightbox() {
    this.updateLightboxContent();
    this.lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (this.closeBtn) this.closeBtn.focus();
  }

  closeLightbox() {
    this.lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  updateLightboxContent() {
    const photo = this.lightboxItems[this.currentIndex];
    if (!photo) return;

    this.lightboxImg.src = photo.image;
    this.lightboxImg.alt = photo.caption;
    this.lightboxCaption.textContent = photo.caption;
    this.lightboxDate.textContent = [photo.date, photo.location].filter(Boolean).join(' • ');
    this.lightboxCounter.textContent = this.lightboxItems.length > 1
      ? `Photo ${this.currentIndex + 1} sur ${this.lightboxItems.length}`
      : '';
    const hasMultiple = this.lightboxItems.length > 1;
    if (this.prevBtn) this.prevBtn.hidden = !hasMultiple;
    if (this.nextBtn) this.nextBtn.hidden = !hasMultiple;
  }

  prevPhoto() {
    if (this.lightboxItems.length < 2) return;
    this.currentIndex = (this.currentIndex - 1 + this.lightboxItems.length) % this.lightboxItems.length;
    this.updateLightboxContent();
  }

  nextPhoto() {
    if (this.lightboxItems.length < 2) return;
    this.currentIndex = (this.currentIndex + 1) % this.lightboxItems.length;
    this.updateLightboxContent();
  }
}

window.PolaroidGallery = PolaroidGallery;
