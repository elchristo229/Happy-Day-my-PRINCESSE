# 💌 Guide de Personnalisation : Vos Mots, Vos Photos, Votre Histoire

Le fichier `config.js` situé à la racine du dossier `anniversaire/` est **l'unique centre de commande** de l'ensemble du site. Vous pouvez tout personnaliser sans avoir besoin de modifier le code HTML, CSS ou JavaScript.

---

## 1. Changer le Prénom et les Surnoms

Ouvrez `config.js` avec un éditeur de texte (Bloc-notes, VS Code, etc.) :

```javascript
fiancee: {
  firstName: "Jessica",
  
  petName: "Ma Princesse 👑💖",
  
  fullName: "GOHOUN Hanniel Jessica Fifamè"
},

author: {
  name: "Ton fiancé",
  signature: "Avec tout mon amour infini, pour aujourd'hui et pour toujours."
}
```

---

## 2. Ajouter des Photos et Vidéos

Les photos et la vidéo actuellement fournies dans `Han/` sont référencées dans la galerie. Les photos du même ensemble (l'anniversaire et « Nos souvenirs ») partagent une carte-diaporama qui défile automatiquement ; ses flèches permettent aussi de parcourir les images manuellement. Clique sur une photo pour l'agrandir. Conserve ce dossier à la racine du site lors de la publication sur GitHub Pages.

Pour ajouter un souvenir, place le fichier dans `Han/`, puis ajoute une entrée dans `gallery` dans `config.js` :

```javascript
gallery: [
  {
    id: 1,
    image: "Han/ma-photo.jpg",
    caption: "Notre premier voyage ensemble à la plage",
    date: "14 Juillet 2024",
    location: "Grand-Popo"
  },
  // Ajoute une entrée par photo ou vidéo...
]
```

Pour une vidéo MP4, ajoute aussi `type: "video"` à son entrée ; elle sera lisible directement dans la galerie. La vidéo du premier rencard utilise une version H.264 optimisée pour le web. Réduis si possible les médias volumineux avant publication pour faciliter le chargement sur téléphone.

---

## 3. Préparer les messages et le nom de chaque auteur

Dans `config.js`, la liste `guestbookMessages` contient déjà les trois vœux fournis avec le nom de leur auteur et leur photo. Pour en ajouter un, ajoute une entrée avec un identifiant, le nom de l'auteur et le texte :

```javascript
guestbookMessages: [
  {
    id: "voeu-1",
    author: "Prénom ou nom de l'auteur",
    relation: "Famille, amie, collègue…",
    date: "2 Novembre 2026",
    avatar: "💐",
    text: "Joyeux anniversaire ! Je te souhaite une merveilleuse journée."
  },
  {
    id: "voeu-2",
    author: "Un autre auteur",
    relation: "Une personne qui t'aime",
    date: "2 Novembre 2026",
    avatar: "❤️",
    text: "Un autre message personnel, écrit avec le cœur."
  }
]
```

Le site GitHub Pages est statique : les messages visibles sur tous les téléphones sont ceux préparés ici avant publication. Le formulaire de contribution en ligne est masqué par défaut, afin de ne pas faire croire qu'un message ajouté sur un seul appareil est partagé avec tout le monde. Pour collecter les vœux directement depuis le site, il faut mettre en place un service en ligne ; voir le [guide Firebase](./GUIDE_MODE_EN_LIGNE_FIREBASE.md).

Les trois fichiers texte de vœux présents dans `Han/Le mur des voeux et mots doux/` sont intégrés avec le prénom de leur auteur et leur photo. `Halil.jpg` est montré dans les portraits des proches, sans message attribué puisqu'aucun texte de vœu de Halil n'était présent.

---

## 4. Personnaliser la Lettre d'Amour

Dans la section `loveLetter` de `config.js`, remplacez chaque passage par vos propres mots :

```javascript
loveLetter: {
  waxSealText: "G & H", // Vos deux initiales gravées sur le cachet de cire
  heading: "À la femme de ma vie",
  date: "2 Novembre 2026",
  
  sections: {
    // Introduction intime
    introduction: "Ma chérie, en ce jour où tu célèbres une année de plus...",
    
    // Ce que vous aimez chez elle
    whatILoveAboutYou: "J'aime ta gentillesse infinie, ta voix douce...",
    
    // Vos souvenirs les plus chers
    favoriteMemories: "Je me rappelle encore de ce soir où nous avons parlé des heures...",
    
    // Ce qu'elle représente pour vous
    whatYouMeanToMe: "Tu es mon refuge, ma plus belle certitude...",
    
    // Vos vœux pour son avenir
    wishesForFuture: "Je te souhaite la réussite dans tous tes projets...",
    
    // Votre déclaration d'amour finale
    closingDeclaration: "Joyeux anniversaire mon amour. Je t'aime pour toujours."
  },
  
  postScriptum: "P.S. : Prépare-toi, j'ai réservé une surprise pour ce soir !"
}
```

---

## 5. Ajouter vos Propres Morceaux de Musique

1. Prenez votre musique préférée au format MP3 (par exemple votre chanson de couple).
2. Nommez le fichier `romantic-ambience.mp3`.
3. Placez-le dans le dossier :
   `anniversaire/assets/audio/romantic-ambience.mp3`
4. C'est tout ! Le lecteur la jouera automatiquement lorsque votre fiancée aura cliqué sur OUI ou sur le bouton du vinyle.
5. *Remarque :* Sans MP3, le site joue la mélodie de « Joyeux anniversaire » grâce au synthétiseur Web Audio. Pour utiliser un autre fichier audio, indique son chemin dans `CONFIG.music.audioSrc` dans `config.js`.

---

## 6. Personnaliser les Couleurs (Palette Royale)

Si vous souhaitez modifier l'atmosphère de couleur, vous pouvez ajuster les codes HEX dans `config.js` (ou dans `css/variables.css`) :

```javascript
theme: {
  colors: {
    rosePowder: "#F8D7DA",       // Rose poudré
    burgundy: "#5C1D2E",         // Bordeaux profond signature
    cream: "#FDFBF7",            // Crème / ivoire délicat
    goldSoft: "#D4AF37",         // Or doux royal
    whitePure: "#FFFFFF"         // Blanc lumineux
  }
}
```
