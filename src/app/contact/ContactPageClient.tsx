"use client";

import { useState } from "react";
import { PageHero, FadeIn } from "@/components/site/Section";
import {
  Mail,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { dbSubmitContact } from "@/lib/db";

export default function ContactPageClient() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSent(false);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const org = formData.get("org") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    try {
      await dbSubmitContact({
        name,
        email,
        org: org || "",
        subject,
        message,
      });
      setSent(true);
      (e.target as HTMLFormElement).reset();
    } catch (error: unknown) {
      console.error(error);
      const message =
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk."
        description="For partnerships, programs, research collaboration, media or community inquiries — we'd love to hear from you."
      />

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 lg:grid-cols-12">
          <FadeIn className="lg:col-span-5">
            <div className="rounded-3xl border border-border bg-gradient-to-br from-primary to-[oklch(0.35_0.12_255)] p-8 md:p-10 text-primary-foreground shadow-elegant relative overflow-hidden h-full">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
              <div className="relative">
                <div className="text-xs uppercase tracking-[0.22em] text-primary-foreground/80 font-semibold">
                  Reach out
                </div>
                <h3 className="mt-3 text-2xl font-display font-bold">
                  Digital presence
                </h3>
                <div className="mt-8 space-y-4">
                  <ContactRow
                    Icon={Mail}
                    label="Email"
                    value="hello@techfortfoundation.org"
                  />
                  <ContactRow
                    Icon={Globe}
                    label="Website"
                    value="insight.techfortfoundation.org"
                  />
                  <ContactRow
                    Icon={MessageCircle}
                    label="Community"
                    value="WhatsApp community"
                  />
                </div>
                <div className="mt-10">
                  <div className="text-xs uppercase tracking-wider text-primary-foreground/70 font-semibold">
                    Social
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur border border-white/20 text-primary-foreground hover:bg-white/20 transition-colors"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-card space-y-5"
            >
              <h3 className="text-2xl font-display font-bold text-foreground">
                Send a message
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Organisation (optional)" name="org" />
                <Field label="Subject" name="subject" required />
              </div>
              <Field label="Your message" name="message" textarea required />
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant hover:shadow-glow disabled:opacity-55 disabled:cursor-not-allowed transition-all gap-2"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? "Sending..." : "Send message"}
              </button>

              {sent && (
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm text-foreground">
                  Thank you — your message has been received. We'll be in touch
                  shortly.
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

function ContactRow({
  Icon,
  label,
  value,
}: {
  Icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/20">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-primary-foreground/70 font-semibold">
          {label}
        </div>
        <div className="text-sm">{value}</div>
      </div>
    </div>
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
