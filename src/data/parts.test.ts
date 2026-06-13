import { describe, it, expect } from 'vitest'
import { PARTS, PART_MAP, PART_IDS, TOUR_ORDER } from './parts'
import { SYSTEM_IDS } from './systems'

describe('part catalog', () => {
  it('has a healthy number of parts (25-40)', () => {
    expect(PARTS.length).toBeGreaterThanOrEqual(25)
    expect(PARTS.length).toBeLessThanOrEqual(40)
  })

  it('has unique ids', () => {
    const ids = PARTS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('uses only valid systems', () => {
    for (const p of PARTS) {
      expect(SYSTEM_IDS).toContain(p.system)
    }
  })

  it('has non-empty required text fields', () => {
    for (const p of PARTS) {
      expect(p.name.trim(), p.id).not.toBe('')
      expect(p.summary.trim(), p.id).not.toBe('')
      expect(p.func.trim(), p.id).not.toBe('')
      expect(p.connections.length, p.id).toBeGreaterThan(0)
    }
  })

  it('every connection has a label and a why', () => {
    for (const p of PARTS) {
      for (const c of p.connections) {
        expect(c.label.trim(), p.id).not.toBe('')
        expect(c.why.trim(), p.id).not.toBe('')
      }
    }
  })

  it('every connection.to resolves to a real part (or is null)', () => {
    for (const p of PARTS) {
      for (const c of p.connections) {
        if (c.to !== null) {
          expect(PART_MAP[c.to], `${p.id} -> ${c.to}`).toBeDefined()
        }
      }
    }
  })

  it('no part connects to itself', () => {
    for (const p of PARTS) {
      for (const c of p.connections) {
        expect(c.to, p.id).not.toBe(p.id)
      }
    }
  })

  it('tour covers every part exactly once', () => {
    expect([...TOUR_ORDER].sort()).toEqual([...PART_IDS].sort())
    expect(new Set(TOUR_ORDER).size).toBe(TOUR_ORDER.length)
  })

  it('every system has at least one part', () => {
    for (const s of SYSTEM_IDS) {
      expect(PARTS.some((p) => p.system === s), s).toBe(true)
    }
  })
})
