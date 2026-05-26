import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, FadeIn, SectionHeading } from "@/components/site/Section";
import {
  MessageCircle,
  Heart,
  Sparkles,
  Users,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Community — TechFort Insight Series",
  description:
    "Join the TechFort community — WhatsApp, volunteering, member spotlights and women in tech.",
};

const spotlights = [
  { name: "AI SENSE Alumni", role: "Active across cohorts" },
  { name: "Curiosity to Creation Cohort", role: "Dutse · Northern Nigeria" },
  { name: "DSAPI Contributors", role: "Continental network" },
];

const guidelines = [
  "Be respectful, inclusive and constructive at all times.",
  "Engage critically and thoughtfully — questions are welcome.",
  "Center African contexts and underserved voices in conversations.",
  "Share opportunities generously and support fellow members.",
  "Uphold integrity, honesty and responsible use of technology.",
];

export default function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="Community"
        title="A growing African community of AI builders & thinkers"
        description="From alumni and volunteers to mentors and partners — TechFort is a network of people building Africa's AI future together."
      />

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 grid gap-6 md:grid-cols-3">
          {[
            {
              Icon: MessageCircle,
              title: "Join the WhatsApp Community",
              desc: "Stay connected with members, sessions and opportunities.",
              cta: "Join",
              href: "/apply",
            },
            {
              Icon: Heart,
              title: "Volunteer With Us",
              desc: "Lend skills in design, content, mentorship, research or operations.",
              cta: "Volunteer",
              href: "/apply",
            },
            {
              Icon: Sparkles,
              title: "Women in Technology",
              desc: "A dedicated stream amplifying African women in AI and emerging tech.",
              cta: "Get involved",
              href: "/apply",
            },
          ].map(({ Icon, title, desc, cta, href }, i) => (
            <FadeIn key={title} delay={i * 0.05}>
              <div className="h-full rounded-3xl border border-border bg-card p-8 shadow-card hover:shadow-elegant transition-all">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-elegant">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-display font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                <Link
                  href={href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                >
                  {cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Member Spotlights"
              title={
                <>
                  People at the{" "}
                  <span className="text-gradient">heart of TechFort</span>
                </>
              }
            />
          </FadeIn>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {spotlights.map((s, i) => (
              <FadeIn key={s.name} delay={i * 0.05}>
                <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-accent text-primary-foreground">
                    <Users className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-semibold text-foreground">
                      {s.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {s.role}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Community Guidelines"
              title={
                <>
                  How we <span className="text-gradient">show up together</span>
                </>
              }
            />
          </FadeIn>
          <ul className="mt-10 space-y-3">
            {guidelines.map((g, i) => (
              <FadeIn key={g} delay={i * 0.03}>
                <li className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <span className="text-foreground">{g}</span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
