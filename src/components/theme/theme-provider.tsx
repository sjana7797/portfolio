"use client"

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import {
  DEFAULT_THEME,
  THEME_IDS,
  THEME_STORAGE_KEY,
  getTheme,
  isThemeId,
  type Backdrop,
  type CursorStyle,
  type ThemeId,
} from "@/lib/themes"

/* ------------------------------------------------------------------
   The active theme lives on <html data-theme>, written before paint by
   the init script below. That attribute is the source of truth, so this
   is external state — read it with useSyncExternalStore rather than
   copying it into React state inside an effect, which would mean a
   render in the default theme followed by a second render in the real
   one on every load.
   ------------------------------------------------------------------ */

const listeners = new Set<() => void>()
let snapshot: ThemeId | null = null

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

function getSnapshot(): ThemeId {
  if (snapshot === null) {
    const attr = document.documentElement.dataset.theme
    snapshot = isThemeId(attr) ? attr : DEFAULT_THEME
  }
  return snapshot
}

/** The server has no DOM and no storage, so it always renders default. */
function getServerSnapshot(): ThemeId {
  return DEFAULT_THEME
}

function applyTheme(id: ThemeId) {
  snapshot = id
  document.documentElement.dataset.theme = id
  try {
    localStorage.setItem(THEME_STORAGE_KEY, id)
  } catch {
    // private mode — the choice simply won't persist
  }
  for (const listener of listeners) listener()
}

/**
 * Runs before first paint, inlined in <head>. Kept dependency-free and
 * tiny because it blocks parsing; the theme id list is injected from
 * THEME_IDS so it can't drift from the registry.
 */
export const themeInitScript = `
(function(){try{
var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
var ok=${JSON.stringify(THEME_IDS)};
document.documentElement.dataset.theme=(t&&ok.indexOf(t)>-1)?t:${JSON.stringify(DEFAULT_THEME)};
}catch(e){document.documentElement.dataset.theme=${JSON.stringify(DEFAULT_THEME)}}})();
`

type ThemeContextValue = {
  theme: ThemeId
  backdrop: Backdrop
  character: boolean
  cursor: CursorStyle
  setTheme: (id: ThemeId) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const setTheme = useCallback((id: ThemeId) => applyTheme(id), [])
  const active = getTheme(theme)

  return (
    <ThemeContext.Provider
      value={{
        theme,
        backdrop: active.backdrop,
        character: active.character,
        cursor: active.cursor,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>")
  return ctx
}
