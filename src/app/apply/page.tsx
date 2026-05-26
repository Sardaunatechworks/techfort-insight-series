import type { Metadata } from "next";
import ApplyPageClient from "./ApplyPageClient";

export const metadata: Metadata = {
  title: "Apply / Join — TechFort Insight Series",
  description:
    "Join the TechFort community, volunteer, speak, partner or apply for mentorship.",
};

export default function ApplyPage() {
  return <ApplyPageClient />;
}
