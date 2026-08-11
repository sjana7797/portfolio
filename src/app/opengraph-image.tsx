import { ImageResponse } from "next/og"

export const alt = "Sanjay Jana — Senior Full Stack Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/**
 * Generated at build time so link previews carry the voyage palette
 * instead of a blank card. Kept to plain divs and system-weight text —
 * Satori supports a subset of CSS, and a custom font would mean
 * shipping the woff2 into the edge bundle for little gain here.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(160deg,#2ea9d6 0%,#7fd3ea 42%,#f6e3bd 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              background: "#f5c542",
              color: "#0f2036",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            SJ
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#22374d",
            }}
          >
            Sanjay Jana / Log
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#0a6285",
              marginBottom: 16,
            }}
          >
            Senior Full Stack Engineer
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 150,
              fontWeight: 800,
              lineHeight: 0.85,
              letterSpacing: -6,
              color: "#0f2036",
            }}
          >
            SANJAY
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 150,
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: -6,
              color: "#b81d22",
            }}
          >
            JANA
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 40,
            fontSize: 24,
            color: "#22374d",
            borderTop: "2px solid rgba(15,32,54,0.25)",
            paddingTop: 24,
          }}
        >
          <span>6+ years</span>
          <span>·</span>
          <span>AI platforms · LangChain · RAG</span>
          <span>·</span>
          <span>Next.js · TypeScript</span>
        </div>
      </div>
    ),
    size,
  )
}
