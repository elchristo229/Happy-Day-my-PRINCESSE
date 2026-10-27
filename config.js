/**
 * ==============================================================================
 * CONFIGURATION DU SITE D'ANNIVERSAIRE AMOUREUX
 * ==============================================================================
 * Ce fichier regroupe TOUTES les informations personnalisables du site.
 * Tu peux facilement modifier les textes, prénoms, dates, photos, lettre d'amour,
 * messages des proches et couleurs sans toucher au code des composants !
 *
 * 💡 ASTUCE :
 * - Remplace les textes entre crochets [EXEMPLE] par tes propres mots.
 * - Enregistre ce fichier puis recharge simplement la page dans ton navigateur.
 * ==============================================================================
 */

const CONFIG = {
  // ----------------------------------------------------------------------------
  // 1. IDENTITÉ & PERSONNES
  // ----------------------------------------------------------------------------
  fiancee: {
    // Prénom officiel ou usuel de ta fiancée
    firstName: "Jessica",
    
    // Le doux surnom affectueux que tu lui donnes en privé
    petName: "Ma Princesse 👑💖",
    
    // Titre d'affichage combiné pour les grands titres
    fullName: "GOHOUN Hanniel Jessica Fifamè"
  },

  author: {
    // Ton prénom ou surnom tel qu'il apparaîtra dans les signatures
    name: "Ton fiancé",
    
    // Signature chaleureuse
    signature: "Avec tout mon amour infini, pour aujourd'hui et pour toujours."
  },

  // ----------------------------------------------------------------------------
  // 2. DATE & COMPTE À REBOURS
  // ----------------------------------------------------------------------------
  event: {
    // Date cible de son anniversaire (Format ISO: AAAA-MM-JJTHH:MM:SS)
    // Cible demandée : 2 Novembre 2026 à 00:00:00
    targetDate: "2026-11-02T00:00:00",
    
    // Fuseau horaire de référence (ex: "Europe/Paris", "Africa/Porto-Novo", "UTC")
    timeZone: "Africa/Porto-Novo",
    
    // Libellé textuel de la date pour l'affichage élégant
    displayDate: "2 Novembre 2026",
    
    // Message affiché sous le compte à rebours avant le jour J
    countdownSubtitle: "Chaque seconde nous rapproche de ce jour si magique…",
    
    // Message spectaculaire affiché quand le compte à rebours atteint zéro (Jour J !)
    celebrationMessage: "🎉 C'EST AUJOURD'HUI ! JOYEUX ET MERVEILLEUX ANNIVERSAIRE MON AMOUR ! ❤️",
    
    // Titre de célébration lorsque le site est visité après ou le jour de l'anniversaire
    celebrationTitle: "Une année de plus à t'aimer et à célébrer la femme extraordinaire que tu es."
  },

  // ----------------------------------------------------------------------------
  // 3. ÉCRAN 1 : LE MYSTÈRE (JEU OUI / NON)
  // ----------------------------------------------------------------------------
  mysteryScreen: {
    // Titre exact demandé
    headline: "J'AI UNE SURPRISE POUR TOI",
    
    // Question exacte demandée
    question: "VEUX-TU LA VOIR ?",
    
    // Texte initial des boutons
    btnYesText: "OUI ❤️",
    btnNoText: "NON 🙈",
    
    // Petite phrase subtile et rassurante sous les boutons
    reassuranceText: "Promis, cette surprise vient du fond de mon cœur…",
    
    // Nombre maximal de refus avant que le bouton NON ne soit absorbé par le OUI
    maxRejections: 7,
    
    // Petites répliques amusantes quand elle clique sur NON
    playfulReplies: [
      "Tu es sûre ? Regarde comme le bouton OUI brille ! ✨",
      "Allez, juste un petit clic sur le OUI… 😉",
      "Tu ne pourras pas résister bien longtemps ! 🥰",
      "Le bouton OUI grandit par amour pour toi ! 💖",
      "Il n'y a pas d'échappatoire à mon amour ! 🌹",
      "Presque absorbé… le OUI est irrésistible ! 💫",
      "Tu as capitulé devant tant d'amour ! Prépare-toi… ❤️"
    ]
  },

  // ----------------------------------------------------------------------------
  // 4. ÉCRAN 2 : LE DÉVOILEMENT
  // ----------------------------------------------------------------------------
  revealScreen: {
    // Phrase d'introduction poétique
    introText: "Cette surprise a été préparée spécialement pour toi…",
    
    // Message romantique personnalisé révélé
    revealMessage: "Ma Princesse 👑💖, en ce jour unique, j'ai voulu créer un univers à la hauteur de la lumière que tu apportes chaque jour dans ma vie. Chaque souvenir, chaque mot et chaque pétale ici présents t'appartiennent.",
    
    // Texte du bouton d'entrée dans l'univers
    ctaButtonText: "DÉCOUVRIR MA SURPRISE ❤️"
  },

  // ----------------------------------------------------------------------------
  // 5. CHRONOLOGIE DE NOTRE HISTOIRE (« NOTRE HISTOIRE »)
  // ----------------------------------------------------------------------------
  timeline: [
    {
      date: "5 mars 2025",
      title: "Notre Rencontre",
      description: "Le moment où nos regards se sont croisés pour la première fois. Une étincelle qui allait changer ma vie à tout jamais.",
      icon: "✨"
    },
    {
      date: "7 juillet 2025",
      title: "Nos Fiançailles",
      description: "Le serment de nous aimer, de nous soutenir et de construire ensemble une histoire éternelle.",
      icon: "💍"
    },
    {
      date: "25 juillet 2025",
      title: "Notre Premier Rencard",
      description: "Ces heures passées à discuter comme si le temps s'était suspendu. Ton sourire a illuminé mon monde.",
      icon: "☕"
    },
    {
      date: "2 Novembre 2026",
      title: "Ton Anniversaire Merveilleux",
      description: "Aujourd'hui, nous célébrons ton existence précieuse. Et le meilleur de notre histoire reste à écrire.",
      icon: "🎂"
    }
  ],

  // ----------------------------------------------------------------------------
  // 6. GALERIE PHOTOGRAPHIQUE (STYLE POLAROID)
  // ----------------------------------------------------------------------------
  // Photos et vidéo personnelles déposées dans le dossier Han.
  gallery: [
    {
      id: 1,
      image: "Han/Section 'notre rencontre' 1.jpg",
      caption: "Notre rencontre",
      date: "5 mars 2025",
      location: "Le début de notre histoire"
    },
    {
      id: 2,
      image: "Han/Section 'nos fiançailles'.jpg",
      caption: "Nos fiançailles",
      date: "7 juillet 2025",
      location: "Une promesse à deux"
    },
    {
      id: 3,
      image: "Han/Section 'Ton anniversaire merveilleux' 1.jpg",
      caption: "Souvenir d'anniversaire",
      date: "Un souvenir d'anniversaire",
      location: "",
      groupId: "birthday",
      groupTitle: "Ton anniversaire merveilleux"
    },
    {
      id: 4,
      image: "Han/Section 'Ton anniversaire merveilleux' 2.jpg",
      caption: "Souvenir d'anniversaire",
      date: "Un souvenir d'anniversaire",
      location: "",
      groupId: "birthday",
      groupTitle: "Ton anniversaire merveilleux"
    },
    {
      id: 5,
      image: "Han/Souvenirs 1.jpg",
      caption: "Souvenir 1",
      date: "",
      location: "Nos souvenirs",
      groupId: "souvenirs",
      groupTitle: "Nos souvenirs"
    },
    {
      id: 6,
      image: "Han/Souvenirs 2.jpg",
      caption: "Souvenir 2",
      date: "",
      location: "Nos souvenirs",
      groupId: "souvenirs",
      groupTitle: "Nos souvenirs"
    },
    {
      id: 7,
      image: "Han/Souvenirs 3.jpg",
      caption: "Souvenir 3",
      date: "",
      location: "Nos souvenirs",
      groupId: "souvenirs",
      groupTitle: "Nos souvenirs"
    },
    {
      id: 8,
      image: "Han/Souvenirs 4.jpg",
      caption: "Souvenir 4",
      date: "",
      location: "Nos souvenirs",
      groupId: "souvenirs",
      groupTitle: "Nos souvenirs"
    },
    {
      id: 9,
      image: "Han/Souvenirs 5.jpg",
      caption: "Souvenir 5",
      date: "",
      location: "Nos souvenirs",
      groupId: "souvenirs",
      groupTitle: "Nos souvenirs"
    },
    {
      id: 10,
      image: "Han/Souvenirs 6.jpg",
      caption: "Souvenir 6",
      date: "",
      location: "Nos souvenirs",
      groupId: "souvenirs",
      groupTitle: "Nos souvenirs"
    },
    {
      id: 11,
      image: "Han/Souvenirs 7.jpg",
      caption: "Souvenir 7",
      date: "",
      location: "Nos souvenirs",
      groupId: "souvenirs",
      groupTitle: "Nos souvenirs"
    },
    {
      id: 12,
      image: "Han/Souvenirs 8.jpg",
      caption: "Souvenir 8",
      date: "",
      location: "Nos souvenirs",
      groupId: "souvenirs",
      groupTitle: "Nos souvenirs"
    },
    {
      id: 13,
      image: "Han/Souvenirs 9.jpg",
      caption: "Souvenir 9",
      date: "",
      location: "Nos souvenirs",
      groupId: "souvenirs",
      groupTitle: "Nos souvenirs"
    },
    {
      id: 14,
      image: "Han/Souvenirs 10.jpg",
      caption: "Souvenir 10",
      date: "",
      location: "Nos souvenirs",
      groupId: "souvenirs",
      groupTitle: "Nos souvenirs"
    },
    {
      id: 15,
      image: "Han/Souvenirs 11.jpg",
      caption: "Souvenir 11",
      date: "",
      location: "Nos souvenirs",
      groupId: "souvenirs",
      groupTitle: "Nos souvenirs"
    },
    {
      id: 16,
      image: "Han/Souvenirs 12.jpg",
      caption: "Souvenir 12",
      date: "",
      location: "Nos souvenirs",
      groupId: "souvenirs",
      groupTitle: "Nos souvenirs"
    },
    {
      id: 17,
      image: "Han/Souvenirs 13.jpg",
      caption: "Souvenir 13",
      date: "",
      location: "Nos souvenirs",
      groupId: "souvenirs",
      groupTitle: "Nos souvenirs"
    },
    {
      id: 18,
      image: "Han/Souvenirs 14.jpg",
      caption: "Souvenir 14",
      date: "",
      location: "Nos souvenirs",
      groupId: "souvenirs",
      groupTitle: "Nos souvenirs"
    },
    {
      id: 19,
      image: "Han/Souvenirs 15.jpg",
      caption: "Souvenir 15",
      date: "",
      location: "Nos souvenirs",
      groupId: "souvenirs",
      groupTitle: "Nos souvenirs"
    },
    {
      id: 20,
      image: "Han/Souvenirs 16.jpeg",
      caption: "Souvenir 16",
      date: "",
      location: "Nos souvenirs",
      groupId: "souvenirs",
      groupTitle: "Nos souvenirs"
    },
    {
      id: 21,
      image: "Han/Souvenirs 17.jpg",
      caption: "Souvenir 17",
      date: "",
      location: "Nos souvenirs",
      groupId: "souvenirs",
      groupTitle: "Nos souvenirs"
    },
    {
      id: 22,
      type: "video",
      image: "Han/Premier-rencard-web.mp4",
      caption: "Notre premier rencard",
      date: "25 juillet 2025",
      location: "Notre vidéo souvenir"
    }
  ],

  // ----------------------------------------------------------------------------
  // 7. LETTRE D'AMOUR INTERACTIVE (L'ENVELOPPE AU SCEAU DE CIRE)
  // ----------------------------------------------------------------------------
  loveLetter: {
    waxSealText: "G & H", // Initiales sur le sceau de cire
    envelopeColor: "#5C1D2E", // Bordeaux profond
    
    heading: "À la femme de ma vie",
    subheading: "Lettre écrite avec tout mon cœur pour ton anniversaire",
    date: "2 Novembre 2026",
    
    // Contenu divisé en sections émotionnelles
    sections: {
      introduction: "Ma Princesse 👑💖, en ce 2 novembre 2026, je veux prendre un moment suspendu pour te dire combien tu comptes pour moi. Ton sourire et ta présence rendent ma vie plus belle, et je suis heureux de célébrer cette journée avec toi.",
      
      whatILoveAboutYou: "J'aime ta douceur, ta détermination, ton intelligence et ta générosité. J'aime surtout la lumière dans tes yeux lorsque tu ris aux éclats.",
      
      favoriteMemories: "Je chéris chaque souvenir partagé, nos conversations, nos fous rires et tous ces instants de complicité qui n'appartiennent qu'à nous.",
      
      whatYouMeanToMe: "Tu es ma partenaire, ma confidente et ma fiancée adorée. À tes côtés, je me sens chanceux et reconnaissant de partager notre histoire.",
      
      wishesForFuture: "Pour cette nouvelle année, je te souhaite beaucoup de bonheur, la santé et la réussite dans tous tes projets. Je serai toujours là pour t'encourager, te soutenir et t'aimer.",
      
      closingDeclaration: "Joyeux anniversaire, Jessica. Que ta journée soit aussi belle et lumineuse que toi. Je t'aime de tout mon cœur."
    },
    
    postScriptum: "P.S. : Ce site n'est qu'un prélude… la vraie fête commence maintenant !"
  },

  // ----------------------------------------------------------------------------
  // 8. SURPRISES CACHÉES & MOTS DOUX
  // ----------------------------------------------------------------------------
  // Les 12 raisons pour lesquelles je t'aime (cartes interactives à cliquer)
  loveReasons: [
    { id: 1, title: "Ton sourire", text: "Il suffit d'un seul de tes sourires pour illuminer ma journée la plus sombre." },
    { id: 2, title: "Ta bienveillance", text: "Ton cœur immense pense toujours au bonheur de ceux que tu aimes." },
    { id: 3, title: "Ton rire contagieux", text: "Le son de ton rire est mon remède préféré contre tous les soucis." },
    { id: 4, title: "Ta force intérieure", text: "J'admire ton courage et ta grâce face à chaque défi de la vie." },
    { id: 5, title: "Nos fous rires", text: "Ces moments où l'on rit aux larmes pour des bêtises que nous seuls comprenons." },
    { id: 6, title: "Tes câlins chaleureux", text: "Dans tes bras, je me sens chez moi, en totale sécurité et en paix." },
    { id: 7, title: "Nos projets d'avenir", text: "Chaque rêve devient plus doux quand je sais que c'est avec toi que je le réaliserai." },
    { id: 8, title: "Ta tendresse", text: "Cette délicatesse unique dans tes gestes et dans ton regard." },
    { id: 9, title: "Ton intelligence", text: "J'adore échanger avec toi, apprendre à travers toi et admirer ta finesse d'esprit." },
    { id: 10, title: "Ta présence apaisante", text: "Même sans un mot, le simple fait d'être près de toi m'apporte la sérénité." },
    { id: 11, title: "Ta beauté rayonnante", text: "Chaque jour, je retombe amoureux de ta grâce naturelle et de ton élégance." },
    { id: 12, title: "Tout simplement TOI", text: "Parce que tu es unique, irremplaçable et la meilleure chose qui me soit arrivée." }
  ],

  // Bons d'amour & surprises interactives (coupons virtuels)
  loveCoupons: [
    { title: "Dîner aux Chandelles", desc: "Valable pour un dîner romantique préparé spécialement pour toi.", icon: "🕯️" },
    { title: "Massage & Détente", desc: "Valable pour une séance complète de relaxation et chouchoutage.", icon: "💆‍♀️" },
    { title: "Escapade Surprise", desc: "Valable pour une journée ou un week-end d'aventure rien que nous deux.", icon: "✈️" },
    { title: "Câlin Infini", desc: "Valable sans limite de temps, de jour comme de nuit, à volonté !", icon: "🫂" }
  ],

  // ----------------------------------------------------------------------------
  // 9. MUR DE MESSAGES ET DE VŒUX (LIVRE D'OR)
  // ----------------------------------------------------------------------------
  // Messages fournis dans Han/Le mur des voeux et mots doux.
  guestbookMessages: [
    {
      id: "voeu-jp",
      author: "JP",
      relation: "Un proche",
      date: "Pour ton anniversaire",
      avatar: "💌",
      authorImage: "Han/Le mur des voeux et mots doux/JP.jpg",
      text: "Joyeux anniversaire ! Je suis vraiment ravi(e) de compter une amie aussi formidable que toi dans ma vie. Merci pour tous nos bons moments, ta bonne humeur et ta présence au quotidien. Passe une excellente journée entourée de ceux que tu aimes et profite à fond de ton année ! 🎂🥂"
    },
    {
      id: "voeu-jerry",
      author: "Jerry",
      relation: "Un proche",
      date: "Pour ton anniversaire",
      avatar: "💌",
      authorImage: "Han/Le mur des voeux et mots doux/Jerry.jpg",
      text: "Alors Hanniel 😂 Ma belle-sœur ou bien notre femme, un truc du genre 😂 Toujours en train de m’insulter alors que si Gille est encore fidèle aujourd’hui, c’est en grande partie grâce à moi inh😒 Bref, joyeux anniversaire à toi petite 🥲✨ Respecte-moi désormais, sinon je vais commencer à donner de mauvais conseils à Gille😈 Je te souhaite tout le meilleur, plein de succès et de belles choses dans ta vie. Que Dieu t’accorde le bonheur et la réussite dans tout ce que tu entreprends✨ Et surtout, casse tout, profite de ta vie, brille de mille feux et laisse Gille sortir la monnaie 🤣"
    },
    {
      id: "voeu-josaphate",
      author: "Josaphate",
      relation: "Une proche",
      date: "Pour ton anniversaire",
      avatar: "💌",
      authorImage: "Han/Le mur des voeux et mots doux/Josaphate.jpg",
      text: "Joyeux anniversaire à toi Hanniel🥳❤️ Même si on ne se connaît pas personnellement je te trouve assez simple et t’es la plupart du temps en joie et bah je prie que cette joie te quitte jamais Je te souhaite le bonheur la réussite la santé et prends bien soin de mon ami et ennemi (barcelonais quoi cet type là😂) Encore joyeux anniversaire à toi et que le meilleur de ta vie soit encore devant toi ❤️🎉"
    }
  ],

  guestbookContributors: [
    { name: "Halil", image: "Han/Le mur des voeux et mots doux/Halil.jpg" },
    { name: "JP", image: "Han/Le mur des voeux et mots doux/JP.jpg" },
    { name: "Jerry", image: "Han/Le mur des voeux et mots doux/Jerry.jpg" },
    { name: "Josaphate", image: "Han/Le mur des voeux et mots doux/Josaphate.jpg" }
  ],

  // ----------------------------------------------------------------------------
  // 10. ÉCRAN FINAL : GRAND FINAL D'ANNIVERSAIRE
  // ----------------------------------------------------------------------------
  finalScreen: {
    headline: "JOYEUX ANNIVERSAIRE",
    subheadline: "Que tous tes rêves les plus précieux se réalisent aujourd'hui et toujours.",
    closingWish: "Merci d'exister et de faire de chaque instant un pur bonheur. Mon amour pour toi grandit de jour en jour.",
    btnReplayMemories: "Revoir nos souvenirs 📸",
    btnReplayLetter: "Relire la lettre d'amour 💌",
    btnRestartSurprise: "Rejouer la surprise depuis le début 🔄"
  },

  // ----------------------------------------------------------------------------
  // 11. MUSIQUE & AMBIANCE SONORE
  // ----------------------------------------------------------------------------
  music: {
    // Chemin vers le fichier audio (placer ton mp3 dans 'assets/audio/mon-amour.mp3')
    audioSrc: "", // Laisser vide sans MP3 : le synthétiseur intégré sera utilisé
    
    // Titre de la chanson affiché sur le lecteur
    trackTitle: "Joyeux anniversaire",
    
    // Artiste affiché
    trackArtist: "Pour Ma Princesse 👑💖",
    
    // Sans fichier audio, le synthétiseur Web Audio joue la mélodie de
    // « Joyeux anniversaire ».
    enableWebAudioFallback: true,
    
    // Volume par défaut (0.0 à 1.0)
    defaultVolume: 0.65
  },

  // ----------------------------------------------------------------------------
  // 12. DIRECTION ARTISTIQUE & COULEURS
  // ----------------------------------------------------------------------------
  theme: {
    colors: {
      rosePowderLight: "#FFF5F5",   // Rose très clair / arrière-plan subtil
      rosePowder: "#F8D7DA",        // Rose poudré principal
      rosePowderAccent: "#F3A6B2",  // Accent rose doux
      burgundyDark: "#3D0C1A",      // Bordeaux très sombre
      burgundy: "#5C1D2E",          // Bordeaux profond signature
      burgundyLight: "#8B263E",     // Bordeaux éclatant
      cream: "#FDFBF7",             // Crème / ivoire délicat
      goldSoft: "#D4AF37",          // Or doux royal
      goldLight: "#F3E5AB",         // Reflet or clair
      whitePure: "#FFFFFF",         // Blanc lumineux
      textDark: "#2B1118",          // Texte sombre à haut contraste
      textMuted: "#6B555B"          // Texte secondaire élégant
    }
  },

  // ----------------------------------------------------------------------------
  // 13. MODE PARTICIPATIF EN LIGNE (FIREBASE OPTIONNEL)
  // ----------------------------------------------------------------------------
  // Par défaut, le site fonctionne en MODE STATIQUE GRATUIT (100% autonome, zéro backend,
  // idéal pour GitHub Pages). Les vœux soumis via le formulaire sont conservés dans
  // le localStorage du navigateur pour les tests.
  //
  // Si tu souhaites que des proches éloignés écrivent des vœux EN TEMPS RÉEL,
  // crée un projet Firebase gratuit (Spark Plan = 100% gratuit), active Firestore,
  // bascule 'enabled' sur true et remplis les identifiants ci-dessous.
  firebase: {
    enabled: false, // Passer à true pour activer le mode en ligne
    config: {
      apiKey: "VOTRE_API_KEY",
      authDomain: "votre-projet.firebaseapp.com",
      projectId: "votre-projet",
      storageBucket: "votre-projet.appspot.com",
      messagingSenderId: "123456789",
      appId: "1:123456789:web:abcdef"
    },
    collectionName: "anniversaire_voeux"
  }
};

// Export universel (compatible navigateur direct et modules ES6)
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}

if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
