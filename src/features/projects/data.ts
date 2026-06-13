export interface Project {
  title: string
  description: string
  tech: string[]
  highlights: string[]
  category: "AI / ML" | "FinTech" | "SaaS" | "E-Commerce" | "Healthcare" | "Enterprise"
  type: "work" | "personal"
  href?: string
}

export const projects: Project[] = [
  {
    title: "Multi-Model AI Chat Platform",
    description:
      "Scalable AI platform enabling users to interact with multiple LLMs via LangChain, with RAG pipelines, Ollama integration, and configurable agent workflows — architected as a shared internal service.",
    tech: ["LangChain", "RAG", "Ollama", "Next.js", "TypeScript", "Node.js"],
    highlights: [
      "Multi-LLM routing via LangChain",
      "Retrieval-Augmented Generation (RAG)",
      "Shared service with minimal onboarding",
      "Configurable agent workflows",
    ],
    category: "AI / ML",
    type: "work",
  },
  {
    title: "AI Chat with Real-Time Web Search",
    description:
      "Production-grade AI chat app with Brave Search API integration, intent classification via Hugging Face Transformers, and dynamic domain-specific response cards for stocks, finance, and utilities.",
    tech: ["Next.js", "Hugging Face", "Brave Search API", "TypeScript", "Node.js"],
    highlights: [
      "Intent-based query routing",
      "Real-time web search integration",
      "Stock market & financial data cards",
      "Transformer-based intent classification",
    ],
    category: "AI / ML",
    type: "work",
  },
  {
    title: "Internal Admin Portal (RBAC)",
    description:
      "Centralized admin portal for all Enso products with granular role-based access control, giving sales, support, and operations teams efficient management of leads, users, and customer issues.",
    tech: ["Next.js", "RBAC", "TypeScript", "Node.js", "PostgreSQL"],
    highlights: [
      "Granular role-based access control",
      "Multi-product centralized portal",
      "Team-specific dashboards",
    ],
    category: "Enterprise",
    type: "work",
  },
  {
    title: "MintOak Fintech Platform",
    description:
      "High-performance fintech platform with SSR/SSG optimization, reusable UI component libraries, and real-time data visualization dashboards — achieving 50% reduction in page load time.",
    tech: ["Next.js", "TypeScript", "React.js", "SSR", "SSG", "Design System"],
    highlights: [
      "50% reduction in page load time",
      "Real-time financial data visualization",
      "Reusable design system components",
    ],
    category: "FinTech",
    type: "work",
  },
  {
    title: "AHMU – Online Pharmacy",
    description:
      "GPhC-regulated UK online pharmacy with NHS-compliant online consultations, prescription services, same-day delivery, and a linked online doctor clinic — built end-to-end with Next.js.",
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "CloudFront"],
    highlights: [
      "GPhC-regulated & NHS-compliant platform",
      "Online doctor + pharmacist consultation flows",
      "Same-day & express delivery system",
      "Secure user auth & discreet checkout",
    ],
    category: "Healthcare",
    type: "personal",
    href: "https://ahmu.co.uk",
  },
  {
    title: "Fylde Clinic – Online Pharmacy",
    description:
      "GPhC-regulated online pharmacy for 30+ conditions including weight loss (Mounjaro, Wegovy), sexual health, and hair loss — featuring a BMI calculator, Trustpilot integration, and a pharmacist-authored Health Hub.",
    tech: ["Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
    highlights: [
      "GPhC registration No. 9012835 — fully regulated",
      "BMI calculator for weight-loss eligibility",
      "Health Hub with pharmacist-reviewed articles",
      "Trustpilot & multi-payment gateway integration",
    ],
    category: "Healthcare",
    type: "personal",
    href: "https://fyldeclinic.co.uk",
  },
  {
    title: "One Store – E-Commerce Platform",
    description:
      "Scalable full-stack e-commerce platform delivered via a Turbo Repo monorepo architecture, with seamless shopping experiences backed by Next.js, Nest.js, and MongoDB.",
    tech: ["Next.js", "Nest.js", "MongoDB", "Tailwind CSS", "Turbo Repo"],
    highlights: [
      "Turbo Repo monorepo architecture",
      "Full-stack Next.js + Nest.js",
      "Scalable product & order management",
    ],
    category: "E-Commerce",
    type: "personal",
  },
]
