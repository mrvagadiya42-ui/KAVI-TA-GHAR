/* ============================================================
   CLASS SELECTION BUTTON + POPUP
   (ye button poore website me class choose karne ke liye hai)
   ============================================================ */

window.KG = window.KG || {};

KG.CLASS_BTN = {
  hi: { open: "📚 कक्षा चुनें", done: "कक्षा चुन ली", all: "सभी कक्षाएँ",
        pick: "📚 कक्षा चुनें" },
  gu: { open: "📚 વર્ગ પસંદ કરો", done: "વર્ગ પસંદ કર્યો", all: "બધા વર્ગો",
        pick: "📚 વર્ગ પસંદ કરો" },
  en: { open: "📚 Choose Class", done: "Class Chosen", all: "All Classes",
        pick: "📚 Choose Class" }
};

KG.ClassPicker = function ClassPicker({ value, onChange, lang }) {
  const [open, setOpen] = React.useState(false);
  const t = KG.CLASS_BTN[lang] || KG.CLASS_BTN.hi;
  const sel = value === "all" ? null : KG.classById(value);

  /* Escape se band */
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

  return (
    <>
      <button
        className="classbtn"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <span className="classbtn-ico">📚</span>
        <span className="classbtn-txt">
          <b>{sel ? sel.label : (value === null ? t.pick : t.all)}</b>
          <i>{sel ? sel.age
                : value === null ? "4 kaksha"
                : KG.POEMS.length + " kavitayen"}</i>
        </span>
        <span className="classbtn-caret">▾</span>
      </button>

      {open && ReactDOM.createPortal(
        <div className="cp" role="dialog" aria-modal="true"
             aria-label="Class choose karein">
          <div className="cp-backdrop" onClick={() => setOpen(false)} />

          <div className="cp-box">
            <header className="cp-head">
              <div>
                <h3 lang="hi">{t.open}</h3>
                <p>
                  <span lang="hi">पसंद करो</span> ·
                  <span lang="gu">પસંદ કરો</span> ·
                  <span lang="en">Choose</span>
                </p>
              </div>
              <button className="icon-btn light" onClick={() => setOpen(false)}
                      aria-label="Band karein">✕</button>
            </header>

            <div className="cp-grid">
              <button
                className={"cp-card cp-all" + (value === "all" ? " is-on" : "")}
                onClick={() => pick("all")}
              >
                <span className="cp-emoji">🌈</span>
                <b>{t.all}</b>
                <i>{KG.POEMS.length} kavitayen</i>
              </button>

              {KG.CLASSES.map((c) => (
                <button
                  key={c.id}
                  className={"cp-card" + (value === c.id ? " is-on" : "")}
                  onClick={() => pick(c.id)}
                >
                  <span className="cp-emoji">{c.emoji}</span>
                  <b>{c.label}</b>
                  <i>{c.age}</i>
                  <em>{KG.countOf(c.id)}</em>
                </button>
              ))}
            </div>

            <footer className="cp-foot">
              <button className="btn-mini cp-home" onClick={() => pick(null)}>
                🏠 <span lang="hi">होम पर लौटें</span> ·
                <span lang="gu">હોમ પર પાછા</span> ·
                <span lang="en">Home</span>
              </button>
              <span className="cp-tip">
                <span lang="hi">जो चाहिए वही बैठक चुन लो।</span>
              </span>
            </footer>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};