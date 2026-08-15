/**
 * The marker that opens each section.
 *
 * Stacked, not two-column: the older shape put the label in a boxed chip
 * on the left with a rule running off to the right, which is the
 * hanging-header pattern — the most reliable "templated editorial" tell
 * there is. Label sits on its own line, hairline runs the full measure
 * beneath it, heading follows in the same column.
 *
 * The number stays because this site is a ship's log and the sections
 * are genuinely sequential; ordinal content is the one case where a
 * numbered eyebrow earns its place rather than decorating.
 *
 * Deliberately not scroll-revealed. This fires once per section, so
 * animating it meant every section faded in and the page never settled.
 */
export function SectionHeading({
  index,
  label,
}: {
  index?: string
  label: string
}) {
  return (
    <div className="v-section-head mb-11">
      <span className="v-mono block text-[11px] tracking-[0.24em] text-sea">
        {index ? (
          <>
            <span className="text-faint">{index}</span> {label}
          </>
        ) : (
          label
        )}
      </span>
      <span className="v-rule mt-3.5 block w-full" />
    </div>
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
    <section id={id} className={`v-section relative z-10 mx-auto ${className}`}>
      {children}
    </section>
  )
}
