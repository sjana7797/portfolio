import type { Metadata } from "next"
import { ContactSection } from "@/features/contact"

export const metadata: Metadata = {
  title: "Contact — Sanjay Jana",
  description: "Get in touch for full-time roles, consulting, AI projects, or just to connect.",
}

export default function ContactPage() {
  return (
    <div className="py-16">
      <ContactSection />
    </div>
  )
}
