import Link from "next/link"
import { ArrowRight, Brain, Building2, Layers } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const pillars = [
  {
    icon: Layers,
    title: "Full Stack Architecture",
    description:
      "From crafting pixel-perfect UIs with React/Next.js to designing robust Node.js backends — I ship end-to-end, production-ready features.",
  },
  {
    icon: Brain,
    title: "AI & LLM Integration",
    description:
      "Building multi-model AI platforms with LangChain, RAG pipelines, Ollama, and Hugging Face — bridging the gap between LLMs and real product value.",
  },
  {
    icon: Building2,
    title: "Scalable SaaS Platforms",
    description:
      "6+ years delivering high-performance SaaS products across fintech, e-commerce, and enterprise — with a focus on DX, performance, and business impact.",
  },
]

export function About() {
  return (
    <section className="py-20 border-t border-border/50">
      <div className="space-y-10">
        <div className="max-w-2xl">
          <p className="section-heading">About</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Engineering at the intersection of{" "}
            <span className="gradient-text">product & technology</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            I&apos;m a Senior Full Stack Engineer based in Mumbai with a passion for building systems
            that scale. My experience spans B2B SaaS, fintech platforms, AI-powered applications,
            and banking systems — always with a focus on code quality, developer experience, and
            measurable impact.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Currently at{" "}
            <span className="text-foreground font-medium">Enso WebWorks</span>, where I architect
            multi-model AI platforms and shared internal services. I hold a PG Programme in
            Software Development from{" "}
            <span className="text-foreground font-medium">IIIT Bangalore</span> (GPA 3.8/4.0).
          </p>
          <Button variant="outline" size="sm" className="mt-5 gap-2" asChild>
            <Link href="/experience">
              View full experience
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-3 gap-4">
          {pillars.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="glow-border bg-card/50">
              <CardContent className="pt-6 space-y-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
