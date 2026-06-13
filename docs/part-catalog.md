# Part Catalog — Inline-6 RWD Manual ICE

This is the human-readable source of truth for the educational content. It is
mirrored in `src/data/parts.ts`. Each part lists its **system**, a one-line
**summary**, its **function**, and its **connections** (what it links to and
*why* — per the owner's spatial-relationship requirement).

Multi-instance parts (e.g. 6 pistons) are one catalog entry but rendered as
multiple meshes that highlight together.

## Systems
- **Engine** — turns burning fuel into rotation
- **Drivetrain** — carries that rotation to the rear wheels
- **Suspension & Steering** — keeps tires on the road and points them
- **Braking** — slows the car down
- **Exhaust** — cleans and quiets burnt gases
- **Fuel · Electrical · Cooling** — feeds, powers, and cools the engine
- **Body & Chassis** — the structure and the see-through skin

---

## Engine
1. **Cylinder Block** — the main metal structure containing the cylinders.
   *Connects to:* cylinder head (bolts on top, sealed by the head gasket),
   crankshaft (spins in its main bearings at the bottom), pistons (slide inside
   its bores), oil pan (bolts underneath to hold the oil).
2. **Cylinder Head** — sits atop the block, sealing the cylinders.
   *Connects to:* block (bolts on top), camshaft (mounted in it), valves (slide
   in it), spark plugs (screw into it), intake manifold (feeds its intake
   ports), exhaust manifold (carries gases from its exhaust ports).
3. **Pistons ×6** — plugs that move up and down in the cylinders.
   *Connects to:* connecting rods (joined at the bottom by the wrist pin), block
   (slide within its bores). Pushed down by combustion to make power.
4. **Connecting Rods ×6** — link each piston to the crankshaft.
   *Connects to:* pistons (top/small end), crankshaft (big end wraps a journal).
   Convert the piston's straight push into crankshaft rotation.
5. **Crankshaft** — the rotating shaft at the bottom of the engine.
   *Connects to:* connecting rods (driven by them), block (main bearings),
   flywheel (bolted to its rear), camshaft (drives it via the timing chain).
6. **Camshaft** — a lobed shaft in the head.
   *Connects to:* cylinder head (mounted in it), valves (its lobes press them
   open), timing chain (driven through it), crankshaft (kept in sync with it).
7. **Valves ×12** — intake and exhaust valves.
   *Connects to:* camshaft (opens them), head (seated in it), the manifolds
   (gate air in and exhaust out of the ports).
8. **Timing Chain** — loops around crank and cam gears.
   *Connects to:* crankshaft (driven by its gear), camshaft (drives its gear) —
   keeps the valves opening in exact time with the pistons.
9. **Intake Manifold** — branching tubes on one side of the head.
   *Connects to:* cylinder head (bolts to its intake ports) — splits incoming
   air evenly to all six cylinders.
10. **Exhaust Manifold** — tubes collecting burnt gases.
    *Connects to:* cylinder head (exhaust ports), catalytic converter (passes
    gases downstream to it).
11. **Spark Plugs ×6** — igniters threaded into the head.
    *Connects to:* cylinder head (screw in, tip in the combustion chamber) —
    fire the spark that lights the compressed mixture.
12. **Flywheel** — a heavy disc on the back of the crankshaft.
    *Connects to:* crankshaft (bolted to its rear), clutch (presses against it)
    — smooths the engine's pulses and gives the clutch a surface to grip.

## Drivetrain
13. **Clutch** — friction disc between engine and gearbox.
    *Connects to:* flywheel (grips it for power), transmission (feeds its input
    shaft) — lets you disconnect drive to change gear or stop.
14. **Transmission (Manual Gearbox)** — the gearset that changes ratios.
    *Connects to:* clutch (takes power from it), driveshaft (sends power out the
    back), gear shifter (you pick gears with it).
15. **Gear Shifter** — the cabin lever.
    *Connects to:* transmission (moves its internal selector forks).
16. **Driveshaft** — a long tube under the car.
    *Connects to:* transmission (takes its output), differential (delivers power
    to it) — running power to the rear is what makes this car rear-wheel drive.
17. **Differential** — gear case between the rear wheels.
    *Connects to:* driveshaft (driven by it), rear axles (powers them) — splits
    drive to both wheels while letting them turn at different speeds in corners.
18. **Rear Axle Half-Shafts ×2** — from differential to each rear wheel.
    *Connects to:* differential (driven by it), wheels (spin them).

## Suspension & Steering
19. **Wheels & Tires ×4** — rims and tires at each corner.
    *Connects to:* rear axles (rear pair driven), brakes (discs spin with them),
    suspension (held by it), steering rack (front pair steered by it).
20. **Suspension (Springs & Dampers)** — coil springs + shock absorbers.
    *Connects to:* chassis (mounted to it), wheels (control their travel),
    control arms (work with them) — soak up bumps, keep tires planted.
21. **Control Arms** — hinged links between wheels and chassis.
    *Connects to:* chassis (hinge on it), wheels (hold the hubs) — locate each
    wheel while letting it move up and down.
22. **Steering Rack** — a geared bar across the front.
    *Connects to:* steering column (driven by it), front wheels (turns them via
    tie rods) — turns your rotation into side-to-side wheel motion.
23. **Steering Column** — shaft from wheel down to the rack.
    *Connects to:* steering wheel (turned by it), steering rack (drives it).
24. **Steering Wheel** — the driver's control.
    *Connects to:* steering column (turns it).

## Braking
25. **Brake Discs & Calipers ×4** — discs spin with the wheels; calipers squeeze.
    *Connects to:* wheels (discs bolt to their hubs) — convert motion into heat
    by friction to slow the car (pressed by hydraulic lines from the pedal).

## Exhaust
26. **Catalytic Converter** — a canister in the exhaust.
    *Connects to:* exhaust manifold (fed by it), muffler (passes gas to it) —
    chemically cleans toxic gases.
27. **Muffler** — a chambered box near the tail.
    *Connects to:* catalytic converter (receives gas), tailpipe (vents through
    it) — quiets the escaping exhaust.
28. **Tailpipe** — the final pipe at the rear.
    *Connects to:* muffler (fed by it) — releases cleaned, quieted exhaust.

## Fuel · Electrical · Cooling
29. **Fuel Tank** — reservoir under the rear floor.
    *Connects to:* engine (feeds petrol forward via the fuel line/injectors).
30. **Radiator** — a finned panel at the very front.
    *Connects to:* engine (circulates coolant to/from it via hoses) — cools the
    coolant with airflow to stop overheating.
31. **Battery** — a box in the engine bay.
    *Connects to:* alternator (recharged by it), starter/ignition (powers them)
    — stores energy to start and run the car.
32. **Alternator** — a belt-driven generator on the engine.
    *Connects to:* crankshaft (spun by its drive belt), battery (charges it).

## Body & Chassis
33. **Chassis / Frame** — the structural skeleton.
    *Connects to:* suspension (mounts to it), body shell (built on it), engine &
    transmission (mounted to it) — the rigid base everything bolts to.
34. **Body Shell** — the outer skin and cabin, shown see-through.
    *Connects to:* chassis (mounted on it) — protects occupants and shapes air.
35. **Seats** — cabin seating.
    *Connects to:* body/chassis floor (mounted to it).
