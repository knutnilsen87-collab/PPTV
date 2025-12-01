import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - ProPokerTV",
  description:
    "Account registration for ProPokerTV. In this phase, accounts are created manually by the team.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-16">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
            Account
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
            Register for ProPokerTV
          </h1>
          <p className="text-sm text-slate-400">
            During the early access phase, new accounts are created manually by
            the ProPokerTV team. Public self-service registration will arrive in
            a later product phase.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-lg shadow-black/40">
          <h2 className="mb-2 text-sm font-medium text-slate-200">
            How to get access
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
            <li>Reach out to the team through the official ProPokerTV channels.</li>
            <li>
              Invited creators, partners and admins will receive a login
              e-mail with credentials or a magic link.
            </li>
            <li>
              Once your account is provisioned, you can log in and manage your
              profile under <span className="font-mono text-amber-300">/account</span>.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-800/80 bg-slate-900/10 p-5 text-xs text-slate-400">
          <p className="font-semibold text-slate-300">Product note</p>
          <p className="mt-1">
            Later, this page can evolve into a full registration flow with
            passwordless login, optional 2FA and invite codes for creators,
            coaches and community roles.
          </p>
        </section>
      </div>
    </main>
  );
}
