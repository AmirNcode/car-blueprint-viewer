import { Engine } from './parts/Engine'
import { Drivetrain } from './parts/Drivetrain'
import { Running } from './parts/Running'
import { Ancillaries } from './parts/Ancillaries'
import { BodyChassis } from './parts/BodyChassis'

/** The full procedurally-built car: every system assembled into one scene graph. */
export function Car() {
  return (
    <group>
      <BodyChassis />
      <Engine />
      <Drivetrain />
      <Running />
      <Ancillaries />
    </group>
  )
}
