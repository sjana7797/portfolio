"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download, Mail, MapPin } from "lucide-react"
import { motion, useAnimation } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { fadeUp, stagger } from "@/lib/motion"

const ParticleCanvas = dynamic(
  () => import("./components/particle-canvas").then((m) => m.ParticleCanvas),
  { ssr: false },
)

const roles = ["MERN Stack", "Next.js", "TypeScript", "AI Applications"]

const stats = [
  { value: "6+",     label: "Years" },
  { value: "5",      label: "Companies" },
  { value: "3.8",    label: "GPA · IIIT-B" },
  { value: "Mumbai", label: "India", icon: MapPin },
]

const socials = [
  { href: "https://github.com/sanjayjana",      label: "GitHub",   icon: GitHubIcon },
  { href: "https://linkedin.com/in/sanjayjana", label: "LinkedIn", icon: LinkedInIcon },
  { href: "mailto:sjana7797@gmail.com",          label: "Email",    icon: Mail },
]

function AvatarCard() {
  const controls = useAnimation()
  let flipping = false

  async function handleFlip() {
    if (flipping) return
    flipping = true
    await controls.start({
      rotateY: [0, 180, 360],
      transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1] },
    })
    controls.set({ rotateY: 0 })
    flipping = false
  }

  return (
    // perspective wrapper — required for rotateY to look 3D
    <div style={{ perspective: "900px" }}>
      <motion.div
        className="relative cursor-pointer"
        animate={controls}
        whileHover={{ scale: 1.03 }}
        onClick={handleFlip}
        style={{ transformStyle: "preserve-3d" }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-xl bg-linear-to-br from-primary/30 via-primary/10 to-transparent blur-2xl scale-110 pointer-events-none" />
        <div className="relative w-[320px] xl:w-[360px] aspect-square rounded-xl overflow-hidden border border-border/30 bg-card/20 backdrop-blur-sm">
          <Image
            src="/avatar.png"
            alt="Sanjay Jana — anime avatar"
            width={720}
            height={720}
            priority
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
      </motion.div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-3.5rem)] flex flex-col justify-center py-16 overflow-hidden">
      {/* Background particle field */}
      <ParticleCanvas />

      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,oklch(0.6_0.22_265/0.12),transparent)]" />

      {/* Two-column grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-8 xl:gap-12 items-center">

        {/* ── Left: text content ─────────────────────────────────────────── */}
        <motion.div
          className="space-y-8"
          variants={stagger(0.09)}
          initial="hidden"
          animate="show"
        >
          {/* Available pill */}
          <motion.div variants={fadeUp} className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={fadeUp} className="space-y-1">
            <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase mb-3">
              Hi, I&apos;m
            </p>
            <h1 className="text-[clamp(3.2rem,9vw,6.5rem)] font-bold tracking-tight leading-[0.92]">
              <span className="block text-foreground">Sanjay</span>
              <span className="block gradient-text">Jana.</span>
            </h1>
          </motion.div>

          {/* Role + tags */}
          <motion.div variants={fadeUp} className="space-y-3">
            <p className="text-lg sm:text-xl font-medium text-muted-foreground">
              Senior Full Stack Engineer
            </p>
            <div className="flex flex-wrap gap-2">
              {roles.map((r) => (
                <Badge key={r} variant="secondary" className="font-mono text-[11px] px-2.5 py-1">
                  {r}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Summary */}
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-base sm:text-[17px] leading-[1.75] max-w-[500px]"
          >
            6+ years architecting scalable SaaS platforms and AI-driven
            applications — from RAG pipelines and LLM workflows to real-time
            fintech dashboards.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <Button size="lg" className="gap-2 h-11" asChild>
              <a href="/resume.pdf" download>
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 h-11 border-border/60 hover:border-primary/50 transition-colors"
              asChild
            >
              <Link href="/projects">
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Socials */}
          <motion.div variants={fadeUp} className="flex items-center gap-1">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="h-9 w-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-all duration-200"
              >
                <Icon className="size-4.5" />
              </a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp}>
            <Separator className="mb-7 opacity-50" />
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label}>
                  <p className="text-[20px] font-bold flex items-center gap-1 leading-none">
                    {Icon && <Icon className="h-4 w-4 text-primary" />}
                    {value}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1.5 tracking-wide">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right: avatar image ────────────────────────────────────────── */}
        <motion.div
          className="hidden lg:flex flex-col items-center justify-center"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.72, delay: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <AvatarCard />
        </motion.div>

      </div>
    </section>
  )
}
