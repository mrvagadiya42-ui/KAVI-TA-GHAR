"""Kavita Ka Ghar — data JS files ko JSON me badalta hai.
(taaki audio banane wale script ko data mil sake)

Chalane ka tareeka:  python tools_extract_json.py
"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent
DATA = ROOT / "src" / "data"
OUT = ROOT / "src" / "data" / "poems.json"

KEYS = ("id", "title", "classId", "scene", "poem", "classic", "videoNote",
        "hi", "gu", "en", "label", "age", "emoji")


def backticks_to_json(text: str) -> str:
    """`template` ko JSON string bana deta hai"""
    out = []
    i = 0
    n = len(text)
    while i < n:
        ch = text[i]
        if ch == "`":
            j = i + 1
            while j < n and text[j] != "`":
                j += 1
            raw = text[i + 1:j]
            raw = raw.replace("\\", "\\\\").replace('"', '\\"')
            raw = raw.replace("\r\n", "\n").replace("\r", "\n").replace("\n", "\\n")
            out.append('"' + raw + '"')
            i = j + 1
        else:
            out.append(ch)
            i += 1
    return "".join(out)


def quote_bare_keys(text: str) -> str:
    """`id:` `{ hi:` aur `, scene:` — har jagah key quote kar do"""
    for k in KEYS:
        # \s newline bhi uthata hai — sirf space/tab lena hai
        text = re.sub(
            r"(?m)(^|[{,])[ \t]*" + k + r"[ \t]*:",
            lambda m, k=k: m.group(1) + '"' + k + '":',
            text)
    return text


def strip_comments(text: str) -> str:
    """JS ka /* ... */ comment hata do (JSON me nahi hota)"""
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    return text


def grab(text: str, start_pat: str) -> str:
    m = re.search(start_pat, text)
    if not m:
        raise SystemExit("start pattern nahi mila: " + start_pat)
    i = m.end() - 1          # '[' ya '(' par
    depth = 0
    for j in range(i, len(text)):
        if text[j] in "[(":
            depth += 1
        elif text[j] in "])":
            depth -= 1
            if depth == 0:
                return text[i:j + 1]
    raise SystemExit("matching close nahi mila")


def to_json(text: str) -> str:
    # pehle keys quote karo (tabhi line structure intact rehta hai),
    # phir backtick wale poem ko JSON string banao
    return backticks_to_json(quote_bare_keys(strip_comments(text)))


def main():
    poems = []

    core = (DATA / "poems-core.js").read_text(encoding="utf-8")
    classes = json.loads(to_json(grab(core, r"KG\.CLASSES\s*=\s*")))

    arr = grab(core, r"KG\.POEMS\s*=\s*")
    poems += json.loads(to_json(arr))

    for name in ("poems-a.js", "poems-b.js", "poems-c.js", "poems-classics.js",
             "poems-popular.js", "poems-popular2.js", "poems-popular3.js"):
        p = DATA / name
        if not p.exists():
            continue
        raw = p.read_text(encoding="utf-8")
        # KG.POEMS.push( ke baad ka part (aakhri ');' hata do)
        arr = raw.split("KG.POEMS.push(", 1)[1].rsplit(");", 1)[0].strip()
        # yahan sirf objects ka list hota hai (array nahi) — [ ] laga do
        if not arr.startswith("["):
            arr = "[" + arr.rstrip(",") + "]"
        poems += json.loads(to_json(arr))

    OUT.write_text(
        json.dumps({"classes": classes, "poems": poems},
                   ensure_ascii=False, indent=1),
        encoding="utf-8")

    print(f"Classes : {len(classes)}")
    print(f"Poems   : {len(poems)}")
    for c in classes:
        print(f"   {c['id']:5s} {c['label']:16s} {sum(1 for p in poems if p['classId']==c['id'])}")
    print(f"Total lines JSON me likhi gayi -> {OUT}")


if __name__ == "__main__":
    main()