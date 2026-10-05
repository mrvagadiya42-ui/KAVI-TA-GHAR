/* ============================================================
   NAAM KA FORM — baccha apna naam bataye, phir wo
   awaaz me sunayi jaaye (aur har baar yaad rahe).
   ============================================================ */

window.KG = window.KG || {};

KG.LBL = {
  hi: {
    title: "अपना नाम बताओ",
    ph: "जैसे: आरव",
    go: "बोल दो",
    again: "नाम बदलें",
    hey: "नमस्ते"
  },
  gu: {
    title: "તમારું નામ કહો",
    ph: "દા.તર. આરવ",
    go: "બોલી દો",
    again: "નામ બદલો",
    hey: "નમસ્તે"
  },
  en: {
    title: "Tell me your name",
    ph: "e.g. Aarav",
    go: "Say it",
    again: "Change name",
    hey: "Hello"
  }
};

/* ============================================================
   PEHLA SCREEN — baccha apna naam deta hai.
   Naam dene ke baad hi website khulti hai aur uska
   naam awaaz me bolkar aata hai.
   ============================================================ */
KG.NameScreen = function NameScreen({ lang, initial, onDone }) {
  const L = KG.LBL[lang] || KG.LBL.hi;
  const [val, setVal] = React.useState(initial || "");
  const [go, setGo] = React.useState(false);

  /* screen aaate hi input par focus */
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current) ref.current.focus();
  }, [go]);

  const submit = (e) => {
    if (e) e.preventDefault();
    const n = val.trim();
    if (!n) { ref.current && ref.current.focus(); return; }
    KG.chime();
    /* website kholne se PEHLE naam bolwa do */
    KG.sayHello(n, lang);
    setGo(true);
    onDone(n);
  };

  return (
    <div className="name-screen">
      <div className="name-screen-card">
        <div className="ns-logo">
          <svg viewBox="0 0 64 64" width="54" height="54">
            <rect x="10" y="8" width="44" height="48" rx="8" fill="#fff"
                  stroke="#3EC5E0" strokeWidth="3" />
            <path d="M20 22h24M20 32h24M20 42h16" stroke="#FF5C8A"
                  strokeWidth="4" strokeLinecap="round" />
            <circle cx="46" cy="46" r="9" fill="#FFD24A" stroke="#fff" strokeWidth="2.5" />
          </svg>
          <b>{KG.t(lang, "brand")}</b>
          <i>{KG.t(lang, "sub")[1]}</i>
        </div>

        <span className="ns-ico">🧒</span>
        <h1 className="ns-title">{L.title}</h1>
        <p className="ns-sub">
          {lang === "gu"
            ? "તમારું નામ લખો — પછી વેબસાઇટ ખુલશે અને નામ બોલાઈ શકાશે."
            : lang === "en"
            ? "Type your name — then the website will open and say it out loud."
            : "अपना नाम लिखो — फिर वेबसाइट खुलेगी और तुम्हारा नाम बोलकर सुना देगी।"}
        </p>

        <form onSubmit={submit} className="ns-form">
          <input ref={ref} className="ns-in" value={val} maxLength={24}
                 placeholder={L.ph} aria-label={L.title}
                 onChange={(e) => setVal(e.target.value)} />
          <button className="ns-go" type="submit" disabled={!val.trim()}>
            🔊 {L.go}
          </button>
        </form>

        <div className="ns-lang">
          {[ {id:"hi",e:"🇮🇳",n:"हिन्दी"}, {id:"gu",e:"🟧",n:"ગુજરાતી"}, {id:"en",e:"🌍",n:"English"} ]
            .map(o => (
              <span key={o.id}
                    className={"ns-lang-item" + (lang === o.id ? " is-on" : "")}>
                {o.e} {o.n}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- naam likhne ka form ---------- */
KG.NameForm = function NameForm({ lang, initial, onSave, onClose }) {
  const L = KG.LBL[lang] || KG.LBL.hi;
  const [val, setVal] = React.useState(initial || "");

  const submit = (e) => {
    e.preventDefault();
    const n = val.trim();
    if (!n) return;
    KG.chime();
    KG.sayHello(n, lang);
    onSave(n);
  };

  return (
    <div className="name-pop">
      <div className="name-card">
        <span className="name-ico">🧒</span>
        <h3>{L.title}</h3>

        <form onSubmit={submit}>
          <input className="name-in" value={val} maxLength={24}
                 placeholder={L.ph} autoFocus
                 aria-label={L.title}
                 onChange={(e) => setVal(e.target.value)} />
          <button className="btn btn-say" type="submit">🔊 {L.go}</button>
        </form>

        {initial && onClose && (
          <button className="btn-mini name-cancel" onClick={onClose}>
            {L.again}
          </button>
        )}
      </div>
    </div>
  );
};

/* ---------- naam yaad rakho ---------- */
KG.useName = function () {
  const [name, setName] = React.useState(() => {
    try { return window.localStorage.getItem("kgh_name") || ""; }
    catch (e) { return ""; }
  });

  const save = React.useCallback((n) => {
    try { window.localStorage.setItem("kgh_name", n); } catch (e) {}
    setName(n);
  }, []);

  const clear = React.useCallback(() => {
    try { window.localStorage.removeItem("kgh_name"); } catch (e) {}
    setName("");
  }, []);

  return { name, save, clear };
};

/* ---------- naam wala greeting card ---------- */
KG.NameHi = function NameHi({ lang, name, onEdit }) {
  const L = KG.LBL[lang] || KG.LBL.hi;
  return (
    <div className="name-hi">
      <span className="name-hi-ico">👋</span>
      <div className="name-hi-txt">
        <b>{L.hey}, <span className="name-hi-name">{name}</span>!</b>
        <i>{KG.GREETING[lang] ? KG.GREETING[lang].welcome : ""}</i>
      </div>
      <button className="btn-mini"
              onClick={() => { KG.chime(); KG.sayHello(name, lang); }}>
        🔊 {L.go}
      </button>
      <button className="btn-mini name-edit" onClick={onEdit}>✏️</button>
    </div>
  );
};