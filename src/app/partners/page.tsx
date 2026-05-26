import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, FadeIn, SectionHeading } from "@/components/site/Section";
import { Handshake, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Partners — TechFort Insight Series",
  description:
    "Current partners, collaboration and sponsorship opportunities with the TechFort Insight Series.",
};

const current = [
  {
    name: "Window on America Dutse",
    note: "Program collaboration · From Curiosity to Creation",
  },
  { name: "American Spaces Nigeria", note: "Institutional partner" },
  { name: "Drone Forge Africa", note: "Emerging technology collaboration" },
];

const opportunities = [
  {
    title: "Program Partnership",
    desc: "Co-design and co-deliver AI literacy, research or emerging tech programs across Africa.",
  },
  {
    title: "Sponsorship",
    desc: "Support cohorts, sessions, research streams and continental expansion of TechFort initiatives.",
  },
  {
    title: "Institutional Engagement",
    desc: "Partner as a university, foundation, embassy, government agency or industry institution.",
  },
  {
    title: "Research Collaboration",
    desc: "Co-author research, share data or sponsor specific African AI research streams.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Partnering to build Africa's AI ecosystem"
        description="TechFort works with institutions, foundations, embassies and ecosystem actors committed to Africa's digital and AI future."
      />

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Current Partners"
              title={
                <>
                  Trusted <span className="text-gradient">collaborators</span>
                </>
              }
            />
          </FadeIn>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {current.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.05}>
                <div className="rounded-3xl border border-border bg-card p-7 shadow-card hover:shadow-elegant transition-all">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
                    <Handshake className="h-5 w-5" />
                  </span>
                  <div className="mt-5 font-display font-semibold text-lg text-foreground">
                    {p.name}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {p.note}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Ways to Partner"
              title={
                <>
                  How institutions{" "}
                  <span className="text-gradient">engage with us</span>
                </>
              }
            />
          </FadeIn>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {opportunities.map((o, i) => (
              <FadeIn key={o.title} delay={i * 0.04}>
                <div className="h-full rounded-2xl border border-border bg-card p-7 shadow-card">
                  <div className="text-xs uppercase tracking-wider text-primary font-semibold">
                    {o.title}
                  </div>
                  <p className="mt-3 text-foreground leading-relaxed">
                    {o.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <div className="mt-12 rounded-3xl border border-border bg-gradient-to-br from-primary to-[oklch(0.35_0.12_255)] p-10 text-center shadow-elegant relative overflow-hidden">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/40 blur-3xl" />
              <h3 className="relative text-3xl font-display font-bold text-primary-foreground">
                Let's build together
              </h3>
              <p className="relative mt-3 text-primary-foreground/85 max-w-xl mx-auto">
                Reach out to explore how your institution can partner with the
                TechFort Insight Series.
              </p>
              <Link
                href="/contact"
                className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary shadow-elegant hover:shadow-glow transition-all"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
