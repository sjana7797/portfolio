"use client"

import { useEffect } from "react"
import Link from "next/link"

/**
 * Route-level error boundary. Keeps the nav, footer and 3D backdrop
 * from the root layout — only the page content is replaced, so a
 * failure still looks like the site rather than a browser error.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Swap for your error reporter (Sentry, etc.) when you add one.
    console.error("Page error:", error)
  }, [error])

  return (
    <div className="relative z-10 mx-auto flex min-h-svh max-w-[1500px] flex-col justify-center gap-10 px-[5vw] py-32">
      <div className="v-chip self-start">
        <span
          className="h-2 w-2 shrink-0 bg-crimson"
          style={{ animation: "v-blip 1.4s ease-in-out infinite" }}
        />
        <span className="v-mono text-[11px] uppercase tracking-[0.22em] text-muted-ink">
          Error 500 · taking on water
        </span>
      </div>

      <div>
        <div className="v-mono mb-3.5 text-[clamp(11px,1.1vw,14px)] uppercase tracking-[0.3em] text-sea">
          Something broke below deck
        </div>
        <h1 className="v-display m-0 text-[clamp(56px,12vw,190px)] leading-[0.82] tracking-[-0.05em]">
          ALL HANDS
          <br />
          <span className="text-crimson">ON DECK</span>
        </h1>
      </div>

      <div className="v-prose max-w-[58ch]">
        <p className="m-0 text-pretty text-[clamp(17px,1.4vw,21px)] leading-[1.5] text-body">
          This page hit an error while rendering. Trying again usually clears it — if it
          doesn&rsquo;t, the rest of the voyage is still afloat.
        </p>
        {error.digest && (
          <p className="v-mono m-0 mt-4 text-[11px] tracking-[0.14em] text-faint">
            REFERENCE: {error.digest}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex cursor-pointer items-center gap-2.5 border-none bg-gold px-7 py-4 text-sm font-bold text-ink transition-colors hover:bg-crimson hover:text-parchment"
        >
          Try again ↻
        </button>
        <Link
          href="/"
          className="inline-flex items-center border border-ink/35 bg-parchment/70 px-7 py-4 text-sm font-semibold text-ink transition-colors hover:border-crimson hover:text-crimson"
        >
          Back to the bow
        </Link>
        <a
          href="mailto:sjana7797@gmail.com"
          className="inline-flex items-center border border-ink/35 bg-parchment/70 px-7 py-4 text-sm font-semibold text-ink transition-colors hover:border-crimson hover:text-crimson"
        >
          Report it
        </a>
      </div>
    </div>
  )
}
