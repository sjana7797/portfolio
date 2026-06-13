"use client"

import NextTopLoader from "nextjs-toploader"
import { useTheme } from "next-themes"

export function TopLoader() {
  const { resolvedTheme } = useTheme()
  const color = resolvedTheme === "dark" ? "#6366f1" : "#4f46e5"

  return (
    <NextTopLoader
      color={color}
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow={`0 0 10px ${color},0 0 5px ${color}`}
    />
  )
}
