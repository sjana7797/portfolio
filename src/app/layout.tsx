import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TopLoader } from "@/components/top-loader"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Sanjay Jana — Senior Full Stack Engineer",
  description:
    "Senior Full Stack Engineer with 6+ years building scalable SaaS platforms and AI-driven applications. MERN Stack · Next.js · TypeScript · AI.",
  keywords: [
    "Full Stack Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "AI",
    "LangChain",
    "MERN",
  ],
  authors: [{ name: "Sanjay Jana", url: "https://sanjayjana.dev" }],
  openGraph: {
    title: "Sanjay Jana — Senior Full Stack Engineer",
    description:
      "6+ years building scalable SaaS platforms and AI-driven applications.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(inter.variable, fontMono.variable)}>
      <body className="antialiased min-h-svh flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <TopLoader />
          <Nav />
          <main className="flex-1 pt-14">
            <div className="mx-auto max-w-5xl px-6">{children}</div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
