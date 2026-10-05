/* ============================================================
   कविता का घर — ORIGINAL 3D-STYLE ANIMATION ENGINE
   ------------------------------------------------------------
   Ye poori code se bani 3D-ish animated scene hai:
     • asli 3D depth (translateZ + parallax)
     • moving clouds, rising sun, twinkle stars, falling rain
     • bouncing bacche, swaying trees, flying butterflies
   Poori tarah ORIGINAL — kisi ka content copy nahi.
   Size: ~8 KB code (koi 50 MB video nahi!)
   ============================================================ */

window.KG = window.KG || {};

KG.ART3D = (() => {

  const el = (cls, style, inner) =>
    `<i class="s3 ${cls}"${style ? ` style="${style}"` : ""}>${inner || ""}</i>`;

  /* ---------------- aasman ke cheezein ---------------- */
  const sky = (night) => `<b class="s3-sky${night ? " n" : ""}"></b>`;

  const sun = (x, y, z) => el("s3-sun", `--x:${x}%;--y:${y}%;--z:${z || -30}px`);

  const moon = (x, y, z) => el("s3-moon", `--x:${x}%;--y:${y}%;--z:${z || -20}px`);

  const cloud = (x, y, z, dur, size) =>
    el("s3-cloud",
       `--x:${x}%;--y:${y}%;--z:${z || 10}px;--dur:${dur || 26}s;--sz:${size || 1}`,
       "<b></b><b></b><b></b><b></b>");

  const star = (x, y, z) =>
    el("s3-star", `--x:${x}%;--y:${y}%;--z:${z || 0}px;--d:${(x % 5) / 2}s`);

  /* ---------------- zameen ---------------- */
  const ground = (snow) => `<b class="s3-ground${snow ? " snow" : ""}"></b>`;
  const hill = (x, y, z, w, h, col) =>
    el("s3-hill", `--x:${x}%;--y:${y}%;--z:${z || 0}px;--w:${w || 60}%;--h:${h || 40}px;--c:${col || "#7FCB8E"}`);
  const river = () => `<b class="s3-river"></b>`;

  /* ---------------- ped / phool ---------------- */
  const tree = (x, y, z, s) =>
    el("s3-tree", `--x:${x}%;--y:${y}%;--z:${z || 0}px;--s:${s || 1}`);

  const flower = (x, y, z, c) =>
    el("s3-flower", `--x:${x}%;--y:${y}%;--z:${z || 20}px;--c:${c || "#FF5C8A"}`);

  const butterfly = (x, y, z, c) =>
    el("s3-bfly", `--x:${x}%;--y:${y}%;--z:${z || 60}px;--c:${c || "#9B5DE5"}`);

  const bee = (x, y, z) => el("s3-bee", `--x:${x}%;--y:${y}%;--z:${z || 70}px`);

  const bird = (x, y, z) => el("s3-bird", `--x:${x}%;--y:${y}%;--z:${z || 40}px`, "<b></b>");

  /* ---------------- bacche / cheezein ---------------- */
  const kid = (x, y, z, shirt) =>
    el("s3-kid", `--x:${x}%;--y:${y}%;--z:${z || 30}px;--sh:${shirt || "#FF7A8A"}`,
       `<b class="k-hair"></b><b class="k-eye l"></b><b class="k-eye r"></b>` +
       `<b class="k-cheek l"></b><b class="k-cheek r"></b><b class="k-smile"></b>` +
       `<b class="k-arm l"></b><b class="k-arm r"></b>`);

  const ball = (x, y, z) => el("s3-ball", `--x:${x}%;--y:${y}%;--z:${z || 30}px`);
  const balloon = (x, y, z) => el("s3-balloon", `--x:${x}%;--y:${y}%;--z:${z || 50}px`);
  const rocket = (x, y, z) => el("s3-rocket", `--x:${x}%;--y:${y}%;--z:${z || 50}px`);
  const book = (x, y, z) => el("s3-book", `--x:${x}%;--y:${y}%;--z:${z || 30}px`);
  const drum = (x, y, z) => el("s3-drum", `--x:${x}%;--y:${y}%;--z:${z || 30}px`);
  const diya = (x, y, z) => el("s3-diya", `--x:${x}%;--y:${y}%;--z:${z || 30}px`);
  const cake = (x, y, z) => el("s3-cake", `--x:${x}%;--y:${y}%;--z:${z || 30}px`);
  const gift = (x, y, z) => el("s3-gift", `--x:${x}%;--y:${y}%;--z:${z || 30}px`);
  const note = (x, y, z, c) =>
    el("s3-note", `--x:${x}%;--y:${y}%;--z:${z || 80}px;--c:${c || "#FFD24A"}`);
  const drop = () => `<b class="s3-rain"></b>`;
  const sparkle = () => `<b class="s3-sparkle"></b>`;

  /* ---------------- naye jaanwar (3D) ---------------- */
  const cat = (x, y, z) => el("s3-cat", `--x:${x}%;--y:${y}%;--z:${z || 25}px`);
  const dog = (x, y, z) => el("s3-dog", `--x:${x}%;--y:${y}%;--z:${z || 25}px`);
  const rabbit = (x, y, z) => el("s3-rabbit", `--x:${x}%;--y:${y}%;--z:${z || 25}px`);
  const lion = (x, y, z) => el("s3-lion", `--x:${x}%;--y:${y}%;--z:${z || 25}px`);
  const elephant = (x, y, z) => el("s3-eleph", `--x:${x}%;--y:${y}%;--z:${z || 25}px`);
  const monkey = (x, y, z) => el("s3-monkey", `--x:${x}%;--y:${y}%;--z:${z || 25}px`);
  const cow = (x, y, z) => el("s3-cow", `--x:${x}%;--y:${y}%;--z:${z || 20}px`);
  const hen = (x, y, z) => el("s3-hen", `--x:${x}%;--y:${y}%;--z:${z || 25}px`);
  const duck = (x, y, z) => el("s3-duck", `--x:${x}%;--y:${y}%;--z:${z || 25}px`);
  const fish = (x, y, z) => el("s3-fish", `--x:${x}%;--y:${y}%;--z:${z || 25}px`);
  const frog = (x, y, z) => el("s3-frog", `--x:${x}%;--y:${y}%;--z:${z || 25}px`);
  const car = (x, y, z) => el("s3-car", `--x:${x}%;--y:${y}%;--z:${z || 20}px`);
  const bus = (x, y, z) => el("s3-bus", `--x:${x}%;--y:${y}%;--z:${z || 15}px`);
  const kite = (x, y, z) => el("s3-kite", `--x:${x}%;--y:${y}%;--z:${z || 60}px`);
  const diya2 = (x, y, z) => el("s3-diya", `--x:${x}%;--y:${y}%;--z:${z || 25}px`);

  /* ---------------- scene ---------------- */
  function build(sceneKeys) {
    const S = new Set(sceneKeys || []);
    const night = S.has("night");
    const snow = S.has("snow");

    let h = `<div class="s3-stage${night ? " night" : ""}${snow ? " snowy" : ""}">`;
    h += sky(night);

    /* --- aasman --- */
    if (S.has("stars")) {
      [[9,14],[19,26],[31,10],[43,22],[55,8],[66,20],[78,13],[88,26],
       [14,38],[26,32],[38,40],[52,34],[72,38],[84,34],[60,12],[34,30]]
        .forEach(([x, y]) => { h += star(x, y, 0); });
    }
    if (S.has("sun"))    h += sun(78, 16, -40);
    if (S.has("moon"))   h += moon(80, 17, -30);
    if (S.has("cloud"))  h += cloud(20, 16, 5, 30, 1) + cloud(56, 10, 15, 38, .8);
    if (S.has("rain")) {
      h += cloud(38, 13, 20, 22, 1.25);
      h += drop();
    }
    if (S.has("snowman")) { h += ground(true); h += el("s3-snowman", "--x:74%;--y:62%;--z:25px"); }
    if (!snow && !S.has("snowman")) h += ground(false);

    if (S.has("mountain")) h += hill(24, 72, -10, 70, 150, "#9FB3CC") + hill(66, 76, -20, 56, 110, "#B4C4D8");
    if (S.has("river"))    h += river();
    if (!snow) {
      h += hill(6, 84, 0, 34, 46, "#8FD98F") + hill(92, 86, 0, 38, 42, "#84D287");
    }

    /* --- ped, phool, udne wale --- */
    if (S.has("tree")) h += tree(14, 66, 0, 1) + tree(88, 70, -20, .72);
    if (S.has("apple")) h += el("s3-apples");
    if (S.has("flower"))  h += flower(30, 82, 20, "#FF5C8A") + flower(70, 86, 10, "#9B5DE5");
    if (S.has("butterfly")) h += butterfly(36, 32, 60, "#9B5DE5") + butterfly(58, 22, 80, "#FF9F1C");
    if (S.has("bee"))    h += bee(24, 26, 70) + bee(70, 20, 60);
    if (S.has("bird"))   h += bird(46, 22, 40) + bird(64, 14, 30);
    if (S.has("spider")) h += el("s3-web", "--x:20%;--y:14%");

    /* --- khel ke samane --- */
    if (S.has("balloon")) h += balloon(30, 22, 50);
    if (S.has("rocket"))  h += rocket(66, 26, 50);
    if (S.has("book"))    h += book(28, 60, 25);
    if (S.has("ball"))    h += ball(32, 74, 30);
    if (S.has("drum"))    h += drum(24, 70, 25);
    if (S.has("cake"))    h += cake(72, 66, 25);
    if (S.has("gift"))    h += gift(74, 66, 25);
    if (S.has("diya"))    h += diya(50, 74, 30);
    if (S.has("kite"))    h += el("s3-kite", "--x:70%;--y:24%;--z:60px");

    if (S.has("school") || S.has("home"))
      h += el(S.has("school") ? "s3-school" : "s3-home", "--x:78%;--y:66%;--z:-10px");

    /* --- bacche --- */
    if (S.has("child")) h += kid(52, 68, 30, "#FF7A8A");
    if (S.has("hands")) { h += el("s3-hands", "--x:52%;--y:44%;--z:70px"); h += kid(52, 70, 20); }

    /* --- jaanwar (scene ke hisaab se) --- */
    if (S.has("cat"))      h += cat(30, 74, 25);
    if (S.has("dog"))      h += dog(34, 76, 25);
    if (S.has("rabbit"))   h += rabbit(26, 78, 25);
    if (S.has("lion"))     h += lion(30, 72, 25);
    if (S.has("elephant")) h += elephant(28, 68, 25);
    if (S.has("monkey"))   h += monkey(34, 40, 30);
    if (S.has("cow"))      h += cow(24, 72, 20);
    if (S.has("hen"))      h += hen(38, 80, 25) + hen(44, 82, 20);
    if (S.has("duck"))     h += duck(30, 80, 25) + duck(40, 83, 20);
    if (S.has("fish"))     h += fish(26, 82, 25) + fish(36, 84, 20);
    if (S.has("frog"))     h += frog(36, 80, 25);
    if (S.has("bus"))      h += bus(60, 68, 15);
    if (S.has("car"))      h += car(38, 76, 20);
    if (S.has("teeth"))    h += el("s3-tooth", "--x:34%;--y:70%;--z:25px");
    if (S.has("mirror"))   h += el("s3-mirror", "--x:66%;--y:66%;--z:20px");
    if (S.has("clock"))    h += el("s3-clock", "--x:68%;--y:34%;--z:20px");
    if (S.has("pen"))      h += el("s3-pen", "--x:32%;--y:64%;--z:30px");
    if (S.has("computer")) h += el("s3-computer", "--x:66%;--y:62%;--z:20px");
    if (S.has("gift"))     h += gift(72, 72, 25);
    if (S.has("robot"))    h += el("s3-robot", "--x:70%;--y:66%;--z:25px");
    if (S.has("cake"))     h += cake(72, 72, 25);
    if (S.has("icecream")) h += el("s3-ice", "--x:72%;--y:66%;--z:25px");

    /* --- muskurata hua rang --- */
    if (S.has("colours")) h += sparkle();

    /* --- hamesha 2 taare (chamak) --- */
    h += `</div>`;

    return h;
  }

  return { build };
})();