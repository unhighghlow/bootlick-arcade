function readLocalStorage(h, t = 0) {
    try {
        let s = window.localStorage.getItem(h);
        if (s === null) return t;
        let S = Number(s);
        return Number.isFinite(S) ? S : t
    } catch {
        return t
    }
}

function writeLocalStorage(h, t) {
    try {
        return window.localStorage.setItem(h, String(t)), !0
    } catch {
        return !1
    }
}

function getBest(h) {
    let t = `wh-games.${h}.best`,
        s = readLocalStorage(t, 0);
    return {
        key: t,
        value() {
            return s
        },
        submit(S) {
            return !Number.isFinite(S) || S <= s ? !1 : (s = S, writeLocalStorage(t, s), !0)
        }
    }
}

function vt() {
    let h = null,
        t = null,
        s = null,
        S = 0,
        m = !1;
    return {
        start(a) {
            return h !== null ? !1 : (h = a.id, s = {
                x: a.x,
                y: a.y
            }, t = {
                x: a.x,
                y: a.y
            }, S = a.at, m = !1, !0)
        },
        tracking(a) {
            return h !== null && a === h
        },
        move(a, n) {
            if (h === null || a.id !== h || !(n > 0)) return [];
            Math.hypot(a.x - s.x, a.y - s.y) > 10 && (m = !0);
            let w = [],
                c = Math.trunc((a.x - t.x) / n);
            if (c !== 0) {
                for (let p = 0; p < Math.abs(c); p++) w.push(c > 0 ? "right" : "left");
                t.x += c * n
            }
            let M = Math.trunc((a.y - t.y) / n);
            if (M !== 0) {
                for (let p = 0; p < M; p++) w.push("soft");
                t.y += M * n
            }
            return w
        },
        end(a, n) {
            if (h === null || a.id !== h) return null;
            h = null;
            let w = a.at - S,
                c = a.x - s.x,
                M = a.y - s.y;
            return m ? w < 250 && M > 2.5 * n && M > Math.abs(c) ? {
                action: "slam",
                x: a.x,
                y: a.y
            } : null : w < 250 ? {
                action: "tap",
                x: a.x,
                y: a.y
            } : null
        },
        cancel(a) {
            h !== null && a === h && (h = null)
        }
    }
}

function Mt(h, t, s, S) {
    return s === "title" || s === "gameover" ? "start" : s === "paused" ? "resume" : s !== "playing" ? "none" : t < S.hudHeight ? h > S.width - S.muteWidth ? "mute" : "pause" : "rotate"
}

"use strict";
document.fonts.load('56px "Press Start 2P"');
document.fonts.load('16px "VT323"');

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
let W = canvas.width;
let H = canvas.height;
let COLS = 10;
let ROWS = 18;
let BLOCK = 28;
let GRID_X = 80;
let GROUND_Y = H - 60;
let GRID_Y = GROUND_Y - ROWS * BLOCK;
let GRID_RIGHT = GRID_X + COLS * BLOCK;
let COLORS = {
        I: "#06ffa5",
        O: "#ffbe0b",
        T: "#ff006e",
        L: "#fb5607",
        J: "#8338ec",
        S: "#3a86ff",
        Z: "#ff4444"
    };
let PIECES = {
        I: [
            [1, 1, 1, 1]
        ],
        O: [
            [1, 1],
            [1, 1]
        ],
        T: [
            [0, 1, 0],
            [1, 1, 1]
        ],
        L: [
            [0, 0, 1],
            [1, 1, 1]
        ],
        J: [
            [1, 0, 0],
            [1, 1, 1]
        ],
        S: [
            [0, 1, 1],
            [1, 1, 0]
        ],
        Z: [
            [1, 1, 0],
            [0, 1, 1]
        ]
    };
let TYPES = Object.keys(PIECES);
let state = "title";
let L, u, B, T, lives, C, _, Z, I, N, z, V, A, P, b, D, U, E = !1;
let isPhone = typeof window.matchMedia == "function" && window.matchMedia("(hover: none) and (pointer: coarse)").matches,
    G = getBest("build-the-wall");

function reset() {
    L = Array.from({
        length: ROWS
    }, () => Array(COLS).fill(null)), T = 0, lives = 3, C = 1, _ = 0, Z = 850, I = [], N = 4e3, z = 4500, V = 0, A = [], P = 0, b = 0, D = 0, U = 0, u = newPiece(), B = newPiece()
}

function newPiece() {
    let e = TYPES[Math.floor(Math.random() * TYPES.length)],
        l = PIECES[e].map(o => [...o]);
    return {
        type: e,
        shape: l,
        color: COLORS[e],
        x: Math.floor((COLS - l[0].length) / 2),
        y: 0
    }
}

function rotateShape(e) {
    let l = e.length,
        o = e[0].length,
        r = Array.from({
            length: o
        }, () => Array(l).fill(0));
    for (let i = 0; i < l; i++)
        for (let f = 0; f < o; f++) r[f][l - 1 - i] = e[i][f];
    return r
}

function collides(e, l, o, r) {
    r = r || e.shape;
    for (let i = 0; i < r.length; i++)
        for (let f = 0; f < r[i].length; f++) {
            if (!r[i][f]) continue;
            let d = e.x + f + l,
                v = e.y + i + o;
            if (d < 0 || d >= COLS || v >= ROWS || v >= 0 && L[v][d]) return !0
        }
    return !1
}

function rt(e) {
    let l = ROWS;
    for (let o = 0; o < e.shape.length; o++)
        for (let r = 0; r < e.shape[o].length; r++) {
            if (!e.shape[o][r]) continue;
            let i = e.x + r,
                f = e.y + o;
            f >= 0 && f < ROWS && i >= 0 && i < COLS && (L[f][i] = e.color, spawnDust(GRID_X + i * BLOCK + BLOCK / 2, GRID_Y + f * BLOCK + BLOCK / 2), f < l && (l = f))
        }
    T += 10, shake(2.5, 90), beep(140, .08, "square", .07), u = B, B = newPiece(), collides(u, 0, 0) && endGame()
}

function it() {
    let e = 0;
    for (; !collides(u, 0, 1);) u.y++, e++;
    T += e * 2, beep(90, .12, "sawtooth", .09), rt(u)
}

function tryRotate() {
    let e = rotateShape(u.shape),
        l = [0, -1, 1, -2, 2];
    for (let o of l)
        if (!collides(u, o, 0, e)) {
            u.shape = e, u.x += o, beep(420, .04, "square", .05);
            return
        }
}

function columnHeight(e) {
    for (let l = 0; l < ROWS; l++)
        if (L[l][e]) return ROWS - l;
    return 0
}
let ZOMBIE_TYPES = [{
    name: "crawler",
    strength: 1,
    speed: .055,
    weight: 50,
    color: "#06ffa5"
}, {
    name: "walker",
    strength: 2,
    speed: .075,
    weight: 35,
    color: "#a8ff06"
}, {
    name: "lurcher",
    strength: 4,
    speed: .045,
    weight: 15,
    color: "#ff9c06"
}];

function kt() {
    let e = ZOMBIE_TYPES.reduce((o, r) => o + r.weight, 0),
        l = Math.random() * e;
    for (let o of ZOMBIE_TYPES)
        if (l -= o.weight, l <= 0) return o;
    return ZOMBIE_TYPES[0]
}

function spawnZombie() {
    let e = kt();
    I.push({
        type: e,
        x: W + 30 + Math.random() * 60,
        y: GROUND_Y + 2,
        vx: -e.speed * (1 + C * .06),
        state: "walking",
        anim: Math.random() * 1e3,
        lastCheckedCol: COLS,
        strengthCheck: e.strength,
        deathTime: 0,
        shamble: Math.random() * Math.PI * 2
    })
}

function updateZombies(e) {
    for (let l of I)
        if (l.state === "walking") {
            l.x += l.vx * e, l.anim += e, l.shamble += e * .008;
            let o = Math.floor((l.x - GRID_X) / BLOCK);
            o < l.lastCheckedCol && (o < 0 ? (l.state = "breached", l.lastCheckedCol = -1, breach()) : o < COLS && (columnHeight(o) >= l.strengthCheck && (l.state = "dead", l.deathTime = 0, l.x = GRID_X + (o + 1) * BLOCK, T += 50 * l.strengthCheck, spawnGore(l.x, l.y - 14, l.type.color), shake(3.5, 120), beep(280, .12, "sawtooth", .09), beep(140, .18, "sawtooth", .07), U = 600), l.lastCheckedCol = o))
        } else l.state === "dead" && (l.deathTime += e);
    I = I.filter(l => !(l.state === "breached" || l.state === "dead" && l.deathTime > 700))
}

function endGame() {
    state = "gameover", G.submit(T), shake(10, 600), beep(120, .4, "sawtooth", .12), beep(80, .6, "sawtooth", .1)
}

function breach() {
    lives--, shake(10, 500), D = 400, beep(70, .5, "sawtooth", .14), lives <= 0 && endGame()
}

function spawnDust(e, l) {
    for (let o = 0; o < 5; o++) A.push({
        x: e,
        y: l,
        vx: (Math.random() - .5) * .15,
        vy: -Math.random() * .1 - .02,
        life: 400 + Math.random() * 200,
        maxLife: 600,
        color: "#d4a574",
        size: 2 + Math.random() * 2,
        gravity: 3e-4
    })
}

function spawnGore(e, l, o) {
    for (let r = 0; r < 14; r++) A.push({
        x: e,
        y: l,
        vx: (Math.random() - .5) * .5,
        vy: -Math.random() * .35 - .1,
        life: 600 + Math.random() * 500,
        maxLife: 1100,
        color: r % 3 === 0 ? "#ff006e" : o,
        size: 2 + Math.random() * 3,
        gravity: .001
    })
}

function updateParticles(e) {
    for (let l of A) l.x += l.vx * e, l.y += l.vy * e, l.gravity && (l.vy += l.gravity * e), l.life -= e;
    A = A.filter(l => l.life > 0)
}

function shake(e, l) {
    P = Math.max(P, e), b = Math.max(b, l)
}
let x = null;

function initAudio() {
    if (!x) try {
        x = new(window.AudioContext || window.webkitAudioContext)
    } catch {}
}

function beep(e, l, o = "square", r = .08) {
    if (!(E || !x)) try {
        let i = x.createOscillator(),
            f = x.createGain();
        i.type = o, i.frequency.value = e, f.gain.value = r, f.gain.exponentialRampToValueAtTime(1e-4, x.currentTime + l), i.connect(f), f.connect(x.destination), i.start(), i.stop(x.currentTime + l + .02)
    } catch {}
}
let stars = Array.from({
        length: 70
    }, () => ({
        x: Math.random() * W,
        y: Math.random() * (GROUND_Y - 100),
        brightness: Math.random(),
        speed: .3 + Math.random() * .8,
        size: Math.random() < .15 ? 2 : 1
    })),
    st = [];
{
    let e = 0;
    for (; e < W + 20;) {
        let l = 80 + Math.random() * 120,
            o = 30 + Math.random() * 60;
        st.push({
            x: e,
            w: l,
            h: o
        }), e += l * .6
    }
}

function drawBackground(e) {
    let l = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    l.addColorStop(0, "#070218"), l.addColorStop(.35, "#240744"), l.addColorStop(.65, "#6b0a5e"), l.addColorStop(.88, "#ff2a6d"), l.addColorStop(1, "#ffae42"), ctx.fillStyle = l, ctx.fillRect(0, 0, W, GROUND_Y);
    for (let y of stars) {
        let O = .5 + .5 * Math.sin(e * .003 * y.speed + y.brightness * 10);
        ctx.fillStyle = `rgba(255, 240, 255, ${.25+O*.7})`, ctx.fillRect(y.x, y.y, y.size, y.size)
    }
    let o = W * .74,
        r = GROUND_Y - 90,
        i = 85,
        f = ctx.createRadialGradient(o, r, 0, o, r, i * 2.3);
    f.addColorStop(0, "rgba(255, 130, 0, 0.5)"), f.addColorStop(.35, "rgba(255, 0, 110, 0.22)"), f.addColorStop(1, "rgba(255, 0, 110, 0)"), ctx.fillStyle = f, ctx.fillRect(o - i * 2.3, r - i * 2.3, i * 4.6, i * 4.6), ctx.save(), ctx.beginPath(), ctx.arc(o, r, i, 0, Math.PI * 2), ctx.clip();
    let d = ctx.createLinearGradient(o, r - i, o, r + i);
    d.addColorStop(0, "#ffd60a"), d.addColorStop(.45, "#fb5607"), d.addColorStop(1, "#ff006e"), ctx.fillStyle = d, ctx.fillRect(o - i, r - i, i * 2, i * 2), ctx.fillStyle = "rgba(10, 4, 32, 0.85)";
    let v = [42, 56, 71, 87, 105, 125];
    for (let y of v) ctx.fillRect(o - i, r - i + y, i * 2, 3);
    ctx.restore(), ctx.fillStyle = "#1a0628", ctx.beginPath(), ctx.moveTo(0, GROUND_Y);
    for (let y of st) ctx.lineTo(y.x, GROUND_Y - y.h), ctx.lineTo(y.x + y.w * .5, GROUND_Y - y.h * 1.4), ctx.lineTo(y.x + y.w, GROUND_Y - y.h * .7);
    ctx.lineTo(W, GROUND_Y), ctx.closePath(), ctx.fill(), ctx.fillStyle = "#0a0218", ctx.beginPath(), ctx.moveTo(0, GROUND_Y), ctx.lineTo(0, GROUND_Y - 22), ctx.bezierCurveTo(200, GROUND_Y - 38, 380, GROUND_Y - 18, 560, GROUND_Y - 32), ctx.bezierCurveTo(700, GROUND_Y - 42, 820, GROUND_Y - 20, W, GROUND_Y - 30), ctx.lineTo(W, GROUND_Y), ctx.closePath(), ctx.fill(), drawCactus(440, GROUND_Y - 4, 1), drawCactus(630, GROUND_Y - 6, 1.4), drawCactus(800, GROUND_Y - 2, .85);
    let tt = ctx.createLinearGradient(0, GROUND_Y, 0, H);
    tt.addColorStop(0, "#3a0a4a"), tt.addColorStop(1, "#06000f"), ctx.fillStyle = tt, ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y), ctx.strokeStyle = "rgba(255, 0, 110, 0.6)", ctx.lineWidth = 1.2;
    let xt = GROUND_Y,
        jt = H - GROUND_Y,
        Qt = e * .04 % 14;
    for (let y = 0; y < 8; y++) {
        let O = (y * 14 + Qt) / 112,
            Tt = xt + jt * (O * O);
        ctx.globalAlpha = 1 - O * .4, ctx.beginPath(), ctx.moveTo(0, Tt), ctx.lineTo(W, Tt), ctx.stroke()
    }
    ctx.globalAlpha = 1;
    let Rt = W * .55;
    ctx.strokeStyle = "rgba(255, 0, 110, 0.45)";
    for (let y = -10; y <= 10; y++) {
        let O = Rt + y * 90;
        ctx.beginPath(), ctx.moveTo(Rt, xt), ctx.lineTo(O, H), ctx.stroke()
    }
}

function drawCactus(e, l, o) {
    let r = o || 1;
    ctx.fillStyle = "#08151a";
    let i = 8 * r,
        f = 50 * r;
    ctx.fillRect(e - i / 2, l - f, i, f), ctx.fillRect(e - 14 * r, l - 35 * r, 8 * r, 5 * r), ctx.fillRect(e - 14 * r, l - 42 * r, 5 * r, 12 * r), ctx.fillRect(e + 6 * r, l - 40 * r, 10 * r, 5 * r), ctx.fillRect(e + 11 * r, l - 48 * r, 5 * r, 13 * r), ctx.fillStyle = "rgba(255, 0, 110, 0.25)", ctx.fillRect(e - i / 2 - 1, l - f, 1, f)
}

function drawBrick(e, l, o, r) {
    ctx.fillStyle = o, ctx.fillRect(e, l, BLOCK, BLOCK), ctx.fillStyle = "rgba(255, 255, 255, 0.35)", ctx.fillRect(e + 1, l + 1, BLOCK - 2, 2), ctx.fillRect(e + 1, l + 1, 2, BLOCK - 2), ctx.fillStyle = "rgba(0, 0, 0, 0.45)", ctx.fillRect(e + 1, l + BLOCK - 3, BLOCK - 2, 2), ctx.fillRect(e + BLOCK - 3, l + 1, 2, BLOCK - 2), ctx.fillStyle = "rgba(0, 0, 0, 0.55)", ctx.fillRect(e, l, BLOCK, 1), ctx.fillRect(e, l, 1, BLOCK), ctx.fillRect(e, l + BLOCK - 1, BLOCK, 1), ctx.fillRect(e + BLOCK - 1, l, 1, BLOCK), r && (ctx.fillStyle = "rgba(0, 0, 0, 0.4)", ctx.fillRect(e, l + Math.floor(BLOCK / 2), BLOCK, 1))
}

function drawGridBackground() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.35)", ctx.fillRect(GRID_X, GRID_Y, COLS * BLOCK, ROWS * BLOCK), ctx.strokeStyle = "rgba(255, 255, 255, 0.04)", ctx.lineWidth = 1;
    for (let e = 1; e < COLS; e++) ctx.beginPath(), ctx.moveTo(GRID_X + e * BLOCK + .5, GRID_Y), ctx.lineTo(GRID_X + e * BLOCK + .5, GRID_Y + ROWS * BLOCK), ctx.stroke();
    for (let e = 1; e < ROWS; e++) ctx.beginPath(), ctx.moveTo(GRID_X, GRID_Y + e * BLOCK + .5), ctx.lineTo(GRID_X + COLS * BLOCK, GRID_Y + e * BLOCK + .5), ctx.stroke()
}

function drawGridBorder() {
    ctx.strokeStyle = "#ff006e", ctx.lineWidth = 2, ctx.shadowColor = "#ff006e", ctx.shadowBlur = 12, ctx.strokeRect(GRID_X - 1, GRID_Y - 1, COLS * BLOCK + 2, ROWS * BLOCK + 2), ctx.shadowBlur = 0
}

function drawLockedBricks() {
    for (let e = 0; e < ROWS; e++)
        for (let l = 0; l < COLS; l++) L[e][l] && drawBrick(GRID_X + l * BLOCK, GRID_Y + e * BLOCK, L[e][l], !0)
}

function drawGhost() {
    let e = 0;
    for (; !collides(u, 0, e + 1);) e++;
    ctx.lineWidth = 1.5;
    for (let l = 0; l < u.shape.length; l++)
        for (let o = 0; o < u.shape[l].length; o++) {
            if (!u.shape[l][o]) continue;
            let r = GRID_X + (u.x + o) * BLOCK,
                i = GRID_Y + (u.y + l + e) * BLOCK;
            ctx.strokeStyle = u.color, ctx.globalAlpha = .35, ctx.strokeRect(r + 2, i + 2, BLOCK - 4, BLOCK - 4)
        }
    ctx.globalAlpha = 1
}

function drawCurrentPiece() {
    ctx.shadowColor = u.color, ctx.shadowBlur = 8;
    for (let e = 0; e < u.shape.length; e++)
        for (let l = 0; l < u.shape[e].length; l++) {
            if (!u.shape[e][l]) continue;
            let o = GRID_X + (u.x + l) * BLOCK,
                r = GRID_Y + (u.y + e) * BLOCK;
            r >= GRID_Y - BLOCK && drawBrick(o, r, u.color, !1)
        }
    ctx.shadowBlur = 0
}

function drawZombie(e, l) {
    let o = e.x,
        r = e.y,
        i = e.type,
        f = e.state === "walking" ? Math.sin(e.shamble) : 0,
        d = e.state === "walking" ? Math.sin(e.shamble * .7) * 1.5 : 0;
    if (ctx.save(), e.state === "dead") {
        let v = Math.min(1, e.deathTime / 700);
        ctx.globalAlpha = Math.max(0, 1 - v), ctx.translate(o, r), ctx.rotate(v * .9), ctx.translate(-o, -r)
    }
    ctx.shadowColor = i.color, ctx.shadowBlur = 14, i.name === "crawler" ? (ctx.fillStyle = i.color, ctx.fillRect(o - 13, r - 16 + d, 26, 12), ctx.fillRect(o - 9, r - 22 + d, 18, 7), ctx.fillRect(o - 18, r - 12 + f * 1.5, 6, 4), ctx.fillRect(o + 12, r - 12 - f * 1.5, 6, 4), ctx.fillStyle = "#2a1a1a", ctx.fillRect(o - 10, r - 4, 5, 4), ctx.fillRect(o + 5, r - 4, 5, 4), ctx.shadowBlur = 0, ctx.fillStyle = "#ff006e", ctx.fillRect(o - 6, r - 19 + d, 3, 3), ctx.fillRect(o + 3, r - 19 + d, 3, 3), ctx.fillStyle = "rgba(0, 0, 0, 0.5)", ctx.fillRect(o - 4, r - 13 + d, 2, 5), ctx.fillRect(o + 6, r - 13 + d, 2, 5)) : i.name === "walker" ? (ctx.fillStyle = "#1f1015", ctx.fillRect(o - 8, r - 12, 6, 12), ctx.fillRect(o + 2, r - 12 - f * 2, 6, 12 + f * 2), ctx.fillStyle = "#4a2030", ctx.fillRect(o - 8, r - 22, 6, 10), ctx.fillRect(o + 2, r - 22, 6, 10), ctx.fillStyle = i.color, ctx.fillRect(o - 11, r - 36 + d, 22, 16), ctx.fillStyle = "rgba(0, 0, 0, 0.4)", ctx.fillRect(o - 4, r - 30 + d, 8, 8), ctx.fillStyle = i.color, ctx.fillRect(o - 20, r - 34 + d + f, 10, 5), ctx.fillRect(o + 10, r - 34 + d - f, 10, 5), ctx.fillStyle = "#7aaa3a", ctx.fillRect(o - 24, r - 36 + d + f, 5, 8), ctx.fillRect(o + 19, r - 36 + d - f, 5, 8), ctx.fillStyle = i.color, ctx.fillRect(o - 8, r - 48 + d, 16, 12), ctx.fillStyle = "#1a0a14", ctx.fillRect(o - 4, r - 39 + d, 8, 3), ctx.shadowBlur = 0, ctx.fillStyle = "#ff006e", ctx.fillRect(o - 5, r - 44 + d, 3, 3), ctx.fillRect(o + 2, r - 44 + d, 3, 3)) : i.name === "lurcher" && (ctx.fillStyle = "#1f1015", ctx.fillRect(o - 11, r - 14, 8, 14), ctx.fillRect(o + 3, r - 14 - f * 2, 8, 14 + f * 2), ctx.fillStyle = i.color, ctx.fillRect(o - 16, r - 46 + d, 32, 32), ctx.fillStyle = "rgba(0, 0, 0, 0.5)", ctx.fillRect(o - 5, r - 38 + d, 10, 16), ctx.fillRect(o - 14, r - 42 + d, 4, 6), ctx.fillStyle = i.color, ctx.fillRect(o - 28, r - 42 + d + f, 12, 7), ctx.fillRect(o + 16, r - 42 + d - f, 12, 7), ctx.fillStyle = "#a86010", ctx.fillRect(o - 32, r - 44 + d + f, 6, 11), ctx.fillRect(o + 26, r - 44 + d - f, 6, 11), ctx.fillStyle = i.color, ctx.fillRect(o - 11, r - 60 + d, 22, 14), ctx.fillStyle = "#fff5d0", ctx.fillRect(o - 5, r - 48 + d, 2, 5), ctx.fillRect(o + 3, r - 48 + d, 2, 5), ctx.shadowBlur = 0, ctx.fillStyle = "#ff006e", ctx.fillRect(o - 7, r - 56 + d, 4, 4), ctx.fillRect(o + 3, r - 56 + d, 4, 4)), ctx.restore(), ctx.shadowBlur = 0
}

function Ft() {
    for (let e of A) {
        let l = e.life / e.maxLife;
        ctx.globalAlpha = l, ctx.fillStyle = e.color, ctx.fillRect(e.x - e.size / 2, e.y - e.size / 2, e.size, e.size)
    }
    ctx.globalAlpha = 1
}

function drawBorderSign() {
    let l = GROUND_Y - 50;
    ctx.fillStyle = "#1a0a05", ctx.fillRect(718, l, 4, 50), ctx.fillStyle = "#1a0420", ctx.fillRect(658, l - 42, 124, 36), ctx.fillStyle = "#ffbe0b", ctx.fillRect(660, l - 40, 120, 32), ctx.strokeStyle = "#5a2a00", ctx.lineWidth = 1.5, ctx.strokeRect(660, l - 40, 120, 32), ctx.font = '8px "Press Start 2P"', ctx.fillStyle = "#5a2a00", ctx.textAlign = "center", ctx.fillText("SOUTHERN", 720, l - 26), ctx.fillText("BORDER \u2190", 720, l - 12), ctx.textAlign = "left", ctx.shadowColor = "#ffbe0b", ctx.shadowBlur = 18, ctx.strokeStyle = "rgba(255, 190, 11, 0.3)", ctx.lineWidth = 1, ctx.strokeRect(660, l - 40, 120, 32), ctx.shadowBlur = 0
}

function drawHud() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)", ctx.fillRect(0, 0, W, 52), ctx.shadowColor = "#ff006e", ctx.shadowBlur = 8, ctx.strokeStyle = "#ff006e", ctx.lineWidth = 1.5, ctx.beginPath(), ctx.moveTo(0, 52), ctx.lineTo(W, 52), ctx.stroke(), ctx.shadowBlur = 0, ctx.font = '12px "Press Start 2P"', ctx.fillStyle = "#ff006e", ctx.shadowColor = "#ff006e", ctx.shadowBlur = 10, ctx.fillText("BUILD THE WALL", 20, 32), ctx.font = '9px "Press Start 2P"', ctx.fillStyle = "#ffbe0b", ctx.shadowColor = "#ffbe0b", ctx.shadowBlur = 6, ctx.fillText("SCORE", 250, 18), ctx.fillStyle = "#fff", ctx.shadowBlur = 4, ctx.fillText(String(T).padStart(6, "0"), 250, 36), ctx.fillStyle = "#06ffa5", ctx.shadowColor = "#06ffa5", ctx.shadowBlur = 6, ctx.fillText("HI", 380, 18), ctx.fillStyle = "#fff", ctx.shadowBlur = 4, ctx.fillText(String(Math.max(G.value(), T)).padStart(6, "0"), 380, 36), ctx.fillStyle = "#8338ec", ctx.shadowColor = "#8338ec", ctx.shadowBlur = 6, ctx.fillText("LV", 510, 18), ctx.fillStyle = "#fff", ctx.shadowBlur = 4, ctx.fillText(String(C).padStart(2, "0"), 510, 36), ctx.fillStyle = "#ff006e", ctx.shadowColor = "#ff006e", ctx.shadowBlur = 6, ctx.fillText("LIVES", 580, 18), ctx.shadowBlur = 0;
    for (let r = 0; r < 3; r++) {
        ctx.fillStyle = r < lives ? "#ff006e" : "rgba(255, 0, 110, 0.18)";
        let i = 580 + r * 18;
        ctx.fillRect(i, 28, 12, 4), ctx.fillRect(i + 2, 26, 8, 2), ctx.fillRect(i + 1, 32, 10, 6), ctx.fillRect(i + 3, 38, 6, 2)
    }
    ctx.fillStyle = "#06ffa5", ctx.shadowColor = "#06ffa5", ctx.shadowBlur = 6, ctx.fillText("NEXT", 710, 18), ctx.shadowBlur = 0;
    let e = 780,
        l = 14,
        o = 11;
    for (let r = 0; r < B.shape.length; r++)
        for (let i = 0; i < B.shape[r].length; i++) B.shape[r][i] && (ctx.fillStyle = B.color, ctx.fillRect(e + i * o, l + r * o, o - 1, o - 1), ctx.fillStyle = "rgba(255, 255, 255, 0.3)", ctx.fillRect(e + i * o, l + r * o, o - 1, 1));
    ctx.font = '8px "Press Start 2P"', ctx.fillStyle = E ? "#ff006e" : "rgba(255, 255, 255, 0.4)", ctx.fillText(E ? "[M]UTED" : "[M]", 870, 12)
}

function drawTitle(e) {
    drawBackground(e), drawBorderSign();
    let l = [
        [0, ROWS - 1],
        [1, ROWS - 1],
        [2, ROWS - 1],
        [3, ROWS - 1],
        [5, ROWS - 1],
        [6, ROWS - 1],
        [0, ROWS - 2],
        [1, ROWS - 2],
        [5, ROWS - 2],
        [6, ROWS - 2],
        [5, ROWS - 3]
    ];
    for (let [i, f] of l) drawBrick(GRID_X + i * BLOCK, GRID_Y + f * BLOCK, "#ffbe0b", !0);
    drawZombie({
        x: 540,
        y: GROUND_Y + 2,
        type: ZOMBIE_TYPES[1],
        state: "walking",
        shamble: e * .005,
        anim: e,
        deathTime: 0
    }, e);
    let o = W / 2,
        r = Math.sin(e * .0025) * 4;
    ctx.textAlign = "center", ctx.font = '56px "Press Start 2P"', ctx.shadowColor = "#ff006e", ctx.shadowBlur = 35, ctx.fillStyle = "#ff006e", ctx.fillText("BUILD", o - 3, 175 + r), ctx.shadowColor = "#06ffa5", ctx.fillStyle = "#06ffa5", ctx.fillText("THE WALL", o + 3, 250 + r), ctx.shadowBlur = 12, ctx.font = '14px "Press Start 2P"', ctx.fillStyle = "#ffbe0b", ctx.shadowColor = "#ffbe0b", ctx.fillText("\u2605 ZOMBIE BORDER SIEGE \u2605", o, 305), ctx.font = '10px "Press Start 2P"', ctx.fillStyle = "#ffffff", ctx.shadowColor = "#ffffff", ctx.shadowBlur = 8, ctx.fillText("STACK BRICKS. HOLD THE LINE.", o, 345), Math.floor(e / 450) % 2 === 0 && (ctx.font = '16px "Press Start 2P"', ctx.fillStyle = "#fff", ctx.shadowColor = "#06ffa5", ctx.shadowBlur = 16, ctx.fillText(isPhone ? "TAP TO START" : "PRESS SPACE TO START", o, 410)), ctx.font = '8px "Press Start 2P"', ctx.fillStyle = "#8338ec", ctx.shadowColor = "#8338ec", ctx.shadowBlur = 6, ctx.fillText(isPhone ? "DRAG MOVE   TAP ROTATE   FLICK DOWN SLAM" : "\u2190 \u2192 MOVE   \u2191 ROTATE   \u2193 DROP   SPACE SLAM", o, 455), G.value() > 0 && (ctx.fillStyle = "#ff006e", ctx.shadowColor = "#ff006e", ctx.fillText("HI-SCORE  " + String(G.value()).padStart(6, "0"), o, 490)), ctx.font = '8px "Press Start 2P"', ctx.fillStyle = "rgba(255, 255, 255, 0.5)", ctx.shadowBlur = 0, ctx.fillText("\xA9 198X  ARCADE EDITION", o, 540), ctx.shadowBlur = 0, ctx.textAlign = "left"
}

function drawGameOver(e) {
    ctx.fillStyle = "rgba(8, 0, 18, 0.78)", ctx.fillRect(0, 0, W, H);
    let l = W / 2;
    ctx.textAlign = "center", ctx.font = '52px "Press Start 2P"', ctx.shadowColor = "#ff006e", ctx.shadowBlur = 35, ctx.fillStyle = "#ff006e", ctx.fillText("BORDER", l - 3, 215), ctx.fillText("BREACHED", l + 3, 285), ctx.font = '14px "Press Start 2P"', ctx.shadowBlur = 12, ctx.fillStyle = "#ffbe0b", ctx.shadowColor = "#ffbe0b", ctx.fillText("SCORE   " + String(T).padStart(6, "0"), l, 350), ctx.fillStyle = "#06ffa5", ctx.shadowColor = "#06ffa5", ctx.fillText("LEVEL   " + String(C).padStart(2, "0"), l, 380), T >= G.value() && G.value() > 0 && (ctx.font = '12px "Press Start 2P"', ctx.fillStyle = "#ff006e", ctx.shadowColor = "#ff006e", ctx.shadowBlur = 16, Math.floor(e / 200) % 2 === 0 && ctx.fillText("\u2605 NEW HI-SCORE \u2605", l, 420)), Math.floor(e / 500) % 2 === 0 && (ctx.font = '12px "Press Start 2P"', ctx.fillStyle = "#fff", ctx.shadowColor = "#06ffa5", ctx.shadowBlur = 12, ctx.fillText(isPhone ? "TAP TO RETRY" : "PRESS SPACE TO RETRY", l, 475)), ctx.shadowBlur = 0, ctx.textAlign = "left"
}

function drawPaused() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)", ctx.fillRect(0, 0, W, H), ctx.textAlign = "center", ctx.font = '44px "Press Start 2P"', ctx.fillStyle = "#ffbe0b", ctx.shadowColor = "#ffbe0b", ctx.shadowBlur = 22, ctx.fillText("PAUSED", W / 2, H / 2 - 10), ctx.font = '11px "Press Start 2P"', ctx.fillStyle = "#fff", ctx.shadowColor = "#fff", ctx.shadowBlur = 8, ctx.fillText(isPhone ? "TAP TO RESUME" : "PRESS P TO RESUME", W / 2, H / 2 + 40), ctx.shadowBlur = 0, ctx.textAlign = "left"
}

function ht() {
    initAudio(), x && x.state === "suspended" && x.resume()
}

function X(e) {
    state === "playing" && (collides(u, e, 0) || (u.x += e, beep(220, .025, "square", .04)))
}

function St() {
    state === "playing" && (collides(u, 0, 1) || (u.y++, T += 1))
}

function yt() {
    reset(), state = "playing"
}

function j() {
    state === "playing" ? state = "paused" : state === "paused" && (state = "playing")
}
document.addEventListener("keydown", e => {
    if (ht(), e.code === "KeyM") {
        E = !E, e.preventDefault();
        return
    }
    if (state === "title" || state === "gameover") {
        e.code === "Space" && (yt(), e.preventDefault());
        return
    }
    if (state === "paused") {
        e.code === "KeyP" && j();
        return
    }
    if (state === "playing") {
        if (e.code === "KeyP") {
            j();
            return
        }
        e.code === "ArrowLeft" || e.code === "KeyA" ? (X(-1), e.preventDefault()) : e.code === "ArrowRight" || e.code === "KeyD" ? (X(1), e.preventDefault()) : e.code === "ArrowUp" || e.code === "KeyW" ? (tryRotate(), e.preventDefault()) : e.code === "ArrowDown" || e.code === "KeyS" ? (St(), e.preventDefault()) : e.code === "Space" && (it(), e.preventDefault())
    }
});

let obj_1 = vt(),
    Yt = 52,
    Jt = 90;

function Q() {
    return canvas.getBoundingClientRect()
}

function gt(e) {
    return e.width > 0 ? e.width / W * BLOCK : BLOCK
}

function wt(e) {
    e === "left" ? X(-1) : e === "right" ? X(1) : e === "soft" ? St() : e === "slam" && state === "playing" && it()
}

function $t(e, l) {
    let o = Q(),
        r = o.width > 0 ? (e - o.left) / o.width * W : 0,
        i = o.height > 0 ? (l - o.top) / o.height * H : H,
        f = Mt(r, i, state, {
            width: W,
            hudHeight: Yt,
            muteWidth: Jt
        });
    f === "start" ? yt() : f === "pause" || f === "resume" ? j() : f === "mute" ? E = !E : f === "rotate" && tryRotate()
}
canvas.addEventListener("touchstart", e => {
    ht(), isPhone = !0, e.preventDefault();
    let l = e.changedTouches[0];
    obj_1.start({
        id: l.identifier,
        x: l.clientX,
        y: l.clientY,
        at: performance.now()
    })
}, {
    passive: !1
}), canvas.addEventListener("touchmove", e => {
    let l = Q();
    for (let o = 0; o < e.changedTouches.length; o++) {
        let r = e.changedTouches[o];
        if (!obj_1.tracking(r.identifier)) continue;
        e.preventDefault();
        let i = obj_1.move({
            id: r.identifier,
            x: r.clientX,
            y: r.clientY
        }, gt(l));
        for (let f of i) wt(f)
    }
}, {
    passive: !1
}), canvas.addEventListener("touchend", e => {
    let l = Q();
    for (let o = 0; o < e.changedTouches.length; o++) {
        let r = e.changedTouches[o];
        if (!obj_1.tracking(r.identifier)) continue;
        e.preventDefault();
        let i = obj_1.end({
            id: r.identifier,
            x: r.clientX,
            y: r.clientY,
            at: performance.now()
        }, gt(l));
        i && (i.action === "tap" ? $t(i.x, i.y) : wt(i.action))
    }
}, {
    passive: !1
}), canvas.addEventListener("touchcancel", e => {
    for (let l = 0; l < e.changedTouches.length; l++) obj_1.cancel(e.changedTouches[l].identifier)
}, {
    passive: !1
});
let pt = 0;

function mt(e) {
    let l = Math.min(50, e - pt);
    if (pt = e, state === "playing") {
        V += l;
        let o = Math.floor(V / 22e3) + 1;
        o > C && (C = o, Z = Math.max(140, 850 - C * 65), z = Math.max(1100, 4500 - C * 320), beep(660, .08, "square", .07), beep(880, .12, "square", .06)), _ += l, _ >= Z && (_ = 0, collides(u, 0, 1) ? rt(u) : u.y++), N -= l, N <= 0 && (spawnZombie(), N = z * (.65 + Math.random() * .7)), updateZombies(l), updateParticles(l), b > 0 && (b -= l, b <= 0 && (P = 0)), D > 0 && (D -= l), U > 0 && (U -= l)
    } else state === "gameover" && (updateParticles(l), b > 0 && (b -= l, b <= 0 && (P = 0)));
    if (ctx.save(), P > 0 && b > 0) {
        let o = (Math.random() - .5) * P,
            r = (Math.random() - .5) * P;
        ctx.translate(o, r)
    }
    if (state === "title") drawTitle(e);
    else {
        drawBackground(e), drawBorderSign(), drawGridBackground();
        let o = [...I].sort((r, i) => r.x - i.x);
        for (let r of o) drawZombie(r, e);
        drawLockedBricks(), drawGridBorder(), (state === "playing" || state === "paused") && (drawGhost(), drawCurrentPiece()), Ft(), drawHud(), D > 0 && (ctx.fillStyle = `rgba(255, 20, 60, ${D/400*.45})`, ctx.fillRect(0, 0, W, H)), state === "paused" && drawPaused(), state === "gameover" && drawGameOver(e)
    }
    ctx.restore(), requestAnimationFrame(mt)
}
reset(), state = "title", requestAnimationFrame(mt)
