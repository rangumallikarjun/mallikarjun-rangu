"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function handleNavClick(id: string) {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <button
          onClick={() => handleNavClick("home")}
          className="font-heading text-lg font-semibold tracking-tight text-gradient"
        >
          Mallikarjun Rangu
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.id} className="relative">
              <button
                onClick={() => handleNavClick(link.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  active === link.id
                    ? "text-white"
                    : "text-muted hover:text-white"
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-primary via-accent to-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => handleNavClick("contact")}
          className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-primary/50 hover:bg-primary/10 md:inline-block"
        >
          Let&apos;s talk
        </button>

        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="h-px w-6 bg-white"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="h-px w-6 bg-white"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="h-px w-6 bg-white"
          />
        </button>
      </nav>

      {menuOpen && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-strong mx-4 mt-3 flex flex-col gap-1 rounded-2xl p-3 md:hidden"
        >
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavClick(link.id)}
                className={`block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium ${
                  active === link.id ? "bg-white/10 text-white" : "text-muted"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </header>
  );
}
