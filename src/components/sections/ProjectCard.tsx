"use client";

import { type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import type { Project } from "@/types/content";

export default function ProjectCard({ project }: { project: Project }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 25,
  });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="glass glow-border group relative flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-primary/30 via-bg-secondary to-secondary/20">
        {project.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl font-bold text-white/10">
            {project.title.slice(0, 2).toUpperCase()}
          </div>
        )}
        {project.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6" style={{ transform: "translateZ(20px)" }}>
        <h3 className="font-heading text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-white hover:text-secondary"
            >
              <FaExternalLinkAlt size={13} /> Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-white hover:text-secondary"
            >
              <FaGithub size={15} /> Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
