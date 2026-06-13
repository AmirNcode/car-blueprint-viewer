import type { SystemId } from './systems'

/** A physical/functional link from one part to another. */
export interface Connection {
  /** A part id when it links to another catalog part (renders as a clickable chip), else null. */
  to: string | null
  /** Display name of the thing it connects to. */
  label: string
  /** The functional reason for the connection — the "why" behind the link. */
  why: string
}

export interface Part {
  id: string
  name: string
  system: SystemId
  /** Number of physical instances (e.g. 6 pistons), shown as a badge. */
  count?: number
  /** One line: what it is. */
  summary: string
  /** What it does. */
  func: string
  connections: Connection[]
}

export const PARTS: Part[] = [
  // ---------------- Engine ----------------
  {
    id: 'engine-block',
    name: 'Cylinder Block',
    system: 'engine',
    summary: 'The main metal structure of the engine, containing the cylinders.',
    func: 'Houses the cylinders where combustion happens and carries the crankshaft — it is the engine’s backbone.',
    connections: [
      { to: 'cylinder-head', label: 'Cylinder Head', why: 'bolts on top and seals the cylinders with the head gasket' },
      { to: 'crankshaft', label: 'Crankshaft', why: 'spins in the main bearings at the bottom of the block' },
      { to: 'pistons', label: 'Pistons', why: 'slide up and down inside the block’s machined bores' },
      { to: null, label: 'Oil pan', why: 'bolts underneath to hold the engine’s oil' },
    ],
  },
  {
    id: 'cylinder-head',
    name: 'Cylinder Head',
    system: 'engine',
    summary: 'Sits on top of the block, sealing the cylinders and holding the valvetrain.',
    func: 'Forms the top of each combustion chamber and routes air in and exhaust out through its ports.',
    connections: [
      { to: 'engine-block', label: 'Cylinder Block', why: 'bolts down onto it, sealed by the head gasket' },
      { to: 'camshaft', label: 'Camshaft', why: 'is mounted inside the head to work the valves' },
      { to: 'valves', label: 'Valves', why: 'slide in the head and seal its ports' },
      { to: 'spark-plugs', label: 'Spark Plugs', why: 'screw into the head with their tips in the chambers' },
      { to: 'intake-manifold', label: 'Intake Manifold', why: 'feeds air into the head’s intake ports' },
      { to: 'exhaust-manifold', label: 'Exhaust Manifold', why: 'carries gases away from the head’s exhaust ports' },
    ],
  },
  {
    id: 'pistons',
    name: 'Pistons',
    system: 'engine',
    count: 6,
    summary: 'Cylindrical plugs that travel up and down inside the cylinders.',
    func: 'Compress the air-fuel mixture and are driven down by the burning charge, turning fuel into motion.',
    connections: [
      { to: 'connecting-rods', label: 'Connecting Rods', why: 'each piston is pinned to a rod at its base' },
      { to: 'engine-block', label: 'Cylinder Block', why: 'slide within the block’s bores' },
    ],
  },
  {
    id: 'connecting-rods',
    name: 'Connecting Rods',
    system: 'engine',
    count: 6,
    summary: 'Sturdy links between each piston and the crankshaft.',
    func: 'Transfer the piston’s straight push to the crankshaft, converting it into rotation.',
    connections: [
      { to: 'pistons', label: 'Pistons', why: 'the small end pins to the piston' },
      { to: 'crankshaft', label: 'Crankshaft', why: 'the big end wraps around a crank journal' },
    ],
  },
  {
    id: 'crankshaft',
    name: 'Crankshaft',
    system: 'engine',
    summary: 'The rotating shaft running along the bottom of the engine.',
    func: 'Converts the pistons’ up-and-down motion into the rotation that ultimately drives the wheels.',
    connections: [
      { to: 'connecting-rods', label: 'Connecting Rods', why: 'they push on its journals to spin it' },
      { to: 'engine-block', label: 'Cylinder Block', why: 'rides in the block’s main bearings' },
      { to: 'flywheel', label: 'Flywheel', why: 'bolts to its rear end to pass power out' },
      { to: 'camshaft', label: 'Camshaft', why: 'drives it in sync through the timing chain' },
    ],
  },
  {
    id: 'camshaft',
    name: 'Camshaft',
    system: 'engine',
    summary: 'A lobed shaft running through the cylinder head.',
    func: 'Its egg-shaped lobes push the valves open at exactly the right moment as it spins.',
    connections: [
      { to: 'cylinder-head', label: 'Cylinder Head', why: 'is mounted in the head above the valves' },
      { to: 'valves', label: 'Valves', why: 'its lobes press them open' },
      { to: 'timing-chain', label: 'Timing Chain', why: 'is turned by the chain from the crankshaft' },
      { to: 'crankshaft', label: 'Crankshaft', why: 'must stay perfectly in time with it' },
    ],
  },
  {
    id: 'valves',
    name: 'Valves',
    system: 'engine',
    count: 12,
    summary: 'Intake and exhaust valves seated in the cylinder head.',
    func: 'Open to let the mixture in and exhaust out, then seal the chamber tight for combustion.',
    connections: [
      { to: 'camshaft', label: 'Camshaft', why: 'the cam lobes open them on schedule' },
      { to: 'cylinder-head', label: 'Cylinder Head', why: 'they seat against the head’s ports' },
      { to: 'intake-manifold', label: 'Intake Manifold', why: 'intake valves gate the air it delivers' },
    ],
  },
  {
    id: 'timing-chain',
    name: 'Timing Chain',
    system: 'engine',
    summary: 'A chain looping around gears on the crankshaft and camshaft.',
    func: 'Keeps the camshaft spinning in exact step with the crankshaft so the valves open at the right time.',
    connections: [
      { to: 'crankshaft', label: 'Crankshaft', why: 'driven by the gear on its front' },
      { to: 'camshaft', label: 'Camshaft', why: 'turns the cam gear to time the valves' },
    ],
  },
  {
    id: 'intake-manifold',
    name: 'Intake Manifold',
    system: 'engine',
    summary: 'Branching tubes bolted to one side of the head.',
    func: 'Distributes incoming air evenly to all six cylinders.',
    connections: [
      { to: 'cylinder-head', label: 'Cylinder Head', why: 'bolts to its intake ports' },
      { to: null, label: 'Throttle / air intake', why: 'feeds it the air the engine breathes' },
    ],
  },
  {
    id: 'exhaust-manifold',
    name: 'Exhaust Manifold',
    system: 'engine',
    summary: 'Tubes that collect burnt gases from the cylinders.',
    func: 'Gathers exhaust from each cylinder into a single pipe leaving the engine.',
    connections: [
      { to: 'cylinder-head', label: 'Cylinder Head', why: 'bolts to its exhaust ports' },
      { to: 'catalytic-converter', label: 'Catalytic Converter', why: 'passes the hot gases downstream to it' },
    ],
  },
  {
    id: 'spark-plugs',
    name: 'Spark Plugs',
    system: 'engine',
    count: 6,
    summary: 'Small electric igniters threaded into the head.',
    func: 'Produce the spark that lights the compressed air-fuel mixture at the top of each cylinder.',
    connections: [
      { to: 'cylinder-head', label: 'Cylinder Head', why: 'screw into it with their tips in the chambers' },
      { to: 'battery', label: 'Battery', why: 'the ignition system supplies their high voltage' },
    ],
  },
  {
    id: 'flywheel',
    name: 'Flywheel',
    system: 'engine',
    summary: 'A heavy disc bolted to the back of the crankshaft.',
    func: 'Smooths out the engine’s firing pulses with its inertia and gives the clutch a surface to grip.',
    connections: [
      { to: 'crankshaft', label: 'Crankshaft', why: 'bolts to its rear flange' },
      { to: 'clutch', label: 'Clutch', why: 'the clutch presses against its face to take power' },
    ],
  },

  // ---------------- Drivetrain ----------------
  {
    id: 'clutch',
    name: 'Clutch',
    system: 'drivetrain',
    summary: 'A friction disc sitting between the engine and the gearbox.',
    func: 'Connects and disconnects engine power so you can change gear and pull away from a stop.',
    connections: [
      { to: 'flywheel', label: 'Flywheel', why: 'grips the spinning flywheel to take engine power' },
      { to: 'transmission', label: 'Transmission', why: 'feeds that power into the gearbox input shaft' },
      { to: null, label: 'Clutch pedal', why: 'the pedal disengages it so you can shift' },
    ],
  },
  {
    id: 'transmission',
    name: 'Transmission (Manual Gearbox)',
    system: 'drivetrain',
    summary: 'The set of gears that lets you change ratios.',
    func: 'Trades engine speed for torque — low gears for pulling away, high gears for cruising.',
    connections: [
      { to: 'clutch', label: 'Clutch', why: 'receives engine power through it' },
      { to: 'driveshaft', label: 'Driveshaft', why: 'sends power out the back to it' },
      { to: 'gear-shifter', label: 'Gear Shifter', why: 'the lever selects which gear is engaged' },
    ],
  },
  {
    id: 'gear-shifter',
    name: 'Gear Shifter',
    system: 'drivetrain',
    summary: 'The lever in the cabin you move to change gear.',
    func: 'Lets the driver manually choose which gear the transmission uses.',
    connections: [
      { to: 'transmission', label: 'Transmission', why: 'moves the selector forks inside the gearbox' },
    ],
  },
  {
    id: 'driveshaft',
    name: 'Driveshaft',
    system: 'drivetrain',
    summary: 'A long spinning tube running under the floor of the car.',
    func: 'Carries rotation from the gearbox at the front back to the differential — what makes this car rear-wheel drive.',
    connections: [
      { to: 'transmission', label: 'Transmission', why: 'takes power from its output shaft' },
      { to: 'differential', label: 'Differential', why: 'delivers that power to the rear axle' },
    ],
  },
  {
    id: 'differential',
    name: 'Differential',
    system: 'drivetrain',
    summary: 'A gear case sitting between the two rear wheels.',
    func: 'Splits drive to both rear wheels while letting them spin at different speeds through a corner.',
    connections: [
      { to: 'driveshaft', label: 'Driveshaft', why: 'is driven by the spinning driveshaft' },
      { to: 'rear-axles', label: 'Rear Axle Half-Shafts', why: 'sends power out to them' },
    ],
  },
  {
    id: 'rear-axles',
    name: 'Rear Axle Half-Shafts',
    system: 'drivetrain',
    count: 2,
    summary: 'The shafts running from the differential to each rear wheel.',
    func: 'Transmit the differential’s power outward to spin the rear wheels.',
    connections: [
      { to: 'differential', label: 'Differential', why: 'driven by the differential gears' },
      { to: 'wheels', label: 'Wheels & Tires', why: 'turn the rear wheels' },
    ],
  },

  // ---------------- Suspension & Steering ----------------
  {
    id: 'wheels',
    name: 'Wheels & Tires',
    system: 'suspension-steering',
    count: 4,
    summary: 'The rims and tires at each corner of the car.',
    func: 'Support the car and put power, braking and steering down onto the road; the tires provide grip.',
    connections: [
      { to: 'rear-axles', label: 'Rear Axle Half-Shafts', why: 'the rear pair are driven by them' },
      { to: 'brakes', label: 'Brake Discs & Calipers', why: 'the discs spin with the wheels' },
      { to: 'suspension', label: 'Suspension', why: 'each wheel is held and cushioned by it' },
      { to: 'steering-rack', label: 'Steering Rack', why: 'the front pair are aimed by it' },
    ],
  },
  {
    id: 'suspension',
    name: 'Suspension (Springs & Dampers)',
    system: 'suspension-steering',
    count: 4,
    summary: 'Coil springs and shock absorbers at each wheel.',
    func: 'Soak up bumps and keep the tires pressed to the road for grip and comfort.',
    connections: [
      { to: 'chassis', label: 'Chassis / Frame', why: 'mounts to the car’s structure' },
      { to: 'wheels', label: 'Wheels & Tires', why: 'controls each wheel’s up-and-down travel' },
      { to: 'control-arms', label: 'Control Arms', why: 'works alongside them to locate the wheel' },
    ],
  },
  {
    id: 'control-arms',
    name: 'Control Arms',
    system: 'suspension-steering',
    count: 4,
    summary: 'Hinged links between the wheels and the chassis.',
    func: 'Locate each wheel, letting it move up and down while keeping it correctly aligned.',
    connections: [
      { to: 'chassis', label: 'Chassis / Frame', why: 'hinge on the structure at their inner end' },
      { to: 'wheels', label: 'Wheels & Tires', why: 'carry the wheel hubs at their outer end' },
    ],
  },
  {
    id: 'steering-rack',
    name: 'Steering Rack',
    system: 'suspension-steering',
    summary: 'A geared bar that runs across the front of the car.',
    func: 'Converts the steering wheel’s rotation into the side-to-side motion that turns the front wheels.',
    connections: [
      { to: 'steering-column', label: 'Steering Column', why: 'is turned by the column’s pinion gear' },
      { to: 'wheels', label: 'Wheels & Tires', why: 'turns the front wheels through the tie rods' },
    ],
  },
  {
    id: 'steering-column',
    name: 'Steering Column',
    system: 'suspension-steering',
    summary: 'The shaft running from the steering wheel down to the rack.',
    func: 'Carries your turning input from the wheel down to the steering rack.',
    connections: [
      { to: 'steering-wheel', label: 'Steering Wheel', why: 'is turned by the wheel at its top' },
      { to: 'steering-rack', label: 'Steering Rack', why: 'drives the rack at its bottom' },
    ],
  },
  {
    id: 'steering-wheel',
    name: 'Steering Wheel',
    system: 'suspension-steering',
    summary: 'The wheel the driver holds.',
    func: 'The driver’s control for changing the car’s direction.',
    connections: [
      { to: 'steering-column', label: 'Steering Column', why: 'turns the column it is mounted on' },
    ],
  },

  // ---------------- Braking ----------------
  {
    id: 'brakes',
    name: 'Brake Discs & Calipers',
    system: 'braking',
    count: 4,
    summary: 'Discs that spin with the wheels and calipers that squeeze them.',
    func: 'Turn the car’s motion into heat through friction to slow it down.',
    connections: [
      { to: 'wheels', label: 'Wheels & Tires', why: 'the discs bolt to the wheel hubs and spin with them' },
      { to: null, label: 'Brake pedal & hydraulics', why: 'pressing the pedal squeezes the calipers shut' },
    ],
  },

  // ---------------- Exhaust ----------------
  {
    id: 'catalytic-converter',
    name: 'Catalytic Converter',
    system: 'exhaust',
    summary: 'A canister in the exhaust line full of a chemical honeycomb.',
    func: 'Chemically cleans the toxic gases before they leave the car.',
    connections: [
      { to: 'exhaust-manifold', label: 'Exhaust Manifold', why: 'receives the hot gases from it' },
      { to: 'muffler', label: 'Muffler', why: 'passes the cleaned gases on to it' },
    ],
  },
  {
    id: 'muffler',
    name: 'Muffler',
    system: 'exhaust',
    summary: 'A chambered box near the back of the car.',
    func: 'Quiets the noise of the escaping exhaust gases.',
    connections: [
      { to: 'catalytic-converter', label: 'Catalytic Converter', why: 'receives gases from it' },
      { to: 'tailpipe', label: 'Tailpipe', why: 'vents the quieted gases out through it' },
    ],
  },
  {
    id: 'tailpipe',
    name: 'Tailpipe',
    system: 'exhaust',
    summary: 'The final pipe at the rear of the car.',
    func: 'Releases the cleaned, quieted exhaust gases behind the car.',
    connections: [
      { to: 'muffler', label: 'Muffler', why: 'is fed the gases by the muffler' },
    ],
  },

  // ---------------- Fuel · Electrical · Cooling ----------------
  {
    id: 'fuel-tank',
    name: 'Fuel Tank',
    system: 'fuel-electrical-cooling',
    summary: 'A reservoir mounted under the rear floor.',
    func: 'Stores the petrol and feeds it forward to the engine.',
    connections: [
      { to: 'engine-block', label: 'Engine', why: 'supplies fuel forward via the fuel line and injectors' },
    ],
  },
  {
    id: 'radiator',
    name: 'Radiator',
    system: 'fuel-electrical-cooling',
    summary: 'A finned panel mounted at the very front of the car.',
    func: 'Cools the engine’s coolant using the airflow, stopping the engine from overheating.',
    connections: [
      { to: 'engine-block', label: 'Engine', why: 'coolant circulates between it and the engine through hoses' },
    ],
  },
  {
    id: 'battery',
    name: 'Battery',
    system: 'fuel-electrical-cooling',
    summary: 'A box of stored electricity in the engine bay.',
    func: 'Stores electrical energy to start the engine and run the electronics.',
    connections: [
      { to: 'alternator', label: 'Alternator', why: 'the alternator recharges it while running' },
      { to: 'spark-plugs', label: 'Spark Plugs', why: 'its energy powers the ignition spark' },
    ],
  },
  {
    id: 'alternator',
    name: 'Alternator',
    system: 'fuel-electrical-cooling',
    summary: 'A belt-driven generator mounted on the engine.',
    func: 'Generates electricity while the engine runs to recharge the battery and power the car.',
    connections: [
      { to: 'crankshaft', label: 'Crankshaft', why: 'is spun by a belt off the crankshaft' },
      { to: 'battery', label: 'Battery', why: 'feeds charge back into it' },
    ],
  },

  // ---------------- Body & Chassis ----------------
  {
    id: 'chassis',
    name: 'Chassis / Frame',
    system: 'body-chassis',
    summary: 'The rigid structural skeleton of the car.',
    func: 'The base that every component bolts to and that carries the loads of driving and crashes.',
    connections: [
      { to: 'suspension', label: 'Suspension', why: 'mounts to it at all four corners' },
      { to: 'body-shell', label: 'Body Shell', why: 'the body is built on top of it' },
      { to: 'engine-block', label: 'Engine', why: 'the engine and gearbox are mounted to it' },
    ],
  },
  {
    id: 'body-shell',
    name: 'Body Shell',
    system: 'body-chassis',
    summary: 'The outer skin and cabin of the car, shown see-through here.',
    func: 'Protects the occupants, shapes the airflow, and carries the doors, glass and panels.',
    connections: [
      { to: 'chassis', label: 'Chassis / Frame', why: 'is mounted on the structural frame' },
    ],
  },
  {
    id: 'seats',
    name: 'Seats',
    system: 'body-chassis',
    summary: 'The seating inside the cabin.',
    func: 'Support and secure the driver and passengers.',
    connections: [
      { to: 'body-shell', label: 'Body Shell', why: 'are bolted to the cabin floor' },
    ],
  },
]

export const PART_MAP: Record<string, Part> = Object.fromEntries(
  PARTS.map((p) => [p.id, p]),
)

export const PART_IDS = PARTS.map((p) => p.id)

/** Order the guided tour walks through the machine (pedagogical: engine -> wheels -> body). */
export const TOUR_ORDER = PART_IDS
