"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/components/theme/theme-provider"
import type { CursorStyle } from "@/lib/themes"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number // 1 → 0
  decay: number
  size: number
  foam: boolean
}

const MAX_PARTICLES = 320
/** Below this pointer speed (px/frame) the trail isn't making way. */
const MIN_SPEED = 0.6
/** Frames of stillness before the loop parks itself. */
const IDLE_FRAMES = 90

/**
 * Per-skin cursor-trail personality. Colours are CSS custom property
 * names, resolved against the live theme rather than hardcoded — so
 * "wake" reads as ocean spray under voyage and lantern-lit water under
 * midnight without two separate variants.
 */
type Variant = {
  shape: "circle" | "square"
  primary: string
  secondary: string
  ring: boolean
  decayScale: number
  sizeScale: number
}

const VARIANTS: Record<CursorStyle, Variant> = {
  // Foam-capped water wake — the original effect, One Piece skins only.
  wake: {
    shape: "circle",
    primary: "--color-parchment",
    secondary: "--color-sea",
    ring: true,
    decayScale: 1,
    sizeScale: 1,
  },
  // Hard offset squares, no fade blur — brutalism doesn't do soft edges.
  blocks: {
    shape: "square",
    primary: "--color-ink",
    secondary: "--color-crimson",
    ring: false,
    decayScale: 1.7,
    sizeScale: 1.05,
  },
  // A quiet, short dot trail — editorial and reading-room stay restrained.
  ink: {
    shape: "circle",
    primary: "--color-ink",
    secondary: "--color-ink",
    ring: false,
    decayScale: 2.4,
    sizeScale: 0.5,
  },
  // Short green blips with the odd amber one — a CRT phosphor trail.
  scan: {
    shape: "square",
    primary: "--color-ink",
    secondary: "--color-gold",
    ring: false,
    decayScale: 2.1,
    sizeScale: 0.75,
  },
  // Slow gold/teal sparkles drifting outward — stardust, not spray.
  orbit: {
    shape: "circle",
    primary: "--color-gold",
    secondary: "--color-sea",
    ring: false,
    decayScale: 1.2,
    sizeScale: 0.65,
  },
}

function resolveColor(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
}

/**
 * A short particle trail behind the pointer, restyled per skin: ocean
 * wake for the voyage themes, hard offset blocks for brutalism, a
 * quiet ink dot for the reading themes, phosphor blips for the
 * terminal, and slow sparkles for Log Pose.
 *
 * The loop stops itself once the pointer has been still for a moment
 * and the last particle has faded — an always-on rAF for a decorative
 * effect would compete with the WebGL scene for frame budget all day.
 */
export function CursorWake() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, cursor } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // No pointer to trail, or the visitor asked for less motion.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(hover: none), (pointer: coarse)").matches
    ) {
      return
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const variant = VARIANTS[cursor]
    const primary = resolveColor(variant.primary) || "#ffffff"
    const secondary = resolveColor(variant.secondary) || primary

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const particles: Particle[] = []
    let px = -1
    let py = -1
    let lastX = -1
    let lastY = -1
    let raf = 0
    let idle = 0
    let running = false

    const spawn = (
      x: number,
      y: number,
      dx: number,
      dy: number,
      speed: number
    ) => {
      // Unit vector along travel, and its perpendicular — the trail
      // draws backwards and spreads sideways from those two.
      const ux = dx / speed
      const uy = dy / speed
      const perpX = -uy
      const perpY = ux

      const spread = Math.min(9, 2 + speed * 0.25)
      const count = speed > 14 ? 3 : 2

      for (let i = 0; i < count; i++) {
        for (const side of [-1, 1]) {
          const jitter = (Math.random() - 0.5) * 3
          const back = 6 + Math.random() * 10
          particles.push({
            x: x - ux * back + perpX * (spread * side + jitter),
            y: y - uy * back + perpY * (spread * side + jitter),
            vx: perpX * side * (0.35 + Math.random() * 0.5) - ux * 0.5,
            vy: perpY * side * (0.35 + Math.random() * 0.5) - uy * 0.5,
            life: 1,
            decay: (0.014 + Math.random() * 0.016) * variant.decayScale,
            size:
              (2 + Math.random() * (speed > 10 ? 5 : 3)) * variant.sizeScale,
            foam: Math.random() < 0.55,
          })
        }
      }

      if (variant.ring && Math.random() < 0.12) {
        particles.push({
          x,
          y,
          vx: 0,
          vy: 0,
          life: 1,
          decay: 0.022 * variant.decayScale,
          size: 4 * variant.sizeScale,
          foam: false,
        })
      }

      if (particles.length > MAX_PARTICLES) {
        particles.splice(0, particles.length - MAX_PARTICLES)
      }
    }

    const draw = (
      x: number,
      y: number,
      size: number,
      alpha: number,
      color: string
    ) => {
      ctx.globalAlpha = alpha
      ctx.fillStyle = color
      if (variant.shape === "square") {
        ctx.fillRect(x - size / 2, y - size / 2, size, size)
      } else {
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const frame = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life -= p.decay
        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.96
        p.vy *= 0.96

        const a = p.life * p.life // ease the fade out

        if (p.foam) {
          draw(p.x, p.y, p.size * p.life, a * 0.85, primary)
        } else {
          draw(p.x, p.y, p.size * (1.4 - p.life * 0.4), a * 0.42, secondary)
          if (variant.ring) {
            ctx.globalAlpha = a * 0.3
            ctx.strokeStyle = primary
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size * (2.4 - p.life * 1.2), 0, Math.PI * 2)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      idle++
      if (idle > IDLE_FRAMES && particles.length === 0) {
        running = false
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        return
      }
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    }

    const onMove = (e: PointerEvent) => {
      px = e.clientX
      py = e.clientY
      if (lastX < 0) {
        lastX = px
        lastY = py
        return
      }
      const dx = px - lastX
      const dy = py - lastY
      const speed = Math.hypot(dx, dy)
      lastX = px
      lastY = py

      if (speed < MIN_SPEED) return
      idle = 0
      spawn(px, py, dx, dy, speed)
      start()
    }

    // A pointer that leaves the window shouldn't strand a frozen trail.
    const onLeave = () => {
      lastX = -1
      lastY = -1
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
    }
    // Re-run on theme change: colours are resolved from the live CSS
    // variables, and midnight/voyage share a variant but not a palette.
  }, [theme, cursor])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[95]"
    />
  )
}
