import type { Metadata } from "next";
import { PageHero } from "@/components/site/Section";
import SessionsPageClient from "./SessionsPageClient";

export const metadata: Metadata = {
  title: "Sessions — TechFort Insight Series",
  description:
    "Upcoming sessions, past sessions archive, recordings and resources from the TechFort Insight Series.",
};

export default function SessionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sessions"
        title="Insight Series sessions, recordings & resources"
        description="A continental learning calendar — conversations, workshops and convenings shaping Africa's AI and innovation discourse."
      />
      <SessionsPageClient />
    </>
  );
}
