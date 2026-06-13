"use client"

import Link from "next/link"
import { ArrowRight, Brain, Building2, Layers } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { fadeUp, scaleIn, stagger, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

const pillars = [
  {
    icon: Layers,
    title: "Full Stack Architecture",
    description:
      "End-to-end ownership from React/Next.js UIs to Node.js backends — shipping production-ready features with performance and DX in mind.",
  },
  {
    icon: Brain,
    title: "AI & LLM Integration",
    description:
      "Multi-model AI platforms with LangChain, RAG pipelines, Ollama, and Hugging Face — bridging LLMs and real product value.",
  },
  {
    icon: Building2,
    title: "Scalable SaaS Platforms",
    description:
      "6+ years delivering high-performance SaaS across fintech, e-commerce, and enterprise — focused on reliability and business impact.",
  },
]

export function About() {
  return (
    <section className="py-24 border-t border-border/40">
      <motion.div
        className="space-y-12"
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="max-w-2xl">
          <p className="section-heading">About</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            Engineering at the intersection of{" "}
            <span className="gradient-text">product & technology</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-[1.8] text-[15px]">
            I&apos;m a Senior Full Stack Engineer based in Mumbai, passionate
            about building systems that scale. My experience spans B2B SaaS,
            fintech platforms, AI-powered applications, and banking — always
            with a focus on code quality and measurable impact.
          </p>
          <p className="mt-3 text-muted-foreground leading-[1.8] text-[15px]">
            Currently at{" "}
            <span className="text-foreground font-medium">Enso WebWorks</span>,
            architecting multi-model AI platforms and shared internal services.
            PG in Software Development from{" "}
            <span className="text-foreground font-medium">IIIT Bangalore</span>{" "}
            (GPA 3.8/4.0).
          </p>
            <Link href="/experience" className={
              cn(buttonVariants({ variant: "ghost", size: "sm" }), "mt-5 gap-2 px-0 hover:px-0 hover:bg-transparent text-primary hover:text-primary/80")
            }>
              View full experience
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
        </motion.div>

        {/* Pillars */}
        <motion.div
          className="grid sm:grid-cols-3 gap-4"
          variants={stagger(0.1)}
        >
          {pillars.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} variants={scaleIn}>
              <Card className="border-border/40 bg-card/30 h-full hover:border-primary/30 hover:bg-card/60 transition-all duration-300">
                <CardContent className="pt-6 space-y-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-[1.75]">
                    {description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
