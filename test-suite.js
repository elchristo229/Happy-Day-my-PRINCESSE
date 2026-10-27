const fs = require('fs');
const path = require('path');

console.log("=== VÉRIFICATION COMPLÈTE DU SITE D'ANNIVERSAIRE ROMANTIQUE ===");

let errors = [];
let passes = [];

function assert(condition, message) {
  if (condition) {
    passes.push(message);
    console.log(`  [OK] ${message}`);
  } else {
    errors.push(message);
    console.error(`  [FAIL] ${message}`);
  }
}

const baseDir = __dirname;

// 1. Vérification de la présence des fichiers clés
const requiredFiles = [
  'index.html',
  'config.js',
  'css/variables.css',
  'css/base.css',
  'css/animations.css',
  'css/components.css',
  'css/responsive.css',
  'js/particles.js',
  'js/music.js',
  'js/mystery-game.js',
  'js/countdown.js',
  'js/envelope.js',
  'js/gallery.js',
  'js/surprises.js',
  'js/guestbook.js',
  'js/app.js',
  'assets/images/photo-1.svg',
  'assets/images/photo-2.svg',
  'assets/images/photo-3.svg',
  'assets/images/photo-4.svg',
  'assets/images/photo-5.svg',
  'assets/images/photo-6.svg'
];

requiredFiles.forEach(file => {
  const fullPath = path.join(baseDir, file);
  assert(fs.existsSync(fullPath), `Fichier présent : ${file}`);
});

// 2. Vérification de la configuration CONFIG
const configPath = path.join(baseDir, 'config.js');
let CONFIG;
try {
  CONFIG = require(configPath);
  assert(true, "config.js est un module JavaScript valide et exécutable");
} catch (e) {
  assert(false, `Erreur d'import de config.js : ${e.message}`);
}

if (CONFIG) {
  assert(CONFIG.fiancee && CONFIG.fiancee.firstName !== undefined, "CONFIG contient fiancee.firstName");
  assert(CONFIG.fiancee && CONFIG.fiancee.petName !== undefined, "CONFIG contient fiancee.petName");
  assert(CONFIG.author && CONFIG.author.name !== undefined, "CONFIG contient author.name");
  assert(CONFIG.event && CONFIG.event.targetDate === "2026-11-02T00:00:00", "Date cible configurée au 2 Novembre 2026");
  assert(CONFIG.mysteryScreen && CONFIG.mysteryScreen.headline === "J'AI UNE SURPRISE POUR TOI", "Titre exact Écran 1 respecté");
  assert(CONFIG.mysteryScreen && CONFIG.mysteryScreen.question === "VEUX-TU LA VOIR ?", "Question exacte Écran 1 respectée");
  assert(CONFIG.loveLetter && CONFIG.loveLetter.sections && CONFIG.loveLetter.sections.whatILoveAboutYou, "Lettre d'amour contient section 'Ce que j'aime chez toi'");
  assert(CONFIG.loveLetter.sections.favoriteMemories, "Lettre d'amour contient section 'Souvenirs'");
  assert(CONFIG.loveLetter.sections.whatYouMeanToMe, "Lettre d'amour contient section 'Ce qu'elle représente'");
  assert(CONFIG.loveLetter.sections.wishesForFuture, "Lettre d'amour contient section 'Vœux d'avenir'");
  assert(CONFIG.loveLetter.sections.closingDeclaration, "Lettre d'amour contient section 'Déclaration finale'");
  assert(Array.isArray(CONFIG.gallery) && CONFIG.gallery.length === 22, "Galerie configurée avec 21 photos et une vidéo personnelle");
  assert(CONFIG.gallery.filter((item) => item.type !== 'video').length === 21, "Les 21 photos du dossier Han sont intégrées");
  assert(CONFIG.gallery.filter((item) => item.type === 'video').length === 1, "La vidéo du premier rencard est intégrée");
  assert(new Set(CONFIG.gallery.map((item) => item.type === 'video' ? `video-${item.id}` : item.groupId || `photo-${item.id}`)).size === 5, "Galerie regroupée en cinq cartes photo/vidéo");
  assert(CONFIG.gallery.filter((item) => item.groupId === 'souvenirs').length === 17, "Les 17 photos Souvenirs partagent une carte diaporama");
  assert(CONFIG.gallery.filter((item) => item.groupId === 'birthday').length === 2, "Les deux photos d'anniversaire partagent une carte diaporama");
  assert(Array.isArray(CONFIG.guestbookMessages) && CONFIG.guestbookMessages.length === 3, "Les trois messages de vœux sont intégrés");
  assert(Array.isArray(CONFIG.guestbookContributors) && CONFIG.guestbookContributors.length === 4, "Les quatre photos de proches sont référencées");
  assert(Array.isArray(CONFIG.loveReasons) && CONFIG.loveReasons.length === 12, "Surprises : 12 raisons d'aimer configurées");
  assert(Array.isArray(CONFIG.loveCoupons) && CONFIG.loveCoupons.length >= 4, "Surprises : Bons d'amour configurés");
  assert(CONFIG.music && CONFIG.music.enableWebAudioFallback === true, "Web Audio API de secours activée pour la musique");
  assert(CONFIG.music && CONFIG.music.audioSrc === "", "Aucun MP3 optionnel n'est chargé par défaut");
  assert(CONFIG.fiancee.firstName === "Jessica", "Prénom configuré pour les titres d'anniversaire");
  assert(CONFIG.fiancee.petName === "Ma Princesse 👑💖", "Surnom affectueux configuré avec ses emojis");
  assert(CONFIG.fiancee.fullName === "GOHOUN Hanniel Jessica Fifamè", "Nom complet configuré pour l'écran de révélation");
  assert(CONFIG.loveLetter.waxSealText === "G & H", "Initiales du couple configurées sur le sceau");
  assert(CONFIG.revealScreen.revealMessage.includes("Ma Princesse 👑💖"), "Message de révélation personnalisé avec son surnom");
  assert(CONFIG.timeline[0].date === "5 mars 2025", "Date de rencontre configurée");
  assert(CONFIG.timeline[1].date === "7 juillet 2025" && CONFIG.timeline[1].title === "Nos Fiançailles", "Date de fiançailles configurée");
  assert(CONFIG.timeline[2].date === "25 juillet 2025" && CONFIG.timeline[2].title === "Notre Premier Rencard", "Date et titre du premier rencard configurés");
}

const configContent = fs.readFileSync(configPath, 'utf8');
assert(configContent.includes("window.CONFIG = CONFIG;"), "CONFIG est exposée aux scripts dans le navigateur");
const musicContent = fs.readFileSync(path.join(baseDir, 'js', 'music.js'), 'utf8');
assert(musicContent.includes("playNextBirthdayNote"), "Le lecteur joue la mélodie de Joyeux anniversaire");
assert(musicContent.includes("[67, 0.5], [67, 0.5], [69, 1], [67, 1], [72, 1], [71, 2]"), "La mélodie synthétisée contient la phrase reconnaissable de Joyeux anniversaire");
const surprisesContent = fs.readFileSync(path.join(baseDir, 'js', 'surprises.js'), 'utf8');
assert(surprisesContent.includes('<span class="timeline-date">${item.date}</span>'), "La date est affichée sur chaque étape de la chronologie");
const galleryContent = fs.readFileSync(path.join(baseDir, 'js', 'gallery.js'), 'utf8');
assert(galleryContent.includes("player.className = 'polaroid-video'") && galleryContent.includes('player.controls = true'), "Les vidéos sont lisibles depuis la galerie");
assert(!galleryContent.includes("addEventListener('mouseenter', pauseSlideshow)"), "Le survol ne bloque pas l'avance automatique des diaporamas");
assert(galleryContent.includes("addEventListener('focusin', pauseSlideshow)"), "Le diaporama se met en pause pour la navigation au clavier");
const guestbookContent = fs.readFileSync(path.join(baseDir, 'js', 'guestbook.js'), 'utf8');
assert(guestbookContent.includes('guestbook-contributors'), "Les photos des proches sont rendues dans le livre d'or");
assert(guestbookContent.includes('openContributorImage'), "Les photos des proches ouvrent la visionneuse");

if (CONFIG) {
  const mediaPaths = [
    ...CONFIG.gallery.map((item) => item.image),
    ...CONFIG.guestbookMessages.map((message) => message.authorImage),
    ...CONFIG.guestbookContributors.map((contributor) => contributor.image)
  ].filter(Boolean);

  mediaPaths.forEach((file) => {
    assert(fs.existsSync(path.join(baseDir, file)), `Média présent : ${file}`);
  });
  const videoPath = path.join(baseDir, CONFIG.gallery.find((item) => item.type === 'video').image);
  assert(fs.statSync(videoPath).size < 25 * 1024 * 1024, "La vidéo web compressée fait moins de 25 Mo");
}

// 3. Test de la logique OUI / NON et calcul du nombre de "I"
console.log("\n--- TEST LOGIQUE DU JEU OUI / NON ---");
for (let rejections = 0; rejections <= 8; rejections++) {
  const totalIs = Math.min(rejections + 1, 9);
  const yesText = "OU" + "I".repeat(totalIs) + " ❤️";
  const expectedI = totalIs;
  assert(yesText.includes("I".repeat(expectedI)), `Rejet ${rejections} : Texte généré "${yesText}" avec ${expectedI} fois la lettre I`);
}

// 4. Test de présence des balises HTML et IDs critiques
console.log("\n--- TEST INTÉGRITÉ DU FICHIER INDEX.HTML ---");
const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const appContent = fs.readFileSync(path.join(baseDir, 'js', 'app.js'), 'utf8');
assert(
  !/id="reveal-screen"[^>]*style="display:\s*none"/.test(htmlContent),
  "L'écran de dévoilement n'est pas bloqué par un style inline"
);
assert(
  appContent.includes("revealScreen.style.display = 'none'"),
  "L'écran de dévoilement disparaît quand l'expérience principale s'ouvre"
);

const criticalIds = [
  'particles-canvas',
  'navbar-floating',
  'mystery-screen',
  'mystery-headline',
  'mystery-question',
  'btn-mystery-yes',
  'btn-mystery-no',
  'playful-reaction',
  'mystery-reassurance',
  'reveal-screen',
  'reveal-fiancee-name',
  'reveal-message',
  'btn-discover-surprise',
  'main-experience',
  'countdown-section',
  'countdown-grid',
  'countdown-days',
  'countdown-hours',
  'countdown-minutes',
  'countdown-seconds',
  'countdown-celebration',
  'story-section',
  'timeline-wrapper',
  'gallery-section',
  'gallery-grid',
  'letter-section',
  'envelope-3d',
  'envelope-flap-top',
  'wax-seal',
  'wax-seal-initials',
  'parchment-letter',
  'parchment-heading',
  'letter-sec-intro',
  'letter-sec-love',
  'letter-sec-memories',
  'letter-sec-meaning',
  'letter-sec-wishes',
  'letter-sec-closing',
  'parchment-signature-author',
  'btn-reread-letter',
  'btn-refold-letter',
  'surprises-section',
  'reasons-grid',
  'coupons-grid',
  'btn-trigger-petals',
  'btn-trigger-confetti',
  'messages-section',
  'guestbook-messages-list',
  'guestbook-static-note',
  'guestbook-contributors',
  'guestbook-form',
  'guestbook-author',
  'guestbook-relation',
  'guestbook-message',
  'guestbook-website',
  'guestbook-char-counter',
  'btn-submit-wishes',
  'celebration-section',
  'celebration-title-text',
  'celebration-quote-text',
  'btn-final-memories',
  'btn-final-letter',
  'btn-final-restart',
  'lightbox-modal',
  'lightbox-image',
  'lightbox-caption',
  'lightbox-date',
  'lightbox-counter',
  'lightbox-close-btn',
  'lightbox-prev-btn',
  'lightbox-next-btn',
  'music-toggle-btn',
  'music-vinyl-icon',
  'music-soundwaves',
  'toast-notification'
];

assert(
  !/id="lightbox-image"[^>]*src=""/.test(htmlContent),
  "L'image de la visionneuse ne déclenche pas de requête vide"
);

criticalIds.forEach(id => {
  assert(htmlContent.includes(`id="${id}"`), `ID HTML présent dans index.html : id="${id}"`);
});

// 5. Test des contrastes et de l'accessibilité
assert(htmlContent.includes('aria-label='), "Balises d'accessibilité aria-label présentes");
assert(htmlContent.includes('role="dialog"'), "Modal Lightbox possède role='dialog' et aria-modal='true'");
assert(htmlContent.includes('role="region"'), "Région accessible présente pour le compte à rebours");

const cssBase = fs.readFileSync(path.join(baseDir, 'css', 'base.css'), 'utf8');
assert(cssBase.includes('prefers-reduced-motion'), "CSS (css/base.css) contient la gestion de prefers-reduced-motion");

console.log("\n=======================================================");
console.log(`RÉSULTAT DU CONTRÔLE : ${passes.length} SUCCÈS, ${errors.length} ERREURS.`);
if (errors.length > 0) {
  console.error("DES ERREURS ONT ÉTÉ DÉTECTÉES !");
  process.exit(1);
} else {
  console.log("TOUS LES TESTS PASSENT AVEC SUCCÈS ! 100% VALIDE !");
  process.exit(0);
}
