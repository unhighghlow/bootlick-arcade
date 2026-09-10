function Tt(t, e = {}) {
  let o = e.width ?? 256,
  n = e.height ?? 224,
  a = e.background === null ? null : e.background ?? '#000',
  r = e.backdropTile ?? null,
  c = e.presentation === 'smooth',
  i = Number(e.maxBackingScale ?? 2),
  s = Number.isFinite(i) ? Math.max(1, i) : 2,
  l = document.createElement('canvas');
  l.width = o,
  l.height = n;
  let u = l.getContext('2d');
  u.imageSmoothingEnabled = c;
  let d = document.createElement('canvas');
  d.className = c ? 'pixel-screen smooth-screen' : 'pixel-screen';
  let p = d.getContext('2d');
  p.imageSmoothingEnabled = c,
  t.appendChild(d);
  let k = 1,
  E = 0,
  y = 0,
  m = null,
  b = 0.15;
  function w(x) {
    if (x < 1) return x;
    let v = Math.floor(x);
    return x - v < b ? v : x
  }
  function h() {
    let x = t.getBoundingClientRect(),
    v = window.devicePixelRatio ||
    1,
    T = Math.max(1, Math.floor(x.width * v)),
    H = Math.max(1, Math.floor(x.height * v));
    if (k = w(Math.min(T / o, H / n)), c) {
      let tt = Math.min(s, Math.max(1, k)),
      K = Math.max(o, Math.round(o * tt)),
      at = Math.max(n, Math.round(n * tt));
      (l.width !== K || l.height !== at) &&
      (l.width = K, l.height = at),
      u.setTransform(K / o, 0, 0, at / n, 0, 0),
      u.imageSmoothingEnabled = !0
    }
    d.width = T,
    d.height = H,
    d.style.width = `${ x.width }px`,
    d.style.height = `${ x.height }px`,
    p.imageSmoothingEnabled = c,
    E = Math.max(0, Math.floor((T - o * k) / 2)),
    y = Math.max(0, Math.floor((H - n * k) / 2))
  }
  function R(x = 0, v = 0) {
    a ? (p.fillStyle = a, p.fillRect(0, 0, d.width, d.height)) : p.clearRect(0, 0, d.width, d.height),
    r &&
    (
      m ||
      (m = p.createPattern(r, 'repeat')),
      m &&
      (p.fillStyle = m, p.fillRect(0, 0, d.width, d.height))
    ),
    p.drawImage(l, E + Math.round(x) * k, y + Math.round(v) * k, o * k, n * k)
  }
  function Z(x, v) {
    let T = d.getBoundingClientRect(),
    H = window.devicePixelRatio ||
    1,
    tt = (x - T.left) * H,
    K = (v - T.top) * H;
    return {
      x: (tt - E) / k,
      y: (K - y) / k
    }
  }
  return h(),
  typeof ResizeObserver == 'function' ? new ResizeObserver(h).observe(t) : window.addEventListener('resize', h),
  {
    canvas: l,
    ctx: u,
    width: o,
    height: n,
    present: R,
    toGame: Z
  }
}
var le = new Set(
  ['w',
  'a',
  's',
  'd',
  'arrowup',
  'arrowleft',
  'arrowdown',
  'arrowright']
);
function At(t, e, o = {}) {
  let n = {
    x: 0,
    y: 0
  },
  a = [],
  r = !1,
  c = [],
  i = o.cursor ?? null,
  s = new Set,
  l = typeof window > 'u' ? null : window;
  function u() {
    return i !== null &&
    (i.active ? i.active() : !0)
  }
  function d(w) {
    let h = String(w.key).toLowerCase();
    le.has(h) &&
    u() &&
    (s.add(h), w.preventDefault?.())
  }
  function p(w) {
    s.delete(String(w.key).toLowerCase())
  }
  function k() {
    s.clear()
  }
  function E(w, h) {
    let R = i.bounds;
    return {
      x: Math.max(R.x0, Math.min(R.x1, w)),
      y: Math.max(R.y0, Math.min(R.y1, h))
    }
  }
  function y(w) {
    let h = e.toGame(w.clientX, w.clientY);
    n.x = h.x,
    n.y = h.y,
    r &&
    c.push({
      x: h.x,
      y: h.y
    })
  }
  function m() {
    r = !1
  }
  function b(w) {
    if (w.button !== 0) return;
    w.preventDefault();
    let h = e.toGame(w.clientX, w.clientY);
    n.x = h.x,
    n.y = h.y,
    a.push({
      x: h.x,
      y: h.y
    }),
    r = !0,
    c.push({
      x: h.x,
      y: h.y
    })
  }
  return t.addEventListener('pointermove', y, {
    passive: !0
  }),
  t.addEventListener('pointerdown', b),
  t.addEventListener('pointerup', m),
  t.addEventListener('pointercancel', m),
  t.addEventListener('contextmenu', w => w.preventDefault()),
  i &&
  (
    l?.addEventListener('keydown', d),
    l?.addEventListener('keyup', p),
    l?.addEventListener('blur', k)
  ),
  t.style.touchAction = 'none',
  {
    aim: n,
    get down() {
      return r
    },
    takeGrabs() {
      let w = a;
      return a = [],
      w
    },
    takeStroke() {
      let w = c;
      return c = [],
      w
    },
    stepCursor(w) {
      if (!u() || s.size === 0) return [];
      let h = 0,
      R = 0;
      if (
        (s.has('a') || s.has('arrowleft')) &&
        (h -= 1),
        (s.has('d') || s.has('arrowright')) &&
        (h += 1),
        (s.has('w') || s.has('arrowup')) &&
        (R -= 1),
        (s.has('s') || s.has('arrowdown')) &&
        (R += 1),
        h === 0 &&
        R === 0
      ) return [];
      let Z = Math.hypot(h, R),
      x = i.speed * (Number.isFinite(w) && w > 0 ? w : 0),
      v = E(n.x, n.y),
      T = E(v.x + h / Z * x, v.y + R / Z * x);
      return n.x = T.x,
      n.y = T.y,
      [
        v,
        T
      ]
    },
    dispose() {
      t.removeEventListener('pointermove', y),
      t.removeEventListener('pointerdown', b),
      t.removeEventListener('pointerup', m),
      t.removeEventListener('pointercancel', m),
      l?.removeEventListener('keydown', d),
      l?.removeEventListener('keyup', p),
      l?.removeEventListener('blur', k),
      s.clear()
    }
  }
}
function I(t, e) {
  let o = t.length,
  n = o > 0 ? t[0].length : 0;
  for (let c of t) if (c.length !== n) throw new Error(
    `sprite rows must be equal length (expected ${ n }, got ${ c.length })`
  );
  let a = document.createElement('canvas');
  a.width = Math.max(1, n),
  a.height = Math.max(1, o);
  let r = a.getContext('2d');
  r.imageSmoothingEnabled = !1;
  for (let c = 0; c < o; c += 1) for (let i = 0; i < n; i += 1) {
    let s = t[c][i];
    if (s === '.' || s === ' ') continue;
    let l = e[s];
    l &&
    (r.fillStyle = l, r.fillRect(i, c, 1, 1))
  }
  return {
    width: n,
    height: o,
    image: a
  }
}
function it(t, e, o, n, a = !1) {
  let r = Math.floor(o),
  c = Math.floor(n);
  if (!a) {
    t.drawImage(e.image, r, c);
    return
  }
  t.save(),
  t.translate(r + e.width, c),
  t.scale( - 1, 1),
  t.drawImage(e.image, 0, 0),
  t.restore()
}
var ue = {
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
dt = new Map(Object.entries(ue));
function O(t, e = 1) {
  return t.length === 0 ? 0 : (t.length * 6 - 1) * e
}
var _ = 7,
fe = 32,
st = new Map,
Lt = null;
function ke() {
  return Lt ||
  (
    typeof document < 'u' &&
    typeof document.createElement == 'function' ? () => document.createElement('canvas') : null
  )
}
function we(t, e) {
  let o = ke();
  if (!o) return null;
  let n = o();
  if (!n || typeof n.getContext != 'function') return null;
  let a = [
    ...dt.keys()
  ],
  r = 5 * e,
  c = 7 * e;
  n.width = r * a.length,
  n.height = c;
  let i = n.getContext('2d');
  if (!i || typeof i.fillRect != 'function') return null;
  i.fillStyle = t;
  let s = new Map;
  for (let l = 0; l < a.length; l += 1) {
    let u = a[l],
    d = l * r;
    s.set(u, d);
    let p = dt.get(u);
    for (let k = 0; k < 7; k += 1) {
      let E = p[k];
      for (let y = 0; y < 5; y += 1) E[y] === '#' &&
      i.fillRect(d + y * e, k * e, e, e)
    }
  }
  return {
    canvas: n,
    offsets: s,
    gw: r,
    gh: c
  }
}
function pe(t, e, o) {
  if (!Number.isInteger(o) || o < 1 || typeof t.drawImage != 'function') return null;
  let n = `${ o }|${ e }`,
  a = st.get(n);
  if (a) return a;
  if (st.size >= fe) return null;
  let r = we(e, o);
  return r &&
  st.set(n, r),
  r
}
function G(t, e, o, n, a, r = 1) {
  t.fillStyle = a;
  let c = Math.round(o),
  i = Math.round(n),
  s = pe(t, a, r);
  for (let l of String(e).toUpperCase()) {
    if (l === ' ') {
      c += 6 * r;
      continue
    }
    if (s) {
      let u = s.offsets.get(l);
      u !== void 0 &&
      t.drawImage(s.canvas, u, 0, s.gw, s.gh, c, i, s.gw, s.gh)
    } else {
      let u = dt.get(l);
      if (u) for (let d = 0; d < 7; d += 1) {
        let p = u[d];
        for (let k = 0; k < 5; k += 1) p[k] === '#' &&
        t.fillRect(c + k * r, i + d * r, r, r)
      }
    }
    c += 6 * r
  }
  return c
}
function A(t, e, o, n, a, r = 1) {
  G(t, e, Math.round(o - O(e, r) / 2), n, a, r)
}
function Ct({
  update: t,
  render: e,
  fps: o = 60
}) {
  let n = 1 / o,
  a = 1000 / o,
  r = performance.now(),
  c = 0,
  i = 0,
  s = !0;
  function l(u) {
    if (!s) return;
    i = requestAnimationFrame(l);
    let d = Math.min(Math.max(0, u - r), 250);
    for (r = u, c += d; c >= a; ) t(n),
    c -= a;
    e(c / a, d / 1000)
  }
  return i = requestAnimationFrame(l),
  {
    stop() {
      s = !1,
      cancelAnimationFrame(i)
    }
  }
}
var he = [
  '#ffffff',
  '#c8c8c8',
  '#8a8a8a'
];
function Pt(t = {}) {
  let e = t.palettes ?? {
  },
  o = t.dust ?? ['#5d7a52',
  '#8a9c74'],
  n = [];
  function a(r) {
    return e[r] ?? he
  }
  return {
    burst(r, c, i, s = 1) {
      let l = a(i),
      u = Math.round(14 * s);
      for (let d = 0; d < u; d += 1) {
        let p = d / u * Math.PI * 2 + Math.random() * 0.4,
        k = 26 + Math.random() * 54 * s;
        n.push({
          x: r,
          y: c,
          vx: Math.cos(p) * k,
          vy: Math.sin(p) * k - 22,
          life: 0.5 + Math.random() * 0.45,
          age: 0,
          colour: l[d % l.length],
          size: Math.random() < 0.28 ? 2 : 1
        })
      }
    },
    splat(r, c, i) {
      let s = a(i);
      for (let l = 0; l < 12; l += 1) {
        let u = - Math.PI + l / 12 * Math.PI,
        d = 30 + Math.random() * 46;
        n.push({
          x: r,
          y: c,
          vx: Math.cos(u) * d,
          vy: Math.sin(u) * d * 0.62,
          life: 0.4 + Math.random() * 0.4,
          age: 0,
          colour: s[l % s.length],
          size: 1
        })
      }
      for (let l = 0; l < 7; l += 1) n.push({
        x: r + (Math.random() - 0.5) * 10,
        y: c,
        vx: (Math.random() - 0.5) * 26,
        vy: - 8 - Math.random() * 18,
        life: 0.45 + Math.random() * 0.35,
        age: 0,
        colour: o[l % o.length],
        size: 1
      })
    },
    update(r) {
      for (let c of n) c.age += r,
      c.vy += 190 * r,
      c.x += c.vx * r,
      c.y += c.vy * r,
      c.vx *= 1 - 2.2 * r;
      n = n.filter(c => c.age < c.life)
    },
    draw(r) {
      for (let c of n) {
        let i = c.age / c.life;
        r.globalAlpha = i < 0.66 ? 1 : Math.max(0, 1 - (i - 0.66) / 0.34),
        r.fillStyle = c.colour,
        r.fillRect(Math.floor(c.x), Math.floor(c.y), c.size, c.size)
      }
      r.globalAlpha = 1
    },
    count() {
      return n.length
    },
    clear() {
      n = []
    }
  }
}
var $ = null,
q = !1;
function It() {
  if (!$) {
    let t = window.AudioContext ||
    window.webkitAudioContext;
    if (!t) return null;
    $ = new t
  }
  return $.state === 'suspended' &&
  $.resume(),
  $
}
function N({
  freq: t,
  endFreq: e,
  duration: o = 0.1,
  type: n = 'square',
  gain: a = 0.05
}) {
  if (q) return;
  let r = It();
  if (!r) return;
  let c = r.createOscillator(),
  i = r.createGain(),
  s = r.currentTime;
  c.type = n,
  c.frequency.setValueAtTime(t, s),
  e &&
  c.frequency.exponentialRampToValueAtTime(Math.max(1, e), s + o),
  i.gain.setValueAtTime(a, s),
  i.gain.exponentialRampToValueAtTime(0.0001, s + o),
  c.connect(i).connect(r.destination),
  c.start(s),
  c.stop(s + o + 0.02)
}
function lt(t = 0.08, e = 0.08) {
  if (q) return;
  let o = It();
  if (!o) return;
  let n = Math.floor(o.sampleRate * t);
  if (!Number.isFinite(n) || n < 1) return;
  let a = o.createBuffer(1, n, o.sampleRate),
  r = a.getChannelData(0);
  for (let s = 0; s < n; s += 1) r[s] = (Math.random() * 2 - 1) * (1 - s / n);
  let c = o.createBufferSource(),
  i = o.createGain();
  i.gain.setValueAtTime(e, o.currentTime),
  c.buffer = a,
  c.connect(i).connect(o.destination),
  c.start()
}
function ut() {
  return q
}
function Ot(t) {
  return q = t === void 0 ? !q : !!t,
  q
}
function _t(t = {}) {
  let e = t.size ?? 96,
  o = t.colour ?? 'rgba(120, 150, 210, 0.085)',
  n = t.scale ?? 3,
  a = document.createElement('canvas');
  a.width = e,
  a.height = e;
  let r = a.getContext('2d');
  return r.imageSmoothingEnabled = !1,
  G(r, '45', 8, 10, o, n),
  G(r, '47', e - 40, e - 38, o, n),
  a
}
function Gt(t, e = 0) {
  try {
    let o = window.localStorage.getItem(t);
    if (o === null) return e;
    let n = Number(o);
    return Number.isFinite(n) ? n : e
  } catch {
    return e
  }
}
function Nt(t, e) {
  try {
    return window.localStorage.setItem(t, String(e)),
    !0
  } catch {
    return !1
  }
}
function Dt(t) {
  let e = `wh-games.${ t }.best`,
  o = Gt(e, 0);
  return {
    key: e,
    value() {
      return o
    },
    submit(n) {
      return !Number.isFinite(n) ||
      n <= o ? !1 : (o = n, Nt(e, o), !0)
    }
  }
}
function Ht(t = {}) {
  let e = t.music ?? null,
  o = document.getElementById(t.buttonId ?? 'sound');
  new URLSearchParams(window.location.search).get('embed') === '1' &&
  document.body.classList.add('embed');
  let n = !1;
  function a() {
    n ||
    !e ||
    (n = !0, e.start())
  }
  function r() {
    if (!o) return;
    let i = ut();
    o.setAttribute('aria-pressed', String(!i));
    let s = o.querySelector('.toggle-text');
    s &&
    (s.textContent = i ? 'Sound off' : 'Sound on')
  }
  function c() {
    let i = Ot();
    return r(),
    i ||
    a(),
    i
  }
  return o &&
  o.addEventListener('click', () => {
    a(),
    c()
  }),
  r(),
  {
    startMusicOnce: a,
    toggle: c,
    isMuted: ut
  }
}
function ft(t, e, o, n, a = {}) {
  let r = a.top ?? 78,
  c = a.height ?? 54;
  t.fillStyle = a.background ?? 'rgba(8, 12, 20, 0.82)',
  t.fillRect(0, r, e, c),
  A(t, o, e / 2, r + 8, a.titleColour ?? '#ffe680', 2),
  A(t, n, e / 2, r + 30, a.subtitleColour ?? '#e8edf5')
}
var me = 10,
qt = 12,
ge = 12,
B = 5,
et = 10;
function kt({
  lines: t = [],
  prompt: e,
  best: o,
  titleScale: n = 2
}) {
  let a = qt + _ * n;
  return t.length > 0 &&
  (a += et + t.length * (_ + B) - B),
  e &&
  (a += et + _),
  o &&
  (a += B + _),
  a + ge
}
function Bt(t, e, o, n) {
  let {
    title: a,
    lines: r = [],
    prompt: c,
    best: i,
    titleScale: s = 2,
    fade: l = 1,
    top: u
  }
  = n;
  t.fillStyle = `rgba(8, 12, 20, ${ (0.72 * l).toFixed(3) })`,
  t.fillRect(0, 0, e, o);
  let d = Math.max(O(a, s), ...r.map(b => O(b)), c ? O(c) : 0, i ? O(i) : 0),
  p = Math.min(e - 8, d + me * 2 + 8),
  k = kt({
    lines: r,
    prompt: c,
    best: i,
    titleScale: s
  }),
  E = Math.round((e - p) / 2),
  y = Math.round(u ?? (o - k) / 2);
  t.globalAlpha = l,
  t.fillStyle = '#0b1020',
  t.fillRect(E, y, p, k),
  t.fillStyle = '#18233f',
  t.fillRect(E + 1, y + 1, p - 2, k - 2),
  t.fillStyle = '#0d1326',
  t.fillRect(E + 3, y + 3, p - 6, k - 6),
  t.fillStyle = '#2c3a5e',
  t.fillRect(E + 1, y + 1, p - 2, 1),
  t.fillRect(E + 1, y + 1, 1, k - 2);
  let m = y + qt;
  for (let[b,
  w]of [
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
  ]) A(t, a, e / 2 + b, m + w, '#0b1020', s);
  if (A(t, a, e / 2, m, '#ffe680', s), m += _ * s, r.length > 0) {
    m += et;
    for (let b of r) A(t, b, e / 2, m, '#9fb4c8'),
    m += _ + B;
    m -= B
  }
  c &&
  (m += et, A(t, c, e / 2, m, '#ffe680'), m += _),
  i &&
  (m += B, A(t, i, e / 2, m, '#c9a227')),
  t.globalAlpha = 1
}
function nt(t) {
  let e = t >>> 0;
  return function () {
    e += 1831565813;
    let n = e;
    return n = Math.imul(n ^ n >>> 15, n | 1),
    n ^= n + Math.imul(n ^ n >>> 7, n | 61),
    ((n ^ n >>> 14) >>> 0) / 4294967296
  }
}
var ye = '#d8c48f',
xe = '#cfb87e',
Me = [
  '#c6ad72',
  '#e2d5a8'
],
Ee = 0.05,
ve = '#f5c542',
Yt = '#23262f',
Se = 4;
function Ft({
  cols: t,
  rows: e,
  cell: o,
  border: n,
  seed: a = 7
}) {
  let r = t * o,
  c = e * o,
  i = document.createElement('canvas');
  i.width = r + n * 2,
  i.height = c + n * 2;
  let s = i.getContext('2d');
  s.imageSmoothingEnabled = !1;
  for (let u = 0; u < i.height; u += 1) for (let d = 0; d < i.width; d += 1) {
    let p = Math.floor((d + u) / Se) % 2;
    s.fillStyle = p === 0 ? ve : Yt,
    s.fillRect(d, u, 1, 1)
  }
  for (let u = 0; u < e; u += 1) for (let d = 0; d < t; d += 1) s.fillStyle = (d + u) % 2 === 0 ? ye : xe,
  s.fillRect(n + d * o, n + u * o, o, o);
  let l = nt(a);
  for (let u = 0; u < c; u += 1) for (let d = 0; d < r; d += 1) l() >= Ee ||
  (s.fillStyle = Me[l() < 0.5 ? 0 : 1], s.fillRect(n + d, n + u, 1, 1));
  return s.fillStyle = Yt,
  s.fillRect(n - 1, n - 1, r + 2, 1),
  s.fillRect(n - 1, n + c, r + 2, 1),
  s.fillRect(n - 1, n - 1, 1, c + 2),
  s.fillRect(n + r, n - 1, 1, c + 2),
  i
}
var Y = 16,
F = 16,
Re = 1,
be = 1,
Te = 0.32,
Ae = 0.16,
Le = 40,
Ce = 2,
L = [
  'white',
  'red',
  'blue'
],
sk = [
  'pale',
  'peach',
  'yellow',
  'tan',
  'brown',
  'deep'
],
Pe = {
  up: {
    x: 0,
    y: - 1
  },
  down: {
    x: 0,
    y: 1
  },
  left: {
    x: - 1,
    y: 0
  },
  right: {
    x: 1,
    y: 0
  }
};
function Ie(t, e, o) {
  let n = Math.min(1, Math.max(0, o));
  return t + (e - t) * n
}
function wt(t) {
  return Ie(Te, Ae, t / Le)
}
function Ut(t) {
  return t.phase !== 'playing' ? 1 : Math.min(1, t.acc / wt(t.score))
}
function Oe(t, e, o) {
  return t.line.some(n => n.x === e && n.y === o)
}
function Kt(t) {
  let e = [];
  for (let a = 0; a < F; a += 1) for (let r = 0; r < Y; r += 1) Oe(t, r, a) ||
  e.push({
    x: r,
    y: a
  });
  if (e.length === 0) {
    t.perp = null,
    t.phase = 'cleared',
    t.t = 0,
    t.events.push({
      type: 'cleared',
      score: t.score
    });
    return
  }
  let o = e[Math.floor(t.rng() * e.length)],
  n = L[Math.floor(t.rng() * L.length)];
  t.perp = {
    x: o.x,
    y: o.y,
    kind: n,
    skin: sk[Math.floor(t.rng() * sk.length)]
  }
}
function pt(t = {}) {
  let e = {
    phase: 'ready',
    rng: nt(t.seed ?? 1),
    elapsed: 0,
    t: 0,
    acc: 0,
    dir: {
      ...Pe.right
    },
    queue: [],
    line: [],
    owed: [],
    perp: null,
    score: 0,
    events: []
  },
  o = Math.floor(Y / 3),
  n = Math.floor(F / 2);
  for (let a = 0; a < Re; a += 1) e.line.push({
    x: o - a,
    y: n,
    px: o - a,
    py: n,
    kind: a === 0 ? null : L[0],
    skin: null
  });
  return Kt(e),
  e
}
function ht(t) {
  return t.phase !== 'ready' ? !1 : (t.phase = 'playing', t.t = 0, t.acc = 0, !0)
}
function $t(t, e, o) {
  if (t.phase === 'dead' || t.phase === 'cleared') return !1;
  let n = t.queue.length > 0 ? t.queue[t.queue.length - 1] : t.dir;
  return e === - n.x &&
  o === - n.y ? !1 : t.phase === 'ready' ? (t.dir = {
    x: e,
    y: o
  }, ht(t)) : e === n.x &&
  o === n.y ||
  t.queue.length >= Ce ? !1 : (t.queue.push({
    x: e,
    y: o
  }), t.events.push({
    type: 'turn'
  }), !0)
}
function Wt(t, e, o, n) {
  t.phase = 'dead',
  t.t = 0,
  t.acc = 0,
  t.events.push({
    type: 'bust',
    cause: e,
    x: o,
    y: n,
    score: t.score
  })
}
function _e(t) {
  t.queue.length > 0 &&
  (t.dir = t.queue.shift());
  let e = t.line[0],
  o = e.x + t.dir.x,
  n = e.y + t.dir.y;
  if (o < 0 || n < 0 || o >= Y || n >= F) {
    Wt(t, 'wall', o, n);
    return
  }
  let a = t.line.length - 1;
  for (let i = 0; i < t.line.length; i += 1) if (
    !(i === a && t.owed.length === 0) &&
    t.line[i].x === o &&
    t.line[i].y === n
  ) {
    Wt(t, 'line', o, n);
    return
  }
  let r = t.line.map(i => ({
    x: i.x,
    y: i.y,
    kind: i.kind,
    skin: i.skin
  })),
  c = t.owed.length > 0 ? t.owed.shift() : null;
  t.line.unshift({
    x: o,
    y: n,
    px: e.x,
    py: e.y,
    kind: null,
    skin: null
  }),
  c === null &&
  t.line.pop();
  for (let i = 1; i < t.line.length; i += 1) {
    let s = r[i] ?? {
      x: t.line[i].x,
      y: t.line[i].y,
      kind: c &&
      c.kind,
      skin: c &&
      c.skin
    };
    t.line[i].px = s.x,
    t.line[i].py = s.y,
    t.line[i].kind = s.kind,
    t.line[i].skin = s.skin
  }
  if (t.perp && o === t.perp.x && n === t.perp.y) {
    let {
      kind: i,
      skin: u
    }
    = t.perp;
    t.score += 1;
    for (let s = 0; s < be; s += 1) t.owed.push({
      kind: i,
      skin: u
    });
    t.events.push({
      type: 'collar',
      x: o,
      y: n,
      kind: i,
      skin: u,
      score: t.score
    }),
    Kt(t)
  }
}
function zt(t, e) {
  if (t.t += e, t.phase === 'playing') for (
    t.elapsed += e,
    t.acc += e;
    t.phase === 'playing' &&
    t.acc >= wt(t.score);
  ) t.acc -= wt(t.score),
  _e(t)
}
function D(t) {
  let e = t.reduce((o, n) => Math.max(o, n.length), 0);
  return t.map(o => o.padEnd(e, '.'))
}
var ot = {
  k: '#0b0e14',
  n: '#1a2748',
  s: '#e8b48c',
  t: '#b0865b',
  p: '#8a6948',
  e: '#c8ccd4',
  c: '#2f3a4d',
  v: '#465575',
  q: '#6f9fd8',
  r: '#c1272d',
  w: '#f2f4f8',
  g: '#8d99ad',
  d: '#12161f'
},
Ge = D(
  ['......kkkkkkkk......',
  '.....kssssssssk.....',
  '....kessssssssek....',
  '....kettssssttek....',
  '....kesddssddsek....',
  '....kesssttsssek....',
  '....ketsddddstek....',
  '....kestttttttek....',
  '.....kstttttttk.....',
  '......kttttttk......',
  '.....kwwwwwwwwk.....',
  '...kcccccccccccck...',
  '..kcvvcwwqqwwcvvck..',
  '..kcvvccwqqwccvvck..',
  '..kcvrcccqqcccvvck..',
  '..ktcccccqqccccctk..',
  '...kccccccqccccck...',
  '...kcccccccccccck...',
  '...kcccckkkkcccck...',
  '...kddddkkkkddddk...']
),
Ne = D(
  ['......kkkkkkkk......',
  '.....ksttttttsk.....',
  '....kessssssssek....',
  '....kessssssssek....',
  '....keeesssseeek....',
  '....keeeeeeeeeek....',
  '....keeeeeeeeeek....',
  '.....ksttttttsk.....',
  '.....kttttttttk.....',
  '......kttttttk......',
  '.....kwwwwwwwwk.....',
  '...kcccccccccccck...',
  '..kcvvccccccccvvck..',
  '..kcvvccccccccvvck..',
  '..kcvvccccccccvvck..',
  '..ktcccccccccccctk..',
  '...kcccccccccccck...',
  '...kcccccccccccck...',
  '...kcccckkkkcccck...',
  '...kddddkkkkddddk...']
),
De = D(
  ['.......kkkkkk.......',
  '......ksssssssk.....',
  '.....ksssssssssk....',
  '.....kesssssssssk...',
  '.....keesssssttk....',
  '.....keessssddstk...',
  '.....keessssssstsk..',
  '.....keesssssddkk...',
  '......kessssttk.....',
  '......kssttttk......',
  '......kwwwwwwkk.....',
  '....kcccccccccck....',
  '...kccccccccvwqk....',
  '..kccccccccvwqqk....',
  '..kcccccccccvwqk....',
  '..kcccccttcccwqk....',
  '..kcccccccccccsk....',
  '...kcccccccccsk.....',
  '....kcckkccccck.....',
  '....kddkkkkdddk.....']
),
He = D(
  ['......kkkkkkkk......',
  '.....kddddddddk.....',
  '....kddddddddddk....',
  '....kddddddddddk....',
  '....kddddddddddk....',
  '....kdttttttttdk....',
  '....ktddttttddtk....',
  '....kttdttttdttk....',
  '....kttttttttttk....',
  '.....kppppppppk.....',
  '......kppppppk......',
  '...kkkwwwwwwwwkkk...',
  '..kttwwwwwwwwwwttk..',
  '..ktttwwwwwwwwtttk..',
  '..kwtttwwwwwwtttwk..',
  '..kwwttwwwwwwttwwk..',
  '..kwwwgtggggtgwwwk..',
  '...knnnnnnnnnnnnk...',
  '...knnnnkkkknnnnk...',
  '...kddddkkkkddddk...']
),
qe = D(
  ['......kkkkkkkk......',
  '.....kddddddddk.....',
  '....kddddddddddk....',
  '....kddddddddddk....',
  '....kddddddddddk....',
  '....kddddddddddk....',
  '....kddddddddddk....',
  '.....kppddddppk.....',
  '.....kppppppppk.....',
  '......kppppppk......',
  '.....kkwwwwwwkk.....',
  '...kkwwwwwwwwwwkk...',
  '..kwwwwwwwwwwwwwwk..',
  '..kwwwwwwwwwwwwwwk..',
  '..kwwwwwwwwwwwwwwk..',
  '..kwwwwwwwwwwwwwwk..',
  '..kwwwwwwwwwwwwwwk..',
  '...knnnnnnnnnnnnk...',
  '...knnnnkkkknnnnk...',
  '...kddddkkkkddddk...']
),
Be = D(
  ['........kkkkkk......',
  '......kkddddddk.....',
  '.....kdddddddddk.....',
  '.....kddddddddddk...',
  '.....kddddddddddk...',
  '....kddttttttttk....',
  '....kdtttttddtttk...',
  '....ktttttttdtttk...',
  '.....ktttttttttk....',
  '......kppppptkk....',
  '......kppppptk......',
  '....kwwwwwwwwk......',
  '...kwwwwwwwwwwk.....',
  '..kwwwwwwwttwgk.....',
  '..kwwwwwwwttwgk.....',
  '..kwwwwwwwwttttk....',
  '...kwwwwwwwwwptk....',
  '....knnnnnnnnkk.....',
  '....knnnkknnnk......',
  '....kddkkkkddk......']
),
Ye = D(
  ['......kkkkkkkk......',
  '.....kddddddddk.....',
  '....kddddddddddk....',
  '....kddddddddddk....',
  '....kddddddddddk....',
  '....kdttttttttdk....',
  '....ktddttttddtk....',
  '....kttdttttdttk....',
  '....kttttttttttk....',
  '.....kppppppppk.....',
  '......kppppppk......',
  '...kkkwwwwwwwwkkk...',
  '..kttwwwwwwwwwwttk..',
  '.kttwwwwwwwwwwwwttk.',
  '.ktwwwwwwwwwwwwwwtk.',
  '.ktwwwwwwwwwwwwwwtk.',
  '..kwwwwwwwwwwwwwwk..',
  '...knnnnnnnnnnnnk...',
  '...knnnnkkkknnnnk...',
  '...kddddkkkkddddk...']
),
Vt = {
  white: '#f2f2f2',
  red: '#ce1125',
  blue: '#006847'
},
HtSkin = {
  pale: {
    t: '#f4d5b8',
    p: '#e2b894',
    s: '#f4d5b8'
  },
  peach: {
    t: '#e8b48c',
    p: '#c9926c',
    s: '#e8b48c'
  },
  yellow: {
    t: '#e4c06a',
    p: '#c9a24e',
    s: '#e4c06a'
  },
  tan: {
    t: '#c68642',
    p: '#a56b32',
    s: '#c68642'
  },
  brown: {
    t: '#8d5524',
    p: '#6e4119',
    s: '#8d5524'
  },
  deep: {
    t: '#5a3328',
    p: '#3d211b',
    s: '#5a3328'
  }
},
Orng = {
  w: '#f05a10',
  n: '#c74408',
  g: '#9a3206',
  p: '#d24d0b'
},
Xt = {
  suit: [
    '#2f3a4d',
    '#6f9fd8',
    '#c1272d',
    '#c8ccd4'
  ],
  ...Object.fromEntries(L.map(t => [t,
  [
    Vt[t],
    '#8d99ad',
    '#12161f',
    '#e8b48c'
  ]]))
},
Jt = [
  '#c2a86c',
  '#d8c48f'
],
S = {},
g = 20;
function jt() {
  S.copFront = I(Ge, ot),
  S.copBack = I(Ne, ot),
  S.copSide = I(De, ot),
  S.perps = {},
  S.scooped = {};
  for (let t of L) {
    let e = Vt[t];
    if (!e) throw new Error(`no shirt colour for perp kind "${ t }"`);
    S.perps[t] = {};
    for (let n of sk) {
      let a = HtSkin[n],
      o = {
        ...ot,
        w: e,
        t: a.t,
        p: a.p,
        s: a.s
      };
      S.perps[t][n] = {
        front: I(He, o),
        back: I(qe, o),
        side: I(Be, o),
        loose: I(Ye, o)
      }
    }
  }
  for (let n of sk) {
    let a = HtSkin[n],
    o = {
      ...ot,
      w: Orng.w,
      n: Orng.n,
      g: Orng.g,
      p: Orng.p,
      t: a.t,
      s: a.s
    };
    S.scooped[n] = {
      front: I(He, o),
      back: I(qe, o),
      side: I(Be, o)
    }
  }
}
var W = 5,
rt = 30,
j = {
  w: Y * g,
  h: F * g
},
Fe = 16,
C = j.w + W * 2 + 6,
mt = rt + j.h + W * 2 + Fe,
gt = window.matchMedia?.('(prefers-reduced-motion: reduce)') ?.matches ?? !1,
oe = Math.floor((C - (j.w + W * 2)) / 2),
re = rt,
ct = oe + W,
U = re + W,
Qt = 52,
ce = {
  title: 'RIO RUN',
  lines: [
    'PATROL THE LINE ALONG THE RIVER',
    'PICK UP EVERY CROSSER IN THE LOT',
    'NEVER DOUBLE BACK OVER THE LINE'
  ],
  prompt: 'CLICK OR PRESS SPACE TO START'
},
We = U + Math.round((j.h - kt(ce)) / 2),
Zt = {
  top: U + Math.round((j.h - Qt) / 2),
  height: Qt
},
ae = 0.8,
ie = document.getElementById('game'),
vt = Tt(
  ie,
  {
    width: C,
    height: mt,
    background: '#0d1017',
    backdropTile: _t()
  }
),
Ue = At(ie, vt),
M = vt.ctx;
jt();
var Ke = Ft({
  cols: Y,
  rows: F,
  cell: g,
  border: W
}),
V = Pt({
  palettes: Xt,
  dust: Jt
}),
St = Ht(),
J = Dt('snake'),
Q = document.createElement('div');
Q.setAttribute('role', 'status');
Q.setAttribute('aria-live', 'polite');
Q.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap';
document.body.appendChild(Q);
var f = pt({
  seed: Date.now() / 1000 | 0
}),
yt = 0,
P = 0,
X = 0,
Rt = !1,
xt = - 1,
Mt = '';
function z(t) {
  Q.textContent = t
}
function te() {
  lt(0.03, 0.022),
  N({
    freq: 740,
    duration: 0.06,
    type: 'triangle',
    gain: 0.038
  }),
  setTimeout(() => N({
    freq: 1110,
    duration: 0.09,
    type: 'triangle',
    gain: 0.032
  }), 55)
}
function $e() {
  N({
    freq: 640,
    duration: 0.02,
    type: 'square',
    gain: 0.01
  })
}
function ze() {
  lt(0.16, 0.055),
  N({
    freq: 340,
    endFreq: 90,
    duration: 0.32,
    type: 'sawtooth',
    gain: 0.045
  })
}
function se() {
  N({
    freq: 520,
    duration: 0.07,
    type: 'square',
    gain: 0.03
  }),
  setTimeout(() => N({
    freq: 780,
    duration: 0.09,
    type: 'square',
    gain: 0.028
  }), 70)
}
function bt() {
  f = pt({
    seed: Date.now() / 1000 | 0
  }),
  V.clear(),
  X = 0,
  P = 0,
  Rt = !1,
  xt = - 1,
  Mt = ''
}
function de() {
  if (St.startMusicOnce(), f.phase === 'dead' || f.phase === 'cleared') {
    f.t >= ae &&
    bt();
    return
  }
  ht(f) &&
  se()
}
function Et(t, e) {
  if (St.startMusicOnce(), f.phase === 'dead' || f.phase === 'cleared') {
    f.t >= ae &&
    bt();
    return
  }
  let o = f.phase === 'ready';
  $t(f, t, e) &&
  o &&
  se()
}
var Ve = {
  ArrowUp: [
    0,
    - 1
  ],
  ArrowDown: [
    0,
    1
  ],
  ArrowLeft: [
    - 1,
    0
  ],
  ArrowRight: [
    1,
    0
  ],
  w: [
    0,
    - 1
  ],
  s: [
    0,
    1
  ],
  a: [
    - 1,
    0
  ],
  d: [
    1,
    0
  ]
};
document.addEventListener(
  'keydown',
  t => {
    let e = t.key.length === 1 ? t.key.toLowerCase() : t.key;
    if (e === 'm') {
      St.toggle();
      return
    }
    if (e === 'r') {
      bt();
      return
    }
    let o = Ve[e];
    if (o) {
      if (t.preventDefault(), t.repeat) return;
      Et(o[0], o[1]);
      return
    }
    if (e === ' ' || e === 'Enter') {
      if (t.preventDefault(), t.repeat) return;
      de()
    }
  }
);
function Xe(t) {
  if (f.phase !== 'playing') {
    de();
    return
  }
  let e = f.line[0],
  o = ct + e.x * g + g / 2,
  n = U + e.y * g + g / 2,
  a = t.x - o,
  r = t.y - n;
  Math.abs(a) < g / 2 &&
  Math.abs(r) < g / 2 ||
  (
    Math.abs(a) > Math.abs(r) ? Et(Math.sign(a), 0) : Et(0, Math.sign(r))
  )
}
function Je(t) {
  yt += t;
  for (let e of Ue.takeGrabs()) Xe(e);
  zt(f, t);
  for (let e of f.events) switch (e.type) {
    case 'turn':
      $e();
      break;
    case 'collar':
      te(),
      X = 1,
      V.burst(ee(e.x), ne(e.y), e.kind, 1.3),
      J.submit(e.score) &&
      (Rt = !0);
      break;
    case 'bust':
      ze(),
      V.burst(ee(e.x), ne(e.y), 'suit', 1.8),
      gt ||
      (P = 4.5);
      break;
    case 'cleared':
      te();
      break;
    default:
      break
  }
  f.events.length = 0,
  V.update(t),
  X = Math.max(0, X - t * 3.5),
  P *= Math.max(0, 1 - 9 * t),
  P < 0.05 &&
  (P = 0),
  je()
}
function je() {
  if (
    f.phase !== Mt &&
    (
      Mt = f.phase,
      f.phase === 'ready' &&
      z('Ready. Press an arrow key to set off.'),
      f.phase === 'playing' &&
      z('Walking.'),
      f.phase === 'cleared' &&
      z('Lot cleared. Every perp is in the line.'),
      f.phase === 'dead'
    )
  ) {
    let t = J.value() > 0 ? `, best ${ J.value() }` : '';
    z(`${ f.score } deported${ t }. Press space to go again.`);
    return
  }
  f.phase === 'playing' &&
  f.score !== xt &&
  (xt = f.score, f.score > 0 && z(`${ f.score }`))
}
function ee(t) {
  return ct + t * g + g / 2
}
function ne(t) {
  return U + t * g + g / 2
}
function Qe(t, e) {
  let o = t.x - t.px,
  n = t.y - t.py;
  o === 0 &&
  n === 0 &&
  (o = f.dir.x, n = f.dir.y);
  let a = e ? null : S.scooped[t.skin] ?? S.scooped[sk[0]];
  return o !== 0 ? {
    sprite: e ? S.copSide : a.side,
    flip: o < 0
  }
   : n < 0 ? {
    sprite: e ? S.copBack : a.back,
    flip: !1
  }
   : {
    sprite: e ? S.copFront : a.front,
    flip: !1
  }
}
function Ze() {
  let t = Ut(f);
  for (let e = f.line.length - 1; e >= 0; e -= 1) {
    let o = f.line[e],
    n = ct + (o.px + (o.x - o.px) * t) * g,
    a = U + (o.py + (o.y - o.py) * t) * g,
    {
      sprite: r,
      flip: c
    }
    = Qe(o, e === 0);
    it(M, r, n, a, c)
  }
}
function tn() {
  if (!f.perp) return;
  let t = ct + f.perp.x * g,
  e = U + f.perp.y * g,
  o = gt ? 0 : Math.round(Math.sin(yt * 5) * 1.4),
  n = gt ? 0.5 : 0.4 + Math.sin(yt * 6) * 0.28;
  M.fillStyle = `rgba(245, 197, 66, ${ n.toFixed(2) })`;
  let a = 5,
  r = - 1,
  c = g;
  for (
    let[s,
    l,
    u,
    d]of [
      [r,
      r,
      a,
      1],
      [
        r,
        r,
        1,
        a
      ],
      [
        c + 1 - a,
        r,
        a,
        1
      ],
      [
        c,
        r,
        1,
        a
      ],
      [
        r,
        c,
        a,
        1
      ],
      [
        r,
        c + 1 - a,
        1,
        a
      ],
      [
        c + 1 - a,
        c,
        a,
        1
      ],
      [
        c,
        c + 1 - a,
        1,
        a
      ]
    ]
  ) M.fillRect(t + s, e + l, u, d);
  let i = (S.perps[f.perp.kind] || S.perps[L[0]]) [f.perp.skin] ||
  S.perps[L[0]][sk[0]];
  it(M, i.loose, t, e + o)
}
function en() {
  M.fillStyle = '#151a24',
  M.fillRect(0, 0, C, rt),
  M.fillStyle = '#0b0e14',
  M.fillRect(0, rt - 1, C, 1);
  let t = Math.round(X * 2),
  e = G(M, 'DEPORTED', 8, 12, '#8f9cb4');
  if (G(M, String(f.score), e + 4, 8 - t, '#f2f4f8', 2), J.value() > 0) {
    let o = `BEST ${ J.value() }`;
    G(M, o, C - 8 - O(o), 12, '#f5c542')
  }
}
function nn() {
  if (
    M.fillStyle = '#0d1017',
    M.fillRect(0, 0, C, mt),
    M.drawImage(Ke, oe, re),
    tn(),
    Ze(),
    V.draw(M),
    en(),
    f.phase === 'ready'
  ) Bt(M, C, mt, {
    ...ce,
    top: We
  });
   else if (f.phase === 'dead') {
    let o = Rt ? 'NEW BEST - SPACE TO GO AGAIN' : 'SPACE TO GO AGAIN';
    ft(M, C, `${ f.score } DEPORTED`, o, Zt)
  } else f.phase === 'cleared' &&
  ft(M, C, 'LOT CLEARED', `ALL ${ f.score } IN THE LINE`, Zt);
  let t = P > 0 ? (Math.random() - 0.5) * 2 * P : 0,
  e = P > 0 ? (Math.random() - 0.5) * 2 * P : 0;
  vt.present(t, e)
}
Ct({
  update: Je,
  render: nn
});

(() => {
  const pad = document.querySelector('.mobile-pad');
  if (!pad) return;
  const fire = (key, type) => {
    document.dispatchEvent(new KeyboardEvent(type, {
      key,
      bubbles: true,
      cancelable: true
    }));
  };
  pad.addEventListener(
    'pointerdown',
    (event) => {
      const button = event.target.closest('button[data-key]');
      if (!button) return;
      event.preventDefault();
      button.setPointerCapture?.(event.pointerId);
      fire(button.dataset.key, 'keydown');
    }
  );
  const stop = (event) => {
    const button = event.target.closest('button[data-key]');
    if (!button) return;
    fire(button.dataset.key, 'keyup');
  };
  pad.addEventListener('pointerup', stop);
  pad.addEventListener('pointercancel', stop);
})();
