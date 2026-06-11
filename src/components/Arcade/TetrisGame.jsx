import { useEffect, useRef } from "react";

// Self-playing Tetris. For every new piece the AI scores all rotations ×
// columns with the classic weighted heuristic (aggregate height, completed
// lines, holes, bumpiness — El-Tetris style), then drops the piece into the
// best slot. On a top-out the board clears and it keeps going — forever.
// The 10×20 grid is fixed; only the cell pixel size (and tick) come from props.

const COLS = 10;
const ROWS = 20;

const SHAPES = {
  I: { cells: [[0, 1], [1, 1], [2, 1], [3, 1]], color: "#38bdf8" },
  O: { cells: [[1, 0], [2, 0], [1, 1], [2, 1]], color: "#c084fc" },
  T: { cells: [[1, 0], [0, 1], [1, 1], [2, 1]], color: "#f472b6" },
  S: { cells: [[1, 0], [2, 0], [0, 1], [1, 1]], color: "#2dd4bf" },
  Z: { cells: [[0, 0], [1, 0], [1, 1], [2, 1]], color: "#fb7185" },
  J: { cells: [[0, 0], [0, 1], [1, 1], [2, 1]], color: "#60a5fa" },
  L: { cells: [[2, 0], [0, 1], [1, 1], [2, 1]], color: "#a78bfa" },
};
const KEYS = Object.keys(SHAPES);

const normalize = (cells) => {
  const minx = Math.min(...cells.map((c) => c[0]));
  const miny = Math.min(...cells.map((c) => c[1]));
  return cells.map(([x, y]) => [x - minx, y - miny]);
};
const rotateCW = (cells) => normalize(cells.map(([x, y]) => [y, -x]));

const ROT = {};
for (const k of KEYS) {
  const states = [];
  let c = normalize(SHAPES[k].cells);
  for (let i = 0; i < 4; i++) { states.push(c); c = rotateCW(c); }
  ROT[k] = states;
}

const emptyBoard = () => Array.from({ length: ROWS }, () => new Array(COLS).fill(null));

const collides = (board, cells, ox, oy) => {
  for (const [x, y] of cells) {
    const gx = ox + x, gy = oy + y;
    if (gx < 0 || gx >= COLS || gy >= ROWS) return true;
    if (gy >= 0 && board[gy][gx]) return true;
  }
  return false;
};

const landingY = (board, cells, ox) => {
  let oy = -3;
  if (collides(board, cells, ox, oy)) return null;
  while (!collides(board, cells, ox, oy + 1)) oy++;
  return oy;
};

const heightsOf = (board) => {
  const h = new Array(COLS).fill(0);
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) if (board[y][x]) { h[x] = ROWS - y; break; }
  }
  return h;
};

const evaluate = (board) => {
  const h = heightsOf(board);
  let agg = 0, bump = 0, holes = 0, lines = 0;
  for (let x = 0; x < COLS; x++) {
    agg += h[x];
    if (x < COLS - 1) bump += Math.abs(h[x] - h[x + 1]);
    const top = ROWS - h[x];
    for (let y = top + 1; y < ROWS; y++) if (!board[y][x]) holes++;
  }
  for (let y = 0; y < ROWS; y++) if (board[y].every((c) => c)) lines++;
  return -0.510066 * agg + 0.760666 * lines - 0.35663 * holes - 0.184483 * bump;
};

const bestMove = (board, k) => {
  let best = null;
  for (let r = 0; r < ROT[k].length; r++) {
    const cells = ROT[k][r];
    const w = Math.max(...cells.map((c) => c[0])) + 1;
    for (let ox = 0; ox <= COLS - w; ox++) {
      const oy = landingY(board, cells, ox);
      if (oy === null) continue;
      const test = board.map((row) => row.slice());
      for (const [x, y] of cells) if (oy + y >= 0) test[oy + y][ox + x] = SHAPES[k].color;
      const score = evaluate(test);
      if (!best || score > best.score) best = { r, ox, oy, score };
    }
  }
  return best;
};

const place = (board, cells, ox, oy, color) => {
  for (const [x, y] of cells) { const gy = oy + y; if (gy >= 0) board[gy][ox + x] = color; }
};

const clearLines = (board) => {
  let cleared = 0;
  for (let y = ROWS - 1; y >= 0; y--) {
    if (board[y].every((c) => c)) {
      board.splice(y, 1);
      board.unshift(new Array(COLS).fill(null));
      cleared++;
      y++;
    }
  }
  return cleared;
};

const spawn = (g) => {
  const k = KEYS[(Math.random() * KEYS.length) | 0];
  let mv = bestMove(g.board, k);
  // Endless mode: if the stack is too tall to place the next piece, free room
  // by dropping the bottom row (shift the whole stack down) — never a full-board
  // reset. With the heuristic AI this rarely triggers, so play looks continuous.
  let guard = 0;
  while ((!mv || mv.oy < 0) && guard++ < ROWS) {
    g.board.pop();
    g.board.unshift(new Array(COLS).fill(null));
    mv = bestMove(g.board, k);
  }
  if (!mv) mv = { r: 0, ox: 0, oy: 0 };
  g.cur = { key: k, cells: ROT[k][mv.r], ox: mv.ox, oy: -2, color: SHAPES[k].color };
};

const tick = (g) => {
  const c = g.cur;
  if (!collides(g.board, c.cells, c.ox, c.oy + 1)) {
    c.oy++;
  } else {
    place(g.board, c.cells, c.ox, c.oy, c.color);
    clearLines(g.board);
    spawn(g);
  }
};

export default function TetrisGame({ cell = 14, interval = 60, className = "arcade-canvas", fill = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const CELL = cell;
    const W = COLS * CELL, H = ROWS * CELL;

    const rr = (ctx, x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };
    const radius = Math.max(2, CELL * 0.2);
    const drawCell = (ctx, x, y, color, glow) => {
      ctx.fillStyle = color;
      if (glow) { ctx.shadowColor = color; ctx.shadowBlur = CELL * 0.7; } else { ctx.shadowBlur = 0; }
      rr(ctx, x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2, radius);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255,255,255,0.14)";
      rr(ctx, x * CELL + 1, y * CELL + 1, CELL - 2, (CELL - 2) / 2.4, radius);
      ctx.fill();
    };

    const draw = (ctx, g) => {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,255,255,0.035)";
      ctx.lineWidth = 1;
      for (let x = 1; x < COLS; x++) { ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, H); ctx.stroke(); }
      for (let y = 1; y < ROWS; y++) { ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(W, y * CELL); ctx.stroke(); }
      for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) if (g.board[y][x]) drawCell(ctx, x, y, g.board[y][x], false);
      const c = g.cur;
      for (const [x, y] of c.cells) { const gy = c.oy + y; if (gy >= 0) drawCell(ctx, c.ox + x, gy, c.color, true); }
    };

    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    if (fill) {
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    } else {
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
    }
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const g = { board: emptyBoard() };
    spawn(g);
    draw(ctx, g);
    const id = setInterval(() => { tick(g); draw(ctx, g); }, interval);
    return () => clearInterval(id);
  }, [cell, interval, fill]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
