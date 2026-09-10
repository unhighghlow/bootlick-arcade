function De(e, l = {}) {
  let n = l.width ?? 256,
  t = l.height ?? 224,
  o = l.background === null ? null : l.background ?? '#000',
  r = l.backdropTile ?? null,
  a = l.presentation === 'smooth',
  k = Number(l.maxBackingScale ?? 2),
  i = Number.isFinite(k) ? Math.max(1, k) : 2,
  s = document.createElement('canvas');
  s.width = n,
  s.height = t;
  let h = s.getContext('2d');
  h.imageSmoothingEnabled = a;
  let f = document.createElement('canvas');
  f.className = a ? 'pixel-screen smooth-screen' : 'pixel-screen';
  let p = f.getContext('2d');
  p.imageSmoothingEnabled = a,
  e.appendChild(f);
  let c = 1,
  d = 0,
  u = 0,
  w = null,
  v = 0.15;
  function g(x) {
    if (x < 1) return x;
    let A = Math.floor(x);
    return x - A < v ? A : x
  }
  function y() {
    let x = e.getBoundingClientRect(),
    A = window.devicePixelRatio ||
    1,
    P = Math.max(1, Math.floor(x.width * A)),
    U = Math.max(1, Math.floor(x.height * A));
    if (c = g(Math.min(P / n, U / t)), a) {
      let ae = Math.min(i, Math.max(1, c)),
      z = Math.max(n, Math.round(n * ae)),
      Me = Math.max(t, Math.round(t * ae));
      (s.width !== z || s.height !== Me) &&
      (s.width = z, s.height = Me),
      h.setTransform(z / n, 0, 0, Me / t, 0, 0),
      h.imageSmoothingEnabled = !0
    }
    f.width = P,
    f.height = U,
    f.style.width = `${ x.width }px`,
    f.style.height = `${ x.height }px`,
    p.imageSmoothingEnabled = a,
    d = Math.max(0, Math.floor((P - n * c) / 2)),
    u = Math.max(0, Math.floor((U - t * c) / 2))
  }
  function T(x = 0, A = 0) {
    o ? (p.fillStyle = o, p.fillRect(0, 0, f.width, f.height)) : p.clearRect(0, 0, f.width, f.height),
    r &&
    (
      w ||
      (w = p.createPattern(r, 'repeat')),
      w &&
      (p.fillStyle = w, p.fillRect(0, 0, f.width, f.height))
    ),
    p.drawImage(s, d + Math.round(x) * c, u + Math.round(A) * c, n * c, t * c)
  }
  function re(x, A) {
    let P = f.getBoundingClientRect(),
    U = window.devicePixelRatio ||
    1,
    ae = (x - P.left) * U,
    z = (A - P.top) * U;
    return {
      x: (ae - d) / c,
      y: (z - u) / c
    }
  }
  return y(),
  typeof ResizeObserver == 'function' ? new ResizeObserver(y).observe(e) : window.addEventListener('resize', y),
  {
    canvas: s,
    ctx: h,
    width: n,
    height: t,
    present: T,
    toGame: re
  }
}
var Pt = new Set(
  ['w',
  'a',
  's',
  'd',
  'arrowup',
  'arrowleft',
  'arrowdown',
  'arrowright']
);
function Ye(e, l, n = {}) {
  let t = {
    x: 0,
    y: 0
  },
  o = [],
  r = !1,
  a = [],
  k = n.cursor ?? null,
  i = new Set,
  s = typeof window > 'u' ? null : window;
  function h() {
    return k !== null &&
    (k.active ? k.active() : !0)
  }
  function f(g) {
    let y = String(g.key).toLowerCase();
    Pt.has(y) &&
    h() &&
    (i.add(y), g.preventDefault?.())
  }
  function p(g) {
    i.delete(String(g.key).toLowerCase())
  }
  function c() {
    i.clear()
  }
  function d(g, y) {
    let T = k.bounds;
    return {
      x: Math.max(T.x0, Math.min(T.x1, g)),
      y: Math.max(T.y0, Math.min(T.y1, y))
    }
  }
  function u(g) {
    let y = l.toGame(g.clientX, g.clientY);
    t.x = y.x,
    t.y = y.y,
    r &&
    a.push({
      x: y.x,
      y: y.y
    })
  }
  function w() {
    r = !1
  }
  function v(g) {
    if (g.button !== 0) return;
    g.preventDefault();
    let y = l.toGame(g.clientX, g.clientY);
    t.x = y.x,
    t.y = y.y,
    o.push({
      x: y.x,
      y: y.y
    }),
    r = !0,
    a.push({
      x: y.x,
      y: y.y
    })
  }
  return e.addEventListener('pointermove', u, {
    passive: !0
  }),
  e.addEventListener('pointerdown', v),
  e.addEventListener('pointerup', w),
  e.addEventListener('pointercancel', w),
  e.addEventListener('contextmenu', g => g.preventDefault()),
  k &&
  (
    s?.addEventListener('keydown', f),
    s?.addEventListener('keyup', p),
    s?.addEventListener('blur', c)
  ),
  e.style.touchAction = 'none',
  {
    aim: t,
    get down() {
      return r
    },
    takeGrabs() {
      let g = o;
      return o = [],
      g
    },
    takeStroke() {
      let g = a;
      return a = [],
      g
    },
    stepCursor(g) {
      if (!h() || i.size === 0) return [];
      let y = 0,
      T = 0;
      if (
        (i.has('a') || i.has('arrowleft')) &&
        (y -= 1),
        (i.has('d') || i.has('arrowright')) &&
        (y += 1),
        (i.has('w') || i.has('arrowup')) &&
        (T -= 1),
        (i.has('s') || i.has('arrowdown')) &&
        (T += 1),
        y === 0 &&
        T === 0
      ) return [];
      let re = Math.hypot(y, T),
      x = k.speed * (Number.isFinite(g) && g > 0 ? g : 0),
      A = d(t.x, t.y),
      P = d(A.x + y / re * x, A.y + T / re * x);
      return t.x = P.x,
      t.y = P.y,
      [
        A,
        P
      ]
    },
    dispose() {
      e.removeEventListener('pointermove', u),
      e.removeEventListener('pointerdown', v),
      e.removeEventListener('pointerup', w),
      e.removeEventListener('pointercancel', w),
      s?.removeEventListener('keydown', f),
      s?.removeEventListener('keyup', p),
      s?.removeEventListener('blur', c),
      i.clear()
    }
  }
}
function S(e, l) {
  let n = e.length,
  t = n > 0 ? e[0].length : 0;
  for (let a of e) if (a.length !== t) throw new Error(
    `sprite rows must be equal length (expected ${ t }, got ${ a.length })`
  );
  let o = document.createElement('canvas');
  o.width = Math.max(1, t),
  o.height = Math.max(1, n);
  let r = o.getContext('2d');
  r.imageSmoothingEnabled = !1;
  for (let a = 0; a < n; a += 1) for (let k = 0; k < t; k += 1) {
    let i = e[a][k];
    if (i === '.' || i === ' ') continue;
    let s = l[i];
    s &&
    (r.fillStyle = s, r.fillRect(k, a, 1, 1))
  }
  return {
    width: t,
    height: n,
    image: o
  }
}
var W = 16,
Ue = new WeakMap;
function Gt(e) {
  let l = Math.ceil(Math.sqrt(e.width**2 + e.height**2)) + 1,
  n = l + l % 2,
  t = [];
  for (let o = 0; o < W; o += 1) {
    let r = document.createElement('canvas');
    r.width = n,
    r.height = n;
    let a = r.getContext('2d');
    a.imageSmoothingEnabled = !1,
    a.translate(n / 2, n / 2),
    a.rotate(o / W * Math.PI * 2),
    a.drawImage(e.image, - e.width / 2, - e.height / 2),
    t.push(r)
  }
  return t
}
function We(e, l, n, t, o, r = !1) {
  if (Math.abs(o) < 0.0001) {
    C(e, l, n, t, r);
    return
  }
  let a = Ue.get(l);
  a ||
  (a = Gt(l), Ue.set(l, a));
  let k = Math.PI * 2 / W,
  i = (Math.round(o / k) % W + W) % W;
  if (i === 0) {
    C(e, l, n, t, r);
    return
  }
  let s = a[i],
  h = Math.round(n + l.width / 2),
  f = Math.round(t + l.height / 2),
  p = s.width / 2;
  if (!r) {
    e.drawImage(s, Math.round(h - p), Math.round(f - p));
    return
  }
  e.save(),
  e.translate(h, f),
  e.scale( - 1, 1),
  e.drawImage(s, - p, - p),
  e.restore()
}
function C(e, l, n, t, o = !1) {
  let r = Math.floor(n),
  a = Math.floor(t);
  if (!o) {
    e.drawImage(l.image, r, a);
    return
  }
  e.save(),
  e.translate(r + l.width, a),
  e.scale( - 1, 1),
  e.drawImage(l.image, 0, 0),
  e.restore()
}
var Ht = {
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
Ee = new Map(Object.entries(Ht));
function N(e, l = 1) {
  return e.length === 0 ? 0 : (e.length * 6 - 1) * l
}
var O = 7,
Nt = 32,
xe = new Map,
qe = null;
function Ot() {
  return qe ||
  (
    typeof document < 'u' &&
    typeof document.createElement == 'function' ? () => document.createElement('canvas') : null
  )
}
function Ft(e, l) {
  let n = Ot();
  if (!n) return null;
  let t = n();
  if (!t || typeof t.getContext != 'function') return null;
  let o = [
    ...Ee.keys()
  ],
  r = 5 * l,
  a = 7 * l;
  t.width = r * o.length,
  t.height = a;
  let k = t.getContext('2d');
  if (!k || typeof k.fillRect != 'function') return null;
  k.fillStyle = e;
  let i = new Map;
  for (let s = 0; s < o.length; s += 1) {
    let h = o[s],
    f = s * r;
    i.set(h, f);
    let p = Ee.get(h);
    for (let c = 0; c < 7; c += 1) {
      let d = p[c];
      for (let u = 0; u < 5; u += 1) d[u] === '#' &&
      k.fillRect(f + u * l, c * l, l, l)
    }
  }
  return {
    canvas: t,
    offsets: i,
    gw: r,
    gh: a
  }
}
function Bt(e, l, n) {
  if (!Number.isInteger(n) || n < 1 || typeof e.drawImage != 'function') return null;
  let t = `${ n }|${ l }`,
  o = xe.get(t);
  if (o) return o;
  if (xe.size >= Nt) return null;
  let r = Ft(l, n);
  return r &&
  xe.set(t, r),
  r
}
function G(e, l, n, t, o, r = 1) {
  e.fillStyle = o;
  let a = Math.round(n),
  k = Math.round(t),
  i = Bt(e, o, r);
  for (let s of String(l).toUpperCase()) {
    if (s === ' ') {
      a += 6 * r;
      continue
    }
    if (i) {
      let h = i.offsets.get(s);
      h !== void 0 &&
      e.drawImage(i.canvas, h, 0, i.gw, i.gh, a, k, i.gw, i.gh)
    } else {
      let h = Ee.get(s);
      if (h) for (let f = 0; f < 7; f += 1) {
        let p = h[f];
        for (let c = 0; c < 5; c += 1) p[c] === '#' &&
        e.fillRect(a + c * r, k + f * r, r, r)
      }
    }
    a += 6 * r
  }
  return a
}
function H(e, l, n, t, o, r = 1) {
  G(e, l, Math.round(n - N(l, r) / 2), t, o, r)
}
function Ve({
  update: e,
  render: l,
  fps: n = 60
}) {
  let t = 1 / n,
  o = 1000 / n,
  r = performance.now(),
  a = 0,
  k = 0,
  i = !0;
  function s(h) {
    if (!i) return;
    k = requestAnimationFrame(s);
    let f = Math.min(Math.max(0, h - r), 250);
    for (r = h, a += f; a >= o; ) e(t),
    a -= o;
    l(a / o, f / 1000)
  }
  return k = requestAnimationFrame(s),
  {
    stop() {
      i = !1,
      cancelAnimationFrame(k)
    }
  }
}
var Dt = [
  '#ffffff',
  '#c8c8c8',
  '#8a8a8a'
];
function $e(e = {}) {
  let l = e.palettes ?? {
  },
  n = e.dust ?? ['#5d7a52',
  '#8a9c74'],
  t = [];
  function o(r) {
    return l[r] ?? Dt
  }
  return {
    burst(r, a, k, i = 1) {
      let s = o(k),
      h = Math.round(14 * i);
      for (let f = 0; f < h; f += 1) {
        let p = f / h * Math.PI * 2 + Math.random() * 0.4,
        c = 26 + Math.random() * 54 * i;
        t.push({
          x: r,
          y: a,
          vx: Math.cos(p) * c,
          vy: Math.sin(p) * c - 22,
          life: 0.5 + Math.random() * 0.45,
          age: 0,
          colour: s[f % s.length],
          size: Math.random() < 0.28 ? 2 : 1
        })
      }
    },
    splat(r, a, k) {
      let i = o(k);
      for (let s = 0; s < 12; s += 1) {
        let h = - Math.PI + s / 12 * Math.PI,
        f = 30 + Math.random() * 46;
        t.push({
          x: r,
          y: a,
          vx: Math.cos(h) * f,
          vy: Math.sin(h) * f * 0.62,
          life: 0.4 + Math.random() * 0.4,
          age: 0,
          colour: i[s % i.length],
          size: 1
        })
      }
      for (let s = 0; s < 7; s += 1) t.push({
        x: r + (Math.random() - 0.5) * 10,
        y: a,
        vx: (Math.random() - 0.5) * 26,
        vy: - 8 - Math.random() * 18,
        life: 0.45 + Math.random() * 0.35,
        age: 0,
        colour: n[s % n.length],
        size: 1
      })
    },
    update(r) {
      for (let a of t) a.age += r,
      a.vy += 190 * r,
      a.x += a.vx * r,
      a.y += a.vy * r,
      a.vx *= 1 - 2.2 * r;
      t = t.filter(a => a.age < a.life)
    },
    draw(r) {
      for (let a of t) {
        let k = a.age / a.life;
        r.globalAlpha = k < 0.66 ? 1 : Math.max(0, 1 - (k - 0.66) / 0.34),
        r.fillStyle = a.colour,
        r.fillRect(Math.floor(a.x), Math.floor(a.y), a.size, a.size)
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
var j = null,
q = !1;
function Te() {
  if (!j) {
    let e = window.AudioContext ||
    window.webkitAudioContext;
    if (!e) return null;
    j = new e
  }
  return j.state === 'suspended' &&
  j.resume(),
  j
}
function V({
  freq: e,
  endFreq: l,
  duration: n = 0.1,
  type: t = 'square',
  gain: o = 0.05
}) {
  if (q) return;
  let r = Te();
  if (!r) return;
  let a = r.createOscillator(),
  k = r.createGain(),
  i = r.currentTime;
  a.type = t,
  a.frequency.setValueAtTime(e, i),
  l &&
  a.frequency.exponentialRampToValueAtTime(Math.max(1, l), i + n),
  k.gain.setValueAtTime(o, i),
  k.gain.exponentialRampToValueAtTime(0.0001, i + n),
  a.connect(k).connect(r.destination),
  a.start(i),
  a.stop(i + n + 0.02)
}
function ke(e = 0.08, l = 0.08) {
  if (q) return;
  let n = Te();
  if (!n) return;
  let t = Math.floor(n.sampleRate * e);
  if (!Number.isFinite(t) || t < 1) return;
  let o = n.createBuffer(1, t, n.sampleRate),
  r = o.getChannelData(0);
  for (let i = 0; i < t; i += 1) r[i] = (Math.random() * 2 - 1) * (1 - i / t);
  let a = n.createBufferSource(),
  k = n.createGain();
  k.gain.setValueAtTime(l, n.currentTime),
  a.buffer = o,
  a.connect(k).connect(n.destination),
  a.start()
}
function B() {
  return q
}
function ie() {
  return Te()
}
function Ke(e) {
  return q = e === void 0 ? !q : !!e,
  q
}
var se = 0.018;
function Xe() {
  let e = !1,
  l = null,
  n = 0,
  t = null,
  o = null,
  r = null,
  a = null,
  k = null,
  i = null,
  s = null;
  function h(c, d) {
    let u = Math.max(1, Math.floor(c.sampleRate * d)),
    w = c.createBuffer(1, u, c.sampleRate),
    v = w.getChannelData(0),
    g = 0;
    for (let y = 0; y < u; y += 1) {
      let T = Math.random() * 2 - 1;
      g = (g + 0.02 * T) / 1.02,
      v[y] = g * 3.5
    }
    return w
  }
  function f(c, d) {
    let u = c.createOscillator(),
    w = c.createGain();
    u.type = 'sawtooth',
    u.frequency.setValueAtTime(1250 + Math.random() * 260, d),
    u.frequency.exponentialRampToValueAtTime(760, d + 0.13),
    u.frequency.exponentialRampToValueAtTime(980, d + 0.2),
    w.gain.setValueAtTime(0.0001, d),
    w.gain.exponentialRampToValueAtTime(se * 0.5, d + 0.03),
    w.gain.exponentialRampToValueAtTime(0.0001, d + 0.26),
    u.connect(w).connect(c.destination),
    u.start(d),
    u.stop(d + 0.3)
  }
  function p() {
    let c = ie();
    if (!c) return;
    let d = B() ? 0 : 1;
    r &&
    r.gain.setTargetAtTime(se * d, c.currentTime, 0.2),
    k &&
    k.gain.setTargetAtTime(se * 0.55 * d, c.currentTime, 0.2),
    !B() &&
    c.currentTime >= n &&
    (f(c, c.currentTime + 0.05), n = c.currentTime + 9 + Math.random() * 12)
  }
  return {
    start() {
      if (e) return;
      let c = ie();
      if (!c) return;
      e = !0;
      let d = h(c, 3);
      t = c.createBufferSource(),
      t.buffer = d,
      t.loop = !0,
      o = c.createBiquadFilter(),
      o.type = 'lowpass',
      o.frequency.setValueAtTime(700, c.currentTime),
      r = c.createGain(),
      r.gain.setValueAtTime(0, c.currentTime),
      t.connect(o).connect(r).connect(c.destination),
      t.start(),
      a = c.createBufferSource(),
      a.buffer = d,
      a.loop = !0,
      a.playbackRate.setValueAtTime(0.35, c.currentTime);
      let u = c.createBiquadFilter();
      u.type = 'bandpass',
      u.frequency.setValueAtTime(220, c.currentTime),
      u.Q.setValueAtTime(0.7, c.currentTime),
      k = c.createGain(),
      k.gain.setValueAtTime(0, c.currentTime),
      a.connect(u).connect(k).connect(c.destination),
      a.start(),
      i = c.createOscillator(),
      i.type = 'sine',
      i.frequency.setValueAtTime(55, c.currentTime),
      s = c.createGain(),
      s.gain.setValueAtTime(0, c.currentTime),
      i.connect(s).connect(c.destination),
      i.start(),
      n = c.currentTime + 4,
      l = setInterval(p, 250),
      p()
    },
    stop() {
      l !== null &&
      (clearInterval(l), l = null)
    },
    setClarity(c) {
      let d = ie();
      if (!d || !e) return;
      let u = Math.max(0, Math.min(1, c / 100));
      if (o && o.frequency.setTargetAtTime(300 + u * 400, d.currentTime, 0.6), s) {
        let w = Math.max(0, 1 - u / 0.5);
        s.gain.setTargetAtTime(B() ? 0 : se * 0.5 * w, d.currentTime, 0.6)
      }
    }
  }
}
function Je(e = {}) {
  let l = e.size ?? 96,
  n = e.colour ?? 'rgba(120, 150, 210, 0.085)',
  t = e.scale ?? 3,
  o = document.createElement('canvas');
  o.width = l,
  o.height = l;
  let r = o.getContext('2d');
  return r.imageSmoothingEnabled = !1,
  G(r, '45', 8, 10, n, t),
  G(r, '47', l - 40, l - 38, n, t),
  o
}
function ze(e, l = 0) {
  try {
    let n = window.localStorage.getItem(e);
    if (n === null) return l;
    let t = Number(n);
    return Number.isFinite(t) ? t : l
  } catch {
    return l
  }
}
function je(e, l) {
  try {
    return window.localStorage.setItem(e, String(l)),
    !0
  } catch {
    return !1
  }
}
function Qe(e) {
  let l = `wh-games.${ e }.best`,
  n = ze(l, 0);
  return {
    key: l,
    value() {
      return n
    },
    submit(t) {
      return !Number.isFinite(t) ||
      t <= n ? !1 : (n = t, je(l, n), !0)
    }
  }
}
function Ze(e = {}) {
  let l = e.music ?? null,
  n = document.getElementById(e.buttonId ?? 'sound');
  new URLSearchParams(window.location.search).get('embed') === '1' &&
  document.body.classList.add('embed');
  let t = !1;
  function o() {
    t ||
    !l ||
    (t = !0, l.start())
  }
  function r() {
    if (!n) return;
    let k = B();
    n.setAttribute('aria-pressed', String(!k));
    let i = n.querySelector('.toggle-text');
    i &&
    (i.textContent = k ? 'Sound off' : 'Sound on')
  }
  function a() {
    let k = Ke();
    return r(),
    k ||
    o(),
    k
  }
  return n &&
  n.addEventListener('click', () => {
    o(),
    a()
  }),
  r(),
  {
    startMusicOnce: o,
    toggle: a,
    isMuted: B
  }
}
function et(e, l, n, t, o = {}) {
  let r = o.top ?? 78,
  a = o.height ?? 54;
  e.fillStyle = o.background ?? 'rgba(8, 12, 20, 0.82)',
  e.fillRect(0, r, l, a),
  H(e, n, l / 2, r + 8, o.titleColour ?? '#ffe680', 2),
  H(e, t, l / 2, r + 30, o.subtitleColour ?? '#e8edf5')
}
var Yt = 10,
tt = 12,
Ut = 12,
$ = 5,
ce = 10;
function Se({
  lines: e = [],
  prompt: l,
  best: n,
  titleScale: t = 2
}) {
  let o = tt + O * t;
  return e.length > 0 &&
  (o += ce + e.length * (O + $) - $),
  l &&
  (o += ce + O),
  n &&
  (o += $ + O),
  o + Ut
}
function lt(e, l, n, t) {
  let {
    title: o,
    lines: r = [],
    prompt: a,
    best: k,
    titleScale: i = 2,
    fade: s = 1,
    top: h
  }
  = t;
  e.fillStyle = `rgba(8, 12, 20, ${ (0.72 * s).toFixed(3) })`,
  e.fillRect(0, 0, l, n);
  let f = Math.max(N(o, i), ...r.map(v => N(v)), a ? N(a) : 0, k ? N(k) : 0),
  p = Math.min(l - 8, f + Yt * 2 + 8),
  c = Se({
    lines: r,
    prompt: a,
    best: k,
    titleScale: i
  }),
  d = Math.round((l - p) / 2),
  u = Math.round(h ?? (n - c) / 2);
  e.globalAlpha = s,
  e.fillStyle = '#0b1020',
  e.fillRect(d, u, p, c),
  e.fillStyle = '#18233f',
  e.fillRect(d + 1, u + 1, p - 2, c - 2),
  e.fillStyle = '#0d1326',
  e.fillRect(d + 3, u + 3, p - 6, c - 6),
  e.fillStyle = '#2c3a5e',
  e.fillRect(d + 1, u + 1, p - 2, 1),
  e.fillRect(d + 1, u + 1, 1, c - 2);
  let w = u + tt;
  for (let[v,
  g]of [
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
  ]) H(e, o, l / 2 + v, w + g, '#0b1020', i);
  if (H(e, o, l / 2, w, '#ffe680', i), w += O * i, r.length > 0) {
    w += ce;
    for (let v of r) H(e, v, l / 2, w, '#9fb4c8'),
    w += O + $;
    w -= $
  }
  a &&
  (w += ce, H(e, a, l / 2, w, '#ffe680'), w += O),
  k &&
  (w += $, H(e, k, l / 2, w, '#c9a227')),
  e.globalAlpha = 1
}
function R(e) {
  let l = e.reduce((n, t) => Math.max(n, t.length), 0);
  return e.map(n => n.padEnd(l, '.'))
}
var Ae = {
  k: '#241a12',
  b: '#6b4a2a',
  d: '#4a3219',
  t: '#8f6837',
  w: '#f7f4ec',
  s: '#d5cfc0',
  y: '#f2b705',
  e: '#101010',
  p: '#faf4e4',
  i: '#4a5260',
  r: '#a83232'
},
Wt = R(
  ['.........kkkk',
  '........ktttk',
  '.......kttttk',
  '......kttttdk',
  '.....ktttttdk..kkkk',
  '....kttttttdk.kwwwwk',
  '....kttttttdk.kwewwkyy',
  '.....kkttttdkkwwwwwkyy',
  '.kkkkbbbbbbbbbwwwwwkk',
  'kwwwsbbbbbbbbbbbwwkk',
  'kwwwsbbbbbbbbbbbkk',
  '.kwwsbbbbbbbbbbkk',
  '..kkkbbbbbbbbkk',
  '......kyykkyyk',
  '.......yy..yy',
  '......kkkkkkkkk',
  '......kpppppppk',
  '......kpiiiiipk',
  '......kpppppppk',
  '......kpiiiirrk',
  '......kpppppppk',
  '......kpiiiprrk',
  '......kpppppppk',
  '......kkkkkkkkk']
),
qt = R(
  ['',
  '',
  '',
  '',
  '...............kkkk',
  '..............kwwwwk',
  '.....kkkkkkkk.kwewwkyy',
  '....kttttttdkkwwwwwkyy',
  '.kkkkttttdddkbwwwwwkk',
  'kwwwskkddddkkbbbwwkk',
  'kwwwsbbbbbbbbbbbkk',
  '.kwwsbbbbbbbbbbkk',
  '..kkkbbbbbbbbkk',
  '......kyykkyyk',
  '.......yy..yy',
  '......kkkkkkkkk',
  '......kpppppppk',
  '......kpiiiiipk',
  '......kpppppppk',
  '......kpiiiirrk',
  '......kpppppppk',
  '......kpiiiprrk',
  '......kpppppppk',
  '......kkkkkkkkk']
),
Vt = R(
  ['',
  '',
  '',
  '',
  '...............kkkk',
  '..............kwwwwk',
  '..............kwewwkyy',
  '........kkkkkkwwwwwkyy',
  '.kkkkbbbbbbbbbwwwwwkk',
  'kwwwsbbbbbbbbbbbwwkk',
  'kwwwsbbbbbbbbbbbkk',
  '.kwwskkkkkbbbbbkk',
  '..kkkttttkkbbkk',
  '....kttttdkyyk',
  '.....kkddk.yy',
  '......kkkkkkkkk',
  '......kpppppppk',
  '......kpiiiiipk',
  '......kpppppppk',
  '......kpiiiirrk',
  '......kpppppppk',
  '......kpiiiprrk',
  '......kpppppppk',
  '......kkkkkkkkk']
),
D = {
  k: '#4e5666',
  l: '#eef1f7',
  s: '#cdd4e0',
  d: '#9aa4b6',
  w: '#75809a',
  g: '#c8a24a'
},
ot = D.l,
rt = D.s,
$t = R(
  ['...ll...',
  '..llss..',
  '..llss..',
  '.lllsss.',
  '.lllsss.',
  'llllssss']
),
Kt = R(
  ['..........ll..........',
  '.........kllk.........',
  '........kllllk........',
  '.......kllllllk.......',
  '......klllllllsk......',
  '......klllllllsk......',
  '.....kslllllllssk.....',
  '.....kslllllllssk.....',
  '....kkslllllllsskk....',
  '...kslllwlllwllllsk...',
  '..ksllllllllllllllsk..',
  '.kslllllllllllllllssk.',
  'kslwlwlwlwlwlwlwlwlssk',
  'kslllllllllllllllllsdk',
  'kslwlwlwlwlwlwlwlwlsdk',
  'kslllllllllllllllllsdk',
  'kkkkkkkkkkkkkkkkkkkkkk']
),
Xt = {
  k: '#8a7f74',
  l: '#ffffff',
  s: '#f2ece2',
  d: '#d8cfc2',
  w: '#a8967f',
  g: '#c8a24a'
},
Jt = R(
  ['.....................g',
  '.....................g',
  '....................kllk',
  '...................kllllk',
  '..................kllllllk',
  '.................kllllllllk',
  '................kllllllllllk',
  '................kkkkkkkkkkkk',
  '.............kllkllllllllllkllk',
  '.............kllklwwlwwlwwlkllk',
  '.............kllklwwlwwlwwlkllk',
  '.............kllklwwlwwlwwlkllk',
  'kkkkkkkkkkkkkkllklwwlwwlwwlkllkkkkkkkkkkkkkk',
  'klllllllllllkkllklwwlwwlwwlkllkklllllllllllk',
  'klwlwlwlwlwlkkllklwwlwwlwwlkllkklwlwlwlwlwlk',
  'klllllllllllkkllklwwlwwlwwlkllkklllllllllllk',
  'klwlwlwlwlwlkkllklwwlwwlwwlkllkklwlwlwlwlwlk',
  'kdddddddddddkkddddddddddddddddkkdddddddddddk',
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk']
),
zt = R(
  ['...........ll',
  '..........kllk',
  '.........kkllkk',
  '........klllllllk',
  '.......klllllllsk',
  '......ksllllllllsk',
  '......ksllllllllsk',
  '.....kkslllllllsskk',
  '....kkkkkkkkkkkkkkkkk',
  '...kslslslslslslslslsk',
  '...kslslslslslslslslsk',
  '...kslslslslslslslslsk',
  '..kkkkkkkkkkkkkkkkkkkkk',
  '.kdddddddddddddddddddddk',
  'kkkkkkkkkkkkkkkkkkkkkkkkk']
),
jt = R(
  ['kkkkkkkkkkkkkkkkkkkk',
  'kllllllllllllllllllk',
  'kddddddddddddddddddk',
  'klwlwlwlwlwlwlwlwllk',
  'klwlwlwlwlwlwlwlwllk',
  'klwlwlwlwlwlwlwlwllk',
  'klwlwlwlwlwlwlwlwllk',
  'kllllllllllllllllllk',
  'kddddddddddddddddddk',
  'kkkkkkkkkkkkkkkkkkkk']
),
Qt = {
  k: '#3b201a',
  r: '#9c5241',
  m: '#6d3629',
  l: '#c47a5f',
  w: '#2a1a1e',
  g: '#c8a24a'
},
Zt = R(
  ['....g..........g',
  '...kkk........kkk',
  '...krk........krk',
  '..kkrkk......kkrkk',
  '..krrrk......krrrk',
  '..klrmk......klrmk',
  '..krwrk......krwrk',
  '..klrmk.kkk..klrmk',
  '..krrrkkkrkkkkrrrk',
  '..klrmkkrrrkkklrmk',
  'kkkkrwrkklrmkkrwrkkk',
  'krrklrmkkrwrkklrmkrk',
  'krwkrrrkklrmkkrrrkwk',
  'krrklwrkkrwrkklwrkrk',
  'kmmkmmmkkmmmkkmmmkmk',
  'kkkkkkkkkkkkkkkkkkkk']
),
el = R(
  ['kkkkkkkkkkkk',
  'kllllllllllk',
  'klwlwlwlwlwk',
  'kllllllllllk',
  'klwlwlwlwlwk',
  'kllllllllllk',
  'klwlwlwlwlwk',
  'kddddddddddk',
  'kkkkkkkkkkkk']
),
I = {
  outline: '#2b2f3a',
  light: '#fffdf6',
  face: '#ece5d4',
  shade: '#c3b79c',
  flute: '#d3c8ae',
  gold: '#d8a930'
},
tl = {
  k: I.outline,
  l: I.light,
  s: I.face,
  d: I.shade,
  g: I.gold
},
ll = R(
  ['..kkkkkkkkkkkkkkkkkk..',
  '..klllllllllllllllsk..',
  '..kssssssssssssssssk..',
  '.kllllllllllllllllllk.',
  '.kgggggggggggggggggdk.',
  'klllllllllllllllllllsk',
  'kssssssssssssssssssssk',
  'kkkkkkkkkkkkkkkkkkkkkk']
),
nt = {
  k: '#123320',
  g: '#1d5c31',
  l: '#2c8440',
  t: '#4a3a24',
  p: '#f0a8bd',
  q: '#d97f9c'
},
nl = R(
  ['..kkkk..',
  '.kgllgk.',
  'kglllllk',
  'kgllllgk',
  '.kgllgk.',
  '...tt...',
  '...tt...']
),
ol = R(
  ['..kppk..',
  '.kpqqpk.',
  'kppqqppk',
  '.kpqqpk.',
  '...tk...',
  '...tt...']
),
at = {
  feather: [
    '#f7f4ec',
    '#d5cfc0',
    '#8f6837',
    '#6b4a2a'
  ],
  bill: [
    '#faf4e4',
    '#e2d8bf',
    '#a83232',
    '#4a5260'
  ]
},
M = {};
function kt() {
  M.eagleUp = S(Wt, Ae),
  M.eagleMid = S(qt, Ae),
  M.eagleDown = S(Vt, Ae),
  M.monumentCap = S($t, D),
  M.capitol = S(Kt, D),
  M.whiteHouse = S(Jt, Xt),
  M.jefferson = S(zt, D),
  M.lincoln = S(jt, D),
  M.castle = S(Zt, Qt),
  M.fedBlock = S(el, D),
  M.columnCap = S(ll, tl),
  M.elm = S(nl, nt),
  M.cherry = S(ol, nt)
}
var rl = '#12417c',
al = '#4f8ec9',
kl = '#c6dfef',
fe = 208,
ue = 40;
function st(e, l, n) {
  let t = e.createLinearGradient(0, 0, 0, n);
  t.addColorStop(0, rl),
  t.addColorStop(0.55, al),
  t.addColorStop(1, kl),
  e.fillStyle = t,
  e.fillRect(0, 0, l, n);
  let o = e.createRadialGradient(fe, ue, 0, fe, ue, 52);
  o.addColorStop(0, 'rgba(255, 244, 214, 0.5)'),
  o.addColorStop(1, 'rgba(255, 244, 214, 0)'),
  e.fillStyle = o,
  e.fillRect(fe - 52, ue - 52, 104, 104),
  e.fillStyle = '#fff6d8',
  e.beginPath(),
  e.arc(fe, ue, 6, 0, Math.PI * 2),
  e.fill()
}
var F = [
  '..####....',
  '.########.',
  '##########',
  '.########.'
],
il = [
  {
    x: 0.05,
    y: 20,
    scale: 2,
    speed: 3.1,
    alpha: 0.9
  },
  {
    x: 0.32,
    y: 46,
    scale: 1,
    speed: 4.4,
    alpha: 0.75
  },
  {
    x: 0.55,
    y: 14,
    scale: 3,
    speed: 2.2,
    alpha: 0.8
  },
  {
    x: 0.78,
    y: 58,
    scale: 2,
    speed: 3.6,
    alpha: 0.65
  },
  {
    x: 0.9,
    y: 34,
    scale: 1,
    speed: 5,
    alpha: 0.6
  }
];
function ct(e, l, n) {
  for (let t of il) {
    let o = l + F[0].length * t.scale,
    r = (t.x * o + n * t.speed) % o,
    a = Math.round(l - r);
    e.globalAlpha = t.alpha,
    e.fillStyle = '#ffffff';
    for (let k = 0; k < F.length; k += 1) for (let i = 0; i < F[k].length; i += 1) F[k][i] === '#' &&
    e.fillRect(a + i * t.scale, t.y + k * t.scale, t.scale, t.scale);
    e.globalAlpha = t.alpha * 0.45,
    e.fillStyle = '#bcd2e6';
    for (let k = 0; k < F[0].length; k += 1) F[F.length - 1][k] === '#' &&
    e.fillRect(a + k * t.scale, t.y + F.length * t.scale, t.scale, t.scale)
  }
  e.globalAlpha = 1
}
function _e(e, l, n, t = 0) {
  let o = document.createElement('canvas');
  o.width = e,
  o.height = l;
  let r = o.getContext('2d');
  return r.imageSmoothingEnabled = !1,
  n(r),
  t > 0 &&
  (
    r.globalCompositeOperation = 'source-atop',
    r.fillStyle = `rgba(198, 223, 239, ${ t })`,
    r.fillRect(0, 0, e, l),
    r.globalCompositeOperation = 'source-over'
  ),
  o
}
function pe(e, l, n, t, o) {
  let r = l.width,
  a = - ((t % r + r) % r);
  for (let k = a; k < n; k += r) e.drawImage(l, Math.round(k), o)
}
var sl = 288,
Q = 40;
function ft(e) {
  return _e(
    sl,
    Q,
    l => {
      let n = e.fedBlock,
      t = [
        0,
        5,
        2,
        8,
        1,
        6,
        3,
        7,
        0,
        4,
        9,
        2
      ];
      for (let o = 0; o < t.length; o += 1) {
        let r = o * 24;
        C(l, n, r, Q - n.height - t[o]),
        C(l, n, r + 12, Q - n.height - (t[o] + 3) % 6)
      }
    },
    0.5
  )
}
var K = 512,
de = 108,
Re = 92,
ve = 8,
cl = [
  {
    x: 240,
    height: 30,
    phase: 0
  },
  {
    x: 356,
    height: 26,
    phase: 1.7
  }
];
function ut(e) {
  return _e(
    K,
    de,
    l => {
      let n = de,
      t = (a, k) => C(l, a, k, n - a.height);
      t(e.lincoln, 14),
      t(e.fedBlock, 48),
      t(e.jefferson, 74);
      let o = e.monumentCap,
      r = n - Re;
      C(l, o, 132, r),
      l.fillStyle = ot,
      l.fillRect(132, r + o.height, ve / 2, Re - o.height),
      l.fillStyle = rt,
      l.fillRect(132 + ve / 2, r + o.height, ve / 2, Re - o.height),
      t(e.fedBlock, 158),
      t(e.castle, 186),
      t(e.fedBlock, 222),
      t(e.whiteHouse, 248),
      t(e.fedBlock, 310),
      t(e.fedBlock, 334),
      t(e.capitol, 366),
      t(e.fedBlock, 404),
      t(e.jefferson, 430),
      t(e.fedBlock, 470),
      l.fillStyle = 'rgba(30, 48, 70, 0.22)',
      l.fillRect(0, n - 2, K, 2)
    },
    0.22
  )
}
var Le = 288,
Z = 12;
function dt(e) {
  return _e(
    Le,
    Z,
    l => {
      for (let n = 0; n * 18 < Le; n += 1) {
        let t = n * 18,
        o = n % 4 === 1 ? e.cherry : e.elm;
        C(l, o, t, Z - o.height)
      }
      l.fillStyle = '#153d24',
      l.fillRect(0, Z - 3, Le, 3)
    }
  )
}
var fl = '#b22234',
ul = '#ffffff',
dl = '#3c3b6e';
function pt(e, l, n = 7) {
  let t = document.createElement('canvas');
  t.width = e,
  t.height = l;
  let o = t.getContext('2d');
  o.imageSmoothingEnabled = !1;
  for (let r = 0; r < n; r += 1) {
    let a = Math.round(r * l / n),
    k = Math.round((r + 1) * l / n);
    o.fillStyle = r % 2 === 0 ? fl : ul,
    o.fillRect(0, a, e, Math.max(1, k - a))
  }
  return o.fillStyle = dl,
  o.fillRect(0, 0, Math.round(e * 0.4), Math.round(l * 4 / n)),
  t
}
function pl(e, l, n, t, o, r, a) {
  e.fillStyle = '#dfe4ec',
  e.fillRect(n, t, 1, o),
  e.fillStyle = '#e8b93a',
  e.fillRect(n, t - 1, 1, 1);
  for (let k = 0; k < l.width; k += 1) {
    let i = k / l.width,
    s = Math.sin(i * 5 - r * 4 + a) * i * 1.8;
    e.drawImage(l, k, 0, 1, l.height, n + 1 + k, Math.round(t + s), 1, l.height)
  }
}
function mt(e, l, n, t, o, r) {
  let a = - ((t % K + K) % K);
  for (let k = a; k < n; k += K) for (let i of cl) {
    let s = Math.round(k + i.x);
    s < - 12 ||
    s > n + 12 ||
    pl(e, l, s, o - i.height, i.height, r, i.phase)
  }
}
var ml = '#cfc4a8',
it = '#a89c80',
hl = '#3c6a33',
wl = '#4a7d3e',
gl = '#2c5026';
function ht(e, l, n, t, o) {
  e.fillStyle = ml,
  e.fillRect(0, t, l, 6),
  e.fillStyle = it,
  e.fillRect(0, t + 6, l, 1),
  e.fillStyle = hl,
  e.fillRect(0, t + 7, l, n - t - 7),
  e.fillStyle = wl;
  let r = 26,
  a = - ((o % r + r) % r);
  for (let s = a; s < l; s += r) e.fillRect(Math.round(s), t + 7, 13, n - t - 7);
  e.fillStyle = it;
  let k = 7,
  i = - ((o % k + k) % k);
  for (let s = i; s < l; s += k) e.fillRect(Math.round(s), t + 2, 1, 1),
  e.fillRect(Math.round(s) + 3, t + 4, 1, 1);
  e.fillStyle = gl,
  e.fillRect(0, n - 3, l, 3)
}
function wt(e) {
  let l = e >>> 0;
  return function () {
    l += 1831565813;
    let t = l;
    return t = Math.imul(t ^ t >>> 15, t | 1),
    t ^= t + Math.imul(t ^ t >>> 7, t | 61),
    ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}
var E = 194,
Y = 66,
ee = 22;
var gt = 5,
yl = 6,
bl = 8,
me = 20,
Ml = 640,
xl = - 196,
El = 268,
he = 22,
Tl = 112,
Sl = 72,
Al = 56,
Rl = 60,
vl = 94,
Mt = 20,
Ll = 24,
_l = 30,
Cl = 44,
Il = 60,
Pl = 82,
Gl = - 70;
function xt(e, l, n) {
  let t = Math.min(1, Math.max(0, n));
  return e + (l - e) * t
}
function Ce(e) {
  return xt(Rl, vl, e / Mt)
}
function Hl(e) {
  return Math.round(xt(Sl, Al, e / Mt))
}
function Nl(e) {
  return {
    x: Y + gt,
    y: e.y + yl,
    w: ee - gt * 2,
    h: bl
  }
}
function Ie(e) {
  let l = e.gapY + e.gap;
  return {
    top: {
      x: e.x,
      y: 0,
      w: he,
      h: e.gapY
    },
    bottom: {
      x: e.x,
      y: l,
      w: he,
      h: E - l
    }
  }
}
function yt(e, l) {
  return e.x < l.x + l.w &&
  e.x + e.w > l.x &&
  e.y < l.y + l.h &&
  e.y + e.h > l.y
}
function Ol(e, l) {
  let n = Ll,
  t = E - l - _l,
  o = n + l / 2,
  r = t + l / 2,
  a = e.columns[e.columns.length - 1],
  k = a ? a.gapY + a.gap / 2 : (o + r) / 2,
  i = (e.rng() * 2 - 1) * Cl,
  s = Math.min(r, Math.max(o, k + i));
  return Math.round(s - l / 2)
}
function bt(e, l) {
  let n = Hl(e.score);
  e.columns.push({
    x: l,
    gap: n,
    gapY: Ol(e, n),
    passed: !1
  })
}
function Pe(e = {}) {
  return {
    phase: 'ready',
    rng: wt(e.seed ?? 1),
    elapsed: 0,
    t: 0,
    y: Pl,
    vy: 0,
    columns: [],
    score: 0,
    events: []
  }
}
function Et(e) {
  return e.phase === 'falling' ||
  e.phase === 'dead' ? !1 : (
    e.phase === 'ready' &&
    (e.phase = 'playing', e.t = 0),
    e.vy = xl,
    e.events.push({
      type: 'flap'
    }),
    !0
  )
}
function Fl(e, l) {
  e.phase = 'falling',
  e.t = 0,
  e.vy = Gl,
  e.events.push({
    type: 'crash',
    x: Y + ee / 2,
    y: l
  })
}
function Tt(e, l, n) {
  if (e.t += l, e.phase === 'dead' || e.phase === 'ready') return;
  if (
    e.elapsed += l,
    e.vy = Math.min(El, e.vy + Ml * l),
    e.y += e.vy * l,
    e.y < 0 &&
    (e.y = 0, e.vy = 0),
    e.phase === 'falling'
  ) {
    e.y + me >= E &&
    (
      e.y = E - me,
      e.vy = 0,
      e.phase = 'dead',
      e.t = 0,
      e.events.push({
        type: 'land',
        x: Y + ee / 2,
        y: E
      })
    );
    return
  }
  let t = Ce(e.score);
  for (let a of e.columns) a.x -= t * l;
  for (
    e.columns.length > 0 &&
    e.columns[0].x + he < 0 &&
    e.columns.shift(),
    e.columns.length === 0 &&
    bt(e, n.width + Il);
    e.columns[e.columns.length - 1].x < n.width;
  ) bt(e, e.columns[e.columns.length - 1].x + Tl);
  if (e.y + me >= E) {
    e.y = E - me,
    e.vy = 0,
    e.phase = 'dead',
    e.t = 0;
    let a = Y + ee / 2;
    e.events.push({
      type: 'crash',
      x: a,
      y: E
    }),
    e.events.push({
      type: 'land',
      x: a,
      y: E
    });
    return
  }
  let o = Nl(e);
  for (let a of e.columns) {
    let {
      top: k,
      bottom: i
    }
    = Ie(a);
    if (yt(o, k) || yt(o, i)) {
      Fl(e, o.y + o.h / 2);
      return
    }
  }
  let r = Y + ee / 2;
  for (let a of e.columns) a.passed ||
  a.x + he > r ||
  (
    a.passed = !0,
    e.score += 1,
    e.events.push({
      type: 'score',
      score: e.score
    })
  )
}
var L = 256,
ye = 224,
He = window.matchMedia?.('(prefers-reduced-motion: reduce)') ?.matches ?? !1,
Ge = {
  far: 0.16,
  near: 0.42,
  trees: 0.78
},
Bl = 0.7,
Rt = 0.26,
Dl = {
  top: 116,
  height: 50
},
vt = {
  title: 'FLAPPY BILL',
  lines: [
    'KEEP THE BILL IN THE AIR',
    'WHILE FLYING THROUGH MONUMENTS'
  ],
  prompt: 'CLICK OR PRESS SPACE TO FLY'
},
Yl = Math.round((E - Se(vt)) / 2),
Lt = document.getElementById('game'),
Fe = De(
  Lt,
  {
    width: L,
    height: ye,
    background: '#080a10',
    backdropTile: Je()
  }
),
Ul = Ye(Lt, Fe),
b = Fe.ctx;
kt();
function Wl(e) {
  let l = document.createElement('canvas');
  l.width = e.width,
  l.height = e.height;
  let n = l.getContext('2d');
  return n.imageSmoothingEnabled = !1,
  n.translate(0, e.height),
  n.scale(1, - 1),
  n.drawImage(e.image, 0, 0),
  {
    width: e.width,
    height: e.height,
    image: l
  }
}
var ge = M.columnCap,
St = Wl(ge),
ql = ft(M),
Vl = ut(M),
$l = dt(M),
Kl = pt(11, 7),
X = $e({
  palettes: at,
  dust: [
    '#4a7d3e',
    '#cfc4a8'
  ]
}),
Xl = Xe(),
_t = Ze({
  music: Xl
}),
J = Qe('flappy-bill'),
oe = document.createElement('div');
oe.setAttribute('role', 'status');
oe.setAttribute('aria-live', 'polite');
oe.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap';
document.body.appendChild(oe);
var m = Pe({
  seed: Date.now() / 1000 | 0
}),
Jl = {
  width: L,
  height: ye
},
be = 0,
te = 0,
le = 0,
_ = 0,
ne = 0,
Be = !1,
Ne = - 1,
Oe = '';
function we(e) {
  oe.textContent = e
}
function zl() {
  ke(0.05, 0.028),
  V({
    freq: 280,
    endFreq: 170,
    duration: 0.07,
    type: 'sine',
    gain: 0.022
  })
}
function jl() {
  V({
    freq: 880,
    duration: 0.07,
    type: 'triangle',
    gain: 0.04
  }),
  setTimeout(() => V({
    freq: 1320,
    duration: 0.1,
    type: 'triangle',
    gain: 0.035
  }), 55)
}
function Ql() {
  ke(0.14, 0.06),
  V({
    freq: 220,
    endFreq: 90,
    duration: 0.18,
    type: 'sawtooth',
    gain: 0.04
  })
}
function Zl() {
  V({
    freq: 120,
    endFreq: 60,
    duration: 0.16,
    type: 'sine',
    gain: 0.05
  }),
  ke(0.07, 0.035)
}
function Ct() {
  m = Pe({
    seed: Date.now() / 1000 | 0
  }),
  X.clear(),
  ne = 0,
  _ = 0,
  Be = !1,
  Ne = - 1,
  Oe = ''
}
function It() {
  if (_t.startMusicOnce(), m.phase === 'dead') {
    m.t >= Bl &&
    Ct();
    return
  }
  Et(m)
}
document.addEventListener(
  'keydown',
  e => {
    if (e.key === 'm' || e.key === 'M') {
      _t.toggle();
      return
    }
    if (e.key === 'r' || e.key === 'R') {
      Ct();
      return
    }
    if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      if (e.preventDefault(), e.repeat) return;
      It()
    }
  }
);
function en(e) {
  be += e;
  let l = Ul.takeGrabs();
  for (let t = 0; t < l.length; t += 1) It();
  Tt(m, e, Jl);
  for (let t of m.events) switch (t.type) {
    case 'flap':
      le = Rt,
      zl();
      break;
    case 'score':
      jl(),
      ne = 1,
      J.submit(t.score) &&
      (Be = !0);
      break;
    case 'crash':
      Ql(),
      X.burst(t.x, t.y, 'feather', 1.6),
      X.burst(t.x, t.y + 6, 'bill', 0.9),
      He ||
      (_ = Math.max(_, 3.4));
      break;
    case 'land':
      Zl(),
      X.splat(t.x, t.y, 'feather'),
      He ||
      (_ = Math.max(_, 2));
      break;
    default:
      break
  }
  m.events.length = 0,
  (m.phase === 'ready' || m.phase === 'playing') &&
  (te += Ce(m.score) * e),
  X.update(e),
  le = Math.max(0, le - e),
  ne = Math.max(0, ne - e * 3.5),
  _ *= Math.max(0, 1 - 9 * e),
  _ < 0.05 &&
  (_ = 0),
  tn()
}
function tn() {
  if (
    m.phase !== Oe &&
    (
      Oe = m.phase,
      m.phase === 'ready' &&
      we('Ready. Press space to fly.'),
      m.phase === 'playing' &&
      we('Flying.'),
      m.phase === 'dead'
    )
  ) {
    let e = J.value() > 0 ? `, best ${ J.value() }` : '';
    we(
      `Grounded. ${ m.score } columns cleared${ e }. Press space to fly again.`
    );
    return
  }
  m.phase === 'playing' &&
  m.score !== Ne &&
  (Ne = m.score, m.score > 0 && we(`${ m.score }`))
}
function At(e, l, n) {
  if (n <= 0) return;
  let t = Math.round(l),
  o = Math.round(n);
  b.fillStyle = I.outline,
  b.fillRect(e + 2, t, 18, o),
  b.fillStyle = I.light,
  b.fillRect(e + 3, t, 5, o),
  b.fillStyle = I.face,
  b.fillRect(e + 8, t, 6, o),
  b.fillStyle = I.shade,
  b.fillRect(e + 14, t, 5, o),
  b.fillStyle = I.flute;
  for (let r of [
    5,
    9,
    13,
    17
  ]) b.fillRect(e + r, t, 1, o)
}
function ln(e) {
  let l = Math.round(e.x),
  {
    top: n,
    bottom: t
  }
  = Ie(e),
  o = n.h - St.height;
  At(l, 0, o),
  C(b, St, l, o),
  C(b, ge, l, t.y),
  At(l, t.y + ge.height, E - t.y - ge.height)
}
function nn() {
  if (le > 0) {
    let e = 1 - le / Rt;
    return e < 0.35 ? M.eagleDown : e < 0.7 ? M.eagleMid : M.eagleUp
  }
  return m.vy > 150 ? M.eagleUp : M.eagleMid
}
function on() {
  return m.phase === 'ready' ? 0 : Math.min(1.3, Math.max( - 0.45, m.vy / 380))
}
function rn() {
  let e = m.phase === 'ready' &&
  !He ? Math.sin(be * 3) * 2.5 : 0;
  We(b, nn(), Y, m.y + e, on())
}
function an() {
  if (m.phase === 'ready') return;
  let e = 3,
  l = String(m.score),
  n = Math.round((L - N(l, e)) / 2),
  t = 14 - Math.round(ne * 3);
  G(b, l, n + 1, t + 1, 'rgba(10, 20, 34, 0.55)', e),
  G(b, l, n, t, '#ffffff', e)
}
function kn() {
  J.value() > 0 &&
  (
    G(b, `BEST ${ J.value() }`, 5, 6, 'rgba(10, 20, 34, 0.5)'),
    G(b, `BEST ${ J.value() }`, 4, 5, '#ffe680')
  )
}
function sn() {
  st(b, L, E),
  ct(b, L, be),
  pe(b, ql, L, te * Ge.far, E - Q);
  let e = E - de,
  l = te * Ge.near;
  pe(b, Vl, L, l, e),
  mt(b, Kl, L, l, E, be),
  pe(b, $l, L, te * Ge.trees, E - Z + 1);
  for (let o of m.columns) ln(o);
  if (ht(b, L, ye, E, te), rn(), X.draw(b), an(), kn(), m.phase === 'ready') lt(b, L, ye, {
    ...vt,
    top: Yl
  });
   else if (m.phase === 'dead') {
    let o = Be ? `NEW BEST ${ m.score } - CLICK TO FLY AGAIN` : `${ m.score } CLEARED - CLICK TO FLY AGAIN`;
    et(b, L, 'GROUNDED', o, Dl)
  }
  let n = _ > 0 ? (Math.random() - 0.5) * 2 * _ : 0,
  t = _ > 0 ? (Math.random() - 0.5) * 2 * _ : 0;
  Fe.present(n, t)
}
Ve({
  update: en,
  render: sn
});
