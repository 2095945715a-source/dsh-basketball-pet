# Hoops Pet · 篮球桌宠

A desktop pet for the **DSH Web UI**: a real basketball that lives on top of your workspace, a hoop and a ball crate you can drag anywhere, and a score that resets every day.

![Hoops Pet](preview.svg)

> 中文说明见 [README.zh.md](README.zh.md)

---

## Why you'll like it

- **It feels physical.** Gravity, air drag, spin, rolling friction, wall bounce and a squash-and-stretch on every impact — not a CSS animation loop.
- **It never gets in your way.** The pet lives in a click-through overlay: the ball, the hoop and the crate accept pointer events, everything else you click goes straight through to the app.
- **It's a tiny game.** Drag the hoop where you want it, flick the ball in, and watch the net drop when it swishes. The score is kept per day.

## Features

| | |
|---|---|
| 🏀 **Bouncy ball** | Gravity `2400 px/s²`, floor restitution `0.78`, air drag, spin. Hits compress it, fast falls stretch it. |
| 🥅 **Draggable hoop** | Glass backboard, steel bracket, gradient rim and a diamond net that swings on a swish. Drag it by the rim, the board or the bracket. |
| 📦 **Draggable crate** | Ball rests inside until you take it out. Drag the crate with the ball in it — the ball comes along. |
| 🖱️ **Flick to throw** | 110 ms of pointer samples become the release velocity (capped at 2600 px/s). Throw flat, lob it, or bank it off the board. |
| 🎯 **Scoring** | Dropping through the rim gives +1, a net swish, a `+1` pop and a bump on the score plate. Rim and board give real bounces. |
| 📅 **Daily score** | The count is stored per calendar day and flips back to 0 after midnight, even while the page stays open. |
| 💾 **Stays where you put it** | Hoop and crate positions are remembered across reloads. |
| ♿ **Reduced motion** | With `prefers-reduced-motion` the pet stops nudging itself but still reacts to your input. |
| 🔒 **No network, no storage of anything else** | Pure rendering. The only persisted data is your score and the two positions. |

## Install

From the plugin market, or from a shell:

```bash
dsh plugin add dsh-basketball-pet
# if your dsh asks for a target profile explicitly:
dsh plugin --profile desktop add dsh-basketball-pet
```

From a local checkout / release tarball:

```bash
dsh plugin add ./dsh-basketball-pet-1.3.0.tgz
```

Or from source in this repo:

```bash
dsh plugin add github:<owner>/dsh-basketball-pet
```

Then reload the page (`Ctrl+R`). The pet mounts into the `shell.overlay` slot of the Web UI.

## How to play

| Action | Result |
|---|---|
| Click the crate | The ball pops out |
| Drag the ball and release | It flies off with your throw |
| Click the ball (no drag) | It hops in place |
| Drag the hoop's rim / board / bracket | The hoop moves, the score plate follows |
| Drag the crate | The crate moves; a ball inside comes with it |
| Drop the ball onto the crate | The ball is put away |
| Throw the ball through the rim | **+1** |

## How it works

Single-file client plugin (`client.js`), no build step, no runtime dependencies. It registers one component on the `shell.overlay` slot and runs its own `requestAnimationFrame` loop that writes `transform` directly — React never re-renders per frame.

- Physics constants: `GRAVITY 2400`, `FLOOR_REST 0.78`, `WALL_REST 0.84`, rim `1.72`, board `0.62`, air drag `0.1`
- Collisions: floor, both walls, ceiling, both rim tips (as small circles) and the backboard edge
- Scoring: the ball must cross the rim plane downward, moving down, inside the inner gap
- Storage: `dsh-basketball-pet:score:v1`, `dsh-basketball-pet:layout:v1` (localStorage)

## Compatibility

- DSH Web UI with the `shell.overlay` slot and the `@deepseek-ai/dsh-client-ui-slots` service
- Any Chromium/Electron/WebKit-based DSH desktop build; no Node, no native code

## License

MIT
