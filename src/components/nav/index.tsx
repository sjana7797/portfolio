"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { MusicToggle } from "@/components/voyage/music-toggle"
import { SkinSwitcherTrigger } from "@/components/theme/skin-switcher-trigger"

/**
 * Each stop on the voyage exists twice: as an anchor on the single
 * scrolling page, and as its own route for deep links and SEO. The nav
 * always points at the anchor (works from any page — Next scrolls to
 * the hash after navigating); the `route` is what marks a standalone
 * page as current.
 */
const stops = [
  { n: "01", label: "About", hash: "#about", route: "/about" },
  { n: "02", label: "Route", hash: "#voyage", route: "/experience" },
  { n: "03", label: "Bounties", hash: "#racks", route: "/projects" },
  { n: "04", label: "Kit", hash: "#stack", route: "/skills" },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const onVoyage = pathname === "/"

  const href = (hash: string) => (onVoyage ? hash : `/${hash}`)

  return (
    <header
      className="v-nav fixed inset-x-0 top-0 z-40 border-b border-ink/20 backdrop-blur-xl"
      style={{ background: "var(--v-chrome)" }}
    >
      <div className="v-nav-bar flex items-center justify-between gap-5 px-[5vw] py-3">
        <Link
          href="/"
          className="flex items-center gap-3 text-ink hover:text-ink"
        >
          <span className="v-display grid h-8 w-8 place-items-center bg-gold text-sm text-ink">
            SJ
          </span>
          <span className="v-mono text-[10.5px] tracking-[0.2em] text-muted-ink uppercase">
            Sanjay Jana / Log
          </span>
        </Link>

        {/* desktop */}
        <nav className="v-nav-links hidden items-center gap-7 lg:flex">
          {stops.map((s) => (
            <a
              key={s.hash}
              href={href(s.hash)}
              className={cn(
                "v-mono text-[10.5px] tracking-[0.16em] uppercase transition-colors",
                pathname === s.route
                  ? "text-crimson"
                  : "text-muted-ink hover:text-crimson"
              )}
            >
              <span className="text-faint">{s.n}</span> {s.label}
            </a>
          ))}
          <Link
            href="/resume"
            className={cn(
              "v-mono text-[10.5px] tracking-[0.16em] uppercase transition-colors",
              pathname === "/resume"
                ? "text-crimson"
                : "text-muted-ink hover:text-crimson"
            )}
          >
            <span className="text-faint">05</span> Resume
          </Link>
          <SkinSwitcherTrigger />
          <MusicToggle />
          <a
            href={href("#contact")}
            className="v-mono bg-gold px-4 py-2.5 text-[10.5px] font-bold tracking-[0.16em] text-ink uppercase transition-colors hover:bg-crimson hover:text-parchment"
          >
            Hire me
          </a>
        </nav>

        {/* mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <SkinSwitcherTrigger />
          <MusicToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center border border-ink/25 bg-parchment/90 text-ink"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink/15 bg-parchment/95 px-[5vw] py-4 lg:hidden">
          <div className="flex flex-col">
            {stops.map((s) => (
              <a
                key={s.hash}
                href={href(s.hash)}
                onClick={() => setOpen(false)}
                className="v-mono border-b border-ink/10 py-3 text-[11px] tracking-[0.18em] text-muted-ink uppercase"
              >
                <span className="text-faint">{s.n}</span> {s.label}
              </a>
            ))}
            <Link
              href="/resume"
              onClick={() => setOpen(false)}
              className="v-mono border-b border-ink/10 py-3 text-[11px] tracking-[0.18em] text-muted-ink uppercase"
            >
              <span className="text-faint">05</span> Resume
            </Link>
            <a
              href={href("#contact")}
              onClick={() => setOpen(false)}
              className="v-mono mt-4 bg-gold px-4 py-3 text-center text-[11px] font-bold tracking-[0.18em] text-ink uppercase"
            >
              Hire me
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
