import Link from "next/link"
import { ArrowRight, Download, Mail, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"

const roles = ["MERN Stack", "Next.js", "TypeScript", "AI Applications"]

const stats = [
  { value: "6+", label: "Years Experience" },
  { value: "5", label: "Companies" },
  { value: "3.8", label: "GPA · IIIT-B" },
  { value: "Mumbai", label: "India", icon: MapPin },
]

const socials = [
  { href: "https://github.com/sanjayjana", label: "GitHub", icon: GitHubIcon },
  { href: "https://linkedin.com/in/sanjayjana", label: "LinkedIn", icon: LinkedInIcon },
  { href: "mailto:sjana7797@gmail.com", label: "Email", icon: Mail },
]

export function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-3.5rem)] flex flex-col justify-center py-20 overflow-hidden">
      {/* Dot grid background */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-60" />

      {/* Radial glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative space-y-8">
        {/* Available badge */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-xs text-muted-foreground">Available for opportunities</span>
        </div>

        {/* Name */}
        <div className="space-y-1">
          <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase">Hi, I&apos;m</p>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-none">
            <span className="text-foreground">Sanjay</span>
            <br />
            <span className="gradient-text">Jana.</span>
          </h1>
        </div>

        {/* Role title */}
        <div>
          <p className="text-xl sm:text-2xl font-medium text-muted-foreground">
            Senior Full Stack Engineer
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {roles.map((r) => (
              <Badge key={r} variant="secondary" className="font-mono text-xs">
                {r}
              </Badge>
            ))}
          </div>
        </div>

        {/* Summary */}
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
          Results-driven engineer with 6+ years building scalable SaaS platforms and AI-driven
          applications. Deep expertise in MERN, Next.js, TypeScript, and LLM integration — from
          RAG pipelines to real-time fintech dashboards.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="gap-2" asChild>
            <a href="/resume.pdf" download>
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <Link href="/projects">
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-1">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="h-9 w-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        {/* Stats */}
        <Separator />
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label}>
              <p className="text-2xl font-bold flex items-center gap-1">
                {Icon && <Icon className="h-5 w-5 text-primary" />}
                {value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
