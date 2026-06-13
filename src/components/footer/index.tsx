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
    <footer className="border-t border-border/50 mt-24">
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold h-6 w-6 rounded bg-primary text-primary-foreground flex items-center justify-center">
            SJ
          </span>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sanjay Jana. Built with Next.js & shadcn.
          </p>
        </div>
        <div className="flex items-center gap-1">
          {socials.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
