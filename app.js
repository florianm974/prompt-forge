let currentMode = "chat";
const OUTPUT_PLACEHOLDER_TEXT =
  "Ton prompt apparaîtra ici au fur et à mesure que tu complètes les champs ci-dessus...";

const tags = {
  "chat-constraints": [],
  "chat-examples": [],
  "img-quality": [],
  "img-negative": [],
};

const templates = {
  chat: {
    explain: {
      role: "enseignant expert",
      context: "",
      task: "Explique [concept] simplement, avec des analogies du monde réel",
      format: "du texte brut",
      tone: "decontracte",
      lang: "",
    },
    debug: {
      role: "ingenieur logiciel senior",
      context: "Je travaille sur [langage/framework]",
      task: "Debogue le code suivant et explique ce qui ne va pas :\n\n[colle ton code ici]",
      format: "markdown",
      tone: "technique",
      lang: "",
    },
    write: {
      role: "copywriter professionnel",
      context: "Public cible : [decris ton audience]",
      task: "Redige [type de contenu] sur [sujet]",
      format: "du texte brut",
      tone: "professionnel",
      lang: "",
    },
    analyze: {
      role: "analyste critique",
      context: "",
      task: "Analyse le texte suivant et identifie les themes, le ton et les arguments cles :\n\n[colle ton texte ici]",
      format: "des points a puces",
      tone: "academique",
      lang: "",
    },
    translate: {
      role: "traducteur professionnel",
      context: "",
      task: "Traduis le texte suivant en [langue cible] en conservant le ton et le style d origine :\n\n[colle ton texte ici]",
      format: "du texte brut",
      tone: "professionnel",
      lang: "",
    },
  },
  image: {
    portrait: {
      subject: "a young woman with sharp features and intense eyes",
      style: "cinematic",
      mood: "mysterious",
      lighting: "dramatic chiaroscuro lighting",
      composition: "close-up portrait",
      quality: ["hyperrealistic", "8k", "sharp focus"],
      negative: ["blurry", "low quality", "distorted"],
    },
    landscape: {
      subject: "vast mountain range at sunrise, ancient forest in foreground",
      style: "photorealistic",
      mood: "ethereal",
      lighting: "golden hour lighting",
      composition: "wide shot",
      quality: ["8k", "photorealistic", "detailed"],
      negative: ["people", "buildings", "cars"],
    },
    concept: {
      subject: "futuristic city floating in the clouds, bioluminescent plants",
      style: "concept art",
      mood: "epic",
      lighting: "soft diffused lighting",
      composition: "wide shot",
      quality: ["trending on artstation", "highly detailed", "4k"],
      negative: ["blurry", "low resolution"],
    },
    product: {
      subject: "minimalist perfume bottle on marble surface",
      style: "3D render",
      mood: "serene",
      lighting: "studio lighting",
      composition: "close-up portrait",
      quality: ["product photography", "8k", "sharp"],
      negative: ["shadows", "dust", "imperfections"],
    },
    abstract: {
      subject: "flowing liquid metal forms, fractals, sacred geometry",
      style: "digital art",
      mood: "ethereal",
      lighting: "neon lighting",
      composition: "symmetrical composition",
      quality: ["4k", "ultra detailed", "vibrant colors"],
      negative: ["text", "watermark", "ugly"],
    },
  },
};

function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll(".mode-tab").forEach((tab) => {
    const isActive = tab.dataset.mode === mode;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.setAttribute("tabindex", isActive ? "0" : "-1");
  });

  document.querySelectorAll(".mode-panel").forEach((panel) => {
    const isActive = panel.id === "panel-" + mode;
    panel.classList.toggle("active", isActive);
    panel.setAttribute("aria-hidden", String(!isActive));
  });

  buildPrompt();
}

function loadTemplate(mode, key) {
  const t = templates[mode][key];
  if (!t) return;
  if (mode === "chat") {
    document.getElementById("chat-role").value = t.role || "";
    document.getElementById("chat-context").value = t.context || "";
    document.getElementById("chat-task").value = t.task || "";
    document.getElementById("chat-format").value = t.format || "";
    document.getElementById("chat-tone").value = t.tone || "";
    document.getElementById("chat-lang").value = t.lang || "";
    tags["chat-constraints"] = [];
    tags["chat-examples"] = [];
    renderTags("chat-constraints");
    renderTags("chat-examples");
  } else {
    document.getElementById("img-subject").value = t.subject || "";
    document.getElementById("img-style").value = t.style || "";
    document.getElementById("img-mood").value = t.mood || "";
    document.getElementById("img-lighting").value = t.lighting || "";
    document.getElementById("img-composition").value = t.composition || "";
    tags["img-quality"] = [...(t.quality || [])];
    tags["img-negative"] = [...(t.negative || [])];
    renderTags("img-quality");
    renderTags("img-negative");
  }
  saveDraft();
  buildPrompt();
}

function handleTagInput(e) {
  const key = e.target.dataset.tagKey;
  if (!key) return;
  if (e.key === "Enter") {
    e.preventDefault();
    const input = document.getElementById(key + "-input");
    const val = input.value.trim();
    if (val && !tags[key].includes(val)) {
      tags[key].push(val);
      renderTags(key);
      buildPrompt();
      saveDraft();
    }
    input.value = "";
  }
  if (e.key === "Backspace" && e.target.value === "" && tags[key].length > 0) {
    tags[key].pop();
    renderTags(key);
    buildPrompt();
    saveDraft();
  }
}

function renderTags(key) {
  const wrap = document.getElementById(key + "-wrap");
  const input = document.getElementById(key + "-input");
  if (!wrap || !input) return;
  const existing = wrap.querySelectorAll(".tag");
  existing.forEach((t) => t.remove());
  tags[key].forEach((tag, i) => {
    const el = document.createElement("div");
    el.className = "tag";
    el.textContent = tag;

    const remove = document.createElement("button");
    remove.className = "tag-remove";
    remove.type = "button";
    remove.setAttribute("aria-label", "Supprimer le tag");
    remove.textContent = "✕";
    remove.addEventListener("click", () => removeTag(key, i));
    el.appendChild(remove);

    wrap.insertBefore(el, input);
  });
}

function removeTag(key, i) {
  tags[key].splice(i, 1);
  renderTags(key);
  buildPrompt();
}

function buildPrompt() {
  let prompt = "";
  if (currentMode === "chat") {
    const role = document.getElementById("chat-role").value.trim();
    const context = document.getElementById("chat-context").value.trim();
    const task = document.getElementById("chat-task").value.trim();
    const format = document.getElementById("chat-format").value;
    const tone = document.getElementById("chat-tone").value;
    const lang = document.getElementById("chat-lang").value;
    const constraints = tags["chat-constraints"];
    const examples = tags["chat-examples"];

    if (role) prompt += "Tu es " + role + ".\n\n";
    if (context) prompt += "Contexte : " + context + "\n\n";
    if (task) prompt += task;
    if (format) prompt += "\n\nRéponds sous la forme de " + format + ".";
    if (tone) prompt += "\nTon : " + tone + ".";
    if (lang) prompt += "\nÉcris en " + lang + ".";
    if (constraints.length)
      prompt +=
        "\n\nContraintes :\n" + constraints.map((c) => "- " + c).join("\n");
    if (examples.length)
      prompt += "\n\nExemples : " + examples.join(", ") + ".";
  } else {
    const subject = document.getElementById("img-subject").value.trim();
    const style = document.getElementById("img-style").value;
    const mood = document.getElementById("img-mood").value;
    const lighting = document.getElementById("img-lighting").value;
    const composition = document.getElementById("img-composition").value;
    const quality = tags["img-quality"];
    const negative = tags["img-negative"];

    const parts = [];
    if (subject) parts.push(subject);
    if (style) parts.push(style);
    if (mood) parts.push(mood + " mood");
    if (lighting) parts.push(lighting);
    if (composition) parts.push(composition);
    if (quality.length) parts.push(...quality);
    prompt = parts.join(", ");
    if (negative.length)
      prompt += "\n\nPrompt négatif : " + negative.join(", ");
  }

  const output = document.getElementById("output");
  const counter = document.getElementById("char-count");
  if (prompt.trim()) {
    output.textContent = prompt.trim();
    output.classList.remove("output-placeholder");
    counter.textContent = prompt.trim().length + " caractères";
  } else {
    output.textContent = OUTPUT_PLACEHOLDER_TEXT;
    output.classList.add("output-placeholder");
    counter.textContent = "";
  }
}

function outputHasPrompt() {
  const output = document.getElementById("output");
  return !output.classList.contains("output-placeholder");
}

function setCopyButtonState(label, copied = false) {
  const btn = document.getElementById("copy-btn");
  btn.textContent = label;
  btn.classList.toggle("copied", copied);
  setTimeout(() => {
    btn.textContent = "Copier";
    btn.classList.remove("copied");
  }, 2000);
}

async function copyPrompt() {
  const text = document.getElementById("output").textContent;
  if (!text || !outputHasPrompt()) return;
  try {
    await navigator.clipboard.writeText(text);
    setCopyButtonState("Copié !", true);
  } catch {
    const fallback = document.createElement("textarea");
    fallback.value = text;
    fallback.setAttribute("readonly", "");
    fallback.style.position = "absolute";
    fallback.style.left = "-9999px";
    document.body.appendChild(fallback);
    fallback.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(fallback);
    setCopyButtonState(copied ? "Copié !" : "Échec copie", copied);
  }
}

function clearAll() {
  if (currentMode === "chat") {
    ["chat-role", "chat-context", "chat-task"].forEach(
      (id) => (document.getElementById(id).value = ""),
    );
    document.getElementById("chat-format").value = "";
    document.getElementById("chat-tone").value = "";
    document.getElementById("chat-lang").value = "";
    tags["chat-constraints"] = [];
    tags["chat-examples"] = [];
    renderTags("chat-constraints");
    renderTags("chat-examples");
  } else {
    [
      "img-subject",
      "img-style",
      "img-mood",
      "img-lighting",
      "img-composition",
    ].forEach((id) => (document.getElementById(id).value = ""));
    tags["img-quality"] = [];
    tags["img-negative"] = [];
    renderTags("img-quality");
    renderTags("img-negative");
  }
  clearDraft();
  buildPrompt();
}

function saveDraft() {
  const draft = {
    mode: currentMode,
    chat: {
      role: document.getElementById("chat-role").value,
      context: document.getElementById("chat-context").value,
      task: document.getElementById("chat-task").value,
      format: document.getElementById("chat-format").value,
      tone: document.getElementById("chat-tone").value,
      lang: document.getElementById("chat-lang").value,
      constraints: tags["chat-constraints"],
      examples: tags["chat-examples"],
    },
    image: {
      subject: document.getElementById("img-subject").value,
      style: document.getElementById("img-style").value,
      mood: document.getElementById("img-mood").value,
      lighting: document.getElementById("img-lighting").value,
      composition: document.getElementById("img-composition").value,
      quality: tags["img-quality"],
      negative: tags["img-negative"],
    },
  };
  localStorage.setItem("pf_draft", JSON.stringify(draft));
}

function loadDraft() {
  try {
    const draft = JSON.parse(localStorage.getItem("pf_draft"));
    if (!draft) return;
    currentMode = draft.mode || "chat";
    if (draft.chat) {
      document.getElementById("chat-role").value = draft.chat.role || "";
      document.getElementById("chat-context").value = draft.chat.context || "";
      document.getElementById("chat-task").value = draft.chat.task || "";
      document.getElementById("chat-format").value = draft.chat.format || "";
      document.getElementById("chat-tone").value = draft.chat.tone || "";
      document.getElementById("chat-lang").value = draft.chat.lang || "";
      tags["chat-constraints"] = draft.chat.constraints || [];
      tags["chat-examples"] = draft.chat.examples || [];
      renderTags("chat-constraints");
      renderTags("chat-examples");
    }
    if (draft.image) {
      document.getElementById("img-subject").value = draft.image.subject || "";
      document.getElementById("img-style").value = draft.image.style || "";
      document.getElementById("img-mood").value = draft.image.mood || "";
      document.getElementById("img-lighting").value =
        draft.image.lighting || "";
      document.getElementById("img-composition").value =
        draft.image.composition || "";
      tags["img-quality"] = draft.image.quality || [];
      tags["img-negative"] = draft.image.negative || [];
      renderTags("img-quality");
      renderTags("img-negative");
    }
    switchMode(currentMode);
    buildPrompt();
  } catch (e) {}
}

function clearDraft() {
  localStorage.removeItem("pf_draft");
}

function saveToHistory() {
  const text = document.getElementById("output").textContent;
  if (!text || !outputHasPrompt()) return;
  const history = getHistory();
  const entry = {
    text: text.trim(),
    mode: currentMode,
    date: new Date().toLocaleDateString("fr-FR"),
  };
  history.unshift(entry);
  if (history.length > 20) history.pop();
  localStorage.setItem("pf_history", JSON.stringify(history));
  renderHistory();
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem("pf_history")) || [];
  } catch {
    return [];
  }
}

function renderHistory() {
  const list = document.getElementById("history-list");
  const history = getHistory();
  list.innerHTML = "";

  if (!history.length) {
    const empty = document.createElement("div");
    empty.className = "history-empty";
    empty.textContent = "Aucun prompt enregistré pour l'instant.";
    list.appendChild(empty);
    return;
  }

  history.forEach((h, i) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "history-item";
    item.dataset.index = String(i);

    const text = document.createElement("div");
    text.className = "history-text";
    text.textContent = h.text;

    const meta = document.createElement("div");
    meta.className = "history-meta";
    meta.textContent = h.mode + " · " + h.date;

    item.appendChild(text);
    item.appendChild(meta);
    list.appendChild(item);
  });
}

function loadFromHistory(i) {
  const h = getHistory()[i];
  if (!h) return;
  const output = document.getElementById("output");
  const counter = document.getElementById("char-count");
  output.textContent = h.text;
  output.classList.remove("output-placeholder");
  counter.textContent = h.text.length + " caractères";
}

function clearHistory() {
  localStorage.removeItem("pf_history");
  renderHistory();
}

function toggleTheme() {
  const isLight = document.documentElement.classList.toggle("light");
  try {
    localStorage.setItem("pf_theme", isLight ? "light" : "dark");
  } catch {}
  syncThemeIcons();
}

function syncThemeIcons() {
  const isLight = document.documentElement.classList.contains("light");
  const moon = document.getElementById("icon-moon");
  const sun = document.getElementById("icon-sun");
  if (moon) moon.style.display = isLight ? "none" : "block";
  if (sun) sun.style.display = isLight ? "block" : "none";
}

function bindModeKeyboardNavigation() {
  const tabs = [...document.querySelectorAll(".mode-tab")];
  tabs.forEach((tab, index) => {
    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const nextIndex =
        event.key === "ArrowRight"
          ? (index + 1) % tabs.length
          : (index - 1 + tabs.length) % tabs.length;
      const nextTab = tabs[nextIndex];
      nextTab.focus();
      switchMode(nextTab.dataset.mode);
    });
  });
}

function exportPrompt() {
  const text = document.getElementById("output").textContent;
  if (!text || !outputHasPrompt()) return;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "prompt.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function buildShareURL() {
  const params = new URLSearchParams();
  params.set("mode", currentMode);
  if (currentMode === "chat") {
    params.set("role", document.getElementById("chat-role").value || "");
    params.set("context", document.getElementById("chat-context").value || "");
    params.set("task", document.getElementById("chat-task").value || "");
    params.set("format", document.getElementById("chat-format").value || "");
    params.set("tone", document.getElementById("chat-tone").value || "");
    params.set("lang", document.getElementById("chat-lang").value || "");
    if (tags["chat-constraints"]?.length)
      params.set("constraints", tags["chat-constraints"].join("||"));
    if (tags["chat-examples"]?.length)
      params.set("examples", tags["chat-examples"].join("||"));
  } else {
    params.set("subject", document.getElementById("img-subject").value || "");
    params.set("style", document.getElementById("img-style").value || "");
    params.set("mood", document.getElementById("img-mood").value || "");
    params.set("lighting", document.getElementById("img-lighting").value || "");
    params.set(
      "composition",
      document.getElementById("img-composition").value || "",
    );
    if (tags["img-quality"]?.length)
      params.set("quality", tags["img-quality"].join("||"));
    if (tags["img-negative"]?.length)
      params.set("negative", tags["img-negative"].join("||"));
  }
  const base = window.location.origin + window.location.pathname;
  return base + "?" + params.toString();
}

async function sharePrompt() {
  const url = buildShareURL();
  try {
    await navigator.clipboard.writeText(url);
    const btn = document.getElementById("share-btn");
    const prev = btn ? btn.textContent : "Partager";
    if (btn) btn.textContent = "Lien copié";
    setTimeout(() => {
      if (btn) btn.textContent = prev;
    }, 2000);
  } catch (err) {
    window.prompt("Copiez ce lien:", url);
  }
}

function bindEvents() {
  document.querySelectorAll(".mode-tab").forEach((tab) => {
    tab.addEventListener("click", () => switchMode(tab.dataset.mode));
  });

  document.querySelectorAll(".tpl-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      loadTemplate(btn.dataset.templateMode, btn.dataset.templateKey);
    });
  });

  [
    "chat-role",
    "chat-context",
    "chat-task",
    "img-subject",
    "chat-format",
    "chat-tone",
    "chat-lang",
    "img-style",
    "img-mood",
    "img-lighting",
    "img-composition",
  ].forEach((id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const eventName =
      element.tagName.toLowerCase() === "select" ? "change" : "input";
    element.addEventListener(eventName, () => {
      buildPrompt();
      saveDraft();
    });
  });

  document.querySelectorAll(".tags-input").forEach((input) => {
    input.addEventListener("keydown", handleTagInput);
  });

  document.querySelectorAll(".tags-wrap").forEach((wrap) => {
    wrap.addEventListener("click", () => {
      const targetId = wrap.dataset.focusTarget;
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) target.focus();
    });
  });

  const historyList = document.getElementById("history-list");
  if (historyList) {
    historyList.addEventListener("click", (event) => {
      const item = event.target.closest(".history-item");
      if (!item) return;
      loadFromHistory(Number(item.dataset.index));
    });
  }

  const clearBtn = document.getElementById("clear-btn");
  if (clearBtn) clearBtn.addEventListener("click", clearAll);
  const saveBtn = document.getElementById("save-btn");
  if (saveBtn) saveBtn.addEventListener("click", saveToHistory);
  const exportBtn = document.getElementById("export-btn");
  if (exportBtn) exportBtn.addEventListener("click", exportPrompt);
  const shareBtn = document.getElementById("share-btn");
  if (shareBtn) shareBtn.addEventListener("click", sharePrompt);
  const copyBtn = document.getElementById("copy-btn");
  if (copyBtn) copyBtn.addEventListener("click", copyPrompt);
  const clearHistoryBtn = document.getElementById("clear-history-btn");
  if (clearHistoryBtn) clearHistoryBtn.addEventListener("click", clearHistory);

  const themeBtn = document.getElementById("theme-btn");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      copyPrompt();
    }
    if (e.key === "Escape") {
      clearAll();
    }
    if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      saveToHistory();
    }
  });
}

if (localStorage.getItem("pf_theme") === "light") {
  document.documentElement.classList.add("light");
}

document.addEventListener("DOMContentLoaded", () => {
  bindModeKeyboardNavigation();
  bindEvents();
  renderHistory();
  loadDraft();
  syncThemeIcons();
});
