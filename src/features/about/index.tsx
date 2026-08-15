import { Section, SectionHeading } from "@/components/voyage/section-heading"

const pillars = [
  {
    label: "Full stack architecture",
    tone: "text-sea",
    body: "End-to-end ownership from React/Next.js UIs down to Node.js services — shipped with performance and DX in mind.",
  },
  {
    label: "AI & LLM integration",
    tone: "text-amber",
    body: "LangChain, RAG pipelines, Ollama, Hugging Face — bridging models and product value, not chatbot theatre.",
  },
  {
    label: "Scale under pressure",
    tone: "text-crimson",
    body: "Fintech, e-commerce and enterprise loads — reliability first, then the number that proves it.",
  },
]

export function About() {
  return (
    <Section id="about">
      <SectionHeading index="01" label="WHO’S SAILING" />

      <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h2 className="v-display m-0 mb-7 text-[clamp(34px,4.6vw,72px)] leading-[0.95]">
            I don&rsquo;t ship demos.
            <br />I ship things that{" "}
            <span className="text-crimson">stay up</span>.
          </h2>
          <p className="v-prose m-0 mb-4 max-w-[60ch] text-[18px] leading-[1.62] text-pretty text-body">
            Senior Full Stack Engineer in Mumbai. My work spans B2B SaaS,
            fintech, AI-powered products and enterprise banking — the
            through-line is code quality and measurable impact, not the
            framework of the month.
          </p>
          <p className="v-prose m-0 max-w-[60ch] text-[18px] leading-[1.62] text-pretty text-body">
            Right now I&rsquo;m at Enso WebWorks architecting multi-model AI
            platforms and shared internal services other teams plug straight
            into. PG in Software Development from IIIT Bangalore, GPA 3.8/4.0.
            Next heading: bigger systems, sharper constraints, a crew worth the
            trip.
          </p>
        </div>

        <div className="v-grid grid content-start">
          {pillars.map((p) => (
            <div key={p.label} className="px-6 py-6">
              <div
                className={`v-mono text-[10px] tracking-[0.2em] uppercase ${p.tone}`}
              >
                {p.label}
              </div>
              <p className="m-0 mt-2.5 text-[15px] leading-[1.55] text-body">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
