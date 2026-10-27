# 🌐 Guide : Activer le Mode Participatif en Ligne (Firebase Firestore)

Par défaut, ce site fonctionne en **MODE STATIQUE TOTALEMENT GRATUIT ET AUTONOME** :
- Les vœux déjà enregistrés sont listés dans `config.js`.
- Les nouveaux vœux soumis via le formulaire s'enregistrent instantanément dans le `localStorage` du navigateur pour les tests.
- Aucune configuration de base de données n'est requise pour héberger le site sur GitHub Pages.

Si vous souhaitez que les amis, la famille et les proches situés aux quatre coins du monde puissent **écrire des vœux en direct sur le mur depuis leurs téléphones**, vous pouvez connecter **Firebase Firestore** en 5 minutes.

---

## 🎁 1. Quotas et Conditions du Plan Gratuit Firebase (Spark Plan)

Google Firebase propose une formule permanente **100% gratuite sans carte bancaire requise** (Plan Spark) :
- **Lectures par jour :** 50 000 lectures / jour (largement suffisant pour des milliers de visiteurs).
- **Écritures par jour :** 20 000 écritures / jour.
- **Stockage :** 1 Go de données de texte (équivalent à plusieurs centaines de milliers de messages).
- **Que se passe-t-il si le quota est dépassé ?** Le service se met simplement en pause jusqu'au lendemain à minuit sans jamais vous facturer le moindre centime.

---

## 🛠️ 2. Création du Projet Firebase (Gratuit)

1. Rendez-vous sur la console [Firebase Google](https://console.firebase.google.com).
2. Connectez-vous avec votre compte Google.
3. Cliquez sur **« Ajouter un projet »** (nommez-le par exemple `anniversaire-sarah-2026`).
4. Désactivez Google Analytics (facultatif) et cliquez sur **« Créer le projet »**.
5. Dans le menu de gauche, cliquez sur **« Créer » > « Firestore Database »**.
6. Cliquez sur **« Créer une base de données »**.
7. Choisissez l'emplacement le plus proche (ex: `europe-west` ou `us-central`) et sélectionnez **« Démarrer en mode production »**.

---

## 🔒 3. Règles de Sécurité Firestore (Protection Anti-Abus & Validation)

Allez dans l'onglet **Règles** de votre base Firestore et collez exactement les règles suivantes :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /anniversaire_voeux/{messageId} {
      // N'importe qui peut lire les messages d'anniversaire
      allow read: if true;
      
      // Tout le monde peut écrire un vœu sous réserve de stricte validation :
      allow create: if request.resource.data.author is string
                    && request.resource.data.author.size() >= 2
                    && request.resource.data.author.size() <= 60
                    && request.resource.data.text is string
                    && request.resource.data.text.size() >= 5
                    && request.resource.data.text.size() <= 500
                    && request.resource.data.createdAt is string;
      
      // Seul vous (l'administrateur via la console) pouvez modifier ou supprimer un message
      allow update, delete: if false;
    }
  }
}
```
Cliquez sur **« Publier »**. Ces règles garantissent qu'aucun utilisateur malveillant ne pourra supprimer vos données ni injecter des textes géants.

---

## 🔑 4. Récupérer les Clés et Activer dans `config.js`

1. Sur la console Firebase, cliquez sur la petite roue dentée ⚙️ en haut à gauche > **« Paramètres du projet »**.
2. Dans la section *Vos applications*, cliquez sur l'icône Web **`</>`**.
3. Donnez un surnom à votre application Web (ex: `site-anniversaire`) et cliquez sur **« Enregistrer l'application »**.
4. Firebase affichera un objet `firebaseConfig`. Copiez ces valeurs dans votre fichier `anniversaire/config.js` :

```javascript
firebase: {
  enabled: true, // Passez à true pour activer !
  config: {
    apiKey: "AIzaSy...",
    authDomain: "anniversaire-sarah-2026.firebaseapp.com",
    projectId: "anniversaire-sarah-2026",
    storageBucket: "anniversaire-sarah-2026.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
  },
  collectionName: "anniversaire_voeux"
}
```

5. Dans `anniversaire/index.html`, juste avant la balise `<script src="config.js"></script>`, ajoutez les SDKs légers de Firebase :
```html
<script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js"></script>
```

---

## 🛡️ 5. Modération des Messages

Vous pouvez à tout moment vous connecter sur votre console Firebase > Firestore Database :
- Consulter tous les messages reçus en direct.
- Supprimer un message indésirable en cliquant sur les trois petits points verticaux puis **« Supprimer le document »**.
