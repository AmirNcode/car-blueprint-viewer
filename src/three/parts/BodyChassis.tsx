import { useMemo } from 'react'
import * as THREE from 'three'
import { Part } from '../Part'
import { BoxPart, PartSurface } from '../PartSurface'

const BODY_WIDTH = 1.74

// Side-profile silhouette of a coupe (shapeX = length, shapeY = height).
const PROFILE: Array<[number, number]> = [
  [2.0, 0.16],
  [2.06, 0.46],
  [1.5, 0.55],
  [0.95, 0.62],
  [0.42, 1.14],
  [-0.7, 1.2],
  [-1.3, 0.92],
  [-1.85, 0.64],
  [-2.06, 0.52],
  [-2.06, 0.16],
]

/** The see-through outer shell, extruded from a side-profile silhouette. */
function BodyShell() {
  const geo = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(PROFILE[0][0], PROFILE[0][1])
    for (let i = 1; i < PROFILE.length; i++) shape.lineTo(PROFILE[i][0], PROFILE[i][1])
    shape.closePath()
    const g = new THREE.ExtrudeGeometry(shape, { depth: BODY_WIDTH, bevelEnabled: false, steps: 1 })
    g.translate(0, 0, -BODY_WIDTH / 2)
    return g
  }, [])
  return <PartSurface partId="body-shell" geometry={geo} rotation={[0, -Math.PI / 2, 0]} />
}

/** Structural frame, the see-through body, and cabin seats. */
export function BodyChassis() {
  return (
    <>
      <Part id="chassis" position={[0, 0.28, 0]}>
        <BoxPart partId="chassis" args={[0.09, 0.12, 3.9]} position={[0.5, 0, 0]} />
        <BoxPart partId="chassis" args={[0.09, 0.12, 3.9]} position={[-0.5, 0, 0]} />
        {[1.3, 0, -1.3].map((z, i) => (
          <BoxPart key={i} partId="chassis" args={[1.0, 0.1, 0.12]} position={[0, 0, z]} />
        ))}
      </Part>

      <Part id="body-shell" position={[0, 0, 0]}>
        <BodyShell />
      </Part>

      <Part id="seats" position={[0, 0.62, -0.2]}>
        {[0.34, -0.34].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <BoxPart partId="seats" args={[0.42, 0.1, 0.42]} position={[0, -0.12, 0]} />
            <BoxPart partId="seats" args={[0.42, 0.5, 0.12]} position={[0, 0.14, -0.25]} />
          </group>
        ))}
      </Part>
    </>
  )
}
