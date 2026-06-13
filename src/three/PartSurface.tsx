import { useMemo } from 'react'
import * as THREE from 'three'
import { type ThreeElements } from '@react-three/fiber'
import { usePartVisual } from './usePartVisual'

const noRaycast = () => null

type GroupProps = Omit<ThreeElements['group'], 'children' | 'args'>

/**
 * Renders one piece of geometry in the blueprint style: a nearly invisible fill
 * (the click target + faint volume) plus crisp `EdgesGeometry` outlines whose
 * color/opacity track the part's selection state.
 */
export function PartSurface({
  partId,
  geometry,
  ...rest
}: GroupProps & { partId: string; geometry: THREE.BufferGeometry }) {
  const v = usePartVisual(partId)
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry])

  return (
    <group {...rest}>
      <mesh geometry={geometry} raycast={v.interactive ? undefined : noRaycast}>
        <meshBasicMaterial
          transparent
          opacity={v.fillOpacity}
          color={v.fillColor}
          toneMapped={v.toneMapped}
          depthWrite={false}
        />
      </mesh>
      <lineSegments geometry={edges} raycast={noRaycast}>
        <lineBasicMaterial
          transparent
          opacity={v.edgeOpacity}
          color={v.edgeColor}
          toneMapped={v.toneMapped}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}

// ---- Geometry helpers ----------------------------------------------------
// Each memoizes a geometry from its numeric args (stable across renders) and
// hands it to PartSurface. The eslint-disable is intentional: `args` holds
// primitives, so element-wise dep comparison keeps the geometry stable.

type Common = GroupProps & { partId: string }

export function BoxPart({ partId, args, ...rest }: Common & { args: [number, number, number] }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const geo = useMemo(() => new THREE.BoxGeometry(...args), args)
  return <PartSurface partId={partId} geometry={geo} {...rest} />
}

export function CylPart({
  partId,
  args,
  ...rest
}: Common & { args: [number, number, number, number?] }) {
  const [rt, rb, h, seg = 18] = args
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const geo = useMemo(() => new THREE.CylinderGeometry(rt, rb, h, seg), [rt, rb, h, seg])
  return <PartSurface partId={partId} geometry={geo} {...rest} />
}

export function SpherePart({
  partId,
  args,
  ...rest
}: Common & { args: [number, number?, number?] }) {
  const [r, w = 16, h = 12] = args
  const geo = useMemo(() => new THREE.SphereGeometry(r, w, h), [r, w, h])
  return <PartSurface partId={partId} geometry={geo} {...rest} />
}

export function TorusPart({
  partId,
  args,
  ...rest
}: Common & { args: [number, number, number?, number?] }) {
  const [r, tube, rs = 8, ts = 24] = args
  const geo = useMemo(() => new THREE.TorusGeometry(r, tube, rs, ts), [r, tube, rs, ts])
  return <PartSurface partId={partId} geometry={geo} {...rest} />
}

export function ConePart({
  partId,
  args,
  ...rest
}: Common & { args: [number, number, number?] }) {
  const [r, h, seg = 18] = args
  const geo = useMemo(() => new THREE.ConeGeometry(r, h, seg), [r, h, seg])
  return <PartSurface partId={partId} geometry={geo} {...rest} />
}
