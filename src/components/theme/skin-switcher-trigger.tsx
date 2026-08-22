"use client"

import { useSyncExternalStore } from "react"
import { getTheme } from "@/lib/themes"
import { useTheme } from "@/components/theme/theme-provider"
import {
  getSkinPaletteServerSnapshot,
  getSkinPaletteSnapshot,
  subscribeSkinPalette,
  toggleSkinPalette,
} from "@/lib/skin-switcher-store"
import { cn } from "@/lib/utils"

/** Nav button that opens the shared Cmd+K skin palette. */
export function SkinSwitcherTrigger({ className }: { className?: string }) {
  const { theme } = useTheme()
  const open = useSyncExternalStore(
    subscribeSkinPalette,
    getSkinPaletteSnapshot,
    getSkinPaletteServerSnapshot
  )
  const current = getTheme(theme)

  return (
    <button
      type="button"
      onClick={toggleSkinPalette}
      aria-expanded={open}
      aria-haspopup="dialog"
      aria-label={`Skin: ${current.name}. Press Command K to switch`}
      className={cn(
        "v-chip h-9 gap-2.5 px-3 text-ink transition-colors hover:border-crimson",
        className
      )}
    >
      <Swatches colors={current.swatches} />
      <span className="v-mono hidden text-[10px] tracking-[0.18em] text-muted-ink uppercase sm:inline">
        {current.name}
      </span>
      <kbd className="v-mono hidden border border-ink/25 px-1.5 py-0.5 text-[9px] text-faint md:inline">
        ⌘K
      </kbd>
    </button>
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
