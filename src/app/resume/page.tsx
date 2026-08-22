import type { Metadata } from "next"
import { ResumeApp } from "@/features/resume"
import { StructuredData } from "@/components/seo/structured-data"

const description =
  "Sanjay Jana's resume — Senior Full Stack Engineer in Mumbai, 6+ years across AI platforms, fintech and enterprise banking. Read it as a simple document, two-column, code, or a scroll-through reel, or download the PDF."

export const metadata: Metadata = {
  title: "Resume",
  description,
  alternates: { canonical: "/resume" },
  openGraph: { title: "Resume — Sanjay Jana", description, url: "/resume" },
}

export default function ResumePage() {
  return (
    <>
      <StructuredData page={{ path: "/resume", name: "Resume", description }} />
      <ResumeApp />
    </>
  )
}
