window.__ModuleLoader__.load({
  id: 'dsh-basketball-pet',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const SIZE = 60;
    const R = SIZE / 2;
    const GRAVITY = 2400;
    const FLOOR_REST = 0.78;
    const WALL_REST = 0.84;
    const RIM_TIP_R = 6;
    const RIM_LEN = 132;
    const BOARD_W = 16;
    const BOARD_H = 120;
    const BOX_W = 96;
    const BOX_H = 60;
    const EDGE = 30;
    const MAX_THROW = 2600;
    const SCORE_KEY = 'dsh-basketball-pet:score:v1';
    const LAYOUT_KEY = 'dsh-basketball-pet:layout:v1';

    const CSS = [
      '.dsh-bball-layer{position:fixed;inset:0;z-index:60;overflow:hidden;pointer-events:none;',
      'contain:layout style;user-select:none;-webkit-user-select:none;',
      'font-family:var(--dsw-font-sans, ui-sans-serif, system-ui, sans-serif)}',
      '.dsh-bball-hoop{position:absolute;left:0;top:0;pointer-events:none;',
      'filter:drop-shadow(0 8px 14px rgba(0,0,0,.16));transition:filter 160ms ease}',
      '.dsh-bball-hoop.is-dragging{filter:drop-shadow(0 18px 26px rgba(0,0,0,.34))}',
      '.dsh-bball-grab{pointer-events:all;cursor:grab}',
      '.dsh-bball-hoop.is-dragging .dsh-bball-grab{cursor:grabbing}',
      '.dsh-bball-net{stroke:rgba(255,255,255,.84);stroke-width:1.4;fill:none;',
      'transform-box:fill-box;transform-origin:50% 0}',
      '.dsh-bball-net.is-faint{stroke:rgba(255,255,255,.55);stroke-width:1.1}',
      '.dsh-bball-hoop.is-swish .dsh-bball-net{animation:dsh-bball-net 460ms cubic-bezier(.2,.9,.3,1)}',
      '@keyframes dsh-bball-net{0%{transform:translateY(0) scaleY(1)}30%{transform:translateY(9px) scaleY(1.14)}65%{transform:translateY(-4px) scaleY(.97)}100%{transform:translateY(0) scaleY(1)}}',
      '.dsh-bball-score{position:absolute;left:0;top:0;display:inline-flex;align-items:center;gap:7px;',
      'padding:5px 13px 5px 9px;border-radius:999px;pointer-events:none;',
      'background:linear-gradient(180deg,rgba(41,45,56,.95),rgba(19,22,29,.95));',
      'border:1px solid rgba(255,171,94,.45);',
      'box-shadow:0 10px 22px rgba(0,0,0,.34),inset 0 1px 0 rgba(255,255,255,.16);',
      'color:#ffb877;font-size:15px;font-weight:800;line-height:1;letter-spacing:.6px;',
      'font-variant-numeric:tabular-nums;transform-origin:50% 50%}',
      '.dsh-bball-score.is-bump{animation:dsh-bball-bump 380ms cubic-bezier(.2,1.7,.4,1)}',
      '@keyframes dsh-bball-bump{0%{transform:scale(1)}38%{transform:scale(1.24)}100%{transform:scale(1)}}',
      '.dsh-bball-score-ico{display:inline-block;width:14px;height:14px;border-radius:50%;',
      'background:radial-gradient(circle at 34% 30%,#ffd0a4,#f0801f 56%,#a94a08);',
      'box-shadow:inset 0 0 0 1px rgba(0,0,0,.34),0 1px 2px rgba(0,0,0,.3)}',
      '.dsh-bball-plus{position:absolute;left:0;top:0;pointer-events:none;opacity:0;',
      'color:#ffd257;font-size:22px;font-weight:800;text-shadow:0 2px 10px rgba(0,0,0,.5)}',
      '.dsh-bball-plus.is-on{animation:dsh-bball-plus 900ms ease-out forwards}',
      '@keyframes dsh-bball-plus{0%{opacity:0;transform:translateY(0) scale(.7)}18%{opacity:1;transform:translateY(-12px) scale(1.12)}100%{opacity:0;transform:translateY(-74px) scale(1)}}',
      '.dsh-bball-box{position:absolute;left:0;top:0;width:96px;height:60px;z-index:4;pointer-events:auto;',
      'cursor:grab;border-radius:5px 5px 8px 8px;border:2px solid #6b4318;',
      'background:repeating-linear-gradient(90deg,rgba(0,0,0,.13) 0 2px,transparent 2px 16px),',
      'linear-gradient(160deg,#d59a55,#b0702c 52%,#8a4f1e);',
      'box-shadow:0 14px 22px rgba(0,0,0,.3),inset 0 -8px 0 rgba(0,0,0,.16),inset 0 2px 0 rgba(255,255,255,.2)}',
      '.dsh-bball-box.is-dragging{cursor:grabbing;box-shadow:0 22px 30px rgba(0,0,0,.42),inset 0 -8px 0 rgba(0,0,0,.16)}',
      '.dsh-bball-box.is-full{cursor:grab}',
      '.dsh-bball-box.is-full::after{content:"";position:absolute;inset:-6px;border-radius:10px;',
      'border:2px solid rgba(255,196,104,.55);animation:dsh-bball-hint 2.1s ease-in-out infinite}',
      '@keyframes dsh-bball-hint{0%,100%{opacity:.12}50%{opacity:.62}}',
      '.dsh-bball-box.is-target{border-color:#ffca6a;box-shadow:0 0 0 3px rgba(255,190,90,.35),0 14px 22px rgba(0,0,0,.3)}',
      '.dsh-bball-box-mouth{position:absolute;left:5px;right:5px;top:-5px;height:12px;border-radius:3px;',
      'background:#2b1c0c;box-shadow:inset 0 3px 7px rgba(0,0,0,.75),0 1px 0 rgba(255,255,255,.22)}',
      '.dsh-bball-shadow{position:absolute;left:0;top:0;width:46px;height:12px;z-index:1;',
      'border-radius:50%;background:radial-gradient(rgba(0,0,0,.42),rgba(0,0,0,0) 70%);opacity:0}',
      '.dsh-bball{position:absolute;left:0;top:0;width:60px;height:60px;z-index:5;',
      'will-change:transform;touch-action:none;cursor:grab;pointer-events:auto;transform-origin:50% 100%}',
      '.dsh-bball.is-drag{cursor:grabbing}',
      '.dsh-bball.is-stored{pointer-events:none;z-index:2}',
      '.dsh-bball-spin{width:100%;height:100%;will-change:transform}',
    ].join('');

    const dayKey = () => {
      const d = new Date();
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    };

    const readScore = () => {
      try {
        const raw = window.localStorage.getItem(SCORE_KEY);
        if (!raw) return 0;
        const saved = JSON.parse(raw);
        if (!saved || saved.day !== dayKey()) return 0;
        const n = Number(saved.score);
        return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
      } catch (error) {
        return 0;
      }
    };

    const writeScore = (value) => {
      try {
        window.localStorage.setItem(SCORE_KEY, JSON.stringify({ day: dayKey(), score: value }));
      } catch (error) {
        /* storage unavailable: the score still lives for this page */
      }
    };

    const readLayout = () => {
      try {
        const raw = window.localStorage.getItem(LAYOUT_KEY);
        if (!raw) return {};
        const saved = JSON.parse(raw);
        if (!saved || typeof saved !== 'object') return {};
        return saved;
      } catch (error) {
        return {};
      }
    };

    const writeLayout = (value) => {
      try {
        window.localStorage.setItem(LAYOUT_KEY, JSON.stringify(value));
      } catch (error) {
        /* layout persists only for this page when storage is unavailable */
      }
    };

    function BallArt() {
      return h(
        'svg',
        { viewBox: '0 0 64 64', width: SIZE, height: SIZE, 'aria-hidden': 'true' },
        h(
          'defs',
          null,
          h(
            'radialGradient',
            { id: 'dsh-bball-grad', cx: '34%', cy: '28%', r: '78%' },
            h('stop', { offset: '0%', 'stop-color': '#ffc084' }),
            h('stop', { offset: '42%', 'stop-color': '#f28a2e' }),
            h('stop', { offset: '82%', 'stop-color': '#d9661a' }),
            h('stop', { offset: '100%', 'stop-color': '#a8480b' }),
          ),
          h('clipPath', { id: 'dsh-bball-clip' }, h('circle', { cx: '32', cy: '32', r: '29' })),
        ),
        h('circle', { cx: '32', cy: '32', r: '29', fill: 'url(#dsh-bball-grad)' }),
        h(
          'g',
          { clipPath: 'url(#dsh-bball-clip)', fill: 'none', stroke: '#4a2109', 'stroke-linecap': 'round' },
          h('path', { d: 'M3 32 H61', 'stroke-width': '2.1', opacity: '0.85' }),
          h('path', { d: 'M32 3 V61', 'stroke-width': '2.1', opacity: '0.85' }),
          h('path', { d: 'M8 12 C24 20 24 44 8 52', 'stroke-width': '2.1', opacity: '0.82' }),
          h('path', { d: 'M56 12 C40 20 40 44 56 52', 'stroke-width': '2.1', opacity: '0.82' }),
        ),
        h('ellipse', {
          cx: '23',
          cy: '19',
          rx: '9',
          ry: '6',
          fill: '#ffffff',
          opacity: '0.24',
          transform: 'rotate(-28 23 19)',
        }),
      );
    }

    function Hoop() {
      const width = RIM_LEN + 60;
      const rimY = 112;
      const boardX = RIM_LEN + 14;
      const mesh = [];
      const topX = (i) => 14 + (i * RIM_LEN) / 8;
      const botX = (i) => 50 + (i * 60) / 8;
      for (let i = 0; i < 8; i += 1) {
        mesh.push(h('line', { key: 'a' + i, x1: topX(i), y1: rimY + 4, x2: botX(i + 1), y2: 208 }));
        mesh.push(h('line', { key: 'b' + i, x1: topX(i + 1), y1: rimY + 4, x2: botX(i), y2: 208 }));
      }
      const rings = [140, 162, 184, 202];
      return h(
        'svg',
        { viewBox: '0 0 ' + width + ' 240', width: width, height: 240, 'aria-hidden': 'true', style: { pointerEvents: 'none' } },
        h(
          'defs',
          null,
          h(
            'linearGradient',
            { id: 'dsh-bball-rim', x1: '0', y1: '0', x2: '0', y2: '1' },
            h('stop', { offset: '0%', 'stop-color': '#ffc089' }),
            h('stop', { offset: '34%', 'stop-color': '#f57a26' }),
            h('stop', { offset: '72%', 'stop-color': '#d9530f' }),
            h('stop', { offset: '100%', 'stop-color': '#a63c05' }),
          ),
          h(
            'linearGradient',
            { id: 'dsh-bball-glass', x1: '0', y1: '0', x2: '1', y2: '0' },
            h('stop', { offset: '0%', 'stop-color': '#ffffff', 'stop-opacity': '0.97' }),
            h('stop', { offset: '62%', 'stop-color': '#f1f5fa', 'stop-opacity': '0.9' }),
            h('stop', { offset: '100%', 'stop-color': '#d9e2ec', 'stop-opacity': '0.92' }),
          ),
          h(
            'linearGradient',
            { id: 'dsh-bball-steel', x1: '0', y1: '0', x2: '1', y2: '0' },
            h('stop', { offset: '0%', 'stop-color': '#8a93a3' }),
            h('stop', { offset: '50%', 'stop-color': '#5d6675' }),
            h('stop', { offset: '100%', 'stop-color': '#3a4150' }),
          ),
          h(
            'radialGradient',
            { id: 'dsh-bball-tip', cx: '35%', cy: '30%', r: '75%' },
            h('stop', { offset: '0%', 'stop-color': '#ffe0c2' }),
            h('stop', { offset: '45%', 'stop-color': '#fb8b39' }),
            h('stop', { offset: '100%', 'stop-color': '#b64806' }),
          ),
        ),
        h('rect', { x: boardX + 4, y: 12, width: 16, height: 120, rx: 4, fill: 'rgba(12,16,24,.16)' }),
        h('rect', {
          x: boardX,
          y: 6,
          width: 16,
          height: 120,
          rx: 4,
          fill: 'url(#dsh-bball-glass)',
          stroke: 'rgba(58,66,80,.55)',
          'stroke-width': 1.4,
        }),
        h('line', {
          x1: boardX + 4,
          y1: 13,
          x2: boardX + 4,
          y2: 119,
          stroke: 'rgba(255,255,255,.9)',
          'stroke-width': 1.8,
          'stroke-linecap': 'round',
        }),
        h('line', {
          x1: boardX + 12,
          y1: 13,
          x2: boardX + 12,
          y2: 119,
          stroke: 'rgba(120,136,156,.35)',
          'stroke-width': 1,
        }),
        h('rect', { x: boardX + 16, y: 26, width: 8, height: 82, rx: 3, fill: 'url(#dsh-bball-steel)' }),
        h('rect', { x: boardX + 16, y: 44, width: 12, height: 7, rx: 2, fill: '#4a5261' }),
        h('rect', { x: boardX + 16, y: 92, width: 12, height: 7, rx: 2, fill: '#4a5261' }),
        h('rect', { x: boardX - 10, y: rimY - 8, width: 12, height: 18, rx: 3, fill: '#a84308' }),
        h('rect', { x: boardX - 10, y: rimY - 8, width: 12, height: 4, rx: 2, fill: 'rgba(255,190,140,.55)' }),
        h('g', { className: 'dsh-bball-net' }, mesh),
        h(
          'g',
          { className: 'dsh-bball-net is-faint' },
          rings.map((y, index) => {
            const t = (y - rimY) / 96;
            return h('line', {
              key: 'r' + index,
              x1: 14 + t * 34,
              y1: y,
              x2: 146 - t * 34,
              y2: y,
            });
          }),
        ),
        h('ellipse', {
          cx: 80,
          cy: 208,
          rx: 30,
          ry: 4.5,
          fill: 'none',
          stroke: 'rgba(255,255,255,.75)',
          'stroke-width': 1.8,
        }),
        h('line', {
          x1: 14,
          y1: rimY,
          x2: 146,
          y2: rimY,
          stroke: 'url(#dsh-bball-rim)',
          'stroke-width': 10,
          'stroke-linecap': 'round',
        }),
        h('line', {
          x1: 22,
          y1: rimY - 3.2,
          x2: 138,
          y2: rimY - 3.2,
          stroke: 'rgba(255,235,215,.6)',
          'stroke-width': 2.2,
          'stroke-linecap': 'round',
        }),
        h('line', {
          x1: 18,
          y1: rimY + 4.4,
          x2: 142,
          y2: rimY + 4.4,
          stroke: 'rgba(96,32,0,.4)',
          'stroke-width': 2.6,
          'stroke-linecap': 'round',
        }),
        h('circle', { cx: 14, cy: rimY, r: 7, fill: 'url(#dsh-bball-tip)' }),
        h('circle', { cx: 14, cy: rimY, r: 2.6, fill: 'rgba(255,236,214,.6)' }),
        h('rect', {
          className: 'dsh-bball-grab',
          x: 4,
          y: rimY - 16,
          width: RIM_LEN + 20,
          height: 30,
          fill: 'none',
        }),
        h('rect', { className: 'dsh-bball-grab', x: boardX - 12, y: 0, width: 48, height: 134, fill: 'none' }),
      );
    }

    function BasketballPet() {
      const layerRef = React.useRef(null);
      const ballRef = React.useRef(null);
      const shadowRef = React.useRef(null);
      const hoopRef = React.useRef(null);
      const boxRef = React.useRef(null);
      const scoreRef = React.useRef(null);
      const plusRef = React.useRef(null);

      React.useEffect(() => {
        const layer = layerRef.current;
        const ball = ballRef.current;
        const shadow = shadowRef.current;
        const hoop = hoopRef.current;
        const box = boxRef.current;
        const scoreEl = scoreRef.current;
        const plusEl = plusRef.current;
        if (!layer || !ball || !shadow || !hoop || !box || !scoreEl || !plusEl) return undefined;
        const plate = scoreEl.parentElement;
        if (!plate) return undefined;

        const state = {
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          angle: 0,
          spin: 0,
          squash: 0,
          mode: 'stored',
          dragging: false,
        };

        const geo = {
          left: 0,
          top: 0,
          w: 0,
          h: 0,
          rimY: 0,
          rimX1: 0,
          rimX2: 0,
          boardLeft: 0,
          boardTop: 0,
          boardBottom: 0,
          floorY: 0,
          box: { x: 0, y: 0, w: BOX_W, h: BOX_H },
        };

        const boxPos = { x: 0, y: 0 };
        const layout = readLayout();
        let score = readScore();
        let scoreDay = dayKey();
        let raf = 0;
        let lastFrame = 0;
        let lastDayCheck = 0;
        let netTimer = 0;
        let bumpTimer = 0;
        let hoopDrag = null;
        let boxDrag = null;
        const samples = [];
        let grabDx = 0;
        let grabDy = 0;

        scoreEl.textContent = String(score);

        const clampX = (value) => Math.min(Math.max(R + 2, value), Math.max(R + 2, geo.w - R - 2));
        const clampY = (value) => Math.min(Math.max(R + 2, value), Math.max(R + 2, geo.floorY));

        const clampHoop = (x, y) => {
          const maxX = Math.max(96, geo.w - RIM_LEN - 66);
          const maxY = Math.max(150, geo.h - 268);
          return {
            x: Math.min(Math.max(72, x), maxX),
            y: Math.min(Math.max(136, y), maxY),
          };
        };

        const clampBoxPos = (x, y) => ({
          x: Math.min(Math.max(8, x), Math.max(8, geo.w - BOX_W - 8)),
          y: Math.min(Math.max(8, y), Math.max(8, geo.h - BOX_H - 8)),
        });

        const applyHang = (x, y) => {
          geo.rimX1 = x;
          geo.rimX2 = x + RIM_LEN;
          geo.rimY = y;
          geo.boardLeft = geo.rimX2;
          geo.boardTop = y - 104;
          geo.boardBottom = y + 14;
          hoop.style.left = x - 14 + 'px';
          hoop.style.top = y - 112 + 'px';
          plate.style.left = Math.min(Math.max(8, x + RIM_LEN - 56), Math.max(8, geo.w - 74)) + 'px';
          plate.style.top = Math.max(6, y - 152) + 'px';
        };

        const applyBox = (x, y) => {
          boxPos.x = x;
          boxPos.y = y;
          geo.box.x = x;
          geo.box.y = y;
          box.style.left = x + 'px';
          box.style.top = y + 'px';
          if (state.mode === 'stored') {
            state.x = x + BOX_W / 2;
            state.y = y + 18;
          }
        };

        const measureBase = () => {
          const rect = layer.getBoundingClientRect();
          geo.left = rect.left;
          geo.top = rect.top;
          geo.w = Math.max(320, rect.width || window.innerWidth);
          geo.h = Math.max(320, rect.height || window.innerHeight);
          geo.floorY = geo.h - R - 6;
        };

        const initialLayout = () => {
          const savedHoop = layout.hoop;
          const savedBox = layout.box;
          const defaultHoop = clampHoop(
            geo.w - 60 - RIM_LEN,
            Math.min(Math.max(geo.h * 0.26, 150), Math.max(160, geo.h - 320)),
          );
          const hx = savedHoop && Number.isFinite(savedHoop.x) ? savedHoop.x : defaultHoop.x;
          const hy = savedHoop && Number.isFinite(savedHoop.y) ? savedHoop.y : defaultHoop.y;
          const p = clampHoop(hx, hy);
          applyHang(p.x, p.y);

          const bx = savedBox && Number.isFinite(savedBox.x) ? savedBox.x : 26;
          const by = savedBox && Number.isFinite(savedBox.y) ? savedBox.y : geo.h - 82;
          const b = clampBoxPos(bx, by);
          applyBox(b.x, b.y);
        };

        const draw = () => {
          const stretch = Math.min(0.11, Math.abs(state.vy) / 5200);
          const wide = 1 + state.squash * 0.42 - stretch * 0.7;
          const tall = 1 - state.squash * 0.42 + stretch;
          ball.style.transform =
            'translate3d(' +
            (state.x - R).toFixed(2) +
            'px,' +
            (state.y - R).toFixed(2) +
            'px,0) scale(' +
            wide.toFixed(3) +
            ',' +
            tall.toFixed(3) +
            ')';
          const spin = ball.firstElementChild;
          if (spin) spin.style.transform = 'rotate(' + state.angle.toFixed(1) + 'deg)';

          const groundY = geo.floorY + R;
          const air = Math.max(0, groundY - (state.y + R));
          const near = Math.max(0, Math.min(1, 1 - air / 380));
          shadow.style.transform =
            'translate3d(' +
            (state.x - 23).toFixed(2) +
            'px,' +
            (groundY - 6).toFixed(2) +
            'px,0) scale(' +
            (1 + air / 800).toFixed(3) +
            ',1)';
          shadow.style.opacity = state.mode === 'stored' ? '0' : (0.06 + 0.34 * near).toFixed(3);
        };

        const placeInBox = () => {
          state.mode = 'stored';
          state.dragging = false;
          state.vx = 0;
          state.vy = 0;
          state.spin = 0;
          state.x = boxPos.x + BOX_W / 2;
          state.y = boxPos.y + 18;
          ball.classList.add('is-stored');
          ball.classList.remove('is-drag');
          box.classList.add('is-full');
          box.classList.remove('is-target');
        };

        const takeOut = () => {
          if (state.mode !== 'stored') return;
          state.mode = 'free';
          ball.classList.remove('is-stored');
          box.classList.remove('is-full');
          state.x = boxPos.x + BOX_W / 2;
          state.y = boxPos.y + BOX_H - R - 6;
          state.vx = (Math.random() * 2 - 1) * 170;
          state.vy = -(880 + Math.random() * 220);
          state.spin = 380;
          state.squash = 0.5;
        };

        const insideBox = (cx, cy) =>
          cx > geo.box.x - 6 &&
          cx < geo.box.x + BOX_W + 6 &&
          cy > geo.box.y - 10 &&
          cy < geo.box.y + BOX_H + 8;

        const centerOfNet = () => (geo.rimX1 + geo.rimX2) / 2;

        const flashNet = () => {
          hoop.classList.add('is-swish');
          if (netTimer) window.clearTimeout(netTimer);
          netTimer = window.setTimeout(() => hoop.classList.remove('is-swish'), 470);
        };

        const showPlus = () => {
          plusEl.style.left = centerOfNet() - 14 + 'px';
          plusEl.style.top = geo.rimY - 4 + 'px';
          plusEl.classList.remove('is-on');
          void plusEl.offsetWidth;
          plusEl.classList.add('is-on');
        };

        const addPoint = () => {
          score += 1;
          writeScore(score);
          scoreEl.textContent = String(score);
          plate.classList.remove('is-bump');
          void plate.offsetWidth;
          plate.classList.add('is-bump');
          if (bumpTimer) window.clearTimeout(bumpTimer);
          bumpTimer = window.setTimeout(() => plate.classList.remove('is-bump'), 400);
          flashNet();
          showPlus();
        };

        const hitRim = (cx, cy) => {
          const dx = state.x - cx;
          const dy = state.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const min = R + RIM_TIP_R;
          if (dist >= min || dist < 0.001) return;
          const nx = dx / dist;
          const ny = dy / dist;
          state.x = cx + nx * min;
          state.y = cy + ny * min;
          const vn = state.vx * nx + state.vy * ny;
          if (vn < 0) {
            state.vx -= 1.72 * vn * nx;
            state.vy -= 1.72 * vn * ny;
            state.spin = (state.vx / R) * 57.3 * 0.4;
            state.squash = Math.max(state.squash, 0.3);
          }
        };

        const step = (dt) => {
          const prevX = state.x;
          const prevY = state.y;

          state.vy += GRAVITY * dt;
          state.vx *= 1 - 0.1 * dt;
          state.x += state.vx * dt;
          state.y += state.vy * dt;
          state.angle += state.spin * dt;
          state.spin *= 1 - 0.35 * dt;

          if (state.x < R + 2) {
            state.x = R + 2;
            state.vx = Math.abs(state.vx) * WALL_REST + 16;
            state.spin = (state.vx / R) * 57.3 * 0.55;
            state.squash = Math.max(state.squash, Math.min(0.5, Math.abs(state.vx) / 2600));
          } else if (state.x > geo.w - R - 2) {
            state.x = geo.w - R - 2;
            state.vx = -Math.abs(state.vx) * WALL_REST - 16;
            state.spin = (state.vx / R) * 57.3 * 0.55;
            state.squash = Math.max(state.squash, Math.min(0.5, Math.abs(state.vx) / 2600));
          }

          if (state.y < R + 2) {
            state.y = R + 2;
            state.vy = Math.abs(state.vy) * 0.72;
          }

          if (state.y > geo.floorY) {
            state.y = geo.floorY;
            if (state.vy > 92) {
              const impact = Math.min(1, state.vy / 1400);
              state.squash = Math.min(0.88, state.squash + 0.24 + impact * 0.5);
              state.vy = -state.vy * FLOOR_REST;
              const roll = (state.spin / 57.3) * R;
              state.vx += (roll - state.vx) * 0.12;
              state.spin = (state.vx / R) * 57.3 * 0.6;
            } else {
              state.vy = 0;
              state.vx *= Math.max(0, 1 - 2.4 * dt);
              if (Math.abs(state.vx) < 5) state.vx = 0;
            }
          }

          hitRim(geo.rimX1, geo.rimY);
          hitRim(geo.rimX2, geo.rimY);

          if (
            state.x + R > geo.boardLeft &&
            prevX + R <= geo.boardLeft &&
            state.y > geo.boardTop &&
            state.y < geo.boardBottom
          ) {
            state.x = geo.boardLeft - R;
            state.vx = -Math.abs(state.vx) * 0.62;
            state.spin = (state.vx / R) * 57.3 * 0.4;
            state.squash = Math.max(state.squash, 0.2);
          }

          if (
            prevY <= geo.rimY &&
            state.y > geo.rimY &&
            state.vy > 0 &&
            state.x > geo.rimX1 + R + RIM_TIP_R + 1 &&
            state.x < geo.rimX2 - R - RIM_TIP_R - 1
          ) {
            addPoint();
          }

          state.squash *= Math.exp(-12 * dt);
        };

        const pushSample = (x, y) => {
          samples.push({ t: performance.now(), x: x, y: y });
          if (samples.length > 24) samples.shift();
        };

        const releaseVelocity = () => {
          const now = performance.now();
          while (samples.length > 2 && now - samples[0].t > 110) samples.shift();
          if (samples.length < 2) return { vx: 0, vy: 0 };
          const first = samples[0];
          const last = samples[samples.length - 1];
          const dt = (last.t - first.t) / 1000;
          if (dt <= 0.004) return { vx: 0, vy: 0 };
          let vx = (last.x - first.x) / dt;
          let vy = (last.y - first.y) / dt;
          const mag = Math.sqrt(vx * vx + vy * vy);
          if (mag > MAX_THROW) {
            vx = (vx / mag) * MAX_THROW;
            vy = (vy / mag) * MAX_THROW;
          }
          return { vx: vx, vy: vy };
        };

        const grabLayerOffset = () => {
          const rect = layer.getBoundingClientRect();
          geo.left = rect.left;
          geo.top = rect.top;
        };

        const onBallDown = (event) => {
          if (state.mode !== 'free') return;
          if (typeof event.button === 'number' && event.button !== 0) return;
          event.preventDefault();
          event.stopPropagation();
          grabLayerOffset();
          state.dragging = true;
          state.vx = 0;
          state.vy = 0;
          grabDx = state.x - (event.clientX - geo.left);
          grabDy = state.y - (event.clientY - geo.top);
          samples.length = 0;
          pushSample(state.x, state.y);
          ball.classList.add('is-drag');
          if (typeof ball.setPointerCapture === 'function') {
            try {
              ball.setPointerCapture(event.pointerId);
            } catch (error) {
              /* capture is best effort */
            }
          }
        };

        const onBallMove = (event) => {
          if (!state.dragging) return;
          event.preventDefault();
          const nextX = clampX(event.clientX - geo.left + grabDx);
          const nextY = clampY(event.clientY - geo.top + grabDy);
          state.angle += (nextX - state.x) * 0.9;
          state.x = nextX;
          state.y = nextY;
          pushSample(state.x, state.y);
          box.classList.toggle('is-target', insideBox(state.x, state.y));
        };

        const endDrag = () => {
          if (!state.dragging) return;
          state.dragging = false;
          ball.classList.remove('is-drag');
          box.classList.remove('is-target');
          if (insideBox(state.x, state.y)) {
            placeInBox();
            return;
          }
          const v = releaseVelocity();
          state.vx = v.vx;
          state.vy = v.vy;
          state.spin = (state.vx / R) * 57.3 * 0.45;
        };

        const onBallUp = (event) => {
          if (!state.dragging) return;
          if (event && typeof event.preventDefault === 'function') event.preventDefault();
          endDrag();
        };

        const onHoopDown = (event) => {
          if (typeof event.button === 'number' && event.button !== 0) return;
          event.preventDefault();
          event.stopPropagation();
          grabLayerOffset();
          hoopDrag = {
            dx: geo.rimX1 - (event.clientX - geo.left),
            dy: geo.rimY - (event.clientY - geo.top),
          };
          hoop.classList.add('is-dragging');
          if (typeof hoop.setPointerCapture === 'function') {
            try {
              hoop.setPointerCapture(event.pointerId);
            } catch (error) {
              /* capture is best effort */
            }
          }
        };

        const onHoopMove = (event) => {
          if (!hoopDrag) return;
          event.preventDefault();
          const next = clampHoop(event.clientX - geo.left + hoopDrag.dx, event.clientY - geo.top + hoopDrag.dy);
          applyHang(next.x, next.y);
        };

        const onHoopUp = () => {
          if (!hoopDrag) return;
          hoopDrag = null;
          hoop.classList.remove('is-dragging');
          layout.hoop = { x: Math.round(geo.rimX1), y: Math.round(geo.rimY) };
          writeLayout(layout);
        };

        const onBoxDown = (event) => {
          if (typeof event.button === 'number' && event.button !== 0) return;
          event.preventDefault();
          event.stopPropagation();
          grabLayerOffset();
          boxDrag = {
            sx: event.clientX,
            sy: event.clientY,
            ox: boxPos.x,
            oy: boxPos.y,
            moved: false,
          };
          if (typeof box.setPointerCapture === 'function') {
            try {
              box.setPointerCapture(event.pointerId);
            } catch (error) {
              /* capture is best effort */
            }
          }
        };

        const onBoxMove = (event) => {
          if (!boxDrag) return;
          const dx = event.clientX - boxDrag.sx;
          const dy = event.clientY - boxDrag.sy;
          if (!boxDrag.moved) {
            if (Math.abs(dx) + Math.abs(dy) < 6) return;
            boxDrag.moved = true;
            box.classList.add('is-dragging');
          }
          event.preventDefault();
          const next = clampBoxPos(boxDrag.ox + dx, boxDrag.oy + dy);
          applyBox(next.x, next.y);
        };

        const onBoxUp = () => {
          if (!boxDrag) return;
          const moved = boxDrag.moved;
          boxDrag = null;
          box.classList.remove('is-dragging');
          if (moved) {
            layout.box = { x: Math.round(boxPos.x), y: Math.round(boxPos.y) };
            writeLayout(layout);
            return;
          }
          if (state.mode === 'stored') takeOut();
        };

        const onResize = () => {
          measureBase();
          const hang = clampHoop(geo.rimX1, geo.rimY);
          applyHang(hang.x, hang.y);
          const position = clampBoxPos(boxPos.x, boxPos.y);
          applyBox(position.x, position.y);
          if (state.mode === 'free') {
            state.x = clampX(state.x);
            state.y = clampY(state.y);
          }
        };

        const loop = (now) => {
          raf = window.requestAnimationFrame(loop);
          if (!lastFrame) {
            lastFrame = now;
            draw();
            return;
          }
          let dt = (now - lastFrame) / 1000;
          lastFrame = now;
          if (!(dt > 0)) return;
          if (dt > 0.032) dt = 0.032;

          if (now - lastDayCheck > 15000) {
            lastDayCheck = now;
            const key = dayKey();
            if (key !== scoreDay) {
              scoreDay = key;
              score = 0;
              writeScore(0);
              scoreEl.textContent = '0';
            }
          }

          if (state.mode === 'free' && !state.dragging) step(dt);
          draw();
        };

        measureBase();
        initialLayout();
        placeInBox();
        if (layout.hoop) layout.hoop = { x: Math.round(geo.rimX1), y: Math.round(geo.rimY) };
        if (layout.box) layout.box = { x: Math.round(boxPos.x), y: Math.round(boxPos.y) };
        draw();

        ball.addEventListener('pointerdown', onBallDown);
        ball.addEventListener('pointermove', onBallMove);
        ball.addEventListener('pointerup', onBallUp);
        ball.addEventListener('pointercancel', onBallUp);
        hoop.addEventListener('pointerdown', onHoopDown);
        hoop.addEventListener('pointermove', onHoopMove);
        hoop.addEventListener('pointerup', onHoopUp);
        hoop.addEventListener('pointercancel', onHoopUp);
        box.addEventListener('pointerdown', onBoxDown);
        box.addEventListener('pointermove', onBoxMove);
        box.addEventListener('pointerup', onBoxUp);
        box.addEventListener('pointercancel', onBoxUp);
        window.addEventListener('resize', onResize);
        raf = window.requestAnimationFrame(loop);

        return () => {
          if (raf) window.cancelAnimationFrame(raf);
          if (netTimer) window.clearTimeout(netTimer);
          if (bumpTimer) window.clearTimeout(bumpTimer);
          ball.removeEventListener('pointerdown', onBallDown);
          ball.removeEventListener('pointermove', onBallMove);
          ball.removeEventListener('pointerup', onBallUp);
          ball.removeEventListener('pointercancel', onBallUp);
          hoop.removeEventListener('pointerdown', onHoopDown);
          hoop.removeEventListener('pointermove', onHoopMove);
          hoop.removeEventListener('pointerup', onHoopUp);
          hoop.removeEventListener('pointercancel', onHoopUp);
          box.removeEventListener('pointerdown', onBoxDown);
          box.removeEventListener('pointermove', onBoxMove);
          box.removeEventListener('pointerup', onBoxUp);
          box.removeEventListener('pointercancel', onBoxUp);
          window.removeEventListener('resize', onResize);
        };
      }, []);

      return h(
        'div',
        { ref: layerRef, className: 'dsh-bball-layer', 'aria-hidden': 'true' },
        h('style', null, CSS),
        h('div', { ref: hoopRef, className: 'dsh-bball-hoop' }, h(Hoop)),
        h('div', { ref: boxRef, className: 'dsh-bball-box' }, h('i', { className: 'dsh-bball-box-mouth' })),
        h('div', { ref: shadowRef, className: 'dsh-bball-shadow' }),
        h(
          'div',
          { ref: ballRef, className: 'dsh-bball is-stored' },
          h('div', { className: 'dsh-bball-spin' }, h(BallArt)),
        ),
        h(
          'div',
          { className: 'dsh-bball-score' },
          h('i', { className: 'dsh-bball-score-ico' }),
          h('span', { ref: scoreRef }),
        ),
        h('div', { ref: plusRef, className: 'dsh-bball-plus' }, '+1'),
      );
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject('shell.overlay', () =>
          ctx.slots.register(
            {
              name: 'shell.overlay',
              id: 'basketball-pet',
              order: 40,
            },
            BasketballPet,
          ),
        );
      },
    };
  },
});
