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

## Hosting: Vercel (not Netlify)
Both work for a static SPA. Vercel chosen for zero-config Vite support, fast
preview deployments per PR, and tight GitHub integration. Build: `vite build`,
output `dist/`, SPA rewrite to `index.html`.

## Testing boundary
Pure logic (catalog integrity, store transitions) is unit-tested with Vitest.
3D visuals are verified manually in the browser preview. We do not attempt to
snapshot-test WebGL output.
