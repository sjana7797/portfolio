import type { Metadata } from "next"
import { ContactSection } from "@/features/contact"
import { PageShell } from "@/components/voyage/page-shell"
import { StructuredData } from "@/components/seo/structured-data"

const description =
  "Get in touch with Sanjay Jana about senior or staff full stack roles, AI platform work and consulting — remote or Mumbai hybrid."

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Sanjay Jana", description, url: "/contact" },
}

export default function ContactPage() {
  return (
    <PageShell backTo="#contact">
      <StructuredData page={{ path: "/contact", name: "Contact", description }} />
      <ContactSection />
    </PageShell>
  )
}
