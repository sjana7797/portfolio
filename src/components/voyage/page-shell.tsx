import Link from "next/link"

/**
 * Wrapper for the standalone routes. The same sections appear inline on
 * the voyage page; here they get nav clearance and a way back to it, so
 * a deep link never feels like a dead end.
 */
export function PageShell({
  backTo,
  children,
}: {
  /** Anchor on the voyage page this route mirrors, e.g. "#voyage". */
  backTo: string
  children: React.ReactNode
}) {
  return (
    <div className="pt-16">
      {children}
      <div className="relative z-10 mx-auto max-w-[1500px] px-[5vw] pb-24">
        <Link
          href={`/${backTo}`}
          className="v-mono inline-flex items-center gap-2.5 border border-ink/25 bg-parchment/90 px-5 py-3.5 text-[11px] uppercase tracking-[0.18em] text-ink hover:border-crimson hover:text-crimson"
        >
          ← Back to the full voyage
        </Link>
      </div>
    </div>
  )
}
