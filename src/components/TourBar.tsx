import { useEffect, useState } from 'react'
import { useViewerStore } from '@/store/useViewerStore'
import { PART_MAP, TOUR_ORDER } from '@/data/parts'
import { PrevIcon, NextIcon, PlayIcon, PauseIcon, CloseIcon } from './icons'

const STEP_MS = 4000

export function TourBar() {
  const tourActive = useViewerStore((s) => s.tourActive)
  const tourIndex = useViewerStore((s) => s.tourIndex)
  const tourNext = useViewerStore((s) => s.tourNext)
  const tourPrev = useViewerStore((s) => s.tourPrev)
  const stopTour = useViewerStore((s) => s.stopTour)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (tourActive) setPlaying(true)
  }, [tourActive])

  useEffect(() => {
    if (!tourActive || !playing) return
    const t = setInterval(() => useViewerStore.getState().tourNext(), STEP_MS)
    return () => clearInterval(t)
  }, [tourActive, playing])

  if (!tourActive) return null
  const part = PART_MAP[TOUR_ORDER[tourIndex]]
  const total = TOUR_ORDER.length

  const btn =
    'grid size-8 place-items-center rounded-full text-ink transition-colors hover:bg-panel-2/70 hover:text-blue-bright'

  return (
    <div className="animate-fade-in pointer-events-auto absolute left-1/2 top-[94px] z-30 -translate-x-1/2 md:bottom-5 md:top-auto">
      <div className="glass relative flex items-center gap-1 rounded-full py-1.5 pl-2 pr-3">
        <button onClick={tourPrev} className={btn} aria-label="Previous part">
          <PrevIcon className="size-4" />
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          className={`${btn} text-amber hover:text-amber`}
          aria-label={playing ? 'Pause tour' : 'Play tour'}
        >
          {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
        </button>
        <button onClick={tourNext} className={btn} aria-label="Next part">
          <NextIcon className="size-4" />
        </button>

        <div className="mx-2 flex items-baseline gap-2">
          <span className="font-mono text-[11px] text-amber">
            {String(tourIndex + 1).padStart(2, '0')}
            <span className="text-faint">/{String(total).padStart(2, '0')}</span>
          </span>
          <span className="max-w-[150px] truncate font-display text-sm font-semibold text-ink">
            {part.name}
          </span>
        </div>

        <button
          onClick={stopTour}
          className="grid size-7 place-items-center rounded-full text-muted transition-colors hover:text-ink"
          aria-label="End tour"
        >
          <CloseIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}
