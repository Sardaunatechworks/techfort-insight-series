"use client";

import { useEffect, useState } from "react";
import { FadeIn, SectionHeading } from "@/components/site/Section";
import {
  BookOpen,
  FileText,
  Microscope,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { dbGetArticles, Article } from "@/lib/db";

export default function ResearchPageClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await dbGetArticles();
        const sorted = [...data].sort(
          (a, b) => (a.order || 0) - (b.order || 0),
        );
        setArticles(sorted);
      } catch (e) {
        console.error("Error loading articles:", e);
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
          <p className="text-sm text-muted-foreground">
            Loading research articles...
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-6 md:grid-cols-3">
          {[
            {
              Icon: BookOpen,
              title: "Publications",
              desc: "Long-form writing, briefs and research notes.",
            },
            {
              Icon: Microscope,
              title: "Research Streams",
              desc: "AI governance, digital ethics, AI literacy & inclusion.",
            },
            {
              Icon: FileText,
              title: "Founder Writings",
              desc: "Perspectives on institution-building in African tech.",
            },
          ].map(({ Icon, title, desc }, i) => (
            <FadeIn key={title} delay={i * 0.05}>
              <div className="h-full rounded-3xl border border-border bg-card p-8 shadow-card">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-elegant">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-display font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SectionHeading
              eyebrow="Latest Thinking"
              title={
                <>
                  Articles & <span className="text-gradient">perspectives</span>
                </>
              }
            />
          </FadeIn>
          {articles.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {articles.map((a, i) => (
                <FadeIn key={a.id || a.title || i} delay={i * 0.05}>
                  <article className="group h-full rounded-3xl border border-border bg-card p-8 shadow-card hover:shadow-elegant transition-all flex flex-col justify-between">
                    <div>
                      <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                        {a.tag || "General"}
                      </span>
                      <h3 className="mt-5 text-2xl font-display font-bold text-foreground">
                        {a.title}
                      </h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed">
                        {a.excerpt}
                      </p>
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all cursor-pointer">
                      Read more <ArrowRight className="h-4 w-4" />
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          ) : (
            <p className="mt-12 text-center text-muted-foreground py-10">
              No research articles found.
            </p>
          )}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <SectionHeading
              center
              eyebrow="Research Opportunities"
              title={
                <>
                  Collaborate on{" "}
                  <span className="text-gradient">African AI research</span>
                </>
              }
              description="We welcome researchers, fellows and institutions exploring AI governance, digital ethics and inclusive innovation across the continent."
            />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
