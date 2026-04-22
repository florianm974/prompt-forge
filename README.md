# Prompt-Forge

Constructeur de prompts IA pour chatbot et génération d'images — sans framework, sans dépendances.

**Live →** [florianm974.github.io/prompt-forge](https://florianm974.github.io/prompt-forge)

---

## Aperçu

> Un outil pensé pour les utilisateurs qui veulent structurer leurs prompts efficacement, que ce soit pour un LLM ou un modèle de génération d'images.

---

## Fonctionnalités

| Fonctionnalité           | Détail                                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **2 modes**              | Génération de prompts chatbot ou image                                                                                                           |
| **Aperçu en temps réel** | Le prompt se construit au fil du remplissage                                                                                                     |
| **Templates**            | 5 templates chatbot (expliquer, déboguer, rédiger, analyser, traduire) et 5 templates image (portrait, paysage, concept art, packshot, abstrait) |
| **Tags dynamiques**      | Contraintes, exemples, tags de qualité, prompt négatif — ajout par `Entrée`, suppression en un clic                                              |
| **Historique local**     | Sauvegarde jusqu'à 20 prompts dans `localStorage`, rechargement en un clic                                                                       |
| **Copie en un clic**     | Avec fallback `execCommand` pour compatibilité                                                                                                   |
| **Thème clair / sombre** | Préférence mémorisée localement                                                                                                                  |
| **Accessibilité**        | Onglets ARIA, navigation clavier (flèches), focus visible                                                                                        |

---

## Stack

Volontairement simple :

- **HTML / CSS / JavaScript** — sans framework ni dépendance
- Fichiers séparés : [`index.html`](index.html), [`styles.css`](styles.css), [`app.js`](app.js)
- Hébergement **GitHub Pages**

---

## Utilisation

1. Ouvre la [page live](https://florianm974.github.io/prompt-forge) ou clone le repo
2. Choisis le mode **Chatbot** ou **Génération d'images**
3. Charge un template ou remplis les champs manuellement
4. Ajoute des tags si besoin
5. Copie ou enregistre le prompt généré

---

## Utilisation locale

```bash
git clone https://github.com/florianm974/prompt-forge.git
cd prompt-forge
# ouvrir index.html dans le navigateur — aucune installation requise
```

---

## Structure

```
prompt-forge/
├── index.html    # Structure et markup
├── styles.css    # Thèmes, layout, composants
└── app.js        # Logique : modes, templates, tags, historique
```

---

## Notes

- L'interface est en français
- La langue du prompt généré est configurable depuis le builder (mode chatbot)
- L'historique est stocké localement dans le navigateur (`localStorage`) — aucune donnée n'est envoyée à un serveur

---

## Roadmap

- [ ] Export du prompt en `.txt`
- [ ] Partage de prompt via URL (paramètres encodés)
- [ ] Mode "comparaison" pour tester plusieurs variantes

---

## Licence

MIT — voir [LICENSE](LICENSE)
