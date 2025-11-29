"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callbackUrl = searchParams.get("callbackUrl") ?? "/account";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    setSubmitting(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(callbackUrl);
  }

  return (
    <main className="flex min-h-[60vh] items-start justify-center px-4 py-16">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/60">
        <h1 className="mb-2 text-xl font-semibold text-white">Sign in</h1>
        <p className="mb-6 text-sm text-slate-300">
          Sign in with your ProPokerTV account to access your profile,
          Play of the Week voting and more.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-100">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none ring-amber-400/60 placeholder:text-slate-500 focus:border-amber-400/70 focus:ring-2"
              placeholder="you@propokertv.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-100">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none ring-amber-400/60 placeholder:text-slate-500 focus:border-amber-400/70 focus:ring-2"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 px-4 py-2 text-sm font-medium text-black shadow-[0_0_24px_rgba(251,191,36,0.7)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-400">
          Need an account?{" "}
          <a
            href="/register"
            className="font-medium text-amber-300 hover:text-amber-200"
          >
            Sign up
          </a>
        </p>
      </section>
    </main>
  );
}
