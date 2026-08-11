const words: { text: string; tone?: string }[] = [
  { text: "NEXT.JS" },
  { text: "LANGCHAIN", tone: "var(--color-amber)" },
  { text: "TYPESCRIPT" },
  { text: "RAG" },
  { text: "NODE.JS", tone: "var(--color-sea)" },
  { text: "POSTGRES" },
  { text: "MONGODB" },
  { text: "OLLAMA", tone: "var(--color-crimson)" },
]

/** Endless ticker of the kit. Content is doubled so the -50% slide loops seamlessly. */
export function Marquee() {
  return (
    <div
      className="relative z-10 overflow-hidden border-y border-ink/20 py-5"
      style={{ background: "rgb(255 253 245 / 0.94)" }}
    >
      <div
        className="flex w-max gap-12 whitespace-nowrap"
        style={{ animation: "v-drift 26s linear infinite" }}
      >
        {[...words, ...words].map((w, i) => (
          <span
            key={i}
            className="v-display text-[28px] tracking-[-0.02em]"
            style={{ color: w.tone ?? "rgb(15 32 54 / 0.34)" }}
          >
            {w.text}
          </span>
        ))}
      </div>
    </div>
  )
}
