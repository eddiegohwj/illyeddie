#!/usr/bin/env python3
"""Mix the song segment with UI sounds placed by their measured peaks.

  python3 mix.py song.mp3 grid.json events.json sfxdir/ --out mix.wav [--sfx-db -10] [--music-db -3]

grid.json   from beatgrid.py (segment.start / segment.end)
events.json from render.mjs (EVENTS: [{t, sfx}], t = visual hit in piece time)
sfxdir/     wavs + peaks.json from sfx.py
Each sound is shifted so its PEAK sits on its event time. A sound that crosses the loop end
wraps to the start, so the loop seam stays clean. No fades on the music: the loop needs the cut.
"""
import argparse, json, os, subprocess, wave
import numpy as np
from beatgrid import ffmpeg_exe

SR = 48000


def decode(path, start=None, dur=None):
    cmd = [ffmpeg_exe(), "-v", "error"]
    if start is not None:
        cmd += ["-ss", f"{start:.4f}", "-t", f"{dur:.4f}"]
    cmd += ["-i", path, "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).reshape(-1, 2).copy()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("song"); ap.add_argument("grid"); ap.add_argument("events"); ap.add_argument("sfxdir")
    ap.add_argument("--out", default="mix.wav")
    ap.add_argument("--sfx-db", type=float, default=-10)
    ap.add_argument("--music-db", type=float, default=-3)
    a = ap.parse_args()

    seg = json.load(open(a.grid))["segment"]
    dur = seg["end"] - seg["start"]
    n = int(round(dur * SR))
    music = decode(a.song, seg["start"], dur)[:n]
    music = np.pad(music, ((0, n - len(music)), (0, 0)))
    bus = music * 10 ** (a.music_db / 20)

    peaks = json.load(open(os.path.join(a.sfxdir, "peaks.json")))
    ev = json.load(open(a.events))
    events = ev["EVENTS"] if isinstance(ev, dict) else ev
    if isinstance(ev, dict) and abs(ev["D"] - dur) > 0.02:
        print(f"WARNING piece is {ev['D']:.3f} s but the segment is {dur:.3f} s. Set BPM in the piece to the measured BPM.")
    g = 10 ** (a.sfx_db / 20)
    cache = {}
    for e in events:
        name = e["sfx"]
        if name not in cache:
            cache[name] = decode(os.path.join(a.sfxdir, name + ".wav"))
        s = cache[name] * g * e.get("gain", 1.0)
        at = int(round((e["t"] - peaks[name]) * SR))
        idx = (at + np.arange(len(s))) % n              # wrap across the loop seam
        np.add.at(bus, idx, s)

    peak = np.abs(bus).max()
    if peak > 0.98:
        bus *= 0.98 / peak
        print(f"limited: peak was {20 * np.log10(peak):.1f} dBFS")
    with wave.open(a.out, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(bus, -1, 1) * 32767).astype("<i2").tobytes())
    print(f"wrote {a.out}: {dur:.3f} s, {len(events)} sounds")


if __name__ == "__main__":
    main()
