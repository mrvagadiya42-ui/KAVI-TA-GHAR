/* ============================================================
   NAAM KO ROMAN (latin) ME BADALNA
   ------------------------------------------------------------
   Kyu?  Bahut se computers par Hindi/Gujarati ki awaaz
   install nahi hoti. Aise me browser Devanagari/Gujarati
   padh hi nahi pata — chup reh jaata hai.

   Isliye: agar us bhasha ki awaaz nahi mili, to naam ko
   roman letters me badal denge (Aarav, Gayatri...) — phir
   computer ki awaaz (Zira) use theek bol paayegi.
   ============================================================ */

window.KG = window.KG || {};

/* ---------- Devanagari ---------- */
KG._dev = {
  v: { "अ": "a", "आ": "aa", "इ": "i", "ई": "ee", "उ": "u", "ऊ": "oo",
       "ऋ": "ri", "ए": "e", "ऐ": "ai", "ओ": "o", "औ": "au",
       "अं": "an", "अः": "ah", "आं": "aan" },
  m: { "ा": "a", "ि": "i", "ी": "ee", "ु": "u", "ू": "oo", "ृ": "ri",
       "े": "e", "ै": "ai", "ो": "o", "ौ": "au", "ँ": "n", "ं": "n",
       "ः": "h" },
  c: { "क": "k", "ख": "kh", "ग": "g", "घ": "gh", "ङ": "ng",
       "च": "ch", "छ": "chh", "ज": "j", "झ": "jh", "ञ": "ny",
       "ट": "t", "ठ": "th", "ड": "d", "ढ": "dh", "ण": "n",
       "त": "t", "थ": "th", "द": "d", "ध": "dh", "न": "n",
       "प": "p", "फ": "ph", "ब": "b", "भ": "bh", "म": "m",
       "य": "y", "र": "r", "ल": "l", "व": "v", "श": "sh", "ष": "sh",
       "स": "s", "ह": "h", "ळ": "l", "ज़": "z", "फ़": "f",
       "ड़": "d", "ढ़": "dh", "क़": "q", "ख़": "kh", "ग़": "gh" },
  dbl: { "त्त": "tt", "क्क": "kk", "श्च": "shch", "ज्ज": "jj", "ज्ञ": "gy",
         "त्र": "tr", "स्र": "sr", "द्र": "dr", "द्व": "dv", "क्व": "kv",
         "छ्य": "chy", "क्र": "kr", "प्र": "pr", "स्थ": "sth" }
};

/* ---------- Gujarati ---------- */
KG._guj = {
  v: { "અ": "a", "આ": "aa", "ઇ": "i", "ઈ": "ee", "ઉ": "u", "ઊ": "oo",
       "એ": "e", "ઐ": "ai", "ઓ": "o", "ઔ": "au", "અં": "an", "અઃ": "ah",
       "આં": "aan" },
  m: { "ા": "a", "િ": "i", "ી": "ee", "ુ": "u", "ૂ": "oo",
       "ે": "e", "ૈ": "ai", "ો": "o", "ૌ": "au", "ં": "n", "ઃ": "h" },
  c: { "ક": "k", "ખ": "kh", "ગ": "g", "ઘ": "gh", "ઙ": "ng",
       "ચ": "ch", "છ": "chh", "જ": "j", "ઝ": "jh", "ઞ": "ny",
       "ટ": "t", "ઠ": "th", "ડ": "d", "ઢ": "dh", "ણ": "n",
       "ત": "t", "થ": "th", "દ": "d", "ધ": "dh", "ન": "n",
       "પ": "p", "ફ": "ph", "બ": "b", "ભ": "bh", "મ": "m",
       "ય": "y", "ર": "r", "લ": "l", "વ": "v", "શ": "sh", "ષ": "sh",
       "સ": "s", "હ": "h", "ળ": "l" },
  dbl: { "ત્ત": "tt", "ક્ક": "kk", "જ્જ": "jj", "શ્ચ": "shch", "ટ્ટ": "tt",
         "પ્પ": "pp", "ત્ર": "tr", "દ્ર": "dr", "સ્ત્ર": "str", "લ્લ": "ll" }
};

/* Devanagari ya Gujarati hai? */
KG.isIndic = function (s) {
  return /[\u0900-\u097F]/.test(s || "") || /[\u0A80-\u0AFF]/.test(s || "");
};

/* Roman me badlo */
KG.romanize = function (text) {
  const s = String(text || "").trim();
  if (!s) return "";

  const map = /[\u0A80-\u0AFF]/.test(s) ? KG._guj : KG._dev;

  /* pehle 2-3 akshar wale jode */
  let work = s;
  const joins = [];
  Object.keys(map.dbl).forEach(k => {
    const token = "\u0001" + joins.length + "\u0002";
    work = work.split(k).join(token);
    joins.push(map.dbl[k]);
  });

  let res = "";
  for (const ch of Array.from(work)) {
    if (ch === "\u0001" || ch === "\u0002") continue;
    if (ch >= "\u0000" && ch <= "\u0010") {
      const i = parseInt(ch, 10);
      if (!Number.isNaN(i) && joins[i]) { res += joins[i]; continue; }
    }
    if (map.v[ch]) { res += map.v[ch]; continue; }
    if (map.m[ch]) { res += map.m[ch]; continue; }
    if (map.c[ch]) { res += map.c[ch]; continue; }
    if (ch === "़") continue;            /* nukta */
    if (ch === "्" || ch === "્") continue;  /* virama / no matra */
    if (ch === "‌" || ch === "‍") continue;
    if (/[\u0900-\u097F\u0A80-\u0AFF]/.test(ch)) continue;  /* baaki chinh */
    res += ch;
  }

  /* teen se zyada same letter hatao */
  res = res.replace(/(.)\1{2,}/g, "$1$1");
  return res.replace(/\s{2,}/g, " ").trim();
};

/* Us bhasha ki awaaz device par hai? */
KG.hasVoiceFor = function (lang) {
  const list = (window.speechSynthesis && window.speechSynthesis.getVoices()) || [];
  if (!list.length) return true;   /* abhi load nahi hua — maan lein hai */
  const code = (KG.LANGS[lang] || KG.LANGS.en).tts;
  const base = code.split("-")[0];
  return list.some(v => v.lang && v.lang.toLowerCase().startsWith(base));
};
