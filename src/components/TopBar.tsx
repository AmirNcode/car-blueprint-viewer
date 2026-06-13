import { useViewerStore } from '@/store/useViewerStore'
import { CornerTicks, IconButton } from './ui'
import { ExplodeIcon, ResetIcon, TourIcon, MenuIcon } from './icons'

export function TopBar({ onToggleLegend }: { onToggleLegend: () => void }) {
  const exploded = useViewerStore((s) => s.exploded)
  const toggleExploded = useViewerStore((s) => s.toggleExploded)
  const tourActive = useViewerStore((s) => s.tourActive)
  const startTour = useViewerStore((s) => s.startTour)
  const stopTour = useViewerStore((s) => s.stopTour)
  const reset = useViewerStore((s) => s.reset)

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-3 sm:p-4">
      <div className="glass animate-fade-in pointer-events-auto relative rounded-lg px-3 py-2 sm:px-4 sm:py-2.5">
        <CornerTicks />
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleLegend}
            aria-label="Open parts list"
            className="grid size-8 place-items-center rounded-md border border-line text-muted hover:text-ink md:hidden"
          >
            <MenuIcon className="size-5" />
          </button>
          <div>
            <h1 className="font-display text-base font-bold leading-none tracking-wide text-ink sm:text-lg">
              CAR<span className="text-amber">·</span>BLUEPRINT
            </h1>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:text-[11px]">
              Inline-6 · RWD · Manual
            </p>
          </div>
        </div>
      </div>

      <div className="animate-fade-in pointer-events-auto flex items-center gap-2">
        <IconButton active={exploded} onClick={toggleExploded} title="Exploded view" aria-label="Toggle exploded view">
          <ExplodeIcon className="size-5" />
        </IconButton>
        <IconButton
          active={tourActive}
          onClick={() => (tourActive ? stopTour() : startTour())}
          title="Guided tour"
          aria-label="Toggle guided tour"
        >
          <TourIcon className="size-5" />
        </IconButton>
        <IconButton onClick={reset} title="Reset view" aria-label="Reset view">
          <ResetIcon className="size-5" />
        </IconButton>
      </div>
    </header>
  )
}
