"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaHome,
  FaUser,
  FaCode,
  FaBriefcase,
  FaFolderOpen,
  FaEnvelope,
  FaSignOutAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useAuth } from "@/lib/auth-context";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: FaHome },
  { href: "/admin/hero", label: "Hero", icon: FaUser },
  { href: "/admin/about", label: "About", icon: FaUser },
  { href: "/admin/skills", label: "Skills", icon: FaCode },
  { href: "/admin/experience", label: "Experience", icon: FaBriefcase },
  { href: "/admin/projects", label: "Projects", icon: FaFolderOpen },
  { href: "/admin/messages", label: "Messages", icon: FaEnvelope },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="glass-strong flex w-64 shrink-0 flex-col border-r border-white/5 p-5">
        <Link href="/admin" className="mb-8 px-2 font-heading text-lg font-semibold text-gradient">
          Admin Panel
        </Link>

        <nav className="flex-1 space-y-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/15 text-white"
                    : "text-muted hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={14} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-white/5 pt-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-white"
          >
            <FaExternalLinkAlt size={13} /> View Site
          </Link>
          <button
            onClick={() => logout()}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-accent/10 hover:text-accent"
          >
            <FaSignOutAlt size={14} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
