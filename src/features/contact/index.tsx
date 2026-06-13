"use client"

import { useState } from "react"
import { ArrowUpRight, CheckCheck, Copy, Mail, MapPin, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { fadeUp, scaleIn, stagger } from "@/lib/motion"

const EMAIL = "sjana7797@gmail.com"

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    desc: "Best for project inquiries",
    color: "from-blue-500/10 to-indigo-500/10 border-blue-500/20 hover:border-blue-500/50",
    iconColor: "text-blue-400 bg-blue-400/10",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "sanjayjana",
    href: "https://linkedin.com/in/sanjayjana",
    desc: "Connect professionally",
    color: "from-sky-500/10 to-blue-600/10 border-sky-500/20 hover:border-sky-500/50",
    iconColor: "text-sky-400 bg-sky-400/10",
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    value: "sanjayjana",
    href: "https://github.com/sanjayjana",
    desc: "See my open source work",
    color: "from-slate-500/10 to-slate-600/10 border-slate-500/20 hover:border-slate-500/50",
    iconColor: "text-slate-300 bg-slate-400/10",
  },
]

const availability = [
  "Full-time Roles",
  "Contract / Freelance",
  "Technical Consulting",
  "AI & LLM Projects",
]

function CopyEmailButton() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.button
      onClick={copy}
      className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="font-mono text-xs">{EMAIL}</span>
      <span className="h-6 w-6 flex items-center justify-center rounded border border-border/60 group-hover:border-primary/40 transition-colors">
        {copied ? (
          <CheckCheck className="h-3 w-3 text-emerald-400" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
      </span>
    </motion.button>
  )
}

export function ContactSection() {
  return (
    <section className="py-4">
      <motion.div
        className="space-y-16"
        variants={stagger(0.1)}
        initial="hidden"
        animate="show"
      >
        {/* Heading */}
        <motion.div variants={fadeUp} className="space-y-5 max-w-2xl">
          <p className="section-heading">Contact</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Let&apos;s build something{" "}
            <span className="gradient-text">great.</span>
          </h1>
          <p className="text-muted-foreground text-[15px] sm:text-base leading-[1.8] max-w-lg">
            I&apos;m always open to new opportunities, collaborations, and
            interesting conversations. Whether you have a project in mind or
            just want to connect — reach out.
          </p>
          <CopyEmailButton />
        </motion.div>

        {/* Contact channels */}
        <motion.div variants={stagger(0.1)} className="grid sm:grid-cols-3 gap-4">
          {channels.map(({ icon: Icon, label, value, href, desc, color, iconColor }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              variants={scaleIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className={`group relative p-5 rounded-xl border bg-gradient-to-br ${color} transition-all duration-300 cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${iconColor}`}>
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </div>
              <p className="font-semibold text-sm">{label}</p>
              <p className="font-mono text-[11px] text-muted-foreground mt-0.5">{value}</p>
              <p className="text-[11.5px] text-muted-foreground/60 mt-2">{desc}</p>
            </motion.a>
          ))}
        </motion.div>

        {/* Availability */}
        <motion.div variants={fadeUp} className="space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <p className="text-sm font-medium">Available for</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {availability.map((item) => (
              <motion.span
                key={item}
                className="px-3.5 py-1.5 rounded-full border border-border/50 text-[12.5px] text-muted-foreground bg-secondary/30 hover:border-primary/40 hover:text-foreground transition-all duration-200 cursor-default"
                whileHover={{ scale: 1.04 }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-3 py-8 border-t border-border/40"
        >
          <MessageSquare className="h-4 w-4 text-primary" />
          <p className="text-sm text-muted-foreground">
            Based in{" "}
            <span className="text-foreground inline-flex items-center gap-1">
              <MapPin className="h-3 w-3 text-primary inline" />
              Mumbai, India
            </span>{" "}
            · Open to remote opportunities worldwide
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
