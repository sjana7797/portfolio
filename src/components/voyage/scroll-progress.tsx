"use client"

import { useEffect, useRef } from "react"

/** Thin sea-to-gold-to-crimson bar tracking scroll depth of the voyage. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (barRef.current) barRef.current.style.width = `${(p * 100).toFixed(2)}%`
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div
      ref={barRef}
      aria-hidden
      className="fixed left-0 top-0 z-[90] h-[3px] w-0"
      style={{ background: "linear-gradient(90deg,#0a6285,#f5c542 60%,#b81d22)" }}
    />
  )
}
