import { useEffect, useRef } from "react";

// Self-playing Snake. A tiny AI finds the shortest safe path to the food
// (BFS), and when no path exists it survives by heading into the largest open
// area (flood fill). If it ever gets boxed in, the board resets — so the loop
// runs forever with no input. Grid + cell size come from props so the same
// component works as a small panel or a full-bleed background.
export default function SnakeGame({
  cols = 20,
  rows = 20,
  cell = 16,
  interval = 85,
  className = "arcade-canvas",
  fill = false,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const COLS = cols, ROWS = rows, CELL = cell;
    const W = COLS * CELL, H = ROWS * CELL;
    const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const inB = (x, y) => x >= 0 && x < COLS && y >= 0 && y < ROWS;
    const key = (x, y) => y * COLS + x;

    const bodyBlocked = (snake) => {
      const set = new Set();
      for (let i = 0; i < snake.length - 1; i++) set.add(key(snake[i][0], snake[i][1]));
      return set;
    };

    const randEmpty = (snake) => {
      const occ = new Set(snake.map(([x, y]) => key(x, y)));
      const free = [];
      for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) if (!occ.has(key(x, y))) free.push([x, y]);
      return free.length ? free[(Math.random() * free.length) | 0] : null;
    };

    // Shortest-path first step toward the food, or null if unreachable.
    const bfsStep = (snake, food) => {
      const head = snake[0];
      const blocked = bodyBlocked(snake);
      const prev = new Map();
      prev.set(key(head[0], head[1]), -1);
      const q = [head];
      let qi = 0;
      while (qi < q.length) {
        const cur = q[qi++];
        if (cur[0] === food[0] && cur[1] === food[1]) {
          let node = cur;
          while (true) {
            const p = prev.get(key(node[0], node[1]));
            if (p === -1) return null;
            if (key(p[0], p[1]) === key(head[0], head[1])) return [node[0] - head[0], node[1] - head[1]];
            node = p;
          }
        }
        for (const [dx, dy] of DIRS) {
          const nx = cur[0] + dx, ny = cur[1] + dy;
          if (!inB(nx, ny) || blocked.has(key(nx, ny)) || prev.has(key(nx, ny))) continue;
          prev.set(key(nx, ny), cur);
          q.push([nx, ny]);
        }
      }
      return null;
    };

    const floodArea = (start, blocked) => {
      const seen = new Set([key(start[0], start[1])]);
      const st = [start];
      let area = 0;
      while (st.length) {
        const [cx, cy] = st.pop();
        area++;
        for (const [dx, dy] of DIRS) {
          const nx = cx + dx, ny = cy + dy;
          if (!inB(nx, ny) || blocked.has(key(nx, ny)) || seen.has(key(nx, ny))) continue;
          seen.add(key(nx, ny));
          st.push([nx, ny]);
        }
      }
      return area;
    };

    // Survival fallback: step into whichever free neighbour opens the most space.
    const survivalStep = (snake) => {
      const head = snake[0];
      const blocked = bodyBlocked(snake);
      let best = null, bestArea = -1;
      for (const [dx, dy] of DIRS) {
        const nx = head[0] + dx, ny = head[1] + dy;
        if (!inB(nx, ny) || blocked.has(key(nx, ny))) continue;
        const area = floodArea([nx, ny], blocked);
        if (area > bestArea) { bestArea = area; best = [dx, dy]; }
      }
      return best;
    };

    const reset = (g) => {
      const cx = (COLS / 2) | 0, cy = (ROWS / 2) | 0;
      g.snake = [[cx, cy], [cx - 1, cy], [cx - 2, cy]];
      g.food = randEmpty(g.snake);
    };

    const step = (g) => {
      const dir = bfsStep(g.snake, g.food) || survivalStep(g.snake);
      if (!dir) { reset(g); return; }
      const head = g.snake[0];
      const nh = [head[0] + dir[0], head[1] + dir[1]];
      g.snake.unshift(nh);
      if (g.food && nh[0] === g.food[0] && nh[1] === g.food[1]) {
        const f = randEmpty(g.snake);
        if (!f) { reset(g); return; }
        g.food = f;
      } else {
        g.snake.pop();
      }
    };

    const rr = (ctx, x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    const HEAD = [167, 139, 250]; // violet
    const TAIL = [56, 189, 248]; // cyan
    const mix = (a, b, t) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;
    const pad = Math.max(1.5, CELL * 0.12);
    const radius = Math.max(2, CELL * 0.26);

    const draw = (ctx, g) => {
      ctx.clearRect(0, 0, W, H);
      // grid dots
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
        ctx.beginPath();
        ctx.arc(x * CELL + CELL / 2, y * CELL + CELL / 2, Math.max(0.8, CELL * 0.05), 0, Math.PI * 2);
        ctx.fill();
      }
      // food
      if (g.food) {
        ctx.fillStyle = "#f472b6";
        ctx.shadowColor = "#f472b6";
        ctx.shadowBlur = CELL * 0.9;
        ctx.beginPath();
        ctx.arc(g.food[0] * CELL + CELL / 2, g.food[1] * CELL + CELL / 2, CELL / 2 - pad, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      // snake (head violet → tail cyan)
      const n = g.snake.length;
      for (let i = n - 1; i >= 0; i--) {
        const [x, y] = g.snake[i];
        const t = n > 1 ? i / (n - 1) : 0;
        ctx.fillStyle = mix(HEAD, TAIL, t);
        if (i === 0) { ctx.shadowColor = "#a78bfa"; ctx.shadowBlur = CELL * 0.75; } else { ctx.shadowBlur = 0; }
        rr(ctx, x * CELL + pad, y * CELL + pad, CELL - pad * 2, CELL - pad * 2, radius);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    if (fill) {
      // Let CSS size it (width/height 100% + object-fit: cover).
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    } else {
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
    }
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const g = {};
    reset(g);
    draw(ctx, g);
    const id = setInterval(() => { step(g); draw(ctx, g); }, interval);
    return () => clearInterval(id);
  }, [cols, rows, cell, interval, fill]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
