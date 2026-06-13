import { Part } from '../Part'
import { BoxPart, CylPart, SpherePart } from '../PartSurface'

const AXIS_Z: [number, number, number] = [Math.PI / 2, 0, 0]
const AXIS_X: [number, number, number] = [0, 0, Math.PI / 2]

/** Clutch, gearbox, driveshaft, differential and rear half-shafts (RWD). */
export function Drivetrain() {
  return (
    <>
      <Part id="clutch" position={[0, 0.42, 0.9]}>
        <CylPart partId="clutch" args={[0.18, 0.18, 0.06, 24]} rotation={AXIS_Z} />
      </Part>

      <Part id="transmission" position={[0, 0.42, 0.55]}>
        {/* bell housing tapering into the gearbox case */}
        <CylPart partId="transmission" args={[0.17, 0.12, 0.18, 20]} rotation={AXIS_Z} position={[0, 0, 0.22]} />
        <BoxPart partId="transmission" args={[0.24, 0.3, 0.46]} position={[0, -0.01, -0.05]} />
      </Part>

      <Part id="gear-shifter" position={[0, 0.74, 0.4]}>
        <CylPart partId="gear-shifter" args={[0.02, 0.02, 0.42, 8]} rotation={[0.35, 0, 0]} />
        <SpherePart partId="gear-shifter" args={[0.04]} position={[0, 0.21, -0.07]} />
      </Part>

      <Part id="driveshaft" position={[0, 0.34, -0.45]}>
        <CylPart partId="driveshaft" args={[0.04, 0.04, 1.4, 12]} rotation={AXIS_Z} />
      </Part>

      <Part id="differential" position={[0, 0.34, -1.3]}>
        <SpherePart partId="differential" args={[0.16, 18, 14]} />
      </Part>

      <Part id="rear-axles" position={[0, 0.34, -1.3]}>
        <CylPart partId="rear-axles" args={[0.04, 0.04, 0.6, 10]} rotation={AXIS_X} position={[0.47, 0, 0]} />
        <CylPart partId="rear-axles" args={[0.04, 0.04, 0.6, 10]} rotation={AXIS_X} position={[-0.47, 0, 0]} />
      </Part>
    </>
  )
}
