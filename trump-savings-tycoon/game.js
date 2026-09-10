function _l(l, e = {}) {
  let n = e.width ?? 256,
  t = e.height ?? 224,
  o = e.background === null ? null : e.background ?? '#000',
  r = e.backdropTile ?? null,
  k = e.presentation === 'smooth',
  s = Number(e.maxBackingScale ?? 2),
  a = Number.isFinite(s) ? Math.max(1, s) : 2,
  i = document.createElement('canvas');
  i.width = n,
  i.height = t;
  let d = i.getContext('2d');
  d.imageSmoothingEnabled = k;
  let c = document.createElement('canvas');
  c.className = k ? 'pixel-screen smooth-screen' : 'pixel-screen';
  let f = c.getContext('2d');
  f.imageSmoothingEnabled = k,
  l.appendChild(c);
  let w = 1,
  b = 0,
  m = 0,
  p = null,
  E = 0.15;
  function M(v) {
    if (v < 1) return v;
    let L = Math.floor(v);
    return v - L < E ? L : v
  }
  function S() {
    let v = l.getBoundingClientRect(),
    L = window.devicePixelRatio ||
    1,
    _ = Math.max(1, Math.floor(v.width * L)),
    q = Math.max(1, Math.floor(v.height * L));
    if (w = M(Math.min(_ / n, q / t)), k) {
      let al = Math.min(a, Math.max(1, w)),
      Q = Math.max(n, Math.round(n * al)),
      pl = Math.max(t, Math.round(t * al));
      (i.width !== Q || i.height !== pl) &&
      (i.width = Q, i.height = pl),
      d.setTransform(Q / n, 0, 0, pl / t, 0, 0),
      d.imageSmoothingEnabled = !0
    }
    c.width = _,
    c.height = q,
    c.style.width = `${ v.width }px`,
    c.style.height = `${ v.height }px`,
    f.imageSmoothingEnabled = k,
    b = Math.max(0, Math.floor((_ - n * w) / 2)),
    m = Math.max(0, Math.floor((q - t * w) / 2))
  }
  function I(v = 0, L = 0) {
    o ? (f.fillStyle = o, f.fillRect(0, 0, c.width, c.height)) : f.clearRect(0, 0, c.width, c.height),
    r &&
    (
      p ||
      (p = f.createPattern(r, 'repeat')),
      p &&
      (f.fillStyle = p, f.fillRect(0, 0, c.width, c.height))
    ),
    f.drawImage(i, b + Math.round(v) * w, m + Math.round(L) * w, n * w, t * w)
  }
  function kl(v, L) {
    let _ = c.getBoundingClientRect(),
    q = window.devicePixelRatio ||
    1,
    al = (v - _.left) * q,
    Q = (L - _.top) * q;
    return {
      x: (al - b) / w,
      y: (Q - m) / w
    }
  }
  return S(),
  typeof ResizeObserver == 'function' ? new ResizeObserver(S).observe(l) : window.addEventListener('resize', S),
  {
    canvas: i,
    ctx: d,
    width: n,
    height: t,
    present: I,
    toGame: kl
  }
}
var Ie = new Set(
  ['w',
  'a',
  's',
  'd',
  'arrowup',
  'arrowleft',
  'arrowdown',
  'arrowright']
);
function Nl(l, e, n = {}) {
  let t = {
    x: 0,
    y: 0
  },
  o = [],
  r = !1,
  k = [],
  s = n.cursor ?? null,
  a = new Set,
  i = typeof window > 'u' ? null : window;
  function d() {
    return s !== null &&
    (s.active ? s.active() : !0)
  }
  function c(M) {
    let S = String(M.key).toLowerCase();
    Ie.has(S) &&
    d() &&
    (a.add(S), M.preventDefault?.())
  }
  function f(M) {
    a.delete(String(M.key).toLowerCase())
  }
  function w() {
    a.clear()
  }
  function b(M, S) {
    let I = s.bounds;
    return {
      x: Math.max(I.x0, Math.min(I.x1, M)),
      y: Math.max(I.y0, Math.min(I.y1, S))
    }
  }
  function m(M) {
    let S = e.toGame(M.clientX, M.clientY);
    t.x = S.x,
    t.y = S.y,
    r &&
    k.push({
      x: S.x,
      y: S.y
    })
  }
  function p() {
    r = !1
  }
  function E(M) {
    if (M.button !== 0) return;
    M.preventDefault();
    let S = e.toGame(M.clientX, M.clientY);
    t.x = S.x,
    t.y = S.y,
    o.push({
      x: S.x,
      y: S.y
    }),
    r = !0,
    k.push({
      x: S.x,
      y: S.y
    })
  }
  return l.addEventListener('pointermove', m, {
    passive: !0
  }),
  l.addEventListener('pointerdown', E),
  l.addEventListener('pointerup', p),
  l.addEventListener('pointercancel', p),
  l.addEventListener('contextmenu', M => M.preventDefault()),
  s &&
  (
    i?.addEventListener('keydown', c),
    i?.addEventListener('keyup', f),
    i?.addEventListener('blur', w)
  ),
  l.style.touchAction = 'none',
  {
    aim: t,
    get down() {
      return r
    },
    takeGrabs() {
      let M = o;
      return o = [],
      M
    },
    takeStroke() {
      let M = k;
      return k = [],
      M
    },
    stepCursor(M) {
      if (!d() || a.size === 0) return [];
      let S = 0,
      I = 0;
      if (
        (a.has('a') || a.has('arrowleft')) &&
        (S -= 1),
        (a.has('d') || a.has('arrowright')) &&
        (S += 1),
        (a.has('w') || a.has('arrowup')) &&
        (I -= 1),
        (a.has('s') || a.has('arrowdown')) &&
        (I += 1),
        S === 0 &&
        I === 0
      ) return [];
      let kl = Math.hypot(S, I),
      v = s.speed * (Number.isFinite(M) && M > 0 ? M : 0),
      L = b(t.x, t.y),
      _ = b(L.x + S / kl * v, L.y + I / kl * v);
      return t.x = _.x,
      t.y = _.y,
      [
        L,
        _
      ]
    },
    dispose() {
      l.removeEventListener('pointermove', m),
      l.removeEventListener('pointerdown', E),
      l.removeEventListener('pointerup', p),
      l.removeEventListener('pointercancel', p),
      i?.removeEventListener('keydown', c),
      i?.removeEventListener('keyup', f),
      i?.removeEventListener('blur', w),
      a.clear()
    }
  }
}
function y(l, e) {
  let n = l.length,
  t = n > 0 ? l[0].length : 0;
  for (let k of l) if (k.length !== t) throw new Error(
    `sprite rows must be equal length (expected ${ t }, got ${ k.length })`
  );
  let o = document.createElement('canvas');
  o.width = Math.max(1, t),
  o.height = Math.max(1, n);
  let r = o.getContext('2d');
  r.imageSmoothingEnabled = !1;
  for (let k = 0; k < n; k += 1) for (let s = 0; s < t; s += 1) {
    let a = l[k][s];
    if (a === '.' || a === ' ') continue;
    let i = e[a];
    i &&
    (r.fillStyle = i, r.fillRect(s, k, 1, 1))
  }
  return {
    width: t,
    height: n,
    image: o
  }
}
var $ = 16,
Gl = new WeakMap;
function Pe(l) {
  let e = Math.ceil(Math.sqrt(l.width**2 + l.height**2)) + 1,
  n = e + e % 2,
  t = [];
  for (let o = 0; o < $; o += 1) {
    let r = document.createElement('canvas');
    r.width = n,
    r.height = n;
    let k = r.getContext('2d');
    k.imageSmoothingEnabled = !1,
    k.translate(n / 2, n / 2),
    k.rotate(o / $ * Math.PI * 2),
    k.drawImage(l.image, - l.width / 2, - l.height / 2),
    t.push(r)
  }
  return t
}
function bl(l, e, n, t, o, r = !1) {
  if (Math.abs(o) < 0.0001) {
    T(l, e, n, t, r);
    return
  }
  let k = Gl.get(e);
  k ||
  (k = Pe(e), Gl.set(e, k));
  let s = Math.PI * 2 / $,
  a = (Math.round(o / s) % $ + $) % $;
  if (a === 0) {
    T(l, e, n, t, r);
    return
  }
  let i = k[a],
  d = Math.round(n + e.width / 2),
  c = Math.round(t + e.height / 2),
  f = i.width / 2;
  if (!r) {
    l.drawImage(i, Math.round(d - f), Math.round(c - f));
    return
  }
  l.save(),
  l.translate(d, c),
  l.scale( - 1, 1),
  l.drawImage(i, - f, - f),
  l.restore()
}
function T(l, e, n, t, o = !1) {
  let r = Math.floor(n),
  k = Math.floor(t);
  if (!o) {
    l.drawImage(e.image, r, k);
    return
  }
  l.save(),
  l.translate(r + e.width, k),
  l.scale( - 1, 1),
  l.drawImage(e.image, 0, 0),
  l.restore()
}
var _e = {
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
yl = new Map(Object.entries(_e));
function K(l, e = 1) {
  return l.length === 0 ? 0 : (l.length * 6 - 1) * e
}
var G = 7,
Ne = 32,
ml = new Map,
Bl = null;
function Ge() {
  return Bl ||
  (
    typeof document < 'u' &&
    typeof document.createElement == 'function' ? () => document.createElement('canvas') : null
  )
}
function Be(l, e) {
  let n = Ge();
  if (!n) return null;
  let t = n();
  if (!t || typeof t.getContext != 'function') return null;
  let o = [
    ...yl.keys()
  ],
  r = 5 * e,
  k = 7 * e;
  t.width = r * o.length,
  t.height = k;
  let s = t.getContext('2d');
  if (!s || typeof s.fillRect != 'function') return null;
  s.fillStyle = l;
  let a = new Map;
  for (let i = 0; i < o.length; i += 1) {
    let d = o[i],
    c = i * r;
    a.set(d, c);
    let f = yl.get(d);
    for (let w = 0; w < 7; w += 1) {
      let b = f[w];
      for (let m = 0; m < 5; m += 1) b[m] === '#' &&
      s.fillRect(c + m * e, w * e, e, e)
    }
  }
  return {
    canvas: t,
    offsets: a,
    gw: r,
    gh: k
  }
}
function He(l, e, n) {
  if (!Number.isInteger(n) || n < 1 || typeof l.drawImage != 'function') return null;
  let t = `${ n }|${ e }`,
  o = ml.get(t);
  if (o) return o;
  if (ml.size >= Ne) return null;
  let r = Be(e, n);
  return r &&
  ml.set(t, r),
  r
}
function B(l, e, n, t, o, r = 1) {
  l.fillStyle = o;
  let k = Math.round(n),
  s = Math.round(t),
  a = He(l, o, r);
  for (let i of String(e).toUpperCase()) {
    if (i === ' ') {
      k += 6 * r;
      continue
    }
    if (a) {
      let d = a.offsets.get(i);
      d !== void 0 &&
      l.drawImage(a.canvas, d, 0, a.gw, a.gh, k, s, a.gw, a.gh)
    } else {
      let d = yl.get(i);
      if (d) for (let c = 0; c < 7; c += 1) {
        let f = d[c];
        for (let w = 0; w < 5; w += 1) f[w] === '#' &&
        l.fillRect(k + w * r, s + c * r, r, r)
      }
    }
    k += 6 * r
  }
  return k
}
function P(l, e, n, t, o, r = 1) {
  B(l, e, Math.round(n - K(e, r) / 2), t, o, r)
}
function Hl({
  update: l,
  render: e,
  fps: n = 60
}) {
  let t = 1 / n,
  o = 1000 / n,
  r = performance.now(),
  k = 0,
  s = 0,
  a = !0;
  function i(d) {
    if (!a) return;
    s = requestAnimationFrame(i);
    let c = Math.min(Math.max(0, d - r), 250);
    for (r = d, k += c; k >= o; ) l(t),
    k -= o;
    e(k / o, c / 1000)
  }
  return s = requestAnimationFrame(i),
  {
    stop() {
      a = !1,
      cancelAnimationFrame(s)
    }
  }
}
var ll = null,
V = !1;
function Ml() {
  if (!ll) {
    let l = window.AudioContext ||
    window.webkitAudioContext;
    if (!l) return null;
    ll = new l
  }
  return ll.state === 'suspended' &&
  ll.resume(),
  ll
}
function C({
  freq: l,
  endFreq: e,
  duration: n = 0.1,
  type: t = 'square',
  gain: o = 0.05
}) {
  if (V) return;
  let r = Ml();
  if (!r) return;
  let k = r.createOscillator(),
  s = r.createGain(),
  a = r.currentTime;
  k.type = t,
  k.frequency.setValueAtTime(l, a),
  e &&
  k.frequency.exponentialRampToValueAtTime(Math.max(1, e), a + n),
  s.gain.setValueAtTime(o, a),
  s.gain.exponentialRampToValueAtTime(0.0001, a + n),
  k.connect(s).connect(r.destination),
  k.start(a),
  k.stop(a + n + 0.02)
}
function sl(l = 0.08, e = 0.08) {
  if (V) return;
  let n = Ml();
  if (!n) return;
  let t = Math.floor(n.sampleRate * l);
  if (!Number.isFinite(t) || t < 1) return;
  let o = n.createBuffer(1, t, n.sampleRate),
  r = o.getChannelData(0);
  for (let a = 0; a < t; a += 1) r[a] = (Math.random() * 2 - 1) * (1 - a / t);
  let k = n.createBufferSource(),
  s = n.createGain();
  s.gain.setValueAtTime(e, n.currentTime),
  k.buffer = o,
  k.connect(s).connect(n.destination),
  k.start()
}
function el() {
  return V
}
function Sl() {
  return Ml()
}
function Dl(l) {
  return V = l === void 0 ? !V : !!l,
  V
}
var Fl = {
  C: - 9,
  D: - 7,
  E: - 5,
  F: - 4,
  G: - 2,
  A: 0,
  B: 2
};
function Ul(l) {
  if (!l || l === '-') return 0;
  let e = l[0].toUpperCase();
  if (!(e in Fl)) return 0;
  let n = 1,
  t = Fl[e];
  l[n] === '#' ? (t += 1, n += 1) : l[n] === 'b' &&
  (t -= 1, n += 1);
  let o = Number(l.slice(n));
  return Number.isFinite(o) ? 440 * Math.pow(2, (t + (o - 4) * 12) / 12) : 0
}
var Wl = [
  ['D4',
  0.5],
  [
    'G4',
    1
  ],
  [
    'G4',
    0.5
  ],
  [
    'A4',
    0.5
  ],
  [
    'B4',
    0.5
  ],
  [
    'G4',
    1
  ],
  [
    'B4',
    0.5
  ],
  [
    'D5',
    1.5
  ],
  [
    '-',
    0.5
  ],
  [
    'D5',
    0.5
  ],
  [
    'C5',
    0.5
  ],
  [
    'B4',
    0.5
  ],
  [
    'A4',
    0.5
  ],
  [
    'G4',
    1
  ],
  [
    'D4',
    0.5
  ],
  [
    '-',
    0.5
  ],
  [
    'E4',
    0.5
  ],
  [
    'A4',
    1
  ],
  [
    'A4',
    0.5
  ],
  [
    'B4',
    0.5
  ],
  [
    'C5',
    0.5
  ],
  [
    'A4',
    1
  ],
  [
    'C5',
    0.5
  ],
  [
    'E5',
    1.5
  ],
  [
    '-',
    0.5
  ],
  [
    'E5',
    0.5
  ],
  [
    'D5',
    0.5
  ],
  [
    'C5',
    0.5
  ],
  [
    'B4',
    0.5
  ],
  [
    'A4',
    1
  ],
  [
    'D4',
    0.5
  ],
  [
    '-',
    0.5
  ],
  [
    'G4',
    0.5
  ],
  [
    'B4',
    0.5
  ],
  [
    'D5',
    0.5
  ],
  [
    'G5',
    1.5
  ],
  [
    'F#5',
    0.5
  ],
  [
    'E5',
    0.5
  ],
  [
    'D5',
    0.5
  ],
  [
    'C5',
    0.5
  ],
  [
    'B4',
    0.5
  ],
  [
    'A4',
    0.5
  ],
  [
    'B4',
    0.5
  ],
  [
    'G4',
    2
  ]
],
Yl = [
  ['G2',
  1],
  [
    'D3',
    1
  ],
  [
    'G2',
    1
  ],
  [
    'D3',
    1
  ],
  [
    'G2',
    1
  ],
  [
    'D3',
    1
  ],
  [
    'G2',
    1
  ],
  [
    'D3',
    1
  ],
  [
    'A2',
    1
  ],
  [
    'E3',
    1
  ],
  [
    'A2',
    1
  ],
  [
    'E3',
    1
  ],
  [
    'A2',
    1
  ],
  [
    'E3',
    1
  ],
  [
    'A2',
    1
  ],
  [
    'E3',
    1
  ],
  [
    'G2',
    1
  ],
  [
    'D3',
    1
  ],
  [
    'G2',
    1
  ],
  [
    'D3',
    1
  ],
  [
    'C3',
    1
  ],
  [
    'G3',
    1
  ],
  [
    'D3',
    1
  ],
  [
    'D3',
    1
  ]
],
De = 132,
tl = 60 / De,
Fe = 25,
Ue = 0.12;
function ql() {
  let l = null,
  e = 0,
  n = 0,
  t = 0,
  o = 0,
  r = 0,
  k = 0;
  function s(d, c, f, w, b, m) {
    if (c <= 0) return;
    let p = d.createOscillator(),
    E = d.createGain();
    p.type = b,
    p.frequency.setValueAtTime(c, f),
    E.gain.setValueAtTime(0.0001, f),
    E.gain.exponentialRampToValueAtTime(m, f + 0.012),
    E.gain.exponentialRampToValueAtTime(0.0001, f + w * 0.92),
    p.connect(E).connect(d.destination),
    p.start(f),
    p.stop(f + w)
  }
  function a(d, c) {
    let f = Math.floor(d.sampleRate * 0.06),
    w = d.createBuffer(1, f, d.sampleRate),
    b = w.getChannelData(0);
    for (let E = 0; E < f; E += 1) b[E] = (Math.random() * 2 - 1) * (1 - E / f);
    let m = d.createBufferSource(),
    p = d.createGain();
    p.gain.setValueAtTime(0.028, c),
    m.buffer = w,
    m.connect(p).connect(d.destination),
    m.start(c)
  }
  function i() {
    let d = Sl();
    if (d) {
      if (el()) {
        e = Math.max(e, d.currentTime);
        return
      }
      for (; e < d.currentTime + Ue; ) {
        if (t <= e + 0.000001) {
          let[c,
          f] = Wl[n % Wl.length];
          s(d, Ul(c), e, f * tl, 'square', 0.032),
          n += 1,
          t += f * tl
        }
        if (r <= e + 0.000001) {
          let[c,
          f] = Yl[o % Yl.length];
          s(d, Ul(c), e, f * tl * 0.9, 'triangle', 0.05),
          o += 1,
          r += f * tl
        }
        k % 2 === 1 &&
        a(d, e),
        k += 1,
        e += tl
      }
    }
  }
  return {
    start() {
      if (l !== null) return;
      let d = Sl();
      d &&
      (
        e = d.currentTime + 0.08,
        t = e,
        r = e,
        n = 0,
        o = 0,
        k = 0,
        l = setInterval(i, Fe),
        i()
      )
    },
    stop() {
      l !== null &&
      (clearInterval(l), l = null)
    },
    isPlaying() {
      return l !== null
    }
  }
}
function $l(l = {}) {
  let e = l.size ?? 96,
  n = l.colour ?? 'rgba(120, 150, 210, 0.085)',
  t = l.scale ?? 3,
  o = document.createElement('canvas');
  o.width = e,
  o.height = e;
  let r = o.getContext('2d');
  return r.imageSmoothingEnabled = !1,
  B(r, '45', 8, 10, n, t),
  B(r, '47', e - 40, e - 38, n, t),
  o
}
function Kl(l, e = 0) {
  try {
    let n = window.localStorage.getItem(l);
    if (n === null) return e;
    let t = Number(n);
    return Number.isFinite(t) ? t : e
  } catch {
    return e
  }
}
function Vl(l, e) {
  try {
    return window.localStorage.setItem(l, String(e)),
    !0
  } catch {
    return !1
  }
}
function Xl(l) {
  let e = `wh-games.${ l }.best`,
  n = Kl(e, 0);
  return {
    key: e,
    value() {
      return n
    },
    submit(t) {
      return !Number.isFinite(t) ||
      t <= n ? !1 : (n = t, Vl(e, n), !0)
    }
  }
}
function jl(l = {}) {
  let e = l.music ?? null,
  n = document.getElementById(l.buttonId ?? 'sound');
  new URLSearchParams(window.location.search).get('embed') === '1' &&
  document.body.classList.add('embed');
  let t = !1;
  function o() {
    t ||
    !e ||
    (t = !0, e.start())
  }
  function r() {
    if (!n) return;
    let s = el();
    n.setAttribute('aria-pressed', String(!s));
    let a = n.querySelector('.toggle-text');
    a &&
    (a.textContent = s ? 'Sound off' : 'Sound on')
  }
  function k() {
    let s = Dl();
    return r(),
    s ||
    o(),
    s
  }
  return n &&
  n.addEventListener('click', () => {
    o(),
    k()
  }),
  r(),
  {
    startMusicOnce: o,
    toggle: k,
    isMuted: el
  }
}
var We = 10,
zl = 12,
Ye = 12,
X = 5,
il = 10;
function El({
  lines: l = [],
  prompt: e,
  best: n,
  titleScale: t = 2
}) {
  let o = zl + G * t;
  return l.length > 0 &&
  (o += il + l.length * (G + X) - X),
  e &&
  (o += il + G),
  n &&
  (o += X + G),
  o + Ye
}
function Jl(l, e, n, t) {
  let {
    title: o,
    lines: r = [],
    prompt: k,
    best: s,
    titleScale: a = 2,
    fade: i = 1,
    top: d
  }
  = t;
  l.fillStyle = `rgba(8, 12, 20, ${ (0.72 * i).toFixed(3) })`,
  l.fillRect(0, 0, e, n);
  let c = Math.max(K(o, a), ...r.map(E => K(E)), k ? K(k) : 0, s ? K(s) : 0),
  f = Math.min(e - 8, c + We * 2 + 8),
  w = El({
    lines: r,
    prompt: k,
    best: s,
    titleScale: a
  }),
  b = Math.round((e - f) / 2),
  m = Math.round(d ?? (n - w) / 2);
  l.globalAlpha = i,
  l.fillStyle = '#0b1020',
  l.fillRect(b, m, f, w),
  l.fillStyle = '#18233f',
  l.fillRect(b + 1, m + 1, f - 2, w - 2),
  l.fillStyle = '#0d1326',
  l.fillRect(b + 3, m + 3, f - 6, w - 6),
  l.fillStyle = '#2c3a5e',
  l.fillRect(b + 1, m + 1, f - 2, 1),
  l.fillRect(b + 1, m + 1, 1, w - 2);
  let p = m + zl;
  for (let[E,
  M]of [
    [ - 1,
    0],
    [
      1,
      0
    ],
    [
      0,
      - 1
    ],
    [
      0,
      1
    ]
  ]) P(l, o, e / 2 + E, p + M, '#0b1020', a);
  if (P(l, o, e / 2, p, '#ffe680', a), p += G * a, r.length > 0) {
    p += il;
    for (let E of r) P(l, E, e / 2, p, '#9fb4c8'),
    p += G + X;
    p -= X
  }
  k &&
  (p += il, P(l, k, e / 2, p, '#ffe680'), p += G),
  s &&
  (p += X, P(l, s, e / 2, p, '#c9a227')),
  l.globalAlpha = 1
}
function Tl(l, e, n, t, o = {}) {
  let r = o.top ?? 78,
  k = o.height ?? 54;
  l.fillStyle = o.background ?? 'rgba(8, 12, 20, 0.82)',
  l.fillRect(0, r, e, k),
  P(l, n, e / 2, r + 8, o.titleColour ?? '#ffe680', 2),
  P(l, t, e / 2, r + 30, o.subtitleColour ?? '#e8edf5')
}
var qe = {
  k: '#2a1c0c',
  b: '#c8912f',
  d: '#9a6c1f',
  l: '#e8b957',
  g: '#f7d774',
  t: '#6b4a15'
},
$e = [
  '................',
  '.....kttttk.....',
  '....ktttttk.....',
  '...kkllllkk.....',
  '..klbbbbbblk....',
  '.klbbbggbbblk...',
  'klbbbggggbbblk..',
  'klbbbbggbbbbdk..',
  'klbbbggggbbbdk..',
  'klbbbbggbbbbdk..',
  '.klbbbbbbbbdk...',
  '..kkddddddkk....',
  '....kkkkkk......',
  '................'
],
Ke = {
  k: '#12301c',
  g: '#2f7a45',
  l: '#4aa564',
  d: '#1d5230',
  w: '#dff0e2'
},
Ve = [
  '................',
  '................',
  '..kkkkkkkkkkkk..',
  '.kgggggggggggk..',
  '.kglllllllllgk..',
  '.kglwwwwwwwlgk..',
  '.kglwgggggwlgk..',
  '.kglwwwwwwwlgk..',
  '.kglllllllllgk..',
  '.kgggggggggggk..',
  '.kdddddddddddk..',
  '..kkkkkkkkkkkk..',
  '................',
  '................'
],
Xe = {
  k: '#4a3305',
  g: '#d4a017',
  l: '#f5d97a',
  d: '#9c7410'
},
je = [
  '..............',
  '..............',
  '...kkkkkkkk...',
  '..klllllllk...',
  '.kllggggggllk.',
  'kggggggggggggk',
  'kgggggggggggdk',
  'kggggggggggddk',
  'kdddddddddddgk',
  '.kddddddddddk.',
  '..kkkkkkkkkk..',
  '..............'
],
ze = {
  k: '#0d3a4a',
  c: '#7fe8ff',
  w: '#ffffff',
  d: '#2aa8c8'
},
Je = [
  '..........',
  '..kkkkkk..',
  '.kcwccddk.',
  'kcwwcccddk',
  'kccccccddk',
  '.kcccdddk.',
  '..kccddk..',
  '...kcdk...',
  '....kk....',
  '..........'
],
Zl = {
  k: '#31394a',
  w: '#f4f7fb',
  b: '#2f5fa8',
  g: '#1f4a33'
},
Ze = [
  '....kk....................',
  '....kbk...................',
  '....kbk........kkkkk......',
  '...kkbkk......kwwwwwk.....',
  '..kwwwwwwwwwwwwwwwwwwwwk..',
  '.kwwwwwwwwwwwwwwwwwwwwwwwk',
  '.kbbbbbbbbbbbbbbbbbbbbbbk.',
  '..kkk..kwwwwk..kkk........',
  '.......kkkkkk.............'
],
Qe = [
  '..........................',
  '...kkkkkkkkkkkkkkkkkkk....',
  '..........k...............',
  '.......kwwwwwwwwk.........',
  '....kkggggggggggggk.......',
  'kkkkgggggggggggggggk......',
  '..kkggggggggggggggk.......',
  '.....kk......kk...........'
],
U = {
  k: '#1e2630',
  b: '#6b4a2a',
  w: '#f6f9fc',
  y: '#f2b32c',
  l: '#8a6134',
  h: '#5d3f21',
  g: '#d4a017',
  d: '#9c7410',
  p: '#e79ab8'
},
lt = {
  k: '#4a2a2a',
  r: '#9c4a3c',
  w: '#f0d9a8'
},
et = {
  p: '#f2a8c4',
  P: '#ffd0e2',
  k: '#3d2b1f',
  t: '#6b4a2f'
},
cl = {
  k: '#1b2530',
  r: '#c0392b',
  w: '#f4f7fb',
  b: '#2f5fa8'
},
tt = [
  '..kk...........kk..',
  '.kbbk.........kbbk.',
  'kbbbbk..www..kbbbbk',
  '.kbbbbkwwwwwkbbbbk.',
  '..kbbbbwwwwwbbbbk..',
  '...kbbbwwwwwbbbk...',
  '....kbbbwyywbbk....',
  '.....kbbbwwbbk.....',
  '......kkbbbkk......',
  '........kk.........'
],
nt = [
  'kk...............kk',
  'kbbk...........kbbk',
  '.kbbk..www....kbbk.',
  '..kbbkwwwww..kbbk..',
  '...kbbwwwwwbbbbk...',
  '....kbbwwwwwbbk....',
  '.....kbbwyywbk.....',
  '......kbbwwbk......',
  '.......kkbbkk......',
  '.........kk........'
],
ot = [
  '.....................',
  '..........www........',
  '.....kkkwwwwwkkk.....',
  '...kbbbbwwwwwbbbbk...',
  '..kbbbbbwyywbbbbbk...',
  '.kbbbk...ww...kbbbk..',
  'kbbk.....bb.....kbbk.',
  'kbk......bb......kbk.',
  '.k.......kk.......k..',
  '.....................'
],
rt = [
  '.....kkkk.....',
  '....k....k....',
  '..kkkkkkkkkk..',
  '.kllllllllllk.',
  '.klhhhhhhhhlk.',
  '.klhhkkkkhhlk.',
  '.klhhhhhhhhlk.',
  '.kllllllllllk.',
  '..kkkkkkkkkk..'
],
kt = [
  '..kkkkkkkkkk..',
  '.klllllllllk..',
  'kggggggggggggk',
  'kgggggggggggdk',
  'kdddddddddddgk',
  '.kkkkkkkkkkk..',
  '..kkkkkkkkkk..',
  '.klllllllllk..',
  'kggggggggggggk',
  'kdddddddddddgk',
  '.kkkkkkkkkkk..'
],
at = [
  'kkkkkkkkkkkkkk',
  'kwwwwwwwwwwwwk',
  'kwggggggggggwk',
  'kwgwwwwwwwwgwk',
  'kwgwyyyyyywgwk',
  'kwgwwwwwwwwgwk',
  'kwggggggggggwk',
  'kwwwwwwwwwwwwk',
  'kkkkkkkkkkkkkk'
],
st = [
  '....kkkk.....',
  '..kkppppkk...',
  '.kpppppppphk.',
  'kppwppppppphk',
  'kppppppppppk.',
  'kppppppppppk.',
  '.kppppppppk..',
  '..kkppppkk...',
  '...k.kk.k....'
],
it = [
  '..............................',
  '....kkkkkkkkkkkkkkkkkkkkkk....',
  '...klllllllllllllllllllllk....',
  '..kkkkkkkkkkkkkkkkkkkkkkkkk...',
  '..kslslslslslslslslslslslsk...',
  '..kslslslslslslslslslslslsk...',
  '..kslslslslslslslslslslslsk...',
  '..kslslslslslslslslslslslsk...',
  '..kllllllllllllllllllllllk....',
  '.kkkkkkkkkkkkkkkkkkkkkkkkkk...'
],
ct = [
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
  'klllllllllllllllllllllllllllllk.',
  'klwlwlwlwlwlwlwlwlwlwlwlwlwlwlk.',
  'kllllllllllllllllllllllllllllllk',
  'klwlwlwlwlwlwlwlwlwlwlwlwlwlwlk.',
  'kllllllllllllllllllllllllllllllk',
  'klwlwlwlwlwlwlwlwlwlwlwlwlwlwlk.',
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk'
],
dt = [
  '..r.............r..',
  '.krk...........krk.',
  '.krk...krrrk...krk.',
  'krrrk.krrrrrk.krrrk',
  'krrrk.krrrrrk.krrrk',
  'krrrkkrrrrrrrkkrrrk',
  'krrrkrrrrrrrrrkrrrk',
  'krwrkrrwrrrwrrkrwrk',
  'krrrrrrrrrrrrrrrrrk',
  'krwrrrwrrrwrrrwrrrk',
  'kkkkkkkkkkkkkkkkkkk'
],
ft = [
  '...ppppp....',
  '..ppPppPpp..',
  '.pPppppppPp.',
  'ppppPppppppp',
  '.pppppPppp..',
  '..pppppppp..',
  '...ppPpp....',
  '....ktk.....',
  '....ktk.....',
  '...kkttkk...'
],
ut = [
  '..k..',
  '.krk.',
  'kwrwk',
  '.kbk.',
  '..k..'
],
wt = [
  '.k.k.',
  'kbkbk',
  '.kkk.'
],
gt = [
  '.k.',
  'kkk',
  '.k.',
  'k.k'
],
ht = [
  '.kkkk.',
  'kwwwwk',
  'kkkkkk',
  '.k..k.'
],
N = {
  k: '#5c6474',
  s: '#c9cfdb',
  l: '#e6eaf2',
  d: '#9aa3b4',
  w: '#7b8496',
  g: '#4f7f5a'
},
pt = [
  '....ll....',
  '...llss...',
  '..lllsss..',
  '..lllsss..',
  '.llllssss.',
  'lllllsssss'
],
bt = [
  '..........ss..........',
  '..........ll..........',
  '.........kllk.........',
  '........klllllk.......',
  '.......kllllllsk......',
  '.......kllllllsk......',
  '......kslllllllsk.....',
  '......kslllllllsk.....',
  '.....kkslllllllskk....',
  '....kslllwllwllllsk...',
  '...ksllllllllllllsk...',
  '..kslllllllllllllssk..',
  '.kslwlwlwlwlwlwlwlssk.',
  'kkslllllllllllllllsdkk',
  'kslwlwlwlwlwlwlwlwlsdk',
  'kslllllllllllllllllsdk',
  'kkkkkkkkkkkkkkkkkkkkkk'
],
mt = {
  k: '#8a7f74',
  s: '#f2ece2',
  l: '#ffffff',
  d: '#d8cfc2',
  w: '#a8967f',
  g: '#c8a24a'
},
yt = [
  '.................................................g..................................................',
  '.................................................g..................................................',
  '................................................kllk................................................',
  '............................................kllllllllllk............................................',
  '........................................kllllllllllllllllllk........................................',
  '....................................kllllllllllllllllllllllllllk....................................',
  '................................kllllllllllllllllllllllllllllllllllk................................',
  '............................kllllllllllllllllllllllllllllllllllllllllllk............................',
  '...........................kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk...........................',
  '...........................kddddddddddddddddddddddddddddddddddddddddddddk...........................',
  'kkkkkkkkkkkkkkkkkkkkkkkk...ksllsllsllsllsllsllsllsllsllsllsllsllsllsllslk...kkkkkkkkkkkkkkkkkkkkkkkk',
  'kllllllllllllllllllllllk...ksllsllsllsllsllsllsllsllsllsllsllsllsllsllslk...kllllllllllllllllllllllk',
  'klwlwlwlwlwlwlwlwlwlwlwk...ksllsllsllsllsllsllsllsllsllsllsllsllsllsllslk...klwlwlwlwlwlwlwlwlwlwlwk',
  'kllllllllllllllllllllllk...ksllsllsllsllsllsllsllsllsllsllsllsllsllsllslk...kllllllllllllllllllllllk',
  'klwlwlwlwlwlwlwlwlwlwlwk...ksllsllsllsllsllsllsllsllsllsllsllsllsllsllslk...klwlwlwlwlwlwlwlwlwlwlwk',
  'kllllllllllllllllllllllk...ksllsllsllsllsllsllsllsllsllsllsllsllsllsllslk...kllllllllllllllllllllllk',
  'klwlwlwlwlwlwlwlwlwlwlwk...ksllsllsllsllsllsllsllsllsllsllsllsllsllsllslk...klwlwlwlwlwlwlwlwlwlwlwk',
  'kllllllllllllllllllllllk...ksllsllsllsllsllsllsllsllsllsllsllsllsllsllslk...kllllllllllllllllllllllk',
  'kddddddddddddddddddddddk...kllllllllllllllllllllllllllllllllllllllllllllk...kddddddddddddddddddddddk',
  'kkkkkkkkkkkkkkkkkkkkkkkk...kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk...kkkkkkkkkkkkkkkkkkkkkkkk'
],
Mt = [
  '..............l.............',
  '.............ll.............',
  '...........kkllkk...........',
  '..........klllllllk.........',
  '.........kllllllllsk........',
  '........kslllllllllsk.......',
  '........kslllllllllsk.......',
  '.......kkslllllllllskk......',
  '......kkkkkkkkkkkkkkkkk.....',
  '....kslslslslslslslslslsk...',
  '....kslslslslslslslslslsk...',
  '....kslslslslslslslslslsk...',
  '...kkkkkkkkkkkkkkkkkkkkkkk..',
  '..kdddddddddddddddddddddddk.',
  '.kdddddddddddddddddddddddddk'
],
St = [
  'kkkkkkkkkkkkkkkk',
  'kllllllllllllllk',
  'kdddddddddddddk.',
  'klwlwlwlwlwlwlk.',
  'klwlwlwlwlwlwlk.',
  'klwlwlwlwlwlwlk.',
  'klwlwlwlwlwlwlk.',
  'kllllllllllllllk',
  'kkkkkkkkkkkkkkkk'
],
Et = [
  'kkkkkkkkkkkk',
  'klllllllllk.',
  'klwlwlwlwlk.',
  'kllllllllllk',
  'klwlwlwlwlk.',
  'kllllllllllk',
  'klwlwlwlwlk.',
  'kkkkkkkkkkkk'
],
Tt = {
  d: '#1e5c2f',
  g: '#2f8f45',
  l: '#49b45f'
},
Rt = [
  '....l....l......',
  '...glg..glg.....',
  '..gglgg.gglgg...',
  '.dgggggdgggggd..',
  'ddddddddddddddd.'
],
xt = {
  k: '#243642',
  d: '#4d7286',
  w: '#eef5fa',
  g: '#8a6a3a',
  h: '#c08b3f'
},
vt = [
  '...kkkkkkkkk...............',
  '.kk.ddddddd.kk.............',
  'k..ddddddddd..k............',
  'k...ddddddd...k............',
  '.kk.........kkk............',
  '..kkkkkkkkkkk.gg...........',
  '..k.wwwwwww.k..gg..........',
  '..kw.w.w.w.wk...gg.........',
  '..k.w.w.w.w.k....gg........',
  '...kw.w.w.wk......gg.......',
  '...k.w.w.w.k.......gg......',
  '....kw.w.wk.........hhh....',
  '....k.w.w.k..........hhh...',
  '.....kw.wk............hhh..',
  '.....k.w.k.............hhh.',
  '......kwk...............hhh',
  '......kkk...............kkk'
],
Ql = N.l,
le = N.s,
Rl = [
  'eagleUp',
  'eagle',
  'eagleDown',
  'eagle'
],
ee = {
  moneybag: [
    '#f7d774',
    '#e8b957',
    '#c8912f',
    '#ffffff'
  ],
  cash: [
    '#4aa564',
    '#2f7a45',
    '#dff0e2',
    '#8fe0a4'
  ],
  gold: [
    '#f5d97a',
    '#d4a017',
    '#ffffff',
    '#9c7410'
  ],
  diamond: [
    '#ffffff',
    '#7fe8ff',
    '#2aa8c8',
    '#d8faff'
  ]
},
g = {};
function te() {
  g.moneybag = y($e, qe),
  g.cash = y(Ve, Ke),
  g.gold = y(je, Xe),
  g.diamond = y(Je, ze),
  g.eagle = y(tt, U),
  g.eagleUp = y(nt, U),
  g.eagleDown = y(ot, U),
  g.briefcase = y(rt, U),
  g.vault = y(kt, U),
  g.bond = y(at, U),
  g.piggy = y(st, U),
  g.treasury = y(it, N),
  g.bep = y(ct, N),
  g.castle = y(dt, lt),
  g.cherry = y(ft, et),
  g.kite = y(ut, cl),
  g.goose = y(wt, cl),
  g.tourist = y(gt, cl),
  g.car = y(ht, cl),
  g.airForceOne = y(Ze, Zl),
  g.marineOne = y(Qe, Zl),
  g.monumentCap = y(pt, N),
  g.capitol = y(bt, N),
  g.whiteHouse = y(yt, mt),
  g.jefferson = y(Mt, N),
  g.colonnade = y(St, N),
  g.fedBlock = y(Et, N),
  g.tuft = y(Rt, Tt),
  g.net = y(vt, xt)
}
var At = '#b22234',
Lt = '#ffffff',
Ct = '#3c3b6e';
function dl(l, e, n = 13) {
  let t = document.createElement('canvas');
  t.width = l,
  t.height = e;
  let o = t.getContext('2d');
  o.imageSmoothingEnabled = !1;
  for (let s = 0; s < n; s += 1) {
    let a = Math.round(s * e / n),
    i = Math.round((s + 1) * e / n);
    o.fillStyle = s % 2 === 0 ? At : Lt,
    o.fillRect(0, a, l, Math.max(1, i - a))
  }
  let r = Math.round(l * 0.4),
  k = Math.round(e * 7 / 13);
  o.fillStyle = Ct,
  o.fillRect(0, 0, r, k),
  o.fillStyle = '#ffffff';
  for (let s = 1; s < k - 1; s += 2) for (let a = 1; a < r - 1; a += 2) (a + s) / 2 % 2 < 1 &&
  o.fillRect(a, s, 1, 1);
  return t
}
function j(l, e, n, t, o, r, k, s = 0) {
  let a = Math.min(1, Math.max(0, s));
  l.globalAlpha = 1 - a * 0.45,
  l.fillStyle = '#d8dde6',
  l.fillRect(n, t, 1, o),
  l.fillStyle = '#f2c744',
  l.fillRect(n, t - 1, 1, 1);
  let i = e.width,
  d = e.height,
  c = 5 - a * 1.8,
  f = 2.4 - a * 1;
  for (let w = 0; w < i; w += 1) {
    let b = w / i,
    m = Math.sin(b * 5 - r * c + k) * b * f;
    l.drawImage(e, w, 0, 1, d, n + 1 + w, Math.round(t + 1 + m), 1, d)
  }
  l.globalAlpha = 1,
  a > 0 &&
  (
    l.fillStyle = `rgba(214, 178, 168, ${ (a * 0.34).toFixed(3) })`,
    l.fillRect(n + 1, t + 1 - Math.ceil(f), i, d + Math.ceil(f) * 2)
  )
}
var ne = [
  '#194f28',
  '#226b34',
  '#2c8440'
];
function re(l, e, n) {
  l.fillStyle = 'rgba(255, 190, 150, 0.16)',
  l.fillRect(0, n - 7, e, 7);
  for (let t = 0; t * 7 < e + 14; t += 1) {
    let o = t * 7 - 4,
    r = t % 3 === 0 ? 5 : t % 3 === 1 ? 3 : 4,
    k = ne[t % ne.length];
    l.fillStyle = 'rgba(10, 30, 16, 0.35)',
    l.fillRect(o, n - 1, 8, 3),
    l.fillStyle = k,
    l.fillRect(o + 1, n - r, 6, r + 1),
    l.fillRect(o + 2, n - r - 1, 4, 1)
  }
}
function fl(l, e, n, t) {
  l.fillStyle = 'rgba(12, 26, 18, 0.30)',
  l.fillRect(e - 3, t, n + 6, 3),
  l.fillStyle = 'rgba(12, 26, 18, 0.16)',
  l.fillRect(e - 6, t + 2, n + 12, 3)
}
function ke(l, e, n, t, o) {
  let r = '#e8b23a',
  k = '#a97c17',
  s = '#3a3f4a';
  l.fillStyle = r,
  l.fillRect(e - 5, t, 1, n - t),
  l.fillRect(e + 5, t, 1, n - t),
  l.fillStyle = k;
  for (let w = t; w < n; w += 5) l.fillRect(e - 5, w, 10, 1);
  let i = t + 3;
  l.fillStyle = r,
  l.fillRect(e - 20, i, 56, 1),
  l.fillRect(e - 20, i + 3, 56, 1),
  l.fillStyle = k;
  for (let w = e - 20; w < e + 36; w += 5) l.fillRect(w, i, 1, 4);
  l.fillStyle = '#6b7280',
  l.fillRect(e - 24, i, 5, 6),
  l.fillStyle = r,
  l.fillRect(e, t - 6, 1, 7),
  l.strokeStyle = s,
  l.lineWidth = 1,
  l.beginPath(),
  l.moveTo(e + 0.5, t - 6),
  l.lineTo(e + 34, i + 0.5),
  l.moveTo(e + 0.5, t - 6),
  l.lineTo(e - 22, i + 0.5),
  l.stroke();
  let d = e + 22 + Math.sin(o * 0.5) * 8,
  c = Math.sin(o * 0.9) * 3,
  f = i + 26;
  l.fillStyle = '#6b7280',
  l.fillRect(Math.round(d) - 2, i + 4, 5, 2),
  l.strokeStyle = s,
  l.beginPath(),
  l.moveTo(Math.round(d) + 0.5, i + 6),
  l.lineTo(Math.round(d + c) + 0.5, f),
  l.stroke(),
  l.fillStyle = '#9aa3b4',
  l.fillRect(Math.round(d + c) - 1, f, 3, 3)
}
function ae(l, e, n, t) {
  let o = n - t,
  r = t,
  k = 2,
  s = !0;
  for (; r < n; ) {
    let a = (r - t) / o,
    i = s ? [
      58,
      140,
      72
    ] : [
      43,
      112,
      58
    ],
    d = Math.round(i[0] * (0.72 + 0.28 * a)),
    c = Math.round(i[1] * (0.74 + 0.26 * a)),
    f = Math.round(i[2] * (0.76 + 0.24 * a));
    l.fillStyle = `rgb(${ d }, ${ c }, ${ f })`,
    l.fillRect(0, r, e, Math.min(k, n - r)),
    r += k,
    k = Math.min(k + 1, 9),
    s = !s
  }
  for (let a = 0; a < 150; a += 1) {
    let i = a * 71 % e,
    d = t + a * 37 % o,
    c = (d - t) / o;
    l.fillStyle = a % 3 === 0 ? 'rgba(120, 200, 130, 0.14)' : 'rgba(12, 50, 24, 0.14)',
    l.fillRect(i, d, 1 + (c > 0.6 ? 1 : 0), 1)
  }
  l.fillStyle = 'rgba(16, 56, 28, 0.55)',
  l.fillRect(0, t, e, 1)
}
function se(l, {
  x: e,
  y: n,
  w: t,
  h: o,
  t: r,
  monumentX: k,
  monumentW: s,
  sunX: a
}) {
  l.fillStyle = '#b9b3a6',
  l.fillRect(e - 2, n - 2, t + 4, o + 4),
  l.fillStyle = '#d6d0c2',
  l.fillRect(e - 2, n - 2, t + 4, 1),
  l.fillStyle = '#8e887c',
  l.fillRect(e - 2, n + o + 1, t + 4, 1);
  let i = l.createLinearGradient(0, n, 0, n + o);
  i.addColorStop(0, '#2c4f74'),
  i.addColorStop(0.45, '#3f6f9a'),
  i.addColorStop(1, '#5a92b8'),
  l.fillStyle = i,
  l.fillRect(e, n, t, o),
  l.fillStyle = 'rgba(232, 149, 111, 0.22)',
  l.fillRect(e, n + 1, t, Math.max(1, Math.floor(o * 0.35)));
  let d = c => Math.sin(r * 1.7 + c * 0.9) * 0.9;
  for (let c = 0; c < o - 1; c += 1) {
    let f = 0.42 * (1 - c / o);
    l.fillStyle = `rgba(232, 236, 244, ${ f.toFixed(3) })`,
    l.fillRect(Math.round(k + d(c)), n + 1 + c, s, 1)
  }
  if (a > e - 20 && a < e + t + 20) for (let c = 0; c < o; c += 1) {
    let f = 1 + c * 0.6,
    w = 0.3 * (1 - c / o);
    l.fillStyle = `rgba(255, 226, 170, ${ w.toFixed(3) })`,
    l.fillRect(Math.round(a - f + d(c) * 2), n + c, Math.round(f * 2), 1)
  }
  for (let c = 0; c < 9; c += 1) {
    let f = 4 + c % 3 * 3.5,
    w = 5 + c % 4 * 4,
    b = e + ((c * 23 + r * f) % (t + w) | 0) - w,
    m = n + 1 + c * 3 % (o - 2);
    l.fillStyle = c % 2 ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.12)',
    l.fillRect(Math.max(e, b), m, Math.min(w, e + t - Math.max(e, b)), 1)
  }
}
var Ot = [
  {
    dx: 0,
    dy: 3,
    w: 12,
    h: 4
  },
  {
    dx: 7,
    dy: 0,
    w: 14,
    h: 6
  },
  {
    dx: 17,
    dy: 2,
    w: 12,
    h: 5
  },
  {
    dx: 24,
    dy: 4,
    w: 9,
    h: 3
  }
],
oe = [
  {
    x: 10,
    y: 26,
    speed: 6.5,
    scale: 1.3,
    alpha: 0.5,
    bob: 1.2
  },
  {
    x: 96,
    y: 16,
    speed: 4.2,
    scale: 1,
    alpha: 0.42,
    bob: 0.9
  },
  {
    x: 170,
    y: 38,
    speed: 8,
    scale: 0.8,
    alpha: 0.34,
    bob: 1.5
  },
  {
    x: 220,
    y: 22,
    speed: 3.4,
    scale: 1.5,
    alpha: 0.3,
    bob: 0.7
  },
  {
    x: 58,
    y: 48,
    speed: 5.2,
    scale: 0.7,
    alpha: 0.26,
    bob: 1.1
  }
];
function ie(l, e, n) {
  for (let t = 0; t < oe.length; t += 1) {
    let o = oe[t],
    r = e + 80,
    k = ((o.x + n * o.speed) % r + r) % r - 40,
    s = o.y + Math.sin(n * 0.35 + t * 1.7) * o.bob;
    for (let a of Ot) {
      let i = Math.round(k + a.dx * o.scale),
      d = Math.round(s + a.dy * o.scale),
      c = Math.max(2, Math.round(a.w * o.scale)),
      f = Math.max(2, Math.round(a.h * o.scale));
      l.fillStyle = `rgba(226, 188, 196, ${ (o.alpha * 0.75).toFixed(3) })`,
      l.fillRect(i, d + 1, c, f),
      l.fillStyle = `rgba(255, 244, 232, ${ o.alpha.toFixed(3) })`,
      l.fillRect(i + 1, d, c - 2, f - 1)
    }
  }
}
var It = [
  {
    sprite: 'airForceOne',
    period: 46,
    offset: 6,
    cross: 15,
    y: 30,
    dir: 1,
    contrail: 34,
    rotor: !1
  },
  {
    sprite: 'marineOne',
    period: 63,
    offset: 31,
    cross: 11,
    y: 62,
    dir: - 1,
    contrail: 0,
    rotor: !0
  }
];
function ce(l, e, n, t, o) {
  for (let r of It) {
    let k = (o + r.offset) % r.period;
    if (k > r.cross) continue;
    let s = e[r.sprite];
    if (!s) continue;
    let a = t + 80,
    i = k / r.cross,
    d = r.dir > 0 ? - 40 + i * a : t + 40 - i * a,
    c = r.y + Math.sin(i * Math.PI) * - 3;
    if (r.contrail > 0) {
      let f = r.dir > 0 ? - 1 : 1;
      for (let w = 0; w < r.contrail; w += 1) {
        let b = 0.2 * (1 - w / r.contrail);
        l.fillStyle = `rgba(255, 255, 255, ${ b.toFixed(3) })`,
        l.fillRect(Math.round(d + (r.dir > 0 ? 0 : s.width) + f * w), Math.round(c + 5), 1, 1)
      }
    }
    if (n(l, s, d, c, r.dir < 0), r.rotor) {
      let f = Math.floor(o * 22) % 2 === 0 ? 11 : 7;
      l.fillStyle = 'rgba(230, 236, 245, 0.85)',
      l.fillRect(Math.round(d + s.width / 2 - f), Math.round(c + 1), f * 2, 1)
    }
  }
}
var Pt = [
  {
    x: 206,
    y: 50,
    len: 48,
    phase: 0,
    speed: 0.75
  }
];
function de(l, e, n, t, o) {
  let r = e.kite;
  if (r) for (let k of Pt) {
    let s = Math.sin(o * k.speed + k.phase) * 7,
    a = Math.cos(o * k.speed * 1.3 + k.phase) * 3,
    i = k.x + s,
    d = k.y + a;
    l.strokeStyle = 'rgba(240, 240, 245, 0.18)',
    l.lineWidth = 1,
    l.beginPath(),
    l.moveTo(Math.round(i) + 2.5, Math.round(d) + 5),
    l.quadraticCurveTo(
      Math.round(i) - s * 0.6,
      Math.round(d) + k.len * 0.6,
      Math.round(k.x) - 4.5,
      t - 2
    ),
    l.stroke(),
    n(l, r, i, d),
    l.fillStyle = '#c0392b';
    for (let c = 1; c <= 3; c += 1) l.fillRect(Math.round(i + 2 - s * 0.12 * c), Math.round(d + 4 + c * 3), 1, 2)
  }
}
function fe(l, e, n, t, o) {
  let s = o % 38;
  if (s > 13) return;
  let a = e.goose;
  if (!a) return;
  let i = - 30 + s / 13 * (t + 60),
  d = 24 + Math.sin(s * 0.5) * 3,
  c = [
    [0,
    0],
    [
      - 8,
      4
    ],
    [
      - 16,
      8
    ],
    [
      8,
      4
    ],
    [
      16,
      8
    ]
  ];
  for (let f = 0; f < c.length; f += 1) {
    let[w,
    b] = c[f],
    m = Math.sin(o * 9 + f * 0.7) > 0 ? 0 : 1;
    n(l, a, i + w, d + b + m)
  }
}
function ue(l, e, n, t, o) {
  let r = e.tourist;
  if (r) for (let k = 0; k < 14; k += 1) {
    let s = 8 + k * 53 % (t - 16),
    a = o + 3 + k * 7 % 9;
    n(l, r, s, a, k % 2 === 0)
  }
}
function we(l, e, n, t, o, r) {
  let a = r % 52;
  if (a > 9) return;
  let i = e.car;
  if (!i) return;
  let d = - 40 + a / 9 * (t + 80),
  c = o - 9;
  for (let f = 0; f < 5; f += 1) {
    let w = d - f * 9;
    n(l, i, w, c, !1),
    (f === 0 || f === 4) &&
    (
      l.fillStyle = Math.floor(r * 8) % 2 === 0 ? '#4f8ff0' : '#e04b4b',
      l.fillRect(Math.round(w) + 2, c - 1, 2, 1)
    )
  }
}
function ge(l, e, n) {
  let t = [
    {
      x: 0.28,
      delay: 0,
      hue: '#ffd166'
    },
    {
      x: 0.62,
      delay: 0.45,
      hue: '#ef476f'
    },
    {
      x: 0.45,
      delay: 0.9,
      hue: '#8ecae6'
    },
    {
      x: 0.78,
      delay: 1.35,
      hue: '#f4f7fb'
    },
    {
      x: 0.16,
      delay: 1.8,
      hue: '#ffd166'
    }
  ];
  for (let o of t) {
    let r = n - o.delay;
    if (r < 0 || r > 1.6) continue;
    let k = e * o.x,
    s = 42 + o.x * 18;
    if (r < 0.32) {
      let c = r / 0.32;
      l.fillStyle = 'rgba(255, 226, 170, 0.9)',
      l.fillRect(Math.round(k), Math.round(130 - (130 - s) * c), 1, 3);
      continue
    }
    let a = (r - 0.32) / 1.28,
    i = 3 + a * 26,
    d = Math.max(0, 1 - a);
    l.fillStyle = o.hue,
    l.globalAlpha = d;
    for (let c = 0; c < 16; c += 1) {
      let f = c / 16 * Math.PI * 2,
      w = k + Math.cos(f) * i,
      b = s + Math.sin(f) * i + a * a * 14;
      l.fillRect(Math.round(w), Math.round(b), 1, 1)
    }
    l.globalAlpha = 1
  }
}
var he = [];
for (let l = 0; l < 46; l += 1) he.push({
  x: 4 + l * 37 % 250,
  y: 158 + l * 13 % 12,
  phase: l % 7 * 0.9
});
function pe(l, e) {
  for (let n of he) {
    let t = 0.45 + 0.3 * Math.sin(e * 0.7 + n.phase);
    l.fillStyle = `rgba(255, 214, 130, ${ t.toFixed(3) })`,
    l.fillRect(n.x, n.y, 1, 1)
  }
}
var _t = [
  '#ffffff',
  '#c8c8c8',
  '#8a8a8a'
];
function be(l = {}) {
  let e = l.palettes ?? {
  },
  n = l.dust ?? ['#5d7a52',
  '#8a9c74'],
  t = [];
  function o(r) {
    return e[r] ?? _t
  }
  return {
    burst(r, k, s, a = 1) {
      let i = o(s),
      d = Math.round(14 * a);
      for (let c = 0; c < d; c += 1) {
        let f = c / d * Math.PI * 2 + Math.random() * 0.4,
        w = 26 + Math.random() * 54 * a;
        t.push({
          x: r,
          y: k,
          vx: Math.cos(f) * w,
          vy: Math.sin(f) * w - 22,
          life: 0.5 + Math.random() * 0.45,
          age: 0,
          colour: i[c % i.length],
          size: Math.random() < 0.28 ? 2 : 1
        })
      }
    },
    splat(r, k, s) {
      let a = o(s);
      for (let i = 0; i < 12; i += 1) {
        let d = - Math.PI + i / 12 * Math.PI,
        c = 30 + Math.random() * 46;
        t.push({
          x: r,
          y: k,
          vx: Math.cos(d) * c,
          vy: Math.sin(d) * c * 0.62,
          life: 0.4 + Math.random() * 0.4,
          age: 0,
          colour: a[i % a.length],
          size: 1
        })
      }
      for (let i = 0; i < 7; i += 1) t.push({
        x: r + (Math.random() - 0.5) * 10,
        y: k,
        vx: (Math.random() - 0.5) * 26,
        vy: - 8 - Math.random() * 18,
        life: 0.45 + Math.random() * 0.35,
        age: 0,
        colour: n[i % n.length],
        size: 1
      })
    },
    update(r) {
      for (let k of t) k.age += r,
      k.vy += 190 * r,
      k.x += k.vx * r,
      k.y += k.vy * r,
      k.vx *= 1 - 2.2 * r;
      t = t.filter(k => k.age < k.life)
    },
    draw(r) {
      for (let k of t) {
        let s = k.age / k.life;
        r.globalAlpha = s < 0.66 ? 1 : Math.max(0, 1 - (s - 0.66) / 0.34),
        r.fillStyle = k.colour,
        r.fillRect(Math.floor(k.x), Math.floor(k.y), k.size, k.size)
      }
      r.globalAlpha = 1
    },
    count() {
      return t.length
    },
    clear() {
      t = []
    }
  }
}
function me(l, e, n, t = {}) {
  if (l === e) return e;
  let o = t.rate ?? 9,
  r = t.floor ?? 40,
  k = t.scale ?? 400,
  s = e - l,
  a = Math.abs(s),
  i = a * o * n,
  d = r * n * Math.max(1, a / k),
  c = Math.max(i, d);
  return a <= c ? e : l + Math.sign(s) * c
}
function ye(l) {
  let e = l >>> 0;
  return function () {
    e += 1831565813;
    let t = e;
    return t = Math.imul(t ^ t >>> 15, t | 1),
    t ^= t + Math.imul(t ^ t >>> 7, t | 61),
    ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}
var Se = 3,
ul = 10,
gl = 3,
Nt = 25000,
R = 176,
W = 18,
Ee = 78,
Ll = {
  moneybag: {
    value: 500,
    weight: 42,
    speed: 1,
    w: 16,
    h: 14,
    sprite: 'moneybag',
    sound: 'coins'
  },
  cash: {
    value: 2500,
    weight: 30,
    speed: 1.15,
    w: 16,
    h: 14,
    sprite: 'cash',
    sound: 'paper'
  },
  gold: {
    value: 10000,
    weight: 20,
    speed: 1.35,
    w: 14,
    h: 12,
    sprite: 'gold',
    sound: 'metal'
  },
  diamond: {
    value: 50000,
    weight: 8,
    speed: 1.7,
    w: 10,
    h: 10,
    sprite: 'diamond',
    sound: 'chime',
    noSpin: !0
  }
},
z = Object.keys(Ll),
wl = {
  bond: {
    value: 75000,
    weight: 34,
    motion: 'flutter',
    w: 14,
    h: 9,
    life: 5.5
  },
  briefcase: {
    value: 100000,
    weight: 26,
    motion: 'lob',
    w: 14,
    h: 9,
    life: 4.5
  },
  piggy: {
    value: 150000,
    weight: 20,
    motion: 'float',
    w: 13,
    h: 9,
    life: 6
  },
  eagle: {
    value: 250000,
    weight: 14,
    motion: 'glide',
    w: 19,
    h: 10,
    life: 3.4
  },
  vault: {
    value: 500000,
    weight: 6,
    motion: 'streak',
    w: 14,
    h: 11,
    life: 2.4
  }
},
xl = Object.keys(wl),
Te = 3.6,
Gt = 3;
function Bt(l, e) {
  let n = Math.min((l - 1) * 0.12, 1.2),
  t = z.map((k, s) => {
    let a = 1 + n * (s / (z.length - 1));
    return Ll[k].weight * a
  }),
  o = t.reduce((k, s) => k + s, 0),
  r = e() * o;
  for (let k = 0; k < z.length; k += 1) if (r -= t[k], r <= 0) return z[k];
  return z[z.length - 1]
}
function Ht(l) {
  return Math.min(38 + (l - 1) * 7, 96)
}
var vl = [
  {
    name: 'arc',
    weight: 52,
    lift: [
      0.92,
      1.1
    ],
    drive: [
      0.9,
      1.15
    ],
    spin: [
      - 2.2,
      2.2
    ]
  },
  {
    name: 'floater',
    weight: 24,
    lift: [
      1.1,
      1.26
    ],
    drive: [
      0.55,
      0.78
    ],
    spin: [
      - 1.1,
      1.1
    ]
  },
  {
    name: 'liner',
    weight: 24,
    lift: [
      0.6,
      0.76
    ],
    drive: [
      1.35,
      1.7
    ],
    spin: [
      - 4.5,
      4.5
    ]
  }
];
function Dt(l) {
  let e = vl.reduce((t, o) => t + o.weight, 0),
  n = l() * e;
  for (let t of vl) if (n -= t.weight, n <= 0) return t;
  return vl[0]
}
function Al(l, e) {
  return l[0] + (l[1] - l[0]) * e
}
var Ft = 104;
function Ut(l, e) {
  let n = Bt(l, e),
  t = Ll[n],
  o = Dt(e),
  r = 0.9 + e() * 0.2,
  k = Ht(l) * t.speed * Al(o.drive, e()) * r,
  s = e() < 0.5,
  a = s ? - t.w : 256,
  i = R - t.h - 4 - e() * 8,
  d = Ft * Al(o.lift, e());
  return {
    type: n,
    profile: o.name,
    value: t.value,
    w: t.w,
    h: t.h,
    x: a,
    y: i,
    vx: (s ? 1 : - 1) * k,
    vy: - d,
    speed: k,
    spin: t.noSpin ? 0 : Al(o.spin, e()),
    rot: 0,
    phase: 'flying',
    timer: 0,
    bobT: 0
  }
}
function Wt(l) {
  let e = xl.reduce((t, o) => t + wl[o].weight, 0),
  n = l() * e;
  for (let t of xl) if (n -= wl[t].weight, n <= 0) return t;
  return xl[0]
}
function Yt(l) {
  let e = Wt(l),
  n = wl[e],
  t = l() < 0.5,
  o = t ? 1 : - 1,
  r,
  k,
  s = 0;
  switch (n.motion) {
    case 'glide':
      r = W + 6 + l() * 26,
      k = o * (78 + l() * 24);
      break;
    case 'streak':
      r = W + 10 + l() * 34,
      k = o * (128 + l() * 34);
      break;
    case 'flutter':
      r = W + 2,
      k = o * (16 + l() * 12),
      s = 15 + l() * 8;
      break;
    case 'float':
      r = R - 30 - l() * 20,
      k = o * (26 + l() * 14),
      s = - 46 - l() * 12;
      break;
    default:
      r = R - 20,
      k = o * (44 + l() * 20),
      s = - 96 - l() * 16
  }
  return {
    kind: e,
    motion: n.motion,
    value: n.value,
    w: n.w,
    h: n.h,
    x: t ? - n.w : 256,
    y: r,
    vx: k,
    vy: s,
    rot: 0,
    spin: n.motion === 'lob' ? (l() - 0.5) * 5 : 0,
    age: 0,
    life: n.life,
    phaseT: l() * Math.PI * 2
  }
}
function qt(l, e) {
  switch (l.age += e, l.rot += l.spin * e, l.phaseT += e, l.motion) {
    case 'glide':
    case 'streak':
      l.x += l.vx * e,
      l.y += Math.sin(l.phaseT * 1.8) * 9 * e;
      break;
    case 'flutter':
      l.x += (l.vx + Math.sin(l.phaseT * 3.1) * 26) * e,
      l.y += l.vy * e,
      l.rot = Math.sin(l.phaseT * 3.1) * 0.5;
      break;
    case 'float':
      l.vy += 22 * e,
      l.x += l.vx * e,
      l.y += l.vy * e;
      break;
    default:
      l.vy += Ee * e,
      l.x += l.vx * e,
      l.y += l.vy * e
  }
  return l
}
function $t(l, e) {
  return l.age >= l.life ||
  l.y > R - 2 ||
  l.x < - l.w - 12 ||
  l.x > e.width + 12
}
function Kt(l, e) {
  return l.timer += e,
  l.bobT += e,
  l.rot += (l.spin ?? 0) * e,
  l.phase !== 'flying' ||
  (
    l.vy += Ee * e,
    l.x += l.vx * e,
    l.y += l.vy * e,
    l.y < W &&
    (l.y = W, l.vy = Math.abs(l.vy) * 0.35)
  ),
  l
}
function Vt(l, e) {
  return Re(l) ||
  l.x < - l.w - 10 ||
  l.x > e.width + 10
}
function Re(l) {
  return l.y > R - l.h
}
function Me(l, e) {
  if (l.phase !== 'flying') return !1;
  let n = l.w <= 10 ? 3 : 1;
  return e.x >= l.x - n &&
  e.x <= l.x + l.w + n &&
  e.y >= l.y - n &&
  e.y <= l.y + l.h + n
}
function Y(l) {
  return `$${ Math.round(l).toLocaleString('en-US') }`
}
function hl(l = {}) {
  let e = l.seed ?? Math.floor(Math.random() * 4294967295),
  n = ye(e);
  return {
    seed: e,
    rng: n,
    round: 1,
    saved: 0,
    grabs: Se,
    targetIndex: 0,
    hitsThisRound: 0,
    misses: 0,
    cleanRound: null,
    phase: 'ready',
    phaseT: 0,
    target: null,
    lastResult: null,
    popup: null,
    impact: null,
    bonuses: [],
    bonusIn: 1.5 + n() * Te,
    bonusHit: null,
    bonusExpired: []
  }
}
function Xt(l) {
  return Math.max(4.5, 8 - (l - 1) * 0.3)
}
function xe(l, e, n) {
  l.phaseT += e;
  for (let o of l.bonuses) qt(o, e);
  let t = [];
  for (let o of l.bonuses) {
    if (!$t(o, n)) {
      t.push(o);
      continue
    }
    o.x < - o.w - 10 ||
    o.x > n.width + 10 ||
    l.bonusExpired.push({
      x: o.x + o.w / 2,
      y: o.y + o.h / 2,
      kind: o.kind
    })
  }
  switch (
      l.bonuses = t,
      l.phase !== 'gameOver' &&
      l.phase !== 'roundOver' &&
      (
        l.bonusIn -= e,
        l.bonusIn <= 0 &&
        (
          l.bonuses.length < Gt &&
          l.bonuses.push(Yt(l.rng)),
          l.bonusIn = Te * (0.55 + l.rng() * 0.9)
        )
      ),
      l.popup &&
      (l.popup.t += e, l.popup.t > 1.1 && (l.popup = null)),
      l.phase
    ) {
    case 'ready':
      l.phaseT >= 0.6 &&
      (
        l.target = Ut(l.round, l.rng),
        l.grabs = Se,
        l.phase = 'flying',
        l.phaseT = 0
      );
      break;
    case 'flying':
      Kt(l.target, e),
      (Vt(l.target, n) || l.target.timer >= Xt(l.round)) &&
      (
        Re(l.target) &&
        (l.impact = {
          x: l.target.x + l.target.w / 2,
          y: R,
          type: l.target.type
        }),
        l.target.phase = 'escaped',
        l.phase = 'escaped',
        l.phaseT = 0,
        l.lastResult = 'escaped',
        l.misses += 1
      );
      break;
    case 'struck':
      l.phaseT >= 0.45 &&
      (l.phase = 'escaped', l.phaseT = 0);
      break;
    case 'escaped':
      l.phaseT >= 0.7 &&
      jt(l);
      break;
    default:
      break
  }
  return l
}
function jt(l) {
  if (l.targetIndex += 1, l.target = null, l.misses >= gl) {
    l.phase = 'gameOver',
    l.phaseT = 0;
    return
  }
  if (l.targetIndex < ul) {
    l.phase = 'ready',
    l.phaseT = 0;
    return
  }
  if (l.hitsThisRound >= ul) {
    let e = Nt * l.round;
    l.saved += e,
    l.cleanRound = e
  } else l.cleanRound = null;
  l.round += 1,
  l.targetIndex = 0,
  l.hitsThisRound = 0,
  l.phase = 'roundOver',
  l.phaseT = 0
}
function ve(l, e) {
  if (l.grabs > 0) for (let n = l.bonuses.length - 1; n >= 0; n -= 1) {
    let t = l.bonuses[n];
    if (Me({
      ...t,
      phase: 'flying'
    }, e)) return l.grabs -= 1,
    l.saved += t.value,
    l.bonusHit = {
      x: t.x + t.w / 2,
      y: t.y,
      value: t.value,
      kind: t.kind
    },
    l.popup = {
      t: 0,
      value: t.value,
      x: t.x,
      y: t.y
    },
    l.bonuses.splice(n, 1),
    {
      result: 'bonus',
      type: t.kind,
      value: t.value
    }
  }
  if (l.phase !== 'flying' || l.grabs <= 0) return {
    result: 'ignored'
  };
  if (l.grabs -= 1, Me(l.target, e)) {
    let {
      type: n,
      value: t
    }
    = l.target;
    return l.saved += t,
    l.hitsThisRound += 1,
    l.target.phase = 'struck',
    l.phase = 'struck',
    l.phaseT = 0,
    l.lastResult = 'hit',
    l.popup = {
      t: 0,
      value: t,
      x: l.target.x,
      y: l.target.y
    },
    {
      result: 'hit',
      type: n,
      value: t
    }
  }
  return {
    result: 'miss'
  }
}
function Cl(l) {
  l.phase = 'ready',
  l.phaseT = 0
}
var x = 256,
Z = 224,
zt = '#1f3f70',
Jt = '#8c6fa0',
Zt = '#e8956f',
Ae = 206,
Il = document.getElementById('game'),
Pl = _l(Il, {
  width: x,
  height: Z,
  background: '#080a10',
  backdropTile: $l()
}),
J = Nl(Il, Pl),
u = Pl.ctx;
te();
var h = hl(),
Qt = {
  width: x,
  height: Z
},
A = 0,
ln = dl(19, 12, 13),
en = dl(16, 10, 13),
Ol = dl(13, 8, 7),
H = be({
  palettes: ee
}),
tn = ql(),
Le = jl({
  music: tn
}),
{
  startMusicOnce: nn
}
= Le,
nl = Xl('trump-savings-tycoon'),
Ce = {
  title: 'TRUMP SAVINGS TYCOON',
  lines: [
    'FILL YOUR KIDS\'',
    'TRUMP ACCOUNTS',
    'CLICK TO SWING THE NET',
    'THREE MISSES ENDS THE RUN'
  ],
  prompt: 'CLICK TO START'
},
on = Math.round((Z - El(Ce)) / 2),
ol = !0;
function Oe() {
  return ol ? (ol = !1, !0) : !1
}
var rl = 0,
O = 0,
D = 0,
F = null;
function rn(l) {
  switch (l) {
    case 'coins':
    case 'moneybag':
      C({
        freq: 520,
        duration: 0.07,
        type: 'triangle',
        gain: 0.05
      }),
      setTimeout(() => C({
        freq: 780,
        duration: 0.09,
        type: 'triangle',
        gain: 0.045
      }), 55);
      break;
    case 'cash':
      sl(0.11, 0.05),
      C({
        freq: 240,
        endFreq: 180,
        duration: 0.09,
        type: 'sawtooth',
        gain: 0.02
      });
      break;
    case 'gold':
      C({
        freq: 880,
        endFreq: 1180,
        duration: 0.22,
        type: 'square',
        gain: 0.045
      }),
      setTimeout(() => C({
        freq: 1320,
        duration: 0.26,
        type: 'sine',
        gain: 0.035
      }), 60);
      break;
    case 'diamond':
      [
        1046,
        1318,
        1568,
        2093
      ].forEach(
        (e, n) => {
          setTimeout(() => C({
            freq: e,
            duration: 0.3,
            type: 'sine',
            gain: 0.045
          }), n * 65)
        }
      );
      break;
    default:
      C({
        freq: 660,
        endFreq: 1320,
        duration: 0.14,
        gain: 0.05
      })
  }
}
function kn() {
  [
    523,
    659,
    784,
    1047,
    1319
  ].forEach(
    (l, e) => {
      setTimeout(() => C({
        freq: l,
        duration: 0.26,
        type: 'square',
        gain: 0.04
      }), e * 70)
    }
  ),
  C({
    freq: 262,
    duration: 0.6,
    type: 'triangle',
    gain: 0.03
  })
}
document.addEventListener(
  'keydown',
  l => {
    (l.key === 'm' || l.key === 'M') &&
    Le.toggle(),
    !(l.key === ' ' && Oe()) &&
    (
      (l.key === 'r' || l.key === 'R') &&
      (h = hl(), H.clear(), rl = 0, F = null, ol = !0),
      l.key === ' ' &&
      h.phase === 'roundOver' &&
      Cl(h)
    )
  }
);
Il.addEventListener(
  'pointerdown',
  () => {
    nn(),
    !Oe() &&
    (
      h.phase === 'roundOver' &&
      Cl(h),
      h.phase === 'gameOver' &&
      (h = hl(), H.clear(), rl = 0)
    )
  }
);
function an(l) {
  if (ol) {
    J.takeGrabs();
    return
  }
  for (let e of J.takeGrabs()) {
    let n = ve(h, e);
    if (n.result !== 'ignored') {
      if (
        D = 1,
        sl(0.05, 0.022),
        C({
          freq: 320,
          endFreq: 520,
          duration: 0.07,
          type: 'sine',
          gain: 0.02
        }),
        n.result === 'bonus'
      ) {
        kn();
        let t = h.bonusHit;
        H.burst(t.x, t.y, 'gold', 2.4),
        O = Math.max(O, 3.2)
      }
      if (n.result === 'hit') {
        rn(n.type);
        let t = h.target,
        o = n.value >= 50000 ? 2 : n.value >= 10000 ? 1.5 : 1;
        H.burst(t.x + t.w / 2, t.y + t.h / 2, n.type, o),
        O = Math.max(O, 1.4 * o)
      }
    }
  }
  xe(h, l, Qt);
  for (let e of h.bonusExpired) H.burst(e.x, e.y, e.kind === 'eagle' ? 'moneybag' : 'gold', 1.1),
  C({
    freq: 180,
    endFreq: 110,
    duration: 0.1,
    type: 'sine',
    gain: 0.03
  });
  h.bonusExpired.length = 0,
  h.bonusHit &&
  (F = {
    t: 0,
    x: h.bonusHit.x,
    y: h.bonusHit.y
  }, h.bonusHit = null),
  F &&
  (F.t += l, F.t > 1.4 && (F = null)),
  h.impact &&
  (
    H.splat(h.impact.x, h.impact.y, h.impact.type),
    O = Math.max(O, 1.1),
    C({
      freq: 130,
      endFreq: 70,
      duration: 0.13,
      type: 'sine',
      gain: 0.05
    }),
    sl(0.06, 0.03),
    h.impact = null
  ),
  H.update(l),
  A += l,
  rl = me(rl, h.saved, l),
  nl.submit(h.saved),
  O *= Math.max(0, 1 - 9 * l),
  O < 0.05 &&
  (O = 0),
  D = Math.max(0, D - l * 6)
}
function sn() {
  let l = u.createLinearGradient(0, 0, 0, R);
  l.addColorStop(0, zt),
  l.addColorStop(0.55, Jt),
  l.addColorStop(1, Zt),
  u.fillStyle = l,
  u.fillRect(0, 0, x, R);
  let e = Ae,
  n = R - 26,
  t = u.createRadialGradient(e, n, 0, e, n, 46);
  t.addColorStop(0, 'rgba(255, 214, 150, 0.55)'),
  t.addColorStop(1, 'rgba(255, 214, 150, 0)'),
  u.fillStyle = t,
  u.fillRect(e - 46, n - 46, 92, 92),
  u.fillStyle = '#ffe6b0',
  u.beginPath(),
  u.arc(e, n, 7, 0, Math.PI * 2),
  u.fill(),
  ie(u, x, A),
  ce(u, g, T, x, A),
  fe(u, g, T, x, A)
}
function cn() {
  let l = R - 2,
  e = [
    0,
    120
  ];
  for (let f = - 6; f < x; f += 26) f + 12 > e[0] &&
  f < e[1] ||
  T(u, g.fedBlock, f, l - g.fedBlock.height);
  T(u, g.treasury, 108, l - g.treasury.height),
  T(u, g.bep, 232, l - g.bep.height),
  T(u, g.castle, 186, l - g.castle.height),
  fl(u, 150, g.jefferson.width, l),
  T(u, g.jefferson, 150, l - g.jefferson.height),
  fl(u, 208, g.capitol.width, l),
  T(u, g.capitol, 208, l - g.capitol.height);
  let n = g.monumentCap,
  t = 128,
  o = n.width,
  r = o * 10,
  k = l - r;
  T(u, n, t, k);
  let s = k + n.height,
  a = l - s;
  u.fillStyle = Ql,
  u.fillRect(t, s, o / 2, a),
  u.fillStyle = le,
  u.fillRect(t + o / 2, s, o / 2, a);
  let i = g.whiteHouse,
  d = 8,
  c = l - i.height;
  fl(u, d, i.width, l),
  T(u, i, d, c),
  ke(u, d + i.width - 4, l, c - 20, A),
  j(u, Ol, d + 46, c - 11, 12, A, 0.4, 0.45),
  re(u, x, l);
  for (let f of [
    22,
    66,
    120,
    158,
    200,
    240
  ]) T(u, g.cherry, f, l - g.cherry.height + 5);
  return we(u, g, T, x, l, A),
  pe(u, A),
  j(u, ln, d + i.width + 14, l - 36, 36, A, 0, 0),
  j(u, en, 186, l - 30, 30, A, 0.8, 0.18),
  j(u, Ol, 204, l - 25, 25, A, 1.6, 0.4),
  j(u, Ol, 240, l - 23, 23, A, 2.3, 0.5),
  {
    x: t,
    w: o
  }
}
function dn(l) {
  ae(u, x, Z, R);
  for (let t = - 4; t < x; t += 21) T(u, g.tuft, t, R - 3);
  ue(u, g, T, x, R);
  let e = 96,
  n = Math.round(l.x + l.w / 2 - e / 2);
  se(
    u,
    {
      x: n,
      y: R + 7,
      w: e,
      h: 11,
      t: A,
      monumentX: l.x,
      monumentW: l.w,
      sunX: Ae
    }
  )
}
function fn(l) {
  let e = l.y + l.h,
  n = Math.min(1, Math.max(0, (R - e) / (R - W))),
  t = Math.max(3, Math.round(l.w * (1 - 0.5 * n))),
  o = 0.34 * (1 - 0.72 * n),
  r = Math.round(l.x + l.w / 2),
  k = R + 1;
  u.fillStyle = `rgba(14, 40, 22, ${ o.toFixed(3) })`,
  u.fillRect(r - Math.floor(t / 2) + 1, k, t - 2, 1),
  u.fillRect(r - Math.floor(t / 2), k + 1, t, 1),
  u.fillRect(r - Math.floor(t / 2) + 1, k + 2, t - 2, 1)
}
function un() {
  for (let l of h.bonuses) {
    let e = l.kind === 'eagle' ? g[Rl[Math.floor(A * 7) % Rl.length]] : g[l.kind];
    if (!e) continue;
    bl(u, e, l.x, l.y, l.rot ?? 0, l.vx < 0);
    let n = l.x + l.w / 2,
    t = l.y + l.h / 2,
    o = Math.max(l.w, l.h) / 2 + 3;
    for (let r = 0; r < 4; r += 1) {
      let k = A * 2.2 + l.phaseT + r * Math.PI / 2,
      s = Math.sin(A * 11 + l.phaseT + r * 1.9);
      if (s < 0.15) continue;
      let a = Math.round(n + Math.cos(k) * o),
      i = Math.round(t + Math.sin(k) * o * 0.72);
      u.fillStyle = s > 0.75 ? '#ffffff' : '#ffe680',
      u.fillRect(a, i, 1, 1),
      s > 0.75 &&
      (
        u.fillRect(a - 1, i, 1, 1),
        u.fillRect(a + 1, i, 1, 1),
        u.fillRect(a, i - 1, 1, 1),
        u.fillRect(a, i + 1, 1, 1)
      )
    }
  }
}
function wn() {
  if (!F) return;
  let l = Math.min(1, F.t / 1.4);
  u.globalAlpha = Math.max(0, 1 - l),
  P(u, 'BONUS!', x / 2, 54 - l * 12, '#ffe680', 2),
  u.globalAlpha = 1
}
function gn() {
  let l = h.target;
  if (!l || l.phase !== 'flying') return;
  fn(l);
  let e = Math.sin(l.bobT * 6) * 1.2;
  bl(u, g[l.type], l.x, l.y + e, l.rot ?? 0, l.vx < 0)
}
function hn() {
  let l = h.popup;
  l &&
  (
    u.globalAlpha = Math.max(0, 1 - l.t / 1.1),
    P(u, `+${ Y(l.value) }`, l.x + 8, l.y - 10 - l.t * 14, '#ffe680'),
    u.globalAlpha = 1
  )
}
function pn() {
  u.fillStyle = 'rgba(8, 12, 20, 0.62)',
  u.fillRect(0, 0, x, 16),
  B(u, `R${ h.round }`, 4, 4, '#9fb4d0'),
  B(u, `${ Y(rl) } SAVED`, 22, 4, '#7fe08a'),
  nl.value() > 0 &&
  B(u, `BEST ${ Y(nl.value()) }`, 22, 13, '#c9a227');
  for (let e = 0; e < gl; e += 1) {
    let n = 150 + e * 10,
    t = e < h.misses;
    u.fillStyle = t ? '#e2564a' : 'rgba(160, 180, 200, 0.30)';
    for (let o = 0; o < 5; o += 1) u.fillRect(n + o, 5 + o, 1, 1),
    u.fillRect(n + 4 - o, 5 + o, 1, 1)
  }
  for (let e = 0; e < h.grabs; e += 1) {
    let n = x - 12 - e * 8;
    u.fillStyle = '#eaf2f7',
    u.fillRect(n + 1, 4, 4, 1),
    u.fillRect(n + 1, 10, 4, 1),
    u.fillRect(n, 5, 1, 5),
    u.fillRect(n + 5, 5, 1, 5),
    u.fillStyle = '#7fa8c0',
    u.fillRect(n + 2, 6, 2, 3)
  }
  let l = Z - 7;
  for (let e = 0; e < ul; e += 1) {
    let n = 6 + e * 8,
    t = e < h.targetIndex,
    o = e < h.hitsThisRound;
    u.fillStyle = o ? '#7fe08a' : t ? '#7a1f1f' : 'rgba(0,0,0,0.35)',
    u.fillRect(n, l, 5, 4)
  }
}
function bn() {
  sn();
  let l = cn();
  if (de(u, g, T, R - 2, A), dn(l), gn(), un(), H.draw(u), hn(), wn(), ol) Jl(
    u,
    x,
    Z,
    {
      ...Ce,
      best: nl.value() > 0 ? `BEST ${ Y(nl.value()) }` : void 0,
      top: on
    }
  );
   else if (h.phase === 'roundOver') ge(u, x, h.phaseT),
  Tl(
    u,
    x,
    h.cleanRound ? `PERFECT ROUND ${ h.round - 1 }` : `ROUND ${ h.round - 1 } CLEAR`,
    h.cleanRound ? `+${ Y(h.cleanRound) } bonus — click to continue` : 'click or space to continue'
  );
   else if (h.phase === 'gameOver') {
    let o = h.misses >= gl ? 'THREE MISSED' : 'TIME\'S UP';
    Tl(u, x, o, `${ Y(h.saved) } saved — click to play again`)
  }
  pn();
  let e = D * D * 4;
  if (T(u, g.net, J.aim.x - 7, J.aim.y - 3 + e), D > 0.55) {
    let o = (1 - D) * 26;
    u.strokeStyle = `rgba(200, 236, 255, ${ ((D - 0.55) * 1.6).toFixed(3) })`,
    u.lineWidth = 1,
    u.beginPath(),
    u.arc(
      Math.round(J.aim.x),
      Math.round(J.aim.y - e),
      Math.max(1, o),
      0,
      Math.PI * 2
    ),
    u.stroke()
  }
  let n = O > 0 ? (Math.random() - 0.5) * 2 * O : 0,
  t = O > 0 ? (Math.random() - 0.5) * 2 * O : 0;
  Pl.present(n, t)
}
Hl({
  update: an,
  render: bn
});
