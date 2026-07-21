"use client";

import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { subscribeAbout } from "@/lib/data/content";
import { placeholderAbout } from "@/lib/data/placeholders";
import type { AboutContent } from "@/types/content";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/Stagger";

export default function About() {
  const [about, setAbout] = useState<AboutContent>(placeholderAbout);

  useEffect(() => subscribeAbout(setAbout), []);

  return (
    <AnimatedSection id="about" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="About Me" title="Who I Am" />

      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div className="space-y-5">
          {about.bio.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <StaggerContainer className="glass rounded-2xl p-6">
          <h3 className="mb-4 font-heading text-lg font-semibold">Highlights</h3>
          <ul className="space-y-3">
            {about.highlights.map((h, i) => (
              <StaggerItem key={i} className="flex items-start gap-3">
                <FaCheckCircle className="mt-0.5 shrink-0 text-secondary" size={16} />
                <span className="text-sm text-foreground/90">{h}</span>
              </StaggerItem>
            ))}
          </ul>
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
