/* ============================================================
   APP — saara React app yahan se control hota hai
   ------------------------------------------------------------
   Flow:
     • HOME par sirf CLASS TILES hain (koi kavita list nahi)
     • Class choose karte hi usi class ki kavitayen dikhti hain
     • Header me sirf EK button — 📚 Class
   ============================================================ */

window.KG = window.KG || {};

KG.App = function App() {
  const [lang, setLang]     = React.useState("hi");
  /* classId = null → HOME (sirf class tiles) */
  const [classId, setClass] = React.useState(null);
  const [openId, setOpenId] = React.useState(null);
  const [autoPlay, setAuto] = React.useState(false);
  const [onlyClassic, setTradi] = React.useState(false);
  const [tab, setTab]       = React.useState("hi");
  const [toastMsg, toast]   = KG.useToast();

  /* ---- bacha ka naam: pehle naam, phir website ---- */
  const who = KG.useName();
  const [changeName, setChangeName] = React.useState(false);

  /* naam SIRF EK BAAR bolna hai
   (refresh karne par dobara nahi — bhasha badalne par ek baar) */
  const spokenFor = React.useRef("");
  React.useEffect(() => {
    if (!who.name) return;
    const key = who.name + "|" + lang;
    if (spokenFor.current === key) return;
    spokenFor.current = key;
    if (KG.alreadyGreeted(who.name, lang)) return;   /* pehle bol diya */
    const t = setTimeout(() => KG.sayHello(who.name, lang), 600);
    return () => clearTimeout(t);
  }, [who.name, lang]);

  const onHome = classId === null;

  /* filter — HOME par koi list nahi */
  const poems = React.useMemo(() => {
    if (classId === null) return [];
    let list = classId === "all"
      ? KG.POEMS
      : KG.POEMS.filter(p => p.classId === classId);
    if (onlyClassic) list = list.filter(p => p.classic);
    return list;
  }, [classId, onlyClassic]);

  const idx  = openId ? poems.findIndex(p => p.id === openId) : -1;
  const poem = idx >= 0 ? poems[idx] : null;

  /* class badlo → reader band, list shuru */
  const changeClass = (id) => {
    setClass(id);
    setOpenId(null);
    setAuto(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* bhasha badlo */
  const cycleLang = () => {
    const keys = [...KG.LANG_ORDER, "all"];
    setLang(keys[(keys.indexOf(lang) + 1) % keys.length]);
  };

  /* poem kholo */
  const open = (id, play) => {
    setOpenId(id);
    setTab(lang === "all" ? "all" : lang);
    setAuto(!!play);
  };

  const close = () => { setOpenId(null); setAuto(false); };

  const step = (d) => {
    const n = idx + d;
    if (n < 0 || n >= poems.length) return;
    setOpenId(poems[n].id);
  };

  React.useEffect(() => {
    document.documentElement.lang = lang === "all" ? "hi" : lang;
    document.title = "कविता का घर | Kavita Ka Ghar | કવિતાનું ઘર";
  }, [lang]);

  React.useEffect(() => {
    document.body.style.overflow = poem ? "hidden" : "";
  }, [poem]);

  /* ---------- naam diya hai → WEBSITE ---------- */
  if (!who.name || changeName) {
    return (
      <KG.NameScreen
        lang={lang}
        initial={who.name}
        onDone={(n) => {
          who.save(n);
          setChangeName(false);
        }}
      />
    );
  }

  return (
    <>
      {/* ---------------- HEADER ---------------- */}
      <KG.Header lang={lang} classId={classId} onClass={changeClass}
                onLang={setLang} name={who.name}
                onName={() => setChangeName(true)} />

      <KG.Hero lang={lang} total={KG.POEMS.length} shown={poems.length}
                onVoiceHelp={() => toast(KG.t(lang, "voiceTip"))} />

      <main className="wrap">
        {onHome ? null : (
          /* ---------- CLASS-WISE kavita list ---------- */
          <>
            <div className="grid-head">
              <button className="btn-home" onClick={() => changeClass(null)}>
                🏠 {KG.t(lang, "homeBtn")}
              </button>

              <h3>
                {classId === "all"
                  ? "🌈 " + KG.t(lang, "sabhi")
                  : `${KG.classById(classId).emoji} ${KG.classById(classId).label}`}
              </h3>

              <div className="grid-head-tools">
                <button
                  className={"toggle-tradi" + (onlyClassic ? " is-on" : "")}
                  onClick={() => setTradi(!onlyClassic)}
                  title={KG.t(lang, "tradi")}
                >
                  🏛 {KG.t(lang, "tradi")}
                </button>

                <span>{poems.length} {KG.t(lang, "kavitayen")}</span>
              </div>
            </div>

            <KG.PoemGrid poems={poems} lang={lang} onOpen={open}
                        onPlay={(id) => open(id, true)} />
          </>
        )}
      </main>

      <footer className="foot">
        <p><b>{KG.t(lang, "brand")}</b></p>
        <p className="foot-note small">
          Made with ❤️ for kids &amp; teachers · Play Group · LKG · UKG · Class 1
        </p>
      </footer>

      {poem && (
        <KG.Reader
          poem={poem}
          lang={lang}
          onLang={setLang}
          tab={tab}
          onTab={setTab}
          autoPlay={autoPlay}
          onClose={close}
          onPrev={idx > 0 ? () => step(-1) : null}
          onNext={idx < poems.length - 1 ? () => step(1) : null}
          toast={toast}
        />
      )}

      <div id="printArea" className="print-area" />
      {toastMsg && <div className="toast">{toastMsg}</div>}
    </>
  );
};