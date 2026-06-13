import { useMemo } from 'react'
import { useViewerStore } from '@/store/useViewerStore'
import { PARTS } from '@/data/parts'
import { SYSTEMS } from '@/data/systems'
import { Label } from './ui'
import { SearchIcon, CloseIcon, EyeIcon } from './icons'

export function Legend({ open, onClose }: { open: boolean; onClose: () => void }) {
  const selectedId = useViewerStore((s) => s.selectedId)
  const toggleSelect = useViewerStore((s) => s.toggleSelect)
  const setHovered = useViewerStore((s) => s.setHovered)
  const isolatedSystem = useViewerStore((s) => s.isolatedSystem)
  const toggleIsolatedSystem = useViewerStore((s) => s.toggleIsolatedSystem)
  const query = useViewerStore((s) => s.searchQuery)
  const setQuery = useViewerStore((s) => s.setSearchQuery)

  const q = query.trim().toLowerCase()
  const groups = useMemo(
    () =>
      SYSTEMS.map((sys) => ({
        sys,
        parts: PARTS.filter(
          (p) => p.system === sys.id && (q === '' || p.name.toLowerCase().includes(q)),
        ),
      })).filter((g) => g.parts.length > 0),
    [q],
  )

  const pick = (id: string) => {
    if (selectedId !== id) toggleSelect(id)
    onClose()
  }

  return (
    <>
      {/* mobile scrim */}
      {open && (
        <div className="pointer-events-auto absolute inset-0 z-20 bg-midnight/60 md:hidden" onClick={onClose} />
      )}

      <aside
        className={`glass pointer-events-auto absolute bottom-0 left-0 top-0 z-30 flex w-[84%] max-w-[330px] flex-col transition-transform duration-300 md:bottom-4 md:left-4 md:top-[88px] md:w-72 md:max-w-none md:rounded-xl ${
          open ? 'translate-x-0' : '-translate-x-[105%]'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <Label>Systems & Parts</Label>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid size-7 place-items-center rounded text-muted hover:text-ink md:hidden"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>

        <div className="px-3 pt-3">
          <div className="flex items-center gap-2 rounded-md border border-line bg-midnight/40 px-2.5 py-1.5 focus-within:border-blue/60">
            <SearchIcon className="size-4 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search parts…"
              className="w-full bg-transparent font-mono text-xs text-ink placeholder:text-faint focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Clear search" className="text-muted hover:text-ink">
                <CloseIcon className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        <nav className="scroll-thin mt-2 flex-1 overflow-y-auto px-3 pb-4">
          {groups.length === 0 && (
            <p className="px-1 py-6 text-center font-mono text-xs text-faint">No parts match “{query}”.</p>
          )}
          {groups.map(({ sys, parts }) => {
            const isolated = isolatedSystem === sys.id
            return (
              <div key={sys.id} className="mb-3">
                <div className="flex items-center gap-2 px-1 py-1.5">
                  <span className="size-2 rounded-full" style={{ background: sys.accent }} />
                  <span className="flex-1 font-display text-[13px] font-semibold tracking-wide text-ink">
                    {sys.name}
                  </span>
                  <button
                    onClick={() => toggleIsolatedSystem(sys.id)}
                    title="Isolate this system"
                    aria-label={`Isolate ${sys.name}`}
                    className={`grid size-6 place-items-center rounded transition-colors ${
                      isolated ? 'bg-amber/15 text-amber' : 'text-faint hover:text-blue-bright'
                    }`}
                  >
                    <EyeIcon className="size-3.5" />
                  </button>
                </div>
                <ul className="mt-0.5 space-y-0.5 border-l border-line pl-2">
                  {parts.map((p) => {
                    const active = selectedId === p.id
                    return (
                      <li key={p.id}>
                        <button
                          onClick={() => pick(p.id)}
                          onPointerEnter={() => setHovered(p.id)}
                          onPointerLeave={() => setHovered(null)}
                          className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left text-[13px] transition-colors ${
                            active
                              ? 'bg-amber/15 text-amber'
                              : 'text-muted hover:bg-panel-2/60 hover:text-ink'
                          }`}
                        >
                          <span className="flex-1 truncate">{p.name}</span>
                          {p.count && (
                            <span className="font-mono text-[10px] text-faint">×{p.count}</span>
                          )}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
