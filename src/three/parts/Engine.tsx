import { Part } from '../Part'
import { BoxPart, CylPart, TorusPart } from '../PartSurface'

// Six cylinder positions along the engine's length (local Z, inline-6).
const CYL_Z = Array.from({ length: 6 }, (_, i) => -0.33 + i * 0.132)

const AXIS_Z: [number, number, number] = [Math.PI / 2, 0, 0]
const AXIS_X: [number, number, number] = [0, 0, Math.PI / 2]

/** The inline-6 engine: block, head, valvetrain and reciprocating internals. */
export function Engine() {
  return (
    <>
      <Part id="engine-block" position={[0, 0.62, 1.45]}>
        <BoxPart partId="engine-block" args={[0.44, 0.5, 0.86]} />
      </Part>

      <Part id="cylinder-head" position={[0, 0.93, 1.45]}>
        <BoxPart partId="cylinder-head" args={[0.5, 0.16, 0.9]} />
      </Part>

      <Part id="pistons" position={[0, 0.66, 1.45]}>
        {CYL_Z.map((z, i) => (
          <CylPart key={i} partId="pistons" args={[0.075, 0.075, 0.16, 16]} position={[0, 0, z]} />
        ))}
      </Part>

      <Part id="connecting-rods" position={[0, 0.5, 1.45]}>
        {CYL_Z.map((z, i) => (
          <BoxPart key={i} partId="connecting-rods" args={[0.04, 0.2, 0.04]} position={[0, 0, z]} />
        ))}
      </Part>

      <Part id="crankshaft" position={[0, 0.42, 1.45]}>
        <CylPart partId="crankshaft" args={[0.05, 0.05, 0.86, 16]} rotation={AXIS_Z} />
      </Part>

      <Part id="camshaft" position={[0, 1.0, 1.45]}>
        <CylPart partId="camshaft" args={[0.03, 0.03, 0.82, 12]} rotation={AXIS_Z} />
      </Part>

      <Part id="valves" position={[0, 0.86, 1.45]}>
        {CYL_Z.map((z, i) => (
          <group key={i}>
            <CylPart partId="valves" args={[0.018, 0.018, 0.14, 8]} position={[0.09, 0, z]} />
            <CylPart partId="valves" args={[0.018, 0.018, 0.14, 8]} position={[-0.09, 0, z]} />
          </group>
        ))}
      </Part>

      <Part id="timing-chain" position={[0, 0.71, 1.93]}>
        <TorusPart partId="timing-chain" args={[0.29, 0.02, 8, 32]} rotation={[0, Math.PI / 2, 0]} />
      </Part>

      <Part id="intake-manifold" position={[0.34, 0.95, 1.45]}>
        <BoxPart partId="intake-manifold" args={[0.16, 0.13, 0.66]} />
        {CYL_Z.map((z, i) => (
          <CylPart
            key={i}
            partId="intake-manifold"
            args={[0.022, 0.022, 0.2, 8]}
            rotation={AXIS_X}
            position={[-0.16, -0.02, z]}
          />
        ))}
      </Part>

      <Part id="exhaust-manifold" position={[-0.34, 0.86, 1.45]}>
        <BoxPart partId="exhaust-manifold" args={[0.12, 0.12, 0.66]} />
        {CYL_Z.map((z, i) => (
          <CylPart
            key={i}
            partId="exhaust-manifold"
            args={[0.022, 0.022, 0.2, 8]}
            rotation={AXIS_X}
            position={[0.16, 0.02, z]}
          />
        ))}
      </Part>

      <Part id="spark-plugs" position={[0, 1.09, 1.45]}>
        {CYL_Z.map((z, i) => (
          <CylPart key={i} partId="spark-plugs" args={[0.02, 0.02, 0.1, 8]} position={[0, 0, z]} />
        ))}
      </Part>

      <Part id="flywheel" position={[0, 0.42, 0.99]}>
        <CylPart partId="flywheel" args={[0.2, 0.2, 0.05, 24]} rotation={AXIS_Z} />
      </Part>
    </>
  )
}
