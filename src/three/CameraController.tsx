import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { useViewerStore } from '@/store/useViewerStore'
import { partFocusRegistry } from './partFocusRegistry'
import { CAR_TARGET, defaultCameraPosition } from './camera'

/**
 * Smoothly aims the camera at the selected part (and during the guided tour),
 * and eases back to the default framing when the view is reset. The user can
 * still orbit freely; we only nudge the orbit target, never fight their input.
 */
export function CameraController() {
  const controls = useThree((s) => s.controls) as OrbitControlsImpl | null
  const camera = useThree((s) => s.camera)
  const selectedId = useViewerStore((s) => s.selectedId)
  const resetNonce = useViewerStore((s) => s.cameraResetNonce)

  const desiredTarget = useRef(new THREE.Vector3().copy(CAR_TARGET))
  const homePos = useRef(defaultCameraPosition())
  const animating = useRef(false)
  const returningHome = useRef(false)

  // Keep the home framing correct across orientation / window resizes.
  useEffect(() => {
    const onResize = () => homePos.current.copy(defaultCameraPosition())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!selectedId) return
    const p = partFocusRegistry.get(selectedId)
    if (p) {
      desiredTarget.current.copy(p)
      animating.current = true
      returningHome.current = false
    }
  }, [selectedId])

  useEffect(() => {
    desiredTarget.current.copy(CAR_TARGET)
    homePos.current.copy(defaultCameraPosition())
    animating.current = true
    returningHome.current = true
  }, [resetNonce])

  useFrame(() => {
    if (!controls || !animating.current) return
    const target = controls.target
    target.lerp(desiredTarget.current, 0.1)
    if (returningHome.current) {
      camera.position.lerp(homePos.current, 0.1)
    }
    controls.update()
    if (target.distanceToSquared(desiredTarget.current) < 1e-5) {
      animating.current = false
      returningHome.current = false
    }
  })

  return null
}
