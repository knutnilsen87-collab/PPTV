"use client";

import { useEffect, useState } from "react";
import UploadForm from "@/components/UploadForm";

type Author = {
  id: string;
  name: string | null;
} | null;

type Video = {
  id: string;
  title: string;
  description: string | null;
  url: string;
  thumbnail: string | null;
  createdAt: string;
  author?: Author;
  votes: number;
};

type Status = "idle" | "loading" | "error";

export default function ClipsPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function loadVideos() {
    try {
      setStatus("loading");
      setError(null);

      const res = await fetch("/api/videos", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Kunne ikke hente videoer");
      }
      const data: Video[] = await res.json();

      const sorted = [...data].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setVideos(sorted);
      setStatus("idle");
    } catch (err: any) {
      console.error("loadVideos error", err);
      setError(err.message ?? "Ukjent feil ved henting av videoer.");
      setStatus("error");
    }
  }

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black px-4 py-16">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
        <div className="w-full lg:w-2/5">
          <UploadForm onCreated={loadVideos} />
        </div>

        <div className="w-full lg:w-3/5 space-y-4">
          <header className="space-y-2">
            <h1 className="text-2xl font-semibold text-white">
              Klippsenter
            </h1>
            <p className="text-sm text-slate-300/80">
              Last opp nye pokerøyeblikk og se dem i feeden. Disse klippene kan
              brukes direkte i Play of the Week og andre formater.
            </p>
          </header>

          <div className="flex items-center justify-between text-xs text-slate-300/80">
            <span>
              {videos.length > 0
                ? `Viser ${videos.length} klipp`
                : "Ingen klipp ennå – last opp ditt første klipp."}
            </span>
          </div>

          {status === "loading" && (
            <p className="text-sm text-slate-300/80">Laster klipp...</p>
          )}

          {error && (
            <p className="text-sm text-red-400">❌ {error}</p>
          )}

          <div className="space-y-3">
            {videos.map((video) => (
              <article
                key={video.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-950/90 to-black/90 px-4 py-3"
              >
                <div className="min-w-0 space-y-1">
                  <h2 className="truncate text-sm font-semibold text-white">
                    {video.title}
                  </h2>
                  {video.description && (
                    <p className="truncate text-xs text-slate-300/80">
                      {video.description}
                    </p>
                  )}
                  {video.author?.name && (
                    <p className="text-[11px] text-slate-400">
                      Opplastet av{" "}
                      <span className="font-medium text-slate-100">
                        {video.author.name}
                      </span>
                    </p>
                  )}
                </div>
                <a
                  href={`/video/${video.id}`}
                  className="text-xs font-medium text-amber-300 hover:text-amber-200"
                >
                  Åpne →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
