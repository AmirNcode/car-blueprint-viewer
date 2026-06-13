# Decisions Log

## Framework: Vite + React + TypeScript (not Next.js)
The app is a single client-side 3D canvas experience. SSR provides little value
(a WebGL canvas cannot be server-rendered and there is minimal SEO surface), and
Next.js would add `ssr:false` dynamic-import friction around Three.js. Vite is
lighter, faster to iterate on, and deploys to Vercel as a static SPA with zero
config. React chosen for the React Three Fiber ecosystem.

## 3D: React Three Fiber + drei + postprocessing
R3F is the standard declarative React renderer for Three.js. drei supplies
`OrbitControls` (with touch + zoom). `@react-three/postprocessing` provides the
`Bloom` effect used to make the selected part glow. Versions installed: R3F 9.x
(React 19 compatible), drei 10.x, three 0.184.

## Model: procedural, not sourced
Confirmed with owner. A downloaded GLTF car almost never has the internal
drivetrain modeled as separate, named meshes — which is the whole point of an
educational parts viewer. Procedural geometry gives full control of naming,
highlighting, the wireframe look, and parametric reuse for future car types,
with zero licensing risk. Tradeoff: stylized rather than photoreal.

## Engine: inline-6, RWD, manual, ICE
The clearest layout to learn from: longitudinal straight-6 → clutch →
gearbox → driveshaft → rear differential → rear wheels. Iconic RWD config.

## Styling: Tailwind CSS v4
v4 uses the `@tailwindcss/vite` plugin and `@import "tailwindcss"` in CSS, with
theme tokens declared in CSS via `@theme`. No `tailwind.config.js` needed.

## State: Zustand
Single small store for selection/hover/exploded/isolation/tour/search. Avoids
prop-drilling between the 3D scene and the DOM UI panels.

## Hosting: live on GitHub Pages now; Vercel-ready
Vercel was the preferred target (zero-config Vite, preview deploys, GitHub
integration). However, deploying to Vercel requires a one-time interactive login
that could not be performed autonomously (no token / `vercel login` is
interactive). To deliver a working live URL without blocking on that, the app is
deployed to **GitHub Pages** via `.github/workflows/deploy.yml` (build → test →
deploy on every push to `main`). Live URL:
https://amirncode.github.io/car-blueprint-viewer/

The repo stays fully Vercel-ready: the Vite `base` is only set to the repo
subpath when the `GITHUB_PAGES` env var is present, so a Vercel (or Netlify)
build is served from the root with no config. To switch hosts, import the repo at
vercel.com/new — nothing else needs to change.

## Testing boundary
Pure logic (catalog integrity, store transitions) is unit-tested with Vitest.
3D visuals are verified manually in the browser preview. We do not attempt to
snapshot-test WebGL output.
