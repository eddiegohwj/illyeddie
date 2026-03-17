"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import GameBoyFrame from "@/components/GameBoyFrame";
import CatJudge from "@/components/CatJudge";
import InputPanel from "@/components/InputPanel";
import VerdictDisplay, { Verdict } from "@/components/VerdictDisplay";
import { useSounds } from "@/components/SoundManager";

interface Submission {
  whatHappened: string;
  pov: string;
  feelings: string;
}

export default function FightPage() {
  const router = useRouter();
  const [illySubmitted, setIllySubmitted] = useState(false);
  const [eddieSubmitted, setEddieSubmitted] = useState(false);
  const [judgeState, setJudgeState] = useState<"idle" | "waiting" | "thinking" | "verdict" | "error">("idle");
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { playSubmit, playThinking, playVerdict, playError } = useSounds();
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasPlayedThinking = useRef(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("catcourt-auth");
    if (auth !== "true") {
      router.push("/");
    }
  }, [router]);

  // Poll server for status updates
  const pollStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/status");
      if (!res.ok) return;
      const data = await res.json();

      setIllySubmitted(data.illySubmitted);
      setEddieSubmitted(data.eddieSubmitted);

      if (data.verdict) {
        // Verdict is ready!
        setVerdict(data.verdict);
        setJudgeState("verdict");
        playVerdict();
        // Stop polling
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;
        }
      } else if (data.judging) {
        if (!hasPlayedThinking.current) {
          playThinking();
          hasPlayedThinking.current = true;
        }
        setJudgeState("thinking");
      } else if (data.illySubmitted || data.eddieSubmitted) {
        setJudgeState("waiting");
      }
    } catch {
      // Silently retry on next poll
    }
  }, [playVerdict, playThinking]);

  // Start polling when page loads
  useEffect(() => {
    // Initial check
    pollStatus();

    // Poll every 2 seconds
    pollingRef.current = setInterval(pollStatus, 2000);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [pollStatus]);

  const handleSubmit = async (person: "illy" | "eddie", data: Submission) => {
    playSubmit();

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ person, ...data }),
      });

      if (!res.ok) throw new Error("Submit failed");

      const result = await res.json();

      if (person === "illy") setIllySubmitted(true);
      else setEddieSubmitted(true);

      // If both submitted, trigger a status check immediately
      if (result.illySubmitted && result.eddieSubmitted) {
        setJudgeState("thinking");
        if (!hasPlayedThinking.current) {
          playThinking();
          hasPlayedThinking.current = true;
        }
        // Immediate status check to trigger judging
        setTimeout(pollStatus, 500);
      } else {
        setJudgeState("waiting");
      }
    } catch {
      playError();
      setError("SUBMISSION FAILED! TRY AGAIN.");
    }
  };

  const handleNewCase = async () => {
    try {
      await fetch("/api/reset", { method: "POST" });
    } catch {
      // Continue even if reset fails
    }
    setIllySubmitted(false);
    setEddieSubmitted(false);
    setVerdict(null);
    setJudgeState("idle");
    setError(null);
    hasPlayedThinking.current = false;

    // Restart polling
    if (pollingRef.current) clearInterval(pollingRef.current);
    pollingRef.current = setInterval(pollStatus, 2000);
  };

  return (
    <GameBoyFrame>
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-hm-wood" style={{ fontSize: "14px" }}>
          🐱 CAT COURT 🐱
        </h1>
        <div className="flex justify-center gap-4 mt-2">
          <a href="/history" className="text-hm-brown underline" style={{ fontSize: "7px" }}>
            PAST CASES
          </a>
        </div>
      </div>

      {error && (
        <div className="wood-border bg-hm-parchment p-3 mb-4 text-center">
          <p className="text-hm-sunset" style={{ fontSize: "7px" }}>{error}</p>
          <button
            className="hm-btn mt-3"
            style={{ fontSize: "7px" }}
            onClick={() => setError(null)}
          >
            OK
          </button>
        </div>
      )}

      {verdict && judgeState === "verdict" ? (
        <div>
          {/* Avatars with result */}
          <div className="flex justify-center gap-8 mb-4">
            <div className={`text-center ${verdict.illy_rationality >= verdict.eddie_rationality ? "animate-victory" : ""}`}>
              <div className="wood-border bg-hm-parchment p-1 w-[60px] h-[60px] relative overflow-hidden mx-auto rounded-lg">
                <img src="/avatars/illy.png" alt="Illy" className="w-full h-full object-cover rounded" />
              </div>
              <p className="text-hm-text mt-1" style={{ fontSize: "8px" }}>
                {verdict.illy_rationality}%
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-hm-gold-dark" style={{ fontSize: "10px" }}>VS</span>
            </div>
            <div className={`text-center ${verdict.eddie_rationality >= verdict.illy_rationality ? "animate-victory" : ""}`}>
              <div className="wood-border bg-hm-parchment p-1 w-[60px] h-[60px] relative overflow-hidden mx-auto rounded-lg">
                <img src="/avatars/eddie.png" alt="Eddie" className="w-full h-full object-cover rounded" />
              </div>
              <p className="text-hm-text mt-1" style={{ fontSize: "8px" }}>
                {verdict.eddie_rationality}%
              </p>
            </div>
          </div>
          <VerdictDisplay verdict={verdict} onNewCase={handleNewCase} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px_1fr] gap-4 lg:gap-6 items-start">
          <InputPanel
            person="illy"
            onSubmit={(data) => handleSubmit("illy", data)}
            disabled={judgeState === "thinking"}
            submitted={illySubmitted}
          />
          <div className="flex justify-center lg:pt-8 order-first lg:order-none">
            <CatJudge state={judgeState === "error" ? "idle" : judgeState} />
          </div>
          <InputPanel
            person="eddie"
            onSubmit={(data) => handleSubmit("eddie", data)}
            disabled={judgeState === "thinking"}
            submitted={eddieSubmitted}
          />
        </div>
      )}
    </GameBoyFrame>
  );
}
