"use client"

import { useEffect, useRef, type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Scroll-triggered reveal. Uses IntersectionObserver + a CSS class
 * rather than framer-motion: these fire on nearly every block of the
 * page, and one observer is far cheaper than dozens of motion values
 * competing with the WebGL render loop for frame budget.
 */
export function Reveal({
  as: Tag = "div",
  className,
  children,
  ...rest
}: {
  as?: ElementType
  className?: string
  children: ReactNode
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in")
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in")
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={cn("v-reveal", className)} {...rest}>
      {children}
    </Tag>
  )
}
