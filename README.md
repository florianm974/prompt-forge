# Prompt-Forge

Constructeur de prompts IA pour chatbot et generation d images.

**Live →** [florianm974.github.io/prompt-forge](https://florianm974.github.io/prompt-forge)

## Fonctionnalites

Le projet propose:

- **2 modes** pour generer des prompts chatbot ou image.
- **Generation en temps reel** du prompt au fil du remplissage.
- **Templates** pour demarrer rapidement sur les cas d usage courants.
- **Tags dynamiques** pour ajouter contraintes, exemples, tags de qualite et prompt negatif.
- **Historique local** avec sauvegarde dans le navigateur via `localStorage`, jusqu a 20 entrees.
- **Copie en un clic** du prompt genere.
- **Theme clair/sombre** avec preference memorisee localement.
- **Accessibilite de base** avec onglets ARIA, navigation clavier et focus visible.

## Stack technique

Le projet est volontairement simple:

- HTML / CSS / JavaScript, sans framework ni dependance.
- Fichiers separes: [index.html](index.html), [styles.css](styles.css), [app.js](app.js).
- Hebergement GitHub Pages.

## Utilisation

1. Ouvre la page.
2. Choisis le mode chatbot ou image.
3. Renseigne les champs, ajoute des tags si besoin, puis copie ou enregistre le prompt.

## Notes

- L'interface est en francais.
- La langue du prompt genere reste pilotable depuis le builder.
- Le projet fonctionne sans installation locale.
