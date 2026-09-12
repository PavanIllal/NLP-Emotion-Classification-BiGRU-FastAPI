(() => {
  "use strict";

  const EMOTIONS = {
    sadness:  { emoji: "😢", color: "#5c7ca6" },
    joy:      { emoji: "😄", color: "#f2a93b" },
    love:     { emoji: "❤️", color: "#e85d75" },
    anger:    { emoji: "😠", color: "#d6462f" },
    fear:     { emoji: "😨", color: "#7a5fb8" },
    surprise: { emoji: "😲", color: "#33b8a6" },
  };

  const $input = document.getElementById("input");
  const $count = document.getElementById("count");
  const $submit = document.getElementById("submit");
  const $error = document.getElementById("error");
  const $status = document.getElementById("status");
  const $result = document.getElementById("result");
  const $resultEmoji = document.getElementById("resultEmoji");
  const $resultWord = document.getElementById("resultWord");
  const $resultSub = document.getElementById("resultSub");
  const $bars = document.getElementById("bars");
  const $root = document.documentElement;

  const MAX_LEN = 2000;

  function updateCount() {
    $count.textContent = $input.value.length;
  }
  $input.addEventListener("input", updateCount);
  updateCount();

  function showError(message) {
    $error.textContent = message;
    $error.classList.add("show");
  }
  function clearError() {
    $error.textContent = "";
    $error.classList.remove("show");
  }

  function setLoading(isLoading) {
    $submit.disabled = isLoading;
    $submit.classList.toggle("is-loading", isLoading);
  }

  function confidencePhrase(pct) {
    if (pct >= 90) return `${pct}% sure about this one.`;
    if (pct >= 65) return `Fairly confident — ${pct}%.`;
    if (pct >= 40) return `A bit mixed — ${pct}% confidence.`;
    return `Hard to call — only ${pct}% confidence.`;
  }

  function renderResult(data) {
    const emotion = data.predicted_emotion;
    const meta = EMOTIONS[emotion] || { emoji: "🤍", color: "#7d78a8" };
    const pct = Math.round(data.confidence * 100);

    $root.style.setProperty("--accent", meta.color);
    $root.style.setProperty("--accent-soft", hexToRgba(meta.color, 0.28));

    $resultEmoji.textContent = meta.emoji;
    $resultWord.textContent = emotion;
    $resultSub.textContent = confidencePhrase(pct);

    const sorted = Object.entries(data.all_probabilities)
      .sort((a, b) => b[1] - a[1]);

    $bars.innerHTML = "";
    sorted.forEach(([label, prob], i) => {
      const li = document.createElement("li");
      li.className = "bar-row" + (i === 0 ? " is-top" : "");
      const barPct = Math.round(prob * 100);
      li.innerHTML = `
        <span class="bar-label">${label}</span>
        <span class="bar-track"><span class="bar-fill" style="width:0%"></span></span>
        <span class="bar-pct">${barPct}%</span>
      `;
      $bars.appendChild(li);
      requestAnimationFrame(() => {
        li.querySelector(".bar-fill").style.width = barPct + "%";
      });
    });

    $result.classList.add("show");
  }

  function hexToRgba(hex, alpha) {
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  async function readFeeling() {
    const text = $input.value.trim();
    clearError();

    if (!text) {
      showError("Type something first — even a sentence is enough.");
      $input.focus();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (res.status === 503) {
        showError("The model's still waking up — give it a few seconds and try again.");
        pollHealth();
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        showError(body.detail || "Couldn't read that one. Try a different sentence.");
        return;
      }

      const data = await res.json();
      renderResult(data);
    } catch (err) {
      showError("Couldn't reach the model. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  $submit.addEventListener("click", readFeeling);
  $input.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") readFeeling();
  });

  // --- health check: Render free-tier instances cold-start, so let the
  // person know when the model is still loading rather than just failing.
  let pollTimer = null;

  async function checkHealth() {
    try {
      const res = await fetch("/health");
      const data = await res.json();
      return !!data.model_loaded;
    } catch {
      return false;
    }
  }

  function pollHealth() {
    if (pollTimer) return;
    $status.textContent = "Waking the model up…";
    pollTimer = setInterval(async () => {
      const ready = await checkHealth();
      if (ready) {
        clearInterval(pollTimer);
        pollTimer = null;
        $status.textContent = "";
      }
    }, 2500);
  }

  (async function init() {
    const ready = await checkHealth();
    if (!ready) pollHealth();
  })();
})();
