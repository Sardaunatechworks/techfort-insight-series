"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Grid,
  Layout,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ImageIcon,
  Sparkles,
  Tv,
  Search,
} from "lucide-react";
import { FadeIn, SectionHeading } from "@/components/site/Section";
import { dbGetGalleryImages, type GalleryImage } from "@/lib/db";

type LayoutType = "theater" | "grid" | "masonry";

export default function GalleryPageClient() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [layoutMode, setLayoutMode] = useState<LayoutType>("theater");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Theater Mode states
  const [activeTheaterIndex, setActiveTheaterIndex] = useState(0);
  const [isTheaterPlaying, setIsTheaterPlaying] = useState(true);

  // Fetch images and listen for storage changes
  const loadImages = async () => {
    try {
      const data = await dbGetGalleryImages();
      const sorted = [...data].sort((a, b) => (a.order || 0) - (b.order || 0));
      setImages(sorted);
    } catch (error) {
      console.error("Failed to load gallery images:", error);
    }
  };

  useEffect(() => {
    loadImages();
    window.addEventListener("tf_mock_storage_change", loadImages);
    return () => {
      window.removeEventListener("tf_mock_storage_change", loadImages);
    };
  }, []);

  // Sync filtered images when base image list or search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredImages(images);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = images.filter((img) =>
      img.caption?.toLowerCase().includes(query),
    );
    setFilteredImages(filtered);
  }, [images, searchQuery]);

  // Adjust indices if they go out of bounds
  useEffect(() => {
    if (
      activeTheaterIndex >= filteredImages.length &&
      filteredImages.length > 0
    ) {
      setActiveTheaterIndex(0);
    }
  }, [filteredImages.length, activeTheaterIndex]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1,
        );
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredImages]);

  // Slideshow Player Interval Loop for Lightbox
  useEffect(() => {
    if (!isPlaying || lightboxIndex === null) return;

    const interval = setInterval(() => {
      setLightboxIndex((prev) =>
        prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0,
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [isPlaying, lightboxIndex, filteredImages]);

  // Theater Autoplay Loop
  useEffect(() => {
    if (
      !isTheaterPlaying ||
      layoutMode !== "theater" ||
      filteredImages.length <= 1
    )
      return;

    const interval = setInterval(() => {
      setActiveTheaterIndex((prev) =>
        prev < filteredImages.length - 1 ? prev + 1 : 0,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isTheaterPlaying, layoutMode, filteredImages]);

  // Card cursor 3D tilt effects
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Tilt limit to 10 degrees max
    const tiltX = -(y / (rect.height / 2)) * 10;
    const tiltY = (x / (rect.width / 2)) * 10;

    card.style.setProperty("--rx", `${tiltX}deg`);
    card.style.setProperty("--ry", `${tiltY}deg`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="min-h-screen py-28 relative overflow-hidden bg-background">
      {/* Decorative Neon Background Blurs */}
      <div className="absolute top-0 right-0 -mt-24 h-[35rem] w-[35rem] rounded-full bg-gradient-accent opacity-15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-24 h-[30rem] w-[30rem] rounded-full bg-cyan-soft/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Header Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-8 mb-8">
          <FadeIn>
            <SectionHeading
              eyebrow="TechFort Community Chronicle"
              title={
                <>
                  Moments of <span className="text-gradient">Impacts</span>
                </>
              }
              description="A state-of-the-art interactive catalog highlighting cohorts, workshop sessions, regional conferences, and grassroots activations shaping tech skills in Africa."
            />
          </FadeIn>

          {/* Search Bar only */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/80" />
              <input
                type="text"
                placeholder="Search captions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-60 pl-10 pr-4 py-2.5 rounded-2xl border border-border bg-card/40 backdrop-blur-md text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Layout Switcher Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-border/40 pb-6 mb-10">
          <p className="text-xs text-muted-foreground text-left">
            Showing {filteredImages.length} of {images.length} moment
            {images.length !== 1 && "s"} of impact
          </p>

          <div className="flex items-center gap-2 bg-card/30 backdrop-blur-md p-1 border border-border/80 rounded-2xl shadow-card self-start shrink-0 select-none">
            {/* Cinematic Theater Selector */}
            <button
              onClick={() => setLayoutMode("theater")}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                layoutMode === "theater"
                  ? "bg-primary text-primary-foreground shadow-elegant"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Tv className="h-4 w-4" /> Theater
            </button>

            {/* Staggered Masonry Selector */}
            <button
              onClick={() => setLayoutMode("masonry")}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                layoutMode === "masonry"
                  ? "bg-primary text-primary-foreground shadow-elegant"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layout className="h-4 w-4" /> Staggered
            </button>

            {/* Uniform Grid Selector */}
            <button
              onClick={() => setLayoutMode("grid")}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                layoutMode === "grid"
                  ? "bg-primary text-primary-foreground shadow-elegant"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Grid className="h-4 w-4" /> Grid
            </button>
          </div>
        </div>

        {/* Empty States */}
        {filteredImages.length === 0 && (
          <FadeIn className="text-center py-24 border border-dashed border-border/80 rounded-[2.5rem] bg-card/5 backdrop-blur-sm">
            <ImageIcon className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground">
              No visual moments matches found
            </h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
              {searchQuery
                ? "Try searching for another keyword or caption term."
                : "Add new moments using the admin panel dashboard to populate this directory."}
            </p>
          </FadeIn>
        )}

        {/* 1. CINEMATIC THEATER VIEW */}
        {layoutMode === "theater" && filteredImages.length > 0 && (
          <div className="space-y-6">
            {/* Viewport Frame */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2.5rem] border border-border/80 bg-card shadow-elegant flex items-center justify-center">
              {/* Parallax blur layer backdrop */}
              <div className="absolute inset-0 select-none pointer-events-none overflow-hidden scale-110 blur-3xl opacity-35">
                <img
                  src={filteredImages[activeTheaterIndex]?.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Viewport canvas */}
              <div className="relative w-full h-full flex items-center justify-center p-4 md:p-10 z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTheaterIndex}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                    className="relative w-full h-full rounded-[1.8rem] overflow-hidden shadow-glow border border-border/40"
                  >
                    {/* Immersive Ken Burns Pan/Zoom Image */}
                    <motion.img
                      src={filteredImages[activeTheaterIndex]?.url}
                      alt={
                        filteredImages[activeTheaterIndex]?.caption ||
                        "Moment of Impact"
                      }
                      className="w-full h-full object-cover"
                      animate={{
                        scale: [1, 1.05, 1.02],
                        x: [0, 10, -5, 0],
                        y: [0, -5, 5, 0],
                      }}
                      transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />

                    {/* Dark gradient readability shade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent opacity-90" />

                    {/* Left/Right Overlaid Navigation Triggers */}
                    <button
                      onClick={() =>
                        setActiveTheaterIndex((prev) =>
                          prev > 0 ? prev - 1 : filteredImages.length - 1,
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white backdrop-blur-md transition-all cursor-pointer z-20"
                      title="Previous"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveTheaterIndex((prev) =>
                          prev < filteredImages.length - 1 ? prev + 1 : 0,
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white backdrop-blur-md transition-all cursor-pointer z-20"
                      title="Next"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>

                    {/* On-stage Options Toolbar */}
                    <div className="absolute top-4 right-4 flex items-center gap-3 z-20">
                      <button
                        onClick={() => setIsTheaterPlaying((p) => !p)}
                        className="inline-flex h-10 px-4 items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer"
                      >
                        {isTheaterPlaying ? (
                          <>
                            <Pause className="h-4 w-4 text-cyan-soft" /> Loop
                            Auto
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4" /> Pause Auto
                          </>
                        )}
                      </button>
                    </div>

                    {/* Metadata & Description Info Block */}
                    <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row md:items-end justify-between gap-6 z-20">
                      <div className="max-w-2xl text-left space-y-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                          <Sparkles className="h-3.5 w-3.5" /> Moment{" "}
                          {activeTheaterIndex + 1} of {filteredImages.length}
                        </span>
                        <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight leading-snug drop-shadow-md">
                          {filteredImages[activeTheaterIndex]?.caption ||
                            "Untitled Moment"}
                        </h3>
                      </div>

                      <button
                        onClick={() => setLightboxIndex(activeTheaterIndex)}
                        className="inline-flex h-12 px-6 items-center gap-2 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/95 shadow-elegant hover:shadow-glow font-semibold text-xs uppercase tracking-wider transition-all shrink-0 cursor-pointer"
                      >
                        <Maximize2 className="h-4 w-4" /> Fullscreen
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Viewport Thumbnail Carousel */}
            <div className="relative py-2 px-1 overflow-x-auto scrollbar-none scroll-smooth">
              <div className="flex gap-4 min-w-max py-2">
                {filteredImages.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setActiveTheaterIndex(idx)}
                    className={`relative w-28 aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                      idx === activeTheaterIndex
                        ? "border-primary scale-[1.03] shadow-glow"
                        : "border-border/60 hover:border-primary/40 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.url}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. STAGGERED FLUID MASONRY VIEW */}
        {layoutMode === "masonry" && filteredImages.length > 0 && (
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
          >
            {filteredImages.map((img, index) => (
              <motion.div
                key={img.id || index}
                layout
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: (index % 3) * 0.05 }}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="break-inside-avoid group relative overflow-hidden rounded-[2rem] border border-border/80 bg-card p-3 shadow-card transition-all cursor-pointer select-none"
                style={{
                  transformStyle: "preserve-3d",
                  transform:
                    "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale3d(1, 1, 1)",
                  transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
                onClick={() => setLightboxIndex(index)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-muted/10 transform-gpu transition-all">
                  <img
                    src={img.url}
                    alt={img.caption || "Moments of Impact"}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur text-white">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                {img.caption && (
                  <div className="p-4 text-left">
                    <p className="text-xs font-semibold leading-relaxed text-foreground/80 group-hover:text-primary transition-colors">
                      {img.caption}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* 3. UNIFORM GRID VIEW */}
        {layoutMode === "grid" && filteredImages.length > 0 && (
          <motion.div
            layout
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredImages.map((img, index) => (
              <motion.div
                key={img.id || index}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.65,
                  delay: (index % 3) * 0.08,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="group relative overflow-hidden rounded-[2rem] border border-border/80 bg-card p-3 shadow-card transition-all cursor-pointer select-none"
                style={{
                  transformStyle: "preserve-3d",
                  transform:
                    "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale3d(1, 1, 1)",
                  transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
                onClick={() => setLightboxIndex(index)}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted/10 transform-gpu">
                  <img
                    src={img.url}
                    alt={img.caption || "Moments of Impact"}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-106"
                    loading="lazy"
                  />

                  {/* Overlay shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur text-white">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                {img.caption && (
                  <div className="p-4 text-left">
                    <p className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors line-clamp-2 leading-relaxed">
                      {img.caption}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* LIGHTBOX MODAL DIALOG */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-navy/95 backdrop-blur-xl p-6 md:p-8 select-none"
          >
            {/* Header controls */}
            <div className="flex items-center justify-between z-10">
              <div className="text-xs font-semibold tracking-wider text-white/50">
                Moment {lightboxIndex + 1} of {filteredImages.length}
              </div>
              <div className="flex items-center gap-3">
                {/* Auto loop player */}
                <button
                  onClick={() => setIsPlaying((p) => !p)}
                  className="inline-flex h-10 px-4 items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4 text-cyan-soft" /> Stop Playback
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" /> Start Loop
                    </>
                  )}
                </button>
                {/* Close Button */}
                <button
                  onClick={() => {
                    setLightboxIndex(null);
                    setIsPlaying(false);
                  }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Media frame */}
            <div className="relative flex-1 flex items-center justify-center py-6">
              {/* Prev */}
              <button
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev !== null && prev > 0
                      ? prev - 1
                      : filteredImages.length - 1,
                  )
                }
                className="absolute left-0 md:left-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Viewport content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="max-w-4xl max-h-[70vh] flex items-center justify-center"
                >
                  <img
                    src={filteredImages[lightboxIndex]?.url}
                    alt={filteredImages[lightboxIndex]?.caption || "Moment"}
                    className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-glow border border-white/10"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Next */}
              <button
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev !== null && prev < filteredImages.length - 1
                      ? prev + 1
                      : 0,
                  )
                }
                className="absolute right-0 md:right-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all cursor-pointer"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Description info footer */}
            <div className="z-10 text-center max-w-2xl mx-auto w-full mb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2"
                >
                  {filteredImages[lightboxIndex]?.caption ? (
                    <p className="text-white text-base leading-relaxed font-medium">
                      {filteredImages[lightboxIndex].caption}
                    </p>
                  ) : (
                    <p className="text-white/40 text-xs italic tracking-wider uppercase">
                      No Caption
                    </p>
                  )}
                  <div className="flex items-center justify-center gap-1.5 text-xs text-primary/80 font-bold uppercase tracking-widest mt-3">
                    <Sparkles className="h-3.5 w-3.5" /> Moments of Impacts
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
