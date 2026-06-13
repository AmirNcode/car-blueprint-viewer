import type { ButtonHTMLAttributes, ReactNode } from 'react'

/** Decorative blueprint corner ticks drawn inside a panel. */
export function CornerTicks() {
  const c = 'absolute h-2 w-2 border-amber/60'
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <span className={`${c} left-0 top-0 border-l border-t`} />
      <span className={`${c} right-0 top-0 border-r border-t`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
    </div>
  )
}

export function IconButton({
  active = false,
  className = '',
  children,
  ...rest
}: { active?: boolean; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`grid size-9 shrink-0 place-items-center rounded-md border transition-colors duration-150 ${
        active
          ? 'border-amber/70 bg-amber/15 text-amber'
          : 'border-line bg-panel/50 text-ink hover:border-blue/60 hover:text-blue-bright'
      } ${className}`}
    >
      {children}
    </button>
  )
}

/** Uppercase mono section label used throughout the HUD. */
export function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[10px] uppercase tracking-[0.18em] text-muted ${className}`}>
      {children}
    </span>
  )
}
