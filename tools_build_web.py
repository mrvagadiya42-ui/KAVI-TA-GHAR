"""Kavita Ka Ghar — website ko build karta hai (www/ folder)

Ye JSX ko pehle se hi JavaScript me convert kar deta hai, isliye:
  • website TEZI chalti hai (2.8 MB Babel ki zaroorat nahi)
  • file:// par bhi chalti hai — matlab ANDROID APP me chalegi
  • offline perfect kaam karti hai

Chalane ka tareeka:  python tools_build_web.py
"""
import json
import pathlib
import shutil
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "src"
WWW = ROOT / "www"
VENDOR = ROOT / "vendor"
ASSETS = ROOT / "assets"

for _s in ("stdout", "stderr"):
    try:
        getattr(sys, _s).reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

# load order (Babel wale index.html se same)
DATA_FILES = [
    "data/poems-core.js", "data/poems-a.js", "data/poems-b.js", "data/poems-c.js",
    "data/poems-classics.js", "data/poems-popular.js",
    "data/poems-popular2.js", "data/poems-popular3.js",
]
LIB_FILES = [
    "lib/lang.js", "lib/ui.js", "lib/romanize.js", "lib/say.js",
    "lib/art.js", "lib/art3d.js", "lib/hooks.js",
]
COMP_FILES = [
    "components/Art.jsx", "components/ClassPicker.jsx", "components/LangPicker.jsx",
    "components/Shell.jsx", "components/Reader.jsx", "components/NameGate.jsx",
]
APP_FILES = ["App.jsx", "main.js"]


def compile_jsx():
    """Babel se saare .js/.jsx compile karo"""
    print("⚙️  JSX compile ho raha hai…")
    cmd = ["npx.cmd", "--no-install", "babel", str(SRC), "--out-dir", str(WWW / "js"),
           "--extensions", ".js,.jsx", "--presets", "@babel/preset-react"]
    r = subprocess.run(cmd, cwd=str(ROOT), capture_output=True, text=True)
    if r.returncode != 0:
        print("❌ Babel error:\n", (r.stderr or r.stdout)[-1500:])
        sys.exit(1)
    print("   ✅ compile done")


def write_index():
    print("📄 index.html likha ja raha hai…")
    parts = []
    parts.append('<!DOCTYPE html>')
    parts.append('<html lang="hi">')
    parts.append('<head>')
    parts.append('<meta charset="UTF-8">')
    parts.append('<meta name="viewport" content="width=device-width, initial-scale=1, '
                 'viewport-fit=cover, maximum-scale=1, user-scalable=no">')
    parts.append('<title>कविता का घर | Kavita Ka Ghar | કવિતાનું ઘર</title>')
    parts.append('<meta name="description" content="Play Group se Class 1 tak ki kavitayen — '
                 'Hindi, Gujarati aur English. Sur wala audio, 3D animation, recording.">')
    parts.append('<meta name="theme-color" content="#FF5C8A">')
    parts.append('<meta name="mobile-web-app-capable" content="yes">')
    parts.append('<meta name="apple-mobile-web-app-capable" content="yes">')
    parts.append('<meta name="apple-mobile-web-app-status-bar-style" content="default">')
    parts.append('<link rel="manifest" href="manifest.webmanifest">')
    parts.append('<link rel="icon" href="assets/icon.svg" type="image/svg+xml">')
    parts.append('<link rel="stylesheet" href="css/styles.css">')
    parts.append('<link rel="stylesheet" href="css/css3d.css">')
    parts.append('</head>')
    parts.append('<body>')
    parts.append('<div id="root"><div class="boot">⏳ कविता का घर खुल रहा है…</div></div>')
    parts.append('<div id="printArea" class="print-area"></div>')

    parts.append('<!-- React (local, offline) -->')
    parts.append('<script src="vendor/react.min.js"></script>')
    parts.append('<script src="vendor/react-dom.min.js"></script>')

    parts.append('<!-- data -->')
    for f in DATA_FILES:
        parts.append(f'<script src="js/{f[:-3]}"></script>')
    parts.append('<!-- lib -->')
    for f in LIB_FILES:
        parts.append(f'<script src="js/{f[:-3]}"></script>')
    parts.append('<!-- components -->')
    for f in COMP_FILES:
        parts.append(f'<script src="js/{f[:-4]}"></script>')
    parts.append('<!-- app -->')
    parts.append('<script src="js/App.js"></script>')
    parts.append('<script src="js/main.js"></script>')
    parts.append('</body>')
    parts.append('</html>')

    (WWW / "index.html").write_text("\n".join(parts), encoding="utf-8")
    print("   ✅ index.html ready")


def copy_static():
    print("📦 static files copy ho rahe hain…")
    (WWW / "vendor").mkdir(parents=True, exist_ok=True)
    for f in VENDOR.glob("react*.js"):
        shutil.copy2(f, WWW / "vendor" / f.name)

    (WWW / "css").mkdir(parents=True, exist_ok=True)
    for f in ("styles.css", "css3d.css"):
        shutil.copy2(SRC / f, WWW / "css" / f)

    (WWW / "js").mkdir(parents=True, exist_ok=True)
    for f in (SRC / "data").glob("*.json"):
        shutil.copy2(f, WWW / "js" / f.name)

    if (ROOT / "manifest.webmanifest").exists():
        shutil.copy2(ROOT / "manifest.webmanifest", WWW / "manifest.webmanifest")

    # assets (icon + audio)
    (WWW / "assets").mkdir(parents=True, exist_ok=True)
    for f in ASSETS.glob("*.*"):
        shutil.copy2(f, WWW / "assets" / f.name)

    n = 0
    src_audio = ASSETS / "audio"
    dst_audio = WWW / "assets" / "audio"
    dst_audio.mkdir(parents=True, exist_ok=True)
    for f in src_audio.glob("*.mp3"):
        t = dst_audio / f.name
        if not t.exists() or t.stat().st_size != f.stat().st_size:
            shutil.copy2(f, t)
        n += 1
    print(f"   ✅ audio: {n} files")


def main():
    if not (ROOT / "node_modules" / "@babel" / "cli").exists():
        print("❌ pehle chalao:  npm install --save-dev @babel/cli @babel/preset-react")
        sys.exit(1)

    if WWW.exists():
        shutil.rmtree(WWW)
    WWW.mkdir(parents=True)

    compile_jsx()
    write_index()
    copy_static()

    total = sum(f.stat().st_size for f in WWW.rglob("*") if f.is_file())
    print(f"\n🎉 build complete → {WWW}")
    print(f"💾 Total: {total/1024/1024:.1f} MB")


if __name__ == "__main__":
    main()
