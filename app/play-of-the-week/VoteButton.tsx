"use client";

import { useState, useTransition } from "react";

interface VoteButtonProps {
  videoId: string;
  initialVotes: number;
  initiallyVoted: boolean;
  disabledReason?: string;
}

export default function VoteButton({
  videoId,
  initialVotes,
  initiallyVoted,
  disabledReason,
}: VoteButtonProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(initiallyVoted);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const disabled = hasVoted || pending || !!disabledReason;

  async function handleVote() {
    if (disabled) return;

    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/votes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoId }),
        });

        if (!res.ok) {
          throw new Error("Vote request failed");
        }

        // Optimistic update – backend may do more, but this feels snappy
        setVotes((v) => v + 1);
        setHasVoted(true);
      } catch (err) {
        console.error(err);
        setError("Could not register vote. Please try again.");
      }
    });
  }

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={handleVote}
        disabled={disabled}
        className={`w-full inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold transition
        ${
          disabled
            ? "bg-slate-800 text-slate-500 cursor-not-allowed"
            : "bg-amber-400 text-slate-950 hover:bg-amber-300"
        }`}
        title={disabledReason}
      >
        {disabledReason
          ? disabledReason
          : hasVoted
          ? "You already voted"
          : pending
          ? "Casting your vote..."
          : "Vote for this hand"}
      </button>
      <p className="text-[0.65rem] text-slate-500">
        Votes are stored in your local dev database. In production, additional
        anti-abuse and eligibility checks would be added.
      </p>
      {error && (
        <p className="text-[0.65rem] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
