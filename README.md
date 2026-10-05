# कविता का घर | Kavita Ka Ghar | કવિતાનું ઘર

Play Group se Class 1 tak ki **74 kavitayen** — Hindi, Gujarati aur English teeno bhashaon mein.

Poori website **React** me bani hai (no build step chahiye, bas chalati hai).

---

## Chalane ka tareeka (2 options)

### Option 1 — Aasan tarika (sirf ek click)

`index.html` par double-click kar dijiye. Website khul jayegi.

> ⚠️ Sirf ek baat: `file://` par **offline PWA / APK install** kaam nahi karta.
> Woh ke liye Option 2 behtar hai.

### Option 2 — Local server (recommended)

Project folder me `serve.py` hai. Ek hi command:

```bash
python serve.py
```

Phir browser me kholein: **http://localhost:5501/**

Isse offline mode (service worker) bhi sahi se kaam karta hai.

> `python` na ho to? Node.js install karke `npx serve .` bhi chalta hai.

---

## Kya kya hai website me

| Feature | Detail |
|---|---|
| **📚 Class button** | Header me — click karke Play Group / LKG / UKG / Class 1 chun sakte hain. Poori list box ke andar hi rehti hai. |
| **🌐 Bhasha badlein** | Poori website ka text हिन्दी / ગુજરાતી / English me switch hota hai. |
| **▶ Play button** | Har card par, aur poem kholne par bada play button. Poem sunata hai (Dheere / Theek / Tez speed). |
| **📖 3 bhasha tabs** | हिन्दी · ગુજરાતી · English · या "तीनों एक साथ" |
| **🎤 Apni awaaz** | Baccha khud poem record kar sakta hai, sun sakta hai aur `.webm` file save kar sakta hai. |
| **🖨 PDF / Print** | Browser ka print → "Save as PDF". Poem + tasveer, 1/3 bhashaon me. |
| **🖼 Tasveer save** | Original SVG tasveer download. |
| **🎥 Apna video** | Teacher apna video link daal sakta hai, phir ▶ button se chalega. |
| **🏛 Traditional** | Toggle — sirf paramparik (folk/classic) kavitayen. |
| **⬅➡ Pichli / Agli** | Poem se poem me seedha jump. |
| **PWA / Offline** | `manifest.webmanifest` + `sw.js` — ek baar khulne ke baad bina internet ke bhi chalega, aur phone par app install ho sakta hai. |

---

## Copyright — sab safe hai ✅

| Cheez | Kahan se aayi |
|---|---|
| 74 kavitayen (3 bhasha) | Sab **original**, maine khud likhi hain |
| Tasveerein | **Code se bani SVG** (`src/lib/art.js`) — kisi ki copy nahi |
| Audio (sunao) | Browser ka **free Text-To-Speech** — koi recording copy nahi |
| Audio (recording) | Bacche ki **apni** awaaz, sirf uske device par |
| 17 Traditional poems | 100+ saal purani **public-domain folk rhymes**, apne shabdon me dobara likhi gayi hain |

❌ Jaan-boojh kar nahi rakha: aaj ke copyrighted poems, film songs, pop songs,
aur kisi aur ki recording/shaayari. Isiliye website par logo likha hai —
**"No copyright"**.

---

## Folder structure

```
kavita-ka-ghar-react/
├── index.html                 # HTML + saare script tags
├── manifest.webmanifest       # PWA / app install
├── sw.js                      # offline service worker (network-first)
├── serve.py                   # local server (no cache)
├── assets/
│   └── icon.svg               # app ka icon
├── vendor/                    # React + Babel (local, offline chalta hai)
│   ├── react.min.js
│   ├── react-dom.min.js
│   └── babel.min.js
└── src/
    ├── styles.css             # poori styling (rainbow theme)
    ├── main.js                # entry point
    ├── App.jsx                # main React component
    ├── data/
    │   ├── poems-core.js      # 12 original kavitayen
    │   ├── poems-a.js         # 15 kavitayen
    │   ├── poems-b.js         # 15 kavitayen
    │   ├── poems-c.js         # 15 kavitayen
    │   └── poems-classics.js  # 17 traditional / folk kavitayen
    ├── lib/
    │   ├── lang.js            # bhasha ka config
    │   ├── art.js             # original SVG art engine
    │   └── hooks.js           # useSpeech, useRecorder, useToast
    └── components/
        ├── Art.jsx            # SVG wrapper
        ├── ClassPicker.jsx    # 📚 class selection button + popup
        ├── Shell.jsx          # Header, Hero, PoemGrid
        └── Reader.jsx         # poem panel + saare tools
```

---

## Naya poem kaise add karein?

`src/data/` me koi bhi nayi file bana kar usme aisa likhein:

```js
window.KG = window.KG || {};
KG.POEMS.push(
{
  id: "p-naya",
  title: { hi: "नया शीर्षक", gu: "નવો શીર્ષક", en: "New Title" },
  classId: "lkg",                     // play | lkg | ukg | c1
  scene: ["day", "sun", "child"],     // tasveer ke liye
  poem: {
    hi: `पहली लाइन
      दूसरी लाइन`,
    gu: `...`,
    en: `...`
  }
}
);
```

Phir `index.html` me us file ka ek `<script>` tag add kar dein
(baaki files ke neeche) aur `sw.js` ki `FILES` list me bhi daal dein.

### `scene` me kaun si cheezein aa sakti hain

`day` `night` `sun` `moon` `stars` `cloud` `rain` `snow` `tree` `flower`
`butterfly` `bee` `bird` `child` `hands` `home` `school` `book` `pen`
`pencil?` nahi — `computer` `clock` `lamp` `mirror` `tooth` `robot` `rocket`
`kite` `balloon` `ball` `drum` `bus` `bicycle` `train` `gift` `cake`
`icecream` `elephant` `lion` `rabbit` `monkey` `cow` `hen` `fish` `boat`
`pond` `river` `mountain` `spider` `carrot` `diya` `colours`

---

## Phone par app / APK banana

Website PWA-ready hai. Phone ke Chrome me kholein → menu →
**"Add to Home screen" / "Install app"**. Uske baad ye ek app jaisa
chalega aur offline bhi chalega.

Asli APK (Play Store ke liye) chahiye to is project ko
**Capacitor** ya **PWABuilder** se wrap kiya ja sakta hai — uske liye
Node.js install karna padega.

---

## Dhanyavaad 💛

Made with love for bacche, teachers aur parents.