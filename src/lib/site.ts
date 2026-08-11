/**
 * Single source of truth for anything that has to agree across
 * metadata, sitemap, robots, OG images and JSON-LD. If the domain
 * changes, change it here (or set NEXT_PUBLIC_SITE_URL) and every
 * canonical, sitemap entry and structured-data @id follows.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sanjayjana.dev"
).replace(/\/$/, "")

export const site = {
  url: SITE_URL,
  name: "Sanjay Jana",
  jobTitle: "Senior Full Stack Engineer",
  email: "sjana7797@gmail.com",
  locality: "Mumbai",
  region: "Maharashtra",
  country: "IN",
  /** Used verbatim as the home page meta description. */
  description:
    "Sanjay Jana is a Senior Full Stack Engineer in Mumbai with 6+ years building multi-model AI platforms (LangChain, RAG, Ollama), fintech dashboards and design systems in Next.js, TypeScript and Node.js.",
  /** Short factual summary for AI answer engines. */
  summary:
    "Senior Full Stack Engineer based in Mumbai, India, with 6+ years of experience. Specialises in multi-model AI platforms built on LangChain and RAG pipelines, high-performance fintech frontends, and reusable design systems. Currently at Enso WebWorks; previously MintOak, SaaSMonk, ValarTech and TCS. Postgraduate in Software Development from IIIT Bangalore (GPA 3.8/4.0).",
  sameAs: [
    "https://github.com/sanjayjana",
    "https://linkedin.com/in/sanjayjana",
  ],
  alumniOf: "International Institute of Information Technology Bangalore",
  employer: "Enso WebWorks",
  skills: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "LangChain",
    "Retrieval-Augmented Generation",
    "Ollama",
    "Hugging Face Transformers",
    "MongoDB",
    "PostgreSQL",
    "Design Systems",
  ],
} as const

/** Every indexable route, with the crawl priorities they deserve. */
export const routes = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "yearly" },
  { path: "/experience", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
  { path: "/skills", priority: 0.7, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
] as const
