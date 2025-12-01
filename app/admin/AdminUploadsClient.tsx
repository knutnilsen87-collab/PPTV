"use client";

import { useEffect, useState } from "react";

type VideoRow = {
  id: string;
  title: string | null;
  vendor: string | null;
  thumbnail: string | null;
  url: string | null;
  createdAt: string;
};

type ApiResponse =
  | { videos: VideoRow[] }
  | { error: string };

export default function AdminUploadsClient() {
  const [videos, setVideos] = useState<VideoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  async function loadVideos() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/videos", { cache: "no-store" });
      const data: ApiResponse = await res.json();

      if (!res.ok || "error" in data) {
        setError("Failed to load videos");
        setVideos([]);
        return;
      }

      setVideos(data.videos);
    } catch (err) {
      console.error(err);
      setError("Failed to load videos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadVideos();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this video permanently?")) return;

    try {
      setActionMessage(null);
      const res = await fetch("/api/admin/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, action: "delete" }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setActionMessage(data.error || "Failed to delete");
        return;
      }

      setVideos((prev) => prev.filter((v) => v.id !== id));
      setActionMessage("Video deleted");
    } catch (err) {
      console.error(err);
      setActionMessage("Error while deleting video");
    }
  }

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          Upload moderation &amp; management
        </h2>
        <button
          onClick={() => void loadVideos()}
          className="px-4 py-2 rounded-lg text-sm bg-slate-800 hover:bg-slate-700 border border-slate-600"
        >
          Refresh list
        </button>
      </div>

      {loading && (
        <p className="text-sm text-slate-400">Loading latest uploads…</p>
      )}
      {error && (
        <p className="text-sm text-red-400 mb-2">
          {error}
        </p>
      )}
      {actionMessage && (
        <p className="text-sm text-emerald-400 mb-2">
          {actionMessage}
        </p>
      )}

      {!loading && videos.length === 0 && !error && (
        <p className="text-sm text-slate-400">
          No videos found yet. Once creators upload, they will appear here.
        </p>
      )}

      {videos.length > 0 && (
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/40">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-900/60 border-b border-slate-800">
              <tr>
                <th className="px-3 py-2 text-left">Thumbnail</th>
                <th className="px-3 py-2 text-left">Title</th>
                <th className="px-3 py-2 text-left">Vendor</th>
                <th className="px-3 py-2 text-left">Created</th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((v) => {
                const created = new Date(v.createdAt);
                const createdLabel = created.toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                });

                return (
                  <tr
                    key={v.id}
                    className="border-b border-slate-900/60 hover:bg-slate-900/40"
                  >
                    <td className="px-3 py-2">
                      {v.thumbnail ? (
                        // Using normal <img> here since this is admin tooling
                        <img
                          src={v.thumbnail}
                          alt={v.title ?? "Video thumbnail"}
                          className="w-20 h-12 rounded object-cover border border-slate-800"
                        />
                      ) : (
                        <div className="w-20 h-12 rounded bg-slate-800 flex items-center justify-center text-[10px] text-slate-400">
                          No thumbnail
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2 max-w-xs">
                      <div className="font-medium truncate">
                        {v.title ?? "(untitled video)"}
                      </div>
                      {v.url && (
                        <div className="text-[11px] text-slate-500">
                          {v.url}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <span className="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300 border border-slate-700">
                        {v.vendor ?? "unknown"}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-slate-300">
                      {createdLabel}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <button
                        onClick={() => void handleDelete(v.id)}
                        className="px-3 py-1 text-xs rounded-lg bg-red-700 hover:bg-red-600 text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
