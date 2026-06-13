import * as THREE from 'three'

export const CAMERA_FOV = 42
export const CAR_TARGET = new THREE.Vector3(0, 0.55, 0)

// Fixed 3/4 viewing direction; distance is derived to fit the car on screen.
const DIR = new THREE.Vector3(5, 2.8, 6).normalize()
const FIT_RADIUS = 2.6 // half-extent of the car we want comfortably in frame

/** Camera distance needed to fit FIT_RADIUS in the tighter of the two FOV axes. */
export function fitDistance(aspect: number): number {
  const vFov = (CAMERA_FOV * Math.PI) / 180
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect)
  const fov = Math.min(vFov, hFov)
  return FIT_RADIUS / Math.tan(fov / 2)
}

/** Default camera position that frames the whole car for the current aspect ratio. */
export function defaultCameraPosition(
  aspect = window.innerWidth / window.innerHeight,
): THREE.Vector3 {
  const d = THREE.MathUtils.clamp(fitDistance(aspect), 4, 20)
  return DIR.clone().multiplyScalar(d).add(CAR_TARGET)
}
