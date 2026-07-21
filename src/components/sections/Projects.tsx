"use client";

import { useEffect, useState } from "react";
import { subscribeProjects } from "@/lib/data/projects";
import { placeholderProjects } from "@/lib/data/placeholders";
import type { Project } from "@/types/content";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/Stagger";
import ProjectCard from "@/components/sections/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(placeholderProjects);

  useEffect(() => subscribeProjects(setProjects), []);

  return (
    <AnimatedSection id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've Built"
        description="A selection of projects spanning frontend, backend, and full stack products."
      />

      <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <StaggerItem key={project.id}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </AnimatedSection>
  );
}
