"use client";

import { useState } from "react";
import Image from "next/image";

interface InputPanelProps {
  person: "illy" | "eddie";
  onSubmit: (data: { whatHappened: string; pov: string; feelings: string }) => void;
  disabled: boolean;
  submitted: boolean;
}

export default function InputPanel({ person, onSubmit, disabled, submitted }: InputPanelProps) {
  const [whatHappened, setWhatHappened] = useState("");
  const [pov, setPov] = useState("");
  const [feelings, setFeelings] = useState("");

  const isIlly = person === "illy";
  const avatarSrc = isIlly ? "/avatars/illy.png" : "/avatars/eddie.png";
  const displayName = isIlly ? "ILLY" : "EDDIE";

  const handleSubmit = () => {
    if (!whatHappened.trim() || !pov.trim() || !feelings.trim()) return;
    onSubmit({ whatHappened, pov, feelings });
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Avatar */}
      <div className={`relative ${submitted ? "animate-float" : ""}`}>
        <div className="wood-border bg-hm-parchment p-1 w-[80px] h-[80px] md:w-[100px] md:h-[100px] relative overflow-hidden rounded-lg">
          <Image
            src={avatarSrc}
            alt={displayName}
            fill
            className="object-cover rounded"
            style={{ imageRendering: "auto" }}
          />
        </div>
        {submitted && (
          <div
            className="absolute -top-2 -right-2 bg-hm-green text-white px-1 rounded"
            style={{ fontSize: "6px" }}
          >
            SENT
          </div>
        )}
      </div>

      {/* Name */}
      <h2 className="text-hm-wood text-center font-bold" style={{ fontSize: "12px" }}>
        {displayName}
      </h2>

      {submitted ? (
        <div className="wood-border-inset bg-hm-parchment p-3 w-full text-center rounded-lg">
          <p className="text-hm-text" style={{ fontSize: "7px", lineHeight: "12px" }}>
            TESTIMONY{"\n"}SUBMITTED!{"\n\n"}
            WAITING FOR{"\n"}{isIlly ? "EDDIE" : "ILLY"}...
          </p>
          <div className="mt-2">🌟</div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full">
          <label className="text-hm-text-light" style={{ fontSize: "6px" }}>
            🌿 WHAT HAPPENED?
          </label>
          <textarea
            className="hm-input w-full h-16 md:h-20"
            placeholder="Describe the situation..."
            value={whatHappened}
            onChange={(e) => setWhatHappened(e.target.value)}
            disabled={disabled}
          />

          <label className="text-hm-text-light" style={{ fontSize: "6px" }}>
            🌿 YOUR POV
          </label>
          <textarea
            className="hm-input w-full h-16 md:h-20"
            placeholder="Your perspective..."
            value={pov}
            onChange={(e) => setPov(e.target.value)}
            disabled={disabled}
          />

          <label className="text-hm-text-light" style={{ fontSize: "6px" }}>
            🌿 HOW DO YOU FEEL?
          </label>
          <textarea
            className="hm-input w-full h-12 md:h-16"
            placeholder="Your emotions..."
            value={feelings}
            onChange={(e) => setFeelings(e.target.value)}
            disabled={disabled}
          />

          <button
            className="hm-btn w-full mt-1"
            onClick={handleSubmit}
            disabled={disabled || !whatHappened.trim() || !pov.trim() || !feelings.trim()}
          >
            SUBMIT
          </button>
        </div>
      )}
    </div>
  );
}
