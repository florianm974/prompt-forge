# Prompt-Forge

AI prompt builder for chatbots and image generation — no framework, no dependencies.

**Live →** [florianm974.github.io/prompt-forge](https://florianm974.github.io/prompt-forge)

---

## Overview

> A structured tool for crafting effective prompts, whether for a language model or an image generation model.

---

## Features

| Feature                | Details                                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **2 modes**            | Chatbot prompt builder and image prompt builder                                                                                                  |
| **Live preview**       | Prompt updates as you fill in the fields                                                                                                         |
| **Templates**          | 5 chatbot templates (explain, debug, write, analyze, translate) and 5 image templates (portrait, landscape, concept art, product shot, abstract) |
| **Dynamic tags**       | Constraints, examples, quality tags, negative prompt — add with `Enter`, remove with one click                                                   |
| **Local history**      | Saves up to 20 prompts in `localStorage`, reload in one click                                                                                    |
| **One-click copy**     | With `execCommand` fallback for broader compatibility                                                                                            |
| **Light / dark theme** | Preference stored locally                                                                                                                        |
| **Accessibility**      | ARIA tabs, arrow key navigation, visible focus                                                                                                   |

---

## Stack

Intentionally simple:

- **HTML / CSS / JavaScript** — no framework, no dependencies
- Separate files: [`index.html`](index.html), [`styles.css`](styles.css), [`app.js`](app.js)
- Hosted on **GitHub Pages**

---

## Usage

1. Open the [live page](https://florianm974.github.io/prompt-forge) or clone the repo
2. Choose **Chatbot** or **Image generation** mode
3. Load a template or fill in the fields manually
4. Add tags if needed
5. Copy or save the generated prompt

---

## Local usage

```bash
git clone https://github.com/florianm974/prompt-forge.git
cd prompt-forge
# open index.html in your browser — no installation required
```

---

## Structure

```
prompt-forge/
├── index.html    # Structure and markup
├── styles.css    # Themes, layout, components
└── app.js        # Logic: modes, templates, tags, history
```

---

## Notes

- The interface is in French
- The language of the generated prompt is configurable in chatbot mode
- History is stored locally in the browser (`localStorage`) — no data is sent to any server

---

## Roadmap

- [ ] Export prompt as `.txt`
- [ ] Share prompt via URL (encoded parameters)
- [ ] Comparison mode to test multiple prompt variants

---

## License

MIT — see [LICENSE](LICENSE)
