"use client"

import NextTopLoader from "nextjs-toploader"

export function TopLoader() {
  const color = "#f5c542"

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
