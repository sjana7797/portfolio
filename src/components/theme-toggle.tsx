"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  function handleToggle(e: React.MouseEvent<HTMLButtonElement>) {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"

    // Fallback for browsers without View Transitions API
    if (!("startViewTransition" in document)) {
      setTheme(newTheme)
      return
    }

    // Pin the click origin so the circle expands from the button
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.round(rect.left + rect.width / 2)
    const y = Math.round(rect.top + rect.height / 2)
    document.documentElement.style.setProperty("--vt-x", `${x}px`)
    document.documentElement.style.setProperty("--vt-y", `${y}px`)
    document.documentElement.dataset.themeTransitioning = "1"

    const t = (document as Document & {
      startViewTransition: (cb: () => void) => { finished: Promise<void> }
    }).startViewTransition(() => {
      setTheme(newTheme)
    })

    t.finished.finally(() => {
      delete document.documentElement.dataset.themeTransitioning
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      aria-label="Toggle theme"
      className="h-8 w-8"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
