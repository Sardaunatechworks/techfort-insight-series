"use client";

import React, { useEffect, useState } from "react";
import { FadeIn, SectionHeading } from "@/components/site/Section";
import {
  BookOpen,
  FileText,
  Wrench,
  Library,
  Presentation,
  GraduationCap,
  HelpCircle,
  Loader2,
} from "lucide-react";
import { dbGetResources, Resource } from "@/lib/db";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  FileText,
  Wrench,
  Library,
  Presentation,
  GraduationCap,
};

export default function ResourcesPageClient() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await dbGetResources();
        const sorted = [...data].sort(
          (a, b) => (a.order || 0) - (b.order || 0),
        );
        setResources(sorted);
      } catch (e) {
        console.error("Error loading resources:", e);
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
          <p className="text-sm text-muted-foreground">Loading resources...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <SectionHeading
            center
            eyebrow="Library"
            title={
              <>
                Explore the{" "}
                <span className="text-gradient">resource library</span>
              </>
            }
          />
        </FadeIn>
        {resources.length > 0 ? (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((res, i) => {
              const Icon = iconMap[res.icon] || HelpCircle;
              return (
                <FadeIn key={res.id || res.title || i} delay={i * 0.04}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-7 shadow-card hover:shadow-elegant hover:-translate-y-0.5 transition-all">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-lg font-display font-semibold text-foreground">
                      {res.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {res.desc}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        ) : (
          <p className="mt-14 text-center text-muted-foreground py-10">
            No resources found.
          </p>
        )}
      </div>
    </section>
  );
}
