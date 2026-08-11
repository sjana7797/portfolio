"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"
import { THEMES, getTheme } from "@/lib/themes"
import { useTheme } from "@/components/theme/theme-provider"
import { cn } from "@/lib/utils"

/**
 * Theme picker for the nav. Each option previews its own palette in the
 * swatch row, so the choice is made by looking rather than by reading
 * theme names that mean nothing out of context.
 */
export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const current = getTheme(theme)

  // Close on outside click and on Escape — a menu you can't dismiss
  // with the keyboard is a trap for anyone not using a mouse.
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Theme: ${current.name}. Change site theme`}
        className="v-chip h-9 gap-2.5 px-3 text-ink transition-colors hover:border-crimson"
      >
        <Swatches colors={current.swatches} />
        <span className="v-mono hidden text-[10px] uppercase tracking-[0.18em] text-muted-ink sm:inline">
          {current.name}
        </span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Site theme"
          className="v-card absolute right-0 top-[calc(100%+10px)] z-50 w-[286px] p-2"
          style={{ boxShadow: "0 26px 60px -30px rgb(0 0 0 / 0.55)" }}
        >
          <div className="v-mono px-2.5 pb-2 pt-1.5 text-[9.5px] uppercase tracking-[0.22em] text-faint">
            Choose a variant
          </div>

          {THEMES.map((t) => {
            const active = t.id === theme
            return (
              <button
                key={t.id}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setTheme(t.id)
                  setOpen(false)
                }}
                className={cn(
                  "flex w-full items-start gap-3 px-2.5 py-2.5 text-left transition-colors",
                  active ? "bg-gold/25" : "hover:bg-gold/15",
                )}
              >
                <span className="mt-0.5 shrink-0">
                  <Swatches colors={t.swatches} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-ink">{t.name}</span>
                    {t.id === "voyage" && (
                      <span className="v-mono text-[8.5px] uppercase tracking-[0.16em] text-faint">
                        default
                      </span>
                    )}
                  </span>
                  <span className="v-mono mt-1 block text-[10px] uppercase tracking-[0.14em] text-muted-ink">
                    {t.tagline}
                  </span>
                </span>
                {active && <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-crimson" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/** Three stacked colour chips previewing a theme's palette. */
function Swatches({ colors }: { colors: readonly string[] }) {
  return (
    <span aria-hidden className="flex items-center">
      {colors.map((c, i) => (
        <span
          key={c}
          className="h-3.5 w-3.5 border border-ink/35"
          style={{ background: c, marginLeft: i === 0 ? 0 : -5, zIndex: 3 - i }}
        />
      ))}
    </span>
  )
}
