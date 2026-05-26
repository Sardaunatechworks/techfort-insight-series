"use client";

import { useState } from "react";
import { PageHero, FadeIn } from "@/components/site/Section";
import {
  Users,
  Heart,
  Mic,
  Handshake,
  GraduationCap,
  Loader2,
} from "lucide-react";
import { dbSubmitApplication } from "@/lib/db";

const tracks = [
  {
    id: "community",
    Icon: Users,
    title: "Join Community",
    desc: "Become part of our continental network of learners and builders.",
  },
  {
    id: "volunteer",
    Icon: Heart,
    title: "Volunteer",
    desc: "Lend your skills across design, content, research and operations.",
  },
  {
    id: "speaker",
    Icon: Mic,
    title: "Speak",
    desc: "Share research, perspectives or experiences at an Insight Series session.",
  },
  {
    id: "partner",
    Icon: Handshake,
    title: "Partner",
    desc: "Collaborate as an institution, foundation or program partner.",
  },
  {
    id: "mentor",
    Icon: GraduationCap,
    title: "Mentorship",
    desc: "Apply to receive or offer mentorship within the TechFort ecosystem.",
  },
];

export default function ApplyPageClient() {
  const [track, setTrack] = useState("community");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSubmitted(false);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const country = formData.get("country") as string;
    const org = formData.get("org") as string;
    const message = formData.get("message") as string;

    try {
      await dbSubmitApplication({
        name,
        email,
        country: country || "",
        org: org || "",
        track,
        message,
      });
      setSubmitted(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error
          ? err.message
          : "Failed to submit application. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Apply / Join"
        title="Become part of the TechFort ecosystem"
        description="Choose how you want to engage with the TechFort Insight Series — community, volunteering, speaking, partnership or mentorship."
      />

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 lg:grid-cols-12">
          <FadeIn className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold">
              Choose a track
            </div>
            <div className="mt-6 space-y-3">
              {tracks.map(({ id, Icon, title, desc }) => {
                const active = track === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setTrack(id);
                      setSubmitted(false);
                      setError(null);
                    }}
                    className={`w-full text-left rounded-2xl border p-5 transition-all ${
                      active
                        ? "border-primary bg-primary/5 shadow-elegant"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`inline-flex h-11 w-11 items-center justify-center rounded-xl shrink-0 ${active ? "bg-gradient-primary text-primary-foreground shadow-elegant" : "bg-primary/10 text-primary"}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="font-display font-semibold text-foreground">
                          {title}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {desc}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-card space-y-5"
            >
              <h3 className="text-2xl font-display font-bold text-foreground">
                {tracks.find((t) => t.id === track)?.title} application
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Country" name="country" />
                <Field label="Organisation (optional)" name="org" />
              </div>
              <Field
                label="Tell us about yourself & why you're applying"
                name="message"
                textarea
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant hover:shadow-glow disabled:opacity-55 disabled:cursor-not-allowed transition-all gap-2"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? "Submitting..." : "Submit application"}
              </button>

              {submitted && (
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm text-foreground">
                  Thank you — your application has been received. Our team will
                  be in touch.
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-500">
                  {error}
                </div>
              )}
            </form>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const base =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors";
  return (
    <label className={textarea ? "block sm:col-span-2" : "block"}>
      <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          className={`mt-2 ${base}`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className={`mt-2 ${base}`}
        />
      )}
    </label>
  );
}
