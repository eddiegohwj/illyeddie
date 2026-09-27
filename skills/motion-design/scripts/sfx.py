#!/usr/bin/env python3
"""Synthesize a small, consistent UI sound kit with numpy (no license issues).

  python3 sfx.py outdir/

Writes click, tick, pop, toggle, swipe, key, success, toast .wav (48 kHz mono) and
peaks.json with the MEASURED peak offset of each sound (seconds from file start).
mix.py uses those peaks so each sound's peak, not its file start, lands on the event.
If the user supplies their own sounds, run `python3 sfx.py --measure dir/` to write peaks.json only.
"""
import json, os, sys, wave
import numpy as np

SR = 48000
rng = np.random.default_rng(7)


def env(n, attack, decay):
    t = np.arange(n) / SR
    a = np.clip(t / max(attack, 1e-4), 0, 1)
    return a * np.exp(-np.maximum(0, t - attack) / decay)


def tone(f0, f1, dur, attack=0.002, decay=0.03):
    n = int(dur * SR)
    f = np.geomspace(f0, f1, n)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, attack, decay)


def noise(dur, attack, decay, lp=0.5):
    n = int(dur * SR)
    x = rng.standard_normal(n)
    y = np.zeros(n)
    for i in range(1, n):                      # one-pole low-pass
        y[i] = y[i - 1] + lp * (x[i] - y[i - 1])
    return y * env(n, attack, decay)


def pad(x, dur):
    out = np.zeros(int(dur * SR)); out[:len(x)] = x[:len(out)]; return out


def mix(dur, *parts):
    return sum(pad(p, dur) for p in parts)


def delay(x, sec):
    return np.concatenate([np.zeros(int(sec * SR)), x])


KIT = {
    "click":   lambda: mix(0.06, 0.5 * noise(0.03, 0.0005, 0.004, 0.6), 0.5 * tone(2400, 1800, 0.03, 0.0005, 0.006)),
    "tick":    lambda: mix(0.04, 0.6 * tone(3200, 3000, 0.02, 0.0003, 0.003)),
    "key":     lambda: mix(0.05, 0.35 * noise(0.025, 0.0004, 0.005, 0.35), 0.25 * tone(1600, 1400, 0.02, 0.0004, 0.004)),
    "pop":     lambda: mix(0.12, 0.8 * tone(520, 300, 0.09, 0.003, 0.025)),
    "toggle":  lambda: mix(0.1, 0.6 * tone(1800, 1700, 0.018, 0.0004, 0.004), delay(0.6 * tone(2600, 2500, 0.02, 0.0004, 0.005), 0.053)),
    "swipe":   lambda: mix(0.2, 0.3 * noise(0.18, 0.08, 0.05, 0.08)),
    "success": lambda: mix(0.4, 0.45 * tone(880, 880, 0.35, 0.004, 0.09), delay(0.35 * tone(1320, 1320, 0.3, 0.004, 0.1), 0.07)),
    "toast":   lambda: mix(0.35, 0.4 * tone(660, 660, 0.3, 0.003, 0.08), 0.3 * tone(990, 990, 0.3, 0.003, 0.06)),
}


def write(path, x):
    x = np.clip(x, -1, 1)
    with wave.open(path, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype("<i2").tobytes())


def read(path):
    with wave.open(path) as w:
        sr, ch, n = w.getframerate(), w.getnchannels(), w.getnframes()
        x = np.frombuffer(w.readframes(n), dtype="<i2").astype(np.float32) / 32768
    return x.reshape(-1, ch).mean(1), sr


def peak_time(x, sr):
    # Peak of a 2 ms smoothed envelope: robust to single-sample spikes.
    k = max(1, int(0.002 * sr))
    e = np.convolve(np.abs(x), np.ones(k) / k, "same")
    return float(np.argmax(e) / sr)


def main():
    measure = "--measure" in sys.argv
    out = [a for a in sys.argv[1:] if not a.startswith("--")][0]
    os.makedirs(out, exist_ok=True)
    if not measure:
        for name, fn in KIT.items():
            write(os.path.join(out, name + ".wav"), fn())
    peaks = {}
    for f in sorted(os.listdir(out)):
        if f.endswith(".wav"):
            x, sr = read(os.path.join(out, f))
            peaks[f[:-4]] = round(peak_time(x, sr), 5)
    json.dump(peaks, open(os.path.join(out, "peaks.json"), "w"), indent=1)
    for k, v in peaks.items():
        print(f"{k:8s} peak at {v * 1000:6.1f} ms")


if __name__ == "__main__":
    main()
