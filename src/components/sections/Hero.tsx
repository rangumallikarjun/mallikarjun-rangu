"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaArrowDown } from "react-icons/fa";
import { subscribeHero } from "@/lib/data/content";
import { placeholderHero } from "@/lib/data/placeholders";
import type { HeroContent } from "@/types/content";
import { useTypewriter } from "@/hooks/useTypewriter";
import MagneticButton from "@/components/ui/MagneticButton";

const SOCIAL_ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  email: FaEnvelope,
};

export default function Hero() {
  const [hero, setHero] = useState<HeroContent>(placeholderHero);
  const roleText = useTypewriter(hero.roles?.length ? hero.roles : [""]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(139,92,246,0.15), transparent 70%)`;

  useEffect(() => subscribeHero(setHero), []);

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mb-6 aspect-square w-32 sm:w-40 md:hidden"
          >
            <div className="absolute inset-0 animate-float rounded-full bg-gradient-to-br from-primary/40 via-accent/30 to-secondary/40 blur-xl" />
            <div className="glass relative flex h-full w-full items-center justify-center rounded-full text-2xl font-bold text-gradient">
              {hero.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={hero.avatarUrl}
                  alt={hero.name}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                hero.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
              )}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-secondary"
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
          >
            <span className="text-gradient">{hero.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-4 h-9 text-xl font-medium text-foreground/90 sm:text-2xl"
          >
            {roleText}
            <span className="ml-0.5 animate-pulse text-primary">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-6 max-w-lg text-muted mx-auto md:mx-0"
          >
            {hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
            <MagneticButton
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25"
            >
              View My Work
            </MagneticButton>

            {hero.resumeUrl && (
              <MagneticButton
                href={hero.resumeUrl}
                target="_blank"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white"
              >
                Download Resume
              </MagneticButton>
            )}

            <div className="flex items-center gap-3 pl-2">
              {Object.entries(hero.social || {}).map(([key, url]) => {
                const Icon = SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS];
                if (!Icon || !url) return null;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-all hover:-translate-y-1 hover:border-primary/50 hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden aspect-square w-full max-w-sm md:block"
        >
          <div className="absolute inset-0 animate-float rounded-full bg-gradient-to-br from-primary/40 via-accent/30 to-secondary/40 blur-2xl" />
          <div className="glass relative flex h-full w-full items-center justify-center rounded-full text-6xl font-bold text-gradient">
            {hero.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={hero.avatarUrl}
                alt={hero.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              hero.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
