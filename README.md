# 🌹 Expérience Web d'Anniversaire Amoureux — 2 Novembre 2026

Une création numérique d'exception, immersive, cinématographique et personnalisée, conçue avec un soin artisanal pour célébrer l'anniversaire de ma fiancée le **2 novembre 2026**.

Ce projet transcende la simple carte de vœux virtuelle : il propose un parcours émotionnel interactif en 7 actes, alliant une direction artistique romantique haut de gamme (rose poudré, bordeaux profond, ivoire et or doux) à des micro-interactions soignées, une animation 3D d'enveloppe au cachet de cire, un compte à rebours précis, un lecteur musical avec ambiance générative, et le fameux **jeu mystère interactif OUI / NON**.

---

## ✨ 1. Les Moments Clés de l'Expérience

1. **Écran d'Accueil Mystère & Jeu OUI / NON :**
   - Question mystérieuse : *« J'AI UNE SURPRISE POUR TOI — VEUX-TU LA VOIR ? »*
   - Interaction ludique : à chaque refus sur **NON 🙈**, le bouton **OUI ❤️** s'agrandit, reçoit un « I » supplémentaire calculé dynamiquement (*OUI*, *OUII*, *OUIII*, jusqu'à *OUIIIIIIIII*), rebondit joyeusement et libère des cœurs flottants, tandis que le bouton NON rétrécit et finit par être magnétiquement absorbé jusqu'à disparaître complètement !
2. **Écran de Dévoilement :**
   - Révélation douce et lumineuse du prénom de ma fiancée dans une calligraphie scintillante.
3. **Compte à Rebours Animé (2 Novembre 2026) :**
   - Affichage précis en temps réel (Jours, Heures, Minutes, Secondes) sans jamais afficher de valeurs négatives.
   - Bannière festive activée automatiquement le Jour J.
4. **Notre Histoire d'Amour :**
   - Chronologie verticale poétique des jalons inoubliables de notre relation.
5. **Galerie Souvenirs Polaroid :**
   - Souvenirs regroupés par occasion dans des cartes-diaporamas à défilement automatique et manuel.
   - Photos agrandissables dans une visionneuse plein écran, avec navigation tactile (swipe) et clavier.
   - Vidéo du premier rencard compressée en H.264 pour une lecture web plus fluide.
6. **Lettre d'Amour Interactive en 3D :**
   - Enveloppe bordeaux au sceau de cire doré gravé.
   - Rupture du sceau au clic, déploiement du rabat en 3D et déroulement du parchemin de déclaration d'amour.
7. **Surprises Cachées & Mots Doux :**
   - Les 12 raisons pour lesquelles je t'aime (cartes 3D à retourner).
   - Bons d'amour virtuels (dîner aux chandelles, massages, escapades).
   - Déclencheurs de pluie de pétales de roses 🌸 et d'explosions de confettis 🎉.
8. **Mur de Vœux & Livre d'Or :**
   - Messages d'amour et de bénédictions des proches.
   - Formulaire de contribution avec filtre anti-spam, compteur de caractères et validation bienveillante.
   - En mode GitHub Pages statique, les vœux et leurs auteurs sont préparés dans `config.js` avant publication. Le formulaire en ligne est masqué pour éviter de promettre un partage que l'hébergement statique ne fournit pas.
9. **Grand Final & Célébration Royale :**
   - Typographie dorée géante, citation finale et boutons de relecture rapide des souvenirs et de la lettre.
10. **Lecteur Audio d'Anniversaire :**
    - Disque vinyle animé et visualiseur sonore en temps réel.
    - Mélodie de « Joyeux anniversaire » jouée par le synthétiseur Web Audio natif, sans fichier MP3 requis.

---

## 📁 2. Arborescence Complète du Projet

```text
anniversaire/
├── index.html                           # Page unique interactive assemblant tous les composants
├── config.js                            # Source unique de vérité pour TOUS les textes, dates et photos
├── test-suite.js                        # Script de validation automatisée (177 tests unitaires & d'intégrité)
├── server.js                            # Serveur local ultra-léger sans dépendance (Node.js natif)
├── README.md                            # Présentation générale du projet (ce document)
├── GUIDE_DEPLOIEMENT_GITHUB_PAGES.md    # Guide pas-à-pas pour débutant absolu (déploiement gratuit)
├── GUIDE_PERSONNALISATION.md            # Guide pour modifier photos, lettre et prénoms sans coder
├── GUIDE_MODE_EN_LIGNE_FIREBASE.md      # Documentation pour activer le livre d'or collaboratif en temps réel
├── Han/                                 # Photos, vidéo compressée et vœux personnels pour le site
├── css/
│   ├── variables.css                    # Tokens de couleurs (bordeaux, rose poudré, or, crème), typographies
│   ├── base.css                         # Reset, a11y, typographies de base, scrollbar raffinée
│   ├── animations.css                   # Keyframes (rebond, absorption, rabat 3D, cœurs, pétales, confettis)
│   ├── components.css                   # Styles de l'enveloppe, polaroid, lightbox, lecteur, formulaires
│   └── responsive.css                   # Optimisations sur-mesure pour 320px, 375px, 768px, 1024px+
├── js/
│   ├── particles.js                     # Moteur Canvas haute performance (étoiles, cœurs flottants, pétales)
│   ├── mystery-game.js                  # Algorithme du jeu OUI/NON (calcul des "I", absorption magnétique)
│   ├── countdown.js                     # Horloge à rebours dynamique jusqu'au 2 Novembre 2026
│   ├── envelope.js                      # Gestionnaire 3D de l'enveloppe, rupture du sceau et parchemin
│   ├── gallery.js                       # Cartes-diaporamas, vidéo et visionneuse photo tactile
│   ├── surprises.js                     # Cartes retournables, bons d'amour et pluie de pétales
│   ├── guestbook.js                     # Livre d'or (sauvegarde locale + passerelle Firebase optionnelle)
│   ├── music.js                         # Lecteur audio + mélodie synthétisée de Joyeux anniversaire
│   └── app.js                           # Orchestrateur principal et injection des données de config.js
└── assets/
    ├── images/                          # Emplacement pour tes photos personnelles (SVG d'exemple inclus)
    │   ├── photo-1.svg                  # Cliché 1 : Coucher de soleil romantique
    │   ├── photo-2.svg                  # Cliché 2 : Dîner aux chandelles
    │   ├── photo-3.svg                  # Cliché 3 : Cœurs enlacés et complicité
    │   ├── photo-4.svg                  # Cliché 4 : Bouquet de roses éternelles
    │   ├── photo-5.svg                  # Cliché 5 : Promenade au bord de l'eau
    │   └── photo-6.svg                  # Cliché 6 : Couronne royale pour Ma Reine
    └── audio/
        └── (Place ton fichier MP3 optionnel ici : romantic-ambience.mp3)
```

---

## 🚀 3. Lancement Rapide en Local

Tu peux prévisualiser le site immédiatement sur ton ordinateur de deux manières simples :

### Méthode A : Double-clic direct (Sans aucun outil)
1. Va dans le dossier `anniversaire/`.
2. Double-clique simplement sur le fichier `index.html`.
3. Le site s'ouvre directement dans ton navigateur habituel (Google Chrome, Edge, Safari, Firefox) !

### Méthode B : Via le serveur local intégré
Dans un terminal PowerShell ou Invite de commandes :
```bash
node anniversaire/server.js
```
Puis ouvre ton navigateur à l'adresse suivante : **`http://localhost:3000`**.

---

## 🧪 4. Contrôle Qualité et Tests Automatisés

Le projet intègre une suite de tests rigoureuse vérifiant 182 points critiques :
- Intégrité de tous les chemins de fichiers (zéro fichier manquant).
- Validité JavaScript et structure typée de `config.js`.
- Respect strict des calculs du jeu OUI/NON (incrément des « I » de 1 à 9).
- Présence de l'ensemble des balises et identifiants HTML.
- Conformité de l'accessibilité (`prefers-reduced-motion`, rôles ARIA, contrastes, touch targets).

Pour lancer les tests :
```bash
node anniversaire/test-suite.js
```
Résultat : **182 Succès, 0 Erreurs (100% Validé)**.
