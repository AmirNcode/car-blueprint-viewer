# Project Memory — Car Blueprint Viewer

Durable context for anyone (human or AI) picking this project up later.

## What this is
An educational 3D web app: a see-through wireframe car you orbit/zoom, click
parts to highlight them (light blue → amber), and read what each part does and
**what it connects to and why**. First car: inline-6, RWD, manual, ICE.

## Conventions
- **Coordinate system:** car centered near origin. +Z = front of car, -Z = rear.
  +X = passenger side, -X = driver side. +Y = up. 1 unit ≈ 1 meter. Wheels at
  the corners; engine forward (+Z), differential at the rear (-Z).
- **Part identity:** `src/data/parts.ts` is the single source of truth for ids,
  names, systems, and educational copy. 3D components reference parts by `id`.
- **A catalog part can map to many meshes** (6 pistons, 4 wheels). They share an
  id and highlight together. Wrap them in one `<Part id="...">`.
- **Selection highlight color is always amber/orange** regardless of system.
  System accent colors are only used for legend dots / system chips.
- **Education copy rule:** every part's `connections[]` must say what it links to
  and the functional *why*. When `to` is a real part id, the info panel makes it
  a clickable chip.

## How to add a new part
1. Add an entry to `PARTS` in `src/data/parts.ts` (id, name, system, summary,
   function, connections).
2. Add its geometry in the relevant `src/three/parts/*.tsx`, wrapped in
   `<Part id="your-id">`. Tests assert every connection target resolves.

## How to add a new car type (future)
The geometry is parametric. A second car (e.g. V8/FWD) should be a new set of
parts data + geometry modules selected by a "car model" switch, not a rewrite.
Keep the `<Part>` / `PartSurface` / store contracts unchanged.

## Build & run
- Dev: `npm run dev`
- Test: `npm test` (Vitest — catalog + store logic)
- Build: `npm run build` → `dist/`

## Deployment
- **Live:** https://amirncode.github.io/car-blueprint-viewer/
- Deployed via GitHub Actions (`.github/workflows/deploy.yml`) to GitHub Pages on
  every push to `main`. Pages was enabled with `build_type=workflow`.
- Vite `base` = `/car-blueprint-viewer/` only when `GITHUB_PAGES` env is set;
  otherwise `/`. So Vercel/Netlify builds (served from root) work unchanged —
  Vercel was the user's preferred host but needs a one-time interactive login the
  build agent couldn't do; import at vercel.com/new to switch.

## Owner
GitHub: AmirNcode (push as amir-nrfkn). Repo: car-blueprint-viewer.
