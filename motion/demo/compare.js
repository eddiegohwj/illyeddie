// One clock drives both stages. srcdoc frames share this page's origin, so we call their seek() directly.
(async () => {
  const STATES = ["Button", "→ Loader", "Loader", "→ Check", "→ Island", "→ Player", "Play / pause", "Grab knob",
    "Scrub", "Release", "→ Volume", "Drag volume", "Past max (rubber)", "Spring back", "→ Toggle", "Flip toggle",
    "→ Tabs", "Tab 2", "Tab 3", "→ Chart", "Line draws", "Tooltip A", "Tooltip B", "Press range",
    "Drag range", "Release range", "→ ⌘K", "Rows enter", "Type", "Filter to 1", "→ Toast", "→ Button"];
  const frames = [["f-mono", "mono"], ["f-zus", "zus"]].map(([id, theme]) => ({ el: document.getElementById(id), theme }));
  await Promise.all(frames.map((f) => new Promise((ok) => {
    const ready = () => f.el.contentWindow && f.el.contentWindow.seek ? ok() : setTimeout(ready, 30);
    f.el.addEventListener("load", ready); ready();
  })));
  for (const f of frames) { f.w = f.el.contentWindow; f.w.applyTheme(f.theme); await f.w.READY; }
  const D = frames[0].w.DURATION, BEAT = 60 / frames[0].w.BPM, BARS = frames[0].w.BARS;
  const seekAll = (t) => frames.forEach((f) => f.w.seek(t));

  const tl = document.getElementById("tl"), head = document.getElementById("head"), readout = document.getElementById("readout");
  const ticks = [];
  for (let bar = 0; bar < BARS; bar++) {
    const cell = document.createElement("div"); cell.className = "barcell"; cell.innerHTML = `<span>${bar + 1}</span>`;
    for (let k = 0; k < 4; k++) { const tk = document.createElement("div"); tk.className = "tick"; cell.appendChild(tk); ticks.push(tk); }
    tl.insertBefore(cell, head);
  }
  let t = 0, playing = !matchMedia("(prefers-reduced-motion: reduce)").matches, speed = 1, last = null, scrubbing = false;
  const playBtn = document.getElementById("play"), playIcon = document.getElementById("playicon");
  const setPlaying = (p) => { playing = p; playBtn.setAttribute("aria-label", p ? "Pause" : "Play"); playIcon.setAttribute("d", p ? "M4 2h3v12H4zM9 2h3v12H9z" : "M4 2l10 6-10 6z"); };
  setPlaying(playing);
  function ui() {
    const beat = Math.min(31, Math.floor(t / BEAT + 1e-6));
    ticks.forEach((tk, i) => tk.classList.toggle("on", i === beat));
    head.style.left = (t / D) * tl.getBoundingClientRect().width - 1 + "px";
    readout.innerHTML = `<b>${STATES[beat]}</b> · bar ${Math.floor(beat / 4) + 1}, beat ${beat % 4 + 1} · ${t.toFixed(2)} s`;
  }
  function frame(now) {
    if (playing && !scrubbing && last !== null) t = (t + ((now - last) / 1000) * speed) % D;
    last = now; seekAll(t); ui(); requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  playBtn.onclick = () => setPlaying(!playing);
  const setSpeed = (s) => { speed = s; document.getElementById("sp1").setAttribute("aria-pressed", s === 1); document.getElementById("sp4").setAttribute("aria-pressed", s !== 1); };
  document.getElementById("sp1").onclick = () => setSpeed(1);
  document.getElementById("sp4").onclick = () => setSpeed(0.25);
  const scrubTo = (e) => { const r = tl.getBoundingClientRect(); t = Math.max(0, Math.min(0.9999, (e.clientX - r.left) / r.width)) * D; };
  tl.addEventListener("pointerdown", (e) => { scrubbing = true; tl.setPointerCapture(e.pointerId); scrubTo(e); });
  tl.addEventListener("pointermove", (e) => { if (scrubbing) scrubTo(e); });
  tl.addEventListener("pointerup", () => { scrubbing = false; });
  addEventListener("keydown", (e) => {
    if (e.key === " ") { e.preventDefault(); setPlaying(!playing); }
    else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault(); setPlaying(false);
      const beat = Math.round(t / BEAT - 0.35) + (e.key === "ArrowRight" ? 1 : -1);
      t = ((((beat % 32) + 32) % 32) + 0.35) * BEAT;
    }
  });
  window.compare = { setT: (v) => { t = ((v % D) + D) % D; seekAll(t); ui(); }, pause: () => setPlaying(false) };
})();
