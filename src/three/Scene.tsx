import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Car } from './Car'
import { CameraController } from './CameraController'
import { CAMERA_FOV, CAR_TARGET, defaultCameraPosition } from './camera'
import { useViewerStore } from '@/store/useViewerStore'
import { COLORS } from '@/lib/theme'

export function Scene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: defaultCameraPosition().toArray(), fov: CAMERA_FOV, near: 0.1, far: 100 }}
      gl={{ antialias: true }}
      onPointerMissed={() => useViewerStore.getState().select(null)}
    >
      <color attach="background" args={[COLORS.background]} />
      <fog attach="fog" args={[COLORS.background, 10, 26]} />

      <Car />

      <Grid
        position={[0, 0.001, 0]}
        args={[60, 60]}
        cellSize={0.5}
        cellThickness={0.6}
        cellColor="#16264a"
        sectionSize={2.5}
        sectionThickness={1}
        sectionColor="#264c88"
        fadeDistance={28}
        fadeStrength={1.5}
        infiniteGrid
      />

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        minDistance={2.4}
        maxDistance={22}
        target={CAR_TARGET}
        maxPolarAngle={Math.PI * 0.92}
      />

      <CameraController />

      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.72} luminanceSmoothing={0.2} intensity={0.95} />
      </EffectComposer>
    </Canvas>
  )
}
