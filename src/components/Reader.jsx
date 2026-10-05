/* ============================================================
   READER — poem kholne ke baad ka poora panel
   (text + 3 bhasha tabs + Suno + Record + PDF + Tasveer + Video)
   ============================================================ */

window.KG = window.KG || {};

KG.Reader = function Reader({ poem, lang, onLang, tab, onTab, onClose, onPrev, onNext, toast, autoPlay }) {
  const t = (k) => KG.t(lang, k);
  const cls = KG.classById(poem.classId);
  const sp = KG.useSpeech(poem, tab);

  /* --- Speed: MP3 audio aur computer ki awaaz, dono par lagta hai --- */
  const [speed, setSpeed] = React.useState(() => {
    try {
      const v = parseFloat(window.localStorage.getItem("kgh_speed"));
      return v > 0 ? v : 0.9;
    } catch (e) { return 0.9; }
  });

  const changeSpeed = (v) => {
    const n = Math.round(parseFloat(v) * 100) / 100;
    setSpeed(n);
    try { window.localStorage.setItem("kgh_speed", n); } catch (e) {}
  };

  React.useEffect(() => { sp.setRate(speed); }, [speed]);

  const au = KG.usePoemAudio(poem, tab, speed, sp.speak);
  const rc = KG.useRecorder(poem.id, poem.title.hi);

  /* recording timer */
  const [secs, setSecs] = React.useState(0);
  React.useEffect(() => {
    if (!rc.recording) { setSecs(0); return; }
    const id = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [rc.recording]);

  /* agar teacher ne recording bana di hai to Play usi ko chalaye */
  const hasRec = !!rc.savedUrl;
  const playMain = () => {
    if (hasRec) { KG.chime(); rc.playSaved(); }
    else au.play();
  };
  const stopMain = () => { au.stop(); sp.stop(); };
  const isPlaying = au.playing || sp.speaking;

  const [video, setVideo] = React.useState("");
  const [vErr, setVErr] = React.useState("");
  const vRef = React.useRef(null);

  /* kholte hi chalane ka PLAY button
   (mobile par awaaz block hoti hai — isliye user gesture zaroori) */
  const played = React.useRef(false);
  React.useEffect(() => {
    if (autoPlay && !played.current) {
      played.current = true;
      const t = setTimeout(() => au.play(), 120);
      return () => clearTimeout(t);
    }
  }, [autoPlay]);

  /* agle / pichle button band ho to kuch na ho */
  React.useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose, onNext, onPrev]);

  /* jab poem band ho, recording bhi band */
  React.useEffect(() => () => rc.stop(), [poem.id]);

  const showVideo = (url) => {
    const v = (url || "").trim();
    setVErr("");
    setVideo(v);
  };

  const onRec = async () => {
    if (rc.recording) { rc.stop(); toast("🎉 Recording ban gayi!"); return; }
    const res = await rc.start();
    if (res.error) toast("⚠️ " + res.error);
    else toast("🎤 Bolne lijiye… (dobara dabao to band)");
  };

  const onPrint = () => {
    const langs = tab === "all" ? KG.LANG_ORDER : [tab];
    const node = document.getElementById("printArea");
    node.innerHTML =
      `<section class="pp">
         <div class="pp-head"><div class="pp-logo"></div>
           <div class="pp-brand">कविता का घर
             <small>કવિતાનું ઘર · Kavita Ka Ghar</small></div></div>
         <h1 class="pp-title">${poem.title[lang]}</h1>
         <p class="pp-badge">${cls.emoji} ${cls.label} · ${cls.age}</p>
         <div class="pp-art">${KG.ART.build(poem.scene)}</div>
         ${langs.map(lg =>
            `<div class="pp-lang">${KG.LANGS[lg].label}</div>
             <div class="pp-text">${poem.poem[lg]}</div>`).join("")}
         <p class="pp-foot">Original kavita — kisi aur ka content copy nahi
            kiya gaya. (No copyright)</p>
       </section>`;
    setTimeout(() => window.print(), 60);
  };

  return (
    <div className="reader">
      <div className="reader-backdrop" onClick={onClose} />

      <article className="reader-box">
        <audio ref={au.ref} preload="none" />
        <header className="reader-head">
          <button className="icon-btn" onClick={onClose} aria-label={t("close")}>✕</button>
          <div className="reader-head-txt">
            <span className="badge">{cls.emoji} {cls.label} · {cls.age}</span>
            {poem.classic && <span className="badge badge-tradi">🏛 Traditional</span>}
            <h2>{poem.title[lang]}</h2>
          </div>
        </header>

        <div className="art-wrap">
          <KG.Art scene={poem.scene} />
          <button className={"rplay" + (au.playing ? " is-on" : "") +
                  (au.blocked ? " is-blocked" : "")}
                  onClick={au.playing ? au.stop : au.play}
                  aria-label="Kavita play / pause">
            <span className="rplay-ico">{au.playing ? "⏸" : "▶"}</span>
            <span className="rplay-txt">
              <b lang="hi">{sp.speaking ? "रुकें" : "सुनें"}</b>
              <b lang="gu">{sp.speaking ? "બંધ કરો" : "વગાડો"}</b>
              <b lang="en">{sp.speaking ? "Pause" : "Play"}</b>
            </span>
          </button>
        </div>

        <div className="lang-tabs" role="tablist">
          <button className={"ltab" + (tab === "hi" ? " is-on" : "")}
                  onClick={() => onTab("hi")} role="tab">हिन्दी</button>
          <button className={"ltab" + (tab === "gu" ? " is-on" : "")}
                  onClick={() => onTab("gu")} role="tab">ગુજરાતી</button>
          <button className={"ltab" + (tab === "en" ? " is-on" : "")}
                  onClick={() => onTab("en")} role="tab">English</button>
          <button className={"ltab ltab-all" + (tab === "all" ? " is-on" : "")}
                  onClick={() => onTab("all")} role="tab">📖 तीनों एक साथ</button>
        </div>

        <div className="poem-body">
          {tab === "all" ? (
            KG.LANG_ORDER.map(lg => (
              <div className="poem-block" key={lg}>
                <div className="poem-lang all">📖 तीनों भाषाएँ</div>
                <div className={"poem-text " + lg} lang={lg}>{poem.poem[lg]}</div>
              </div>
            ))
          ) : (
            <div className="poem-block">
              <div className={"poem-text " + tab + (sp.speaking ? " speaking" : "")}
                   lang={tab}>{poem.poem[tab]}</div>
            </div>
          )}
        </div>

        <div className="tools">
          <div className="voice-box">
            <span className="v-ok">
              🎧 <b>{poem.title[lang]}</b> ki audio taiyaar hai —
              हिन्दी ✅ · ગુજરાતી ✅ · English ✅
            </span>
            <a className="btn-mini" download href={au.srcOf(tab === "all" ? "hi" : tab)}>
              ⬇️ Audio save karo
            </a>
            <button className="btn-mini" onClick={sp.reload}>↻</button>
          </div>

          <details className="voice-help">
            <summary>🖥️ Sirf computer ki awaaz se sunana hai? (voice guide)</summary>
            <ul>
              <li>Har kavita ki <b>MP3 audio</b> website par bani hui hai —
                  upar wala ▶ Play usi ko chalata hai, isliye awaaz
                  <b> hamesha aayegi</b>.</li>
              {!sp.info.hi && <li>
                <b>Windows:</b> Settings → Time &amp; language → Language &amp;
                region → "Add a language" → <b>Hindi (India)</b> → Options →
                Speech → Download. (tab "Computer ki awaaz" हिन्दी में बोलेगी)
              </li>}
              {!sp.info.gu && <li>
                <b>Gujarati voice:</b> isi tarah <b>Gujarati</b> language
                add karke uska Speech download karo.
              </li>}
              <li><b>Android phone:</b> Settings → Accessibility →
                Text-to-speech → Google Speech Services → Install voice data.</li>
            </ul>
          </details>

          <div className="tool-row">
            <button className={"btn btn-play" + (isPlaying ? " is-playing" : "")}
                    onClick={() => { if (isPlaying) stopMain(); else playMain(); }}>
              <span className="ico">{isPlaying ? "⏸" : "▶"}</span>
              <span>{isPlaying ? t("playing") : t("playBtn")}</span>
            </button>

            <button className="btn btn-stop" onClick={stopMain}>⏹ Rukoo</button>

            <button className="btn btn-tts"
                    onClick={sp.speaking ? sp.stop : sp.speak}
                    title="Computer ki apni awaaz se sunaye">
              🖥️ Computer ki awaaz
            </button>

            {hasRec && (
              <span className="rec-mode">
                🎤 {t("teacherRec")} — <b>{t("recPlaying")}</b>
              </span>
            )}

            <div className="speed">
              <span className="flabel">Speed:</span>

              <button className={"sbtn" + (Math.abs(speed - 0.6) < .01 ? " is-on" : "")}
                      onClick={() => changeSpeed(0.6)}>Dheere</button>
              <button className={"sbtn" + (Math.abs(speed - 0.9) < .01 ? " is-on" : "")}
                      onClick={() => changeSpeed(0.9)}>Theek</button>
              <button className={"sbtn" + (Math.abs(speed - 1.2) < .01 ? " is-on" : "")}
                      onClick={() => changeSpeed(1.2)}>Tez</button>

              <input className="speed-range" type="range"
                     min="0.5" max="1.5" step="0.05" value={speed}
                     aria-label="Awaaz ki speed"
                     onChange={(e) => changeSpeed(e.target.value)} />

              <b className="speed-val">{speed.toFixed(2)}×</b>
            </div>
          </div>

          <div className="tool-row rec-row">
            <button className={"btn btn-rec" + (rc.recording ? " is-rec" : "")}
                    onClick={onRec}>
              {rc.recording
                ? `⏹ ${t("recStop")}  ${String(Math.floor(secs / 60))}:${String(secs % 60).padStart(2, "0")}`
                : `🎤 ${t("recBtn")}`}
            </button>

            {rc.recording && <span className="rec-live"><i></i>REC</span>}

            {(rc.url || rc.savedUrl) && !rc.recording && (
              <>
                <button className="btn btn-playrec" onClick={rc.playSaved}>
                  ▶️ {t("playRec")}
                </button>
                <a className="btn btn-dl" href={rc.savedUrl || rc.url}
                   download={`kavita-ka-ghar-${rc.fileName}-${tab}.webm`}>
                  ⬇️ {t("dlRec")}
                </a>
                <button className="btn btn-delrec" onClick={rc.erase}
                        title="Recording mitayein">🗑</button>
              </>
            )}
          </div>

          <div className="tool-row">
            <button className="btn btn-pdf" onClick={onPrint}>🖨 PDF / Print</button>
            <button className="btn btn-img" onClick={() => {
              KG.ART.download(poem.scene, poem.title.hi);
              toast("🖼 Tasveer save ho gayi!");
            }}>🖼 Tasveer save karo</button>
          </div>

          <div className="video-row">
            <label className="flabel" htmlFor="vLink">🎥 Apna video (optional):</label>
            <input id="vLink" className="vlink" value={video}
                   placeholder="https://... (teacher ka apna video)"
                   onChange={e => setVideo(e.target.value)}
                   onBlur={() => showVideo(video)} />
            {vErr && <p className="v-err">{vErr}</p>}
            {/^https?:\/\//i.test(video.trim()) && (
              <div className="v-box">
                <video ref={vRef} controls preload="none" playsInline
                       src={video.trim()} />
                <div className="v-actions">
                  <button className="btn btn-vplay"
                          onClick={() => {
                            const v = vRef.current;
                            if (!v) return;
                            if (v.paused) { v.play(); toast("▶️ Video chal raha hai"); }
                            else { v.pause(); toast("⏸ Video ruka"); }
                          }}>▶️ Video</button>
                </div>
              </div>
            )}
          </div>

          <p className="tools-hint">
            💡 Recording sirf aapke phone mein save hoti hai — kahin upload nahi hoti.
            Video ke liye kisi aur ka link mat daalein, sirf apna daalein.
          </p>
        </div>

        <nav className="rnav">
          <button className="btn btn-nav" onClick={onPrev} disabled={!onPrev}>
            ← Pichli kavita
          </button>
          <button className="btn btn-nav" onClick={onNext} disabled={!onNext}>
            Agli kavita →
          </button>
        </nav>
      </article>
    </div>
  );
};