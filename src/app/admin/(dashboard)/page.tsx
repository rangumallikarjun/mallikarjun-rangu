"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaCode, FaBriefcase, FaFolderOpen, FaEnvelope } from "react-icons/fa";
import { subscribeSkills } from "@/lib/data/skills";
import { subscribeExperience } from "@/lib/data/experience";
import { subscribeProjects } from "@/lib/data/projects";
import { subscribeMessages } from "@/lib/data/messages";
import { PageHeader } from "@/components/admin/Card";

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({
    skills: 0,
    experience: 0,
    projects: 0,
    messages: 0,
    unread: 0,
  });

  useEffect(() => {
    const unsubs = [
      subscribeSkills((items) => setCounts((c) => ({ ...c, skills: items.length }))),
      subscribeExperience((items) =>
        setCounts((c) => ({ ...c, experience: items.length }))
      ),
      subscribeProjects((items) => setCounts((c) => ({ ...c, projects: items.length }))),
      subscribeMessages((items) =>
        setCounts((c) => ({
          ...c,
          messages: items.length,
          unread: items.filter((m) => !m.read).length,
        }))
      ),
    ];
    return () => unsubs.forEach((u) => u());
  }, []);

  const cards = [
    { href: "/admin/skills", label: "Skills", value: counts.skills, icon: FaCode },
    {
      href: "/admin/experience",
      label: "Experience",
      value: counts.experience,
      icon: FaBriefcase,
    },
    {
      href: "/admin/projects",
      label: "Projects",
      value: counts.projects,
      icon: FaFolderOpen,
    },
    {
      href: "/admin/messages",
      label: "Messages",
      value: counts.messages,
      sublabel: counts.unread ? `${counts.unread} unread` : undefined,
      icon: FaEnvelope,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Manage everything shown on your public portfolio."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="glass glow-border rounded-2xl p-6 transition-transform hover:-translate-y-1"
          >
            <card.icon className="mb-4 text-secondary" size={20} />
            <p className="text-2xl font-semibold">{card.value}</p>
            <p className="text-sm text-muted">{card.label}</p>
            {card.sublabel && (
              <p className="mt-1 text-xs font-medium text-accent">{card.sublabel}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
