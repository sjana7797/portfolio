/**
 * The Cmd+K palette is mounted once; the nav renders two trigger
 * buttons (desktop + mobile, swapped by CSS). Both need to open the
 * same palette instance, so "is it open" lives here as external state
 * rather than in either trigger's own component tree.
 */
const listeners = new Set<() => void>()
let open = false

function emit() {
  for (const l of listeners) l()
}

export function subscribeSkinPalette(onChange: () => void) {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

export function getSkinPaletteSnapshot() {
  return open
}

export function getSkinPaletteServerSnapshot() {
  return false
}

export function setSkinPaletteOpen(value: boolean) {
  if (open === value) return
  open = value
  emit()
}

export function toggleSkinPalette() {
  setSkinPaletteOpen(!open)
}
