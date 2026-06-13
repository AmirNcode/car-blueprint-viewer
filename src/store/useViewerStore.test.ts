import { describe, it, expect, beforeEach } from 'vitest'
import { useViewerStore } from './useViewerStore'
import { TOUR_ORDER } from '@/data/parts'

const get = () => useViewerStore.getState()

describe('viewer store', () => {
  beforeEach(() => get().reset())

  it('selects and deselects with toggleSelect', () => {
    const id = TOUR_ORDER[0]
    get().toggleSelect(id)
    expect(get().selectedId).toBe(id)
    get().toggleSelect(id)
    expect(get().selectedId).toBe(null)
  })

  it('ignores unknown part ids', () => {
    get().select('not-a-real-part')
    expect(get().selectedId).toBe(null)
    get().toggleSelect('also-fake')
    expect(get().selectedId).toBe(null)
  })

  it('toggles exploded view', () => {
    expect(get().exploded).toBe(false)
    get().toggleExploded()
    expect(get().exploded).toBe(true)
  })

  it('toggles system isolation off when the same system is chosen twice', () => {
    get().toggleIsolatedSystem('engine')
    expect(get().isolatedSystem).toBe('engine')
    get().toggleIsolatedSystem('engine')
    expect(get().isolatedSystem).toBe(null)
  })

  it('switches isolation directly to another system', () => {
    get().toggleIsolatedSystem('engine')
    get().toggleIsolatedSystem('braking')
    expect(get().isolatedSystem).toBe('braking')
  })

  it('starts the tour at the first part', () => {
    get().startTour()
    expect(get().tourActive).toBe(true)
    expect(get().tourIndex).toBe(0)
    expect(get().selectedId).toBe(TOUR_ORDER[0])
  })

  it('walks the tour forward and wraps around', () => {
    get().startTour()
    get().tourPrev() // wrap from 0 to last
    expect(get().tourIndex).toBe(TOUR_ORDER.length - 1)
    expect(get().selectedId).toBe(TOUR_ORDER[TOUR_ORDER.length - 1])
    get().tourNext() // wrap back to first
    expect(get().tourIndex).toBe(0)
    expect(get().selectedId).toBe(TOUR_ORDER[0])
  })

  it('syncs tourIndex when a tour part is selected directly', () => {
    const target = TOUR_ORDER[3]
    get().select(target)
    expect(get().tourIndex).toBe(3)
  })

  it('reset clears all interaction state', () => {
    get().toggleSelect(TOUR_ORDER[2])
    get().toggleExploded()
    get().toggleIsolatedSystem('engine')
    get().setSearchQuery('engine')
    get().reset()
    expect(get().selectedId).toBe(null)
    expect(get().exploded).toBe(false)
    expect(get().isolatedSystem).toBe(null)
    expect(get().searchQuery).toBe('')
    expect(get().tourActive).toBe(false)
  })
})
