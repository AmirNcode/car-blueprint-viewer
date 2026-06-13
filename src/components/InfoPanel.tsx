import { useViewerStore } from '@/store/useViewerStore'
import { PART_MAP } from '@/data/parts'
import { SYSTEM_MAP } from '@/data/systems'
import { CornerTicks, Label } from './ui'
import { CloseIcon, ArrowIcon } from './icons'

export function InfoPanel() {
  const selectedId = useViewerStore((s) => s.selectedId)
  const select = useViewerStore((s) => s.select)
  const setHovered = useViewerStore((s) => s.setHovered)

  const part = selectedId ? PART_MAP[selectedId] : null
  if (!part) return null
  const system = SYSTEM_MAP[part.system]

  return (
    <section
      key={part.id}
      className="glass animate-fade-in pointer-events-auto absolute inset-x-0 bottom-0 z-30 flex max-h-[58%] flex-col rounded-t-2xl md:inset-x-auto md:bottom-4 md:right-4 md:top-[88px] md:max-h-none md:w-80 md:rounded-xl"
    >
      <CornerTicks />

      <div className="flex items-start justify-between gap-3 px-5 pt-4">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full" style={{ background: system.accent }} />
          <Label>{system.name}</Label>
        </div>
        <button
          onClick={() => select(null)}
          aria-label="Close"
          className="grid size-7 place-items-center rounded text-muted transition-colors hover:text-ink"
        >
          <CloseIcon className="size-4" />
        </button>
      </div>

      <div className="px-5 pb-2">
        <div className="flex items-baseline gap-2">
          <h2 className="font-display text-2xl font-bold leading-tight text-ink">{part.name}</h2>
          {part.count && (
            <span className="font-mono text-xs text-amber">×{part.count}</span>
          )}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{part.summary}</p>
      </div>

      <div className="scroll-thin flex-1 overflow-y-auto px-5 pb-5">
        <div className="mt-3">
          <Label>What it does</Label>
          <p className="mt-1.5 text-sm leading-relaxed text-ink/90">{part.func}</p>
        </div>

        <div className="mt-5">
          <Label>Connects to</Label>
          <ul className="mt-2 space-y-2.5">
            {part.connections.map((c, i) => {
              const clickable = c.to !== null && PART_MAP[c.to]
              return (
                <li key={i} className="flex gap-2.5">
                  <ArrowIcon className="mt-0.5 size-3.5 shrink-0 text-amber/80" />
                  <p className="text-[13px] leading-relaxed text-muted">
                    {clickable ? (
                      <button
                        onClick={() => select(c.to)}
                        onPointerEnter={() => setHovered(c.to)}
                        onPointerLeave={() => setHovered(null)}
                        className="font-medium text-blue-bright underline decoration-blue/40 underline-offset-2 transition-colors hover:text-amber"
                      >
                        {c.label}
                      </button>
                    ) : (
                      <span className="font-medium text-ink/80">{c.label}</span>
                    )}{' '}
                    — {c.why}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
