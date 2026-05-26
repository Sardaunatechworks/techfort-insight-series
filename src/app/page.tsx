import type { Metadata } from "next";
import Home from "@/components/pages/Home";

export const metadata: Metadata = {
  title: "TechFort Insight Series — Building Africa's AI Future",
  description:
    "Democratizing access to artificial intelligence, digital skills, research, and responsible innovation across underserved African communities.",
  openGraph: {
    title: "TechFort Insight Series",
    description:
      "A continental AI literacy ecosystem shaping Africa's digital transformation.",
  },
};

export default function Page() {
  return <Home />;
}
