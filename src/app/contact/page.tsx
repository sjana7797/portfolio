import type { Metadata } from "next"
import { ContactSection } from "@/features/contact"
import { PageShell } from "@/components/voyage/page-shell"
import { StructuredData } from "@/components/seo/structured-data"
import { SITE_URL } from "@/lib/site"

const title = "Contact Sanjay Jana"
const description =
  "Get in touch with Sanjay Jana about senior or staff full stack roles, AI platform work and consulting — remote or Mumbai hybrid."

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title,
    description,
    url: "/contact",
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: { title, description },
}

export default function ContactPage() {
  return (
    <PageShell backTo="#contact">
      <StructuredData
        page={{ path: "/contact", name: "Contact", description }}
      />
      <ContactSection />
    </PageShell>
  )
}
