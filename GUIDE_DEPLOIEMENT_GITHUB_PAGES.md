# 🚀 Guide Débutant : Déployer Gratuitement le Site sur GitHub Pages

Ce guide est spécialement rédigé pour être accessible à un **débutant absolu**. Aucune compétence préalable en administration système, aucune carte bancaire et aucun serveur payant ne sont nécessaires.

GitHub Pages permet d'héberger ton site d'anniversaire **100% gratuitement, à vie et avec un certificat de sécurité HTTPS sécurisé**.

---

## 📋 Étape 1 : Créer un Compte GitHub (Si tu n'en as pas encore)

1. Rends-toi sur [github.com](https://github.com).
2. Clique sur **« Sign up »** en haut à droite.
3. Renseigne ton adresse e-mail, crée un mot de passe solide et choisis un nom d'utilisateur (par exemple : `ange-surprises`).
4. Valide le courriel de confirmation envoyé dans ta boîte de réception.

---

## 📁 Étape 2 : Créer le Dépôt (Repository) pour le Site

1. Une fois connecté sur GitHub, clique sur le bouton vert **« New »** (ou sur le signe `+` en haut à droite, puis **« New repository »**).
2. Donne un nom romantique ou discret à ton dépôt :
   - Exemple : `anniversaire-mon-amour` ou `surprise-pour-toi`.
3. Assure-toi que l'option **« Public »** est cochée (GitHub Pages gratuit nécessite que le dépôt soit public).
4. Laisse les cases *Add a README file*, *.gitignore* et *license* **décochées**.
5. Clique sur le bouton vert en bas : **« Create repository »**.

---

## 📤 Étape 3 : Ajouter les Fichiers du Site sur GitHub

Tu as le choix entre deux méthodes très simples :

### Méthode 1 : Par l'interface web (Le plus facile sans commande)

1. Sur la page de ton nouveau dépôt GitHub, clique sur le lien bleu **« uploading an existing file »**.
2. Ouvre le dossier `anniversaire/` sur ton ordinateur.
3. Sélectionne **TOUS les fichiers et dossiers** à l'intérieur de `anniversaire/` :
   - `index.html`
   - `config.js`
   - Le dossier `css/` (avec ses 5 fichiers)
   - Le dossier `js/` (avec ses 9 fichiers)
   - Le dossier `assets/` (avec images et audio)
   - Le dossier `Han/` (photos, vidéo et fichiers associés aux vœux)
4. Glisse-dépose l'ensemble directement dans la zone de dépôt de GitHub dans ton navigateur.
5. Tout en bas de la page, dans la case *Commit changes*, écris : `Publication de la surprise d'anniversaire`.
6. Clique sur le bouton vert **« Commit changes »**.
7. Patiente quelques secondes le temps que GitHub enregistre tes fichiers.

La vidéo optimisée pour le site est `Han/Premier-rencard-web.mp4`. Lors d'un envoi par navigateur, sélectionne cette version compressée et omets la vidéo source `Han/Section 'Premier rencard'.mp4` (27,43 Mo). Si tu veux aussi conserver la source dans le dépôt, utilise la méthode Git en ligne de commande ci-dessous.

### Méthode 2 : En ligne de commande avec Git (Pour les habitués)

Ouvre un terminal PowerShell dans le dossier `anniversaire` :
```bash
cd "c:\Users\kpeho\Downloads\Portfolio Ange\anniversaire"
git init
git add .
git commit -m "Création du site d'anniversaire romantique"
git branch -M main
git remote add origin https://github.com/TON_PSEUDO_GITHUB/anniversaire-mon-amour.git
git push -u origin main
```
*(Remplace `TON_PSEUDO_GITHUB` et `anniversaire-mon-amour` par tes informations réelles).*

---

## ⚙️ Étape 4 : Activer GitHub Pages

1. Sur la page de ton dépôt GitHub, clique sur l'onglet **« Settings »** (avec l'icône d'engrenage tout à droite de la barre de navigation du dépôt).
2. Dans le menu latéral gauche, clique sur **« Pages »** (dans la section *Code and automation*).
3. Sous le titre **Build and deployment** :
   - Laisse *Source* sur : **« Deploy from a branch »**.
   - Sous *Branch* : clique sur le menu déroulant qui affiche *None*, sélectionne **« main »**.
   - Dans le dossier attenant, laisse **« / (root) »**.
4. Clique sur le bouton gris **« Save »**.

---

## 🔗 Étape 5 : Récupérer l'URL Publique du Site

1. Patiente environ **60 à 90 secondes** (GitHub compile et met en ligne le site).
2. Rafraîchis la page *Settings > Pages*.
3. Une boîte verte apparaîtra en haut avec le message :
   > **« Your site is live at https://TON_PSEUDO.github.io/anniversaire-mon-amour/ »**
4. Félicitations ! C'est ce lien exact que tu pourras envoyer à ta fiancée le 2 novembre 2026 !

---

## 🛡️ Étape 6 : Pourquoi les chemins ne casseront JAMAIS sur GitHub Pages

Contrairement à des sites mal configurés qui utilisent des chemins absolus (ex: `/css/base.css` qui cherche les fichiers à la racine du domaine GitHub et génère des erreurs 404), **notre code utilise rigoureusement des chemins relatifs** :
- `css/variables.css`
- `js/app.js`
- `assets/images/photo-1.svg`
- `Han/Section 'notre rencontre' 1.jpg`
- `Han/Section 'Premier rencard'.mp4`

Le site fonctionnera donc **automatiquement et sans aucune modification**, quel que soit le nom de ton dépôt GitHub (`https://pseudo.github.io/n-importe-quel-nom/`).

---

## ✏️ Étape 7 : Mettre à Jour le Site Avant le Jour J

Si tu souhaites ajouter tes vraies photos personnelles, modifier ta lettre d'amour ou mettre à jour un message :

1. Modifie simplement le fichier `config.js` ou remplace les photos dans `assets/images/`.
2. Sur GitHub :
   - Soit tu cliques directement sur le fichier `config.js` sur GitHub, puis sur l'icône de crayon ✏️ pour modifier le texte en ligne, et tu cliques sur **« Commit changes »**.
   - Soit tu refais un glisser-déposer des fichiers modifiés.
3. En moins d'une minute, GitHub Pages met à jour le site automatiquement !

---

## ✅ Checklist de Vérification Avant d'Envoyer le Lien à Ta Fiancée

Avant de lui partager le lien le 2 novembre 2026, vérifie ces 6 points sur ton propre smartphone :

1. **Test mobile :** Ouvre l'URL sur ton téléphone en Wi-Fi puis en 4G/5G.
2. **Jeu OUI/NON :** Clique 4 ou 5 fois sur NON pour admirer le bouton OUI grandir avec les « I » supplémentaires et vérifier qu'il est absorbé proprement.
3. **Transition :** Clique sur OUI et vérifie que la pluie de confettis s'active et révèle son prénom.
4. **Lettre d'amour :** Fais défiler jusqu'à l'enveloppe et clique sur le sceau de cire pour t'assurer que la lettre se déploie.
5. **Galerie photo :** Touche une photo pour vérifier qu'elle s'ouvre en grand et que le swipe tactile fonctionne.
6. **Musique :** Touche le bouton du disque vinyle en haut pour écouter la douce mélodie d'ambiance.
