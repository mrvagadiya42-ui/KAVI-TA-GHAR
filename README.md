# कविता का घर | Kavita Ka Ghar | કવિતાનું ઘર

**Play Group se Class 1 tak ki 126 kavitayen** — Hindi, Gujarati aur English teeno bhashaon mein.
Sur wala audio, 3D animation, recording, PDF, aur ek real Android app.

🔗 **Live website:** https://kavita-ka-ghar-abf9e.web.app

---

## 📊 Numbers

| Kya | Kitna |
|---|---|
| Kavitayen | **126** (Play 27 · LKG 32 · UKG 37 · Class 1 30) |
| Bhasha | 3 (हिन्दी / ગુજરાતી / English) |
| Audio files | **378** (har kavita × 3 bhasha) |
| Audio size | 59 MB |
| 3D characters | ~25 (code se bane, koi image nahi) |
| Repo size | ~1 MB (audio/build gitignore) |

---

## ▶ Chalane ke 3 tareeke

### 1️⃣ Website — aasan (ek click)
`index.html` par double-click. Website khul jayegi.

> ⚠️ Sirf `file://` par PWA install kaam nahi karta. Uske liye option 2 behtar hai.

### 2️⃣ Website — local server (recommended)
```powershell
python serve.py
```
Phir browser me kholein: **http://localhost:5501/**
Isse offline mode (service worker) bhi sahi chalta hai.

### 3️⃣ Android app — APK
```powershell
BUILD-APK.bat
```
APK bana jayega: `android\app\build\outputs\apk\debug\app-debug.apk`

---

## 🛠️ Build scripts

| Script | Kya karta hai |
|---|---|
| `tools_extract_json.py` | `src/data/*.js` → `src/data/poems.json` |
| `tools_make_audio.py` | `edge-tts` se 378 audio banata hai (line-by-line, sur wala). `--only <id>` ek kavita ke liye |
| `tools_build_web.py` | JSX compile → `www/` (Babel ki 2.8 MB zaroorat nahi, `file://` par bhi chalta hai) |
| `serve.py` | Local server (no cache) |
| `PUSH-TO-GITHUB.bat` | One-click GitHub push |
| `BUILD-APK.bat` | One-click APK build |

**Full build (zero se):**
```powershell
python tools_extract_json.py      # data
python tools_make_audio.py        # audio (10-15 min)
python tools_build_web.py         # www/
```

---

## 🎨 Features

| Feature | Detail |
|---|---|
| 📚 **Class button** | Header me — Play Group / LKG / UKG / Class 1. Poori list box ke andar hi rehti hai |
| 🌐 **Bhasha badlein** | Poori website ka text हिन्दी / ગુજરાતી / English me switch |
| ▶ **Play** | Har card par + poem me bada button. Speed: Dheere / Theek / Tez |
| 📖 **3 bhasha tabs** | हिन्दी · ગુજરાતी · English · ya "तीनों एक साथ" |
| 🗣️ **Naam ki guaraish** | Bacche ka naam **ek baar, ladki ki awaz** me bolta hai |
| 🎤 **Apni awaaz** | Baccha khud poem record kare, sune, aur `.webm` save kare |
| 🎬 **3D animation** | Code se bani CSS scenes — koi video/image file nahi |
| 🖨 **PDF / Print** | Browser print → "Save as PDF". Poem + tasveer |
| 🖼 **Tasveer save** | Original SVG download |
| 🎥 **Teacher video** | Teacher apna video link daal sakti hain |
| 🏛 **Traditional** | Toggle — sirf paramparik (folk/classic) kavitayen |
| ⬅➡ **Pichli / Agli** | Poem se poem me seedha jump |
| 📱 **PWA / Offline** | Ek baar khulne ke baad bina internet ke bhi chalta hai |
| 🖨 **Android APK** | WebView wrapper — puri website + audio app ke andar |

---

## 📁 Folder structure

```
kavita-ka-ghar-react/
├── index.html                    # HTML + script tags (dev, Babel ke saath)
├── manifest.webmanifest          # PWA / app install
├── sw.js                         # offline service worker
├── serve.py                      # local server
├── firebase.json                 # Firebase Hosting config
│
├── BUILD-APK.bat                 # one-click APK build
├── PUSH-TO-GITHUB.bat            # one-click GitHub push
│
├── tools_extract_json.py
├── tools_make_audio.py
├── tools_build_web.py
│
├── assets/
│   ├── icon.svg                  # app icon
│   └── audio/                    # 378 mp3  (gitignore — script se banta hai)
│
├── vendor/                       # React + Babel (local, offline)
│   ├── react.min.js
│   ├── react-dom.min.js
│   └── babel.min.js
│
├── src/
│   ├── styles.css                # poori styling (rainbow theme)
│   ├── css3d.css                 # 3D engine ke saare animations
│   ├── main.js                   # entry point (audio unlock + mount)
│   ├── App.jsx                   # main React component
│   ├── data/
│   │   ├── poems-core.js         # 12 original
│   │   ├── poems-a.js            # 15
│   │   ├── poems-b.js            # 15
│   │   ├── poems-c.js            # 15
│   │   ├── poems-classics.js     # traditional / folk
│   │   ├── poems-popular.js      # popular rhymes
│   │   ├── poems-popular2.js
│   │   ├── poems-popular3.js     # 18 (Humpty Dumpty, Twinkle, Baa Baa…)
│   │   └── poems.json            # (generated)
│   ├── lib/
│   │   ├── lang.js               # bhasha config
│   │   ├── ui.js                 # teeno bhasha ke UI strings
│   │   ├── romanize.js           # Devanagari → Latin (voice na ho to)
│   │   ├── say.js                # female-voice picker, chime, greeting
│   │   ├── art.js                # original SVG art engine
│   │   ├── art3d.js              # 3D scene generator
│   │   └── hooks.js              # usePoemAudio, useRecorder, useSpeech, useToast
│   └── components/
│       ├── Art.jsx
│       ├── ClassPicker.jsx
│       ├── LangPicker.jsx
│       ├── NameGate.jsx          # naam ka pehla screen
│       ├── Shell.jsx             # Header, Hero, ClassTiles, PoemGrid
│       └── Reader.jsx            # poem panel + saare tools
│
├── www/                          # compiled build (gitignore)
│
└── android/                      # Android Studio / Gradle project
    ├── build.gradle
    ├── settings.gradle
    ├── gradle.properties
    └── app/
        ├── build.gradle
        └── src/main/
            ├── AndroidManifest.xml
            ├── java/com/kavitakaghar/app/MainActivity.java
            ├── res/              # icon + theme
            └── assets/www/       # compiled website (gitignore)
```

---

## 🔨 Tech stack

| Layer | Kya hai |
|---|---|
| Frontend | React 18 (local vendor files — koi CDN nahi) |
| Styling | Pure CSS (rainbow theme + CSS 3D engine) |
| 3D | CSS divs — koi SVG/video/image nahi |
| Audio | `edge-tts` neural voices (Swara hi / Dhwani gu / Neerja en) |
| App | Android WebView + Gradle |
| Hosting | Firebase Hosting |
| Build | Python scripts + Babel CLI |

**Dev mode me Babel browser me chalta hai** (`text/babel` scripts).
**Production/Android me JSX pehle se compile hota hai** → fast + `file://` par chalta hai.

---

## ✍️ Nayi kavita kaise add karein?

`src/data/` me koi bhi nayi file banao:

```javascript
window.KG = window.KG || {};
KG.POEMS.push({
  id: "p-naya",
  title: { hi: "नया शीर्षक", gu: "નવો શીર્ષક", en: "New Title" },
  classId: "lkg",                    // play | lkg | ukg | c1
  scene: ["day", "sun", "child"],     // tasveer ke liye
  poem: {
    hi: `पहली लाइन
दूसरी लाइन`,
    gu: `...`,
    en: `...`
  }
});
```

**Phir 3 jagah update karein:**
1. `index.html` me us file ka `<script>` tag (neeche)
2. `tools_extract_json.py` ki file list me naam
3. `sw.js` ki FILES list me (offline ke liye)

**Audio banana:**
```powershell
python tools_make_audio.py --only p-naya
```

**scene me kya aa sakta hai:**
```
day night sun moon stars cloud rain snow tree flower
butterfly bee bird child hands home school book pen
clock lamp mirror tooth robot rocket kite balloon ball
drum bus bicycle train gift cake icecream elephant
lion rabbit monkey cow hen fish boat pond river mountain
spider carrot diya colours
```

---

## 🔒 Copyright — sab safe hai ✅

| Cheez | Kahan se aayi |
|---|---|
| 126 kavitayen (3 bhasha) | **Sab original**, maine khud likhi hain |
| Tasveerein | Code se bani SVG (`src/lib/art.js`) — kisi ki copy nahi |
| 3D scenes | Code se bane CSS divs (`src/lib/art3d.js`) |
| Audio (sunao) | Neural TTS (`edge-tts`) — koi recording copy nahi |
| Audio (recording) | Bacche ki apni awaaz, sirf uske device par |
| Folk rhymes | 100+ saal purani public-domain, apne shabdon me dobara likhi |

❌ **Jaan-boojh kar nahi rakha:** aaj ke copyrighted poems, film/pop songs,
aur kisi aur ki recording ya shaayari.

---

## ⚙️ Zaroori tools

| Tool | Kyun | Installed? |
|---|---|---|
| Python 3 | scripts ke liye | ✅ |
| Node.js 18+ | Babel compile | ✅ |
| JDK 17 | Gradle / Android | ✅ |
| Android SDK | APK build | ✅ |
| Gradle 8.7 | APK build | ✅ |

> Website chalane ke liye kuch install karne ki zaroorat **nahi** hai.
> Sirf APK banane ke liye JDK + Android SDK chahiye (ek baar).

---

## 🚀 Firebase deploy

```powershell
firebase login
firebase deploy --only hosting --project kavita-ka-ghar-abf9e
```

Details: [DEPLOY-FIREBASE.md](DEPLOY-FIREBASE.md)

---

## 💛 Dhanyavaad

Bacche, teachers aur parents ke liye — pyaar se banaya gaya hai.
