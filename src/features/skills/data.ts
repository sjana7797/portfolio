export interface SkillGroup {
  category: string
  icon: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    icon: "Code2",
    skills: ["JavaScript (ES2022+)", "TypeScript", "Core Java"],
  },
  {
    category: "Frontend",
    icon: "Layout",
    skills: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Turbo Repo"],
  },
  {
    category: "Backend",
    icon: "Server",
    skills: ["Node.js", "Express.js", "Nest.js", "Hono", "Bun", "Java Spring Boot"],
  },
  {
    category: "AI / ML",
    icon: "Brain",
    skills: ["LangChain", "RAG Pipelines", "Ollama", "Hugging Face", "LLM Integration", "Brave Search API"],
  },
  {
    category: "Databases",
    icon: "Database",
    skills: ["MongoDB", "PostgreSQL", "Redis"],
  },
  {
    category: "API Design",
    icon: "Zap",
    skills: ["REST", "tRPC", "GraphQL"],
  },
  {
    category: "Testing",
    icon: "FlaskConical",
    skills: ["Jest", "Vitest", "React Testing Library"],
  },
  {
    category: "DevOps & Tools",
    icon: "Settings2",
    skills: ["Docker", "Git", "GitHub", "VS Code", "Jira", "Linear"],
  },
]
