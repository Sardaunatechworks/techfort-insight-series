"use client";

import { useEffect, useState } from "react";
import { FadeIn } from "@/components/site/Section";
import { Sparkles, Loader2 } from "lucide-react";
import { dbGetPrograms, Program } from "@/lib/db";

export default function ProgramsPageClient() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await dbGetPrograms();
        // Sort by order asc
        const sorted = [...data].sort(
          (a, b) => (a.order || 0) - (b.order || 0),
        );
        setPrograms(sorted);
      } catch (e) {
        console.error("Error loading programs:", e);
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
          <p className="text-sm text-muted-foreground">Loading programs...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6 space-y-10">
        {programs.map((p, i) => {
          const goalsList = Array.isArray(p.goals)
            ? p.goals
            : typeof (p.goals as unknown) === "string"
              ? (p.goals as unknown as string)
                  .split(",")
                  .map((s: string) => s.trim())
                  .filter(Boolean)
              : [];

          const outcomesList = Array.isArray(p.outcomes)
            ? p.outcomes
            : typeof (p.outcomes as unknown) === "string"
              ? (p.outcomes as unknown as string)
                  .split(",")
                  .map((s: string) => s.trim())
                  .filter(Boolean)
              : [];

          return (
            <FadeIn key={p.id || p.title || i} delay={i * 0.04}>
              <article className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-12 shadow-card hover:shadow-elegant transition-all">
                <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-accent opacity-10 blur-3xl group-hover:opacity-20 transition-opacity" />
                <div className="relative grid gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                      {p.tag}
                    </span>
                    <h2 className="mt-5 text-3xl md:text-4xl font-display font-bold text-foreground">
                      {p.title}
                    </h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {p.overview}
                    </p>
                    {p.impact && (
                      <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/15 p-4">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-semibold">
                          <Sparkles className="h-3.5 w-3.5" /> Impact
                        </div>
                        <p className="mt-2 text-sm text-foreground">
                          {p.impact}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                    {[
                      { label: "Goals", items: goalsList },
                      { label: "Outcomes", items: outcomesList },
                    ].map((block) => (
                      <div
                        key={block.label}
                        className="rounded-2xl border border-border bg-surface/60 p-5"
                      >
                        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                          {block.label}
                        </div>
                        {block.items.length > 0 ? (
                          <ul className="mt-3 space-y-2">
                            {block.items.map((it: string, idx: number) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-sm text-foreground"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                {it}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-3 text-sm text-muted-foreground">
                            None specified
                          </p>
                        )}
                      </div>
                    ))}
                    {p.future && (
                      <div className="sm:col-span-2 rounded-2xl border border-border bg-surface/60 p-5">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                          Future Plans
                        </div>
                        <p className="mt-2 text-sm text-foreground">
                          {p.future}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
