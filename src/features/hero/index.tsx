import { Reveal } from "@/components/voyage/reveal"

const stats = [
  { value: "6+", label: "Years at sea" },
  { value: "5", label: "Ports of call" },
  { value: "50%", label: "Load time cut at MintOak", accent: true },
  { value: "3.8", label: "GPA · IIIT-Bangalore" },
]

export function Hero() {
  return (
    <header
      id="top"
      className="relative z-10 mx-auto flex min-h-svh max-w-[1500px] flex-col justify-center gap-11 px-[5vw] pb-16 pt-32"
    >
      <div className="v-chip self-start">
        <span
          className="h-2 w-2 shrink-0 bg-crimson"
          style={{ animation: "v-blip 2.6s ease-in-out infinite" }}
        />
        <span className="v-mono text-[11px] uppercase tracking-[0.22em] text-muted-ink">
          Log entry 001 · Mumbai, IN · currently at Enso WebWorks
        </span>
      </div>

      <div>
        <div className="v-mono mb-3.5 text-[clamp(11px,1.1vw,14px)] uppercase tracking-[0.3em] text-sea">
          Senior Full Stack Engineer
        </div>
        <h1 className="v-display m-0 text-[clamp(64px,15.5vw,250px)] leading-[0.8] tracking-[-0.055em]">
          SANJAY
          <br />
          <span className="text-crimson">JANA</span>
        </h1>
      </div>

      <div className="grid items-end gap-11 lg:grid-cols-[1.1fr_0.9fr]">
        <p className="v-prose m-0 max-w-[54ch] text-pretty text-[clamp(17px,1.55vw,23px)] leading-[1.5] text-body">
          Six years, five ports, one heading. I build the systems that carry weight —
          multi-model AI platforms on LangChain and RAG, fintech dashboards that stay fast
          when the data gets ugly, design systems other engineers actually reach for. I&rsquo;m
          going to build the thing that outlives the sprint. That&rsquo;s not a wish, it&rsquo;s the
          route.
        </p>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <a
            href="#racks"
            className="inline-flex items-center gap-2.5 bg-gold px-7 py-4 text-sm font-bold text-ink transition-colors hover:bg-crimson hover:text-parchment"
          >
            See the bounties →
          </a>
          <a
            href="/resume.pdf"
            download="Sanjay-Jana-Resume.pdf"
            className="inline-flex items-center border border-ink/35 bg-parchment/70 px-7 py-4 text-sm font-semibold text-ink transition-colors hover:border-crimson hover:text-crimson"
          >
            Resume ↓
          </a>
        </div>
      </div>

      <Reveal className="v-grid grid grid-cols-2 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="px-6 py-5">
            <div
              className={`v-display text-[40px] leading-none tracking-[-0.04em] ${
                s.accent ? "text-crimson" : ""
              }`}
            >
              {s.value}
            </div>
            <div className="v-label mt-2">{s.label}</div>
          </div>
        ))}
      </Reveal>

      <div className="v-chip v-mono self-start text-[10px] uppercase tracking-[0.24em] text-muted-ink">
        <span>Scroll to set sail</span>
        <span
          className="h-px w-16"
          style={{ background: "linear-gradient(90deg,var(--color-faint),transparent)" }}
        />
      </div>
    </header>
  )
}
