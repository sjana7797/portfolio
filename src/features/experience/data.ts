export interface Experience {
  company: string
  role: string
  period: string
  location: string
  current?: boolean
  highlights: string[]
  tech: string[]
}

export const experiences: Experience[] = [
  {
    company: "Enso WebWorks",
    role: "Senior Software Engineer",
    period: "Sep 2025 – Present",
    location: "Mumbai",
    current: true,
    highlights: [
      "Architected centralized internal admin portal with granular RBAC for all Enso products, empowering sales, support, and ops teams.",
      "Built production-grade AI chat app with real-time web search (Brave Search API) and intent-based query routing for domain-specific responses.",
      "Implemented intent classification via Hugging Face Transformer models for accurate detection of stocks, search, and tool query types.",
      "Designed scalable multi-model AI chat platform with LangChain, RAG pipelines, Ollama integration, and configurable agent workflows.",
      "Architected AI platform as a shared internal service enabling other teams to integrate custom agents with minimal configuration.",
    ],
    tech: ["Next.js", "TypeScript", "LangChain", "RAG", "Ollama", "Hugging Face", "RBAC", "Node.js"],
  },
  {
    company: "MintOak",
    role: "Senior Software Engineer",
    period: "Oct 2024 – Sep 2025",
    location: "Mumbai",
    highlights: [
      "Developed and maintained high-performance fintech platform using Next.js, TypeScript, and React.js for financial data consumers.",
      "Engineered reusable UI component libraries with design system patterns, improving developer velocity and rendering performance.",
      "Optimized frontend with SSR and SSG, reducing average page load times by 50% and boosting SEO rankings.",
      "Integrated third-party APIs and built real-time data visualization dashboards surfacing actionable financial insights.",
      "Collaborated with designers, backend engineers, and product stakeholders for pixel-perfect, responsive UI.",
    ],
    tech: ["Next.js", "React.js", "TypeScript", "SSR", "SSG", "Data Viz", "Design Systems"],
  },
  {
    company: "SaaSMonk",
    role: "Software Engineer – Full Stack",
    period: "Sep 2022 – Oct 2024",
    location: "Mumbai",
    highlights: [
      "Led development of B2B SaaS product for client marketing strategies and revenue growth through data-driven tooling.",
      "Built robust backend services via Next.js API routes ensuring reliable data flow and efficient API performance.",
      "Translated business requirements into scalable, production-ready features aligned with product and stakeholder goals.",
    ],
    tech: ["Next.js", "Node.js", "MongoDB", "REST APIs", "TypeScript"],
  },
  {
    company: "ValarTech",
    role: "React Developer",
    period: "Jan 2022 – Aug 2022",
    location: "Mumbai",
    highlights: [
      "Developed performant React.js applications for multiple clients with immersive UX and seamless API integrations.",
      "Crafted visually appealing, fully responsive interfaces using Tailwind CSS ensuring cross-device compatibility.",
      "Collaborated with cross-functional teams to gather requirements and deliver features on schedule.",
    ],
    tech: ["React.js", "Next.js", "Tailwind CSS", "REST APIs"],
  },
  {
    company: "TCS",
    role: "System Engineer",
    period: "Oct 2019 – Nov 2021",
    location: "Mumbai",
    highlights: [
      "Built and maintained web app for RTGS and NEFT transaction management from SFMS integrated into a banking platform.",
      "Developed React components with deep understanding of UI/UX principles and financial domain business logic.",
    ],
    tech: ["React.js", "SFMS", "Banking APIs", "Java"],
  },
]
