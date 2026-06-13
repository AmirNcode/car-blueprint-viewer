import { useMemo, useRef, type ReactNode } from 'react'
import * as THREE from 'three'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { useViewerStore } from '@/store/useViewerStore'
import { EXPLODE } from '@/lib/theme'
import { partFocusRegistry } from './partFocusRegistry'

const CAR_CENTER = new THREE.Vector3(0, 0.55, 0)
const LIFT = new THREE.Vector3(0, EXPLODE.lift, 0)

/**
 * A selectable part group. Owns pointer interaction for the whole part, the
 * exploded-view translation, and publishing its live position for the camera.
 * Children are PartSurfaces positioned relative to `position` (the part's anchor).
 */
export function Part({
  id,
  position,
  children,
}: {
  id: string
  position: [number, number, number]
  children: ReactNode
}) {
  const groupRef = useRef<THREE.Group>(null)
  const toggleSelect = useViewerStore((s) => s.toggleSelect)
  const setHovered = useViewerStore((s) => s.setHovered)

  const base = useMemo(
    () => new THREE.Vector3(...position),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    position,
  )
  const explodeTarget = useMemo(() => {
    const dir = base.clone().sub(CAR_CENTER)
    if (dir.lengthSq() < 1e-4) dir.set(0, 1, 0)
    dir.normalize()
    return base.clone().addScaledVector(dir, EXPLODE.factor).add(LIFT)
  }, [base])

  useFrame(() => {
    const g = groupRef.current
    if (!g) return
    const exploded = useViewerStore.getState().exploded
    g.position.lerp(exploded ? explodeTarget : base, 0.12)

    let v = partFocusRegistry.get(id)
    if (!v) {
      v = new THREE.Vector3()
      partFocusRegistry.set(id, v)
    }
    v.copy(g.position)
  })

  const onOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setHovered(id)
    document.body.style.cursor = 'pointer'
  }
  const onOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setHovered(null)
    document.body.style.cursor = 'auto'
  }
  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    toggleSelect(id)
  }

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={onClick}
      onPointerOver={onOver}
      onPointerOut={onOut}
    >
      {children}
    </group>
  )
}
