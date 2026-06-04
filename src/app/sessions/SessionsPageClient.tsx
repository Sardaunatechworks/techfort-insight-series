"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FadeIn, SectionHeading } from "@/components/site/Section";
import { Calendar, Clock, Mic, ArrowRight, Loader2, User } from "lucide-react";
import { dbGetSessions, dbGetSpeakers, Session, Speaker } from "@/lib/db";

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
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function load() {
      try {
        const [sessionData, speakerData] = await Promise.all([
          dbGetSessions(),
          dbGetSpeakers(),
        ]);
        const sortedSessions = [...sessionData].sort(
          (a, b) => (a.order || 0) - (b.order || 0),
        );
        setSessions(sortedSessions);
        setSpeakers(speakerData);
      } catch (e) {
        console.error("Error loading sessions/speakers:", e);
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

  const upcomingSessions = filteredSessions.filter(
    (s) => s.status === "upcoming",
  );
  const pastSessions = filteredSessions.filter((s) => s.status === "past");

  const upcomingSpeakers = speakers.filter((s) => s.type === "upcoming");
  const pastSpeakers = speakers.filter((s) => s.type === "past");

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
          {upcomingSessions.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {upcomingSessions.map((s, i) => (
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

      {/* UPCOMING SPEAKERS */}
      {upcomingSpeakers.length > 0 && (
        <section className="py-20 bg-surface">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <SectionHeading
                eyebrow="Speakers"
                title={
                  <>
                    Upcoming <span className="text-gradient">Speakers</span>
                  </>
                }
              />
            </FadeIn>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingSpeakers.map((spk, i) => (
                <FadeIn key={spk.id} delay={i * 0.05}>
                  <div className="group h-full rounded-3xl border border-border bg-card p-6 shadow-card hover:shadow-elegant hover:border-primary/30 transition-all flex flex-col items-center text-center">
                    <div className="h-24 w-24 rounded-full border-4 border-surface overflow-hidden bg-muted shadow-sm mb-4 relative flex-shrink-0">
                      {spk.pictureUrl ? (
                        <img
                          src={spk.pictureUrl}
                          alt={spk.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground/40 bg-card">
                          <User className="h-10 w-10" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground">
                      {spk.name}
                    </h3>
                    <p className="text-sm font-semibold text-primary mt-1">
                      {spk.theme}
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground bg-muted/40 px-3 py-1 rounded-full border border-border">
                      <Calendar className="h-3.5 w-3.5" />
                      {spk.date}
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                      {spk.shortBio}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
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

      <section className="py-20 bg-surface">
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
          {pastSessions.length > 0 ? (
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {pastSessions.map((s, i) => (
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

      {/* PAST SPEAKERS */}
      {pastSpeakers.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <SectionHeading
                eyebrow="Speakers Archive"
                title={
                  <>
                    Past <span className="text-gradient">Speakers</span>
                  </>
                }
              />
            </FadeIn>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pastSpeakers.map((spk, i) => (
                <FadeIn key={spk.id} delay={i * 0.05}>
                  <div className="group h-full rounded-3xl border border-border bg-card p-6 shadow-card hover:shadow-elegant hover:border-primary/30 transition-all flex flex-col items-center text-center opacity-90">
                    <div className="h-20 w-20 rounded-full border-2 border-border overflow-hidden bg-muted mb-4 relative flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                      {spk.pictureUrl ? (
                        <img
                          src={spk.pictureUrl}
                          alt={spk.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground/40 bg-card">
                          <User className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-display font-bold text-foreground">
                      {spk.name}
                    </h3>
                    <p className="text-xs font-semibold text-primary/80 mt-1">
                      {spk.theme}
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] font-mono text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full border border-border">
                      <Calendar className="h-3 w-3" />
                      {spk.date}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {spk.shortBio}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

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
