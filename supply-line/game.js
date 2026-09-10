function Ie(t, e = {}) {
  let r = e.width ?? 256,
  o = e.height ?? 224,
  i = e.background ?? '#000',
  l = e.backdropTile ?? null,
  n = document.createElement('canvas');
  n.width = r,
  n.height = o;
  let c = n.getContext('2d');
  c.imageSmoothingEnabled = !1;
  let k = document.createElement('canvas');
  k.className = 'pixel-screen';
  let s = k.getContext('2d');
  s.imageSmoothingEnabled = !1,
  t.appendChild(k);
  let d = 1,
  h = 0,
  u = 0,
  m = null,
  R = 0.15;
  function Y(G) {
    if (G < 1) return G;
    let A = Math.floor(G);
    return G - A < R ? A : G
  }
  function v() {
    let G = t.getBoundingClientRect(),
    A = window.devicePixelRatio ||
    1,
    F = Math.max(1, Math.floor(G.width * A)),
    D = Math.max(1, Math.floor(G.height * A));
    d = Y(Math.min(F / r, D / o)),
    k.width = F,
    k.height = D,
    k.style.width = `${ G.width }px`,
    k.style.height = `${ G.height }px`,
    s.imageSmoothingEnabled = !1,
    h = Math.floor((F - r * d) / 2),
    u = Math.floor((D - o * d) / 2)
  }
  function _(G = 0, A = 0) {
    s.fillStyle = i,
    s.fillRect(0, 0, k.width, k.height),
    l &&
    (
      m ||
      (m = s.createPattern(l, 'repeat')),
      m &&
      (s.fillStyle = m, s.fillRect(0, 0, k.width, k.height))
    ),
    s.drawImage(n, h + Math.round(G) * d, u + Math.round(A) * d, r * d, o * d)
  }
  function I(G, A) {
    let F = k.getBoundingClientRect(),
    D = window.devicePixelRatio ||
    1,
    at = (G - F.left) * D,
    ct = (A - F.top) * D;
    return {
      x: (at - h) / d,
      y: (ct - u) / d
    }
  }
  return v(),
  typeof ResizeObserver == 'function' ? new ResizeObserver(v).observe(t) : window.addEventListener('resize', v),
  {
    canvas: n,
    ctx: c,
    width: r,
    height: o,
    present: _,
    toGame: I
  }
}
var kt = {
  A: [
    '.###.',
    '#...#',
    '#...#',
    '#####',
    '#...#',
    '#...#',
    '#...#'
  ],
  B: [
    '####.',
    '#...#',
    '#...#',
    '####.',
    '#...#',
    '#...#',
    '####.'
  ],
  C: [
    '.###.',
    '#...#',
    '#....',
    '#....',
    '#....',
    '#...#',
    '.###.'
  ],
  D: [
    '####.',
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '####.'
  ],
  E: [
    '#####',
    '#....',
    '#....',
    '####.',
    '#....',
    '#....',
    '#####'
  ],
  F: [
    '#####',
    '#....',
    '#....',
    '####.',
    '#....',
    '#....',
    '#....'
  ],
  G: [
    '.###.',
    '#...#',
    '#....',
    '#.###',
    '#...#',
    '#...#',
    '.####'
  ],
  H: [
    '#...#',
    '#...#',
    '#...#',
    '#####',
    '#...#',
    '#...#',
    '#...#'
  ],
  I: [
    '#####',
    '..#..',
    '..#..',
    '..#..',
    '..#..',
    '..#..',
    '#####'
  ],
  J: [
    '..###',
    '...#.',
    '...#.',
    '...#.',
    '...#.',
    '#..#.',
    '.##..'
  ],
  K: [
    '#...#',
    '#..#.',
    '#.#..',
    '##...',
    '#.#..',
    '#..#.',
    '#...#'
  ],
  L: [
    '#....',
    '#....',
    '#....',
    '#....',
    '#....',
    '#....',
    '#####'
  ],
  M: [
    '#...#',
    '##.##',
    '#.#.#',
    '#.#.#',
    '#...#',
    '#...#',
    '#...#'
  ],
  N: [
    '#...#',
    '##..#',
    '#.#.#',
    '#..##',
    '#...#',
    '#...#',
    '#...#'
  ],
  O: [
    '.###.',
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '.###.'
  ],
  P: [
    '####.',
    '#...#',
    '#...#',
    '####.',
    '#....',
    '#....',
    '#....'
  ],
  Q: [
    '.###.',
    '#...#',
    '#...#',
    '#...#',
    '#.#.#',
    '#..#.',
    '.##.#'
  ],
  R: [
    '####.',
    '#...#',
    '#...#',
    '####.',
    '#.#..',
    '#..#.',
    '#...#'
  ],
  S: [
    '.####',
    '#....',
    '#....',
    '.###.',
    '....#',
    '....#',
    '####.'
  ],
  T: [
    '#####',
    '..#..',
    '..#..',
    '..#..',
    '..#..',
    '..#..',
    '..#..'
  ],
  U: [
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '.###.'
  ],
  V: [
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '.#.#.',
    '..#..'
  ],
  W: [
    '#...#',
    '#...#',
    '#...#',
    '#.#.#',
    '#.#.#',
    '##.##',
    '#...#'
  ],
  X: [
    '#...#',
    '#...#',
    '.#.#.',
    '..#..',
    '.#.#.',
    '#...#',
    '#...#'
  ],
  Y: [
    '#...#',
    '#...#',
    '.#.#.',
    '..#..',
    '..#..',
    '..#..',
    '..#..'
  ],
  Z: [
    '#####',
    '....#',
    '...#.',
    '..#..',
    '.#...',
    '#....',
    '#####'
  ],
  0: [
    '.###.',
    '#...#',
    '#..##',
    '#.#.#',
    '##..#',
    '#...#',
    '.###.'
  ],
  1: [
    '..#..',
    '.##..',
    '..#..',
    '..#..',
    '..#..',
    '..#..',
    '.###.'
  ],
  2: [
    '.###.',
    '#...#',
    '....#',
    '..##.',
    '.#...',
    '#....',
    '#####'
  ],
  3: [
    '####.',
    '....#',
    '....#',
    '.###.',
    '....#',
    '....#',
    '####.'
  ],
  4: [
    '...#.',
    '..##.',
    '.#.#.',
    '#..#.',
    '#####',
    '...#.',
    '...#.'
  ],
  5: [
    '#####',
    '#....',
    '####.',
    '....#',
    '....#',
    '#...#',
    '.###.'
  ],
  6: [
    '..##.',
    '.#...',
    '#....',
    '####.',
    '#...#',
    '#...#',
    '.###.'
  ],
  7: [
    '#####',
    '....#',
    '...#.',
    '..#..',
    '.#...',
    '.#...',
    '.#...'
  ],
  8: [
    '.###.',
    '#...#',
    '#...#',
    '.###.',
    '#...#',
    '#...#',
    '.###.'
  ],
  9: [
    '.###.',
    '#...#',
    '#...#',
    '.####',
    '....#',
    '...#.',
    '.##..'
  ],
  $: [
    '..#..',
    '.####',
    '#.#..',
    '.###.',
    '..#.#',
    '####.',
    '..#..'
  ],
  '.': [
    '.....',
    '.....',
    '.....',
    '.....',
    '.....',
    '.##..',
    '.##..'
  ],
  ',': [
    '.....',
    '.....',
    '.....',
    '.....',
    '.##..',
    '..#..',
    '.#...'
  ],
  ':': [
    '.....',
    '.##..',
    '.##..',
    '.....',
    '.##..',
    '.##..',
    '.....'
  ],
  '·': [
    '.....',
    '.....',
    '.....',
    '..#..',
    '.....',
    '.....',
    '.....'
  ],
  '-': [
    '.....',
    '.....',
    '.....',
    '#####',
    '.....',
    '.....',
    '.....'
  ],
  '+': [
    '.....',
    '..#..',
    '..#..',
    '#####',
    '..#..',
    '..#..',
    '.....'
  ],
  '!': [
    '..#..',
    '..#..',
    '..#..',
    '..#..',
    '..#..',
    '.....',
    '..#..'
  ],
  '\'': [
    '..#..',
    '..#..',
    '.....',
    '.....',
    '.....',
    '.....',
    '.....'
  ],
  '/': [
    '....#',
    '...#.',
    '...#.',
    '..#..',
    '.#...',
    '.#...',
    '#....'
  ],
  '?': [
    '.###.',
    '#...#',
    '....#',
    '..##.',
    '..#..',
    '.....',
    '..#..'
  ],
  '%': [
    '##..#',
    '##.#.',
    '...#.',
    '..#..',
    '.#...',
    '.#.##',
    '#..##'
  ]
},
ye = new Map(Object.entries(kt));
var st = 32,
he = new Map,
Ae = null;
function ft() {
  return Ae ||
  (
    typeof document < 'u' &&
    typeof document.createElement == 'function' ? () => document.createElement('canvas') : null
  )
}
function dt(t, e) {
  let r = ft();
  if (!r) return null;
  let o = r();
  if (!o || typeof o.getContext != 'function') return null;
  let i = [
    ...ye.keys()
  ],
  l = 5 * e,
  n = 7 * e;
  o.width = l * i.length,
  o.height = n;
  let c = o.getContext('2d');
  if (!c || typeof c.fillRect != 'function') return null;
  c.fillStyle = t;
  let k = new Map;
  for (let s = 0; s < i.length; s += 1) {
    let d = i[s],
    h = s * l;
    k.set(d, h);
    let u = ye.get(d);
    for (let m = 0; m < 7; m += 1) {
      let R = u[m];
      for (let Y = 0; Y < 5; Y += 1) R[Y] === '#' &&
      c.fillRect(h + Y * e, m * e, e, e)
    }
  }
  return {
    canvas: o,
    offsets: k,
    gw: l,
    gh: n
  }
}
function ut(t, e, r) {
  if (!Number.isInteger(r) || r < 1 || typeof t.drawImage != 'function') return null;
  let o = `${ r }|${ e }`,
  i = he.get(o);
  if (i) return i;
  if (he.size >= st) return null;
  let l = dt(e, r);
  return l &&
  he.set(o, l),
  l
}
function be(t, e, r, o, i, l = 1) {
  t.fillStyle = i;
  let n = Math.round(r),
  c = Math.round(o),
  k = ut(t, i, l);
  for (let s of String(e).toUpperCase()) {
    if (s === ' ') {
      n += 6 * l;
      continue
    }
    if (k) {
      let d = k.offsets.get(s);
      d !== void 0 &&
      t.drawImage(k.canvas, d, 0, k.gw, k.gh, n, c, k.gw, k.gh)
    } else {
      let d = ye.get(s);
      if (d) for (let h = 0; h < 7; h += 1) {
        let u = d[h];
        for (let m = 0; m < 5; m += 1) u[m] === '#' &&
        t.fillRect(n + m * l, c + h * l, l, l)
      }
    }
    n += 6 * l
  }
  return n
}
function Ne(t = {}) {
  let e = t.size ?? 96,
  r = t.colour ?? 'rgba(120, 150, 210, 0.085)',
  o = t.scale ?? 3,
  i = document.createElement('canvas');
  i.width = e,
  i.height = e;
  let l = i.getContext('2d');
  return l.imageSmoothingEnabled = !1,
  be(l, '45', 8, 10, r, o),
  be(l, '47', e - 40, e - 38, r, o),
  i
}
var z = null,
j = !1;
function We() {
  if (!z) {
    let t = window.AudioContext ||
    window.webkitAudioContext;
    if (!t) return null;
    z = new t
  }
  return z.state === 'suspended' &&
  z.resume(),
  z
}
function L({
  freq: t,
  endFreq: e,
  duration: r = 0.1,
  type: o = 'square',
  gain: i = 0.05
}) {
  if (j) return;
  let l = We();
  if (!l) return;
  let n = l.createOscillator(),
  c = l.createGain(),
  k = l.currentTime;
  n.type = o,
  n.frequency.setValueAtTime(t, k),
  e &&
  n.frequency.exponentialRampToValueAtTime(Math.max(1, e), k + r),
  c.gain.setValueAtTime(i, k),
  c.gain.exponentialRampToValueAtTime(0.0001, k + r),
  n.connect(c).connect(l.destination),
  n.start(k),
  n.stop(k + r + 0.02)
}
function oe(t = 0.08, e = 0.08) {
  if (j) return;
  let r = We();
  if (!r) return;
  let o = Math.floor(r.sampleRate * t);
  if (!Number.isFinite(o) || o < 1) return;
  let i = r.createBuffer(1, o, r.sampleRate),
  l = i.getChannelData(0);
  for (let k = 0; k < o; k += 1) l[k] = (Math.random() * 2 - 1) * (1 - k / o);
  let n = r.createBufferSource(),
  c = r.createGain();
  c.gain.setValueAtTime(e, r.currentTime),
  n.buffer = i,
  n.connect(c).connect(r.destination),
  n.start()
}
function V() {
  return j
}
function Re() {
  return We()
}
function Be(t) {
  return j = t === void 0 ? !j : !!t,
  j
}
function qe(t = {}) {
  let e = t.music ?? null,
  r = document.getElementById(t.buttonId ?? 'sound');
  new URLSearchParams(window.location.search).get('embed') === '1' &&
  document.body.classList.add('embed');
  let o = !1;
  function i() {
    o ||
    !e ||
    (o = !0, e.start())
  }
  function l() {
    if (!r) return;
    let c = V();
    r.setAttribute('aria-pressed', String(!c));
    let k = r.querySelector('.toggle-text');
    k &&
    (k.textContent = c ? 'Sound off' : 'Sound on')
  }
  function n() {
    let c = Be();
    return l(),
    c ||
    i(),
    c
  }
  return r &&
  r.addEventListener('click', () => {
    i(),
    n()
  }),
  l(),
  {
    startMusicOnce: i,
    toggle: n,
    isMuted: V
  }
}
function _e(t, e = 0) {
  try {
    let r = window.localStorage.getItem(t);
    if (r === null) return e;
    let o = Number(r);
    return Number.isFinite(o) ? o : e
  } catch {
    return e
  }
}
function He(t, e) {
  try {
    return window.localStorage.setItem(t, String(e)),
    !0
  } catch {
    return !1
  }
}
function Je(t) {
  let e = `wh-games.${ t }.best`,
  r = _e(e, 0);
  return {
    key: e,
    value() {
      return r
    },
    submit(o) {
      return !Number.isFinite(o) ||
      o <= r ? !1 : (r = o, He(e, r), !0)
    }
  }
}
var ie = window.matchMedia?.('(prefers-reduced-motion: reduce)') ?.matches ?? !1,
y = 320,
S = 180,
K = 12,
W = 84,
w = 140,
ae = 86,
Le = 122,
ce = (ae + Le) / 2,
J = 26,
p = 278,
ke = {
  x: 44,
  y: 150
},
mt = [
  [0,
  8,
  2,
  10],
  [
    12,
    4,
    14,
    6
  ],
  [
    3,
    11,
    1,
    9
  ],
  [
    15,
    7,
    13,
    5
  ]
],
x = '#12151a';
function se(t) {
  return [parseInt(t.slice(1, 3), 16),
  parseInt(t.slice(3, 5), 16),
  parseInt(t.slice(5, 7), 16)]
}
var Se = t => `rgb(${ t[0] | 0 },${ t[1] | 0 },${ t[2] | 0 })`,
Ye = (t, e, r) => [t[0] + (e[0] - t[0]) * r,
t[1] + (e[1] - t[1]) * r,
t[2] + (e[2] - t[2]) * r];
function g(t, e, r, o, i, l, n) {
  let c = se(l),
  k = se(n);
  for (let s = 0; s < i; s += 1) {
    let d = i < 2 ? 0 : s / (i - 1),
    h = Se(Ye(c, k, Math.max(0, d - 0.06))),
    u = Se(Ye(c, k, Math.min(1, d + 0.06))),
    m = d * (i - 1) % 1;
    for (let R = 0; R < o; R += 1) t.fillStyle = m > mt[r + s & 3][e + R & 3] / 16 ? u : h,
    t.fillRect(e + R, r + s, 1, 1)
  }
}
var P = (t, e, r = 5) => {
  let o = se(t),
  i = se(e);
  return Array.from({
    length: r
  }, (l, n) => Se(Ye(o, i, n / (r - 1))))
},
B = {
  skin: P('#2b160c', '#a56b41'),
  glove: P('#7d1418', '#ff7a5e'),
  leaf: P('#1b4420', '#8ed05c'),
  stem: P('#2e1c10', '#93683a'),
  suit: P('#232a33', '#8496a6'),
  shirt: P('#7c8088', '#f6f8fb'),
  tie: P('#4a1219', '#e0616e'),
  lace: P('#7b8087', '#f6f8fb'),
  short: P('#0b0d11', '#39404a'),
  gold: P('#6b4c12', '#ffd875'),
  shoe: P('#0c0f12', '#414952')
},
ht = {
  r: [
    'skin',
    2
  ],
  R: [
    'skin',
    3
  ],
  q: [
    'skin',
    1
  ],
  g: [
    'leaf',
    2
  ],
  G: [
    'leaf',
    3
  ],
  n: [
    'stem',
    2
  ],
  J: [
    'glove',
    2
  ],
  j: [
    'glove',
    1
  ],
  L: [
    'glove',
    3
  ],
  W: [
    'shirt',
    3
  ],
  w: [
    'shirt',
    2
  ],
  P: [
    'short',
    2
  ],
  B: [
    'shoe',
    2
  ],
  e: [
    'lace',
    3
  ],
  T: [
    'tie',
    2
  ],
  t: [
    'tie',
    3
  ]
};
function Ve(t) {
  let e = t[0].length,
  r = t.length,
  o = document.createElement('canvas');
  o.width = e,
  o.height = r;
  let i = o.getContext('2d');
  i.imageSmoothingEnabled = !1;
  let l = (c, k) => k < 0 ||
  k >= r ||
  c < 0 ||
  c >= e ? '.' : t[k][c],
  n = (c, k) => l(c, k) !== '.' &&
  l(c, k) !== ' ';
  for (let c = 0; c < r; c += 1) for (let k = 0; k < e; k += 1) {
    let s = t[c][k];
    if (s === '.' || s === ' ') continue;
    if (s === 'k') {
      i.fillStyle = x,
      i.fillRect(k, c, 1, 1);
      continue
    }
    let d = ht[s];
    if (!d) continue;
    let h = B[d[0]],
    u = d[1];
    l(k, c - 1) !== s &&
    (u += 1),
    l(k, c + 1) !== s &&
    (u -= 1),
    n(k - 1, c) ||
    (u += 1),
    n(k + 1, c) ||
    (u -= 1),
    i.fillStyle = h[Math.max(0, Math.min(h.length - 1, u))],
    i.fillRect(k, c, 1, 1)
  }
  return o
}
var yt = {
  0: [
    7,
    5,
    5,
    5,
    7
  ],
  1: [
    2,
    6,
    2,
    2,
    7
  ],
  2: [
    7,
    1,
    7,
    4,
    7
  ],
  3: [
    7,
    1,
    7,
    1,
    7
  ],
  4: [
    5,
    5,
    7,
    1,
    1
  ],
  5: [
    7,
    4,
    7,
    1,
    7
  ],
  6: [
    7,
    4,
    7,
    5,
    7
  ],
  7: [
    7,
    1,
    1,
    1,
    1
  ],
  8: [
    7,
    5,
    7,
    5,
    7
  ],
  9: [
    7,
    5,
    7,
    1,
    7
  ],
  A: [
    7,
    5,
    7,
    5,
    5
  ],
  B: [
    6,
    5,
    6,
    5,
    6
  ],
  C: [
    7,
    4,
    4,
    4,
    7
  ],
  D: [
    6,
    5,
    5,
    5,
    6
  ],
  E: [
    7,
    4,
    7,
    4,
    7
  ],
  F: [
    7,
    4,
    7,
    4,
    4
  ],
  G: [
    7,
    4,
    5,
    5,
    7
  ],
  H: [
    5,
    5,
    7,
    5,
    5
  ],
  I: [
    7,
    2,
    2,
    2,
    7
  ],
  J: [
    1,
    1,
    1,
    5,
    7
  ],
  K: [
    5,
    5,
    6,
    5,
    5
  ],
  L: [
    4,
    4,
    4,
    4,
    7
  ],
  M: [
    5,
    7,
    7,
    5,
    5
  ],
  N: [
    5,
    7,
    7,
    7,
    5
  ],
  O: [
    7,
    5,
    5,
    5,
    7
  ],
  P: [
    7,
    5,
    7,
    4,
    4
  ],
  Q: [
    7,
    5,
    5,
    7,
    3
  ],
  R: [
    7,
    5,
    7,
    6,
    5
  ],
  S: [
    7,
    4,
    7,
    1,
    7
  ],
  T: [
    7,
    2,
    2,
    2,
    2
  ],
  U: [
    5,
    5,
    5,
    5,
    7
  ],
  V: [
    5,
    5,
    5,
    5,
    2
  ],
  W: [
    5,
    5,
    7,
    7,
    5
  ],
  X: [
    5,
    5,
    2,
    5,
    5
  ],
  Y: [
    5,
    5,
    2,
    2,
    2
  ],
  Z: [
    7,
    1,
    2,
    4,
    7
  ],
  '+': [
    0,
    2,
    7,
    2,
    0
  ],
  '-': [
    0,
    0,
    7,
    0,
    0
  ],
  '%': [
    5,
    1,
    2,
    4,
    5
  ],
  '.': [
    0,
    0,
    0,
    0,
    2
  ],
  ' ': [
    0,
    0,
    0,
    0,
    0
  ]
},
T = t => String(t).length * 4 - 1;
function M(t, e, r, o, i, l = !0) {
  let n = String(e).toUpperCase();
  r = Math.round(r),
  o = Math.round(o);
  for (let c = 0; c < n.length; c += 1) {
    let k = yt[n[c]];
    if (!k) continue;
    let s = r + c * 4;
    for (let d = 0; d < 5; d += 1) {
      let h = k[d];
      if (h) for (let u = 0; u < 3; u += 1) h & 4 >> u &&
      (
        l &&
        (t.fillStyle = '#000000aa', t.fillRect(s + u, o + d + 1, 1, 1)),
        t.fillStyle = i,
        t.fillRect(s + u, o + d, 1, 1)
      )
    }
  }
}
var $e = {
  k: '#2a2621',
  r: '#c0392b',
  R: '#e05a4a',
  m: '#8a2a24',
  g: '#4a7c3f',
  G: '#6b9c56',
  o: '#c96a1e',
  O: '#e08a35',
  y: '#c99a34',
  Y: '#efc45e',
  w: '#ddd8ce',
  W: '#f4f1ea',
  c: '#cfc2a6',
  C: '#e7ddc6',
  b: '#6b3f2a',
  B: '#8a5638',
  n: '#b39468',
  N: '#d3b98c',
  d: '#7c848c',
  D: '#aeb6bd',
  u: '#2f5d8a',
  U: '#4a86c0',
  p: '#cf6a88',
  e: '#2f4f3a',
  E: '#46704f'
},
bt = {
  avocado: [
    '................',
    '.......k........',
    '......kg........',
    '.....kgGk.......',
    '....kgGGGk......',
    '...kgGGGGGk.....',
    '..kgGGGGGGGk....',
    '..kgGGbbGGGk....',
    '..kgGGbbGGGk....',
    '..kgGGGGGGGk....',
    '..kgGGGGGGGk....',
    '...kgGGGGGk.....',
    '....kgGGGk......',
    '.....kkkkk......',
    '................',
    '................'
  ],
  cheese: [
    '................',
    '................',
    '................',
    '....kkkkkkkk....',
    '...kYYYYYYYYk...',
    '...kYyYYYyYYk...',
    '...kYYYYYYYYk...',
    '...kYyYYYYyYk...',
    '...kYYYYYYYYk...',
    '...kYYyYYYYYk...',
    '...kYYYYYYYYk...',
    '...kyyyyyyyyk...',
    '....kkkkkkkk....',
    '................',
    '................',
    '................'
  ],
  tub: [
    '................',
    '................',
    '...kkkkkkkkkk...',
    '..kWWWWWWWWWWk..',
    '..kwwwwwwwwwwk..',
    '..kWWWWWWWWWWk..',
    '..kWWnnnnnnWWk..',
    '..kWWnnnnnnWWk..',
    '..kWWWWWWWWWWk..',
    '..kWWWWWWWWWWk..',
    '..kWWWWWWWWWWk..',
    '...kkkkkkkkkk...',
    '................',
    '................',
    '................',
    '................'
  ],
  apple: [
    '................',
    '.......k........',
    '......kg........',
    '.....kgG.k......',
    '....krrrrrk.....',
    '...krrRrrrrk....',
    '..krrRrrrrrrk...',
    '..krrrrrrrrrk...',
    '..krrrrrrrrrk...',
    '..krrrrrrrrrk...',
    '..krrrrrrrrrk...',
    '...krrrrrrrk....',
    '...krrrrrrrk....',
    '....krrrrrk.....',
    '.....kkkkk......',
    '................'
  ],
  carrot: [
    '................',
    '......gGg.......',
    '.....gGgGg......',
    '....g.gGg.......',
    '.....kOOOk......',
    '.....kOOOk......',
    '.....kOOOk......',
    '......kOOk......',
    '......kOOk......',
    '......kOOk......',
    '.......kOk......',
    '.......kOk......',
    '.......kOk......',
    '........kk......',
    '................',
    '................'
  ],
  broccoli: [
    '................',
    '.....gGGg.......',
    '...gGGGGGg......',
    '..gGGgGGGGg.....',
    '..gGGGGGGGg.....',
    '...gGGGGGg......',
    '....gGgGg.......',
    '.....gGg........',
    '.....kGk........',
    '.....kGk........',
    '.....kGk........',
    '....kGGGk.......',
    '....kGGGk.......',
    '.....kkk........',
    '................',
    '................'
  ],
  milk: [
    '................',
    '................',
    '.....kkkk.......',
    '....kwWWwk......',
    '...kwWWWWwk.....',
    '..kwWWWWWWwk....',
    '..kwuuuuuuwk....',
    '..kwWWWWWWwk....',
    '..kwWuuuuWwk....',
    '..kwWuuuuWwk....',
    '..kwWWWWWWwk....',
    '..kwWWWWWWwk....',
    '..kwWWWWWWwk....',
    '..kwWWWWWWwk....',
    '..kkkkkkkkkk....',
    '................'
  ],
  butter: [
    '................',
    '................',
    '................',
    '....kkkkkkkk....',
    '...kNNNNNNNNk...',
    '...kyYYYYYYyk...',
    '...kyYYYYYYyk...',
    '...kyYYYYYYyk...',
    '...kyYYYYYYyk...',
    '...kyYYYYYYyk...',
    '...kyYYYYYYyk...',
    '...kyyyyyyyyk...',
    '....kkkkkkkk....',
    '................',
    '................',
    '................'
  ],
  oliveoil: [
    '................',
    '.......kk.......',
    '.......ke.......',
    '.......ke.......',
    '......kEek......',
    '.....kEeeek.....',
    '....kEeeeeek....',
    '....kEeeeeek....',
    '....kEennnek....',
    '....kEennnek....',
    '....kEeeeeek....',
    '....kEeeeeek....',
    '....kEeeeeek....',
    '....kEeeeeek....',
    '.....kkkkkk.....',
    '................'
  ],
  tallow: [
    '................',
    '................',
    '.....kkk........',
    '...kkCCCkk......',
    '..kCCCCCCCkk....',
    '.kCCcCCCCCCCk...',
    '.kCcccCCCcCCk...',
    '.kCCccCCCccCk...',
    '..kCCCCcCCCk....',
    '..kCCcCCCCCk....',
    '...kCCCCCck.....',
    '....kkCCkk......',
    '......kk........',
    '................',
    '................',
    '................'
  ],
  candywhite: [
    '................',
    '................',
    '................',
    '....kkkkkkk.....',
    '...kWwwwwwWk....',
    '...kWwwwwwWk....',
    '...kWwwwwwWk....',
    '...kWwwwwwWk....',
    '...kWwwwwwWk....',
    '...kWwwwwwWk....',
    '...kWwwwwwWk....',
    '....kkkkkkk.....',
    '................',
    '................',
    '................',
    '................'
  ],
  steak: [
    '................',
    '................',
    '....kkkkkk......',
    '..kkmbbbbmkk....',
    '.kmbbBbbbbbmk...',
    '.kbbBBbbbbbbk...',
    '.kbBBbbbbbbbk...',
    '.kbbbbbbbbbbk...',
    '.kbbbbbbbbBbk...',
    '.kmbbbbbbBBmk...',
    '..kmbbbbbbmk....',
    '...kkwwwwkk.....',
    '....kwwwwk......',
    '.....kkkk.......',
    '................',
    '................'
  ],
  eggs: [
    '................',
    '................',
    '....kk....kk....',
    '...kwWk..kwWk...',
    '..kwWWWkkwWWWk..',
    '..kwWWWkkwWWWk..',
    '..kwWWWkkwWWWk..',
    '...kwWk..kwWk...',
    '....kk....kk....',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................'
  ],
  sweetpotato: [
    '................',
    '................',
    '................',
    '.......kkk......',
    '.....kkoOOk.....',
    '...kkoOOOOok....',
    '..koOOOOOook....',
    '.koOOOOOooOk....',
    '.koOOOoooOOk....',
    '.koOOooOOOok....',
    '..kooOOOOok.....',
    '...kkooOok......',
    '.....kkkk.......',
    '................',
    '................',
    '................'
  ],
  sack: [
    '................',
    '....kkkkkkk.....',
    '...knnnnnnnk....',
    '...knNNNNNnk....',
    '...knnnnnnnk....',
    '...knnbbbnnk....',
    '...knnbbbnnk....',
    '...knnnnnnnk....',
    '...knnnnnnnk....',
    '...knnnnnnnk....',
    '...knnnnnnnk....',
    '...knnnnnnnk....',
    '...knnnnnnnk....',
    '....kkkkkkk.....',
    '................',
    '................'
  ],
  fries: [
    '................',
    '.......y.y......',
    '......yYyYy.....',
    '.....yYyYyYy....',
    '.....yYyYyYy....',
    '....kyYyYyYyk...',
    '....knnnnnnnk...',
    '....knNNNNNnk...',
    '....knNNNNNnk...',
    '.....knNNNnk....',
    '.....knNNNnk....',
    '......knNnk.....',
    '......kkkkk.....',
    '................',
    '................',
    '................'
  ],
  oatbar: [
    '................',
    '................',
    '................',
    '..kkkkkkkkkkkk..',
    '..knnnnnnnnnnk..',
    '..knnnnnnnnnnk..',
    '..knnbbbbbbnnk..',
    '..knnbbbbbbnnk..',
    '..knnnnnnnnnnk..',
    '..kkkkkkkkkkkk..',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................'
  ],
  washedbar: [
    '................',
    '................',
    '................',
    '..kkkkkkkkkkkk..',
    '..knnnnnnnnnnk..',
    '..knNgGgnnnnnk..',
    '..knNgGgnNNNnk..',
    '..knnnnnnNNNnk..',
    '..knnnnnnnnnnk..',
    '..kkkkkkkkkkkk..',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................'
  ],
  jug: [
    '................',
    '.......kkk......',
    '......kdDdk.....',
    '.....kkdDdkk....',
    '....kYYYYYYYk...',
    '....kYyyyyyYk...',
    '...kkYyyyyyYk...',
    '..kdkYyyyyyYk...',
    '..kdkYyWWWyYk...',
    '..kdkYyWWWyYk...',
    '..kdkYyyyyyYk...',
    '...kkYyyyyyYk...',
    '....kYyyyyyYk...',
    '....kYYYYYYYk...',
    '.....kkkkkkk....',
    '................'
  ],
  cerealbox: [
    '................',
    '...kkkkkkkkk....',
    '...kuUUUUUuk....',
    '...kuWWWWWuk....',
    '...kuWrRrWuk....',
    '...kuWyYyWuk....',
    '...kuWgGgWuk....',
    '...kuWWWWWuk....',
    '...kuUUUUUuk....',
    '...kuUUUUUuk....',
    '...kuUUUUUuk....',
    '...kuUUUUUuk....',
    '...kuUUUUUuk....',
    '...kkkkkkkkk....',
    '................',
    '................'
  ],
  sportsbottle: [
    '................',
    '.......kk.......',
    '.......kdk......',
    '......kkdkk.....',
    '.....kuUUUuk....',
    '....kuUUUUUuk...',
    '....kuUUUUUuk...',
    '....kuWWWWWuk...',
    '....kuWuuuWuk...',
    '....kuWWWWWuk...',
    '....kuUUUUUuk...',
    '....kuUUUUUuk...',
    '....kuUUUUUuk...',
    '....kuUUUUUuk...',
    '....kkkkkkkkk...',
    '................'
  ],
  can: [
    '................',
    '................',
    '.....kkkkkk.....',
    '....kdDDDDdk....',
    '....kdrrrrdk....',
    '....kdrRRrdk....',
    '....kdrRRrdk....',
    '....kdWWWWdk....',
    '....kdrRRrdk....',
    '....kdrrrrdk....',
    '....kdrrrrdk....',
    '....kdDDDDdk....',
    '.....kkkkkk.....',
    '................',
    '................',
    '................'
  ],
  candybar: [
    '................',
    '................',
    '................',
    '..kkkkkkkkkkkk..',
    '..kmmmmmmmmmmk..',
    '..kmWWWmmWWWmk..',
    '..kmmmmmmmmmmk..',
    '..kmmbbbbbbmmk..',
    '..kmmbbbbbbmmk..',
    '..kmmmmmmmmmmk..',
    '..kkkkkkkkkkkk..',
    '................',
    '................',
    '................',
    '................',
    '................'
  ],
  snackcake: [
    '................',
    '................',
    '...kkkkkkkkkk...',
    '..kppppppppppk..',
    '..kpWWWWWWWWpk..',
    '..kpWbbbbbbWpk..',
    '..kpWbBBBBbWpk..',
    '..kpWbbbbbbWpk..',
    '..kpWWWWWWWWpk..',
    '..kppppppppppk..',
    '...kkkkkkkkkk...',
    '................',
    '................',
    '................',
    '................',
    '................'
  ]
},
te = [
  {
    id: 'apple',
    name: 'apple',
    art: 'apple',
    ov: []
  },
  {
    id: 'carrot',
    name: 'carrot',
    art: 'carrot',
    ov: []
  },
  {
    id: 'broccoli',
    name: 'broccoli',
    art: 'broccoli',
    ov: []
  },
  {
    id: 'wholemilk',
    name: 'whole milk',
    art: 'milk',
    ov: []
  },
  {
    id: 'skimmilk',
    name: 'skim milk',
    art: 'milk',
    ov: [],
    pal: {
      u: '#9aa3ab',
      U: '#cfd6dc'
    }
  },
  {
    id: 'butter',
    name: 'butter',
    art: 'butter',
    ov: []
  },
  {
    id: 'oliveoil',
    name: 'olive oil',
    art: 'oliveoil',
    ov: []
  },
  {
    id: 'tallow',
    name: 'tallow lump',
    art: 'tallow',
    ov: [],
    idle: 'drip'
  },
  {
    id: 'steak',
    name: 'steak',
    art: 'steak',
    ov: []
  },
  {
    id: 'eggs',
    name: 'eggs',
    art: 'eggs',
    ov: []
  },
  {
    id: 'sweetpotato',
    name: 'sweet potato',
    art: 'sweetpotato',
    ov: [],
    idle: 'steam'
  },
  {
    id: 'oats',
    name: 'oats',
    art: 'sack',
    ov: []
  },
  {
    id: 'tallowfries',
    name: 'tallow fries',
    art: 'fries',
    ov: []
  },
  {
    id: 'oatbar',
    name: 'oat bar',
    art: 'oatbar',
    ov: []
  },
  {
    id: 'seedoil',
    name: 'seed-oil jug',
    art: 'jug',
    ov: [
      'slick'
    ]
  },
  {
    id: 'parfries',
    name: 'par-fried fries',
    art: 'fries',
    ov: [
      'slick'
    ]
  },
  {
    id: 'cereal',
    name: 'dyed cereal',
    art: 'cerealbox',
    ov: [
      'dye'
    ]
  },
  {
    id: 'sportsdrink',
    name: 'dyed sports drink',
    art: 'sportsbottle',
    ov: [
      'dye'
    ]
  },
  {
    id: 'soda',
    name: 'sweetened soda',
    art: 'can',
    ov: [
      'foil',
      'dye'
    ]
  },
  {
    id: 'candybar',
    name: 'candy bar',
    art: 'candybar',
    ov: [
      'foil'
    ]
  },
  {
    id: 'snackcake',
    name: 'snack cake',
    art: 'snackcake',
    ov: [
      'foil',
      'dust'
    ]
  },
  {
    id: 'whitecandy',
    name: 'white-coated candy',
    art: 'candywhite',
    ov: [
      'dust'
    ]
  },
  {
    id: 'flour',
    name: 'bromated flour',
    art: 'sack',
    ov: [
      'dust'
    ]
  },
  {
    id: 'dietsoda',
    name: 'diet soda',
    art: 'can',
    ov: [
      'foil',
      'dust'
    ],
    pal: {
      r: '#8f979e',
      R: '#c3cbd2'
    }
  },
  {
    id: 'washedbar',
    name: 'health-washed bar',
    art: 'washedbar',
    ov: [
      'foilfaint'
    ]
  },
  {
    id: 'avocado',
    name: 'avocado',
    art: 'avocado',
    ov: []
  },
  {
    id: 'cheese',
    name: 'cheese',
    art: 'cheese',
    ov: []
  },
  {
    id: 'yogurt',
    name: 'plain yogurt',
    art: 'tub',
    ov: []
  },
  {
    id: 'salmon',
    name: 'salmon',
    art: 'steak',
    ov: [],
    pal: {
      b: '#c4674f',
      B: '#e08a6c',
      m: '#8f3f2c'
    }
  },
  {
    id: 'margarine',
    name: 'margarine',
    art: 'tub',
    ov: [
      'slick'
    ],
    pal: {
      W: '#efd67a',
      w: '#c9ad4e',
      n: '#8a7430'
    }
  },
  {
    id: 'energy',
    name: 'energy drink',
    art: 'can',
    ov: [
      'dye',
      'dust'
    ],
    pal: {
      r: '#5f9e2a',
      R: '#8ed04a',
      d: '#5c6a4a',
      D: '#9db089'
    }
  },
  {
    id: 'fruitsnacks',
    name: 'fruit snacks',
    art: 'candybar',
    ov: [
      'foil',
      'dye'
    ],
    pal: {
      m: '#8a2a5e',
      b: '#c0397f',
      B: '#e05aa0'
    }
  },
  {
    id: 'creamer',
    name: 'coffee creamer',
    art: 'milk',
    ov: [
      'dust',
      'slick'
    ],
    pal: {
      u: '#8a6a3a',
      U: '#c2a06a'
    }
  },
  {
    id: 'noodles',
    name: 'instant noodles',
    art: 'cerealbox',
    ov: [
      'foil',
      'slick'
    ],
    pal: {
      u: '#a8452a',
      U: '#d46b45'
    }
  }
];
for (let t of te) t.clean = t.ov.length === 0;
var Pe = Object.fromEntries(te.map(t => [t.id,
t]));
function Wt(t) {
  let e = bt[t.art],
  r = t.pal ? Object.assign({
  }, $e, t.pal) : $e,
  o = document.createElement('canvas');
  o.width = 16,
  o.height = 16;
  let i = o.getContext('2d', {
    willReadFrequently: !0
  });
  i.imageSmoothingEnabled = !1;
  for (let h = 0; h < 16; h += 1) for (let u = 0; u < 16; u += 1) {
    let m = (e[h] || '') [u];
    if (!m || m === '.' || m === ' ') continue;
    let R = r[m];
    R &&
    (i.fillStyle = R, i.fillRect(u, h, 1, 1))
  }
  let l = i.getImageData(0, 0, 16, 16).data,
  n = new Uint8Array(256),
  c = 16,
  k = 16,
  s = - 1,
  d = - 1;
  for (let h = 0; h < 256; h += 1) if (l[h * 4 + 3] > 0) {
    n[h] = 1;
    let u = h % 16,
    m = h / 16 | 0;
    u < c &&
    (c = u),
    m < k &&
    (k = m),
    u > s &&
    (s = u),
    m > d &&
    (d = m)
  }
  return s < 0 &&
  (c = k = 0, s = d = 15),
  {
    img: o,
    mask: n,
    x0: c,
    y0: k,
    x1: s,
    y1: d,
    w: s - c + 1,
    h: d - k + 1
  }
}
for (let t of te) t.sp = Wt(t);
var O = {
  slickA: [
    155,
    107,
    214
  ],
  slickB: [
    63,
    208,
    200
  ],
  dye: [
    232,
    74,
    190
  ],
  dust: 'rgba(244,242,236,0.92)',
  foil: 'rgba(255,253,245,'
},
Rt = (t, e, r) => t + (e - t) * r;
function pt(t) {
  let e = t < 0.5 ? t * 2 : (1 - t) * 2,
  r = [
    0,
    1,
    2
  ].map(o => Math.round(Rt(O.slickA[o], O.slickB[o], e)));
  return `rgb(${ r[0] },${ r[1] },${ r[2] })`
}
function wt(t, e, r) {
  let o = e.h >= 9 ? 3 : 2,
  i = e.y0 + Math.max(1, Math.round(e.h * 0.16));
  for (let n = i; n < i + o && n <= e.y1; n += 1) for (let c = e.x0; c <= e.x1; c += 1) e.mask[n * 16 + c] &&
  (
    t.fillStyle = pt(((c - e.x0) / Math.max(1, e.w) + r / 0.8) % 1),
    t.fillRect(c, n, 1, 1)
  );
  let l = i + o;
  if (l <= e.y1) {
    t.fillStyle = 'rgba(20,12,34,0.7)';
    for (let n = e.x0; n <= e.x1; n += 1) e.mask[l * 16 + n] &&
    t.fillRect(n, l, 1, 1)
  }
}
function gt(t, e) {
  let r = 0.09 + 0.06 * (0.5 + 0.5 * Math.sin(e * Math.PI * 2));
  t.globalCompositeOperation = 'source-atop',
  t.fillStyle = `rgba(${ O.dye[0] },${ O.dye[1] },${ O.dye[2] },${ r })`,
  t.fillRect(0, 0, 16, 16),
  t.globalCompositeOperation = 'source-over'
}
function Mt(t, e) {
  t.fillStyle = `rgba(${ O.dye[0] },${ O.dye[1] },${ O.dye[2] },0.72)`;
  for (let r = e.y0 - 1; r <= e.y1 + 1; r += 1) for (let o = e.x0 - 1; o <= e.x1 + 1; o += 1) {
    if (o < 0 || o > 15 || r < 0 || r > 15 || e.mask[r * 16 + o]) continue;
    (
      o > 0 &&
      e.mask[r * 16 + o - 1] ||
      o < 15 &&
      e.mask[r * 16 + o + 1] ||
      r > 0 &&
      e.mask[(r - 1) * 16 + o] ||
      r < 15 &&
      e.mask[(r + 1) * 16 + o]
    ) &&
    t.fillRect(o, r, 1, 1)
  }
}
var Fe = [
  0,
  0.9,
  1.8,
  2.7,
  3.6,
  4.5,
  5.4
];
function St(t, e, r) {
  let o = (e.x0 + e.x1 + 1) / 2,
  i = (e.y0 + e.y1 + 1) / 2,
  l = Math.max(e.w, e.h) / 2 + 1.2;
  t.fillStyle = O.dust;
  for (let n = 0; n < Fe.length; n += 1) {
    let c = Fe[n] + r * 0.6 * (n % 2 ? - 1 : 1),
    k = Math.round(o + Math.cos(c) * l - 0.5),
    s = Math.round(i + Math.sin(c) * (l * 0.86) - 0.5);
    k < 0 ||
    k > 15 ||
    s < 0 ||
    s > 15 ||
    e.mask[s * 16 + k] ||
    t.fillRect(k, s, 1, 1)
  }
}
function Yt(t, e, r, o) {
  let l = r / (o ? 3.1 : 1.9) % 1,
  n = (o ? 0.6 : 0.95) * (0.35 + 0.65 * Math.sin(l * Math.PI)),
  c = e.x0 - e.h - 3 + l * (e.w + e.h + 6);
  t.fillStyle = O.foil + n.toFixed(3) + ')';
  for (let k = e.y0; k <= e.y1; k += 1) for (let s = 0; s < 2; s += 1) {
    let d = Math.round(c + (k - e.y0)) + s;
    d < 0 ||
    d > 15 ||
    !e.mask[k * 16 + d] ||
    t.fillRect(d, k, 1, 1)
  }
}
function xt(t, e, r) {
  let o = Math.round((e.y0 + e.y1) / 2),
  i = Math.max(1, Math.min(3, Math.round(e.h / 4)));
  t.fillStyle = O.foil + (r ? 0.8 : 0.97) + ')';
  for (let l = - i; l <= i; l += 1) {
    let n = o + l;
    if (n < 0 || n > 15) continue;
    let c = (n & 1) === 0 ? 2 : 1;
    for (let k = 1; k <= c; k += 1) e.x0 - k >= 0 &&
    t.fillRect(e.x0 - k, n, 1, 1),
    e.x1 + k <= 15 &&
    t.fillRect(e.x1 + k, n, 1, 1)
  }
}
function vt(t, e, r, o) {
  if (r === 'steam') {
    t.fillStyle = 'rgba(226,232,236,0.5)';
    for (let i = 0; i < 3; i += 1) {
      let l = (o * 0.5 + i * 0.33) % 1,
      n = Math.round(e.y0 - 1 - l * 3),
      c = Math.round(e.x0 + e.w * 0.3 + i * 2 + Math.sin(l * 6 + i) * 1.2);
      n >= 0 &&
      c >= 0 &&
      c < 16 &&
      t.fillRect(c, n, 1, 1)
    }
  } else {
    let i = o * 0.45 % 1,
    l = Math.round(e.y1 + i * 3);
    t.fillStyle = 'rgba(231,221,198,0.85)',
    l < 16 &&
    t.fillRect(Math.round((e.x0 + e.x1) / 2) + 1, l, 1, 1)
  }
}
var Q = document.createElement('canvas');
Q.width = 16;
Q.height = 16;
var U = Q.getContext('2d');
U.imageSmoothingEnabled = !1;
function Z(t, e, r, o, i, l) {
  let n = e.sp;
  U.clearRect(0, 0, 16, 16),
  U.drawImage(n.img, 0, 0);
  let c = e.ov,
  k = c.includes('foil'),
  s = c.includes('foilfaint');
  if (
    c.includes('dye') &&
    gt(U, r),
    c.includes('slick') &&
    wt(U, n, r),
    (k || s) &&
    Yt(U, n, r, s),
    c.includes('dye') &&
    Mt(U, n),
    (k || s) &&
    xt(U, n, s),
    c.includes('dust') &&
    St(U, n, r),
    e.idle &&
    vt(U, n, e.idle, r),
    !l
  ) {
    t.drawImage(Q, o, i);
    return
  }
  t.save(),
  t.translate(o + 8, i + 8),
  t.rotate(l),
  t.drawImage(Q, - 8, - 8),
  t.restore()
}
var Gt = [
  '............................',
  '............................',
  '............................',
  '.......................krrrr',
  '....................krrrrrrr',
  '..................krrrrrrrrr',
  '.................krRRRRRrrrr',
  '................krRRRRRrrrrr',
  '................krRRRRRrrrrr',
  '................krRRRRRrrrrr',
  '................krRRRRRrrrrr',
  '................krRRRRRrrrrr',
  '................krrrrrrrrrrr',
  '................krrrrrrrrrrr',
  '................krrrrrrrrrrr',
  '................krrrrrrrrrrr',
  '................krrrrrrrrrrr',
  '.................kqqrrrrrrrr',
  '.................kqqrrrrrrrr',
  '..................kqqrrrrrrr',
  '..................kqqrrrrrrr',
  '...................krrrrrrrr',
  '...................krrrrrrrr',
  '....................krrrrrrr',
  '...................krrrrrrrr',
  '...................krrrrrrrr',
  '...................krrrrrrrr',
  '...............krrrrrrrrrrrr',
  '............krrrrrrrrrrrrrrr',
  '..........krrrrrrrrrrrrrrrrr',
  '........krrrrrrrrrrrrrrrrrrr',
  '.......krrrrrrrrrrrrrrrrrrrr',
  '.......krrrrrrrrrrrrrrrrrrrr',
  '.......krrrrrrrrrrrrrrrrrrrr',
  '........krrrrrrrrrrrrrrrrrrr',
  '........krrrrrrrrrrrrrrrrrrr',
  '........krrrrrrrrrrrrrrrrrrr',
  '........krrrrrrrrrrrrrrrrrrr',
  '........krrrrrrrrrrrrrrrrrrr',
  '........krrrrrrrrrrrrrrrrrrr',
  '........krrrrrrrrrrrrrrrrrrr',
  '.........krrrrrrrrrrrrrrrrrr',
  '..........krrrrrrrrrrrrrrrrr',
  '...........krrrrrrrrrrrrrrrr',
  '............krrrrrrrrrrrrrrr',
  '...........keeeeeeeeeeeeeeee',
  '...........keeeeeeeeeeeeeeee',
  '...........kPPPPPPPPPPPPPPPP',
  '...........kPPPPPPPPPPPPPPPP',
  '...........kPPPPPPPPPPPPPPPP',
  '...........kPPPPPPPPPPPPPPPP',
  '............kPPPPPP.........',
  '..............krrrrk........',
  '..............krrrrk........',
  '..............krrrrk........',
  '..............krrrrk........',
  '..............krrrrk........',
  '..............krrrrk........',
  '..............krrrrk........',
  '.............kBBBBBk........',
  '.............kBBBBBk........',
  '.............kBBBBBk........',
  '.............kBBBBBk........',
  '.............kkkkkkk........'
],
Ct = [
  '....kkkkk.....',
  '..kkJLLLJkk...',
  '.kjJLLLLLJjk..',
  'kjJLLLLLLLJjk.',
  'kjLLLLLLLLLJk.',
  'kjLLLLLLLLLJk.',
  'kjJeeeeeeLLJk.',
  'kjJeeeeeeLLJk.',
  'kjJLLLLLLLLJk.',
  'kjJLLLLLLLLJk.',
  'kjJJLLLLLLJjk.',
  'kjJJJJJJJJJjk.',
  '.kkJJJJJJJkk..',
  '..keeeeeeek...',
  '...kqrRRRrk...',
  '...kqrRRRrk...',
  '...kqrRRRrk...',
  '...kqrRRRrk...',
  '...kqrRRRrk...',
  '....kqrRRrk...',
  '....kqrRRrk...',
  '....kqrRRrk...',
  '....kqrRRrk...',
  '.....kqrrk....',
  '.....kqrrk....',
  '.....kqrrk....',
  '......kkkk....',
  '..............'
],
Ee = Gt.map(t => t + t.split('').reverse().join('')),
E = Ee[0].length,
pe = Ee.length;
function Lt() {
  let t = Ee.map(r => r.split('')),
  e = (r, o, i) => {
    o >= 0 &&
    o < pe &&
    r >= 0 &&
    r < E &&
    (t[o][r] = i)
  };
  {
    let r = E / 2,
    o = (n, c) => c >= 0 &&
    c < pe &&
    n >= 0 &&
    n < E &&
    (t[c][n] === 'r' || t[c][n] === 'R'),
    i = (n, c) => {
      o(n, c) &&
      e(n, c, 'q')
    },
    l = (n, c) => {
      c >= 0 &&
      c < pe &&
      n >= 0 &&
      n < E &&
      (t[c][n] === 'r' || t[c][n] === 'q') &&
      e(n, c, 'R')
    };
    for (let n = 31; n <= 39; n += 1) i(r - 1, n),
    i(r, n);
    for (let n = r - 14; n <= r + 13; n += 1) i(n, 40);
    for (let n = r - 13; n <= r - 3; n += 1) l(n, 33);
    for (let n = r + 2; n <= r + 12; n += 1) l(n, 33);
    for (let n = 41; n <= 51; n += 1) i(r - 1, n),
    i(r, n);
    for (let n of [
      43,
      46,
      49
    ]) for (let c = r - 9; c <= r + 8; c += 1) i(c, n);
    for (let n of [
      42,
      45,
      48
    ]) for (let c of [
      r - 7,
      r - 6,
      r - 5,
      r + 4,
      r + 5,
      r + 6
    ]) l(c, n);
    for (let n = 0; n < 4; n += 1) {
      let c = 42 + n * 2;
      i(r - 13 + n, c),
      i(r - 12 + n, c),
      i(r + 12 - n, c),
      i(r + 11 - n, c)
    }
    for (let n of [
      - 1,
      1
    ]) {
      let c = n < 0 ? 4 : E - 5,
      k = n < 0 ? 2 : E - 3;
      for (let s = 30; s <= 32; s += 1) i(c + n, s);
      for (let s = 28; s <= 31; s += 1) l(k, s);
      for (let s = 33; s <= 39; s += 1) i(c - n, s);
      for (let s = 41; s <= 45; s += 1) i(c, s);
      for (let s = 48; s <= 51; s += 1) i(c - n, s);
      l(k, 34),
      l(k, 43),
      l(k, 49)
    }
  }
  return t.map(r => r.join(''))
}
var De = Ve(Ct),
we = [],
Pt = t => {
  let e = Math.max(0, Math.min(5, t | 0));
  return we[e] ||
  (we[e] = Ve(Lt())),
  we[e]
},
b = {
  eyeL: 20,
  eyeR: 33,
  eyeY: 14,
  browY: 11,
  mouthY: 21,
  mid: 28
},
Et = () => a.suit <= 0 ? 0 : a.suit <= 1 ? 1 : a.suit <= 3 ? 2 : 3;
function Ot(t, e, r) {
  let o = e + b.eyeL + 1,
  i = r + b.browY;
  t.fillStyle = 'rgba(26,9,13,0.8)',
  t.fillRect(o, i - 1, 2, 10),
  t.fillRect(o - 2, i, 2, 1),
  t.fillRect(o - 3, i + 1, 2, 1),
  t.fillRect(o + 2, i + 7, 2, 1)
}
function Ut(t, e, r, o, i) {
  if (o <= 0) return;
  let l = e + b.eyeL,
  n = e + b.eyeR,
  c = r + b.eyeY;
  if (o >= 1) {
    t.fillStyle = 'rgba(214,238,250,0.85)';
    for (let k = 0; k < 2; k += 1) {
      let s = (i * 0.6 + k * 0.5) % 1;
      t.fillRect(e + 12 + k * 30, r + 12 + Math.round(s * 12), 1, 2)
    }
  }
  o >= 2 &&
  (
    t.fillStyle = 'rgba(150,44,34,0.9)',
    t.fillRect(n + 1, c + 6, 5, 3),
    t.fillStyle = 'rgba(206,96,72,0.75)',
    t.fillRect(n + 2, c + 6, 3, 1)
  ),
  o >= 3 &&
  (
    t.fillStyle = '#5c0f11',
    t.fillRect(l - 1, r + b.browY - 2, 6, 2),
    t.fillStyle = '#a81f1c',
    t.fillRect(l + 1, r + b.browY, 2, 7)
  ),
  o >= 4 &&
  (
    t.fillStyle = 'rgba(74,28,60,0.85)',
    t.fillRect(l - 2, c - 1, 7, 6),
    t.fillStyle = x,
    t.fillRect(l - 1, c + 1, 5, 2)
  ),
  o >= 5 &&
  (
    t.fillStyle = 'rgba(74,28,60,0.85)',
    t.fillRect(n - 2, c - 1, 7, 6),
    t.fillStyle = x,
    t.fillRect(n - 1, c + 1, 5, 2),
    t.fillStyle = '#a81f1c',
    t.fillRect(e + b.mid - 1, r + b.mouthY - 5, 2, 4)
  )
}
function Tt(t, e, r) {
  let o = r + b.eyeY + 1;
  for (let i of [
    - 1,
    1
  ]) {
    let l = i < 0 ? e + 15 : e + 39;
    t.fillStyle = x,
    t.fillRect(l, o - 1, 2, 7),
    t.fillStyle = B.skin[2],
    t.fillRect(l + (i < 0 ? 0 : 1), o, 1, 5),
    t.fillStyle = B.skin[1],
    t.fillRect(l + (i < 0 ? 0 : 1), o + 2, 1, 2)
  }
}
function It(t, e, r, o, i, l) {
  Tt(t, e, r),
  Ot(t, e, r);
  let n = [
    0,
    0,
    2,
    3
  ][o],
  c = [
    0,
    - 1,
    0,
    1
  ][o],
  k = o === 3 ? 2 : 1;
  t.fillStyle = x;
  for (let d = 0; d < 7; d += 1) t.fillRect(e + b.eyeL - 2 + d, r + b.browY + c + Math.round(n * d / 6), 1, k),
  t.fillRect(e + b.eyeR - 1 + d, r + b.browY + c + Math.round(n * (6 - d) / 6), 1, k);
  if (l) t.fillStyle = x,
  t.fillRect(e + b.eyeL - 1 + i, r + b.eyeY + 1, 5, 1),
  t.fillRect(e + b.eyeR - 1 + i, r + b.eyeY + 1, 5, 1);
   else for (let d of [
    b.eyeL,
    b.eyeR
  ]) t.fillStyle = 'rgba(26,9,13,0.45)',
  t.fillRect(e + d - 2, r + b.eyeY - 1, 7, 2),
  t.fillStyle = 'rgba(26,9,13,0.3)',
  t.fillRect(e + d - 1, r + b.eyeY + 4, 5, 1),
  t.fillStyle = '#fbf9f4',
  t.fillRect(e + d - 1, r + b.eyeY, 5, 4),
  t.fillStyle = '#00000022',
  t.fillRect(e + d - 1, r + b.eyeY, 5, 1),
  t.fillStyle = x,
  t.fillRect(e + d + i, r + b.eyeY + 1, 3, 3),
  t.fillStyle = '#ffffff',
  t.fillRect(e + d + i, r + b.eyeY + 1, 1, 1);
  t.fillStyle = 'rgba(26,9,13,0.32)',
  t.fillRect(e + b.mid - 3, r + b.eyeY + 1, 1, 4),
  t.fillStyle = 'rgba(26,9,13,0.5)',
  t.fillRect(e + b.mid - 3, r + b.mouthY - 3, 6, 2),
  t.fillStyle = x,
  t.fillRect(e + b.mid - 2, r + b.mouthY - 2, 1, 1),
  t.fillRect(e + b.mid + 1, r + b.mouthY - 2, 1, 1),
  t.fillStyle = x;
  let s = b.mouthY;
  if (o <= 1) t.fillRect(e + b.mid - 3, r + s, 6, 1),
  t.fillStyle = '#d8b7a6',
  t.fillRect(e + b.mid - 1, r + s, 2, 1);
   else if (o === 2) t.fillRect(e + b.mid - 4, r + s, 8, 2),
  t.fillRect(e + b.mid - 5, r + s - 1, 1, 2),
  t.fillRect(e + b.mid + 4, r + s - 1, 1, 2);
   else {
    t.fillRect(e + b.mid - 5, r + s - 2, 11, 5),
    t.fillStyle = '#fbf9f4',
    t.fillRect(e + b.mid - 4, r + s - 1, 9, 2),
    t.fillRect(e + b.mid - 4, r + s + 2, 9, 1),
    t.fillStyle = '#e9f0f5',
    t.fillRect(e + b.mid - 4, r + s - 1, 9, 2),
    t.fillStyle = '#b9c6cf',
    t.fillRect(e + b.mid - 4, r + s, 9, 1),
    t.fillStyle = x;
    for (let d = - 3; d <= 3; d += 3) d !== 0 &&
    t.fillRect(e + b.mid + d, r + s - 1, 1, 2);
    t.fillRect(e + b.mid - 1, r + s - 1, 2, 4)
  }
}
var fe = 132,
Oe = 10,
Ke = {
  k: x,
  q: '#8e2419',
  r: '#c8402f',
  R: '#ea6a52',
  W: '#ff9f86',
  g: '#3f7c30',
  G: '#6fb452'
};
function Qe(t, e) {
  let r = document.createElement('canvas');
  r.width = t[0].length,
  r.height = t.length;
  let o = r.getContext('2d');
  o.imageSmoothingEnabled = !1;
  for (let i = 0; i < t.length; i += 1) for (let l = 0; l < t[0].length; l += 1) {
    let n = e[t[i][l]];
    n &&
    (o.fillStyle = n, o.fillRect(l, i, 1, 1))
  }
  return r
}
var At = Qe(
  ['...kkkkk....',
  '..kRRRRRk...',
  '.kRWWWWRRk..',
  '.kRWWWWWRRk.',
  'kRWWWWWWWRk.',
  'kRWWWWWWWRk.',
  'kRRWWWWWWRk.',
  'kqRRWWWWRRk.',
  '.kqRRRRRRk..',
  '..kWWWWWk...',
  '..kgGGGGgk..',
  '...kkkkkk...'],
  Ke
),
Nt = Qe(
  ['............',
  '...kkkkkk...',
  '..kRRRRRRk..',
  '.kRWWWWWWRk.',
  'kRWWWWWWWWRk',
  'kRWWWWWWWWRk',
  'kRWWWWWWWWRk',
  'kRRWWWWWWRRk',
  '.kqRRRRRRqk.',
  '..kWWWWWWk..',
  '..kgGGGGgk..',
  '...kkkkkk...'],
  Ke
),
$ = [
  {
    name: 'receiving',
    speed: 26,
    every: 1.5,
    spread: 0.3,
    clean: 0.6
  },
  {
    name: 'dye lot',
    speed: 30,
    every: 1.3,
    spread: 0.45,
    clean: 0.6
  },
  {
    name: 'the fryer',
    speed: 34,
    every: 1.1,
    spread: 0.65,
    clean: 0.58
  },
  {
    name: 'label day',
    speed: 38,
    every: 0.95,
    spread: 0.8,
    clean: 0.55
  },
  {
    name: 'gras',
    speed: 43,
    every: 0.85,
    spread: 1,
    clean: 0.53
  },
  {
    name: 'school lunch',
    speed: 48,
    every: 0.75,
    spread: 1,
    clean: 0.5
  },
  {
    name: 'audit',
    speed: 54,
    every: 0.65,
    spread: 1,
    clean: 0.5
  }
],
Bt = 34,
qt = 0.12,
_t = 1.6;
function Ze() {
  return $[a.shiftIdx].speed * Math.min(_t, 1 + a.runT / 60 * qt)
}
var Ht = {
  1: [
    'apple',
    'carrot',
    'broccoli',
    'eggs',
    'steak',
    'candybar',
    'soda',
    'snackcake'
  ],
  2: [
    'cereal',
    'sportsdrink',
    'wholemilk',
    'butter',
    'cheese',
    'energy'
  ],
  3: [
    'seedoil',
    'tallow',
    'oliveoil',
    'sweetpotato',
    'avocado',
    'margarine'
  ],
  4: [
    'washedbar',
    'oatbar',
    'dietsoda',
    'skimmilk',
    'yogurt',
    'creamer'
  ],
  5: [
    'whitecandy',
    'flour',
    'oats',
    'salmon',
    'fruitsnacks'
  ],
  6: [
    'tallowfries',
    'parfries',
    'noodles'
  ],
  7: []
};
function Jt() {
  let t = document.createElement('canvas');
  t.width = y,
  t.height = S;
  let e = t.getContext('2d');
  e.imageSmoothingEnabled = !1,
  g(e, 0, 0, y, W - 8, '#2e3944', '#161c22');
  let r = l => {
    e.fillStyle = '#0d1114',
    e.fillRect(l, 20, 18, 30),
    g(e, l + 1, 21, 16, 28, '#252f39', '#141a20')
  },
  o = (l, n, c, k, s, d) => {
    if (
      e.fillStyle = '#00000066',
      e.fillRect(l + 2, n + 2, 40, 36),
      e.fillStyle = x,
      e.fillRect(l, n, 40, 36),
      g(e, l + 1, n + 1, 38, 34, '#ece6d6', '#b9b09b'),
      e.fillStyle = d ? '#a8302a' : '#2f5d8a',
      e.fillRect(l + 1, n + 1, 38, 2),
      e.drawImage(Pe[c].sp.img, l + 12, n + 4),
      d
    ) {
      e.fillStyle = '#c0392bdd';
      for (let h = 0; h < 20; h += 1) e.fillRect(l + 11 + h, n + 20 - h, 2, 2)
    }
    e.fillStyle = '#f2eddf',
    e.fillRect(l + 2, n + 20, 36, 14),
    e.fillStyle = '#00000022',
    e.fillRect(l + 2, n + 20, 36, 1),
    M(e, k, l + 20 - T(k) / 2, n + 22, x, !1),
    M(e, s, l + 20 - T(s) / 2, n + 28, x, !1)
  },
  i = (l, n, c, k) => {
    e.fillStyle = '#00000066',
    e.fillRect(l + 2, n + 2, c, k),
    e.fillStyle = x,
    e.fillRect(l - 1, n - 1, c + 2, k + 2);
    for (let s = 0; s < 7; s += 1) e.fillStyle = s % 2 ? '#e6ded0' : '#b3372f',
    e.fillRect(l, n + Math.round(s * k / 7), c, Math.ceil(k / 7));
    g(
      e,
      l,
      n,
      Math.round(c * 0.42),
      Math.round(k * 0.58),
      '#31517f',
      '#1e3452'
    ),
    e.fillStyle = '#eef2f7';
    for (let s = 0; s < 3; s += 1) for (let d = 0; d < 4; d += 1) e.fillRect(l + 2 + d * 3 + s % 2, n + 2 + s * 3, 1, 1);
    e.fillStyle = '#00000033';
    for (let s = 0; s < k; s += 1) e.fillRect(l + c - 3 + (s / 4 | 0), n + s, 1, 1)
  };
  r(6),
  o(28, 16, 'seedoil', 'seed', 'oils', !0),
  o(76, 16, 'tallow', 'beef', 'tallow', !1),
  o(196, 16, 'washedbar', 'read', 'the label', !0),
  i(248, 18, 34, 20),
  r(292);
  for (let l = 24; l < y; l += 64) e.fillStyle = '#0004',
  e.fillRect(l - 8, 14, 32, 5),
  g(e, l - 7, 13, 30, 3, '#f4efd8', '#b9b394'),
  e.fillStyle = 'rgba(244,239,216,0.07)',
  e.fillRect(l - 14, 16, 44, 16);
  e.fillStyle = 'rgba(150,190,225,0.05)',
  e.fillRect(0, K + 2, y, W - K - 14),
  e.fillStyle = 'rgba(190,220,245,0.08)';
  for (let l = 0; l < 26; l += 1) e.fillRect(34 + l, K + 2 + l, 10, 1);
  return t
}
function $t() {
  let t = document.createElement('canvas');
  t.width = y,
  t.height = S;
  let e = t.getContext('2d');
  e.imageSmoothingEnabled = !1,
  g(e, 0, W - 14, J, w - W + 24, '#2b343d', '#12171b'),
  e.fillStyle = '#0009',
  e.fillRect(J, W - 14, 3, w - W + 24),
  e.fillStyle = '#93a3b0',
  e.fillRect(J - 1, W - 14, 1, w - W + 24);
  let r = y - p;
  e.fillStyle = '#0a0d10',
  e.fillRect(p, W - 14, r, w - W + 24),
  g(e, p, W - 14, r, 9, '#3c4650', '#20272e'),
  g(e, p + 3, W - 4, r - 4, 46, '#f0bb3c', '#a2761c'),
  e.fillStyle = '#1b2026',
  e.fillRect(p + 3, W - 4, r - 4, 1),
  g(e, p + 5, W + 2, r - 8, 9, '#2b3a46', '#16202a'),
  e.fillStyle = '#43606f',
  e.fillRect(p + 5, W + 2, r - 8, 1);
  for (let m = 0; m < 3; m += 1) e.fillStyle = '#0a0d10',
  e.fillRect(p + 8 + m * 11, W + 2, 1, 9);
  M(e, 'school', p + 6, W + 16, '#5a4212', !1),
  M(e, 'lunch', p + 10, W + 24, '#5a4212', !1),
  e.fillStyle = '#1b2026',
  e.fillRect(p + 3, W + 34, r - 4, 2),
  e.fillStyle = '#0e1114',
  e.fillRect(p + 8, W + 36, 12, 6),
  e.fillRect(p + 26, W + 36, 12, 6),
  g(e, p + 4, w + 10, 16, 12, '#8a6a45', '#4c3823'),
  g(e, p + 22, w + 10, 16, 12, '#7d5f3d', '#42301d'),
  e.fillStyle = '#00000055',
  e.fillRect(p + 4, w + 15, 16, 1),
  e.fillRect(p + 22, w + 15, 16, 1),
  M(e, 'k12', p + 6, w + 11, '#c9a877', !1),
  M(e, 'k12', p + 24, w + 11, '#c9a877', !1),
  e.fillStyle = '#93a3b0',
  e.fillRect(p, W - 14, 1, w - W + 24),
  M(e, 'to school', p - 42, w + 2, '#6f7d88', !1),
  e.fillStyle = '#6f7d88';
  for (let m = 0; m < 4; m += 1) e.fillRect(p - 6 + m, w + 3, 1, 1),
  e.fillRect(p - 8 + m, w + 2 + Math.abs(m - 1), 1, 1);
  g(e, 0, W - 12, y, 6, '#4a5661', '#2b343d'),
  e.fillStyle = '#93a3b0',
  e.fillRect(0, W - 12, y, 1),
  g(e, 0, W - 6, y, 6, '#232b32', '#141a1f'),
  e.fillStyle = '#0009',
  e.fillRect(0, W - 1, y, 1),
  g(e, 0, w, y, 8, '#3d4750', '#1b2126'),
  e.fillStyle = '#8b99a5',
  e.fillRect(0, w, y, 1),
  g(e, 0, w + 8, y, S - w - 8, '#171d22', '#0e1215');
  let o = ke.x,
  i = 76,
  l = 26,
  n = 148,
  c = S;
  for (let m = 0; m < c - n; m += 1) {
    let R = m / (c - n - 1),
    Y = i + (l - i) * R,
    v = Math.round(o - Y / 2),
    _ = Math.round(o + Y / 2),
    I = n + m;
    g(e, v, I, _ - v, 1, '#241a12', '#080604'),
    g(e, v, I, 4, 1, '#8a6746', '#4d3925'),
    g(e, _ - 4, I, 4, 1, '#3d2c1d', '#241a12'),
    m % 7 === 3 &&
    (e.fillStyle = '#00000055', e.fillRect(v + 4, I, _ - v - 8, 1)),
    m % 6 === 1 &&
    (
      e.fillStyle = '#b08a5f',
      e.fillRect(v + 1, I, 1, 1),
      e.fillRect(_ - 2, I, 1, 1)
    ),
    m > 6 &&
    m % 5 === 0 &&
    (e.fillStyle = '#00000066', e.fillRect(v + 4, I, _ - v - 8, 1))
  }
  let k = Math.round(o - i / 2) - 4,
  s = i + 8,
  d = n - 9;
  g(e, k, d, s, 9, '#c39a4a', '#6d5427');
  for (let m = - 9; m < s + 9; m += 8) {
    e.fillStyle = '#20242a';
    for (let R = 0; R < 9; R += 1) for (let Y = 0; Y < 4; Y += 1) {
      let v = k + m + Y + R;
      v >= k &&
      v < k + s &&
      e.fillRect(v, d + R, 1, 1)
    }
  }
  let h = T('reject') + 10,
  u = Math.round(o - h / 2);
  return e.fillStyle = '#00000077',
  e.fillRect(u - 1, d + 1, h + 2, 7),
  g(e, u, d + 1, h, 7, '#4a3a1c', '#2a2110'),
  e.fillStyle = '#0008',
  e.fillRect(u, d + 1, h, 1),
  M(e, 'reject', u + 5, d + 2, '#e6c37a', !1),
  e.fillStyle = '#0009',
  e.fillRect(k, n, s, 2),
  e.fillStyle = '#d8b874',
  e.fillRect(k, d, s, 1),
  t
}
function Ft() {
  let t = document.createElement('canvas');
  t.width = y,
  t.height = S;
  let e = t.getContext('2d');
  for (let r = 0; r < 16; r += 1) e.fillStyle = `rgba(8,6,14,${ 0.035 + r * 0.011 })`,
  e.fillRect(0, 0, y, 16 - r),
  e.fillRect(0, S - (16 - r), y, 16 - r),
  e.fillRect(0, 0, 20 - r, S),
  e.fillRect(y - (20 - r), 0, 20 - r, S);
  return t
}
var Dt = Jt(),
jt = $t(),
Xt = Ft(),
a = {
  phase: 'playing',
  shiftIdx: 0,
  shiftT: 0,
  runT: 0,
  beltX: 0,
  items: [],
  spawnIn: 0.6,
  suit: 0,
  score: 0,
  combo: 0,
  bestCombo: 0,
  crate: 0,
  shipped: 0,
  px: - 99,
  py: - 99,
  hitAt: - 9,
  slam: null,
  cracks: [],
  pendingOver: !1,
  flash: 0,
  flashCol: [
    255,
    90,
    74
  ],
  shake: 0,
  shiftCard: 0,
  seen: 0,
  treated: 0
},
q = [],
xe = 1,
ve = Je('supply-line'),
de = !1;
function Ue(t) {
  a.phase = t ? 'intro' : 'playing',
  a.shiftIdx = 0,
  a.shiftT = 0,
  a.runT = 0,
  a.beltX = 0,
  a.items.length = 0,
  a.spawnIn = 0.6,
  a.suit = 0,
  a.score = 0,
  a.combo = 0,
  a.bestCombo = 0,
  a.crate = 0,
  a.shipped = 0,
  a.flash = 0,
  a.shake = 0,
  a.hitAt = - 9,
  a.shiftCard = 2,
  a.seen = 0,
  a.treated = 0,
  xe = 1,
  a.slam = null,
  a.cracks.length = 0,
  a.pendingOver = !1,
  q.length = 0
}
var H = (t, e, r, o, i) => q.push({
  x: t,
  y: e,
  msg: r,
  col: o,
  big: i,
  t: 0
});
function ue(t, e, r) {
  if (!ie) for (let o = 0; o < 8; o += 1) q.push({
    x: t,
    y: e,
    spark: !0,
    col: r,
    t: 0,
    vx: Math.cos(o / 8 * 6.283) * 30,
    vy: Math.sin(o / 8 * 6.283) * 30 - 14
  })
}
var zt = [
  [30,
  4],
  [
    15,
    3
  ],
  [
    6,
    2
  ]
];
function me() {
  for (let[t,
  e]of zt) if (a.combo >= t) return e;
  return 1
}
function Vt(t) {
  let e = [];
  for (let r = 1; r <= t + 1; r += 1) for (let o of Ht[r] || []) e.push(Pe[o]);
  return e.filter(Boolean)
}
function Kt() {
  let t = $[a.shiftIdx],
  e = Vt(a.shiftIdx),
  r = e.filter(s => s.clean),
  o = e.filter(s => !s.clean),
  i = Math.random() < t.clean &&
  r.length ? r : o.length ? o : r;
  if (!i.length) return;
  let l = i[Math.random() * i.length | 0],
  n = - 18 - Math.random() * 12,
  c = (Le - ae) / 2 * t.spread,
  k = ce;
  for (
    let s = 0;
    s < 8 &&
    (
      k = ce + (Math.random() * 2 - 1) * c,
      !!a.items.some(h => !h.pull && Math.abs(h.x - n) < 20 && Math.abs(h.y - k) < 13)
    );
    s += 1
  );
  a.items.push({
    item: l,
    x: n,
    y: Math.round(k),
    rot: Math.random() < 0.45 ? (Math.random() < 0.5 ? - 1 : 1) * (Math.PI / 20) : 0
  }),
  a.seen += 1,
  l.clean ||
  (a.treated += 1)
}
var et = 0.38;
function Qt(t) {
  ie &&
  (a.flash = 0, a.shake = 0),
  a.flash = Math.max(0, a.flash - t * 3.2),
  a.shake = Math.max(0, a.shake - t * 4.5),
  a.shiftCard = Math.max(0, a.shiftCard - t);
  for (let l = q.length - 1; l >= 0; l -= 1) {
    let n = q[l];
    n.t += t,
    n.spark ? (n.x += n.vx * t, n.y += n.vy * t, n.vy += 150 * t, n.t > 0.5 && q.splice(l, 1)) : n.t > 0.9 &&
    q.splice(l, 1)
  }
  if (a.slam) {
    let l = a.slam;
    if (
      l.t += t,
      !l.hitHim &&
      l.t >= C &&
      (
        l.hitHim = !0,
        a.suit = Math.min(5, a.suit + 1),
        a.flash = 0.7,
        a.shake = 0.9,
        N.thud(),
        ue(fe + E / 2, Oe + 22, '#ff7a6e'),
        H(y / 2 - 8, ce, 'let one through', '#ff7a6e', !0),
        Me(`Let one through. ${ 5 - a.suit } left.`)
      ),
      !l.cracked &&
      l.t >= X &&
      (
        l.cracked = !0,
        a.flash = 1,
        a.shake = l.final ? 1.6 : 1,
        a.cracks.push({
          seed: 1000 + a.cracks.length * 7919,
          big: l.final
        }),
        N.impact()
      ),
      l.t >= Te
    ) {
      let n = l.final;
      a.slam = null,
      n &&
      (
        a.phase = 'over',
        N.over(),
        de = ve.submit(a.score),
        Me(
          `Line shut down. Score ${ a.score }. ${ a.shipped } shipped.` + (de ? ' New best.' : ` Best ${ ve.value() }.`)
        )
      )
    }
    return
  }
  if (a.phase === 'over') return;
  a.shiftT += t,
  a.runT += t,
  a.shiftT >= Bt &&
  a.shiftIdx < $.length - 1 &&
  (
    a.shiftT = 0,
    a.shiftIdx += 1,
    a.shiftCard = 2,
    N.shift(),
    Me(`Shift ${ a.shiftIdx + 1 }: ${ $[a.shiftIdx].name }.`)
  );
  let e = me();
  e > xe &&
  N.combo(e),
  xe = e;
  let r = $[a.shiftIdx],
  o = Ze();
  a.beltX += o * t,
  a.spawnIn -= t;
  let i = a.items.reduce((l, n) => l + (n.pull ? 0 : 1), 0);
  a.spawnIn <= 0 &&
  i < 9 &&
  (a.spawnIn = r.every * (0.65 + Math.random() * 0.7), Kt());
  for (let l = a.items.length - 1; l >= 0; l -= 1) {
    let n = a.items[l];
    if (n.pull) {
      n.pull.t += t,
      n.pull.t >= et &&
      (ue(ke.x, 146, '#c39a4a'), a.items.splice(l, 1));
      continue
    }
    n.x += o * t,
    !(n.x < p + 6) &&
    (a.phase === 'playing' && Zt(n), a.items.splice(l, 1))
  }
}
function Zt(t) {
  let e = p - 20,
  r = t.y;
  if (t.item.clean) {
    let i = 25 * me();
    a.score += i,
    a.crate += 1,
    a.shipped += 1,
    N.ship(),
    a.combo += 1,
    a.bestCombo = Math.max(a.bestCombo, a.combo),
    H(e, r, `+${ i }`, '#8fe08a')
  } else a.combo = 0,
  ue(e + 8, r + 8, '#ff7a6e'),
  a.slam = {
    t: 0,
    hitHim: !1,
    cracked: !1,
    item: t.item,
    fromX: p - 14,
    fromY: r,
    final: a.suit >= 4
  }
}
function tt(t, e) {
  if (a.phase !== 'playing') {
    Ue(!1);
    return
  }
  a.hitAt = Ge;
  let r = - 1,
  o = 1000000000;
  for (let d = 0; d < a.items.length; d += 1) {
    let h = a.items[d];
    if (h.pull || h.x + 16 < J || h.x > p) continue;
    let u = h.x + 8,
    m = h.y + 8,
    R = Math.abs(u - t) + Math.abs(m - e);
    R < o &&
    Math.abs(u - t) < 13 &&
    Math.abs(m - e) < 13 &&
    (o = R, r = d)
  }
  if (r < 0) return;
  let i = a.items[r],
  l = i.x,
  n = i.y;
  if (i.item.clean) {
    a.score = Math.max(0, a.score - 150),
    a.combo = 0,
    N.wrong(),
    H(l, n, '-150', '#ff7a6e'),
    H(l, n - 7, 'that one was fine', '#ff9c8a'),
    a.flash = 0.5,
    i.x = Math.max(J, i.x - 12);
    return
  }
  let c = i.x < (p - J) / 3 + J,
  k = me(),
  s = (c ? 150 : 100) * k;
  a.score += s,
  a.combo += 1,
  a.bestCombo = Math.max(a.bestCombo, a.combo),
  N.pull(),
  c &&
  N.early(),
  H(l, n, `+${ s }`, '#8fe08a'),
  c &&
  H(l, n - 7, 'early', '#e8cf7a'),
  k > 1 &&
  H(l, n - 14, `x${ k }`, '#7ad2e8'),
  ue(l + 8, n + 8, '#c39a4a'),
  i.pull = {
    t: 0,
    x0: i.x,
    y0: n
  }
}
function er(t) {
  let e = Math.min(1, t.pull.t / et);
  return {
    x: t.pull.x0 + (ke.x - 8 - t.pull.x0) * e,
    y: t.pull.y0 + (ke.y - t.pull.y0) * e - Math.sin(e * Math.PI) * 26
  }
}
function tr() {
  f.fillStyle = '#0d1115',
  f.fillRect(0, 0, y, K),
  f.fillStyle = '#2b343d',
  f.fillRect(0, K - 1, y, 1),
  M(f, 'score', 5, 4, '#5f6f7c'),
  M(f, String(a.score).padStart(6, '0'), 29, 4, '#e8eef4');
  let t = me();
  t > 1 &&
  M(f, `x${ t }`, 78, 4, '#7ad2e8'),
  M(f, 'school', 100, 4, '#5f6f7c'),
  f.fillStyle = '#1c2329',
  f.fillRect(128, 4, 62, 5);
  let e = Math.min(62, Math.round(a.crate / 40 * 62));
  g(f, 128, 4, Math.max(0, e), 5, '#8fe08a', '#3f8f52'),
  f.fillStyle = '#2b343d',
  f.fillRect(128, 4, 62, 1),
  M(f, $[a.shiftIdx].name, 200, 4, '#8d9aa5');
  for (let r = 0; r < 5; r += 1) {
    let o = y - 34 + r * 6;
    f.fillStyle = r < a.suit ? '#ff5a4a' : '#2b343d',
    f.fillRect(o, 4, 4, 5),
    f.fillStyle = '#0006',
    f.fillRect(o, 8, 4, 1)
  }
}
var C = 0.3,
X = 0.58,
Te = 0.95;
function rr(t) {
  return function () {
    t |= 0,
    t = t + 1831565813 | 0;
    let e = Math.imul(t ^ t >>> 15, 1 | t);
    return e = e + Math.imul(e ^ e >>> 7, 61 | e) ^ e,
    ((e ^ e >>> 14) >>> 0) / 4294967296
  }
}
function je(t, e, r, o, i) {
  e = Math.round(e),
  r = Math.round(r),
  o = Math.round(o),
  i = Math.round(i);
  let l = Math.abs(o - e),
  n = - Math.abs(i - r),
  c = e < o ? 1 : - 1,
  k = r < i ? 1 : - 1,
  s = l + n;
  for (; e >= 0 && e < y && r >= 0 && r < S && t.fillRect(e, r, 1, 1), !(e === o && r === i); ) {
    let d = 2 * s;
    d >= n &&
    (s += n, e += c),
    d <= l &&
    (s += l, r += k)
  }
}
function nr(t, e) {
  let r = rr(e.seed),
  o = 34 + r() * (y - 68),
  i = 24 + r() * (S - 60),
  l = e.big ? 11 : 7;
  for (let n = 0; n < l; n += 1) {
    let c = n / l * Math.PI * 2 + r() * 0.7,
    k = o,
    s = i,
    d = (e.big ? 55 : 30) + r() * (e.big ? 90 : 60),
    h = 0;
    for (; h < d; ) {
      let u = 3 + r() * 6,
      m = k + Math.cos(c) * u,
      R = s + Math.sin(c) * u;
      t.fillStyle = '#0a0d11cc',
      je(t, k + 1, s + 1, m + 1, R + 1),
      t.fillStyle = '#cfe2f0aa',
      je(t, k, s, m, R),
      k = m,
      s = R,
      h += u,
      c += (r() - 0.5) * 0.8
    }
  }
  t.fillStyle = '#eaf4ff',
  t.fillRect(Math.round(o) - 1, Math.round(i) - 1, 3, 3)
}
function lr() {
  for (let t of a.cracks) nr(f, t)
}
function or(t, e, r, o) {
  let i = o / 12,
  l = (n, c, k, s, d) => {
    t.fillStyle = d,
    t.fillRect(
      Math.round(e + n * i),
      Math.round(r + c * i),
      Math.ceil(k * i),
      Math.ceil(s * i)
    )
  };
  l( - 6, - 6, 12, 12, x),
  l( - 5, - 5, 10, 10, B.glove[2]),
  l( - 5, - 5, 10, 3, B.glove[3]),
  l( - 5, - 5, 10, 1, B.glove[4]);
  for (let n = 0; n < 4; n += 1) l( - 5 + n * 2.5, - 2, 1, 3, B.glove[0]);
  l( - 6, 0, 2, 5, x),
  l( - 5.5, 0.5, 1.5, 4, B.glove[1])
}
function ir() {
  let t = a.slam;
  if (!t) return [0,
  0];
  let e = t.t;
  return e < C ? [
    0,
    0
  ] : e < C + 0.12 ? [
    0,
    Math.round( - 3 * ((e - C) / 0.12))
  ] : e < X ? [
    Math.round( - 4 + 11 * ((e - C - 0.12) / (X - C - 0.12))),
    1
  ] : [
    Math.round(5 * (1 - (e - X) / (Te - X))),
    1
  ]
}
function rt() {
  let t = a.slam;
  if (!t || t.t < C) return null;
  let e = Te - C,
  r = (t.t - C) / e,
  o = (X - C) / e;
  if (r < 0.16) return null;
  let i = r < o ? 10 + ((r - 0.16) / (o - 0.16)) **2 * 150 : 160 - (r - o) / (1 - o) * 150,
  l = Math.min(1, Math.max(0, (i - 14) / 146));
  return {
    size: Math.max(6, i),
    cx: a.gloveX + (y / 2 - a.gloveX) * l,
    cy: a.gloveY + (W / 2 + 4 - a.gloveY) * l,
    k: r,
    hit: o
  }
}
function ar(t) {
  let e = a.slam;
  if (!e) return;
  if (e.t < C) {
    let o = e.t / C,
    i = fe + E / 2 - 8,
    l = Oe + 16,
    n = e.fromX + (i - e.fromX) * o,
    c = e.fromY + (l - e.fromY) * o - Math.sin(o * Math.PI) * 20;
    f.fillStyle = 'rgba(255,122,110,0.25)',
    f.fillRect(Math.round(n) + 6, Math.round(c) + 6, 4, 4),
    Z(f, e.item, t, Math.round(n), Math.round(c), o * 9);
    return
  }
  let r = rt();
  r &&
  (
    f.fillStyle = `rgba(0,0,0,${ 0.34 * Math.min(1, r.size / 120) })`,
    f.fillRect(0, 0, y, W - 12),
    or(f, r.cx, r.cy, r.size),
    e.cracked &&
    r.k < r.hit + 0.12 &&
    (
      f.globalAlpha = 1 - (r.k - r.hit) / 0.12,
      f.fillStyle = '#ffffff',
      f.fillRect(0, 0, y, S),
      f.globalAlpha = 1
    )
  )
}
function cr() {
  for (let t of q) {
    if (t.spark) {
      f.globalAlpha = Math.max(0, 1 - t.t / 0.5),
      f.fillStyle = t.col,
      f.fillRect(Math.round(t.x), Math.round(t.y), 2, 2),
      f.globalAlpha = 1;
      continue
    }
    let e = t.t / 0.9,
    r = T(t.msg),
    o = Math.round(t.x + 8 - r / 2),
    i = Math.round(t.y - 2 - e * 10);
    o = Math.max(2, Math.min(y - r - 2, o)),
    i = Math.max(W + 2, Math.min(w - 8, i));
    let l = Math.max(0, 1 - e * e);
    f.globalAlpha = l,
    f.fillStyle = '#0a0d10e0',
    f.fillRect(o - 2, i - 2, r + 4, 9),
    f.fillStyle = t.col,
    f.fillRect(o - 2, i - 2, r + 4, 1),
    f.fillRect(o - 2, i + 6, r + 4, 1),
    M(f, t.msg, o, i, t.col, !1),
    f.globalAlpha = 1
  }
}
var kr = te.filter(t => t.clean),
sr = te.filter(t => !t.clean);
function fr(t, e, r, o) {
  let i = document.createElement('canvas');
  i.width = T(t) + 2,
  i.height = 8;
  let l = i.getContext('2d');
  l.imageSmoothingEnabled = !1,
  M(l, t, 0, 1, o),
  f.drawImage(i, e, r, i.width * 2, i.height * 2)
}
var ge = [
  ['seedoil',
  'slick',
  'seed oil'],
  [
    'cereal',
    'dye',
    'colouring'
  ],
  [
    'whitecandy',
    'dust',
    'additives'
  ],
  [
    'candybar',
    'foil',
    'sealed'
  ]
];
function Xe(t, e, r, o) {
  M(f, t, Math.round((y - T(t)) / 2), e, r, o)
}
function dr(t) {
  f.fillStyle = '#080b0eee',
  f.fillRect(0, 0, y, S),
  f.fillStyle = '#080b0e99',
  f.fillRect(0, 0, y, W - 12),
  fr(
    'supply line',
    Math.round((y - T('supply line') * 2) / 2),
    8,
    '#f0e6cf'
  ),
  Xe('bare rides. treated comes off.', 28, '#e8cf7a');
  let e = [
    [10,
    'let it ride',
    '#8fe08a',
    kr],
    [
      168,
      'knock it off',
      '#ff7a6e',
      sr
    ]
  ];
  for (let[n,
  c,
  k,
  s]of e) {
    f.fillStyle = k,
    f.fillRect(n, 42, 142, 1),
    M(f, c, n, 46, k);
    for (let d = 0; d < s.length; d += 1) {
      let h = n + d % 8 * 18,
      u = 56 + (d / 8 | 0) * 18;
      f.fillStyle = '#ffffff0e',
      f.fillRect(h, u, 17, 18),
      Z(f, s[d], t, h + 1, u + 1, 0)
    }
  }
  let r = 46,
  o = 14,
  i = ge.length * r + (ge.length - 1) * o,
  l = Math.round((y - i) / 2);
  f.fillStyle = '#3d4750',
  f.fillRect(l, 114, i, 1);
  for (let[n,
  ,
  c]of ge) f.fillStyle = '#ffffff0e',
  f.fillRect(l, 120, 17, 18),
  Z(f, Pe[n], t, l + 1, 121, 0),
  M(f, c, l + 21, 126, '#98a4ae', !1),
  l += r + o;
  f.fillStyle = '#080b0e',
  f.fillRect(0, S - 16, y, 16),
  f.fillStyle = '#2b343d',
  f.fillRect(0, S - 16, y, 1),
  Xe(
    'click or press space to start',
    S - 10,
    t % 1.2 < 0.85 ? '#f0e6cf' : '#6c7883'
  )
}
function ur() {
  f.fillStyle = '#080b0ee0',
  f.fillRect(0, W - 12, y, S - W + 12),
  f.fillStyle = '#080b0e70',
  f.fillRect(0, 0, y, W - 12);
  let t = a.seen ? Math.round(a.treated / a.seen * 100) : 0,
  e = a.crate >= 34 ? 'prime' : a.crate >= 26 ? 'choice' : a.crate >= 18 ? 'select' : a.crate >= 10 ? 'standard' : 'utility',
  r = [
    ['line shut down',
    '#ff7a6e',
    2],
    [
      `score ${ a.score }`,
      '#e8eef4',
      1
    ],
    [
      `shipped ${ a.shipped }   best x${ a.bestCombo }`,
      '#8d9aa5',
      1
    ],
    [
      de ? 'new best score' : `best ${ ve.value() }`,
      de ? '#8fe08a' : '#6c7883',
      1
    ],
    [
      `${ t }% of your line was treated`,
      '#e8cf7a',
      1
    ],
    [
      `grade  ${ e }`,
      '#8fe08a',
      2
    ],
    [
      'click to run it again',
      '#5f6f7c',
      1
    ]
  ],
  o = W - 4;
  for (let[i,
  l,
  n]of r) {
    let c = T(i) * n;
    if (n === 1) M(f, i, Math.round((y - c) / 2), o, l);
     else {
      let k = document.createElement('canvas');
      k.width = T(i) + 2,
      k.height = 8;
      let s = k.getContext('2d');
      s.imageSmoothingEnabled = !1,
      M(s, i, 0, 1, l),
      f.drawImage(k, Math.round((y - c) / 2), o - 2, k.width * 2, k.height * 2)
    }
    o += n === 2 ? 20 : 12
  }
}
var Ge = 0;
function mr(t) {
  f.fillStyle = '#0b0e11',
  f.fillRect(0, 0, y, S),
  f.drawImage(Dt, 0, 0);
  let[e,
  r] = ir(),
  o = fe + e,
  i = Oe + r + (a.slam ? 0 : Math.sin(t * 1.6) > 0.75 ? - 1 : 0);
  f.drawImage(Pt(a.suit), o, i);
  let l = a.slam ? 1 : Math.max( - 1, Math.min(1, Math.round((a.px - (fe + E / 2)) / 70)));
  It(f, o, i, a.slam ? 3 : Et(), l, !a.slam && t % 4.3 > 4.16),
  Ut(f, o, i, a.suit, t);
  let n = ie ? 0 : Math.round(Math.sin(t * 2.6) * 1.4),
  c = ie ? 0 : Math.round(Math.sin(t * 1.3) * 1.2),
  k = i + 12 + n,
  s = 6 + c;
  f.drawImage(De, o + s, k),
  a.gloveX = o + E - s - 7,
  a.gloveY = k - n * 2 + 7;
  let d = rt();
  (!d || d.size < 32) &&
  (
    f.save(),
    f.translate(o + E - s, k - n * 2),
    f.scale( - 1, 1),
    f.drawImage(De, 0, 0),
    f.restore()
  ),
  g(f, 0, W, y, w - W, '#4b555f', '#2a3138');
  let h = a.beltX % 14;
  for (let u = - 14 + h; u < y; u += 14) {
    let m = Math.round(u);
    f.fillStyle = '#0000002e',
    f.fillRect(m, W, 1, w - W),
    f.fillStyle = '#ffffff10',
    f.fillRect(m + 1, W, 1, w - W)
  }
  f.fillStyle = '#0009',
  f.fillRect(0, W, y, 2),
  f.fillStyle = '#7d8b97',
  f.fillRect(0, W - 1, y, 1);
  for (let u of a.items) {
    if (u.pull) continue;
    let m = Math.round(u.x),
    R = u.y,
    Y = (R - ae) / (Le - ae);
    f.fillStyle = Y > 0.5 ? '#0000004d' : '#00000038',
    f.fillRect(m + 2, R + 15, 12, 2),
    f.fillStyle = '#00000026',
    f.fillRect(m + 1 - Math.round(Y), R + 16, 14 + Math.round(Y * 2), 1)
  }
  for (let u of a.items) u.pull ||
  Z(f, u.item, t, Math.round(u.x), u.y, u.rot);
  f.drawImage(jt, 0, 0);
  for (let u of a.items) {
    if (!u.pull) continue;
    let m = er(u);
    Z(f, u.item, t, Math.round(m.x), Math.round(m.y), u.rot + u.pull.t * 6)
  }
  if (a.px > - 50) {
    let u = t - a.hitAt < 0.13;
    f.fillStyle = '#00000038',
    f.fillRect(Math.round(a.px) - 1, Math.round(a.py) + 9, 10, 2),
    f.drawImage(u ? Nt : At, Math.round(a.px) - 4, Math.round(a.py) - (u ? 3 : 5))
  }
  if (ar(t), cr(), a.shiftCard > 0 && a.phase === 'playing') {
    let u = Math.min(1, a.shiftCard);
    f.globalAlpha = u;
    let m = $[a.shiftIdx].name,
    R = T(m);
    f.fillStyle = '#0b0e11cc',
    f.fillRect(0, 60, y, 14),
    M(f, m, Math.round((y - R) / 2), 64, '#e8cf7a'),
    f.globalAlpha = 1
  }
  a.flash > 0 &&
  (
    f.fillStyle = `rgba(${ a.flashCol[0] },${ a.flashCol[1] },${ a.flashCol[2] },${ a.flash * 0.28 })`,
    f.fillRect(0, 0, y, S)
  ),
  f.drawImage(Xt, 0, 0),
  tr(),
  lr(),
  a.phase === 'intro' ? dr(t) : a.phase === 'over' &&
  ur()
}
var re = document.createElement('div');
re.setAttribute('role', 'status');
re.setAttribute('aria-live', 'polite');
re.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap';
document.body.appendChild(re);
var Me = t => {
  re.textContent = t
};
function hr() {
  let t = null,
  e = null,
  r = null,
  o = !1;
  return {
    start() {
      if (o) return;
      let i = Re();
      if (!i) return;
      o = !0,
      t = i.createOscillator(),
      e = i.createOscillator(),
      r = i.createGain();
      let l = i.createBiquadFilter();
      l.type = 'lowpass',
      l.frequency.value = 300,
      t.type = 'sawtooth',
      e.type = 'sine',
      r.gain.value = 0,
      t.connect(l),
      e.connect(l),
      l.connect(r).connect(i.destination),
      t.start(),
      e.start()
    },
    update(i, l) {
      if (!o) return;
      let n = Re();
      if (!n) return;
      let c = n.currentTime;
      r.gain.setTargetAtTime(V() || !l ? 0 : 0.05, c, 0.25),
      t.frequency.setTargetAtTime(44 + i * 0.42, c, 0.4),
      e.frequency.setTargetAtTime(22 + i * 0.21, c, 0.4)
    }
  }
}
var nt = hr(),
N = {
  pull() {
    L({
      freq: 430,
      endFreq: 140,
      duration: 0.09,
      gain: 0.05
    }),
    oe(0.05, 0.045)
  },
  early() {
    L({
      freq: 680,
      endFreq: 900,
      duration: 0.07,
      gain: 0.035
    })
  },
  ship() {
    L({
      freq: 185,
      endFreq: 120,
      duration: 0.11,
      type: 'triangle',
      gain: 0.055
    })
  },
  wrong() {
    L({
      freq: 210,
      endFreq: 85,
      duration: 0.3,
      type: 'sawtooth',
      gain: 0.045
    })
  },
  thud() {
    oe(0.16, 0.1),
    L({
      freq: 92,
      endFreq: 44,
      duration: 0.24,
      type: 'sine',
      gain: 0.09
    })
  },
  impact() {
    oe(0.32, 0.13),
    L({
      freq: 68,
      endFreq: 30,
      duration: 0.42,
      type: 'sine',
      gain: 0.11
    })
  },
  shift() {
    L({
      freq: 330,
      duration: 0.09,
      gain: 0.04
    }),
    setTimeout(() => L({
      freq: 494,
      duration: 0.13,
      gain: 0.04
    }), 95)
  },
  combo(t) {
    L({
      freq: 460 + t * 130,
      duration: 0.08,
      gain: 0.035
    })
  },
  over() {
    [
      440,
      330,
      247,
      165
    ].forEach(
      (t, e) => setTimeout(() => L({
        freq: t,
        duration: 0.24,
        type: 'triangle',
        gain: 0.06
      }), e * 135)
    )
  }
},
lt = document.getElementById('game'),
ne = Ie(
  lt,
  {
    width: y,
    height: S,
    background: '#0b0e11',
    backdropTile: Ne(),
    integerScale: !0
  }
),
f = ne.ctx;
f.imageSmoothingEnabled = !1;
ne.canvas.style.cursor = 'none';
var Ce = qe({
  music: nt
}),
le = lt.querySelector('canvas');
le.style.cursor = 'none';
le.style.touchAction = 'none';
le.addEventListener(
  'pointermove',
  t => {
    let e = ne.toGame(t.clientX, t.clientY);
    a.px = e.x,
    a.py = e.y
  }
);
le.addEventListener('pointerleave', () => {
  a.px = - 99,
  a.py = - 99
});
le.addEventListener(
  'pointerdown',
  t => {
    Ce.startMusicOnce();
    let e = ne.toGame(t.clientX, t.clientY);
    a.px = e.x,
    a.py = e.y,
    tt(e.x, e.y)
  }
);
var ee = new Set,
ot = {
  arrowleft: [
    - 1,
    0
  ],
  a: [
    - 1,
    0
  ],
  arrowright: [
    1,
    0
  ],
  d: [
    1,
    0
  ],
  arrowup: [
    0,
    - 1
  ],
  w: [
    0,
    - 1
  ],
  arrowdown: [
    0,
    1
  ],
  s: [
    0,
    1
  ]
};
window.addEventListener(
  'keydown',
  t => {
    Ce.startMusicOnce();
    let e = t.key.toLowerCase();
    if (e === 'r') {
      Ue(!0);
      return
    }
    if (ot[e]) {
      a.px < - 50 &&
      (a.px = y / 2, a.py = ce),
      ee.add(e),
      t.preventDefault();
      return
    }
    if (e === 'm') {
      Ce.toggle();
      return
    }(e === ' ' || e === 'enter') &&
    (a.px > - 50 && tt(a.px, a.py), t.preventDefault())
  }
);
window.addEventListener('keyup', t => ee.delete(t.key.toLowerCase()));
window.addEventListener('blur', () => ee.clear());
function yr(t) {
  if (!ee.size) return;
  let e = 0,
  r = 0;
  for (let i of ee) {
    let l = ot[i];
    l &&
    (e += l[0], r += l[1])
  }
  if (!e && !r) return;
  let o = 150;
  a.px = Math.max(2, Math.min(y - 2, a.px + e * o * t)),
  a.py = Math.max(W, Math.min(w, a.py + r * o * t))
}
var ze = performance.now();
function it(t) {
  let e = Math.min(0.05, (t - ze) / 1000);
  ze = t,
  Ge += e,
  yr(e),
  Qt(e),
  nt.update(Ze(), a.phase === 'playing' && !a.slam),
  mr(Ge);
  let r = a.shake;
  ne.present(r > 0 ? (Math.random() - 0.5) * 6 * r : 0, r > 0 ? (Math.random() - 0.5) * 6 * r : 0),
  requestAnimationFrame(it)
}
Ue(!0);
requestAnimationFrame(it);
