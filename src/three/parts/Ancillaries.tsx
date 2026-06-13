import { Part } from '../Part'
import { BoxPart, CylPart } from '../PartSurface'

const AXIS_Z: [number, number, number] = [Math.PI / 2, 0, 0]

/** Exhaust line, fuel tank, radiator and electrical bits. */
export function Ancillaries() {
  return (
    <>
      <Part id="catalytic-converter" position={[-0.28, 0.32, 0.45]}>
        <CylPart partId="catalytic-converter" args={[0.07, 0.07, 0.4, 14]} rotation={AXIS_Z} />
        {/* down-pipe up toward the exhaust manifold */}
        <CylPart partId="catalytic-converter" args={[0.035, 0.035, 0.7, 8]} rotation={[0.7, 0, 0]} position={[0, 0.22, 0.5]} />
      </Part>

      <Part id="muffler" position={[-0.24, 0.28, -1.55]}>
        <BoxPart partId="muffler" args={[0.46, 0.18, 0.3]} />
        {/* mid-pipe running forward to the catalytic converter */}
        <CylPart partId="muffler" args={[0.035, 0.035, 1.85, 8]} rotation={AXIS_Z} position={[-0.02, 0, 1.07]} />
      </Part>

      <Part id="tailpipe" position={[-0.24, 0.28, -1.95]}>
        <CylPart partId="tailpipe" args={[0.04, 0.04, 0.3, 10]} rotation={AXIS_Z} />
      </Part>

      <Part id="fuel-tank" position={[0, 0.32, -0.95]}>
        <BoxPart partId="fuel-tank" args={[0.7, 0.2, 0.55]} />
      </Part>

      <Part id="radiator" position={[0, 0.6, 2.0]}>
        <BoxPart partId="radiator" args={[0.72, 0.55, 0.06]} />
      </Part>

      <Part id="battery" position={[0.32, 0.8, 1.9]}>
        <BoxPart partId="battery" args={[0.2, 0.18, 0.24]} />
      </Part>

      <Part id="alternator" position={[0.26, 0.52, 1.92]}>
        <CylPart partId="alternator" args={[0.08, 0.08, 0.12, 14]} rotation={AXIS_Z} />
      </Part>
    </>
  )
}
