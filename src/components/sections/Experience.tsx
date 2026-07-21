"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { subscribeExperience } from "@/lib/data/experience";
import { placeholderExperience } from "@/lib/data/placeholders";
import type { ExperienceItem } from "@/types/content";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Experience() {
  const [items, setItems] = useState<ExperienceItem[]>(placeholderExperience);

  useEffect(() => subscribeExperience(setItems), []);

  return (
    <AnimatedSection id="experience" className="mx-auto max-w-4xl px-6 py-28">
      <SectionHeading eyebrow="Experience" title="Where I've Worked" />

      <div className="relative border-l border-white/10 pl-8">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top" }}
          className="absolute left-[-1px] top-0 h-full w-px bg-gradient-to-b from-primary via-accent to-secondary"
        />

        <div className="space-y-12">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <span className="absolute -left-[41px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-bg bg-gradient-to-br from-primary to-secondary shadow-[0_0_12px_rgba(139,92,246,0.6)]" />

              <div className="glass glow-border rounded-2xl p-6">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-heading text-lg font-semibold">{item.role}</h3>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-muted">
                    {item.startDate} — {item.endDate || "Present"}
                  </span>
                </div>
                <p className="mb-3 text-sm font-medium text-secondary">{item.company}</p>
                <p className="text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
