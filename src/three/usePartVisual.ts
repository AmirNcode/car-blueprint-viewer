import * as THREE from 'three'
import { useViewerStore } from '@/store/useViewerStore'
import { PART_MAP } from '@/data/parts'
import { COLORS } from '@/lib/theme'

// Pre-built colors. Selected colors are pushed past the [0,1] range with
// toneMapped=false so the Bloom post-process makes them glow (and nothing else).
const C = {
  inactive: new THREE.Color(COLORS.partInactive),
  hover: new THREE.Color(COLORS.partHover),
  selectedFill: new THREE.Color(COLORS.partSelected).multiplyScalar(1.9),
  selectedEdge: new THREE.Color(COLORS.partSelected).multiplyScalar(2.4),
  body: new THREE.Color(COLORS.bodyShell),
}

export interface PartVisual {
  visible: boolean
  interactive: boolean
  fillColor: THREE.Color
  fillOpacity: number
  edgeColor: THREE.Color
  edgeOpacity: number
  toneMapped: boolean
}

/** Derives a part's render appearance from the current selection/hover/isolation state. */
export function usePartVisual(partId: string): PartVisual {
  const selected = useViewerStore((s) => s.selectedId === partId)
  const hovered = useViewerStore((s) => s.hoveredId === partId)
  const isolatedSystem = useViewerStore((s) => s.isolatedSystem)

  const system = PART_MAP[partId]?.system
  const dimmed = isolatedSystem !== null && system !== isolatedSystem
  const isBody = partId === 'body-shell'

  if (selected) {
    return {
      visible: true,
      interactive: true,
      fillColor: C.selectedFill,
      fillOpacity: 0.32,
      edgeColor: C.selectedEdge,
      edgeOpacity: 1,
      toneMapped: false,
    }
  }
  if (dimmed) {
    return {
      visible: true,
      interactive: false,
      fillColor: C.inactive,
      fillOpacity: 0,
      edgeColor: C.inactive,
      edgeOpacity: 0.05,
      toneMapped: true,
    }
  }
  if (isBody) {
    return {
      visible: true,
      interactive: true,
      fillColor: C.body,
      fillOpacity: 0.02,
      edgeColor: C.body,
      edgeOpacity: hovered ? 0.45 : 0.22,
      toneMapped: true,
    }
  }
  if (hovered) {
    return {
      visible: true,
      interactive: true,
      fillColor: C.hover,
      fillOpacity: 0.16,
      edgeColor: C.hover,
      edgeOpacity: 0.95,
      toneMapped: true,
    }
  }
  return {
    visible: true,
    interactive: true,
    fillColor: C.inactive,
    fillOpacity: 0.06,
    edgeColor: C.inactive,
    edgeOpacity: 0.5,
    toneMapped: true,
  }
}
