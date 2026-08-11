"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

/** Drop your track here. See public/audio/README.md. */
const TRACK_SRC = "/audio/theme.mp3"
const STORAGE_KEY = "voyage:music"
const TARGET_VOLUME = 0.32
const FADE_MS = 700

type Status = "checking" | "missing" | "ready"

/**
 * Background music with an on/off toggle.
 *
 * Notes on the behaviour that isn't obvious:
 * - Browsers block autoplay until a user gesture, so we never call
 *   play() on mount. If the visitor had it on last time, we arm a
 *   one-shot listener and start on their first click/keypress.
 * - Volume is faded rather than cut, so toggling isn't a thud.
 * - Audio pauses when the tab is hidden and resumes when it returns.
 * - If the mp3 isn't in place the control hides itself entirely
 *   rather than shipping a button that does nothing.
 */
export function MusicToggle({ className }: { className?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeRef = useRef<number | null>(null)
  const [status, setStatus] = useState<Status>("checking")
  const [playing, setPlaying] = useState(false)

  const fadeTo = useCallback((target: number, onDone?: () => void) => {
    const audio = audioRef.current
    if (!audio) return
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current)

    const from = audio.volume
    const start = performance.now()

    const step = (now: number) => {
      const k = Math.min(1, (now - start) / FADE_MS)
      audio.volume = from + (target - from) * k
      if (k < 1) {
        fadeRef.current = requestAnimationFrame(step)
      } else {
        fadeRef.current = null
        onDone?.()
      }
    }
    fadeRef.current = requestAnimationFrame(step)
  }, [])

  const start = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return false
    audio.volume = 0
    try {
      await audio.play()
    } catch {
      return false // still blocked
    }
    fadeTo(TARGET_VOLUME)
    setPlaying(true)
    return true
  }, [fadeTo])

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    fadeTo(0, () => audio.pause())
    setPlaying(false)
  }, [fadeTo])

  // Create the element once and find out whether the track exists.
  useEffect(() => {
    const audio = new Audio(TRACK_SRC)
    audio.loop = true
    // metadata only: enough to know the track exists and to show the
    // control, without pulling megabytes on every page load. The full
    // fetch happens when the visitor actually presses play.
    audio.preload = "metadata"
    audio.volume = 0
    audioRef.current = audio

    const ok = () => setStatus("ready")
    const fail = () => setStatus("missing")
    audio.addEventListener("canplaythrough", ok)
    audio.addEventListener("loadedmetadata", ok)
    audio.addEventListener("error", fail)
    audio.load()

    return () => {
      audio.removeEventListener("canplaythrough", ok)
      audio.removeEventListener("loadedmetadata", ok)
      audio.removeEventListener("error", fail)
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current)
      audio.pause()
      audioRef.current = null
    }
  }, [])

  // Restore the previous choice — but only on a real user gesture.
  useEffect(() => {
    if (status !== "ready") return
    if (localStorage.getItem(STORAGE_KEY) !== "on") return

    let done = false
    const arm = async () => {
      if (done) return
      done = true
      cleanup()
      await start()
    }
    const cleanup = () => {
      window.removeEventListener("pointerdown", arm)
      window.removeEventListener("keydown", arm)
    }

    // A gesture may already have happened (e.g. the click that
    // navigated here) — try once, fall back to waiting. Deferred off
    // the effect body so the optimistic attempt can't cascade a render.
    const attempt = setTimeout(() => {
      void start().then((ok) => {
        if (ok) {
          done = true
          return
        }
        window.addEventListener("pointerdown", arm, { once: true })
        window.addEventListener("keydown", arm, { once: true })
      })
    }, 0)

    return () => {
      clearTimeout(attempt)
      cleanup()
    }
  }, [status, start])

  // Don't play to an empty room.
  useEffect(() => {
    if (!playing) return
    const onVisibility = () => {
      const audio = audioRef.current
      if (!audio) return
      if (document.hidden) audio.pause()
      else void audio.play().catch(() => {})
    }
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [playing])

  const toggle = async () => {
    if (playing) {
      stop()
      localStorage.setItem(STORAGE_KEY, "off")
    } else {
      const ok = await start()
      if (ok) localStorage.setItem(STORAGE_KEY, "on")
    }
  }

  if (status !== "ready") return null

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Mute the voyage music" : "Play the voyage music"}
      title={playing ? "Mute" : "Play music"}
      className={cn(
        "group flex h-9 items-center gap-2 border border-ink/25 bg-parchment/90 px-3 text-ink",
        "transition-colors hover:border-crimson/60 hover:bg-parchment",
        className,
      )}
    >
      <EqualizerIcon playing={playing} />
      <span className="v-mono hidden text-[10px] uppercase tracking-[0.18em] text-muted-ink sm:inline">
        {playing ? "Sound on" : "Sound off"}
      </span>
    </button>
  )
}

/** Four bars that dance while playing and flatten to a mute glyph when not. */
function EqualizerIcon({ playing }: { playing: boolean }) {
  const bars = [
    { h: 7, delay: "0s", dur: "0.9s" },
    { h: 13, delay: "0.18s", dur: "1.15s" },
    { h: 10, delay: "0.36s", dur: "0.75s" },
    { h: 5, delay: "0.1s", dur: "1.3s" },
  ]
  return (
    <span aria-hidden className="flex h-4 w-4 items-end justify-center gap-[2px]">
      {bars.map((b, i) => (
        <span
          key={i}
          className="w-[2px] origin-bottom"
          style={{
            height: playing ? b.h : 3,
            background: playing ? "var(--color-crimson)" : "var(--color-faint)",
            transition: "height .35s cubic-bezier(.16,.84,.28,1), background .3s ease",
            animation: playing ? `v-eq ${b.dur} ${b.delay} ease-in-out infinite` : "none",
          }}
        />
      ))}
    </span>
  )
}
