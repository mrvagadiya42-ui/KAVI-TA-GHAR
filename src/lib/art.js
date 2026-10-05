/* ============================================================
   Bacchon Ki Kahani — Original SVG Art Engine
   ------------------------------------------------------------
   Ye images CODE se banti hain, kisi aur ki copy NAHI.
   Isliye copyright ka koi dikkat nahi — aap chahe jitni
   baar bhi print/download kar sakte ho.

   Poem ke "scene" list me jo cheezein likhi hain
   (jaise ["day","moon","stars","child"]) wahi yahan banayi
   jaati hain.
   ============================================================ */

window.KG = window.KG || {};

/* ---------- chhote helpers ---------- */
KG.ART = (() => {

  const sun = (x, y, r = 46) => `
    <g class="a-sun">
      <circle cx="${x}" cy="${y}" r="${r * 1.7}" fill="url(#glow)"/>
      <circle cx="${x}" cy="${y}" r="${r}" fill="#FFD24A"/>
      <circle cx="${x - r * 0.28}" cy="${y - r * 0.3}" r="${r * 0.22}" fill="#FFE79B"/>
      <circle cx="${x + r * 0.32}" cy="${y + r * 0.14}" r="${r * 0.16}" fill="#FFE79B"/>
    </g>`;

  const moon = (x, y, r = 38) => `
    <g class="a-moon">
      <circle cx="${x}" cy="${y}" r="${r * 2.1}" fill="url(#glowB)"/>
      <circle cx="${x}" cy="${y}" r="${r}" fill="#FFF3C4"/>
      <path d="M ${x + 6} ${y - r} a ${r} ${r} 0 1 0 0 ${r * 2}
               a ${r * 0.86} ${r * 0.86} 0 1 1 0 -${r * 2}Z" fill="#FFE9A8"/>
      <circle cx="${x - r * 0.32}" cy="${y - r * 0.2}" r="${r * 0.14}" fill="#F0DC9E"/>
      <circle cx="${x - r * 0.1}" cy="${y + r * 0.34}" r="${r * 0.1}" fill="#F0DC9E"/>
    </g>`;

  const cloud = (x, y, s = 1, op = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})" opacity="${op}" fill="#FFFFFF">
      <ellipse cx="0"   cy="6"  rx="40" ry="24"/>
      <ellipse cx="-32" cy="12" rx="28" ry="18"/>
      <ellipse cx="34"  cy="10" rx="32" ry="19"/>
      <ellipse cx="12"  cy="-10" rx="30" ry="22"/>
    </g>`;

  const rain = (x, y, w, n = 9) => {
    let d = "";
    for (let i = 0; i < n; i++) {
      const rx = x + (i % 3) * (w / 3) + 18;
      const ry = y + Math.floor(i / 3) * 46 + (i % 2) * 12;
      d += `<line x1="${rx}" y1="${ry}" x2="${rx - 9}" y2="${ry + 26}"
                   stroke="#7FC4F0" stroke-width="6" stroke-linecap="round"/>`;
    }
    return d;
  };

  const tree = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-9" y="-52" width="18" height="58" rx="6" fill="#9A6B41"/>
      <circle cx="-26" cy="-70" r="30" fill="#5FBF6A"/>
      <circle cx="26"  cy="-70" r="30" fill="#5FBF6A"/>
      <circle cx="0"   cy="-96" r="34" fill="#6FD07A"/>
      <circle cx="-12" cy="-84" r="18" fill="#7BDC85"/>
    </g>`;

  const bird = (x, y, s = 1, col = "#4A6FA5") => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="0" rx="18" ry="12" fill="${col}"/>
      <circle cx="16" cy="-6" r="9" fill="${col}"/>
      <circle cx="19" cy="-8" r="2.2" fill="#fff"/>
      <path d="M 24 -5 l 9 3 l -9 3 Z" fill="#F2A33C"/>
      <path d="M -4 -10 q -14 -12 -20 2 q 12 6 20 -2Z" fill="#3E5F8C"/>
      <path d="M 6 2 q 12 -2 14 8 q -12 4 -16 -2Z" fill="#3E5F8C"/>
    </g>`;

  const star = (x, y, r = 9) => `
    <path transform="translate(${x} ${y})"
      d="M0 -${r} L ${r * 0.3} -${r * 0.3} L ${r} 0 L ${r * 0.3} ${r * 0.3}
         L 0 ${r} L -${r * 0.3} ${r * 0.3} L -${r} 0 L -${r * 0.3} -${r * 0.3} Z"
      fill="#FFF6C8"/>`;

  /* ---- bacche ka simple, khush-chehra cartoon ---- */
  const child = (x, y, s = 1, shirt = "#FF7A8A") => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M -34 62 q 34 -22 68 0 Z" fill="${shirt}"/>
      <rect x="-22" y="34" width="44" height="30" rx="10" fill="${shirt}"/>
      <rect x="-30" y="38" width="10" height="26" rx="5" fill="#F2B38C"/>
      <rect x="20"  y="38" width="10" height="26" rx="5" fill="#F2B38C"/>
      <circle cx="0" cy="12" r="24" fill="#F7C9A0"/>
      <path d="M -25 8 q 2 -28 25 -28 q 23 0 25 28 q -10 -14 -25 -14 q -15 0 -25 14 Z"
            fill="#4A3428"/>
      <circle cx="-9" cy="12" r="3.4" fill="#2B1D14"/>
      <circle cx="9"  cy="12" r="3.4" fill="#2B1D14"/>
      <circle cx="-14" cy="19" r="4.5" fill="#F79AA4" opacity=".65"/>
      <circle cx="14"  cy="19" r="4.5" fill="#F79AA4" opacity=".65"/>
      <path d="M -9 21 q 9 8 18 0" stroke="#2B1D14" stroke-width="2.6"
            fill="none" stroke-linecap="round"/>
    </g>`;

  const hands = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <g stroke="#F7C9A0" stroke-width="17" stroke-linecap="round" fill="none">
        <path d="M0 24 L 0 -18"/>
        <path d="M0 0 L -24 -20"/>
        <path d="M0 0 L 24 -20"/>
        <path d="M0 4 L -32 10"/>
        <path d="M0 4 L 32 10"/>
      </g>
      <path d="M0 24 q -14 30 0 44 q 14 -14 0 -44Z" fill="#F7C9A0"/>
    </g>`;

  const apple = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 -14 q -6 -16 -22 -18 q 4 16 20 18Z" fill="#5FBF6A"/>
      <rect x="-2" y="-16" width="5" height="14" rx="2" fill="#8A5A33"/>
      <circle cx="0" cy="8" r="24" fill="#E5453F"/>
      <circle cx="-8" cy="1" r="6" fill="#F5827C"/>
      <path d="M -22 8 a 24 24 0 0 0 8 17" stroke="#C22F2B" stroke-width="5"
            fill="none" stroke-linecap="round"/>
    </g>`;

  const duck = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M -40 16 a 34 26 0 0 1 34 -26 a 34 26 0 0 1 34 26
               a 40 20 0 0 1 -34 20 a 40 20 0 0 1 -34 -20Z" fill="#FFE066"/>
      <path d="M 22 -8 q 14 -22 4 -34 q -12 -12 -20 4 q -4 10 4 18Z" fill="#FFE066"/>
      <circle cx="12" cy="-30" r="3.4" fill="#2B1D14"/>
      <path d="M 24 -32 l 18 5 l -18 6Z" fill="#F28036"/>
      <path d="M -36 14 q 10 6 18 2" stroke="#E8C63F" stroke-width="4"
            fill="none" stroke-linecap="round"/>
    </g>`;

  const umbrella = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M -52 0 a 52 52 0 0 1 104 0 Z" fill="#3EC5E0"/>
      <path d="M -52 0 a 52 52 0 0 1 26 0 l -13 -34 Z" fill="#FFD24A" opacity=".85"/>
      <path d="M -26 0 a 26 52 0 0 1 52 0 Z" fill="#FF6B8A" opacity=".85"/>
      <path d="M0 -52 a 52 52 0 0 1 26 0 l -13 -34 Z" fill="#7ED957" opacity=".85"/>
      <rect x="-3.5" y="0" width="7" height="52" rx="3.5" fill="#8A5A33"/>
      <path d="M3.5 52 q 14 4 0 12 q -10 -4 0 -12Z" fill="#8A5A33"/>
    </g>`;

  const frog = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="0" rx="26" ry="20" fill="#6FCF4E"/>
      <circle cx="-14" cy="-18" r="12" fill="#6FCF4E"/>
      <circle cx="14"  cy="-18" r="12" fill="#6FCF4E"/>
      <circle cx="-14" cy="-20" r="5" fill="#fff"/>
      <circle cx="14"  cy="-20" r="5" fill="#fff"/>
      <circle cx="-14" cy="-20" r="2.6" fill="#2B1D14"/>
      <circle cx="14"  cy="-20" r="2.6" fill="#2B1D14"/>
      <path d="M -14 6 q 14 12 28 0" stroke="#3E8F2E" stroke-width="3.4"
            fill="none" stroke-linecap="round"/>
      <path d="M -26 6 l -14 12" stroke="#6FCF4E" stroke-width="8" stroke-linecap="round"/>
      <path d="M 26 6 l 14 12" stroke="#6FCF4E" stroke-width="8" stroke-linecap="round"/>
    </g>`;

  const home = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M -56 6 L 0 -48 L 56 6 Z" fill="#E2574C"/>
      <rect x="-40" y="6" width="80" height="54" rx="6" fill="#FFF0D4"/>
      <rect x="-11" y="26" width="22" height="34" rx="4" fill="#8A5A33"/>
      <circle cx="7" cy="44" r="2.6" fill="#FFD24A"/>
      <rect x="-32" y="16" width="20" height="18" rx="4" fill="#7FC4F0"/>
      <rect x="12"  y="16" width="20" height="18" rx="4" fill="#7FC4F0"/>
      <rect x="26" y="-64" width="13" height="26" rx="4" fill="#C9524A"/>
    </g>`;

  const school = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-86" y="-8" width="172" height="70" rx="8" fill="#FFF0D4"/>
      <path d="M -94 -8 L 0 -60 L 94 -8 Z" fill="#3EC5E0"/>
      <rect x="-16" y="26" width="32" height="36" rx="4" fill="#8A5A33"/>
      <g fill="#7FC4F0">
        <rect x="-74" y="8" width="22" height="20" rx="4"/>
        <rect x="-44" y="8" width="22" height="20" rx="4"/>
        <rect x="22"  y="8" width="22" height="20" rx="4"/>
        <rect x="52"  y="8" width="22" height="20" rx="4"/>
        <rect x="-74" y="36" width="22" height="18" rx="4"/>
        <rect x="52"  y="36" width="22" height="18" rx="4"/>
      </g>
      <rect x="-14" y="-66" width="28" height="12" rx="4" fill="#FFD24A"/>
      <text x="0" y="-56" font-size="11" text-anchor="middle" fill="#1A6B8A"
            font-family="sans-serif">SCHOOL</text>
    </g>`;

  const kite = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 -46 L 34 0 L 0 52 L -34 0 Z" fill="#FF6B8A"/>
      <path d="M0 -46 L 0 52 M -34 0 L 34 0" stroke="#FFF" stroke-width="4"/>
      <path d="M0 -46 L 34 0 L 0 52 Z" fill="#FF9DB4"/>
      <path d="M0 52 q 14 18 -6 26 q 12 16 -8 22 q 14 14 -6 24"
            stroke="#8A5A33" stroke-width="3" fill="none"/>
      <path d="M0 82 l -12 16 l 12 -6 l 12 6Z" fill="#FFD24A"/>
      <path d="M0 108 l -12 16 l 12 -6 l 12 6Z" fill="#5FBF6A"/>
      <path d="M0 134 l -12 16 l 12 -6 l 12 6Z" fill="#3EC5E0"/>
    </g>`;

  const colours = (x, y, s = 1) => {
    const cols = ["#E5453F", "#FF9F1C", "#FFD24A", "#5FBF6A", "#3EC5E0", "#9B5DE5"];
    return `<g transform="translate(${x} ${y}) scale(${s})">` +
      cols.map((c, i) => {
        const a = (i / cols.length) * Math.PI * 2;
        const cx = Math.cos(a) * 46, cy = Math.sin(a) * 26;
        return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="24"
                 fill="${c}" opacity=".85"/>
                <circle cx="${(cx * 1.5).toFixed(1)}" cy="${(cy * 1.4).toFixed(1)}" r="9"
                 fill="${c}"/>`;
      }).join("") + `</g>`;
  };

  const pond = (x, y, w, h) => `
    <ellipse cx="${x}" cy="${y}" rx="${w / 2}" ry="${h / 2}" fill="#5BC0EB"/>
    <ellipse cx="${x}" cy="${y}" rx="${w / 2 - 12}" ry="${h / 2 - 7}" fill="#8ED8F7"/>
    <path d="M ${x - w / 3} ${y} q 14 -9 28 0" stroke="#fff" stroke-width="4"
          fill="none" opacity=".7" stroke-linecap="round"/>
    <path d="M ${x + 4} ${y + 14} q 14 -9 28 0" stroke="#fff" stroke-width="4"
          fill="none" opacity=".55" stroke-linecap="round"/>`;

  /* ---- EXTRA shapes (poems 13 se 60 ke liye) ---- */

  const balloon = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-36 -30 q36 96 36 66 M36 -54 q-36 106 -36 72 M0 -88 q10 96 0 118"
            stroke="#B9A896" stroke-width="2.5" fill="none"/>
      <ellipse cx="-36" cy="-58" rx="24" ry="30" fill="#FF5C8A"/>
      <ellipse cx="36"  cy="-82" rx="24" ry="30" fill="#3EC5E0"/>
      <ellipse cx="0"   cy="-116" rx="24" ry="30" fill="#FFD24A"/>
      <ellipse cx="-8"  cy="-124" rx="7" ry="9" fill="#fff" opacity=".55"/>
      <ellipse cx="44"  cy="-90" rx="7" ry="9" fill="#fff" opacity=".45"/>
    </g>`;

  const drum = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-46" y="-14" width="92" height="40" rx="10" fill="#E5453F"/>
      <ellipse cx="0" cy="-14" rx="46" ry="14" fill="#FFF0D4" stroke="#C62F2A" stroke-width="3"/>
      <path d="M -34 26 L 34 -40" stroke="#9A6B41" stroke-width="6" stroke-linecap="round"/>
      <circle cx="36" cy="-42" r="8" fill="#FFD24A"/>
      <path d="M -40 6 h 80 M -36 18 h 72" stroke="#FFD24A" stroke-width="3"/>
    </g>`;

  const ball = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <circle cx="0" cy="0" r="34" fill="#fff" stroke="#2B1D14" stroke-width="3"/>
      <path d="M0 -34 L18 -11 L0 0 L-18 -11Z" fill="#2B1D14"/>
      <path d="M0 34 L18 11 L0 0 L-18 11Z" fill="#2B1D14"/>
      <path d="M-34 0 L-11 -18 L0 0 L-11 18Z" fill="#2B1D14"/>
      <path d="M34 0 L11 -18 L0 0 L11 18Z" fill="#2B1D14"/>
    </g>`;

  const bus = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-72" y="-40" width="144" height="52" rx="10" fill="#FFD24A"/>
      <rect x="-72" y="-40" width="144" height="12" rx="6" fill="#F5B90A"/>
      <g fill="#7FC4F0">
        <rect x="-62" y="-30" width="24" height="20" rx="4"/>
        <rect x="-32" y="-30" width="24" height="20" rx="4"/>
        <rect x="-2"  y="-30" width="24" height="20" rx="4"/>
        <rect x="28"  y="-30" width="24" height="20" rx="4"/>
      </g>
      <circle cx="-44" cy="16" r="14" fill="#2B1D14"/><circle cx="-44" cy="16" r="6" fill="#CFCFCF"/>
      <circle cx="44"  cy="16" r="14" fill="#2B1D14"/><circle cx="44"  cy="16" r="6" fill="#CFCFCF"/>
    </g>`;

  const bicycle = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <g fill="none" stroke="#2B1D14" stroke-width="5">
        <circle cx="-40" cy="14" r="26"/><circle cx="40" cy="14" r="26"/>
      </g>
      <path d="M-40 14 L 0 -20 L 40 14 L -12 14 L 0 -20 M 0 -20 L -6 -34 M -6 -34 L 12 -34"
            fill="none" stroke="#E5453F" stroke-width="5" stroke-linecap="round"/>
      <circle cx="4" cy="6" r="8" fill="none" stroke="#8A5A33" stroke-width="4"/>
      <path d="M-14 -34 L 2 -34" stroke="#2B1D14" stroke-width="6" stroke-linecap="round"/>
    </g>`;

  const train = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-96" y="-34" width="60" height="46" rx="7" fill="#3EC5E0"/>
      <rect x="-30" y="-44" width="66" height="56" rx="7" fill="#E5453F"/>
      <rect x="42"  y="-34" width="56" height="46" rx="7" fill="#FFD24A"/>
      <g fill="#7FC4F0"><rect x="-86" y="-24" width="16" height="16" rx="3"/>
        <rect x="-64" y="-24" width="16" height="16" rx="3"/>
        <rect x="-18" y="-34" width="18" height="18" rx="3"/>
        <rect x="6"   y="-34" width="18" height="18" rx="3"/>
        <rect x="52"  y="-24" width="16" height="16" rx="3"/>
        <rect x="74"  y="-24" width="16" height="16" rx="3"/></g>
      <circle cx="-72" cy="16" r="10" fill="#2B1D14"/>
      <circle cx="-8"  cy="18" r="10" fill="#2B1D14"/>
      <circle cx="24"  cy="18" r="10" fill="#2B1D14"/>
      <circle cx="70"  cy="16" r="10" fill="#2B1D14"/>
      <rect x="-100" y="28" width="200" height="6" rx="3" fill="#9A7B5E"/>
    </g>`;

  const book = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-56 -34 q28 -10 56 0 v66 q-28 -10 -56 0Z" fill="#fff" stroke="#9B5DE5" stroke-width="3.5"/>
      <path d="M56 -34 q-28 -10 -56 0 v66 q28 -10 56 0Z" fill="#F7F0E6" stroke="#9B5DE5" stroke-width="3.5"/>
      <path d="M0 -34 v66" stroke="#9B5DE5" stroke-width="3.5"/>
      <path d="M-46 -16 h 26 M-46 0 h 26 M-46 16 h 20" stroke="#C9BCD6" stroke-width="3" stroke-linecap="round"/>
      <path d="M20 -16 h 26 M20 0 h 26 M20 16 h 20" stroke="#C9BCD6" stroke-width="3" stroke-linecap="round"/>
    </g>`;

  const pen = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <g transform="rotate(-38)">
        <rect x="-8" y="-52" width="16" height="72" rx="4" fill="#3EC5E0"/>
        <rect x="-8" y="-52" width="16" height="12" fill="#E5453F"/>
        <path d="M-8 20 L 0 36 L 8 20Z" fill="#FFD24A"/>
        <path d="M-2 32 L 0 36 L 2 32Z" fill="#2B1D14"/>
      </g>
      <path d="M-70 46 q40 -14 90 -6" stroke="#C9BCD6" stroke-width="3"
            fill="none" stroke-linecap="round" stroke-dasharray="2 9"/>
    </g>`;

  const gift = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-48" y="-20" width="96" height="56" rx="8" fill="#FF5C8A"/>
      <rect x="-48" y="-20" width="96" height="16" rx="6" fill="#E23C6B"/>
      <rect x="-10" y="-34" width="20" height="70" fill="#FFD24A"/>
      <rect x="-48" y="-6" width="96" height="12" fill="#FFD24A"/>
      <path d="M0 -34 q-30 -26 -14 -32 q14 -5 14 20 q0 -25 14 -20 q16 6 -14 32Z" fill="#FF9F1C"/>
    </g>`;

  const cake = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-52" y="-16" width="104" height="48" rx="9" fill="#FFC0D9"/>
      <path d="M-52 -16 q13 -18 26 0 q13 18 26 0 q13 -18 26 0 q13 18 26 0 v10 h-104Z" fill="#FF5C8A"/>
      <rect x="-4" y="-46" width="8" height="32" rx="3" fill="#3EC5E0"/>
      <path d="M0 -48 q9 -14 0 -20 q-9 6 0 20Z" fill="#FFD24A"/>
      <circle cx="-30" cy="-6" r="4" fill="#fff"/>
      <circle cx="0"  cy="-6" r="4" fill="#fff"/>
      <circle cx="30" cy="-6" r="4" fill="#fff"/>
    </g>`;

  const elephant = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="0" rx="62" ry="44" fill="#A9B6C9"/>
      <circle cx="-52" cy="-16" r="30" fill="#BCC7D8"/>
      <path d="M-70 -34 q-16 -34 10 -34 q16 0 8 26Z" fill="#8FA0B6"/>
      <path d="M-46 16 q-14 44 8 46 q16 2 6 -30" fill="#BCC7D8"/>
      <circle cx="-62" cy="-20" r="4" fill="#2B1D14"/>
      <rect x="-26" y="34" width="16" height="30" rx="7" fill="#8FA0B6"/>
      <rect x="10"  y="34" width="16" height="30" rx="7" fill="#8FA0B6"/>
      <rect x="38"  y="34" width="16" height="30" rx="7" fill="#8FA0B6"/>
    </g>`;

  const lion = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <g fill="#FF9F1C">
        ${[...Array(14).keys()].map(i => {
          const a = (i / 14) * Math.PI * 2;
          return `<circle cx="${(Math.cos(a) * 44).toFixed(1)}"
                         cy="${(Math.sin(a) * 40 - 6).toFixed(1)}" r="15"/>`;
        }).join("")}
      </g>
      <circle cx="0" cy="-6" r="33" fill="#FFD9A0"/>
      <circle cx="-11" cy="-12" r="4" fill="#2B1D14"/>
      <circle cx="11"  cy="-12" r="4" fill="#2B1D14"/>
      <path d="M0 -2 q-7 -6 -12 -1" stroke="#2B1D14" stroke-width="3.4"
            fill="none" stroke-linecap="round"/>
      <path d="M-12 8 q12 12 24 0" stroke="#2B1D14" stroke-width="3.4"
            fill="none" stroke-linecap="round"/>
      <rect x="-24" y="34" width="14" height="30" rx="6" fill="#FFD9A0"/>
      <rect x="10"  y="34" width="14" height="30" rx="6" fill="#FFD9A0"/>
    </g>`;

  const rabbit = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="8" rx="32" ry="28" fill="#F4F1EA"/>
      <ellipse cx="-28" cy="4" r="11" fill="#fff" stroke="#E3DCD0" stroke-width="2.5"/>
      <circle cx="0" cy="-20" r="26" fill="#fff" stroke="#E3DCD0" stroke-width="2.5"/>
      <ellipse cx="-9" cy="-44" rx="8" ry="26" fill="#fff" stroke="#E3DCD0" stroke-width="2.5"/>
      <ellipse cx="9"  cy="-44" rx="8" ry="26" fill="#fff" stroke="#E3DCD0" stroke-width="2.5"/>
      <ellipse cx="-9" cy="-44" rx="4" ry="18" fill="#FFC0D9"/>
      <ellipse cx="9"  cy="-44" rx="4" ry="18" fill="#FFC0D9"/>
      <circle cx="-9" cy="-22" r="4" fill="#2B1D14"/>
      <circle cx="9"  cy="-22" r="4" fill="#2B1D14"/>
      <circle cx="0" cy="-11" r="4.6" fill="#FF9BB5"/>
      <path d="M-7 -6 q7 6 14 0" stroke="#2B1D14" stroke-width="2.6"
            fill="none" stroke-linecap="round"/>
    </g>`;

  const monkey = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="4" rx="34" ry="36" fill="#A5714A"/>
      <circle cx="-30" cy="-16" r="12" fill="#8A5A33"/>
      <circle cx="30"  cy="-16" r="12" fill="#8A5A33"/>
      <circle cx="0" cy="-26" r="28" fill="#B98256"/>
      <ellipse cx="0" cy="-18" rx="20" ry="17" fill="#E8C9A0"/>
      <circle cx="-9" cy="-30" r="3.6" fill="#2B1D14"/>
      <circle cx="9"  cy="-30" r="3.6" fill="#2B1D14"/>
      <path d="M-10 -14 q10 9 20 0" stroke="#2B1D14" stroke-width="3"
            fill="none" stroke-linecap="round"/>
      <path d="M-30 22 q-24 6 -14 -20" stroke="#A5714A" stroke-width="7"
            fill="none" stroke-linecap="round"/>
      <rect x="-22" y="34" width="15" height="26" rx="7" fill="#A5714A"/>
      <rect x="8"   y="34" width="15" height="26" rx="7" fill="#A5714A"/>
    </g>`;

  const cow = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="0" rx="58" ry="36" fill="#fff" stroke="#DDD5C8" stroke-width="3"/>
      <path d="M-30 -12 q18 -12 30 4 q14 16 30 -2 q-4 20 -22 16 q-20 -4 -38 6Z" fill="#6B574A"/>
      <circle cx="-52" cy="-14" r="24" fill="#fff" stroke="#DDD5C8" stroke-width="3"/>
      <path d="M-66 -32 q-12 -14 4 -16 q10 0 6 12Z" fill="#E8DED0"/>
      <ellipse cx="-60" cy="-8" rx="12" ry="9" fill="#FFC0D9"/>
      <circle cx="-62" cy="-20" r="4" fill="#2B1D14"/>
      <path d="M-80 -6 q-10 6 -2 12" stroke="#DDD5C8" stroke-width="3" fill="none"/>
      <rect x="-30" y="30" width="14" height="30" rx="6" fill="#fff" stroke="#DDD5C8" stroke-width="2.5"/>
      <rect x="24"  y="30" width="14" height="30" rx="6" fill="#fff" stroke="#DDD5C8" stroke-width="2.5"/>
      <path d="M58 -6 q18 4 14 22" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>
    </g>`;

  const hen = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M40 6 q16 -12 10 -30" stroke="#C9524A" stroke-width="4" fill="none" stroke-linecap="round"/>
      <ellipse cx="0" cy="6" rx="34" ry="26" fill="#fff" stroke="#DDD5C8" stroke-width="3"/>
      <path d="M-6 -18 q-18 -10 -22 8 q14 8 24 2Z" fill="#8FA0B6"/>
      <circle cx="30" cy="-14" r="15" fill="#fff" stroke="#DDD5C8" stroke-width="3"/>
      <path d="M22 -28 q2 -12 8 -6 q6 -8 10 2 q8 -2 6 6Z" fill="#E5453F"/>
      <circle cx="34" cy="-16" r="3.4" fill="#2B1D14"/>
      <path d="M44 -12 l 12 4 l -12 5Z" fill="#FF9F1C"/>
      <path d="M-8 30 v 10 M8 30 v 10" stroke="#FF9F1C" stroke-width="4" stroke-linecap="round"/>
    </g>`;

  const fish = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-30 0 L -62 -24 L -62 24Z" fill="#FF9F1C"/>
      <ellipse cx="0" cy="0" rx="36" ry="22" fill="#FF9F1C"/>
      <path d="M-6 -20 q16 20 0 40 q-14 -20 0 -40Z" fill="#F28036"/>
      <circle cx="20" cy="-5" r="5" fill="#fff"/><circle cx="20" cy="-5" r="2.4" fill="#2B1D14"/>
      <path d="M30 8 q10 8 18 2" stroke="#F28036" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      <circle cx="-4" cy="12" r="4" fill="#fff" opacity=".5"/>
    </g>`;

  const boat = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-3" y="-66" width="6" height="66" fill="#8A5A33"/>
      <path d="M3 -62 L 46 -14 L 3 -14Z" fill="#E5453F"/>
      <path d="M-3 -52 L -38 -14 L -3 -14Z" fill="#FFD24A"/>
      <path d="M-62 -6 q30 -22 62 0 q30 20 62 0 l -14 24 q-48 14 -96 0Z" fill="#8A5A33"/>
      <path d="M-52 2 q26 -14 52 0" stroke="#6B4A2A" stroke-width="3" fill="none"/>
    </g>`;

  const mountain = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-96 0 L -22 -92 L 30 -30 L 52 -56 L 96 0Z" fill="#8FA0B6"/>
      <path d="M-22 -92 L -46 -66 L -6 -58Z M-30 -74 L -22 -92 L -2 -70Z" fill="#fff"/>
      <path d="M52 -56 L 30 -30 L 52 -38 L 72 -46Z" fill="#fff" opacity=".9"/>
    </g>`;

  const river = (x, y, w) => `
    <path d="M ${x} ${y} q ${w / 4} 46 ${w / 2} 0 q ${w / 4} -46 ${w / 2} 0 L ${x + w} ${y + 90}
             L ${x} ${y + 90}Z" fill="#5BC0EB"/>
    <path d="M ${x + 30} ${y + 46} q 40 -14 80 0 M ${x + 150} ${y + 24} q 40 -14 80 0"
          stroke="#fff" stroke-width="4" fill="none" opacity=".65" stroke-linecap="round"/>`;

  const flower = (x, y, s = 1, c = "#FF5C8A") => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 0 v 34" stroke="#4FA85B" stroke-width="5" stroke-linecap="round"/>
      <path d="M0 22 q-16 -10 -20 4 q16 8 20 -4Z" fill="#5FBF6A"/>
      ${[0, 72, 144, 216, 288].map(a => `
        <ellipse cx="0" cy="-15" rx="9" ry="14" fill="${c}"
          transform="rotate(${a}) translate(0 -6)"/>`).join("")}
      <circle cx="0" cy="-6" r="9" fill="#FFD24A"/>
    </g>`;

  const butterfly = (x, y, s = 1, c = "#9B5DE5") => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="-17" cy="-8" rx="17" ry="13" fill="${c}"/>
      <ellipse cx="17"  cy="-8" rx="17" ry="13" fill="${c}"/>
      <ellipse cx="-12" cy="12" rx="11" ry="10" fill="${c}" opacity=".8"/>
      <ellipse cx="12"  cy="12" rx="11" ry="10" fill="${c}" opacity=".8"/>
      <rect x="-2.5" y="-16" width="5" height="34" rx="2.5" fill="#4A3428"/>
      <path d="M0 -16 q-8 -14 -14 -12 M0 -16 q8 -14 14 -12" stroke="#4A3428" stroke-width="2.4" fill="none"/>
      <circle cx="-12" cy="-9" r="4" fill="#fff" opacity=".6"/>
      <circle cx="13" cy="-9" r="4" fill="#fff" opacity=".6"/>
    </g>`;

  const bee = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="-12" cy="-8" rx="12" ry="9" fill="#fff" opacity=".7"/>
      <ellipse cx="12" cy="-8" rx="12" ry="9" fill="#fff" opacity=".7"/>
      <ellipse cx="0" cy="0" rx="20" ry="14" fill="#FFD24A" stroke="#F5B90A" stroke-width="2.5"/>
      <rect x="-9" y="-13" width="6" height="26" fill="#2B1D14"/>
      <rect x="3"  y="-13" width="6" height="26" fill="#2B1D14"/>
      <circle cx="-20" cy="-2" r="4" fill="#2B1D14"/>
    </g>`;

  const spider = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 0 L-70 -66 M0 0 L70 -66 M0 0 L-84 -14 M0 0 L84 -14 M0 0 L-58 46 M0 0 L58 46"
            stroke="#9A8B7C" stroke-width="2.6" fill="none"/>
      <path d="M-70 -66 L70 -66 M-58 46 L58 46" stroke="#9A8B7C" stroke-width="2" fill="none"/>
      <ellipse cx="0" cy="4" rx="17" ry="19" fill="#4A3428"/>
      <circle cx="0" cy="-16" r="12" fill="#4A3428"/>
      <circle cx="-4" cy="-19" r="3.4" fill="#fff"/><circle cx="5" cy="-19" r="3.4" fill="#fff"/>
    </g>`;

  const icecream = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-24 6 L0 62 L24 6Z" fill="#E8C48A"/>
      <path d="M-15 14 L15 14 M-9 28 L9 28 M-3 42 L3 42"
            stroke="#C9A063" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="-8" r="26" fill="#FF9BB5"/>
      <circle cx="0" cy="-40" r="21" fill="#FFF0C4"/>
      <circle cx="-20" cy="-16" r="15" fill="#8FD98F"/>
      <circle cx="20" cy="-16" r="15" fill="#8FD98F"/>
      <circle cx="0" cy="-40" r="5" fill="#E5453F"/>
    </g>`;

  const diya = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-40 0 q40 34 80 0 q-14 22 -40 22 q-26 0 -40 -22Z" fill="#D9752F"/>
      <path d="M-40 0 q6 -16 40 -16 q34 0 40 16Z" fill="#B85F22"/>
      <ellipse cx="0" cy="-2" rx="34" ry="8" fill="#FFD24A"/>
      <rect x="-4" y="-24" width="8" height="24" rx="3" fill="#F4E3C0"/>
      <path d="M0 -26 q14 -20 0 -34 q-14 14 0 34Z" fill="#FF9F1C"/>
      <path d="M0 -28 q8 -12 0 -20 q-8 8 0 20Z" fill="#FFD24A"/>
      <circle cx="0" cy="-42" r="26" fill="url(#glow)"/>
    </g>`;

  const clock = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <circle cx="0" cy="0" r="52" fill="#3EC5E0"/>
      <circle cx="0" cy="0" r="43" fill="#fff"/>
      ${[...Array(12).keys()].map(i => {
        const a = (i / 12) * Math.PI * 2;
        return `<circle cx="${(Math.cos(a) * 34).toFixed(1)}"
                       cy="${(Math.sin(a) * 34).toFixed(1)}" r="3" fill="#2B1D14"/>`;
      }).join("")}
      <path d="M0 0 L 0 -26" stroke="#E5453F" stroke-width="5" stroke-linecap="round"/>
      <path d="M0 0 L 20 12" stroke="#2B1D14" stroke-width="5" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="5" fill="#2B1D14"/>
    </g>`;

  const lamp = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-34 -30 L0 -66 L34 -30Z" fill="#FFD24A"/>
      <rect x="-6" y="-30" width="12" height="58" rx="4" fill="#8A5A33"/>
      <path d="M-34 28 h68 l-10 12 h-48Z" fill="#6B4A2A"/>
      <circle cx="0" cy="-14" r="34" fill="url(#glow)"/>
    </g>`;

  const computer = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-70" y="-58" width="140" height="88" rx="10" fill="#3EC5E0" stroke="#2B9AB4" stroke-width="4"/>
      <rect x="-58" y="-48" width="116" height="68" rx="5" fill="#EAF9FF"/>
      <rect x="-46" y="-32" width="60" height="7" rx="3.5" fill="#9B5DE5"/>
      <rect x="-46" y="-18" width="88" height="7" rx="3.5" fill="#FF5C8A"/>
      <rect x="-46" y="-4"  width="46" height="7" rx="3.5" fill="#5FBF6A"/>
      <rect x="-16" y="30" width="32" height="22" fill="#CFCFCF"/>
      <rect x="-48" y="50" width="96" height="14" rx="6" fill="#CFCFCF"/>
    </g>`;

  const rocket = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 -78 q26 34 26 74 v34 h-52 v-34 q0 -40 26 -74Z" fill="#fff" stroke="#DDD5C8" stroke-width="3"/>
      <circle cx="0" cy="-22" r="15" fill="#7FC4F0" stroke="#3EC5E0" stroke-width="4"/>
      <path d="M-26 8 L -52 44 L -26 36Z M26 8 L52 44 L26 36Z" fill="#E5453F"/>
      <path d="M-14 30 q14 40 0 54 q-14 -14 0 -54Z" fill="#FF9F1C"/>
      <path d="M0 -34 v-44" stroke="#E5453F" stroke-width="4"/>
      <path d="M0 -80 l 16 14 l -32 0Z" fill="#E5453F"/>
    </g>`;

  const robot = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-4" y="-78" width="8" height="14" fill="#8A5A33"/>
      <circle cx="0" cy="-84" r="8" fill="#E5453F"/>
      <rect x="-44" y="-64" width="88" height="62" rx="14" fill="#B9C6D6"/>
      <circle cx="-16" cy="-40" r="10" fill="#fff"/><circle cx="-16" cy="-40" r="5" fill="#2B1D14"/>
      <circle cx="16"  cy="-40" r="10" fill="#fff"/><circle cx="16"  cy="-40" r="5" fill="#2B1D14"/>
      <path d="M-14 -18 q14 12 28 0" stroke="#2B1D14" stroke-width="3.4"
            fill="none" stroke-linecap="round"/>
      <rect x="-38" y="-2" width="76" height="48" rx="12" fill="#8FA0B6"/>
      <circle cx="-24" cy="16" r="6" fill="#FFD24A"/><circle cx="0" cy="16" r="6" fill="#5FBF6A"/>
      <circle cx="24" cy="16" r="6" fill="#FF5C8A"/>
      <rect x="-62" y="0" width="16" height="34" rx="7" fill="#8FA0B6"/>
      <rect x="46"  y="0" width="16" height="34" rx="7" fill="#8FA0B6"/>
      <rect x="-24" y="46" width="18" height="18" rx="6" fill="#8FA0B6"/>
      <rect x="6"   y="46" width="18" height="18" rx="6" fill="#8FA0B6"/>
    </g>`;

  const mirror = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="-14" rx="42" ry="52" fill="#FFD24A" stroke="#F5B90A" stroke-width="4"/>
      <ellipse cx="0" cy="-14" rx="33" ry="43" fill="#BEE7F7"/>
      <path d="M-20 -40 l 30 26" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".85"/>
      <rect x="-8" y="36" width="16" height="34" rx="6" fill="#9A6B41"/>
    </g>`;

  const tooth = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-38 -34 q38 -14 76 0 q10 34 -6 66 q-10 16 -20 -6 q-6 -12 -12 0 q-6 12 -12 0
               q-16 22 -26 -6 q-16 -32 0 -54Z" fill="#fff" stroke="#DDD5C8" stroke-width="3.5"/>
      <path d="M-26 -14 q26 -8 52 0" stroke="#EAF6FB" stroke-width="5" fill="none" stroke-linecap="round"/>
      <circle cx="0" cy="2" r="7" fill="#7FC4F0"/>
      <path d="M-10 26 l-10 22 M10 26 l10 22" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/>
    </g>`;

  const snowman = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <circle cx="0" cy="26" r="40" fill="#fff" stroke="#DCE7EE" stroke-width="3"/>
      <circle cx="0" cy="-24" r="29" fill="#fff" stroke="#DCE7EE" stroke-width="3"/>
      <circle cx="-9" cy="-30" r="4" fill="#2B1D14"/><circle cx="9" cy="-30" r="4" fill="#2B1D14"/>
      <path d="M0 -20 l 24 6 l -24 6Z" fill="#FF9F1C"/>
      <circle cx="0" cy="-4" r="4" fill="#2B1D14"/>
      <circle cx="0" cy="12" r="4" fill="#2B1D14"/>
      <rect x="-30" y="-52" width="60" height="7" rx="3.5" fill="#2B1D14"/>
      <rect x="-17" y="-66" width="34" height="16" rx="5" fill="#E5453F"/>
      <path d="M-36 30 q-24 10 -22 -16 M36 30 q24 10 22 -16" stroke="#8A5A33"
            stroke-width="6" fill="none" stroke-linecap="round"/>
    </g>`;

  const carrot = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-12 -34 L 12 -34 L 2 44Z" fill="#FF9F1C"/>
      <path d="M-8 -12 h16 M-6 4 h12 M-4 20 h8" stroke="#F28036" stroke-width="3.4" stroke-linecap="round"/>
      <path d="M0 -34 q-18 -20 -30 -14 M0 -34 q18 -20 30 -14 M0 -34 v-26"
            stroke="#5FBF6A" stroke-width="7" fill="none" stroke-linecap="round"/>
    </g>`;

  /* ---------- scene builder ---------- */
  function build(sceneKeys) {
    const S = new Set(sceneKeys || []);
    const night = S.has("night");
    const ground = S.has("day") || night;

    let defs = `
      <defs>
        <linearGradient id="skyD" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#7FD4F5"/>
          <stop offset="100%" stop-color="#D9F4FF"/>
        </linearGradient>
        <linearGradient id="skyN" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#1E2A5A"/>
          <stop offset="100%" stop-color="#4A4E8C"/>
        </linearGradient>
        <radialGradient id="glow"><stop offset="0%" stop-color="#FFE066" stop-opacity=".75"/>
          <stop offset="100%" stop-color="#FFE066" stop-opacity="0"/></radialGradient>
        <radialGradient id="glowB"><stop offset="0%" stop-color="#FFF3C4" stop-opacity=".6"/>
          <stop offset="100%" stop-color="#FFF3C4" stop-opacity="0"/></radialGradient>
        <linearGradient id="grn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#8FD98F"/><stop offset="100%" stop-color="#63BE6E"/>
        </linearGradient>
      </defs>`;

    let g = defs;
    g += `<rect width="640" height="380" fill="url(#${night ? "skyN" : "skyD"})"/>`;

    /* --- aasman ke cheezein --- */
    if (S.has("stars")) {
      const op = night ? 1 : 0.5;
      [[70,60],[150,110],[250,48],[330,95],[430,40],[520,80],[600,130],
       [110,180],[210,150],[470,150],[560,45],[380,140]]
        .forEach(([x, y]) => { g += star(x, y, 7 + (x % 5)).replace('fill="#FFF6C8"', `fill="#FFF6C8" opacity="${op}"`); });
    }
    if (S.has("sun") && !night)   g += sun(544, 74);
    if (S.has("moon"))            g += moon(536, 80);
    if (S.has("cloud")) {
      g += cloud(150, 78, 1.05) + cloud(400, 54, 0.8, .9);
      if (S.has("rain")) g += cloud(300, 66, 1.25, .95);
    }

    /* --- zameen --- */
    if (ground || S.has("snow")) {
      if (S.has("snow")) {
        g += `<rect x="0" y="286" width="640" height="94" fill="#F2F8FC"/>
              <path d="M0 286 q 80 -22 160 0 q 80 22 160 0 q 80 -22 160 0
                             q 80 22 160 0 L 640 306 L 0 306Z" fill="#fff"/>`;
      } else {
        g += `<rect x="0" y="286" width="640" height="94" fill="url(#grn)"/>`;
        g += `<path d="M0 286 q 80 -22 160 0 q 80 22 160 0 q 80 -22 160 0
                       q 80 22 160 0 L 640 306 L 0 306Z" fill="#7FD08A"/>`;
      }
    }
    if (S.has("river")) g += river(0, 296, 640);
    if (S.has("mountain")) g += mountain(160, 292, .95) + mountain(480, 296, .72);

    /* --- barish --- */
    if (S.has("rain")) g += rain(0, 96, 620, 12);

    /* --- talaab --- */
    if (S.has("pond")) g += pond(140, 322, 330, 74);

    /* --- ped, ghar, school --- */
    if (S.has("tree")) {
      g += tree(96, 300, .85);
      if (S.has("apple")) {
        g += apple(70, 238, .55) + apple(120, 252, .5) + apple(96, 224, .48);
      }
      if (S.has("kite")) g += tree(560, 300, .7);
    }
    if (S.has("home"))   g += home(520, 300, .8);
    if (S.has("school")) g += school(520, 300, .78);

    /* --- jaanwar --- */
    if (S.has("bird")) {
      g += bird(250, 120, .8, "#4A6FA5") + bird(330, 92, .62, "#7A5FA5");
    }
    if (S.has("duck")) {
      g += duck(150, 318, .95) + duck(250, 336, .62);
    }
    if (S.has("frog")) g += frog(430, 300, .9);

    /* --- colours / kite / umbrella --- */
    if (S.has("colours")) g += colours(300, 120, 1);
    if (S.has("kite"))    g += kite(300, 118, .9);
    if (S.has("umbrella")) g += umbrella(150, 150, .85);

    /* --- naye jaanwar aur cheezein --- */
    if (S.has("balloon"))   g += balloon(430, 210, .95);
    if (S.has("drum"))      g += drum(190, 250, .9);
    if (S.has("ball"))      g += ball(200, 300, .95) + ball(258, 322, .6);
    if (S.has("bus"))       g += bus(300, 268, 1);
    if (S.has("bicycle"))   g += bicycle(300, 300, 1);
    if (S.has("train"))     g += train(320, 262, .95);
    if (S.has("book"))      g += book(160, 240, .95);
    if (S.has("pen"))       g += pen(250, 210, .85);
    if (S.has("gift"))      g += gift(460, 262, .9);
    if (S.has("cake"))      g += cake(430, 250, .9);
    if (S.has("elephant"))  g += elephant(300, 268, 1);
    if (S.has("lion"))      g += lion(200, 264, 1);
    if (S.has("rabbit"))    g += rabbit(440, 292, .9);
    if (S.has("monkey"))    g += monkey(320, 258, 1);
    if (S.has("cow"))       g += cow(320, 268, 1);
    if (S.has("hen"))       g += hen(200, 306, .85);
    if (S.has("carrot"))    g += carrot(500, 262, .95);
    if (S.has("fish"))      g += fish(150, 316, .95) + fish(250, 332, .62);
    if (S.has("boat"))      g += boat(430, 250, 1);
    if (S.has("icecream"))  g += icecream(430, 236, 1);
    if (S.has("spider"))    g += spider(160, 120, 1);
    if (S.has("clock"))     g += clock(430, 214, 1);
    if (S.has("lamp"))      g += lamp(540, 300, .8);
    if (S.has("computer"))  g += computer(300, 220, .95);
    if (S.has("rocket"))    g += rocket(330, 170, .95);
    if (S.has("robot"))     g += robot(330, 246, 1);
    if (S.has("mirror"))    g += mirror(430, 226, 1);
    if (S.has("tooth"))     g += tooth(430, 232, 1);
    if (S.has("snowman"))   g += snowman(430, 250, 1);
    if (S.has("diya"))      g += diya(300, 292, 1.1);
    if (S.has("flower"))    g += flower(120, 300, 1, "#FF5C8A") + flower(560, 306, .85, "#9B5DE5");
    if (S.has("butterfly")) g += butterfly(250, 150, 1) + butterfly(380, 108, .7, "#FF9F1C");
    if (S.has("bee"))       g += bee(170, 122, .95) + bee(500, 104, .7);

    /* --- bacche --- */
    if (S.has("child")) {
      g += child(S.has("school") || S.has("book") || S.has("computer") ? 300 : 320, 300, 1);
      if (S.has("colours")) {
        g += `<circle cx="288" cy="286" r="7" fill="#FFD24A"/>
              <circle cx="322" cy="284" r="7" fill="#9B5DE5"/>
              <circle cx="304" cy="278" r="6" fill="#5FBF6A"/>`;
      }
    }
    if (S.has("hands")) {
      g += hands(320, 176, 1) + child(320, 302, .95);
    }
    if (S.has("kite") && !S.has("child")) g += child(140, 300, .8);

    /* --- chhoti dahiyaan (ground ke upar) --- */
    if (ground && !S.has("snow")) {
      [[40,318],[210,338],[350,320],[480,342],[600,320]].forEach(([x, y], i) => {
        const c = ["#FF9F1C", "#9B5DE5", "#E5453F", "#3EC5E0", "#FF9F1C"][i];
        g += `<path d="M${x} ${y} q 6 -14 12 0" stroke="#4FA85B" stroke-width="3" fill="none"/>
              <circle cx="${x + 6}" cy="${y - 16}" r="6" fill="${c}"/>`;
      });
    }

    return `<svg class="art" viewBox="0 0 640 380" xmlns="http://www.w3.org/2000/svg"
                 preserveAspectRatio="xMidYMid slice" role="img"
                 aria-label="Poem ki tasveer">${g}</svg>`;
  }

  /* Standalone picture download (original art -> no copyright) */
  function download(sceneKeys, name) {
    const svg = build(sceneKeys);
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (name || "poem") + ".svg";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  }

  return { build, download };
})();