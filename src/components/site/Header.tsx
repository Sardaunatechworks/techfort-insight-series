"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/sessions", label: "Sessions" },
  { to: "/research", label: "Research" },
  { to: "/community", label: "Community" },
  { to: "/partners", label: "Partners" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all duration-300 ${
            scrolled ? "glass-strong shadow-card" : "glass"
          }`}
        >
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant">
              <span className="absolute inset-0 rounded-xl bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative font-display font-bold text-primary-foreground text-sm">
                TF
              </span>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display font-semibold text-[15px] text-foreground tracking-tight">
                TechFort <span className="text-primary">Insight</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Insight Series
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => {
              const isActive = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary bg-primary/8"
                      : "text-foreground/75 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/apply"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant hover:shadow-glow transition-all"
            >
              Apply / Join
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mt-2 glass-strong rounded-2xl p-3 shadow-card animate-fade-in">
            <div className="grid grid-cols-2 gap-1">
              {nav.map((item) => {
                const isActive = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    href={item.to}
                    onClick={() => setOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-foreground/80"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/apply"
                onClick={() => setOpen(false)}
                className="col-span-2 mt-1 inline-flex items-center justify-center rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Apply / Join
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
