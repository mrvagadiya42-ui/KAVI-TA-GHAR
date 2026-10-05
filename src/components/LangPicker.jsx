/* ============================================================
   LANGUAGE BUTTON + POPUP
   Click karo → 3 bhashayein dikhao → jo chuno, poori website
   usi bhasha me badal jayegi.
   ============================================================ */

window.KG = window.KG || {};

KG.LangPicker = function LangPicker({ lang, onChange }) {
  const [open, setOpen] = React.useState(false);
  const t = (k) => KG.t(lang, k);

  const OPTIONS = [
    { id: "hi", emo: "🇮🇳", name: "हिन्दी",   sub: "Hindi" },
    { id: "gu", emo: "🟧", name: "ગુજરાતી", sub: "Gujarati" },
    { id: "en", emo: "🌍", name: "English",  sub: "English" }
  ];

  React.useEffect(() => {
    if (!open) return;
    const h = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [open]);

  const pick = (id) => { onChange(id); setOpen(false); };

  const cur = OPTIONS.find(o => o.id === lang) || OPTIONS[0];

  return (
    <>
      <button className="langbtn" onClick={() => setOpen(true)} aria-haspopup="dialog">
        <span className="langbtn-emo">{cur.emo}</span>
        <span className="langbtn-txt">
          <b>{cur.name}</b>
          <i>{t("langBtn")}</i>
        </span>
        <span className="langbtn-caret">▾</span>
      </button>

      {open && ReactDOM.createPortal(
        <div className="cp" role="dialog" aria-modal="true"
             aria-label="Bhasha chunein">
          <div className="cp-backdrop" onClick={() => setOpen(false)} />

          <div className="cp-box cp-box-sm">
            <header className="cp-head">
              <div>
                <h3>🌐 {t("chooseLang")}</h3>
                <p>{t("langTip")}</p>
              </div>
              <button className="icon-btn light" onClick={() => setOpen(false)}
                      aria-label={t("close")}>✕</button>
            </header>

            <div className="cp-grid cp-grid-lang">
              {OPTIONS.map((o) => (
                <button key={o.id}
                        className={"cp-card cp-lang" + (lang === o.id ? " is-on" : "")}
                        onClick={() => pick(o.id)}>
                  <span className="cp-emo">{o.emo}</span>
                  <b>{o.name}</b>
                  <i>{o.sub}</i>
                  {lang === o.id && <em>✓</em>}
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};