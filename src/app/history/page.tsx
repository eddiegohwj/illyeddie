"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GameBoyFrame from "@/components/GameBoyFrame";

interface JudgmentRecord {
  id: number;
  created_at: string;
  illy_input: { whatHappened: string; pov: string; feelings: string };
  eddie_input: { whatHappened: string; pov: string; feelings: string };
  verdict: string;
  illy_rationality: number;
  eddie_rationality: number;
  illy_feedback: string;
  eddie_feedback: string;
  resolution: string;
  cat_comment: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<JudgmentRecord[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem("catcourt-auth");
    if (auth !== "true") {
      router.push("/");
      return;
    }

    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => {
        setHistory(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  const totalCases = history.length;
  const illyWins = history.filter((h) => h.illy_rationality > h.eddie_rationality).length;
  const eddieWins = history.filter((h) => h.eddie_rationality > h.illy_rationality).length;
  const ties = totalCases - illyWins - eddieWins;
  const avgIlly = totalCases > 0 ? Math.round(history.reduce((sum, h) => sum + h.illy_rationality, 0) / totalCases) : 0;
  const avgEddie = totalCases > 0 ? Math.round(history.reduce((sum, h) => sum + h.eddie_rationality, 0) / totalCases) : 0;

  return (
    <GameBoyFrame>
      <div className="text-center mb-4">
        <h1 className="text-hm-wood" style={{ fontSize: "14px" }}>
          📜 CASE HISTORY 📜
        </h1>
        <a href="/fight" className="text-hm-brown underline" style={{ fontSize: "7px" }}>
          ← BACK TO COURT
        </a>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-hm-text animate-pulse" style={{ fontSize: "8px" }}>
            LOADING RECORDS...
          </p>
        </div>
      ) : totalCases === 0 ? (
        <div className="wood-border bg-hm-cream p-6 text-center">
          <pre className="text-hm-brown mb-4" style={{ fontSize: "7px", lineHeight: "9px" }}>
            {`   /\\_/\\
  ( o.o )
   > ^ <`}
          </pre>
          <p className="text-hm-text" style={{ fontSize: "8px", lineHeight: "14px" }}>
            NO CASES YET!{"\n\n"}
            THE COURT IS EMPTY.{"\n"}
            FILE YOUR FIRST CASE! 🌻
          </p>
        </div>
      ) : (
        <>
          {/* Stats dashboard */}
          <div className="wood-border bg-hm-parchment p-3 mb-4">
            <p className="text-hm-brown mb-2" style={{ fontSize: "7px" }}>
              📊 COURT STATISTICS
            </p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-hm-wood font-bold" style={{ fontSize: "14px" }}>{totalCases}</p>
                <p className="text-hm-brown" style={{ fontSize: "6px" }}>TOTAL CASES</p>
              </div>
              <div>
                <p className="text-hm-gold-dark font-bold" style={{ fontSize: "14px" }}>{illyWins}</p>
                <p className="text-hm-brown" style={{ fontSize: "6px" }}>ILLY WINS</p>
              </div>
              <div>
                <p className="text-hm-green-dark font-bold" style={{ fontSize: "14px" }}>{eddieWins}</p>
                <p className="text-hm-brown" style={{ fontSize: "6px" }}>EDDIE WINS</p>
              </div>
            </div>
            <div className="mt-2 text-center">
              <p className="text-hm-brown" style={{ fontSize: "6px" }}>
                TIES: {ties} | AVG ILLY: {avgIlly}% | AVG EDDIE: {avgEddie}%
              </p>
            </div>
          </div>

          {/* Case list */}
          <div className="flex flex-col gap-3">
            {history.map((record) => {
              const isExpanded = expandedId === record.id;
              const illyWon = record.illy_rationality > record.eddie_rationality;
              const isTie = record.illy_rationality === record.eddie_rationality;
              const date = new Date(record.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={record.id}
                  className="wood-border bg-hm-cream p-3 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : record.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-hm-brown" style={{ fontSize: "6px" }}>
                        CASE #{record.id} • {date}
                      </p>
                      <p className="text-hm-text mt-1" style={{ fontSize: "8px" }}>
                        {isTie ? "TIE 🤝" : `${illyWon ? "ILLY" : "EDDIE"} WON 🌟`} •{" "}
                        {record.illy_rationality}% vs {record.eddie_rationality}%
                      </p>
                    </div>
                    <span className="text-hm-brown" style={{ fontSize: "10px" }}>
                      {isExpanded ? "▲" : "▼"}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t-2 border-hm-brown-light flex flex-col gap-2 animate-pixel-fade">
                      <div>
                        <p className="text-hm-brown" style={{ fontSize: "6px" }}>⚖️ VERDICT</p>
                        <p className="text-hm-text" style={{ fontSize: "7px", lineHeight: "12px" }}>{record.verdict}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-hm-brown" style={{ fontSize: "6px" }}>ILLY SAID</p>
                          <p className="text-hm-text" style={{ fontSize: "6px", lineHeight: "10px" }}>{record.illy_input.whatHappened}</p>
                        </div>
                        <div>
                          <p className="text-hm-brown" style={{ fontSize: "6px" }}>EDDIE SAID</p>
                          <p className="text-hm-text" style={{ fontSize: "6px", lineHeight: "10px" }}>{record.eddie_input.whatHappened}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-hm-brown" style={{ fontSize: "6px" }}>🌻 TO ILLY</p>
                        <p className="text-hm-text" style={{ fontSize: "7px", lineHeight: "12px" }}>{record.illy_feedback}</p>
                      </div>
                      <div>
                        <p className="text-hm-brown" style={{ fontSize: "6px" }}>🌻 TO EDDIE</p>
                        <p className="text-hm-text" style={{ fontSize: "7px", lineHeight: "12px" }}>{record.eddie_feedback}</p>
                      </div>
                      <div>
                        <p className="text-hm-brown" style={{ fontSize: "6px" }}>🤝 RESOLUTION</p>
                        <p className="text-hm-text" style={{ fontSize: "7px", lineHeight: "12px" }}>{record.resolution}</p>
                      </div>
                      <div>
                        <p className="text-hm-brown" style={{ fontSize: "6px" }}>🐱 JUDGE WHISKERS</p>
                        <p className="text-hm-text" style={{ fontSize: "7px", lineHeight: "12px" }}>{record.cat_comment}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </GameBoyFrame>
  );
}
