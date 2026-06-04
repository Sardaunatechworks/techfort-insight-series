"use client";

import { useEffect, useState } from "react";
import { PageHero, FadeIn, SectionHeading } from "@/components/site/Section";
import {
  Target,
  Eye,
  Compass,
  Users,
  Globe2,
  Sparkles,
  Loader2,
  Linkedin,
  Twitter,
} from "lucide-react";
import {
  dbGetSiteSettings,
  dbGetTeamMembers,
  SiteSettings,
  TeamMember,
} from "@/lib/db";

const objectives = [
  {
    Icon: Target,
    title: "Democratize AI Literacy",
    desc: "Bring foundational AI understanding to underserved African communities.",
  },
  {
    Icon: Compass,
    title: "Shape Responsible Innovation",
    desc: "Champion ethics, governance and inclusivity in emerging technologies.",
  },
  {
    Icon: Users,
    title: "Empower Youth",
    desc: "Equip the next generation with practical digital and AI skills.",
  },
  {
    Icon: Sparkles,
    title: "Catalyze Research",
    desc: "Produce African-centered research on AI, society and policy.",
  },
  {
    Icon: Globe2,
    title: "Build Ecosystems",
    desc: "Connect institutions, partners and communities across the continent.",
  },
  {
    Icon: Eye,
    title: "Foster Thought Leadership",
    desc: "Convene voices shaping Africa's digital and AI future.",
  },
];

export default function AboutPageClient() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [settingsData, teamData] = await Promise.all([
          dbGetSiteSettings(),
          dbGetTeamMembers(),
        ]);
        setSettings(settingsData);
        setTeamMembers(teamData);
      } catch (err) {
        console.error("Failed to load about data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="About"
        title="A continental initiative for AI literacy & responsible innovation"
        description="TechFort is a youth-driven African technology initiative founded in Northern Nigeria, building inclusive pathways into artificial intelligence, emerging technologies and digital transformation."
        heroImage={settings?.aboutHeroUrl || undefined}
      />

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 grid gap-12 lg:grid-cols-2">
          <FadeIn>
            <div className="h-full rounded-3xl border border-border bg-card p-8 md:p-10 shadow-card">
              <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold">
                About TechFort
              </div>
              <h2 className="mt-3 text-3xl font-display font-bold text-foreground">
                An African institution in motion
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                TechFort focuses on AI literacy, emerging technologies, digital
                empowerment, responsible innovation, AI governance, research and
                youth capacity building — anchored in inclusive digital
                transformation for underserved communities.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="h-full rounded-3xl border border-border bg-gradient-to-br from-primary to-[oklch(0.35_0.12_255)] p-8 md:p-10 text-primary-foreground shadow-elegant relative overflow-hidden">
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-accent/40 blur-3xl" />
              <div className="relative">
                <div className="text-xs uppercase tracking-[0.22em] text-primary-foreground/80 font-semibold">
                  About TIS
                </div>
                <h2 className="mt-3 text-3xl font-display font-bold">
                  The Insight Series
                </h2>
                <p className="mt-4 text-primary-foreground/85 leading-relaxed">
                  TIS is TechFort's continental learning and thought leadership
                  platform — a recurring series of conversations, sessions and
                  publications shaping how Africa engages with AI and emerging
                  technology.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-6xl px-6 grid gap-8 md:grid-cols-3">
          {[
            {
              label: "Vision",
              text: "An Africa where AI literacy, responsible innovation and digital opportunity are accessible to every young person, regardless of geography.",
            },
            {
              label: "Mission",
              text: "To democratize access to AI, emerging technologies and digital skills — building ecosystems that empower African youth and underserved communities.",
            },
            {
              label: "Long-Term Vision",
              text: "Establish TechFort as a leading African institution shaping AI literacy, research and digital transformation across the continent.",
            },
          ].map((b, i) => (
            <FadeIn key={b.label} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-card">
                <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold">
                  {b.label}
                </div>
                <p className="mt-4 text-foreground leading-relaxed">{b.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <SectionHeading
              center
              eyebrow="Core Objectives"
              title={
                <>
                  What we are <span className="text-gradient">building</span>
                </>
              }
            />
          </FadeIn>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {objectives.map(({ Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.04}>
                <div className="h-full rounded-2xl border border-border bg-card p-7 shadow-card hover:shadow-elegant transition-all">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-display font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <FadeIn>
            <SectionHeading
              center
              eyebrow="Leadership Structure"
              title={
                <>
                  Built by <span className="text-gradient">African youth</span>,
                  for the continent
                </>
              }
              description="TechFort operates through founder-led strategy, program leads, research fellows, community organisers and a growing partner network — anchored in shared values of inclusion, integrity and impact."
            />
          </FadeIn>

          <div className="mt-16">
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : teamMembers.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left">
                {teamMembers.map((tm, i) => (
                  <FadeIn key={tm.id} delay={i * 0.1}>
                    <div className="group h-full rounded-2xl border border-border bg-card overflow-hidden shadow-card hover:shadow-elegant hover:border-primary/30 transition-all flex flex-col">
                      <div className="aspect-square w-full bg-muted/30 relative overflow-hidden">
                        {tm.pictureUrl ? (
                          <img
                            src={tm.pictureUrl}
                            alt={tm.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                            <Users className="h-16 w-16" />
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-display font-bold text-foreground">
                          {tm.name}
                        </h3>
                        <p className="text-sm font-semibold text-primary mt-1">
                          {tm.role}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                          {tm.specialization}
                        </p>
                        <div className="mt-auto pt-4 flex gap-3">
                          {tm.linkedinUrl && (
                            <a
                              href={tm.linkedinUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          )}
                          {tm.twitterUrl && (
                            <a
                              href={tm.twitterUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Twitter className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic mt-8">
                Team structure is currently being updated.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
