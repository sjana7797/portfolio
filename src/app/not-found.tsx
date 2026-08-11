import type { Metadata } from "next"
import Link from "next/link"
import { routes } from "@/lib/site"

export const metadata: Metadata = {
  title: "Off the map",
  description: "That page isn't on the chart. Head back to the voyage.",
  // A 404 must never be indexed, whatever the sitewide default says.
  robots: { index: false, follow: true },
}

const labels: Record<string, string> = {
  "/": "The full voyage",
  "/about": "About",
  "/experience": "Experience",
  "/projects": "Projects",
  "/skills": "Skills",
  "/contact": "Contact",
}

export default function NotFound() {
  return (
    <div className="relative z-10 mx-auto flex min-h-svh max-w-[1500px] flex-col justify-center gap-10 px-[5vw] py-32">
      <div className="v-chip self-start">
        <span className="h-2 w-2 shrink-0 bg-crimson" />
        <span className="v-mono text-[11px] uppercase tracking-[0.22em] text-muted-ink">
          Error 404 · position unknown
        </span>
      </div>

      <div>
        <div className="v-mono mb-3.5 text-[clamp(11px,1.1vw,14px)] uppercase tracking-[0.3em] text-sea">
          Off the map
        </div>
        <h1 className="v-display m-0 text-[clamp(64px,14vw,220px)] leading-[0.8] tracking-[-0.055em]">
          LOST AT
          <br />
          <span className="text-crimson">SEA</span>
        </h1>
      </div>

      <p className="v-prose m-0 max-w-[54ch] text-pretty text-[clamp(17px,1.4vw,21px)] leading-[1.5] text-body">
        This page isn&rsquo;t on any chart I&rsquo;ve drawn. The link may be old, or the
        page may have been renamed. Every port below is still open.
      </p>

      <nav className="v-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className="group flex items-center justify-between gap-4 px-6 py-5 text-ink hover:text-crimson"
          >
            <span className="text-[17px] font-bold">{labels[route.path]}</span>
            <span className="v-mono text-[13px] text-faint group-hover:text-crimson">
              →
            </span>
          </Link>
        ))}
      </nav>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 bg-gold px-7 py-4 text-sm font-bold text-ink transition-colors hover:bg-crimson hover:text-parchment"
        >
          ← Back to the bow
        </Link>
        <a
          href="mailto:sjana7797@gmail.com"
          className="inline-flex items-center border border-ink/35 bg-parchment/70 px-7 py-4 text-sm font-semibold text-ink transition-colors hover:border-crimson hover:text-crimson"
        >
          Tell me what broke
        </a>
      </div>
    </div>
  )
}
