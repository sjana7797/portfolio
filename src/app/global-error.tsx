"use client"

import { useEffect } from "react"

/**
 * Last-resort boundary: catches errors in the root layout itself, so
 * it replaces <html> and <body> entirely. Nothing from the layout is
 * available here — not the fonts, and not necessarily the stylesheet —
 * so every style is inline and every font is a system stack. If this
 * screen ever renders, the goal is legibility, not art direction.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Root layout error:", error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6vw",
          background: "linear-gradient(180deg,#2ea9d6 0%,#7fd3ea 40%,#f6e3bd 100%)",
          color: "#0f2036",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
        }}
      >
        <main
          style={{
            maxWidth: 620,
            width: "100%",
            background: "rgba(255,253,245,0.96)",
            border: "1px solid rgba(15,32,54,0.2)",
            padding: "40px 36px",
          }}
        >
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#4f6a80",
              marginBottom: 20,
            }}
          >
            Error 500 · ship lost
          </div>

          <h1
            style={{
              margin: "0 0 18px",
              fontSize: "clamp(38px,7vw,64px)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              fontWeight: 800,
            }}
          >
            THE WHOLE SHIP
            <br />
            <span style={{ color: "#b81d22" }}>WENT DOWN</span>
          </h1>

          <p
            style={{
              margin: "0 0 8px",
              fontSize: 17,
              lineHeight: 1.55,
              color: "#22374d",
            }}
          >
            Something failed at the root of the application, so nothing could be rendered.
            Reloading is the fastest fix.
          </p>

          {error.digest && (
            <p
              style={{
                margin: "0 0 24px",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "#4f6a80",
              }}
            >
              REFERENCE: {error.digest}
            </p>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
            <button
              type="button"
              onClick={reset}
              style={{
                cursor: "pointer",
                border: "none",
                background: "#f5c542",
                color: "#0f2036",
                padding: "16px 26px",
                fontSize: 14,
                fontWeight: 700,
                font: "inherit",
                fontFamily: "inherit",
              }}
            >
              Try again ↻
            </button>
            {/* Intentionally a plain anchor, not next/link: the root
                layout is what failed, so a hard navigation that rebuilds
                the whole app is the recovery, not a client-side push. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid rgba(15,32,54,0.35)",
                color: "#0f2036",
                padding: "16px 26px",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Back to the bow
            </a>
            <a
              href="mailto:sjana7797@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid rgba(15,32,54,0.35)",
                color: "#0f2036",
                padding: "16px 26px",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Report it
            </a>
          </div>
        </main>
      </body>
    </html>
  )
}
