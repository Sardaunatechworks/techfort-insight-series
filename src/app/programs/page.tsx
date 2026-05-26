import type { Metadata } from "next";
import { PageHero } from "@/components/site/Section";
import ProgramsPageClient from "./ProgramsPageClient";

export const metadata: Metadata = {
  title: "Programs — TechFort Insight Series",
  description:
    "Explore TechFort's programs: AI SENSE, From Curiosity to Creation, DSAPI, TechFort Academy and TechFort Lab.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Programs shaping Africa's AI ecosystem"
        description="Active initiatives, growing impact, and future-facing programs designed to democratize AI literacy and responsible innovation."
      />
      <ProgramsPageClient />
    </>
  );
}
