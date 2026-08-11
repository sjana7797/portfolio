import { Reveal } from "@/components/voyage/reveal"

/** The "02 / THE ROUTE SO FAR ————" eyebrow that opens every section. */
export function SectionHeading({ index, label }: { index: string; label: string }) {
  return (
    <Reveal className="mb-11 flex items-center gap-4">
      <span className="v-chip v-mono text-[11px] tracking-[0.24em] text-sea">
        {index} / {label}
      </span>
      <span className="v-rule flex-1" />
    </Reveal>
  )
}

/** Section shell: consistent rhythm and max width across the voyage. */
export function Section({
  id,
  className = "",
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className={`relative z-10 mx-auto max-w-[1500px] px-[5vw] py-24 md:py-28 ${className}`}
    >
      {children}
    </section>
  )
}
