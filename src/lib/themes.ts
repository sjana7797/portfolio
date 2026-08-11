/**
 * Site variants.
 *
 * A theme is purely a block of CSS custom properties in themes.css,
 * selected by `data-theme` on <html>. Because every Tailwind utility
 * compiles to `var(--color-…)`, redefining those variables re-skins the
 * whole site — no component knows which theme is active.
 *
 * `backdrop` is the one thing CSS can't express: whether the page sits
 * on the 3D ocean, and in which mood.
 */
export const THEMES = [
  {
    id: "voyage",
    name: "Grand Line",
    tagline: "One Piece · day at sea",
    description: "The default voyage — 3D ocean, straw hats, parchment cards.",
    backdrop: "ocean-day",
    swatches: ["#2ea9d6", "#f5c542", "#b81d22"],
  },
  {
    id: "midnight",
    name: "Night Watch",
    tagline: "One Piece · after dark",
    description: "Same voyage, sailed at night. Deep navy, lantern gold.",
    backdrop: "ocean-night",
    swatches: ["#071624", "#f0c14b", "#e0362c"],
  },
  {
    id: "brutalism",
    name: "Brutalist",
    tagline: "Hard edges · offset shadows",
    description: "Black borders, acid yellow, no rounding, nothing subtle.",
    backdrop: "grid",
    swatches: ["#ffe500", "#000000", "#2323ff"],
  },
  {
    id: "editorial",
    name: "Editorial",
    tagline: "Swiss · quiet and precise",
    description: "Paper white, hairline rules, a single ink accent.",
    backdrop: "paper",
    swatches: ["#faf9f7", "#1a1a1a", "#1d4ed8"],
  },
] as const

export type ThemeId = (typeof THEMES)[number]["id"]
export type Backdrop = (typeof THEMES)[number]["backdrop"]

export const DEFAULT_THEME: ThemeId = "voyage"
export const THEME_STORAGE_KEY = "voyage:theme"

export const THEME_IDS = THEMES.map((t) => t.id) as readonly ThemeId[]

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && (THEME_IDS as readonly string[]).includes(value)
}

export function getTheme(id: ThemeId) {
  return THEMES.find((t) => t.id === id) ?? THEMES[0]
}
