import type { Metadata, Viewport } from "next"
import {
  Bevan,
  Bricolage_Grotesque,
  JetBrains_Mono,
  Manrope,
  Source_Serif_4,
} from "next/font/google"
import "./globals.css"
import { TopLoader } from "@/components/top-loader"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { VoyageBackdrop } from "@/components/voyage/ocean-scene"
import { ScrollProgress } from "@/components/voyage/scroll-progress"
import { CursorWake } from "@/components/voyage/cursor-wake"
import { Captain } from "@/components/voyage/captain"
import { SkinSwitcher } from "@/components/theme/skin-switcher"
import { SITE_URL, site } from "@/lib/site"
import {
  ThemeProvider,
  themeInitScript,
} from "@/components/theme/theme-provider"
import { DEFAULT_THEME } from "@/lib/themes"
import { cn } from "@/lib/utils"

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
})
const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
})
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
})
const poster = Bevan({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poster",
})
/**
 * Only the Reading Room skin uses this — not preloaded, so visitors on
 * the default voyage theme never pay for a font they won't render.
 */
const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sanjay Jana — Senior Full Stack Engineer (AI, Next.js, Mumbai)",
    // Every child page inherits this, so titles stay consistent.
    template: "%s | Sanjay Jana",
  },
  description: site.description,
  applicationName: "Sanjay Jana — Portfolio",
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  keywords: [
    "Sanjay Jana",
    "Senior Full Stack Engineer",
    "Full Stack Engineer Mumbai",
    "Next.js developer",
    "React developer",
    "TypeScript engineer",
    "LangChain developer",
    "RAG pipelines",
    "AI engineer India",
    "Node.js",
    "design systems",
    "fintech frontend",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    siteName: "Sanjay Jana",
    title: "Sanjay Jana — Senior Full Stack Engineer",
    description: site.description,
    url: SITE_URL,
    locale: "en_US",
    firstName: "Sanjay",
    lastName: "Jana",
    username: "sanjayjana",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanjay Jana — Senior Full Stack Engineer",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
}

export const viewport: Viewport = {
  themeColor: "#cdeaf3",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={cn(
        display.variable,
        body.variable,
        mono.variable,
        poster.variable,
        serif.variable
      )}
    >
      <head>
        {/* Applies the stored theme before first paint. Without it the
            page renders in the default and repaints — a visible flash
            on every load for anyone who picked a variant. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-svh flex-col antialiased">
        <ThemeProvider>
          <VoyageBackdrop />
          <TopLoader />
          <ScrollProgress />
          <CursorWake />
          <Nav />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
          {/* After <main>, so he layers over the content rather than under
            it — he's a character in the page, not part of the backdrop. */}
          <Captain />
          <SkinSwitcher />
        </ThemeProvider>
      </body>
    </html>
  )
}
