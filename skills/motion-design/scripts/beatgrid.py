#!/usr/bin/env python3
"""Measure a song's beat grid with numpy and pick a segment that starts on a downbeat.

  python3 beatgrid.py song.mp3 --bpm 120 --bars 7 [--start-bar N] [--out grid.json]

Prints the measured BPM, the beat drift, the downbeats, and the chosen segment.
The segment is the run of --bars bars (starting on a downbeat) with the most energy,
unless --start-bar picks one. Needs ffmpeg (or `pip install imageio-ffmpeg`) to decode.
"""
import argparse, json, shutil, subprocess, sys
import numpy as np

SR, HOP, NFFT = 22050, 256, 2048


def ffmpeg_exe():
    exe = shutil.which("ffmpeg")
    if exe:
        return exe
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        sys.exit("ffmpeg not found. Install it, or: pip install imageio-ffmpeg")


def decode(path, sr=SR):
    raw = subprocess.run([ffmpeg_exe(), "-v", "error", "-i", path, "-ac", "1", "-ar", str(sr), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def onset_envelopes(x):
    n = 1 + (len(x) - NFFT) // HOP
    idx = np.arange(NFFT)[None, :] + HOP * np.arange(n)[:, None]
    mag = np.abs(np.fft.rfft(x[idx] * np.hanning(NFFT), axis=1))
    logm = np.log1p(100 * mag)
    flux = np.maximum(0, np.diff(logm, axis=0, prepend=logm[:1]))
    freqs = np.fft.rfftfreq(NFFT, 1 / SR)
    full = flux.sum(1)
    low = flux[:, freqs < 150].sum(1)                     # kick band, for downbeats
    rms = np.sqrt((x[idx] ** 2).mean(1))
    norm = lambda e: (e - e.mean()) / (e.std() + 1e-9)
    return norm(full), norm(low), rms


def frame_t(i):
    return (i * HOP + NFFT / 2) / SR


def interp(env, pos):
    pos = np.clip(pos, 0, len(env) - 1.001)
    i = pos.astype(int)
    return env[i] * (1 - (pos - i)) + env[i + 1] * (pos - i)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("song")
    ap.add_argument("--bpm", type=float, default=120)
    ap.add_argument("--bars", type=int, default=7)
    ap.add_argument("--start-bar", type=int)
    ap.add_argument("--out", default="grid.json")
    a = ap.parse_args()

    x = decode(a.song)
    env, low, rms = onset_envelopes(x)
    fps = SR / HOP

    # 1. Tempo: autocorrelation of the onset envelope, searched within +-6% of the hint.
    ac = np.correlate(env, env, "full")[len(env) - 1:]
    lags = np.arange(len(ac)) / fps
    bpms = 60 / np.maximum(lags, 1e-9)
    win = (bpms > a.bpm * 0.94) & (bpms < a.bpm * 1.06)
    coarse = lags[win][np.argmax(ac[win])]
    # Refine the period on a fine grid by comb score over the whole song.
    best = (-1e9, None, None)
    for period in np.linspace(coarse * 0.99, coarse * 1.01, 81):
        p = period * fps
        k = np.arange(int((len(env) - 1) / p))
        for ph in np.linspace(0, p, 48, endpoint=False):
            s = interp(env, ph + k * p).mean()
            if s > best[0]:
                best = (s, period, ph)
    _, period, phase = best
    bpm = 60 / period
    p = period * fps
    nbeats = int((len(env) - 1 - phase) / p)
    beats = np.array([frame_t(phase + k * p) for k in range(nbeats)])

    # 2. Phase fix + drift, in the time domain (1 ms resolution). The FFT envelope fires when a hit
    #    enters the window, so it runs ~20-45 ms early. For each beat, find the steepest rise of a
    #    1 ms amplitude envelope within +-70 ms, then shift the whole grid by the median offset.
    k1 = int(0.001 * SR)
    amp = np.convolve(np.abs(x), np.ones(k1) / k1, "same")
    rise = np.maximum(0, np.diff(amp, prepend=amp[:1]))
    rise = np.convolve(rise, np.ones(3 * k1) / (3 * k1), "same")
    w = int(0.07 * SR)
    ks, ts = [], []
    for k, t in enumerate(beats):
        c = int(t * SR)
        lo, hi = max(0, c - w), min(len(rise), c + w)
        seg_r = rise[lo:hi]
        if hi - lo > w and seg_r.max() > 4 * np.median(rise[lo - 4 * w if lo > 4 * w else 0:hi]) + 1e-9:
            ks.append(k); ts.append((lo + np.argmax(seg_r)) / SR)
    shift = 0.0
    if len(ks) >= 8:
        # Fit t = t0 + k * period to the measured attacks (fixes phase AND residual tempo error),
        # then refit without outliers (> 25 ms) such as ghost notes and fills.
        ks, ts = np.array(ks, float), np.array(ts)
        for _ in range(2):
            A = np.vstack([np.ones_like(ks), ks]).T
            (t0, period), *_ = np.linalg.lstsq(A, ts, rcond=None)
            res = ts - (t0 + period * ks)
            keep = np.abs(res) < 0.025
            if keep.sum() < 8:
                break
            ks, ts = ks[keep], ts[keep]
        shift = t0 - beats[0]
        bpm = 60 / period
        beats = t0 + period * np.arange(nbeats)
        drift = float(np.median(np.abs(ts - (t0 + period * ks))) * 1000)
    else:
        drift = float("nan")

    # 3. Downbeat: the beat phase (0-3) with the strongest kick-band energy.
    fi = np.round(((beats - 0.03) * SR - NFFT / 2) / HOP).astype(int)      # envelope runs ~30 ms early
    kick = np.array([low[max(0, i - 3):i + 4].max() if 0 <= i < len(low) else 0 for i in fi])
    scores = [kick[m::4].mean() for m in range(4)]
    m = int(np.argmax(scores))
    downbeats = beats[m::4]

    # 4. Segment: N bars from a downbeat. Default = the most energetic run.
    need = a.bars * 4
    cands = [i for i in range(m, nbeats - need + 1, 4)]
    if not cands:
        sys.exit(f"song too short for {a.bars} bars at {bpm:.2f} BPM")
    def energy(i):
        s, e = beats[i], beats[i] + need * period
        f0, f1 = int(s * fps), int(e * fps)
        return rms[f0:f1].mean()
    if a.start_bar is not None:
        i0 = m + 4 * a.start_bar
    else:
        i0 = max(cands, key=energy)
    start = float(beats[i0])
    seg = {"start": round(start, 4), "end": round(start + need * period, 4), "bars": a.bars,
           "bar_index": (i0 - m) // 4}

    out = {"bpm": round(bpm, 3), "period": period, "drift_ms": round(drift, 1), "phase_fix_ms": round(shift * 1000, 1),
           "downbeat_phase": m, "beats": [round(float(t), 4) for t in beats],
           "downbeats": [round(float(t), 4) for t in downbeats], "segment": seg}
    json.dump(out, open(a.out, "w"), indent=1)

    print(f"tempo      {bpm:.2f} BPM (hint {a.bpm})  period {period * 1000:.1f} ms")
    print(f"phase fix  {shift * 1000:+.1f} ms (time-domain attack alignment)")
    print(f"drift      median {drift:.1f} ms from the strict grid" + ("  <-- tempo varies, check by ear" if drift > 20 else ""))
    print(f"downbeats  first at {downbeats[0]:.3f} s, {len(downbeats)} bars in song")
    print(f"segment    bar {seg['bar_index']}: {seg['start']:.3f} s -> {seg['end']:.3f} s ({a.bars} bars)")
    if abs(bpm - a.bpm) > 1:
        print(f"WARNING    measured tempo is {bpm:.2f}, not {a.bpm}. Set BPM in the piece to the measured value.")
    print(f"wrote {a.out}")


if __name__ == "__main__":
    main()
