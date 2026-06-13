import { useEffect, useState } from 'react'
import { Scene } from '@/three/Scene'
import { TopBar } from '@/components/TopBar'
import { Legend } from '@/components/Legend'
import { InfoPanel } from '@/components/InfoPanel'
import { TourBar } from '@/components/TourBar'
import { useViewerStore } from '@/store/useViewerStore'

export default function App() {
  const [legendOpen, setLegendOpen] = useState(false)
  const selectedId = useViewerStore((s) => s.selectedId)
  const tourActive = useViewerStore((s) => s.tourActive)
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 7000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0">
        <Scene />
      </div>

      <TopBar onToggleLegend={() => setLegendOpen((v) => !v)} />
      <Legend open={legendOpen} onClose={() => setLegendOpen(false)} />
      <InfoPanel />
      <TourBar />

      {showHint && !selectedId && !tourActive && (
        <div className="animate-fade-in pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 px-4 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:text-[11px]">
            Drag to orbit · scroll to zoom · tap a part
          </p>
        </div>
      )}
    </div>
  )
}
