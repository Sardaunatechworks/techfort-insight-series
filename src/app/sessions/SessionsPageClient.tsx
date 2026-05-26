"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FadeIn, SectionHeading } from "@/components/site/Section";
import { Calendar, Clock, Mic, ArrowRight, Loader2 } from "lucide-react";
import { dbGetSessions, Session } from "@/lib/db";

const categories = [
  "All",
  "AI SENSE",
  "DSAPI",
  "From Curiosity to Creation",
  "AI Literacy",
  "AI Governance",
  "Emerging Technologies",
  "Research",
  "Community",
];

export default function SessionsPageClient() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function load() {
      try {
        const data = await dbGetSessions();
        const sorted = [...data].sort(
          (a, b) => (a.order || 0) - (b.order || 0),
        );
        setSessions(sorted);
      } catch (e) {
        console.error("Error loading sessions:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <section className="py-20 flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading sessions...</p>
        </div>
      </section>
    );
  }

  // Filter based on activeCategory
  const filteredSessions =
    activeCategory === "All"
      ? sessions
      : sessions.filter(
          (s) =>
            (s.category || "").toLowerCase() === activeCategory.toLowerCase() ||
            (s.theme || "").toLowerCase() === activeCategory.toLowerCase(),
        );

  const upcoming = filteredSessions.filter((s) => s.status === "upcoming");
  const past = filteredSessions.filter((s) => s.status === "past");

  return (
    <>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Upcoming"
              title={
                <>
                  Sessions you can{" "}
                  <span className="text-gradient">join next</span>
                </>
              }
            />
          </FadeIn>
          {upcoming.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {upcoming.map((s, i) => (
                <FadeIn key={s.id || s.title || i} delay={i * 0.05}>
                  <article className="h-full rounded-3xl border border-border bg-card p-7 shadow-card hover:shadow-elegant transition-all flex flex-col justify-between">
                    <div>
                      <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                        {s.category || "General"}
                      </span>
                      <h3 className="mt-5 text-xl font-display font-semibold text-foreground">
                        {s.title}
                      </h3>
                    </div>
                    <div className="mt-6 space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />{" "}
                        {s.date || "Coming Soon"}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" /> Virtual &
                        in-person
                      </div>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          ) : (
            <p className="mt-12 text-center text-muted-foreground py-10">
              No upcoming sessions found matching this theme.
            </p>
          )}
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Categories"
              title={
                <>
                  Browse by <span className="text-gradient">theme</span>
                </>
              }
            />
          </FadeIn>
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((c) => {
              const active = activeCategory === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveCategory(c)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-elegant"
                      : "border-border bg-card text-foreground/80 hover:text-primary hover:border-primary/40"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Archive"
              title={
                <>
                  Past sessions &{" "}
                  <span className="text-gradient">recordings</span>
                </>
              }
            />
          </FadeIn>
          {past.length > 0 ? (
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {past.map((s, i) => (
                <FadeIn key={s.id || s.title || i} delay={i * 0.04}>
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-elegant transition-all">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-primary font-semibold">
                        {s.category || "General"}
                      </div>
                      <div className="mt-1 font-semibold text-foreground">
                        {s.title}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                  </div>
                </FadeIn>
              ))}
            </div>
          ) : (
            <p className="mt-12 text-center text-muted-foreground py-10">
              No past sessions found matching this theme.
            </p>
          )}
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <div className="rounded-3xl border border-border bg-card p-10 shadow-card text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-elegant">
                <Mic className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-2xl font-display font-bold text-foreground">
                Apply to Speak
              </h3>
              <p className="mt-3 text-muted-foreground">
                Researchers, practitioners and community voices shaping Africa's
                AI conversation are welcome to apply.
              </p>
              <Link
                href="/apply"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant hover:shadow-glow transition-all"
              >
                Speaker Application <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
