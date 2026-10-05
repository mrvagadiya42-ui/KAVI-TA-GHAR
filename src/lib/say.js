/* ============================================================
   Bolwa do — aur awaaz HAMESHA ladki/aurat ki rakhein
   (Swara, Dhwani, Neerja, Zira, Aria ...)
   ============================================================ */

window.KG = window.KG || {};

KG.GREETING = {
  hi: { hello: "नमस्ते",       welcome: "कविता का घर में आपका स्वागत है" },
  gu: { hello: "નમસ્તે",        welcome: "કવિતાના ઘરમાં તમારું સ્વાગત છે" },
  en: { hello: "Hello",         welcome: "welcome to Kavita Ka Ghar" }
};

/* aurat awaazein */
KG.FEMALE_VOICE = /swara|neerja|dhwani|niranjan|zira|aria|jenny|samantha|victoria|sonia|hazel|susan|cortana|lekha|google\s+(india|hindi|gujarati)|female|woman/i;

/* pehle se pata voice */
KG.KNOWN_FEMALE = {
  hi: ["swara", "lekha", "google hindi"],
  gu: ["dhwani", "google gujarati"],
  en: ["neerja", "zira", "aria", "jenny", "samantha", "susan", "hazel"]
};

/* sabse acchi female voice chuno */
KG.pickFemaleVoice = function (code) {
  const list = window.speechSynthesis ? window.speechSynthesis.getVoices() || [] : [];
  if (!list.length) return null;

  const base = code.split("-")[0];
  const want = KG.KNOWN_FEMALE[base] || [];
  const inLang = (v) => v.lang && v.lang.toLowerCase().startsWith(base);

  /* 1) usi bhasha me pata hui female voice */
  for (let i = 0; i < want.length; i++) {
    const hit = list.find(v => inLang(v) &&
      v.name.toLowerCase().includes(want[i]));
    if (hit) return hit;
  }
  /* 2) usi bhasha me koi female voice */
  const f1 = list.find(v => inLang(v) && KG.FEMALE_VOICE.test(v.name));
  if (f1) return f1;
  /* 3) female / woman likha ho */
  const f2 = list.find(v => inLang(v) && /female|woman/i.test(v.name));
  if (f2) return f2;
  /* 4) bhasha me koi bhi */
  const any = list.find(inLang);
  if (any) return any;
  /* 5) koi bhi female */
  return list.find(v => KG.FEMALE_VOICE.test(v.name)) || list[0] || null;
};

KG.say = function (text, lang, rate) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  try {
    window.speechSynthesis.cancel();

    const synth = window.speechSynthesis;
    /* pehle current bhasha, phir baaki backup */
    const order = [lang].concat(KG.LANG_ORDER.filter(l => l !== lang));

    let i = 0;
    const next = () => {
      if (i >= order.length) return;
      const lg = order[i++];
      const v = KG.pickFemaleVoice(KG.LANGS[lg].tts);

      const u = new SpeechSynthesisUtterance(text);
      if (v) u.voice = v;
      u.lang   = v && v.lang ? v.lang : KG.LANGS[lg].tts;
      u.rate   = rate || 0.92;
      u.pitch  = 1.18;          /* thodi upar — soft & friendly */
      u.volume = 1;

      let moved = false;
      const goNext = () => { if (!moved) { moved = true; next(); } };
      u.onend = goNext;
      u.onerror = goNext;

      synth.speak(u);
      setTimeout(() => {
        if (!synth.speaking && !synth.pending) goNext();
      }, 900);
    };

    next();
    return true;
  } catch (e) {
    return false;
  }
};

/* naam + greeting bolwa do (hamesha female voice) */
KG.sayHello = function (name, lang, rate) {
  const g = KG.GREETING[lang] || KG.GREETING.hi;
  const clean = String(name || "").trim();
  if (!clean) return false;

  /* agar device par us bhasha ki awaaz nahi hai, to naam ko
     roman me badal do — warna computer chup reh jaata hai */
  let spoken = clean;
  let useLang = lang;

  if (KG.isIndic && KG.isIndic(clean) && KG.hasVoiceFor &&
      !KG.hasVoiceFor(lang) && KG.romanize) {
    spoken = KG.romanize(clean);
    useLang = "en";
  }

  const g2 = KG.GREETING[useLang] || g;
  const ok = KG.say(g2.hello + " " + spoken + "! " + g2.welcome + "!",
                     useLang, rate);

  /* yaad rakho — dobara mat bolna */
  try { window.localStorage.setItem("kgh_greeted", clean + "|" + lang); } catch (e) {}
  return ok;
};

/* kya is naam+bhasha ka greeting pehle bol diya gaya hai? */
KG.alreadyGreeted = function (name, lang) {
  try {
    return window.localStorage.getItem("kgh_greeted") === String(name) + "|" + lang;
  } catch (e) { return false; }
};

/* chhoti si "ting" */
KG.chime = function () {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    [660, 880].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.12);
      g.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + i * 0.12 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.12 + 0.26);
      o.connect(g); g.connect(ctx.destination);
      o.start(ctx.currentTime + i * 0.12);
      o.stop(ctx.currentTime + i * 0.12 + 0.3);
    });
    setTimeout(() => ctx.close(), 900);
  } catch (e) {}
};