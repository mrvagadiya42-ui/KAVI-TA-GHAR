/* Header + Hero + Poem Grid */

window.KG = window.KG || {};

KG.HEADER_NAME = {
  hi: { main: "कविता का घर", sub: ["કવિતાનું ઘર", "Kavita Ka Ghar"] },
  gu: { main: "કવિતાનું ઘર", sub: ["कविता का घर", "Kavita Ka Ghar"] },
  en: { main: "Kavita Ka Ghar", sub: ["कविता का घर", "કવિતાનું ઘર"] }
};

KG.Header = function Header({ lang, classId, onClass, onLang, name, onName }) {
  const t = (k) => KG.t(lang, k);

  return (
    <header className="top">
      <div className="rainbow-strip" aria-hidden="true" />

      <div className="top-in">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="46" height="46">
              <rect x="10" y="8" width="44" height="48" rx="8" fill="#fff"
                    stroke="#3EC5E0" strokeWidth="3" />
              <path d="M20 22h24M20 32h24M20 42h16" stroke="#FF5C8A"
                    strokeWidth="4" strokeLinecap="round" />
              <circle cx="46" cy="46" r="9" fill="#FFD24A" stroke="#fff" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="brand-txt">
            <h1>{t("brand")}</h1>
            <p className="brand-sub">
              <span>{t("sub")[0]}</span><i>•</i><span>{t("sub")[1]}</span>
            </p>
          </div>
        </div>

        <div className="top-actions">
          <KG.LangPicker lang={lang} onChange={onLang} />
          <KG.ClassPicker value={classId} onChange={onClass} lang={lang} />
          {name && (
            <div className="namechip">
              <button className="namechip-main" onClick={() => { KG.chime(); KG.sayHello(name, lang); }}
                      title="Awaaz me sunao">
                <span className="namechip-ico">👦</span>
                <b>{name}</b>
                <span className="namechip-spk">🔊</span>
              </button>
              <button className="namechip-pen" onClick={onName}
                      title="Naam badlo">✏️</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

KG.Hero = function Hero({ lang, total, shown, onVoiceHelp }) {
  const t = (k) => KG.t(lang, k);

  return (
    <section className="hero">
      <div className="hero-card">
        <div className="hero-txt">
          <h2>{t("heroTitle")}</h2>
          <p>{t("heroSub")}</p>
          <div className="hero-badges">
            <button className="pill pill-btn" onClick={onVoiceHelp}>
              {t("voiceBtn")}
            </button>
          </div>
        </div>
        <div className="hero-art">
          <KG.Art scene={["day", "child", "book", "cloud", "bird", "tree"]} />
        </div>
      </div>

      {shown > 0 && shown < total && (
        <p className="hero-count">
          {t("kavitayen")}: <b>{shown}</b> / {total}
        </p>
      )}
    </section>
  );
};

/* ============================================================
   HOME PAR SIRF CLASS TILES  (kavita list nahi)
   ============================================================ */
KG.ClassTiles = function ClassTiles({ onPick, lang }) {
  const t = (k) => KG.t(lang, k);
  return (
    <section className="tiles-wrap">
      <div className="tiles">
        <button className="tile tile-all" onClick={() => onPick("all")}>
          <span className="tile-emoji">🌈</span>
          <b>{t("allClasses")}</b>
          <i>{KG.POEMS.length} {t("kavitayen")}</i>
        </button>

        {KG.CLASSES.map((c) => (
          <button key={c.id} className="tile" onClick={() => onPick(c.id)}>
            <span className="tile-emoji">{c.emoji}</span>
            <b>{c.label}</b>
            <i>{c.age}</i>
            <em>{KG.countOf(c.id)}</em>
          </button>
        ))}
      </div>
    </section>
  );
};

KG.PoemGrid = function PoemGrid({ poems, lang, onOpen, onPlay }) {
  const t = (k) => KG.t(lang, k);
  if (!poems.length) {
    return <p className="empty">Koi kavita nahi mili. 😅</p>;
  }
  return (
    <div className="grid">
      {poems.map((p) => {
        const cls = KG.classById(p.classId);
        return (
          <div key={p.id} className="card">
            <div className="card-art" onClick={() => onOpen(p.id)}
                 role="button" tabIndex={0}
                 onKeyDown={(e) => { if (e.key === "Enter") onOpen(p.id); }}>
              <KG.Art scene={p.scene} />
              <span className="card-badge">{cls.emoji} {cls.label}</span>
              {p.classic && <span className="card-tradi">🏛 Traditional</span>}

              <button className="card-play" title={t("playBtn")}
                      aria-label={t("playBtn")}
                      onClick={(e) => { e.stopPropagation(); onPlay(p.id); }}>
                <span className="card-play-ico">▶</span>
                <span className="card-play-txt"><b>{t("play")}</b></span>
              </button>
            </div>

            <div className="card-body">
              <div className="card-title" lang={lang}>{p.title[lang]}</div>
              <div className="card-sub">
                {(KG.LANGS[lang] || KG.LANGS.hi).label} · {cls.age}
              </div>
              <div className="card-actions">
                <button className="btn-mini btn-mini-play"
                        onClick={() => onPlay(p.id)}>▶ {t("play")}</button>
                <button className="btn-mini" onClick={() => onOpen(p.id)}>
                  {t("readIt")}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};