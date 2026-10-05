/* Entry point — app yahan se render hota hai */

/* ============================================================
   AUDIO UNLOCK
   Mobile Chrome / Safari awaaz tabhi chalata hai jab user ne
   pehle kuch touch kiya ho. Isliye pehla tap par sound
   "chalu" (unlock) kar dete hain — phir Play kabhi block
   nahi hota.
   ============================================================ */
function unlockAudio() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) {
      const ctx = new AC();
      if (ctx.state === "suspended") ctx.resume();
    }
  } catch (e) {}

  try {
    const a = new Audio();
    a.muted = true;
    a.volume = 0;
    a.src = "data:audio/mpeg;base64,SUQzAwAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQxAADB8AhSmxhIIEVCSiJrDCQBTcu3UrAIwUdkRgQbFAZC1CQEwTJ9mjRvBA4UOLD8nKVOWfh/GRcVFycbHzFxOW1dXiFmYVxcbHzFxOW1dXqFxcbHzFxOW1dXqFxcbHzFxOW1dXqFxcbHzFxOW1dXqFxcbHzFxOW1dXqFxcbHzFxOW1dXqFxcbHzFxOW1dXqFxcbHzFxOW1dXqFxcbHzFxOW1dXqFxcbHzFxOW1dXqFxcbHzFxOW1dXqFxcbHzFxOW1dXqFxcbHzFxOW1dXqFxcbHzFxOW1dXqFxcbHzFxOW1dXqFxcbHzFxOW1dXqA==";
    a.play().catch(() => {});
  } catch (e) {}
}

["touchstart", "mousedown", "keydown", "pointerdown"].forEach(function (ev) {
  const once = function () {
    unlockAudio();
    ["touchstart", "mousedown", "keydown", "pointerdown"]
      .forEach(function (e2) { document.removeEventListener(e2, once, true); });
  };
  document.addEventListener(ev, once, { once: true, passive: true, capture: true });
});

function boot() {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(React.createElement(KG.App));

  /* Offline / PWA support (sirf http:// par) */
  if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

/* Babel scripts late load hote hain, isliye readyState check zaroori hai */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}