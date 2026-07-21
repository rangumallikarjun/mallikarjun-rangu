"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { subscribeSkills } from "@/lib/data/skills";
import { placeholderSkills } from "@/lib/data/placeholders";
import type { Skill } from "@/types/content";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/Stagger";
import SkillIcon from "@/components/ui/SkillIcon";

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>(placeholderSkills);

  useEffect(() => subscribeSkills(setSkills), []);

  const grouped = useMemo(() => {
    const map = new Map<string, Skill[]>();
    for (const skill of skills) {
      const list = map.get(skill.category) ?? [];
      list.push(skill);
      map.set(skill.category, list);
    }
    return Array.from(map.entries());
  }, [skills]);

  return (
    <AnimatedSection id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="Skills"
        title="Tools I Work With"
        description="A snapshot of the technologies I use to design, build, and ship full stack products."
      />

      <div className="space-y-12">
        {grouped.map(([category, items]) => (
          <div key={category}>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              {category}
            </h3>
            <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((skill) => (
                <StaggerItem key={skill.id}>
                  <div className="glass glow-border group rounded-xl p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <SkillIcon
                        name={skill.icon}
                        className="text-secondary transition-transform group-hover:scale-110"
                      />
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
