"use client";
import useSWR from "swr";
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function VideoFeed() {
  const { data, error, isLoading, mutate } = useSWR("/api/clips", fetcher);
  const [filter, setFilter] = useState("");

  if (error) return <p className="text-red-500">Feil ved lasting av feed.</p>;
  if (isLoading) return <p className="text-textc-secondary">Laster videoer…</p>;

  const clips = filter
    ? data.filter((c: any) => c.title.toLowerCase().includes(filter.toLowerCase()))
    : data;

  return (
    <section className="py-10">
      <div className="mb-4 flex items-center justify-between">
        <input
          type="search"
          placeholder="Søk i klipp..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-btn border border-gold-600 bg-bg-secondary px-4 py-2 text-textc-primary focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
        <button
          onClick={() => mutate()}
          className="ml-2 rounded-btn bg-gold-500 px-4 py-2 text-bg-primary hover:bg-gold-600"
        >
          Oppdater
        </button>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {clips?.length ? (
          clips.map((clip: any) => (
            <article
              key={clip.id}
              className="rounded-card bg-surface-card p-3 shadow-e1 transition hover:shadow-lg"
            >
              <h3 className="font-display text-lg mb-2">{clip.title}</h3>
              <VideoPlayer src={clip.url} poster={clip.poster} />
              <div className="mt-2 flex justify-between text-sm text-textc-secondary">
                <span>Stemmer: {clip.votes?.length || 0}</span>
                <span>{new Date(clip.createdAt).toLocaleDateString()}</span>
              </div>
            </article>
          ))
        ) : (
          <p className="text-textc-secondary italic">Ingen klipp funnet ennå.</p>
        )}
      </div>
    </section>
  );
}