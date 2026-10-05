/* Bhasha ka config — poore app me isti ki isti bhasha dikhegi */

window.KG = window.KG || {};

KG.LANGS = {
  hi: { label: "हिन्दी",    short: "HI", tts: "hi-IN" },
  gu: { label: "ગુજરાતી", short: "GU", tts: "gu-IN" },
  en: { label: "English",  short: "EN", tts: "en-IN" }
};
KG.LANG_ORDER = ["hi", "gu", "en"];

KG.classById = (id) => KG.CLASSES.find(c => c.id === id);
KG.countOf = (id) =>
  id === "all" ? KG.POEMS.length : KG.POEMS.filter(p => p.classId === id).length;