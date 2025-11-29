export default function Profile(){
  return (
    <section className="grid gap-4">
      <header>
        <h1 className="text-xl font-bold">Your profile</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">Manage account and preferences.</p>
      </header>
      <div className="grid gap-3 rounded-2xl border p-4">
        <h2 className="font-semibold">Preferences</h2>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Enable reduced motion</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Email me Play of the Week</label>
      </div>
    </section>
  )
}
