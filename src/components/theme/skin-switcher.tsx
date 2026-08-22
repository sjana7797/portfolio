"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"
import { AnimatePresence, motion } from "framer-motion"
import { THEMES, getTheme, type ThemeId } from "@/lib/themes"
import { useTheme } from "@/components/theme/theme-provider"
import {
  getSkinPaletteServerSnapshot,
  getSkinPaletteSnapshot,
  setSkinPaletteOpen,
  subscribeSkinPalette,
  toggleSkinPalette,
} from "@/lib/skin-switcher-store"
import { cn } from "@/lib/utils"

const GROUP_ORDER = ["VOYAGE", "STRUCTURAL", "3D"] as const

type Pulse = {
  id: ThemeId
  color: string
  x: number
  y: number
  diameter: number
  stage: "grow" | "shrink"
}
type Select = (id: ThemeId, origin?: { x: number; y: number }) => void

/**
 * The Cmd+K skin palette, mounted once near the root. Selecting a skin
 * doesn't just flip `data-theme` — a colour circle grows from the
 * click (or screen centre, for a keyboard pick) to cover the viewport,
 * swaps the theme underneath it while the screen is hidden, then
 * shrinks away over the new skin. That hides the one-frame flash a
 * bare token swap would otherwise show.
 */
export function SkinSwitcher() {
  const { setTheme } = useTheme()
  const open = useSyncExternalStore(
    subscribeSkinPalette,
    getSkinPaletteSnapshot,
    getSkinPaletteServerSnapshot
  )
  const [pulse, setPulse] = useState<Pulse | null>(null)

  const select = useCallback<Select>((id, origin) => {
    const t = getTheme(id)
    const point = origin ?? {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }
    const diameter = Math.max(window.innerWidth, window.innerHeight) * 2.6
    setSkinPaletteOpen(false)
    setPulse({
      id,
      color: t.swatches[0],
      x: point.x,
      y: point.y,
      diameter,
      stage: "grow",
    })
  }, [])

  // Cmd+K / Ctrl+K toggles from anywhere, even while the panel is closed.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        toggleSkinPalette()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  return (
    <>
      <AnimatePresence>
        {open && <SkinPalettePanel onSelect={select} />}
      </AnimatePresence>

      {pulse && (
        <motion.div
          key={`${pulse.id}-${pulse.stage}`}
          aria-hidden
          className="pointer-events-none fixed rounded-full"
          style={{
            left: pulse.x,
            top: pulse.y,
            width: pulse.diameter,
            height: pulse.diameter,
            marginLeft: -pulse.diameter / 2,
            marginTop: -pulse.diameter / 2,
            background: pulse.color,
            zIndex: 200,
          }}
          initial={{ scale: pulse.stage === "grow" ? 0 : 1 }}
          animate={{ scale: pulse.stage === "grow" ? 1 : 0 }}
          transition={{
            duration: pulse.stage === "grow" ? 0.5 : 0.42,
            ease: [0.76, 0, 0.24, 1],
          }}
          onAnimationComplete={() => {
            if (pulse.stage === "grow") {
              setTheme(pulse.id)
              setPulse((p) => (p ? { ...p, stage: "shrink" } : p))
            } else {
              setPulse(null)
            }
          }}
        />
      )}
    </>
  )
}

/**
 * Mounted only while open, so `active` can seed itself from the current
 * theme with a lazy initializer instead of an effect resetting it on
 * every open.
 */
function SkinPalettePanel({ onSelect }: { onSelect: Select }) {
  const { theme } = useTheme()
  const [active, setActive] = useState(() =>
    THEMES.findIndex((t) => t.id === theme)
  )
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSkinPaletteOpen(false)
        return
      }
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActive((i) => Math.min(i + 1, THEMES.length - 1))
        return
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setActive((i) => Math.max(i - 1, 0))
        return
      }
      if (e.key === "Enter") {
        e.preventDefault()
        setActive((i) => {
          onSelect(THEMES[i].id)
          return i
        })
        return
      }
      const n = Number(e.key)
      if (Number.isInteger(n) && n >= 1 && n <= THEMES.length) {
        onSelect(THEMES[n - 1].id)
      }
    }
    const onDown = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node))
        setSkinPaletteOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onDown)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onDown)
    }
  }, [onSelect])

  return (
    <>
      <motion.div
        key="skin-scrim"
        className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
      />
      <motion.div
        key="skin-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Switch skin"
        className="v-card fixed top-[14vh] left-1/2 z-[71] w-[min(92vw,480px)] -translate-x-1/2 overflow-hidden p-0"
        initial={{ opacity: 0, y: -10, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="v-mono flex items-center justify-between border-b border-ink/15 px-4 py-3 text-[9.5px] tracking-[0.22em] text-faint uppercase">
          <span>Switch skin</span>
          <span>esc</span>
        </div>

        <div className="max-h-[56vh] overflow-y-auto p-2">
          {GROUP_ORDER.map((group) => {
            const items = THEMES.filter((t) => t.group === group)
            if (!items.length) return null
            return (
              <div key={group}>
                <div className="v-mono px-2.5 pt-3 pb-1.5 text-[9px] tracking-[0.2em] text-faint uppercase first:pt-1.5">
                  {group}
                </div>
                {items.map((t) => {
                  const idx = THEMES.findIndex((x) => x.id === t.id)
                  const isActive = idx === active
                  const isCurrent = t.id === theme
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="menuitemradio"
                      aria-checked={isCurrent}
                      onMouseEnter={() => setActive(idx)}
                      onClick={(e) =>
                        onSelect(t.id, { x: e.clientX, y: e.clientY })
                      }
                      className={cn(
                        "flex w-full items-start gap-3 px-2.5 py-2.5 text-left transition-colors",
                        isActive ? "bg-gold/25" : "hover:bg-gold/15"
                      )}
                    >
                      <span className="v-mono mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-ink/25 text-[11px] text-muted-ink">
                        {idx + 1}
                      </span>
                      <span className="mt-0.5 flex shrink-0 items-center">
                        {t.swatches.map((c, i) => (
                          <span
                            key={c}
                            className="h-3.5 w-3.5 border border-ink/35"
                            style={{
                              background: c,
                              marginLeft: i === 0 ? 0 : -5,
                              zIndex: 3 - i,
                            }}
                          />
                        ))}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="text-[14px] font-bold text-ink">
                            {t.name}
                          </span>
                          {isCurrent && (
                            <span className="v-mono text-[8.5px] tracking-[0.16em] text-crimson uppercase">
                              active
                            </span>
                          )}
                        </span>
                        <span className="v-mono mt-1 block text-[10px] tracking-[0.14em] text-muted-ink uppercase">
                          {t.tagline}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>

        <div className="v-mono flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-ink/15 px-4 py-2.5 text-[9px] tracking-[0.18em] text-faint uppercase">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>1–{THEMES.length} jump</span>
        </div>
      </motion.div>
    </>
  )
}
