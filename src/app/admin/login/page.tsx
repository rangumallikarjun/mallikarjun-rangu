"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { useAuth, isFirebaseConfigured } from "@/lib/auth-context";
import GradientBlobBackground from "@/components/ui/GradientBlobBackground";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <GradientBlobBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass w-full max-w-sm rounded-2xl p-8"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
            <FaLock className="text-white" size={18} />
          </div>
          <h1 className="font-heading text-xl font-semibold">Admin Login</h1>
          <p className="mt-1 text-sm text-muted">Sign in to manage your portfolio</p>
        </div>

        {!isFirebaseConfigured && (
          <p className="mb-4 rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-xs text-accent">
            Firebase isn&apos;t configured yet. Add your keys to .env.local (see README)
            before signing in.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary/60"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary/60"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-xs text-accent">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-opacity disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
