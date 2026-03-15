"use client";

interface GameBoyFrameProps {
  children: React.ReactNode;
}

export default function GameBoyFrame({ children }: GameBoyFrameProps) {
  return (
    <div className="min-h-screen flex items-start justify-center p-2 md:p-4">
      {/* Wooden frame - Harvest Moon style */}
      <div className="w-full max-w-7xl bg-gradient-to-b from-[#8D6E63] to-[#6D4C41] rounded-xl p-3 md:p-4 shadow-2xl border-4 border-[#4E342E]">
        {/* Inner wooden trim */}
        <div className="bg-gradient-to-b from-[#A1887F] to-[#8D6E63] rounded-lg p-3 md:p-4 mb-3 border-2 border-[#5D4037]">
          {/* Parchment content area */}
          <div className="hm-screen rounded-lg overflow-x-hidden overflow-y-auto relative shadow-inner">
            <div className="relative p-4 md:p-6">
              {children}
            </div>
          </div>
        </div>
        {/* Bottom bar - decorative wooden trim */}
        <div className="flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "10px" }}>🐱</span>
            <span style={{ fontSize: "7px" }} className="text-[#D7CCC8]">
              CAT COURT
            </span>
          </div>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FFB300] shadow-sm" />
            <div className="w-2 h-2 rounded-full bg-[#FF7043] shadow-sm" />
            <div className="w-2 h-2 rounded-full bg-[#7CB342] shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
