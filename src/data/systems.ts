// The seven systems parts are grouped into. Accent colors are used only for
// legend dots / system chips — the selected-part highlight is always amber.

export type SystemId =
  | 'engine'
  | 'drivetrain'
  | 'suspension-steering'
  | 'braking'
  | 'exhaust'
  | 'fuel-electrical-cooling'
  | 'body-chassis'

export interface System {
  id: SystemId
  name: string
  blurb: string
  accent: string
  order: number
}

export const SYSTEMS: System[] = [
  {
    id: 'engine',
    name: 'Engine',
    blurb: 'Turns burning fuel into rotation',
    accent: '#5b9bd5',
    order: 0,
  },
  {
    id: 'drivetrain',
    name: 'Drivetrain',
    blurb: 'Carries that rotation to the rear wheels',
    accent: '#7c8cff',
    order: 1,
  },
  {
    id: 'suspension-steering',
    name: 'Suspension & Steering',
    blurb: 'Keeps the tires planted and points them',
    accent: '#46c7d6',
    order: 2,
  },
  {
    id: 'braking',
    name: 'Braking',
    blurb: 'Slows the car down',
    accent: '#ff6b6b',
    order: 3,
  },
  {
    id: 'exhaust',
    name: 'Exhaust',
    blurb: 'Cleans and quiets the burnt gases',
    accent: '#9aa7c7',
    order: 4,
  },
  {
    id: 'fuel-electrical-cooling',
    name: 'Fuel · Electrical · Cooling',
    blurb: 'Feeds, powers and cools the engine',
    accent: '#5fd39b',
    order: 5,
  },
  {
    id: 'body-chassis',
    name: 'Body & Chassis',
    blurb: 'The structure and the see-through skin',
    accent: '#aab4cc',
    order: 6,
  },
]

export const SYSTEM_MAP = Object.fromEntries(
  SYSTEMS.map((s) => [s.id, s]),
) as Record<SystemId, System>

export const SYSTEM_IDS = SYSTEMS.map((s) => s.id)
