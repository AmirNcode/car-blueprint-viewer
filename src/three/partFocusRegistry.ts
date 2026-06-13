import * as THREE from 'three'

/**
 * Module-level map of part id -> current world position. Each <Part> writes its
 * live position here every frame; the CameraController reads it to focus the
 * camera on the selected part (and to keep up during the exploded view).
 */
export const partFocusRegistry = new Map<string, THREE.Vector3>()
