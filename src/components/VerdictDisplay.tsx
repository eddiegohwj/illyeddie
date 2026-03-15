"use client";

import { useState, useEffect } from "react";

export interface Verdict {
  verdict: string;
  illy_rationality: number;
  eddie_rationality: number;
  illy_feedback: string;
  eddie_feedback: string;
  resolution: string;
  cat_comment: string;
}

interface VerdictDisplayProps {
  verdict: Verdict;
  onNewCase: () => void;
}

export default function VerdictDisplay({ verdict, onNewCase }: VerdictDisplayProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentSection, setCurrentSection] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const sections = [
    { label: "⚖️ VERDICT", text: verdict.verdict },
    { label: "📊 RATIONALITY", text: `ILLY: ${verdict.illy_rationality}%  |  EDDIE: ${verdict.eddie_rationality}%` },
    { label: "🌻 TO ILLY", text: verdict.illy_feedback },
    { label: "🌻 TO EDDIE", text: verdict.eddie_feedback },
    { label: "🤝 RESOLUTION", text: verdict.resolution },
    { label: "🐱 JUDGE WHISKERS SAYS", text: verdict.cat_comment },
  ];

  useEffect(() => {
    if (showAll) return;
    if (currentSection >= sections.length) {
      setShowAll(true);
      return;
    }

    const currentText = sections[currentSection].text;
    if (charIndex < currentText.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 25);
      return () => clearTimeout(timer);
    }
  }, [charIndex, currentSection, showAll, sections]);

  const handleAdvance = () => {
    if (showAll) return;
    const currentText = sections[currentSection].text;
    if (charIndex < currentText.length) {
      setDisplayedText(currentText);
      setCharIndex(currentText.length);
    } else {
      setCurrentSection((prev) => prev + 1);
      setDisplayedText("");
      setCharIndex(0);
    }
  };

  const illyWon = verdict.illy_rationality > verdict.eddie_rationality;
  const tie = verdict.illy_rationality === verdict.eddie_rationality;

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto animate-pixel-fade">
      {/* Rationality bar */}
      <div className="wood-border bg-hm-parchment p-3">
        <div className="flex justify-between mb-2">
          <span className="text-hm-text" style={{ fontSize: "8px" }}>
            ILLY {verdict.illy_rationality}%
          </span>
          <span className="text-hm-text" style={{ fontSize: "8px" }}>
            {verdict.eddie_rationality}% EDDIE
          </span>
        </div>
        <div className="w-full h-6 bg-hm-brown-light rounded-full overflow-hidden flex">
          <div
            className="h-full bg-gradient-to-r from-hm-gold to-hm-gold-dark transition-all duration-1000 flex items-center justify-center rounded-l-full"
            style={{ width: `${verdict.illy_rationality}%` }}
          >
            {verdict.illy_rationality > 20 && (
              <span style={{ fontSize: "6px" }} className="text-hm-wood">ILLY</span>
            )}
          </div>
          <div
            className="h-full bg-gradient-to-r from-hm-green-dark to-hm-green transition-all duration-1000 flex items-center justify-center rounded-r-full"
            style={{ width: `${verdict.eddie_rationality}%` }}
          >
            {verdict.eddie_rationality > 20 && (
              <span style={{ fontSize: "6px" }} className="text-white">EDDIE</span>
            )}
          </div>
        </div>
        <p className="text-center mt-2 text-hm-text" style={{ fontSize: "7px" }}>
          {tie ? "IT'S A TIE! 🤝" : `${illyWon ? "ILLY" : "EDDIE"} IS MORE RATIONAL 🌟`}
        </p>
      </div>

      {/* Text box - Harvest Moon dialogue style */}
      {showAll ? (
        <div className="flex flex-col gap-3">
          {sections.map((section, i) => (
            <div key={i} className="wood-border bg-hm-cream p-3">
              <p className="text-hm-brown mb-1" style={{ fontSize: "7px" }}>
                {section.label}
              </p>
              <p className="text-hm-text" style={{ fontSize: "8px", lineHeight: "14px" }}>
                {section.text}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="wood-border bg-hm-cream p-4 min-h-[120px] cursor-pointer relative"
          onClick={handleAdvance}
        >
          <p className="text-hm-brown mb-2" style={{ fontSize: "7px" }}>
            {sections[currentSection]?.label}
          </p>
          <p className="text-hm-text" style={{ fontSize: "8px", lineHeight: "14px" }}>
            {displayedText}
            <span className="animate-pulse text-hm-gold">▼</span>
          </p>
          <p
            className="absolute bottom-2 right-3 text-hm-brown-light animate-pulse"
            style={{ fontSize: "6px" }}
          >
            {charIndex < (sections[currentSection]?.text.length || 0)
              ? "CLICK TO SKIP"
              : "CLICK TO CONTINUE"}
          </p>
        </div>
      )}

      {showAll && (
        <div className="flex flex-col items-center gap-3">
          <button className="hm-btn" onClick={onNewCase}>
            NEW CASE
          </button>
          <a href="/history" className="text-hm-brown underline" style={{ fontSize: "8px" }}>
            VIEW PAST CASES
          </a>
        </div>
      )}
    </div>
  );
}
