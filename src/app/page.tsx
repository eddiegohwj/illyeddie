"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSounds } from "@/components/SoundManager";
import CatJudge from "@/components/CatJudge";
import Image from "next/image";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const router = useRouter();
  const { playLogin, playError, playSelect } = useSounds();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicNodesRef = useRef<OscillatorNode[]>([]);
  const musicIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Harvest Moon style background music using Web Audio API
  const startMusic = useCallback(() => {
    if (musicPlaying) return;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // Harvest Moon-inspired peaceful loop
    // Pentatonic melody notes (C D E G A) in different octaves
    const melodyNotes = [
      523, 587, 659, 784, 880, // C5 D5 E5 G5 A5
      784, 659, 587, 523, 440, // descending
      523, 659, 784, 880, 784, // ascending variation
      659, 523, 440, 392, 440, // gentle descent
    ];

    const bassNotes = [
      262, 262, 330, 330, // C4 C4 E4 E4
      392, 392, 330, 330, // G4 G4 E4 E4
      262, 262, 392, 392, // C4 C4 G4 G4
      330, 330, 262, 262, // E4 E4 C4 C4
    ];

    let noteIndex = 0;

    const playMusicNote = () => {
      if (!audioCtxRef.current) return;
      const c = audioCtxRef.current;

      // Melody voice - soft sine
      const melOsc = c.createOscillator();
      const melGain = c.createGain();
      melOsc.type = "sine";
      melOsc.frequency.setValueAtTime(melodyNotes[noteIndex % melodyNotes.length], c.currentTime);
      melGain.gain.setValueAtTime(0.04, c.currentTime);
      melGain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.5);
      melOsc.connect(melGain);
      melGain.connect(c.destination);
      melOsc.start(c.currentTime);
      melOsc.stop(c.currentTime + 0.5);

      // Bass voice - gentle triangle
      const bassOsc = c.createOscillator();
      const bassGain = c.createGain();
      bassOsc.type = "triangle";
      bassOsc.frequency.setValueAtTime(bassNotes[noteIndex % bassNotes.length], c.currentTime);
      bassGain.gain.setValueAtTime(0.025, c.currentTime);
      bassGain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.6);
      bassOsc.connect(bassGain);
      bassGain.connect(c.destination);
      bassOsc.start(c.currentTime);
      bassOsc.stop(c.currentTime + 0.6);

      // Harmony - very soft, an octave above bass
      if (noteIndex % 2 === 0) {
        const harmOsc = c.createOscillator();
        const harmGain = c.createGain();
        harmOsc.type = "sine";
        harmOsc.frequency.setValueAtTime(bassNotes[noteIndex % bassNotes.length] * 2, c.currentTime);
        harmGain.gain.setValueAtTime(0.015, c.currentTime);
        harmGain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.45);
        harmOsc.connect(harmGain);
        harmGain.connect(c.destination);
        harmOsc.start(c.currentTime);
        harmOsc.stop(c.currentTime + 0.45);
      }

      noteIndex++;
    };

    // Play first note immediately, then every 400ms
    playMusicNote();
    musicIntervalRef.current = setInterval(playMusicNote, 400);
    setMusicPlaying(true);
  }, [musicPlaying]);

  const stopMusic = useCallback(() => {
    if (musicIntervalRef.current) {
      clearInterval(musicIntervalRef.current);
      musicIntervalRef.current = null;
    }
    musicNodesRef.current.forEach((n) => { try { n.stop(); } catch {} });
    musicNodesRef.current = [];
    audioCtxRef.current?.close();
    audioCtxRef.current = null;
    setMusicPlaying(false);
  }, []);

  useEffect(() => {
    const auth = sessionStorage.getItem("catcourt-auth");
    if (auth === "true") {
      router.push("/fight");
      return;
    }
    setTimeout(() => setShowTitle(true), 300);
    setTimeout(() => setShowPrompt(true), 1200);

    return () => {
      // Cleanup music on unmount
      if (musicIntervalRef.current) clearInterval(musicIntervalRef.current);
      audioCtxRef.current?.close();
    };
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playSelect();

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      stopMusic();
      playLogin();
      sessionStorage.setItem("catcourt-auth", "true");
      setTimeout(() => router.push("/fight"), 800);
    } else {
      playError();
      setError(true);
      setPassword("");
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gradient-to-b from-[#8D6E63] to-[#6D4C41] rounded-xl p-4 shadow-2xl border-4 border-[#4E342E] mx-4">
        <div className="bg-hm-cream rounded-lg p-8 md:p-12 flex flex-col items-center gap-6">
          {/* Illy & Eddie Avatars + Cat Judge */}
          <div
            className={`transition-all duration-700 ${
              showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Avatars row */}
            <div className="flex items-center justify-center gap-4 mb-4">
              {/* Illy avatar */}
              <div className="animate-float" style={{ animationDelay: "0s" }}>
                <div className="wood-border p-1 bg-hm-parchment rounded-lg">
                  <Image
                    src="/avatars/illy.png"
                    alt="Illy"
                    width={60}
                    height={60}
                    className="rounded"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
                <p
                  className="text-hm-gold text-center mt-1"
                  style={{ fontSize: "6px" }}
                >
                  ILLY
                </p>
              </div>

              {/* Cat Judge */}
              <div className="animate-cat-idle">
                <CatJudge state="idle" />
              </div>

              {/* Eddie avatar */}
              <div className="animate-float" style={{ animationDelay: "1s" }}>
                <div className="wood-border p-1 bg-hm-parchment rounded-lg">
                  <Image
                    src="/avatars/eddie.png"
                    alt="Eddie"
                    width={60}
                    height={60}
                    className="rounded"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
                <p
                  className="text-hm-green text-center mt-1"
                  style={{ fontSize: "6px" }}
                >
                  EDDIE
                </p>
              </div>
            </div>

            <h1
              className="text-hm-wood text-center leading-relaxed"
              style={{ fontSize: "20px" }}
            >
              CAT COURT
            </h1>
            <p
              className="text-hm-brown text-center mt-3"
              style={{ fontSize: "8px" }}
            >
              illy & eddie edition
            </p>
            <div className="flex justify-center gap-1 mt-2">
              <span>🌻</span>
              <span>🐱</span>
              <span>🌻</span>
            </div>
          </div>

          {/* Password prompt */}
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col items-center gap-4 transition-all duration-500 ${
              showPrompt ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p
              className="text-hm-text text-center"
              style={{ fontSize: "8px" }}
            >
              ENTER PASSWORD
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`hm-password ${error ? "animate-shake" : ""}`}
              placeholder="* * * * *"
              autoFocus
            />
            <div className="flex gap-3 items-center">
              <button type="submit" className="hm-btn">
                START
              </button>
              <button
                type="button"
                className="hm-btn"
                style={{ fontSize: "8px", padding: "6px 10px" }}
                onClick={(e) => {
                  e.preventDefault();
                  if (musicPlaying) {
                    stopMusic();
                  } else {
                    startMusic();
                  }
                }}
              >
                {musicPlaying ? "🔇" : "🎵"}
              </button>
            </div>
            {error && (
              <p
                className="text-hm-sunset animate-pixel-fade"
                style={{ fontSize: "8px" }}
              >
                WRONG PASSWORD!
              </p>
            )}
          </form>

          <p
            className="text-hm-brown-light text-center animate-pulse"
            style={{ fontSize: "7px" }}
          >
            2026 CAT COURT
          </p>
        </div>
      </div>
    </div>
  );
}
