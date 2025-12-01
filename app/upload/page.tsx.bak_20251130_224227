"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "submitting" | "success" | "error";

export default function UploadPage() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [tag, setTag] = useState("Highlight");
  const [kind, setKind] = useState("HIGHLIGHT");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const durationSeconds = duration ? Number(duration) : undefined;

    try {
      const res = await fetch("/api/videos/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          videoUrl,
          thumbnailUrl,
          durationSeconds,
          tag,
          kind,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMessage(data?.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
      // Etter en liten pause: send admin tilbake til admin-dashboard
      setTimeout(() => {
        router.push("/admin");
      }, 800);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Network error while submitting upload.");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-16 pt-24">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-400">
            Creator tools
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Upload highlight or clip
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            This is a mock upload flow. Instead of uploading files directly,
            you paste a video or stream URL and optional thumbnail. The entry is
            stored in the database and will appear in the admin video list and
            future feeds.
          </p>
        </header>

        <main className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          {/* Form card */}
          <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-black/40 backdrop-blur">
            <h2 className="text-sm font-semibold tracking-wide text-slate-100">
              New upload
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Required fields are marked with *.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5 text-sm text-slate-100"
            >
              <div className="space-y-1.5">
                <label className="block text-xs font-medium uppercase tracking-wide text-slate-300">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: High stakes hero call on the river"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0 transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400/60"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium uppercase tracking-wide text-slate-300">
                  Video URL *
                </label>
                <input
                  type="url"
                  required
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Ex: https://stream.example.com/your-video"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0 transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400/60"
                />
                <p className="text-xs text-slate-400">
                  Can be a link to a stream, VOD, or CDN asset. In a later
                  phase this can be wired to real storage like Mux or S3.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium uppercase tracking-wide text-slate-300">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="Optional – used as card thumbnail"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0 transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400/60"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium uppercase tracking-wide text-slate-300">
                    Duration (seconds)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Ex: 128"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0 transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium uppercase tracking-wide text-slate-300">
                    Content type
                  </label>
                  <select
                    value={kind}
                    onChange={(e) => setKind(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0 transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400/60"
                  >
                    <option value="HIGHLIGHT">Highlight</option>
                    <option value="CLIP">Clip</option>
                    <option value="VOD">Full VOD</option>
                    <option value="STREAM">Live stream</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium uppercase tracking-wide text-slate-300">
                  Tag / rail label
                </label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Ex: Play of the Week, Cash Game, EPT, etc."
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0 transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400/60"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium uppercase tracking-wide text-slate-300">
                  Short description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a quick note: stakes, key players, why this moment matters."
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none ring-0 transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400/60"
                />
              </div>

              {status === "error" && (
                <p className="text-xs font-medium text-rose-400">
                  {errorMessage || "Upload failed. Please try again."}
                </p>
              )}

              {status === "success" && (
                <p className="text-xs font-medium text-emerald-400">
                  Upload saved. Redirecting you to the admin dashboard…
                </p>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-amber-400 px-6 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-[0_0_25px_rgba(251,191,36,0.45)] transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Saving…" : "Save upload"}
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/admin")}
                  className="text-xs font-medium text-slate-400 underline-offset-4 hover:underline"
                >
                  Back to admin
                </button>
              </div>
            </form>
          </section>

          {/* Helper panel */}
          <aside className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/40 p-5 text-xs text-slate-300 shadow-inner shadow-black/40">
            <h2 className="text-sm font-semibold text-slate-100">
              How this mock upload works
            </h2>
            <p>
              This page is a product sandbox. We store uploads in the database
              so you can see how a real content pipeline could behave – but we
              don&apos;t handle raw video files yet.
            </p>
            <ul className="list-disc space-y-1 pl-4">
              <li>
                Admins can create entries that appear in future feeds, rails and
                the admin dashboard.
              </li>
              <li>
                In a later phase this form can be swapped to a real file upload
                flow using providers like Mux or S3.
              </li>
              <li>
                Tags and content types (Highlight, Clip, VOD) can be used to
                power different rails on the home page and /feed.
              </li>
            </ul>
            <p className="pt-2 text-[11px] text-slate-500">
              Tip: For testing, paste any public video or stream URL and a mock
              thumbnail from your design system. The important part is how it
              flows through the UI – not the underlying storage (yet).
            </p>
          </aside>
        </main>
      </div>
    </div>
  );
}
