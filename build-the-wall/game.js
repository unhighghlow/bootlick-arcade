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

function createTouchTracker() {
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

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

// ============== CONFIG ==============
const COLS = 10;
const ROWS = 18;
const BLOCK = 28;
const GRID_X = 80;
const GROUND_Y = H - 60;          // 590
const GRID_BOTTOM = GROUND_Y;     // wall sits on ground
const GRID_Y = GRID_BOTTOM - ROWS * BLOCK; // 86
const GRID_RIGHT = GRID_X + COLS * BLOCK;  // 360

const COLORS = {
  I: '#06ffa5', O: '#ffbe0b', T: '#ff006e',
  L: '#fb5607', J: '#8338ec', S: '#3a86ff', Z: '#ff4444',
};

const PIECES = {
  I: [[1,1,1,1]],
  O: [[1,1],[1,1]],
  T: [[0,1,0],[1,1,1]],
  L: [[0,0,1],[1,1,1]],
  J: [[1,0,0],[1,1,1]],
  S: [[0,1,1],[1,1,0]],
  Z: [[1,1,0],[0,1,1]],
};
const TYPES = Object.keys(PIECES);

// ============== STATE ==============
let state = 'title';
let grid, currentPiece, nextPiece, score, lives, level, dropTimer, dropInterval, zombies, zombieSpawnTimer, zombieSpawnInterval, gameTime, particles, shakeIntensity, shakeTime, flashTime, comboTime, muted = !1;
let isPhone = typeof window.matchMedia == "function" && window.matchMedia("(hover: none) and (pointer: coarse)").matches;

let hiScore = getBest("build-the-wall");

function reset() {
  grid = Array.from({length: ROWS}, () => Array(COLS).fill(null));
  score = 0;
  lives = 3;
  level = 1;
  dropTimer = 0;
  dropInterval = 850;
  zombies = [];
  zombieSpawnTimer = 4000;
  zombieSpawnInterval = 4500;
  gameTime = 0;
  particles = [];
  shakeIntensity = 0;
  shakeTime = 0;
  flashTime = 0;
  comboTime = 0;
  currentPiece = newPiece();
  nextPiece = newPiece();
}

function newPiece() {
  const type = TYPES[Math.floor(Math.random() * TYPES.length)];
  const shape = PIECES[type].map(row => [...row]);
  return {
    type, shape,
    color: COLORS[type],
    x: Math.floor((COLS - shape[0].length) / 2),
    y: 0,
  };
}

function rotateShape(shape) {
  const rows = shape.length, cols = shape[0].length;
  const out = Array.from({length: cols}, () => Array(rows).fill(0));
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      out[c][rows - 1 - r] = shape[r][c];
  return out;
}

function collides(piece, dx, dy, shape) {
  shape = shape || piece.shape;
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const nx = piece.x + c + dx;
      const ny = piece.y + r + dy;
      if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
      if (ny >= 0 && grid[ny][nx]) return true;
    }
  }
  return false;
}

function lockPiece(piece) {
  let rows2 = ROWS;
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (!piece.shape[r][c]) continue;
      const x = piece.x + c;
      const y = piece.y + r;
      if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
        grid[y][x] = piece.color;
        spawnDust(GRID_X + x * BLOCK + BLOCK / 2, GRID_Y + y * BLOCK + BLOCK / 2);
        if (y < rows2) {
          rows2 = y;
        }
      }
    }
  }
  score += 10;
  shake(2.5, 90);
  beep(140, .08, "square", .07);

  clearLines();

  currentPiece = nextPiece;
  nextPiece = newPiece();
  if (collides(currentPiece, 0, 0)) {
    endGame();
  }
}

function clearLines() {
  const filledRows = [];
  for (let r = 0; r < ROWS; r++) {
    let full = true;
    for (let c = 0; c < COLS; c++) {
      if (!grid[r][c]) { full = false; break; }
    }
    if (full) filledRows.push(r);
  }
  if (filledRows.length === 0) return;

  // Neon sparkle burst across every cleared row
  const sparkColors = ['#ffbe0b', '#ff006e', '#06ffa5', '#ffffff', '#8338ec'];
  for (const r of filledRows) {
    for (let c = 0; c < COLS; c++) {
      for (let i = 0; i < 5; i++) {
        particles.push({
          x: GRID_X + c * BLOCK + BLOCK/2 + (Math.random() - 0.5) * BLOCK,
          y: GRID_Y + r * BLOCK + BLOCK/2 + (Math.random() - 0.5) * BLOCK,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.3 - 0.08,
          life: 500 + Math.random() * 400,
          maxLife: 900,
          color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
          size: 2 + Math.random() * 3,
          gravity: 0.0004,
        });
      }
    }
  }

  // Remove filled rows from the bottom up, then insert empty rows on top
  filledRows.sort((a, b) => b - a);
  for (const r of filledRows) {
    grid.splice(r, 1);
    grid.unshift(Array(COLS).fill(null));
  }

  // Tetris-style scoring, scaled by level
  const linePoints = [0, 100, 300, 500, 800][filledRows.length] || 800;
  score += linePoints * level;

  // Chiptune clear jingle — higher pitch for more lines
  const pitchBase = 520 + filledRows.length * 130;
  beep(pitchBase, 0.12, 'square', 0.10);
  beep(pitchBase * 1.5, 0.16, 'square', 0.08);
  beep(pitchBase * 2, 0.14, 'square', 0.06);

  shake(3 + filledRows.length * 1.5, 220);
}

function hardDrop() {
  let drops = 0;
  while (!collides(currentPiece, 0, 1)) {
    currentPiece.y++;
    drops++;
  }
  score += drops * 2;
  beep(90, 0.12, 'sawtooth', 0.09);
  lockPiece(currentPiece);
}

function tryRotate() {
  const rotated = rotateShape(currentPiece.shape);
  const kicks = [0, -1, 1, -2, 2];
  for (const k of kicks) {
    if (!collides(currentPiece, k, 0, rotated)) {
      currentPiece.shape = rotated;
      currentPiece.x += k;
      beep(420, 0.04, 'square', 0.05);
      return;
    }
  }
}

function columnHeight(col) {
  for (let r = 0; r < ROWS; r++) {
    if (grid[r][col]) return ROWS - r;
  }
  return 0;
}

// ============== ZOMBIES ==============
const ZOMBIE_TYPES = [
  { name: 'crawler', strength: 1, speed: 0.055, weight: 50, color: '#06ffa5' },
  { name: 'walker',  strength: 2, speed: 0.075, weight: 35, color: '#a8ff06' },
  { name: 'lurcher', strength: 4, speed: 0.045, weight: 15, color: '#ff9c06' },
];

function pickZombieType() {
  const total = ZOMBIE_TYPES.reduce((s, z) => s + z.weight, 0);
  let r = Math.random() * total;
  for (const z of ZOMBIE_TYPES) {
    r -= z.weight;
    if (r <= 0) return z;
  }
  return ZOMBIE_TYPES[0];
}

function spawnZombie() {
  const type = pickZombieType();
  zombies.push({
    type,
    x: W + 30 + Math.random() * 60,
    y: GROUND_Y + 2,
    vx: -type.speed * (1 + level * 0.06),
    state: 'walking',
    anim: Math.random() * 1000,
    lastCheckedCol: COLS,
    strengthCheck: type.strength,
    deathTime: 0,
    shamble: Math.random() * Math.PI * 2,
  });
}

function updateZombies(dt) {
  for (const z of zombies) {
    if (z.state === 'walking') {
      z.x += z.vx * dt;
      z.anim += dt;
      z.shamble += dt * 0.008;

      const col = Math.floor((z.x - GRID_X) / BLOCK);
      if (col < z.lastCheckedCol) {
        if (col < 0) {
          z.state = 'breached';
          z.lastCheckedCol = -1;
          breach();
        } else if (col < COLS) {
          const h = columnHeight(col);
          if (h >= z.strengthCheck) {
            z.state = 'dead';
            z.deathTime = 0;
            z.x = GRID_X + (col + 1) * BLOCK;
            score += 50 * z.strengthCheck;
            spawnGore(z.x, z.y - 14, z.type.color);
            shake(3.5, 120);
            beep(280, 0.12, 'sawtooth', 0.09);
            beep(140, 0.18, 'sawtooth', 0.07);
            comboTime = 600;
          }
          z.lastCheckedCol = col;
        }
      }
    } else if (z.state === 'dead') {
      z.deathTime += dt;
    }
  }
  zombies = zombies.filter(z => {
    if (z.state === 'breached') return false;
    if (z.state === 'dead' && z.deathTime > 700) return false;
    return true;
  });
}

function endGame() {
  state = 'gameover';
  if (score > hiScore) {
    hiScore = score;
    saveHi();
  }
  shake(10, 600);
  beep(120, 0.4, 'sawtooth', 0.12);
  beep(80, 0.6, 'sawtooth', 0.1);
}

function breach() {
  lives--;
  shake(10, 500);
  flashTime = 400;
  beep(70, 0.5, 'sawtooth', 0.14);
  if (lives <= 0) {
    endGame();
  }
}

// ============== PARTICLES ==============
function spawnDust(x, y) {
  for (let i = 0; i < 5; i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.1 - 0.02,
      life: 400 + Math.random() * 200,
      maxLife: 600,
      color: '#d4a574',
      size: 2 + Math.random() * 2,
      gravity: 0.0003,
    });
  }
}

function spawnGore(x, y, color) {
  for (let i = 0; i < 14; i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -Math.random() * 0.35 - 0.1,
      life: 600 + Math.random() * 500,
      maxLife: 1100,
      color: i % 3 === 0 ? '#ff006e' : color,
      size: 2 + Math.random() * 3,
      gravity: 0.001,
    });
  }
}

function updateParticles(dt) {
  for (const p of particles) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (p.gravity) p.vy += p.gravity * dt;
    p.life -= dt;
  }
  particles = particles.filter(p => p.life > 0);
}

function shake(intensity, time) {
  shakeIntensity = Math.max(shakeIntensity, intensity);
  shakeTime = Math.max(shakeTime, time);
}

// ============== AUDIO ==============
let audioCtx = null;
function initAudio() {
  if (audioCtx) return;
  try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
  catch(e) {}
}
function beep(freq, dur, type = 'square', vol = 0.08) {
  if (muted || !audioCtx) return;
  try {
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = vol;
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    o.connect(g);
    g.connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + dur + 0.02);
  } catch(e) {}
}

// ============== RENDERING ==============
const stars = Array.from({length: 70}, () => ({
  x: Math.random() * W,
  y: Math.random() * (GROUND_Y - 100),
  brightness: Math.random(),
  speed: 0.3 + Math.random() * 0.8,
  size: Math.random() < 0.15 ? 2 : 1,
}));

const distantHills = [];
{
  let x = 0;
  while (x < W + 20) {
    const w = 80 + Math.random() * 120;
    const h = 30 + Math.random() * 60;
    distantHills.push({ x, w, h });
    x += w * 0.6;
  }
}

function drawBackground(t) {
  // Sky gradient — synthwave sunset
  const sky = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
  sky.addColorStop(0, '#070218');
  sky.addColorStop(0.35, '#240744');
  sky.addColorStop(0.65, '#6b0a5e');
  sky.addColorStop(0.88, '#ff2a6d');
  sky.addColorStop(1, '#ffae42');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, GROUND_Y);

  // Stars (twinkling)
  for (const s of stars) {
    const tw = 0.5 + 0.5 * Math.sin(t * 0.003 * s.speed + s.brightness * 10);
    ctx.fillStyle = `rgba(255, 240, 255, ${0.25 + tw * 0.7})`;
    ctx.fillRect(s.x, s.y, s.size, s.size);
  }

  // Synthwave sun (with horizontal bars)
  const sunX = W * 0.74;
  const sunY = GROUND_Y - 90;
  const sunR = 85;
  const glow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 2.3);
  glow.addColorStop(0, 'rgba(255, 130, 0, 0.5)');
  glow.addColorStop(0.35, 'rgba(255, 0, 110, 0.22)');
  glow.addColorStop(1, 'rgba(255, 0, 110, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(sunX - sunR*2.3, sunY - sunR*2.3, sunR*4.6, sunR*4.6);

  ctx.save();
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
  ctx.clip();
  const sunGrad = ctx.createLinearGradient(sunX, sunY - sunR, sunX, sunY + sunR);
  sunGrad.addColorStop(0, '#ffd60a');
  sunGrad.addColorStop(0.45, '#fb5607');
  sunGrad.addColorStop(1, '#ff006e');
  ctx.fillStyle = sunGrad;
  ctx.fillRect(sunX - sunR, sunY - sunR, sunR*2, sunR*2);
  // horizontal stripes
  ctx.fillStyle = 'rgba(10, 4, 32, 0.85)';
  const stripes = [42, 56, 71, 87, 105, 125];
  for (const s of stripes) {
    ctx.fillRect(sunX - sunR, sunY - sunR + s, sunR*2, 3);
  }
  ctx.restore();

  // Distant mountains (silhouette)
  ctx.fillStyle = '#1a0628';
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y);
  for (const h of distantHills) {
    ctx.lineTo(h.x, GROUND_Y - h.h);
    ctx.lineTo(h.x + h.w * 0.5, GROUND_Y - h.h * 1.4);
    ctx.lineTo(h.x + h.w, GROUND_Y - h.h * 0.7);
  }
  ctx.lineTo(W, GROUND_Y);
  ctx.closePath();
  ctx.fill();

  // Closer dunes
  ctx.fillStyle = '#0a0218';
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y);
  ctx.lineTo(0, GROUND_Y - 22);
  ctx.bezierCurveTo(200, GROUND_Y - 38, 380, GROUND_Y - 18, 560, GROUND_Y - 32);
  ctx.bezierCurveTo(700, GROUND_Y - 42, 820, GROUND_Y - 20, W, GROUND_Y - 30);
  ctx.lineTo(W, GROUND_Y);
  ctx.closePath();
  ctx.fill();

  // Cacti (foreground)
  drawCactus(440, GROUND_Y - 4, 1.0);
  drawCactus(630, GROUND_Y - 6, 1.4);
  drawCactus(800, GROUND_Y - 2, 0.85);

  // Ground (with synthwave grid)
  const groundGrad = ctx.createLinearGradient(0, GROUND_Y, 0, H);
  groundGrad.addColorStop(0, '#3a0a4a');
  groundGrad.addColorStop(1, '#06000f');
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);

  // Synthwave perspective grid on ground
  ctx.strokeStyle = 'rgba(255, 0, 110, 0.6)';
  ctx.lineWidth = 1.2;
  const vpY = GROUND_Y;
  const groundH = H - GROUND_Y;
  // horizontal lines with scrolling effect
  const scroll = (t * 0.04) % 14;
  for (let i = 0; i < 8; i++) {
    const tt = (i * 14 + scroll) / (8 * 14);
    const y = vpY + groundH * (tt * tt);
    ctx.globalAlpha = 1 - tt * 0.4;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  // converging lines
  const vpX = W * 0.55;
  ctx.strokeStyle = 'rgba(255, 0, 110, 0.45)';
  for (let i = -10; i <= 10; i++) {
    const x = vpX + i * 90;
    ctx.beginPath();
    ctx.moveTo(vpX, vpY);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
}

function drawCactus(x, baseY, scale) {
  const s = scale || 1;
  ctx.fillStyle = '#08151a';
  const w = 8 * s, h = 50 * s;
  ctx.fillRect(x - w/2, baseY - h, w, h);
  // arms
  ctx.fillRect(x - 14*s, baseY - 35*s, 8*s, 5*s);
  ctx.fillRect(x - 14*s, baseY - 42*s, 5*s, 12*s);
  ctx.fillRect(x + 6*s, baseY - 40*s, 10*s, 5*s);
  ctx.fillRect(x + 11*s, baseY - 48*s, 5*s, 13*s);
  // outline highlight
  ctx.fillStyle = 'rgba(255, 0, 110, 0.25)';
  ctx.fillRect(x - w/2 - 1, baseY - h, 1, h);
}

function drawBrick(x, y, color, locked) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, BLOCK, BLOCK);
  // glow edge
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.fillRect(x + 1, y + 1, BLOCK - 2, 2);
  ctx.fillRect(x + 1, y + 1, 2, BLOCK - 2);
  // shadow edge
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.fillRect(x + 1, y + BLOCK - 3, BLOCK - 2, 2);
  ctx.fillRect(x + BLOCK - 3, y + 1, 2, BLOCK - 2);
  // outline
  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.fillRect(x, y, BLOCK, 1);
  ctx.fillRect(x, y, 1, BLOCK);
  ctx.fillRect(x, y + BLOCK - 1, BLOCK, 1);
  ctx.fillRect(x + BLOCK - 1, y, 1, BLOCK);
  if (locked) {
    // mortar lines — brick pattern
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(x, y + Math.floor(BLOCK/2), BLOCK, 1);
  }
}

function drawGridBackground() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.fillRect(GRID_X, GRID_Y, COLS * BLOCK, ROWS * BLOCK);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  for (let c = 1; c < COLS; c++) {
    ctx.beginPath();
    ctx.moveTo(GRID_X + c * BLOCK + 0.5, GRID_Y);
    ctx.lineTo(GRID_X + c * BLOCK + 0.5, GRID_Y + ROWS * BLOCK);
    ctx.stroke();
  }
  for (let r = 1; r < ROWS; r++) {
    ctx.beginPath();
    ctx.moveTo(GRID_X, GRID_Y + r * BLOCK + 0.5);
    ctx.lineTo(GRID_X + COLS * BLOCK, GRID_Y + r * BLOCK + 0.5);
    ctx.stroke();
  }
}

function drawGridBorder() {
  ctx.strokeStyle = '#ff006e';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#ff006e';
  ctx.shadowBlur = 12;
  ctx.strokeRect(GRID_X - 1, GRID_Y - 1, COLS * BLOCK + 2, ROWS * BLOCK + 2);
  ctx.shadowBlur = 0;
}

function drawLockedBricks() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c]) {
        drawBrick(GRID_X + c * BLOCK, GRID_Y + r * BLOCK, grid[r][c], true);
      }
    }
  }
}

function drawGhost() {
  let g = 0;
  while (!collides(currentPiece, 0, g + 1)) g++;
  ctx.lineWidth = 1.5;
  for (let r = 0; r < currentPiece.shape.length; r++) {
    for (let c = 0; c < currentPiece.shape[r].length; c++) {
      if (!currentPiece.shape[r][c]) continue;
      const x = GRID_X + (currentPiece.x + c) * BLOCK;
      const y = GRID_Y + (currentPiece.y + r + g) * BLOCK;
      ctx.strokeStyle = currentPiece.color;
      ctx.globalAlpha = 0.35;
      ctx.strokeRect(x + 2, y + 2, BLOCK - 4, BLOCK - 4);
    }
  }
  ctx.globalAlpha = 1;
}

function drawCurrentPiece() {
  ctx.shadowColor = currentPiece.color;
  ctx.shadowBlur = 8;
  for (let r = 0; r < currentPiece.shape.length; r++) {
    for (let c = 0; c < currentPiece.shape[r].length; c++) {
      if (!currentPiece.shape[r][c]) continue;
      const x = GRID_X + (currentPiece.x + c) * BLOCK;
      const y = GRID_Y + (currentPiece.y + r) * BLOCK;
      if (y >= GRID_Y - BLOCK) drawBrick(x, y, currentPiece.color, false);
    }
  }
  ctx.shadowBlur = 0;
}

function drawZombie(z, t) {
  const x = z.x, y = z.y;
  const type = z.type;
  const walk = z.state === 'walking' ? Math.sin(z.shamble) : 0;
  const lurch = z.state === 'walking' ? Math.sin(z.shamble * 0.7) * 1.5 : 0;

  ctx.save();
  if (z.state === 'dead') {
    const p = Math.min(1, z.deathTime / 700);
    ctx.globalAlpha = Math.max(0, 1 - p);
    ctx.translate(x, y);
    ctx.rotate(p * 0.9);
    ctx.translate(-x, -y);
  }

  ctx.shadowColor = type.color;
  ctx.shadowBlur = 14;

  if (type.name === 'crawler') {
    // low, scuttling
    ctx.fillStyle = type.color;
    ctx.fillRect(x - 13, y - 16 + lurch, 26, 12);
    ctx.fillRect(x - 9, y - 22 + lurch, 18, 7);
    // arms reaching
    ctx.fillRect(x - 18, y - 12 + walk * 1.5, 6, 4);
    ctx.fillRect(x + 12, y - 12 - walk * 1.5, 6, 4);
    // legs
    ctx.fillStyle = '#2a1a1a';
    ctx.fillRect(x - 10, y - 4, 5, 4);
    ctx.fillRect(x + 5, y - 4, 5, 4);
    // eyes
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ff006e';
    ctx.fillRect(x - 6, y - 19 + lurch, 3, 3);
    ctx.fillRect(x + 3, y - 19 + lurch, 3, 3);
    // tattered details
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(x - 4, y - 13 + lurch, 2, 5);
    ctx.fillRect(x + 6, y - 13 + lurch, 2, 5);
  } else if (type.name === 'walker') {
    // legs
    ctx.fillStyle = '#1f1015';
    ctx.fillRect(x - 8, y - 12, 6, 12);
    ctx.fillRect(x + 2, y - 12 - walk * 2, 6, 12 + walk * 2);
    // tattered pants
    ctx.fillStyle = '#4a2030';
    ctx.fillRect(x - 8, y - 22, 6, 10);
    ctx.fillRect(x + 2, y - 22, 6, 10);
    // body
    ctx.fillStyle = type.color;
    ctx.fillRect(x - 11, y - 36 + lurch, 22, 16);
    // ripped shirt detail
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(x - 4, y - 30 + lurch, 8, 8);
    // arms (outstretched, shambling)
    ctx.fillStyle = type.color;
    ctx.fillRect(x - 20, y - 34 + lurch + walk, 10, 5);
    ctx.fillRect(x + 10, y - 34 + lurch - walk, 10, 5);
    // hands
    ctx.fillStyle = '#7aaa3a';
    ctx.fillRect(x - 24, y - 36 + lurch + walk, 5, 8);
    ctx.fillRect(x + 19, y - 36 + lurch - walk, 5, 8);
    // head
    ctx.fillStyle = type.color;
    ctx.fillRect(x - 8, y - 48 + lurch, 16, 12);
    // jaw drop
    ctx.fillStyle = '#1a0a14';
    ctx.fillRect(x - 4, y - 39 + lurch, 8, 3);
    // eyes
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ff006e';
    ctx.fillRect(x - 5, y - 44 + lurch, 3, 3);
    ctx.fillRect(x + 2, y - 44 + lurch, 3, 3);
  } else if (type.name === 'lurcher') {
    // hulking, tall
    ctx.fillStyle = '#1f1015';
    ctx.fillRect(x - 11, y - 14, 8, 14);
    ctx.fillRect(x + 3, y - 14 - walk * 2, 8, 14 + walk * 2);
    // big body
    ctx.fillStyle = type.color;
    ctx.fillRect(x - 16, y - 46 + lurch, 32, 32);
    // chest detail
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(x - 5, y - 38 + lurch, 10, 16);
    ctx.fillRect(x - 14, y - 42 + lurch, 4, 6);
    // arms — huge
    ctx.fillStyle = type.color;
    ctx.fillRect(x - 28, y - 42 + lurch + walk, 12, 7);
    ctx.fillRect(x + 16, y - 42 + lurch - walk, 12, 7);
    // hands/claws
    ctx.fillStyle = '#a86010';
    ctx.fillRect(x - 32, y - 44 + lurch + walk, 6, 11);
    ctx.fillRect(x + 26, y - 44 + lurch - walk, 6, 11);
    // head
    ctx.fillStyle = type.color;
    ctx.fillRect(x - 11, y - 60 + lurch, 22, 14);
    // tusks
    ctx.fillStyle = '#fff5d0';
    ctx.fillRect(x - 5, y - 48 + lurch, 2, 5);
    ctx.fillRect(x + 3, y - 48 + lurch, 2, 5);
    // eyes — angrier
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ff006e';
    ctx.fillRect(x - 7, y - 56 + lurch, 4, 4);
    ctx.fillRect(x + 3, y - 56 + lurch, 4, 4);
  }

  ctx.restore();
  ctx.shadowBlur = 0;
}

function drawParticles() {
  for (const p of particles) {
    const a = p.life / p.maxLife;
    ctx.globalAlpha = a;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
  }
  ctx.globalAlpha = 1;
}

function drawBorderSign() {
  const x = 720;
  const y = GROUND_Y - 50;
  // post
  ctx.fillStyle = '#1a0a05';
  ctx.fillRect(x - 2, y, 4, 50);
  // sign panel
  ctx.fillStyle = '#1a0420';
  ctx.fillRect(x - 62, y - 42, 124, 36);
  ctx.fillStyle = '#ffbe0b';
  ctx.fillRect(x - 60, y - 40, 120, 32);
  ctx.strokeStyle = '#5a2a00';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x - 60, y - 40, 120, 32);

  ctx.font = '8px "Press Start 2P"';
  ctx.fillStyle = '#5a2a00';
  ctx.textAlign = 'center';
  ctx.fillText('SOUTHERN', x, y - 26);
  ctx.fillText('BORDER ←', x, y - 12);
  ctx.textAlign = 'left';

  // sign glow
  ctx.shadowColor = '#ffbe0b';
  ctx.shadowBlur = 18;
  ctx.strokeStyle = 'rgba(255, 190, 11, 0.3)';
  ctx.lineWidth = 1;
  ctx.strokeRect(x - 60, y - 40, 120, 32);
  ctx.shadowBlur = 0;
}

function drawHUD() {
  // top bar
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, W, 52);
  ctx.shadowColor = '#ff006e';
  ctx.shadowBlur = 8;
  ctx.strokeStyle = '#ff006e';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 52);
  ctx.lineTo(W, 52);
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.font = '12px "Press Start 2P"';
  ctx.fillStyle = '#ff006e';
  ctx.shadowColor = '#ff006e';
  ctx.shadowBlur = 10;
  ctx.fillText('BUILD THE WALL', 20, 32);

  ctx.font = '9px "Press Start 2P"';
  ctx.fillStyle = '#ffbe0b';
  ctx.shadowColor = '#ffbe0b';
  ctx.shadowBlur = 6;
  ctx.fillText('SCORE', 250, 18);
  ctx.fillStyle = '#fff';
  ctx.shadowBlur = 4;
  ctx.fillText(String(score).padStart(6, '0'), 250, 36);

  ctx.fillStyle = '#06ffa5';
  ctx.shadowColor = '#06ffa5';
  ctx.shadowBlur = 6;
  ctx.fillText('HI', 380, 18);
  ctx.fillStyle = '#fff';
  ctx.shadowBlur = 4;
  ctx.fillText(String(Math.max(hiScore, score)).padStart(6, '0'), 380, 36);

  ctx.fillStyle = '#8338ec';
  ctx.shadowColor = '#8338ec';
  ctx.shadowBlur = 6;
  ctx.fillText('LV', 510, 18);
  ctx.fillStyle = '#fff';
  ctx.shadowBlur = 4;
  ctx.fillText(String(level).padStart(2, '0'), 510, 36);

  // lives
  ctx.fillStyle = '#ff006e';
  ctx.shadowColor = '#ff006e';
  ctx.shadowBlur = 6;
  ctx.fillText('LIVES', 580, 18);
  ctx.shadowBlur = 0;
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = i < lives ? '#ff006e' : 'rgba(255, 0, 110, 0.18)';
    const lx = 580 + i * 18;
    ctx.fillRect(lx, 28, 12, 4);
    ctx.fillRect(lx + 2, 26, 8, 2);
    ctx.fillRect(lx + 1, 32, 10, 6);
    ctx.fillRect(lx + 3, 38, 6, 2);
  }

  // next preview
  ctx.fillStyle = '#06ffa5';
  ctx.shadowColor = '#06ffa5';
  ctx.shadowBlur = 6;
  ctx.fillText('NEXT', 710, 18);
  ctx.shadowBlur = 0;
  const nx = 780, ny = 14, nb = 11;
  for (let r = 0; r < nextPiece.shape.length; r++) {
    for (let c = 0; c < nextPiece.shape[r].length; c++) {
      if (nextPiece.shape[r][c]) {
        ctx.fillStyle = nextPiece.color;
        ctx.fillRect(nx + c * nb, ny + r * nb, nb - 1, nb - 1);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(nx + c * nb, ny + r * nb, nb - 1, 1);
      }
    }
  }

  // mute icon
  ctx.font = '8px "Press Start 2P"';
  ctx.fillStyle = muted ? '#ff006e' : 'rgba(255, 255, 255, 0.4)';
  ctx.fillText(muted ? '[M]UTED' : '[M]', 870, 12);
}

function drawTitle(t) {
  drawBackground(t);
  drawBorderSign();

  // some decorative bricks at the bottom — half-built wall
  const decoBricks = [
    [0, ROWS-1], [1, ROWS-1], [2, ROWS-1], [3, ROWS-1], [5, ROWS-1], [6, ROWS-1],
    [0, ROWS-2], [1, ROWS-2], [5, ROWS-2], [6, ROWS-2],
    [5, ROWS-3],
  ];
  for (const [c, r] of decoBricks) {
    drawBrick(GRID_X + c * BLOCK, GRID_Y + r * BLOCK, '#ffbe0b', true);
  }

  // a wandering zombie on the title for atmosphere
  drawZombie({
    x: 540, y: GROUND_Y + 2,
    type: ZOMBIE_TYPES[1],
    state: 'walking',
    shamble: t * 0.005,
    anim: t,
    deathTime: 0,
  }, t);

  const cx = W / 2;
  const wob = Math.sin(t * 0.0025) * 4;

  ctx.textAlign = 'center';
  ctx.font = '56px "Press Start 2P"';
  // big neon title
  ctx.shadowColor = '#ff006e';
  ctx.shadowBlur = 35;
  ctx.fillStyle = '#ff006e';
  ctx.fillText('BUILD', cx - 3, 175 + wob);
  ctx.shadowColor = '#06ffa5';
  ctx.fillStyle = '#06ffa5';
  ctx.fillText('THE WALL', cx + 3, 250 + wob);

  ctx.shadowBlur = 12;
  ctx.font = '14px "Press Start 2P"';
  ctx.fillStyle = '#ffbe0b';
  ctx.shadowColor = '#ffbe0b';
  ctx.fillText('★ ZOMBIE BORDER SIEGE ★', cx, 305);

  ctx.font = '10px "Press Start 2P"';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 8;
  ctx.fillText('STACK BRICKS. HOLD THE LINE.', cx, 345);

  if (Math.floor(t / 450) % 2 === 0) {
    ctx.font = '16px "Press Start 2P"';
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#06ffa5';
    ctx.shadowBlur = 16;
    ctx.fillText('PRESS SPACE TO START', cx, 410);
  }

  // controls bar — high contrast against the sunset
  ctx.font = '10px "Press Start 2P"';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#06ffa5';
  ctx.shadowBlur = 14;
  ctx.fillText('← → MOVE   ↑ ROTATE   ↓ DROP   SPACE SLAM', cx, 455);

  if (hiScore > 0) {
    ctx.fillStyle = '#ff006e';
    ctx.shadowColor = '#ff006e';
    ctx.fillText('HI-SCORE  ' + String(hiScore).padStart(6, '0'), cx, 490);
  }

  // credit
  ctx.font = '8px "Press Start 2P"';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.shadowBlur = 0;
  ctx.fillText('© 198X  ARCADE EDITION', cx, 540);

  ctx.shadowBlur = 0;
  ctx.textAlign = 'left';
}

function drawGameOver(t) {
  ctx.fillStyle = 'rgba(8, 0, 18, 0.78)';
  ctx.fillRect(0, 0, W, H);
  const cx = W / 2;

  ctx.textAlign = 'center';
  ctx.font = '52px "Press Start 2P"';
  ctx.shadowColor = '#ff006e';
  ctx.shadowBlur = 35;
  ctx.fillStyle = '#ff006e';
  ctx.fillText('BORDER', cx - 3, 215);
  ctx.fillText('BREACHED', cx + 3, 285);

  ctx.font = '14px "Press Start 2P"';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#ffbe0b';
  ctx.shadowColor = '#ffbe0b';
  ctx.fillText('SCORE   ' + String(score).padStart(6, '0'), cx, 350);

  ctx.fillStyle = '#06ffa5';
  ctx.shadowColor = '#06ffa5';
  ctx.fillText('LEVEL   ' + String(level).padStart(2, '0'), cx, 380);

  if (score >= hiScore && hiScore > 0) {
    ctx.font = '12px "Press Start 2P"';
    ctx.fillStyle = '#ff006e';
    ctx.shadowColor = '#ff006e';
    ctx.shadowBlur = 16;
    const tw = Math.floor(t / 200) % 2 === 0;
    if (tw) ctx.fillText('★ NEW HI-SCORE ★', cx, 420);
  }

  if (Math.floor(t / 500) % 2 === 0) {
    ctx.font = '12px "Press Start 2P"';
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#06ffa5';
    ctx.shadowBlur = 12;
    ctx.fillText('PRESS SPACE TO RETRY', cx, 475);
  }

  ctx.shadowBlur = 0;
  ctx.textAlign = 'left';
}

function drawPaused() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center';
  ctx.font = '44px "Press Start 2P"';
  ctx.fillStyle = '#ffbe0b';
  ctx.shadowColor = '#ffbe0b';
  ctx.shadowBlur = 22;
  ctx.fillText('PAUSED', W/2, H/2 - 10);
  ctx.font = '11px "Press Start 2P"';
  ctx.fillStyle = '#fff';
  ctx.shadowColor = '#fff';
  ctx.shadowBlur = 8;
  ctx.fillText('PRESS P TO RESUME', W/2, H/2 + 40);
  ctx.shadowBlur = 0;
  ctx.textAlign = 'left';
}

function tryResumeAudio() {
  initAudio();
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
}

function tryMovePiece(e) {
  if (state === "playing" && !collides(currentPiece, e, 0)) {
    currentPiece.x += e;
    beep(220, .025, "square", .04);
  }
}

function tryMovePieceDown() {
    if (state === "playing" && !collides(currentPiece, 0, 1)) {
      currentPiece.y++;
      score += 1;
    }
}

function resetAndPlay() {
  reset();
  state = "playing";
}

function togglePause() {
  if (state === "playing")
    state = "paused";

  if (state == "paused")
    state = "playing";
}
document.addEventListener("keydown", e => {
  tryResumeAudio();

  if (e.code === 'KeyM') { muted = !muted; e.preventDefault(); return; }

  if (state === 'title' || state == 'gameover') {
    if (e.code === 'Space') {
      reset();
      state = 'playing';
      e.preventDefault();
    }
    return;
  }

  if (e.code === 'KeyP') { togglePause(); return; }

  if (state !== 'playing') return;

  if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
    tryMovePiece(-1);
    e.preventDefault();
  } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
    tryMovePiece(1);
    e.preventDefault();
  } else if (e.code === 'ArrowUp' || e.code === 'KeyW') {
    tryRotate();
    e.preventDefault();
  } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
    tryMovePieceDown();
    e.preventDefault();
  } else if (e.code === 'Space') {
    hardDrop();
    e.preventDefault();
  }
});

let touchTracker = createTouchTracker();
let Yt = 52;
let Jt = 90;

function getBoundingClientRect() {
  return canvas.getBoundingClientRect();
}

function getWidthInBlocks(e) {
  return e.width > 0 ? e.width / W * BLOCK : BLOCK;
}

function applyTouchMotion(e) {
  if (e === "left")
    tryMovePiece(-1);

  if (e === "right")
    tryMovePiece(1);

  if (e === "soft")
    tryMovePieceDown();
  
  if (e === "slam" && state === "playing")
    hardDrop();
}

function processTap(e, l) {
    let o = getBoundingClientRect(),
        r = o.width > 0 ? (e - o.left) / o.width * W : 0,
        i = o.height > 0 ? (l - o.top) / o.height * H : H,
        f = Mt(r, i, state, {
            width: W,
            hudHeight: Yt,
            muteWidth: Jt
        });
    f === "start" ? resetAndPlay() : f === "pause" || f === "resume" ? togglePause() : f === "mute" ? muted = !muted : f === "rotate" && tryRotate()
}

canvas.addEventListener("touchstart", e => {
  tryResumeAudio();
  isPhone = false;
  e.preventDefault();

  let touch = e.changedTouches[0];
  touchTracker.start({
    id: touch.identifier,
    x: touch.clientX,
    y: touch.clientY,
    at: performance.now()
  });
}, { passive: false });

canvas.addEventListener("touchmove", e => {
  let l = getBoundingClientRect();
  for (let touch_n = 0; touch_n < e.changedTouches.length; touch_n++) {
    let touch = e.changedTouches[touch_n];

    if (!touchTracker.tracking(touch.identifier)) continue;

    e.preventDefault();

    let i = touchTracker.move({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY
    }, getWidthInBlocks(l));

    for (let f of i) applyTouchMotion(f);
  }
}, { passive: false });

canvas.addEventListener("touchend", e => {
  let l = getBoundingClientRect();
  for (let touch_n = 0; touch_n < e.changedTouches.length; touch_n++) {
    let touch = e.changedTouches[touch_n];
    if (!touchTracker.tracking(touch.identifier)) continue;
    e.preventDefault();
    let i = touchTracker.end({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
        at: performance.now()
    }, getWidthInBlocks(l));
    if (i) {
      if (i.action === "tap")
        processTap(i.x, i.y);
      else
        applyTouchMotion(i.action);
    }
  }
}, { passive: false });

canvas.addEventListener("touchcancel", e => {
  for (let l = 0; l < e.changedTouches.length; l++)
    touchTracker.cancel(e.changedTouches[l].identifier);
}, { passive: false });


// ============== LOOP ==============
let lastTime = 0;

function loop(time) {
  const dt = Math.min(50, time - lastTime);
  lastTime = time;

  if (state === 'playing') {
    gameTime += dt;
    const newLevel = Math.floor(gameTime / 22000) + 1;
    if (newLevel > level) {
      level = newLevel;
      dropInterval = Math.max(140, 850 - level * 65);
      zombieSpawnInterval = Math.max(1100, 4500 - level * 320);
      beep(660, 0.08, 'square', 0.07);
      beep(880, 0.12, 'square', 0.06);
    }

    dropTimer += dt;
    if (dropTimer >= dropInterval) {
      dropTimer = 0;
      if (!collides(currentPiece, 0, 1)) {
        currentPiece.y++;
      } else {
        lockPiece(currentPiece);
      }
    }

    zombieSpawnTimer -= dt;
    if (zombieSpawnTimer <= 0) {
      spawnZombie();
      zombieSpawnTimer = zombieSpawnInterval * (0.65 + Math.random() * 0.7);
    }

    updateZombies(dt);
    updateParticles(dt);

    if (shakeTime > 0) {
      shakeTime -= dt;
      if (shakeTime <= 0) shakeIntensity = 0;
    }
    if (flashTime > 0) flashTime -= dt;
    if (comboTime > 0) comboTime -= dt;
  } else if (state === 'gameover') {
    updateParticles(dt);
    if (shakeTime > 0) {
      shakeTime -= dt;
      if (shakeTime <= 0) shakeIntensity = 0;
    }
  }

  // === RENDER ===
  ctx.save();
  if (shakeIntensity > 0 && shakeTime > 0) {
    const sx = (Math.random() - 0.5) * shakeIntensity;
    const sy = (Math.random() - 0.5) * shakeIntensity;
    ctx.translate(sx, sy);
  }

  if (state === 'title') {
    drawTitle(time);
  } else {
    drawBackground(time);
    drawBorderSign();
    drawGridBackground();

    // zombies drawn behind the wall bricks so gaps reveal them
    const sorted = [...zombies].sort((a, b) => a.x - b.x);
    for (const z of sorted) drawZombie(z, time);

    drawLockedBricks();
    drawGridBorder();

    if (state === 'playing' || state === 'paused') {
      drawGhost();
      drawCurrentPiece();
    }

    drawParticles();
    drawHUD();

    if (flashTime > 0) {
      ctx.fillStyle = `rgba(255, 20, 60, ${flashTime / 400 * 0.45})`;
      ctx.fillRect(0, 0, W, H);
    }

    if (state === 'paused') drawPaused();
    if (state === 'gameover') drawGameOver(time);
  }

  ctx.restore();

  requestAnimationFrame(loop);
}

reset();
state = "title";
requestAnimationFrame(loop);
