"use client";

interface CatJudgeProps {
  state: "idle" | "waiting" | "thinking" | "verdict";
}

export default function CatJudge({ state }: CatJudgeProps) {
  const stateLabels: Record<string, string> = {
    idle: "JUDGE WHISKERS\nAWAITS YOUR CASE",
    waiting: "WAITING FOR\nBOTH PARTIES...",
    thinking: "DELIBERATING...",
    verdict: "VERDICT READY!",
  };

  const gavelSpeed = state === "verdict" ? "0.35s" : state === "thinking" ? "1.2s" : "3s";
  const tailSpeed = state === "verdict" ? "0.5s" : "2.5s";
  const leftPawSpeed = state === "verdict" ? "0.3s" : state === "thinking" ? "1s" : "1.8s";

  return (
    <div className="flex flex-col items-center gap-3">
      <div>
        <svg
          width="180"
          height="210"
          viewBox="-10 0 200 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="select-none"
          style={{ overflow: "visible" }}
        >
          {/* ============================================ */}
          {/*   CUTE BLACK CAT - matching reference PNG    */}
          {/*   Round head, small body, stubby legs,       */}
          {/*   dark maroon outline, big yellow eyes       */}
          {/* ============================================ */}

          {/* === TAIL (behind body) === */}
          <path
            d="M125,140 Q148,125 150,105 Q151,95 145,88"
            stroke="#2D2D2D"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M125,140 Q148,125 150,105 Q151,95 145,88;M125,140 Q152,128 153,108 Q154,97 150,90;M125,140 Q148,125 150,105 Q151,95 145,88"
              dur={tailSpeed}
              repeatCount="indefinite"
            />
          </path>
          {/* Tail tip - dark maroon */}
          <circle cx="145" cy="88" r="6" fill="#2D2D2D">
            <animate attributeName="cx" values="145;150;145" dur={tailSpeed} repeatCount="indefinite" />
            <animate attributeName="cy" values="88;90;88" dur={tailSpeed} repeatCount="indefinite" />
          </circle>

          {/* === BACK LEGS === */}
          <ellipse cx="108" cy="162" rx="12" ry="10" fill="#2D2D2D" />
          <ellipse cx="108" cy="170" rx="10" ry="6" fill="#3A3A3A" />
          <ellipse cx="72" cy="162" rx="12" ry="10" fill="#2D2D2D" />
          <ellipse cx="72" cy="170" rx="10" ry="6" fill="#3A3A3A" />

          {/* === BODY (round & chubby) === */}
          <ellipse cx="90" cy="140" rx="38" ry="30" fill="#2D2D2D" />
          {/* Body outline - dark maroon */}
          <ellipse cx="90" cy="140" rx="38" ry="30" fill="none" stroke="#4A2020" strokeWidth="2" />

          {/* === FRONT LEFT PAW - wiggles === */}
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="-4 60 130;4 60 130;-4 60 130"
              dur={leftPawSpeed}
              repeatCount="indefinite"
            />
            <ellipse cx="58" cy="155" rx="10" ry="12" fill="#2D2D2D" />
            <ellipse cx="58" cy="165" rx="9" ry="6" fill="#2D2D2D" />
            <ellipse cx="58" cy="167" rx="5" ry="3" fill="#3A3A3A" />
          </g>

          {/* === FRONT RIGHT PAW + GAVEL - knocks periodically === */}
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values={state === "verdict"
                ? "-20 120 130;8 120 130;-20 120 130"
                : "0 120 130;-15 120 130;0 120 130;0 120 130;0 120 130"}
              dur={gavelSpeed}
              repeatCount="indefinite"
            />
            {/* Arm + paw */}
            <ellipse cx="122" cy="155" rx="10" ry="12" fill="#2D2D2D" />
            <ellipse cx="122" cy="165" rx="9" ry="6" fill="#2D2D2D" />
            <ellipse cx="122" cy="167" rx="5" ry="3" fill="#3A3A3A" />
            {/* Gavel handle */}
            <rect x="120" y="140" width="5" height="26" rx="2" fill="#A1887F" />
            {/* Gavel head */}
            <rect x="113" y="133" width="20" height="11" rx="3" fill="#6D4C41" />
            <rect x="115" y="135" width="16" height="7" rx="2" fill="#8D6E63" />
            {/* Gavel band */}
            <rect x="121" y="133" width="3" height="11" rx="1" fill="#5D4037" />
          </g>

          {/* === "SILENCE!" text cloud - appears every few seconds === */}
          {(state === "idle" || state === "thinking") && (
            <g opacity="0">
              <animate
                attributeName="opacity"
                values="0;0;0;1;1;0;0;0;0;0"
                keyTimes="0;0.25;0.3;0.35;0.55;0.6;0.65;0.7;0.9;1"
                dur="5s"
                repeatCount="indefinite"
              />
              {/* Cloud shape */}
              <ellipse cx="148" cy="115" rx="28" ry="15" fill="white" stroke="#ccc" strokeWidth="1" />
              <polygon points="135,128 130,138 142,126" fill="white" />
              {/* Text */}
              <text
                x="148"
                y="112"
                textAnchor="middle"
                fontSize="6"
                fontFamily="'Press Start 2P'"
                fill="#4E342E"
              >
                ORDER!
              </text>
              <text
                x="148"
                y="122"
                textAnchor="middle"
                fontSize="5"
                fontFamily="'Press Start 2P'"
                fill="#8D6E63"
              >
                *knock*
              </text>
            </g>
          )}

          {/* === HEAD (big & round - matching reference) === */}
          {/* Head shadow/outline - maroon tint */}
          <circle cx="90" cy="78" r="42" fill="#3D1F1F" />
          {/* Main head */}
          <circle cx="90" cy="78" r="40" fill="#2D2D2D" />

          {/* === EARS (big, rounded-pointy, pink inside - matching ref) === */}
          {/* Left ear */}
          <path d="M58,58 Q52,30 42,12 Q55,25 72,48 Z" fill="#2D2D2D" stroke="#3D1F1F" strokeWidth="1" />
          <path d="M60,54 Q55,33 48,20 Q58,30 68,46 Z" fill="#E8A0A0" opacity="0.8" />
          {/* Right ear */}
          <path d="M122,58 Q128,30 138,12 Q125,25 108,48 Z" fill="#2D2D2D" stroke="#3D1F1F" strokeWidth="1" />
          <path d="M120,54 Q125,33 132,20 Q122,30 112,46 Z" fill="#E8A0A0" opacity="0.8" />

          {/* === JUDGE WIG (sits on top of head) === */}
          {/* Main wig body */}
          <ellipse cx="90" cy="42" rx="40" ry="16" fill="#E0E0E0" />
          <ellipse cx="90" cy="42" rx="36" ry="13" fill="#EEEEEE" />
          {/* Wig curls - left side */}
          <circle cx="52" cy="44" r="9" fill="#E0E0E0" />
          <circle cx="47" cy="55" r="8" fill="#DCDCDC" />
          <circle cx="50" cy="65" r="6" fill="#D0D0D0" />
          {/* Wig curls - right side */}
          <circle cx="128" cy="44" r="9" fill="#E0E0E0" />
          <circle cx="133" cy="55" r="8" fill="#DCDCDC" />
          <circle cx="130" cy="65" r="6" fill="#D0D0D0" />
          {/* Wig top rolls */}
          <circle cx="70" cy="30" r="7" fill="#EEEEEE" />
          <circle cx="90" cy="27" r="8" fill="#F5F5F5" />
          <circle cx="110" cy="30" r="7" fill="#EEEEEE" />
          {/* Wig highlight */}
          <ellipse cx="90" cy="35" rx="20" ry="5" fill="white" opacity="0.2" />

          {/* === EYES (big, round, golden - matching reference PNG) === */}
          {state === "idle" && (
            <g>
              {/* Left eye - large golden with big pupil & catchlights */}
              <circle cx="72" cy="74" r="16" fill="#E8A020" />
              <circle cx="72" cy="74" r="14" fill="#D4930A" />
              <circle cx="72" cy="74" r="12" fill="#F0A800" />
              <circle cx="72" cy="75" r="8" fill="#1a1a1a" />
              <ellipse cx="68" cy="70" rx="4" ry="5" fill="white" opacity="0.9" />
              <circle cx="76" cy="78" r="2" fill="white" opacity="0.5" />

              {/* Right eye */}
              <circle cx="108" cy="74" r="16" fill="#E8A020" />
              <circle cx="108" cy="74" r="14" fill="#D4930A" />
              <circle cx="108" cy="74" r="12" fill="#F0A800" />
              <circle cx="108" cy="75" r="8" fill="#1a1a1a" />
              <ellipse cx="104" cy="70" rx="4" ry="5" fill="white" opacity="0.9" />
              <circle cx="112" cy="78" r="2" fill="white" opacity="0.5" />

              {/* Blink overlays */}
              <rect x="54" y="56" width="38" height="36" fill="#2D2D2D" rx="10" opacity="0">
                <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.46;0.5;0.54;1" dur="3.5s" repeatCount="indefinite" />
              </rect>
              <rect x="90" y="56" width="38" height="36" fill="#2D2D2D" rx="10" opacity="0">
                <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.46;0.5;0.54;1" dur="3.5s" repeatCount="indefinite" />
              </rect>
            </g>
          )}
          {state === "waiting" && (
            <>
              {/* Sleepy half-closed - bigger eyes */}
              <circle cx="72" cy="74" r="16" fill="#E8A020" />
              <circle cx="108" cy="74" r="16" fill="#E8A020" />
              {/* Eyelids covering top */}
              <rect x="54" y="56" width="38" height="22" fill="#2D2D2D" rx="6" />
              <rect x="90" y="56" width="38" height="22" fill="#2D2D2D" rx="6" />
              {/* Visible slivers */}
              <ellipse cx="72" cy="82" rx="10" ry="5" fill="#F0A800" />
              <ellipse cx="108" cy="82" rx="10" ry="5" fill="#F0A800" />
              <circle cx="72" cy="82" r="3" fill="#1a1a1a" />
              <circle cx="108" cy="82" r="3" fill="#1a1a1a" />
              {/* Zzz */}
              <text x="124" y="55" fill="#8D6E63" fontSize="9" fontFamily="'Press Start 2P'">
                z
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="y" values="55;45" dur="1.5s" repeatCount="indefinite" />
              </text>
              <text x="136" y="42" fill="#8D6E63" fontSize="12" fontFamily="'Press Start 2P'">
                Z
                <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                <animate attributeName="y" values="42;30" dur="2s" repeatCount="indefinite" />
              </text>
            </>
          )}
          {state === "thinking" && (
            <>
              {/* Focused eyes - larger, pupils darting */}
              <circle cx="72" cy="74" r="16" fill="#E8A020" />
              <circle cx="72" cy="74" r="12" fill="#F0A800" />
              <circle cx="72" cy="75" r="8" fill="#1a1a1a">
                <animate attributeName="cx" values="70;74;70" dur="1.2s" repeatCount="indefinite" />
              </circle>
              <ellipse cx="68" cy="70" rx="3.5" ry="4" fill="white" opacity="0.9">
                <animate attributeName="cx" values="66;70;66" dur="1.2s" repeatCount="indefinite" />
              </ellipse>

              <circle cx="108" cy="74" r="16" fill="#E8A020" />
              <circle cx="108" cy="74" r="12" fill="#F0A800" />
              <circle cx="108" cy="75" r="8" fill="#1a1a1a">
                <animate attributeName="cx" values="106;110;106" dur="1.2s" repeatCount="indefinite" />
              </circle>
              <ellipse cx="104" cy="70" rx="3.5" ry="4" fill="white" opacity="0.9">
                <animate attributeName="cx" values="102;106;102" dur="1.2s" repeatCount="indefinite" />
              </ellipse>

              {/* Sweat drop */}
              <ellipse cx="132" cy="62" rx="3.5" ry="5" fill="#81D4FA" opacity="0">
                <animate attributeName="cy" values="55;72" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0.9;0" keyTimes="0;0.7;1" dur="1.2s" repeatCount="indefinite" />
              </ellipse>

              {/* Thinking bubble */}
              <circle cx="137" cy="48" r="3" fill="white" opacity="0.7" />
              <circle cx="144" cy="38" r="5" fill="white" opacity="0.7" />
              <ellipse cx="154" cy="25" rx="12" ry="9" fill="white" stroke="#ccc" strokeWidth="1" />
              <text x="149" y="29" fontSize="11">🤔</text>
            </>
          )}
          {state === "verdict" && (
            <>
              {/* Happy ^^ eyes - wider arc for bigger eyes */}
              <path d="M58,79 Q72,60 86,79" stroke="#F0A800" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M94,79 Q108,60 122,79" stroke="#F0A800" strokeWidth="5" fill="none" strokeLinecap="round" />

              {/* Blush cheeks */}
              <ellipse cx="58" cy="90" rx="10" ry="5" fill="#E57373" opacity="0.4" />
              <ellipse cx="122" cy="90" rx="10" ry="5" fill="#E57373" opacity="0.4" />

              {/* Sparkles */}
              <text x="35" y="45" fontSize="14">
                ✨
                <animate attributeName="opacity" values="0.2;1;0.2" dur="0.7s" repeatCount="indefinite" />
              </text>
              <text x="135" y="45" fontSize="14">
                ✨
                <animate attributeName="opacity" values="0.2;1;0.2" dur="0.7s" begin="0.35s" repeatCount="indefinite" />
              </text>
              <text x="82" y="15" fontSize="12">
                ⭐
                <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
              </text>
            </>
          )}

          {/* === NOSE (round pink - matching ref) === */}
          <ellipse cx="90" cy="90" rx="4" ry="3.5" fill="#E8A0A0" />
          <ellipse cx="90" cy="89" rx="2.5" ry="2" fill="#D4868A" />

          {/* === MOUTH (cute W shape - matching ref) === */}
          {state === "verdict" ? (
            <path d="M80,96 Q90,108 100,96" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
          ) : state === "thinking" ? (
            <path d="M84,97 Q90,95 96,97" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M82,96 Q86,100 90,96 Q94,100 98,96" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          )}

          {/* === WHISKERS (white, prominent - matching ref) === */}
          <line x1="58" y1="88" x2="30" y2="83" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <line x1="58" y1="92" x2="28" y2="93" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <line x1="58" y1="96" x2="32" y2="102" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <line x1="122" y1="88" x2="150" y2="83" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <line x1="122" y1="92" x2="152" y2="93" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <line x1="122" y1="96" x2="148" y2="102" stroke="white" strokeWidth="1.5" opacity="0.7" />

          {/* === GAVEL IMPACT (verdict only) === */}
          {state === "verdict" && (
            <g>
              <text x="138" y="170" fontSize="14">
                💥
                <animate attributeName="opacity" values="0;1;0" dur="0.35s" repeatCount="indefinite" />
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Status label */}
      <div className="wood-border bg-hm-parchment p-2 text-center min-w-[140px]">
        <p
          className="text-hm-text whitespace-pre-line"
          style={{ fontSize: "7px", lineHeight: "12px" }}
        >
          {stateLabels[state]}
        </p>
        {state === "thinking" && (
          <div className="flex justify-center gap-1 mt-2">
            <span className="w-2 h-2 rounded-full bg-hm-gold animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 rounded-full bg-hm-gold animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 rounded-full bg-hm-gold animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        )}
      </div>
    </div>
  );
}
