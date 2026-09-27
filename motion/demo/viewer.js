
/* ============================================================
   VIEWER: drives the pure seek(t) with the clock. The piece keeps no state; the viewer only owns t.
   ============================================================ */
(() => {
  const STATES = ["Button", "→ Loader", "Loader", "→ Check", "→ Island", "→ Player", "Play / pause", "Grab knob",
    "Scrub", "Release", "→ Volume", "Drag volume", "Past max (rubber)", "Spring back", "→ Toggle", "Flip toggle",
    "→ Tabs", "Tab 2", "Tab 3", "→ Chart", "Line draws", "Tooltip A", "Tooltip B", "Press range",
    "Drag range", "Release range", "→ ⌘K", "Rows enter", "Type", "Filter to 1", "→ Toast", "→ Button"];
  const fit = document.getElementById("fit"), stageEl = document.getElementById("stage");
  const tl = document.getElementById("tl"), head = document.getElementById("head"), readout = document.getElementById("readout");
  const fitStage = () => { stageEl.style.transform = `scale(${fit.clientWidth / 1440})`; };
  new ResizeObserver(fitStage).observe(fit); fitStage();

  const ticks = [];
  for (let bar = 0; bar < BARS; bar++) {
    const cell = document.createElement("div"); cell.className = "barcell";
    cell.innerHTML = `<span>${bar + 1}</span>`;
    for (let k = 0; k < 4; k++) { const tk = document.createElement("div"); tk.className = "tick"; cell.appendChild(tk); ticks.push(tk); }
    tl.insertBefore(cell, head);
  }

  let t = 0, playing = !matchMedia("(prefers-reduced-motion: reduce)").matches, speed = 1, last = null, scrubbing = false;
  const playBtn = document.getElementById("play"), playIcon = document.getElementById("playicon");
  const setPlaying = (p) => {
    playing = p; playBtn.setAttribute("aria-label", p ? "Pause" : "Play");
    playIcon.setAttribute("d", p ? "M4 2h3v12H4zM9 2h3v12H9z" : "M4 2l10 6-10 6z");
  };
  setPlaying(playing);

  function ui() {
    const beat = Math.min(31, Math.floor(t / BEAT + 1e-6));
    ticks.forEach((tk, i) => tk.classList.toggle("on", i === beat));
    const r = tl.getBoundingClientRect();
    head.style.left = (t / D) * r.width - 1 + "px";
    readout.innerHTML = `<b>${STATES[beat]}</b> · bar ${Math.floor(beat / 4) + 1}, beat ${beat % 4 + 1} · ${t.toFixed(2)} s`;
  }
  function frame(now) {
    if (playing && !scrubbing && last !== null) t = (t + ((now - last) / 1000) * speed) % D;
    last = now; seek(t); ui(); requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  playBtn.onclick = () => setPlaying(!playing);
  const setSpeed = (s) => { speed = s; document.getElementById("sp1").setAttribute("aria-pressed", s === 1); document.getElementById("sp4").setAttribute("aria-pressed", s !== 1); };
  document.getElementById("sp1").onclick = () => setSpeed(1);
  document.getElementById("sp4").onclick = () => setSpeed(0.25);
  const setTheme = (n) => { applyTheme(n); document.getElementById("th-mono").setAttribute("aria-pressed", n === "mono"); document.getElementById("th-zus").setAttribute("aria-pressed", n === "zus"); seek(t); };
  document.getElementById("th-mono").onclick = () => setTheme("mono");
  document.getElementById("th-zus").onclick = () => setTheme("zus");

  const scrubTo = (e) => { const r = tl.getBoundingClientRect(); t = Math.max(0, Math.min(0.9999, (e.clientX - r.left) / r.width)) * D; };
  tl.addEventListener("pointerdown", (e) => { scrubbing = true; tl.setPointerCapture(e.pointerId); scrubTo(e); });
  tl.addEventListener("pointermove", (e) => { if (scrubbing) scrubTo(e); });
  tl.addEventListener("pointerup", () => { scrubbing = false; });
  addEventListener("keydown", (e) => {
    if (e.key === " ") { e.preventDefault(); setPlaying(!playing); }
    else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault(); setPlaying(false);
      const beat = Math.round(t / BEAT - 0.35) + (e.key === "ArrowRight" ? 1 : -1);
      t = ((((beat % 32) + 32) % 32) + 0.35) * BEAT;          // land 35% into the beat, like the proof sheet
    } else if (e.key === "m" || e.key === "M") setTheme("mono");
    else if (e.key === "z" || e.key === "Z") setTheme("zus");
  });
  // Test and deep-link hooks: the viewer owns t, so set it here (a direct seek() is overwritten next frame).
  window.viewer = { setT: (v) => { t = ((v % D) + D) % D; seek(t); ui(); }, pause: () => setPlaying(false), setTheme };
  // Deep link: #zus opens in the ZUS theme.
  if (location.hash === "#zus") setTheme("zus");
})();
