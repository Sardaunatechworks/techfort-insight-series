import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About — TechFort Insight Series",
  description:
    "TechFort is a youth-driven African technology initiative shaping AI literacy, governance and innovation across the continent.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
