"use client"

import { useState, type FormEvent } from "react"
import { Section, SectionHeading } from "@/components/voyage/section-heading"

const EMAIL = "sjana7797@gmail.com"

const terms = [
  { k: "TERMS", v: "Full-time senior / staff roles" },
  { k: "BASE", v: "Remote, or Mumbai hybrid" },
  { k: "SPEC", v: "AI platforms · fintech · SaaS" },
]

const links = [
  { label: "EMAIL ↗", href: `mailto:${EMAIL}` },
  { label: "GITHUB ↗", href: "https://github.com/sanjayjana" },
  { label: "LINKEDIN ↗", href: "https://linkedin.com/in/sanjayjana" },
  { label: "RESUME ↓", href: "/resume.pdf" },
]

export function ContactSection() {
  const [note, setNote] = useState("")

  /** No backend on this site — compose the mail client instead. */
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get("name") ?? "")
    const email = String(form.get("email") ?? "")
    const subject = String(form.get("subject") ?? "") || "Hello Sanjay"
    const message = String(form.get("message") ?? "")

    const body = `From: ${name} <${email}>\n\n${message}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    setNote("Opening your mail client…")
  }

  return (
    <Section id="contact" className="pb-32">
      <SectionHeading index="05" label="TERMS OF ENGAGEMENT" />

      <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        {/* ---- wanted poster ---- */}
        <div
          className="border bg-sand px-8 pt-8 pb-7 text-sand-ink"
          style={{
            borderColor: "var(--v-poster-edge)",
            boxShadow: "var(--v-poster-shadow)",
          }}
        >
          <div className="border-b-[3px] border-double border-sand-ink pb-3.5 text-center">
            <div
              className="text-[clamp(46px,6.4vw,86px)] leading-[0.9] tracking-[0.02em]"
              style={{ fontFamily: "var(--font-poster), serif" }}
            >
              WANTED
            </div>
            <div className="v-mono mt-2 text-[11px] tracking-[0.34em]">
              HIRED OR CONSULTED
            </div>
          </div>

          <div className="border-b border-sand-ink/40 py-5 text-center">
            <div
              className="text-[clamp(28px,3.6vw,46px)] leading-none"
              style={{ fontFamily: "var(--font-poster), serif" }}
            >
              SANJAY JANA
            </div>
            <div className="v-mono mt-2.5 text-[11px] tracking-[0.18em] text-[#5a4429]">
              SENIOR FULL STACK ENGINEER · MUMBAI, IN
            </div>
          </div>

          <div className="grid gap-3 py-5">
            {terms.map((t) => (
              <div key={t.k} className="flex items-baseline gap-3">
                <span className="v-mono min-w-[62px] text-[10px] tracking-[0.18em] text-[#6b5133]">
                  {t.k}
                </span>
                <span className="text-[16px] font-bold">{t.v}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3.5 border-t-[3px] border-double border-sand-ink pt-4">
            <a
              href={`mailto:${EMAIL}`}
              className="v-mono text-[11px] text-[#5a4429] hover:text-[#b0231a]"
            >
              {EMAIL}
            </a>
            <div
              className="border-2 border-[#a51d15] px-2.5 py-1.5 text-[13px] text-[#a51d15]"
              style={{
                fontFamily: "var(--font-poster), serif",
                transform: "rotate(-4deg)",
              }}
            >
              AVAILABLE
            </div>
          </div>
        </div>

        {/* ---- form ---- */}
        <div>
          <h2 className="v-display m-0 mb-3.5 text-[clamp(38px,6vw,92px)] leading-[0.88] tracking-[-0.05em]">
            SET A
            <br />
            COURSE
          </h2>
          <p className="v-prose m-0 mb-7 max-w-[50ch] text-[17px] leading-[1.55] text-body">
            Tell me what you&rsquo;re building and where it hurts. I answer
            everything within a day.
          </p>

          <form onSubmit={onSubmit} className="grid gap-3.5">
            <div className="grid gap-3.5 sm:grid-cols-2">
              <input
                className="v-field"
                name="name"
                required
                placeholder="Your name"
                aria-label="Your name"
              />
              <input
                className="v-field"
                name="email"
                type="email"
                required
                placeholder="Email"
                aria-label="Email"
              />
            </div>
            <input
              className="v-field"
              name="subject"
              placeholder="Role, project or company"
              aria-label="Role, project or company"
            />
            <textarea
              className="v-field resize-y"
              name="message"
              required
              rows={5}
              placeholder="What are we building?"
              aria-label="What are we building?"
            />
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="cursor-pointer border-none bg-crimson px-7 py-4 text-sm font-bold text-parchment transition-colors hover:bg-ink"
              >
                Send the message →
              </button>
              <span className="v-mono text-[11px] text-muted-ink" role="status">
                {note}
              </span>
            </div>
          </form>

          <div className="mt-8 flex flex-wrap gap-6 border-t border-ink/20 pt-6">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  l.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                download={
                  l.href.endsWith(".pdf") ? "Sanjay-Jana-Resume.pdf" : undefined
                }
                className="v-mono text-[12px] tracking-[0.1em]"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
