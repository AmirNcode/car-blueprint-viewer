# Car Blueprint Viewer

**▶ Live demo: https://amirncode.github.io/car-blueprint-viewer/**

An interactive 3D **wireframe car** you explore part by part. Orbit and zoom around a
see-through "blueprint" car, click any component to highlight it, and read what it
does — and crucially **what it connects to and why** — so you build a mental model of
how the whole machine fits together.

The first model is a **inline-6, rear-wheel-drive, manual, internal-combustion** car
(~35 parts across 7 systems). The geometry is built procedurally, so future variants
(automatic, FWD/AWD, V8, turbo, EV) can be added parametrically.

## Features

- 🔵 **See-through wireframe** car with every internal part modeled (engine internals,
  gearbox, driveshaft, differential, suspension, brakes, exhaust…)
- 🟠 **Click to highlight** — parts glow amber with a bloom effect when selected
- 📖 **Info panel** — each part's function plus clickable "connects to" links explaining
  every physical connection and the reason for it
- 📦 **Exploded view** — parts drift apart to reveal how they nest together
- 🎯 **System isolation** — focus on a single system (drivetrain, braking…)
- 🧭 **Guided tour** — step through the whole machine with auto-focus
- 🔎 **Part search**
- 📱 Works on **desktop and mobile** (touch orbit + pinch-zoom)

## Tech stack

Vite · React · TypeScript · [react-three-fiber](https://r3f.docs.pmnd.rs/) +
[drei](https://github.com/pmndrs/drei) + postprocessing (Three.js) · Zustand ·
Tailwind CSS v4 · Vitest.

## Develop

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
npm test           # run the catalog + store logic tests
npm run build      # type-check and build to dist/
```

## Project layout

```
src/
  data/        part catalog (single source of truth) + systems
  store/       Zustand viewer state (selection, explode, isolation, tour, search)
  three/       the 3D scene: procedural car geometry, materials, camera
  components/  the HUD overlay (top bar, legend, info panel, tour bar)
docs/          design spec, full part catalog, decisions log, project memory
```

See [`docs/`](docs/README.md) for the design spec, the full annotated part catalog,
and notes on how to extend the app.

## Deployment

**Currently live on GitHub Pages** via the workflow in `.github/workflows/deploy.yml`
— every push to `main` builds, tests, and publishes automatically (no extra setup).

To host on **Vercel** instead (the originally preferred target): import the repo at
[vercel.com/new](https://vercel.com/new). Vercel auto-detects Vite — build `npm run build`,
output `dist/`, no config needed — and redeploys on every push, with preview URLs on PRs.
The Vite `base` only switches to a subpath under the `GITHUB_PAGES` env var, so the
Vercel build is served correctly from the root automatically.
