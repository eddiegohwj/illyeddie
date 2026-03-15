"use client";

import { useEffect, useRef, useCallback } from "react";

// Harvest Moon style warm tones using Web Audio API
export function useSounds() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioCtxRef.current = new AudioContext();
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = "triangle", volume = 0.12) => {
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    },
    []
  );

  const playSelect = useCallback(() => {
    // Soft chime - Harvest Moon menu select
    playTone(660, 0.1, "triangle");
    setTimeout(() => playTone(880, 0.12, "triangle"), 80);
  }, [playTone]);

  const playSubmit = useCallback(() => {
    // Warm confirmation - like placing an item
    playTone(440, 0.12, "triangle");
    setTimeout(() => playTone(554, 0.12, "triangle"), 100);
    setTimeout(() => playTone(660, 0.12, "triangle"), 200);
    setTimeout(() => playTone(880, 0.18, "sine", 0.1), 300);
  }, [playTone]);

  const playThinking = useCallback(() => {
    // Gentle thinking melody
    playTone(392, 0.25, "sine", 0.08);
    setTimeout(() => playTone(349, 0.25, "sine", 0.08), 300);
    setTimeout(() => playTone(392, 0.25, "sine", 0.08), 600);
    setTimeout(() => playTone(440, 0.35, "sine", 0.08), 900);
  }, [playTone]);

  const playVerdict = useCallback(() => {
    // Harvest Moon achievement jingle - warm ascending
    const notes = [440, 494, 554, 660, 740, 880];
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.15, "triangle", 0.1), i * 100);
    });
  }, [playTone]);

  const playError = useCallback(() => {
    // Soft error - not harsh
    playTone(330, 0.15, "triangle", 0.1);
    setTimeout(() => playTone(262, 0.2, "triangle", 0.1), 150);
  }, [playTone]);

  const playLogin = useCallback(() => {
    // Morning rooster / new day jingle
    const notes = [330, 392, 440, 523, 587, 660, 880];
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.18, "triangle", 0.08), i * 120);
    });
  }, [playTone]);

  return { playSelect, playSubmit, playThinking, playVerdict, playError, playLogin };
}
