import type { Metadata } from "next";
import { PageHero } from "@/components/site/Section";
import ResearchPageClient from "./ResearchPageClient";

export const metadata: Metadata = {
  title: "Research — TechFort Insight Series",
  description:
    "African AI policy, governance, digital ethics and founder writings from the TechFort research stream.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        title="African thinking on AI, governance & digital transformation"
        description="A research and thought leadership stream exploring how Africa engages with AI, emerging technology and responsible innovation."
      />
      <ResearchPageClient />
    </>
  );
}
