import { Reveal } from "@/components/voyage/reveal"
import { Section, SectionHeading } from "@/components/voyage/section-heading"
import { projects } from "@/features/projects/data"

/** Blinking lights down the spine of each bounty card. Token-based so
 *  they take the active theme's accents rather than voyage's. */
const lights = ["var(--color-sea)", "var(--color-gold)", "var(--color-crimson)"]

export function ProjectsSection() {
  return (
    <Section id="racks">
      <SectionHeading
        index="03"
        label={`THE BOUNTY BOARD · ${numberWord(projects.length)} CATCHES`}
      />

      <div className="mb-14 grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <h2 className="v-display m-0 text-[clamp(40px,7vw,118px)] leading-[0.88] tracking-[-0.05em]">
          WHAT I&rsquo;VE
          <br />
          CLAIMED
        </h2>
        <p className="v-prose m-0 text-[17px] leading-[1.55] text-body">
          Production work and personal builds. Every catch below is something
          real that someone depends on.
        </p>
      </div>

      <div className="v-rack-list grid gap-4.5">
        {projects.map((p, i) => (
          <Reveal
            as="article"
            key={p.title}
            className="v-card v-rack grid grid-cols-[52px_1fr] md:grid-cols-[62px_1fr]"
          >
            {/* spine */}
            <div className="flex flex-col items-center gap-2 border-r border-ink/20 py-6">
              <span className="v-mono text-[11px] text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              {lights.slice(0, 2 + (i % 2)).map((c, k) => (
                <span
                  key={k}
                  className="h-1.5 w-1.5"
                  style={{
                    background: c,
                    animation: `v-blip ${1.6 + ((i + k) % 5) * 0.4}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>

            <div className="grid gap-8 px-6 py-7 md:px-8 lg:grid-cols-[1.25fr_0.75fr]">
              <div>
                <div className="v-mono flex flex-wrap items-center gap-2.5 text-[10px] tracking-[0.2em] text-sea uppercase">
                  <span>
                    {p.category} · {p.type === "work" ? "Work" : "Personal"}
                  </span>
                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber underline-offset-4 hover:underline"
                    >
                      {p.href.replace(/^https?:\/\//, "")} ↗
                    </a>
                  )}
                </div>

                <h3 className="v-display m-0 mt-2.5 mb-3 text-[clamp(26px,3.2vw,46px)] leading-none tracking-[-0.035em]">
                  {p.title}
                </h3>
                <p className="m-0 max-w-[60ch] text-[16px] leading-[1.55] text-body">
                  {p.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="v-tag v-tag-amber">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="m-0 grid list-none content-start gap-2.5 border-ink/20 p-0 lg:border-l lg:pl-6">
                {p.highlights.map((h) => (
                  <li
                    key={h}
                    className="v-mono text-[12.5px] leading-[1.45] text-muted-ink"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function numberWord(n: number) {
  const words = [
    "ZERO",
    "ONE",
    "TWO",
    "THREE",
    "FOUR",
    "FIVE",
    "SIX",
    "SEVEN",
    "EIGHT",
    "NINE",
    "TEN",
  ]
  return words[n] ?? String(n)
}
