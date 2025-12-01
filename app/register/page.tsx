import React from "react";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Create account</h1>
        <p className="text-sm text-slate-400">
          Registration is currently invite-only. Please contact an admin to get access.
        </p>
      </div>
    </main>
  );
}
