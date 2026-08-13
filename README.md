# Prompt Forge

Constructeur de prompts IA pour chatbot et génération d'images — sans framework, sans dépendances.

**Live →** [florianm974.github.io/prompt-forge](https://florianm974.github.io/prompt-forge)

---

## Présentation

> Construis des prompts pour chatbot ou génération d'images, proprement et sans prise de tête.

---

## Fonctionnalités

| Fonctionnalité           | Détails                                                                                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **2 modes**              | Constructeur de prompt chatbot et constructeur de prompt image                                                                                  |
| **Aperçu en direct**     | Le prompt se met à jour au fur et à mesure que tu remplis les champs                                                                            |
| **Modèles**              | 5 modèles chatbot (expliquer, déboguer, rédiger, analyser, traduire) et 5 modèles image (portrait, paysage, art conceptuel, packshot, abstrait) |
| **Tags dynamiques**      | Contraintes, exemples, tags qualité, prompt négatif — ajout avec `Entrée`, suppression d'un clic                                                |
| **Historique local**     | Sauvegarde jusqu'à 20 prompts dans `localStorage`, recharge en un clic                                                                          |
| **Copie en un clic**     | Fonctionne même si le navigateur galère avec l'API Clipboard                                                                                    |
| **Export .txt**          | Télécharge le prompt généré en fichier texte                                                                                                    |
| **Partage par URL**      | Partage le prompt via une URL encodée                                                                                                           |
| **Thème clair / sombre** | Sauvegardé dans le navigateur                                                                                                                   |
| **Accessibilité**        | Onglets ARIA, navigation aux flèches, focus visible                                                                                             |

---

## Stack

Rien que du vanilla :

- **HTML / CSS / JavaScript** — vanilla
- Fichiers séparés : [`index.html`](index.html), [`styles.css`](styles.css), [`app.js`](app.js)
- Hébergé sur **GitHub Pages**

---

## Utilisation

1. Ouvre la [page live](https://florianm974.github.io/prompt-forge) ou clone le dépôt
2. Choisis le mode **Chatbot** ou **Génération d'images**
3. Charge un modèle ou remplis les champs manuellement
4. Ajoute des tags si nécessaire
5. Copie ou enregistre le prompt généré

---

## Utilisation en local

```bash
git clone https://github.com/florianm974/prompt-forge.git
cd prompt-forge
# ouvre index.html dans ton navigateur — aucune installation requise
```

---

## Structure

```
prompt-forge/
├── index.html    # Structure et balisage
├── styles.css    # Thèmes, layout, composants
└── app.js        # Logique : modes, modèles, tags, historique
```

---

## Notes

- L'interface est en français
- La langue du prompt généré est configurable en mode chatbot
- L'historique est en `localStorage` — rien ne part sur le réseau

---

## Roadmap

- [ ] Mode comparaison pour tester plusieurs variantes de prompt

---

## Licence

MIT — voir [LICENSE](LICENSE)
