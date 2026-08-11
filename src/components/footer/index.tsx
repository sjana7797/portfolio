import Link from "next/link"
import { Mail } from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"

const socials = [
  { href: "https://github.com/sanjayjana", label: "GitHub", icon: GitHubIcon },
  { href: "https://linkedin.com/in/sanjayjana", label: "LinkedIn", icon: LinkedInIcon },
  { href: "mailto:sjana7797@gmail.com", label: "Email", icon: Mail },
]

export function Footer() {
  return (
    <footer
      className="relative z-10 flex flex-wrap items-center justify-between gap-5 border-t border-ink/20 px-[5vw] pb-11 pt-8"
      style={{ background: "var(--v-chrome)" }}
    >
      <div className="v-mono text-[11px] text-faint">
        © {new Date().getFullYear()} Sanjay Jana · the log continues
      </div>

      <div className="flex items-center gap-4">
        {socials.map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={label}
            className="text-muted-ink transition-colors hover:text-crimson"
          >
            <Icon className="h-4 w-4" />
          </Link>
        ))}
        <a href="#top" className="v-mono text-[11px] tracking-[0.16em]">
          BACK TO THE BOW ↑
        </a>
      </div>
    </footer>
  )
}
