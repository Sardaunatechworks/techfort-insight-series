import type { Metadata } from "next";
import { PageHero } from "@/components/site/Section";
import ResourcesPageClient from "./ResourcesPageClient";

export const metadata: Metadata = {
  title: "Resources — TechFort Insight Series",
  description:
    "AI learning materials, reading lists, recommended tools, African AI reports, session slides and research resources.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="A growing library of African AI learning resources"
        description="Open, accessible, community-driven — designed to support learners, builders, researchers and partners across Africa."
      />
      <ResourcesPageClient />
    </>
  );
}
