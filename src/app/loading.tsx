/**
 * Shown while a route segment streams in. The pages are static so this
 * is usually a flash at most, but it keeps navigation from looking
 * frozen on a slow connection.
 */
export default function Loading() {
  return (
    <div className="relative z-10 mx-auto flex min-h-svh max-w-[1500px] items-center px-[5vw]">
      <div className="v-chip">
        <span
          className="h-2 w-2 shrink-0 bg-crimson"
          style={{ animation: "v-blip 1.2s ease-in-out infinite" }}
        />
        <span className="v-mono text-[11px] uppercase tracking-[0.22em] text-muted-ink">
          Charting the route…
        </span>
      </div>
    </div>
  )
}
