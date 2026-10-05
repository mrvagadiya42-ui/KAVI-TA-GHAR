"""Kavita Ka Ghar — har poem ki awaaz (audio) banata hai.

Ye script Microsoft Edge ki free neural voices use karti hai
(hamari apni kavitayon ko bolkar MP3 banati hai — kisi aur ka
audio copy nahi hota, isliye copyright ka koi issue nahi).

SUR / RHYTHM ke liye har kavita ko LINE BY LINE bolwaya jata
hai — har line ke baad halka pause, isliye kavita gaata-jaisa
lagti hai, flat padhai nahi.

Pehle chalao:   python tools_extract_json.py
Phir:           python tools_make_audio.py
"""
import argparse
import asyncio
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent
JSON_FILE = ROOT / "src" / "data" / "poems.json"
OUT = ROOT / "assets" / "audio"

# Windows console me emoji/gujarati na tode
for _s in ("stdout", "stderr"):
    try:
        getattr(sys, _s).reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

# (voice, speed, pitch)
VOICES = {
    "hi": ("hi-IN-SwaraNeural",   "-14%", "+8Hz"),
    "gu": ("gu-IN-DhwaniNeural",  "-14%", "+8Hz"),
    "en": ("en-IN-NeerjaNeural",  "-13%", "+5Hz"),
}
FALLBACK = {
    "hi": ["hi-IN-MadhurNeural", "en-IN-RaviNeural", "en-US-AriaNeural"],
    "gu": ["gu-IN-NiranjanNeural", "en-IN-NeerjaNeural"],
    "en": ["en-IN-PrabhatNeural", "en-US-AriaNeural", "en-US-JennyNeural"],
}

LANGS = ["hi", "gu", "en"]


def as_lines(text: str):
    """kavita ko line by line tod do — taaki sur aaye"""
    out = []
    for raw in text.strip().splitlines():
        l = " ".join(raw.split())
        if l:
            out.append(l)
    return out


async def synth_line(line, voice, rate, pitch, tries):
    """ek line ka mp3 bytes"""
    import edge_tts
    last = None
    for v in tries:
        try:
            comm = edge_tts.Communicate(line, v, rate=rate, pitch=pitch)
            data = bytearray()
            async for chunk in comm.stream():
                if chunk["type"] == "audio":
                    data += chunk["data"]
            if len(data) > 400:
                return bytes(data), None
            last = "empty audio"
        except Exception as e:
            last = e
            await asyncio.sleep(0.8)
    return None, last


async def one(p, lang, voice, rate, pitch, sem):
    dest = OUT / f"{p['id']}.{lang}.mp3"
    if dest.exists() and dest.stat().st_size > 1000:
        return "skip", dest.name

    lines = as_lines(p["poem"][lang])
    if not lines:
        return "empty", p["id"]

    tries = [voice] + [v for v in FALLBACK.get(lang, []) if v != voice]
    parts = []
    used = voice

    for line in lines:
        # line ke end par halka pause (comma) -> sur aata hai
        data, err = await synth_line(line + ",", voice, rate, pitch, tries)
        if data is None:
            full, _ = await synth_line(" ".join(lines), voice, rate, pitch, tries)
            if full is None:
                return "fail", f"{p['id']}.{lang} -> {err}"
            dest.write_bytes(full)
            return "ok", f"{dest.name} (backup)"
        parts.append(data)

    if not parts:
        return "fail", f"{p['id']}.{lang} (no parts)"

    dest.write_bytes(b"".join(parts))
    return "ok", f"{dest.name}"


async def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", nargs="*", default=None,
                    help="sirf in poem ids ka audio banao")
    ap.add_argument("--lang", nargs="*", default=None, choices=LANGS)
    ap.add_argument("--jobs", type=int, default=4)
    args = ap.parse_args()

    if not JSON_FILE.exists():
        print("❌ pehle chalao:  python tools_extract_json.py")
        sys.exit(1)

    data = json.loads(JSON_FILE.read_text(encoding="utf-8"))
    poems = data["poems"]
    if args.only:
        poems = [p for p in poems if p["id"] in args.only]
    langs = args.lang or LANGS

    OUT.mkdir(parents=True, exist_ok=True)
    print(f"🎙  {len(poems)} poems × {len(langs)} bhasha")
    print(f"🎵 SUR mode — har line alag, beech me pause")
    print(f"📁 {OUT}\n")

    stats = {"ok": 0, "skip": 0, "fail": 0, "empty": 0}
    tasks = []
    for p in poems:
        for lg in langs:
            v, r, pt = VOICES[lg]
            tasks.append((p, lg, v, r, pt))

    sem = asyncio.Semaphore(args.jobs)
    total = len(tasks)
    done = 0

    async def guarded(t):
        async with sem:
            return await one(*t, sem)

    for coro in asyncio.as_completed([guarded(t) for t in tasks]):
        state, info = await coro
        stats[state] = stats.get(state, 0) + 1
        done += 1
        if state == "fail":
            print(f"  ❌ {info}")
        if done % 10 == 0:
            print(f"  … {done}/{total}")

    size = sum(f.stat().st_size for f in OUT.glob("*.mp3"))
    print(f"\n✅ naye: {stats['ok']}   pehle se: {stats['skip']}   fail: {stats['fail']}")
    print(f"💾 Total: {size/1024/1024:.1f} MB  ({len(list(OUT.glob('*.mp3')))} files)")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n ruk gaya")
