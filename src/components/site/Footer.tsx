"use client";

import Link from "next/link";
import {
  Mail,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Github,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { dbGetSocialLinks, type SocialLink } from "@/lib/db";

const cols = [
  {
    title: "Initiative",
    links: [
      { to: "/about", label: "About TechFort" },
      { to: "/programs", label: "Programs" },
      { to: "/research", label: "Research" },
      { to: "/partners", label: "Partners" },
    ],
  },
  {
    title: "Engage",
    links: [
      { to: "/sessions", label: "Sessions" },
      { to: "/community", label: "Community" },
      { to: "/resources", label: "Resources" },
      { to: "/apply", label: "Apply / Join" },
    ],
  },
  {
    title: "Programs",
    links: [
      { to: "/programs", label: "AI SENSE" },
      { to: "/programs", label: "From Curiosity to Creation" },
      { to: "/programs", label: "DSAPI" },
      { to: "/programs", label: "TechFort Academy" },
    ],
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Youtube,
  Github,
};

export function Footer() {
  const pathname = usePathname();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const links = await dbGetSocialLinks();
      if (active) {
        setSocialLinks(links);
      }
    };
    load();
    window.addEventListener("tf_mock_storage_change", load);
    return () => {
      active = false;
      window.removeEventListener("tf_mock_storage_change", load);
    };
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="relative mt-24 border-t border-border bg-surface">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant">
                <span className="font-display font-bold text-primary-foreground">
                  TF
                </span>
              </span>
              <div>
                <div className="font-display font-semibold text-foreground">
                  TechFort <span className="text-primary">Insight Series</span>
                </div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Building Africa's AI Future
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              A continental AI literacy ecosystem democratizing access to
              artificial intelligence, digital skills, research, and responsible
              innovation across underserved communities in Africa.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((link) => {
                const IconComponent = iconMap[link.icon] || Globe;
                return (
                  <a
                    key={link.id || link.platform}
                    href={link.url}
                    target={
                      link.url.startsWith("mailto:") ? undefined : "_blank"
                    }
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                  >
                    <IconComponent className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                {col.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.to}
                      className="text-sm text-foreground/80 hover:text-primary transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} TechFort Foundation. All rights
            reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            insight.techfortfoundation.org · Founded in Northern Nigeria ·
            Building across Africa
          </p>
        </div>
      </div>
    </footer>
  );
}
