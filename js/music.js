/**
 * ==============================================================================
 * LECTEUR AUDIO & SYNTHÉTISEUR AMBIANT ROMANTIQUE (WEB AUDIO API FALLBACK)
 * ==============================================================================
 */

class RomanticMusicPlayer {
  constructor() {
    this.toggleBtn = document.getElementById('music-toggle-btn');
    this.vinylIcon = document.getElementById('music-vinyl-icon');
    this.soundwaves = document.getElementById('music-soundwaves');
    this.statusLabel = document.getElementById('music-status-label');

    this.isPlaying = false;
    this.audioElement = new Audio();
    this.audioContext = null;
    this.synthTimeout = null;
    this.activeOscillators = new Set();
    this.noteIndex = 0;
    this.useWebAudio = false;

    this.audioSrc = (window.CONFIG && CONFIG.music && CONFIG.music.audioSrc) || '';
    this.defaultVolume = (window.CONFIG && CONFIG.music && CONFIG.music.defaultVolume) || 0.65;
    this.useWebAudio = !this.audioSrc;

    this.init();
  }

  init() {
    this.audioElement.volume = this.defaultVolume;
    this.audioElement.loop = true;

    if (this.audioSrc) {
      this.audioElement.src = this.audioSrc;
      this.audioElement.addEventListener('error', () => {
        this.useWebAudio = true;
      });
    }

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.updateUI(true);

    if (this.useWebAudio) {
      this.startWebAudioSynth();
    } else {
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Si l'élément HTML5 Audio échoue, bascule sur la Web Audio API
          this.useWebAudio = true;
          this.startWebAudioSynth();
        });
      }
    }
  }

  pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    this.updateUI(false);

    if (this.audioElement) {
      this.audioElement.pause();
    }

    if (this.synthTimeout) {
      clearTimeout(this.synthTimeout);
      this.synthTimeout = null;
    }

    this.activeOscillators.forEach((oscillator) => {
      try {
        oscillator.stop();
      } catch (error) {
        if (error.name !== 'InvalidStateError') throw error;
      }
    });
    this.activeOscillators.clear();
    this.noteIndex = 0;
  }

  midiToFrequency(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
  }

  playBirthdayNote(note, duration) {
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;
    const end = now + duration;
    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(this.midiToFrequency(note), now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.025);
    gain.gain.setValueAtTime(0.12, Math.max(now + 0.03, end - 0.09));
    gain.gain.exponentialRampToValueAtTime(0.0001, end);

    oscillator.connect(gain);
    gain.connect(this.audioContext.destination);
    oscillator.onended = () => this.activeOscillators.delete(oscillator);
    this.activeOscillators.add(oscillator);
    oscillator.start(now);
    oscillator.stop(end);
  }

  playNextBirthdayNote() {
    if (!this.isPlaying || !this.audioContext) return;

    const melody = [
      [67, 0.5], [67, 0.5], [69, 1], [67, 1], [72, 1], [71, 2],
      [67, 0.5], [67, 0.5], [69, 1], [67, 1], [74, 1], [72, 2],
      [67, 0.5], [67, 0.5], [79, 1], [76, 1], [72, 1], [71, 1], [69, 2],
      [77, 0.5], [77, 0.5], [76, 1], [72, 1], [74, 1], [72, 2]
    ];
    const [note, beats] = melody[this.noteIndex];
    const duration = beats * 0.4;

    this.playBirthdayNote(note, duration * 0.9);
    this.noteIndex++;

    if (this.noteIndex === melody.length) {
      this.noteIndex = 0;
      this.synthTimeout = setTimeout(() => this.playNextBirthdayNote(), (duration + 0.8) * 1000);
      return;
    }

    const phraseEnds = [5, 11, 18, 24];
    const phrasePause = phraseEnds.includes(this.noteIndex - 1) ? 0.18 : 0;
    this.synthTimeout = setTimeout(
      () => this.playNextBirthdayNote(),
      (duration + phrasePause) * 1000
    );
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  updateUI(isPlaying) {
    if (this.vinylIcon) {
      this.vinylIcon.classList.toggle('is-playing', isPlaying);
    }
    if (this.soundwaves) {
      this.soundwaves.classList.toggle('is-playing', isPlaying);
    }
    if (this.statusLabel) {
      this.statusLabel.textContent = isPlaying
        ? "Joyeux anniversaire : Activée"
        : "Joyeux anniversaire : En pause";
    }
    if (this.toggleBtn) {
      this.toggleBtn.setAttribute(
        'aria-label',
        isPlaying ? 'Mettre en pause Joyeux anniversaire' : 'Écouter Joyeux anniversaire'
      );
    }
  }

  // Mélodie de « Joyeux anniversaire » jouée par le synthétiseur Web Audio.
  startWebAudioSynth() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }

      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      this.noteIndex = 0;
      this.playNextBirthdayNote();
    } catch (e) {
      console.warn("Web Audio non disponible", e);
    }
  }
}

window.RomanticMusicPlayer = RomanticMusicPlayer;
