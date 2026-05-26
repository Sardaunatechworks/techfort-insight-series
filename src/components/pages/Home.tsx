"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Sparkles,
  ShieldCheck,
  FlaskConical,
  Cpu,
  Network,
  Users,
  GraduationCap,
  Calendar,
  Quote,
} from "lucide-react";
import heroImg from "@/assets/hero-africa-ai.jpg";
import {
  SectionHeading,
  FadeIn,
  SectionLabel,
} from "@/components/site/Section";

const stats = [
  { value: "450+", label: "Participants Impacted" },
  { value: "300+", label: "Through AI SENSE" },
  { value: "150+", label: "Curiosity to Creation" },
  { value: "5", label: "Active Initiatives" },
];

const focusAreas = [
  {
    Icon: Brain,
    title: "AI Literacy",
    desc: "Foundational AI awareness across schools, campuses and underserved communities.",
  },
  {
    Icon: ShieldCheck,
    title: "AI Governance",
    desc: "Policy thinking, digital ethics, and responsible adoption frameworks for Africa.",
  },
  {
    Icon: Cpu,
    title: "Emerging Technologies",
    desc: "Hands-on exposure to LLMs, robotics, drones and applied innovation.",
  },
  {
    Icon: FlaskConical,
    title: "Research",
    desc: "African-centered research on AI, society, equity and digital transformation.",
  },
  {
    Icon: GraduationCap,
    title: "Digital Skills",
    desc: "Practical capacity building for the next generation of African builders.",
  },
  {
    Icon: Network,
    title: "Innovation Ecosystems",
    desc: "Connecting youth, institutions, partners and ideas across the continent.",
  },
];

const programs = [
  {
    tag: "Flagship",
    title: "AI SENSE",
    desc: "An AI literacy initiative that has reached 300+ young people through digital awareness and education.",
    stat: "300+ reached",
  },
  {
    tag: "Partnership",
    title: "From Curiosity to Creation",
    desc: "Applied AI & emerging technology program with Window on America Dutse under American Spaces Nigeria.",
    stat: "150+ trained",
  },
  {
    tag: "Policy",
    title: "DSAPI",
    desc: "Digital Society & AI Policy Initiative — governance, digital ethics and responsible technology adoption.",
    stat: "Continental focus",
  },
  {
    tag: "Coming Soon",
    title: "TechFort Academy",
    desc: "A future digital learning ecosystem designed for African youth and underserved communities.",
    stat: "Launching soon",
  },
  {
    tag: "Coming Soon",
    title: "TechFort Lab",
    desc: "A future research and innovation hub for AI, emerging tech, and applied experimentation.",
    stat: "In development",
  },
];

const speakers = [
  { name: "AI Governance Lead", role: "DSAPI · Continental", initial: "A" },
  {
    name: "Emerging Tech Mentor",
    role: "From Curiosity to Creation",
    initial: "E",
  },
  { name: "Research Fellow", role: "TechFort Lab", initial: "R" },
  { name: "Community Lead", role: "AI SENSE", initial: "C" },
];

const partners = [
  "Window on America Dutse",
  "American Spaces Nigeria",
  "Drone Forge Africa",
  "TechFort Foundation",
];

const testimonials = [
  {
    quote:
      "TechFort opened my eyes to AI as something I can actually build with — not just consume.",
    author: "AI SENSE Participant",
    role: "Northern Nigeria",
  },
  {
    quote:
      "The From Curiosity to Creation program completely changed how I think about technology and Africa's future.",
    author: "Program Alumna",
    role: "Dutse Cohort",
  },
  {
    quote:
      "A genuinely thoughtful, institutional approach to AI literacy on the continent.",
    author: "Partner Organisation",
    role: "Ecosystem Collaborator",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <FadeIn>
                <SectionLabel>Continental AI Literacy Ecosystem</SectionLabel>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05]">
                  Building Africa's Future Through{" "}
                  <span className="text-gradient">AI Literacy</span> & Emerging
                  Technology Education
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
                  Democratizing access to artificial intelligence, digital
                  skills, research and responsible innovation across underserved
                  communities — from Northern Nigeria to the continent.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/apply"
                    className="group inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant hover:shadow-glow transition-all"
                  >
                    Join Community
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/programs"
                    className="inline-flex items-center gap-2 rounded-xl glass-strong px-6 py-3 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    Explore Programs
                  </Link>
                  <Link
                    href="/partners"
                    className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors"
                  >
                    Become a Partner <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </FadeIn>
              <FadeIn delay={0.25}>
                <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Active across 5 initiatives
                  </div>
                  <div className="hidden sm:block h-4 w-px bg-border" />
                  <div className="hidden sm:block">
                    In partnership with American Spaces Nigeria
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2} className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-accent opacity-20 blur-3xl rounded-full" />
                <motion.div
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative glass-strong rounded-3xl p-2 shadow-elegant ring-glow"
                >
                  <Image
                    src={heroImg}
                    alt="Africa connected by AI neural networks"
                    width={1600}
                    height={1200}
                    className="rounded-2xl w-full h-auto"
                    priority
                  />
                  <div className="absolute bottom-6 left-6 right-6 glass-strong rounded-xl p-4 flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                      <Sparkles className="h-5 w-5 text-primary-foreground" />
                    </span>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-foreground">
                        Insight Series · Live
                      </div>
                      <div className="text-xs text-muted-foreground">
                        AI literacy, research & innovation
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative -mt-8 px-6">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="glass-strong rounded-3xl border border-border shadow-card grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border overflow-hidden">
              {stats.map((s) => (
                <div key={s.label} className="p-6 md:p-8 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gradient">
                    {s.value}
                  </div>
                  <div className="mt-2 text-xs md:text-sm uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ABOUT SNAPSHOT */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6">
            <FadeIn>
              <SectionHeading
                eyebrow="About TechFort"
                title={
                  <>
                    An African institution shaping{" "}
                    <span className="text-gradient">responsible AI</span>
                  </>
                }
                description="TechFort is a youth-driven African technology initiative focused on AI literacy, emerging technologies, digital empowerment, AI governance, research and capacity building — founded in Northern Nigeria with a continental vision."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                >
                  Learn more about our mission{" "}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.1} className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  Icon: Users,
                  title: "Youth-Driven",
                  desc: "Built by and for the next generation of African builders.",
                },
                {
                  Icon: ShieldCheck,
                  title: "Responsible",
                  desc: "Ethics, governance and inclusivity at the core.",
                },
                {
                  Icon: Network,
                  title: "Continental",
                  desc: "Connecting ecosystems across African communities.",
                },
                {
                  Icon: FlaskConical,
                  title: "Research-Led",
                  desc: "Evidence-based programs and thought leadership.",
                },
              ].map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-elegant hover:-translate-y-0.5 transition-all"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="mt-4 font-display font-semibold text-foreground">
                    {title}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="relative py-24 bg-surface">
        <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <SectionHeading
              center
              eyebrow="Strategic Focus"
              title={
                <>
                  Six pillars shaping our{" "}
                  <span className="text-gradient">continental work</span>
                </>
              }
              description="From foundational AI literacy to governance, research and innovation ecosystems — every program is anchored in long-term institutional impact."
            />
          </FadeIn>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map(({ Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.04}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card hover:shadow-elegant transition-all">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-accent opacity-0 group-hover:opacity-20 blur-2xl transition-opacity" />
                  <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-5 text-xl font-display font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                    {desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <SectionHeading
                eyebrow="Featured Programs"
                title={
                  <>
                    Active initiatives, real{" "}
                    <span className="text-gradient">measurable impact</span>
                  </>
                }
              />
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
              >
                View all programs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.05}>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                      {p.tag}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {p.stat}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-display font-bold text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>
                  <div className="mt-8 flex items-center justify-between">
                    <Link
                      href="/programs"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all"
                    >
                      Explore <ArrowRight className="h-4 w-4" />
                    </Link>
                    <div className="h-1 w-12 rounded-full bg-gradient-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKERS + UPCOMING SESSION */}
      <section className="relative py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <FadeIn>
              <SectionHeading
                eyebrow="Featured Speakers"
                title={
                  <>
                    Voices shaping the{" "}
                    <span className="text-gradient">
                      African AI conversation
                    </span>
                  </>
                }
                description="Researchers, mentors and policy leads driving the Insight Series across our programs."
              />
            </FadeIn>
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {speakers.map((s, i) => (
                <FadeIn key={s.name} delay={i * 0.05}>
                  <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-elegant transition-all">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground font-display font-bold text-lg shadow-elegant">
                      {s.initial}
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

          <FadeIn delay={0.1} className="lg:col-span-5">
            <div className="relative h-full rounded-3xl border border-border bg-gradient-to-br from-card to-surface p-8 shadow-card overflow-hidden">
              <div className="absolute -top-12 -right-12 h-48 w-48 bg-gradient-accent opacity-20 blur-3xl rounded-full" />
              <SectionLabel>Upcoming Session</SectionLabel>
              <h3 className="mt-5 text-2xl font-display font-bold text-foreground">
                AI Governance in Africa: From Policy to Practice
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                A DSAPI Insight Series session exploring how African nations are
                shaping responsible AI adoption — featuring policy leads,
                researchers and community voices.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                Coming soon · Virtual & in-person
              </div>
              <Link
                href="/sessions"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant hover:shadow-glow transition-all"
              >
                View all sessions <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <FadeIn>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-semibold">
              In partnership with
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {partners.map((p) => (
                <div
                  key={p}
                  className="glass rounded-2xl border border-border px-4 py-6 text-sm font-semibold text-foreground/70 hover:text-primary transition-colors"
                >
                  {p}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <SectionHeading
              center
              eyebrow="Voices from the Ecosystem"
              title={
                <>
                  What our{" "}
                  <span className="text-gradient">community is saying</span>
                </>
              }
            />
          </FadeIn>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <FadeIn key={t.author} delay={i * 0.05}>
                <figure className="h-full rounded-3xl border border-border bg-card p-8 shadow-card relative">
                  <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/15" />
                  <blockquote className="text-base leading-relaxed text-foreground">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground font-semibold">
                      {t.author[0]}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {t.author}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t.role}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-gradient-to-br from-primary to-[oklch(0.35_0.12_255)] p-10 md:p-16 text-center shadow-elegant">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-soft/30 blur-3xl" />
              <div className="relative">
                <SectionLabel>Be part of it</SectionLabel>
                <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground tracking-tight">
                  Help shape Africa's AI future.
                </h2>
                <p className="mt-4 mx-auto max-w-xl text-primary-foreground/80">
                  Join our community, partner with us, or speak at an upcoming
                  Insight Series session.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/apply"
                    className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary shadow-elegant hover:shadow-glow transition-all"
                  >
                    Join Community
                  </Link>
                  <Link
                    href="/partners"
                    className="rounded-xl border border-white/30 bg-white/10 backdrop-blur px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-white/20 transition-colors"
                  >
                    Become a Partner
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
