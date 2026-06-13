import { Part } from '../Part'
import { BoxPart, CylPart, TorusPart } from '../PartSurface'

const AXIS_X: [number, number, number] = [0, 0, Math.PI / 2]

// Four corners (local X, Z) relative to the car center.
const CORNERS: Array<[number, number]> = [
  [0.78, 1.3],
  [-0.78, 1.3],
  [0.78, -1.3],
  [-0.78, -1.3],
]

/** Wheels, suspension, control arms, steering and brakes — the running gear. */
export function Running() {
  return (
    <>
      <Part id="wheels" position={[0, 0.34, 0]}>
        {CORNERS.map(([x, z], i) => (
          <group key={i} position={[x, 0, z]}>
            <CylPart partId="wheels" args={[0.34, 0.34, 0.22, 24]} rotation={AXIS_X} />
            <CylPart partId="wheels" args={[0.2, 0.2, 0.235, 12]} rotation={AXIS_X} />
          </group>
        ))}
      </Part>

      <Part id="suspension" position={[0, 0.5, 0]}>
        {CORNERS.map(([x, z], i) => (
          <group key={i} position={[x - Math.sign(x) * 0.16, 0, z]}>
            <CylPart partId="suspension" args={[0.028, 0.028, 0.42, 8]} />
            {[-0.13, 0, 0.13].map((y, j) => (
              <TorusPart
                key={j}
                partId="suspension"
                args={[0.07, 0.013, 6, 16]}
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, y, 0]}
              />
            ))}
          </group>
        ))}
      </Part>

      <Part id="control-arms" position={[0, 0.4, 0]}>
        {CORNERS.map(([x, z], i) => (
          <BoxPart
            key={i}
            partId="control-arms"
            args={[0.42, 0.04, 0.12]}
            position={[x - Math.sign(x) * 0.33, -0.05, z]}
          />
        ))}
      </Part>

      <Part id="steering-rack" position={[0, 0.42, 1.2]}>
        <BoxPart partId="steering-rack" args={[1.3, 0.06, 0.06]} />
        <CylPart partId="steering-rack" args={[0.018, 0.018, 0.24, 8]} rotation={AXIS_X} position={[0.74, 0, 0.06]} />
        <CylPart partId="steering-rack" args={[0.018, 0.018, 0.24, 8]} rotation={AXIS_X} position={[-0.74, 0, 0.06]} />
      </Part>

      <Part id="steering-column" position={[-0.33, 0.72, 0.82]}>
        <CylPart partId="steering-column" args={[0.022, 0.022, 0.62, 8]} rotation={[0.7, 0, 0]} />
      </Part>

      <Part id="steering-wheel" position={[-0.34, 0.97, 0.55]}>
        <TorusPart partId="steering-wheel" args={[0.15, 0.022, 8, 24]} rotation={[0.95, 0, 0]} />
      </Part>

      <Part id="brakes" position={[0, 0.34, 0]}>
        {CORNERS.map(([x, z], i) => (
          <group key={i} position={[x - Math.sign(x) * 0.06, 0, z]}>
            <CylPart partId="brakes" args={[0.24, 0.24, 0.03, 24]} rotation={AXIS_X} />
            <BoxPart partId="brakes" args={[0.06, 0.12, 0.1]} position={[0, 0.2, 0]} />
          </group>
        ))}
      </Part>
    </>
  )
}
