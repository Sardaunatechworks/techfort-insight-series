import type { Metadata } from "next";
import GalleryPageClient from "./GalleryPageClient";

export const metadata: Metadata = {
  title: "Moments of Impacts — Gallery",
  description:
    "A visual journey of cohorts, workshops, sessions, and community activations driving AI literacy across Africa.",
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}
