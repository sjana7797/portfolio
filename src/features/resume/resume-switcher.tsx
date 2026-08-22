"use client"

import { cn } from "@/lib/utils"

export type ResumeLayoutId = "simple" | "two-column" | "dev" | "reel"

const LAYOUT_TABS: { id: ResumeLayoutId; label: string }[] = [
  { id: "simple", label: "Simple" },
  { id: "two-column", label: "Two-Column" },
  { id: "dev", label: "Dev" },
  { id: "reel", label: "Reel" },
]

/**
 * Local to /resume — deliberately not the site-wide Cmd+K skin
 * switcher. These are four takes on the same document, not site skins,
 * and picking one shouldn't touch the rest of the site.
 */
export function ResumeSwitcher({
  active,
  onSelect,
}: {
  active: ResumeLayoutId
  onSelect: (id: ResumeLayoutId) => void
}) {
  return (
    <div className="sticky top-16 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 bg-white/95 px-[5vw] py-3 backdrop-blur">
      <div className="flex flex-wrap gap-1.5">
        {LAYOUT_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            aria-pressed={active === tab.id}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors",
              active === tab.id
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 text-neutral-500 hover:border-neutral-500 hover:text-neutral-900"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <a
        href="/resume.pdf"
        download
        className="rounded-full bg-amber-500 px-4 py-1.5 text-[11px] font-semibold tracking-[0.1em] text-neutral-950 uppercase transition-colors hover:bg-amber-400"
      >
        Download PDF
      </a>
    </div>
  )
}
