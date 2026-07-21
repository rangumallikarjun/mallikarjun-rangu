import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted sm:flex-row">
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        <p className="flex items-center gap-1">
          Built with Next.js, Framer Motion &amp; Firebase ·{" "}
          <Link href="/admin" className="text-muted/70 hover:text-white transition-colors">
            Admin
          </Link>
        </p>
      </div>
    </footer>
  );
}
