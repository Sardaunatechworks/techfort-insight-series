import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact — TechFort Insight Series",
  description:
    "Get in touch with TechFort Foundation — partnerships, programs, research and community inquiries.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
