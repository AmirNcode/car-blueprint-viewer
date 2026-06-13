// Color + visual tokens shared between the 3D scene (three.js) and the DOM UI.
// Keep the hex values in sync with the @theme block in src/index.css.

export const COLORS = {
  partInactive: '#4f8fd0',
  partInactiveEmissive: '#15406f',
  partHover: '#a6d4ff',
  partSelected: '#ff9e2c',
  partSelectedEmissive: '#ff7a1f',
  bodyShell: '#4072a8',
  ground: '#0a1430',
  background: '#05080f',
} as const

export const PART_OPACITY = {
  inactive: 0.5,
  hover: 0.72,
  selected: 1,
  dimmed: 0.05,
  bodyShell: 0.12,
} as const

// Exploded-view tuning: how far parts drift outward from the car center.
export const EXPLODE = {
  factor: 0.6,
  lift: 0.2,
} as const
