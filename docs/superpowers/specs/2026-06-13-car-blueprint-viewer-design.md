# Car Blueprint Viewer — Design Spec

**Date:** 2026-06-13
**Status:** Approved (requirements confirmed by owner; building autonomously)
**Repo:** https://github.com/AmirNcode/car-blueprint-viewer

## 1. Purpose

An interactive, educational web app for people learning about cars and their
parts. The centerpiece is a **see-through 3D wireframe car** ("blueprint" look).
Users orbit and zoom around the car, click any part to highlight it, and read a
plain-language explanation of **what the part does and what it connects to and
why** — so learners build a mental model of how the whole machine fits together.

The first car modeled is a **RWD, manual, internal-combustion, inline-6** —
the classic longitudinal layout that is the clearest to learn from. The system
is built parametrically so future variants (automatic, FWD/AWD, V8, turbo/super-
charged, EV) can be added later.

## 2. Confirmed requirements

- **3D model:** Procedurally generated from Three.js geometry. Every part is a
  named, individually clickable mesh. No external/licensed model. Stylized
  blueprint-wireframe aesthetic (not photoreal — intentional tradeoff that
  guarantees every internal part is selectable and labeled).
- **Engine:** Inline-6 (straight-6), longitudinal, front-mounted.
- **Part depth:** Major assemblies **plus** key engine internals (~35 parts).
- **Features (all selected):** core viewer + **exploded view**, **system
  isolation**, **guided tour**, **part search**.
- **Theme:** Midnight palette. Background deep navy/near-black. Parts render as
  translucent light-blue wireframe. Hover = brighter blue. Selected = warm
  amber→orange with a glow (bloom). Warm-yellow UI accents.
- **Platforms:** Must work well on desktop and mobile (touch orbit/pinch-zoom,
  responsive panels).
- **Hosting:** Vercel (auto-deploy from `main`).

## 3. Part-description rule (owner request)

Every part's description must explain **what it is connected to and why** — the
functional reason for each physical connection, not just an isolated definition.
This pairs with the exploded view to teach spatial relationships. In data, each
part has a `connections[]` list of `{ to, label, why }`. When `to` is another
catalog part, the info panel renders it as a clickable chip so learners can
"walk the drivetrain" from part to part.

## 4. Tech stack

| Concern | Choice |
|---|---|
| Build/dev | Vite + React 19 + TypeScript |
| 3D | three, @react-three/fiber (v9), @react-three/drei, @react-three/postprocessing (Bloom) |
| State | Zustand |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Tests | Vitest (pure logic: catalog integrity + store) |
| Hosting | Vercel (SPA, `dist/` output) |

Rationale recorded in [decisions.md](../../decisions.md).

## 5. Architecture

```
src/
  main.tsx, App.tsx, index.css
  lib/theme.ts            shared color tokens (CSS + three)
  data/
    systems.ts            SystemId + SYSTEMS (name, accent color, order)
    parts.ts              Part type + PARTS catalog (~35) + PART_MAP
    parts.test.ts         catalog integrity tests
  store/
    useViewerStore.ts     zustand: selected/hovered/exploded/isolatedSystem/tour/search
    useViewerStore.test.ts
  three/
    Scene.tsx             Canvas, lights, OrbitControls, Bloom, camera rig
    CameraController.tsx  focus camera on selected part / during tour
    Car.tsx               assembles all part groups
    Part.tsx              generic wrapper: pointer events, explode animation, registry
    PartSurface.tsx       mesh + wireframe material driven by selection state
    partFocusRegistry.ts  module map of part id -> world position (camera focus)
    parts/                Engine, Drivetrain, SuspensionSteering, Braking,
                          Exhaust, FuelElectricalCooling, BodyChassis
  components/
    InfoPanel, Legend, Toolbar, SearchBox, TourControls, SystemFilter, icons
```

### Data flow

- `PARTS` (static) defines identity + education content + system grouping.
- 3D part components define geometry/placement and wrap meshes in `<Part id>`.
- `<Part>` handles click→select, hover, and exploded-view position lerp, and
  writes its world position to `partFocusRegistry` for the camera.
- `PartSurface` subscribes to the store and computes material color/opacity/
  emissive from whether the part is selected / hovered / dimmed by isolation.
- UI panels read/write the same store. Selection drives both the 3D highlight
  and the InfoPanel; the InfoPanel's connection chips select other parts.

### Visual states (per part)

| State | Color | Opacity | Emissive | Notes |
|---|---|---|---|---|
| Inactive | light blue | ~0.45 | low | wireframe, depthWrite off so internals show |
| Hovered | brighter blue | ~0.7 | low | cursor pointer |
| Selected | amber/orange | 1.0 | high | bloom glow |
| Dimmed (isolation) | light blue | ~0.05 | none | pointer events off |
| Body shell | faint blue | ~0.12 | none | always see-through |

## 6. Features

- **Core:** orbit-drag, scroll/pinch zoom, click/tap to select, click empty to
  deselect, reset-view, grouped legend, info panel. Full touch support.
- **Exploded view:** toggle; each part lerps outward along its radial direction
  from car center (with vertical stagger) to reveal how parts nest.
- **System isolation:** pick a system → only its parts stay vivid; others ghost
  out and become non-interactive.
- **Guided tour:** steps `selectedId` through an ordered list; camera auto-
  focuses each part; prev/next + play/pause autoplay.
- **Search:** filter parts by name; selecting a result highlights + focuses it.

## 7. Responsive layout

- **Desktop:** canvas full-bleed; top bar (title + toolbar + search); Legend as
  left panel; InfoPanel as right panel.
- **Mobile:** canvas full-screen; compact top bar with icon buttons; Legend
  opens as a slide-in drawer; InfoPanel is a bottom sheet; search expands inline.

## 8. Testing & verification

- **Vitest (automated):** catalog integrity (unique ids, valid systems, every
  `connection.to` resolves, no orphan systems) and store transitions (select/
  deselect, explode toggle, isolation, tour clamp/wrap, search filter).
- **Visual (manual via preview):** verify wireframe render, highlight color
  change, zoom, and responsive layout at desktop + mobile viewports.
- 3D visuals are not unit-tested; logic is. This is the TDD boundary.

## 9. Out of scope (future)

Other drivetrains (FWD/AWD/automatic), other engines (V8, turbo/SC, EV),
quiz/assessment mode, accounts, persistence, i18n. The catalog + parametric
geometry are structured to make adding a second car a data/geometry addition,
not a rewrite.
