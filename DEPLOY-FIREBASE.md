# 🔥 Firebase par deploy kaise karein (3 commands)

Site taiyaar hai. Bas ye 3 commands chalane hain.

---

## Step 0 — (ek baar) Firebase project banao

Browser me kholein: **https://console.firebase.google.com**

1. **Sign in** apne Google account se
2. **"Add project"** par click karein
3. Project ka naam likhein — jaise `kavita-ka-ghar`
   (ya jo bhi naam aapko pasand ho)
4. Google Analytics ko **OFF** kar dein (zaroorat nahi)
5. **Create project**

> Project banate hi Firebase khud poochega ki **Hosting** add karni hai —
> wahan **"Get started"** par click kar dein. (Nahi dikhaya to
> `Build` → `Hosting` → `Get started` se kar lein.)

---

## Step 1 — Login (sirf ek baar)

Terminal (PowerShell/CMD) kholein aur chalayein:

```powershell
firebase login
```

- Browser khul jayega → **Google account se sign in** karein
- Wapas terminal me `Allow`/`Yes` type karke Enter dabayein

---

## Step 2 — Apna project id set karein

Project bante waqt jo **Project ID** dikha (jaise `kavita-ka-ghar-1234`),
use `.firebaserc` file me daal do:

```json
{
  "projects": {
    "default": "APNA-PROJECT-ID-YAHAN"
  }
}
```

*(File already bani hui hai — bas andar ka naam badal do.)*

Ya terminal se:

```powershell
firebase use --add
```

---

## Step 3 — Deploy 🚀

```powershell
firebase deploy
```

2-3 minute lagenge (audio files 32 MB hain). Ho jane par terminal me
link milega, jaise:

```
https://kavita-ka-ghar-1234.web.app
```

**Bas! Website live.** 🎉

---

## Baad me update karna ho to

```powershell
firebase deploy
```

dobara chalayein — sirf naye files update ho jayenge.

---

## Common problems

| Problem | Solution |
|---|---|
| `Error: Not logged in` | `firebase login` dobara chalayein |
| `Error: No currently active project` | `firebase use --add` chalayein |
| `Error: Permission denied` | Console me → Project settings → Service accounts → apna account **Owner** banao |
| `Error: 403` | Blaze plan lagana pad sakta hai (Hosting ke liye usually nahi) |
| Site purani dikh rahi hai | Browser me `Ctrl + F5` daba kar refresh karein |

---

## Site par kya milega (yaad dilane ke liye)

- **74 kavitayen** — Hindi / Gujarati / English
- **222 audio files** — har kavita 3 bhashaon me (Hindi voice: Swara,
  Gujarati: Dhwani, English: Neerja)
- **100+ original SVG tasveerein**
- Class filter, PDF print, recording, video link
- PWA — phone par "Add to Home screen" se app ban jayegi
- **Zero copyright issue** — sab kuch original