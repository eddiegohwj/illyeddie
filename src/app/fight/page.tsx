"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [illySubmission, setIllySubmission] = useState<Submission | null>(null);
  const [eddieSubmission, setEddieSubmission] = useState<Submission | null>(null);
  const [judgeState, setJudgeState] = useState<"idle" | "waiting" | "thinking" | "verdict" | "error">("idle");
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { playSubmit, playThinking, playVerdict, playError } = useSounds();

  useEffect(() => {
    const auth = sessionStorage.getItem("catcourt-auth");
    if (auth !== "true") {
      router.push("/");
    }
  }, [router]);

  const callJudge = useCallback(async (illy: Submission, eddie: Submission) => {
    setJudgeState("thinking");
    setError(null);
    playThinking();

    try {
      const res = await fetch("/api/judge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ illy, eddie }),
      });

      if (!res.ok) throw new Error("Judge failed");

      const data = await res.json();
      setVerdict(data);
      setJudgeState("verdict");
      playVerdict();
    } catch {
      playError();
      setError("JUDGE WHISKERS HAD A HAIRBALL! TRY AGAIN.");
      setJudgeState("error");
    }
  }, [playThinking, playVerdict, playError]);

  useEffect(() => {
    if (illySubmission && eddieSubmission && judgeState === "waiting") {
      callJudge(illySubmission, eddieSubmission);
    }
  }, [illySubmission, eddieSubmission, judgeState, callJudge]);

  const handleIllySubmit = (data: Submission) => {
    playSubmit();
    setIllySubmission(data);
    if (!eddieSubmission) setJudgeState("waiting");
  };

  const handleEddieSubmit = (data: Submission) => {
    playSubmit();
    setEddieSubmission(data);
    if (!illySubmission) setJudgeState("waiting");
  };

  const handleNewCase = () => {
    setIllySubmission(null);
    setEddieSubmission(null);
    setVerdict(null);
    setJudgeState("idle");
    setError(null);
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
          <div className="flex justify-center gap-3 mt-3">
            <button
              className="hm-btn"
              style={{ fontSize: "7px" }}
              onClick={() => {
                setError(null);
                if (illySubmission && eddieSubmission) {
                  callJudge(illySubmission, eddieSubmission);
                }
              }}
            >
              RETRY
            </button>
            <button
              className="hm-btn"
              style={{ fontSize: "7px" }}
              onClick={handleNewCase}
            >
              NEW CASE
            </button>
          </div>
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
            onSubmit={handleIllySubmit}
            disabled={judgeState === "thinking"}
            submitted={!!illySubmission}
          />
          <div className="flex justify-center lg:pt-8 order-first lg:order-none">
            <CatJudge state={judgeState === "error" ? "idle" : judgeState} />
          </div>
          <InputPanel
            person="eddie"
            onSubmit={handleEddieSubmit}
            disabled={judgeState === "thinking"}
            submitted={!!eddieSubmission}
          />
        </div>
      )}
    </GameBoyFrame>
  );
}
