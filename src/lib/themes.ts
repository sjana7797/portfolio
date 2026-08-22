/**
 * Site variants.
 *
 * A theme is purely a block of CSS custom properties in themes.css,
 * selected by `data-theme` on <html>. Because every Tailwind utility
 * compiles to `var(--color-…)`, redefining those variables re-skins the
 * whole site — no component knows which theme is active.
 *
 * `backdrop` is the one thing CSS can't express: whether the page sits
 * on the 3D ocean, and in which mood. `character` and `cursor` are the
 * other two things a stylesheet can't decide on its own — whether the
 * straw-hat captain belongs in this skin, and which cursor-trail
 * personality fits it.
 */
export const THEMES = [
  {
    id: "voyage",
    name: "Grand Line",
    tagline: "One Piece · day at sea",
    description: "The default voyage — 3D ocean, straw hats, parchment cards.",
    backdrop: "ocean-day",
    swatches: ["#2ea9d6", "#f5c542", "#b81d22"],
    group: "VOYAGE",
    character: true,
    cursor: "wake",
  },
  {
    id: "midnight",
    name: "Night Watch",
    tagline: "One Piece · after dark",
    description: "Same voyage, sailed at night. Deep navy, lantern gold.",
    backdrop: "ocean-night",
    swatches: ["#071624", "#f0c14b", "#e0362c"],
    group: "VOYAGE",
    character: true,
    cursor: "wake",
  },
  {
    id: "brutalism",
    name: "Brutalist",
    tagline: "Hard edges · offset shadows",
    description: "Black borders, acid yellow, no rounding, nothing subtle.",
    backdrop: "grid",
    swatches: ["#ffe500", "#000000", "#2323ff"],
    group: "STRUCTURAL",
    character: false,
    cursor: "blocks",
  },
  {
    id: "editorial",
    name: "Editorial",
    tagline: "Swiss · quiet and precise",
    description: "Paper white, hairline rules, a single ink accent.",
    backdrop: "paper",
    swatches: ["#faf9f7", "#1a1a1a", "#1d4ed8"],
    group: "STRUCTURAL",
    character: false,
    cursor: "ink",
  },
  {
    id: "logpose",
    name: "Log Pose",
    tagline: "New World · sailed by instrument",
    description:
      "A star compass over open water — drifting needle, deep indigo, no horizon.",
    backdrop: "starfield",
    swatches: ["#0a1128", "#f2c14b", "#7ec8e3"],
    group: "3D",
    character: false,
    cursor: "orbit",
  },
  {
    id: "reading-room",
    name: "Reading Room",
    tagline: "Library quiet · long-form",
    description:
      "Warm cream, a serif column, a drop cap on the first line — read, don't scan.",
    backdrop: "paper",
    swatches: ["#f7efe0", "#3a2c1a", "#5a1f1a"],
    group: "STRUCTURAL",
    character: false,
    cursor: "ink",
  },
  {
    id: "terminal",
    name: "Terminal",
    tagline: "Phosphor green · CRT",
    description:
      "Black screen, green mono type, a blinking cursor after every heading.",
    backdrop: "grid",
    swatches: ["#050705", "#39ff6a", "#f2b544"],
    group: "STRUCTURAL",
    character: false,
    cursor: "scan",
  },
  {
    id: "onecolumn",
    name: "Field Notes",
    tagline: "One column · no noise",
    description:
      "A single centered column and nothing else — no rack grid, no sidebar, just the next line.",
    backdrop: "paper",
    swatches: ["#fafafa", "#111111", "#6b6b6b"],
    group: "STRUCTURAL",
    character: false,
    cursor: "ink",
  },
  {
    id: "twocolumn",
    name: "Broadsheet",
    tagline: "Two columns · newspaper split",
    description:
      "Runs in two justified columns with a rule down the gutter, headline spanning both — read it like print.",
    backdrop: "paper",
    swatches: ["#f4f1ea", "#1a1a1a", "#8a1f11"],
    group: "STRUCTURAL",
    character: false,
    cursor: "ink",
  },
  {
    id: "devmode",
    name: "Source",
    tagline: "IDE · dark mode, three.js",
    description:
      "A file tree, line numbers, a dark editor pane — and a wireframe mesh drifting behind it all.",
    backdrop: "wireframe",
    swatches: ["#1e1e1e", "#569cd6", "#4ec9b0"],
    group: "3D",
    character: false,
    cursor: "scan",
  },
] as const

export type ThemeId = (typeof THEMES)[number]["id"]
export type Backdrop = (typeof THEMES)[number]["backdrop"]
export type CursorStyle = (typeof THEMES)[number]["cursor"]

export const DEFAULT_THEME: ThemeId = "voyage"
export const THEME_STORAGE_KEY = "voyage:theme"

export const THEME_IDS = THEMES.map((t) => t.id) as readonly ThemeId[]

export function isThemeId(value: unknown): value is ThemeId {
  return (
    typeof value === "string" &&
    (THEME_IDS as readonly string[]).includes(value)
  )
}

export function getTheme(id: ThemeId) {
  return THEMES.find((t) => t.id === id) ?? THEMES[0]
}
