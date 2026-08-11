"use client"

import { useEffect, useState } from "react"

const USER = "sanjayjana"
const DASH = "—"

type Stats = {
  repos: string
  stars: string
  followers: string
  note: string
}

const INITIAL: Stats = {
  repos: DASH,
  stars: DASH,
  followers: DASH,
  note: "Loading live from the GitHub API…",
}

/**
 * Live GitHub numbers, fetched client-side from the public API.
 * Unauthenticated requests are rate-limited (60/hr per IP), so a
 * failure is expected traffic, not an error — it degrades to dashes
 * and a link rather than surfacing a broken state.
 */
export function GitHubStats() {
  const [stats, setStats] = useState<Stats>(INITIAL)

  useEffect(() => {
    const ac = new AbortController()

    const load = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${USER}`, {
          signal: ac.signal,
        })
        if (!userRes.ok) throw new Error("user")
        const user = await userRes.json()

        setStats((s) => ({
          ...s,
          repos: String(user.public_repos),
          followers: String(user.followers),
          note: `Live from the GitHub API · member since ${String(user.created_at ?? "").slice(0, 4)}`,
        }))

        const repoRes = await fetch(
          `https://api.github.com/users/${USER}/repos?per_page=100`,
          { signal: ac.signal },
        )
        if (!repoRes.ok) throw new Error("repos")
        const repos: { stargazers_count?: number }[] = await repoRes.json()

        setStats((s) => ({
          ...s,
          stars: String(repos.reduce((a, b) => a + (b.stargazers_count ?? 0), 0)),
        }))
      } catch (err) {
        if ((err as Error).name === "AbortError") return
        setStats({
          ...INITIAL,
          note: "Live stats unavailable — open the profile ↗",
        })
      }
    }

    void load()
    return () => ac.abort()
  }, [])

  const cells = [
    { value: stats.repos, label: "Public repos" },
    { value: stats.stars, label: "Stars earned" },
    { value: stats.followers, label: "Followers" },
  ]

  return (
    <a
      href={`https://github.com/${USER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="v-card block px-7 py-7 text-ink transition-colors hover:border-crimson/50 hover:text-ink"
    >
      <div className="flex items-baseline justify-between gap-4">
        <div className="v-label">GitHub / {USER}</div>
        <span className="v-mono text-[11px] text-amber">↗</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-11">
        {cells.map((c) => (
          <div key={c.label}>
            <div className="v-display text-[34px] leading-none tracking-[-0.03em]">
              {c.value}
            </div>
            <div className="v-label mt-2">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="v-mono mt-5 text-[11px] text-faint">{stats.note}</div>
    </a>
  )
}
