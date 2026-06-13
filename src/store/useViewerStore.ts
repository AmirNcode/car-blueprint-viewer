import { create } from 'zustand'
import type { SystemId } from '@/data/systems'
import { PART_MAP, TOUR_ORDER } from '@/data/parts'

export interface ViewerState {
  selectedId: string | null
  hoveredId: string | null
  exploded: boolean
  isolatedSystem: SystemId | null
  tourActive: boolean
  tourIndex: number
  searchQuery: string
  /** Bumped to ask the camera to return to its default framing. */
  cameraResetNonce: number

  /** Select a part by id (null deselects). Unknown ids are ignored. */
  select: (id: string | null) => void
  /** Click behavior: select, or deselect if already selected. */
  toggleSelect: (id: string) => void
  setHovered: (id: string | null) => void
  toggleExploded: () => void
  setExploded: (v: boolean) => void
  setIsolatedSystem: (s: SystemId | null) => void
  toggleIsolatedSystem: (s: SystemId) => void
  startTour: () => void
  stopTour: () => void
  tourNext: () => void
  tourPrev: () => void
  setSearchQuery: (q: string) => void
  reset: () => void
}

const indexOf = (id: string, fallback: number) => {
  const i = TOUR_ORDER.indexOf(id)
  return i >= 0 ? i : fallback
}

export const useViewerStore = create<ViewerState>((set) => ({
  selectedId: null,
  hoveredId: null,
  exploded: false,
  isolatedSystem: null,
  tourActive: false,
  tourIndex: 0,
  searchQuery: '',
  cameraResetNonce: 0,

  select: (id) =>
    set((s) => {
      if (id !== null && !PART_MAP[id]) return {}
      return {
        selectedId: id,
        tourIndex: id ? indexOf(id, s.tourIndex) : s.tourIndex,
      }
    }),

  toggleSelect: (id) =>
    set((s) => {
      if (!PART_MAP[id]) return {}
      if (s.selectedId === id) return { selectedId: null }
      return { selectedId: id, tourIndex: indexOf(id, s.tourIndex) }
    }),

  setHovered: (id) => set({ hoveredId: id }),
  toggleExploded: () => set((s) => ({ exploded: !s.exploded })),
  setExploded: (v) => set({ exploded: v }),
  setIsolatedSystem: (sys) => set({ isolatedSystem: sys }),
  toggleIsolatedSystem: (sys) =>
    set((s) => ({ isolatedSystem: s.isolatedSystem === sys ? null : sys })),

  startTour: () =>
    set({
      tourActive: true,
      tourIndex: 0,
      selectedId: TOUR_ORDER[0] ?? null,
      isolatedSystem: null,
    }),
  stopTour: () => set({ tourActive: false }),
  tourNext: () =>
    set((s) => {
      const next = (s.tourIndex + 1) % TOUR_ORDER.length
      return { tourIndex: next, selectedId: TOUR_ORDER[next], tourActive: true }
    }),
  tourPrev: () =>
    set((s) => {
      const prev = (s.tourIndex - 1 + TOUR_ORDER.length) % TOUR_ORDER.length
      return { tourIndex: prev, selectedId: TOUR_ORDER[prev], tourActive: true }
    }),

  setSearchQuery: (q) => set({ searchQuery: q }),

  reset: () =>
    set((s) => ({
      selectedId: null,
      hoveredId: null,
      exploded: false,
      isolatedSystem: null,
      tourActive: false,
      tourIndex: 0,
      searchQuery: '',
      cameraResetNonce: s.cameraResetNonce + 1,
    })),
}))
