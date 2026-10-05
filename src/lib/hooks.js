/* ============================================================
   React Hooks — Suno (TTS), Record, Toast
   Teeno FREE hain aur kisi ka content copy nahi karte.
   ============================================================ */

window.KG = window.KG || {};

/* ---------------- SUNO : browser ka free text-to-speech ---------------- */
KG.useSpeech = function (poem, tab) {
  const [speaking, setSpeaking] = React.useState(false);
  const [rate, setRate]     = React.useState(0.6);
  const [info, setInfo]     = React.useState({ total: 0, hi: false, gu: false, en: false, sample: "" });

  const voicesRef = React.useRef([]);
  const started   = React.useRef(false);
  const tried     = React.useRef(0);
  const alive     = React.useRef(true);

  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  /* awaazein load karo — kabhi kabhi 2-3 second lagti hain */
  const load = React.useCallback(() => {
    if (!supported) return;
    const v = window.speechSynthesis.getVoices() || [];
    voicesRef.current = v;
    setInfo({
      total: v.length,
      hi: v.some(x => /^hi/i.test(x.lang)),
      gu: v.some(x => /^gu/i.test(x.lang)),
      en: v.some(x => /^en/i.test(x.lang)),
      sample: v.length
        ? v.slice(0, 3).map(x => `${x.name} (${x.lang})`).join("  ·  ")
        : ""
    });
  }, [supported]);

  React.useEffect(() => {
    if (!supported) return;
    alive.current = true;
    load();
    window.speechSynthesis.onvoiceschanged = load;
    const timers = [200, 700, 1500, 3000].map(ms => setTimeout(load, ms));
    return () => {
      alive.current = false;
      timers.forEach(clearTimeout);
      window.speechSynthesis.onvoiceschanged = null;
      try { window.speechSynthesis.cancel(); } catch (e) {}
    };
  }, [load, supported]);

  /* sahi voice dhoondo; na mile to koi bhi voice use kar lo
     taaki awaaz to aaye (bilkul chup na ho) */
  const resolve = React.useCallback((code) => {
    const v = voicesRef.current || [];
    const base = code.split("-")[0];
    const hit =
         v.find(x => x.lang && x.lang.toLowerCase() === code.toLowerCase())
      || v.find(x => x.lang && x.lang.toLowerCase().startsWith(base) && /in/i.test(x.lang))
      || v.find(x => x.lang && x.lang.toLowerCase().startsWith(base));
    if (hit) return { voice: hit, exact: true };

    const any = v.find(x => /^en/i.test(x.lang)) || v[0] || null;
    return { voice: any, exact: false };
  }, []);

  const stop = React.useCallback(() => {
    started.current = false;
    if (supported) { try { window.speechSynthesis.cancel(); } catch (e) {} }
    setSpeaking(false);
  }, [supported]);

  const doSpeak = React.useCallback((isRetry) => {
    if (!supported || !poem) return;

    const synth = window.speechSynthesis;
    try { synth.cancel(); } catch (e) {}
    try { synth.resume(); } catch (e) {}   /* Chrome ka pause bug fix */

    started.current = false;
    setSpeaking(true);

    const langs = tab === "all" ? KG.LANG_ORDER : [tab];

    langs.forEach((lg, i) => {
      const u = new SpeechSynthesisUtterance(
        String(poem.poem[lg]).replace(/\s+/g, " ").trim()
      );
      const r = resolve(KG.LANGS[lg].tts);
      if (r.voice) u.voice = r.voice;
      /* voice na mile to us voice ki language use karo,
         warna Chrome chup reh jaata hai */
      u.lang = r.exact ? KG.LANGS[lg].tts
                       : (r.voice && r.voice.lang) || KG.LANGS[lg].tts;
      u.rate  = rate;
      u.pitch = 1.05;
      u.volume = 1;

      u.onstart = () => { started.current = true; };
      if (i === langs.length - 1) {
        u.onend   = () => { started.current = true; setSpeaking(false); };
        u.onerror = () => { setSpeaking(false); };
      }
      try { synth.speak(u); } catch (e) { setSpeaking(false); }
    });

    /* Chrome kabhi-kabhi pehli baar awaaz nahi chalata — 1 baar phir try */
    if (!isRetry) {
      setTimeout(() => {
        if (!alive.current) return;
        if (started.current) return;
        if (synth.speaking || synth.pending) return;
        tried.current += 1;
        if (tried.current <= 2) doSpeak(true);
        else setSpeaking(false);
      }, 1400);
    }
  }, [poem, tab, rate, resolve, supported]);

  const speak = React.useCallback(() => {
    tried.current = 0;
    doSpeak(false);
  }, [doSpeak]);

  /* poem ya bhasha badle to band */
  React.useEffect(() => { stop(); }, [poem && poem.id, tab]);

  return { speaking, rate, setRate, speak, stop, info, supported, reload: load };
};

/* ---------------- AUDIO : poem ki bani hui awaaz (MP3) ----------------
   Agar file na ho to TTS (computer ki awaaz) par laut jaata hai. */
KG.usePoemAudio = function (poem, tab, rate, onFallback) {
  const ref  = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [blocked, setBlocked] = React.useState(false);

  const srcOf = (lg) => `assets/audio/${poem.id}.${lg}.mp3`;

  const stop = React.useCallback(() => {
    const a = ref.current;
    if (a) { try { a.pause(); a.onended = null; } catch (e) {} }
    setPlaying(false);
  }, []);

  const play = React.useCallback(() => {
    const a = ref.current;
    if (!a) return;
    setBlocked(false);

    const langs = tab === "all" ? KG.LANG_ORDER : [tab];
    let i = 0;

    const fallback = () => {
      setPlaying(false);
      if (onFallback) onFallback();
    };

    const next = () => {
      if (i >= langs.length) { stop(); return; }
      const lg = langs[i];
      i += 1;
      a.onended = next;
      a.onerror = () => { if (i === 1) fallback(); else next(); };
      a.src = srcOf(lg);
      a.playbackRate = rate || 1;
      const pr = a.play();
      if (pr && pr.catch) {
        pr.then(() => setPlaying(true))
          /* Mobile Chrome awaaz block kar deta hai — user ko
               button dabaana hoga */
          .catch(() => {
            if (i === 1) { setBlocked(true); setPlaying(false); }
            else next();
          });
      } else {
        setPlaying(true);
      }
    };

    next();
  }, [poem.id, tab, rate, onFallback, stop]);

  React.useEffect(() => { stop(); }, [poem.id, tab]);
  React.useEffect(() => () => {
    const a = ref.current;
    if (a) { try { a.pause(); } catch (e) {} }
  }, []);

  return { ref, playing, blocked, play, stop, srcOf };
};

/* ---------------- RECORD : bacche / teacher ki apni awaaz ----------------
   Recording browser me save rehti hai, isliye Play button
   hamesha awaaz chala payega — chahe computer par Hindi
   voice installed ho ya na ho.                            */
KG.useRecorder = function (poemId, fileName) {
  const [recording, setRecording] = React.useState(false);
  const [url, setUrl] = React.useState(null);       // abhi ki recording
  const [savedUrl, setSavedUrl] = React.useState(""); // purani saved recording
  const st = React.useRef({ rec: null, chunks: [], stream: null, old: null });

  /* is poem ki saved recording laao */
  React.useEffect(() => {
    setUrl(null);
    setSavedUrl("");
    try {
      const d = window.localStorage.getItem("kgh_audio_" + poemId);
      if (d) setSavedUrl(d);
    } catch (e) {}
  }, [poemId]);

  const stop = React.useCallback(() => {
    const r = st.current.rec;
    if (r && r.state !== "inactive") r.stop();
    st.current.rec = null;
    setRecording(false);
  }, []);

  const start = React.useCallback(async () => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      return { error: "Yeh browser recording support nahi karta." };
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      st.current = { rec, chunks: [], stream, old: st.current.old };

      rec.ondataavailable = (e) => { if (e.data.size) st.current.chunks.push(e.data); };

      rec.onstop = () => {
        const blob = new Blob(st.current.chunks, { type: "audio/webm" });
        stream.getTracks().forEach(t => t.stop());

        if (st.current.old) URL.revokeObjectURL(st.current.old);
        const u = URL.createObjectURL(blob);
        st.current.old = u;
        setUrl(u);

        /* poem ke saath permanently save kar do */
        try {
          const fr = new FileReader();
          fr.onload = () => {
            try {
              window.localStorage.setItem("kgh_audio_" + poemId, fr.result);
              setSavedUrl(fr.result);
            } catch (e) {}
          };
          fr.readAsDataURL(blob);
        } catch (e) {}
      };

      rec.start();
      setRecording(true);
      return { ok: true };
    } catch (e) {
      return { error: "Mic ki permission nahi mili. Browser settings check karein." };
    }
  }, [poemId]);

  const audioRef = React.useRef(null);
  const playUrl = React.useCallback((src) => {
    if (!src) return false;
    if (audioRef.current) { try { audioRef.current.pause(); } catch (e) {} }
    const a = new Audio(src);
    audioRef.current = a;
    a.play().catch(() => {});
    return true;
  }, []);

  const playSaved = React.useCallback(() => playUrl(savedUrl), [savedUrl, playUrl]);
  const play      = React.useCallback(() => playUrl(url), [url, playUrl]);

  const erase = React.useCallback(() => {
    try { window.localStorage.removeItem("kgh_audio_" + poemId); } catch (e) {}
    setSavedUrl("");
    setUrl(null);
  }, [poemId]);

  React.useEffect(() => () => { if (st.current.old) URL.revokeObjectURL(st.current.old); }, []);

  return {
    recording, url, savedUrl, start, stop, play, playSaved, erase,
    fileName: (fileName || "kavita").replace(/\s+/g, "-")
  };
};

/* ---------------- TOAST ---------------- */
KG.useToast = function (ms) {
  const [msg, setMsg] = React.useState("");
  const t = React.useRef(null);
  const show = React.useCallback((m) => {
    setMsg(m);
    clearTimeout(t.current);
    t.current = setTimeout(() => setMsg(""), ms || 2600);
  }, [ms]);
  React.useEffect(() => () => clearTimeout(t.current), []);
  return [msg, show];
};