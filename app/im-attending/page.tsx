"use client";

import { type ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1350;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default function ImAttendingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offsetY, setOffsetY] = useState(0);
  const [accent, setAccent] = useState<"teal" | "orange" | "violet">("teal");
  const zoomLabel = `${zoom.toFixed(2)}x`;
  const offsetLabel = offsetY > 0 ? `+${offsetY}` : `${offsetY}`;

  const accentColors = useMemo(
    () => ({
      teal: { primary: "#0E7490", soft: "#22D3EE", chip: "rgba(14,116,144,0.48)", text: "#E0F7FF" },
      orange: { primary: "#B45309", soft: "#F59E0B", chip: "rgba(180,83,9,0.5)", text: "#FFF4E6" },
      violet: { primary: "#6D28D9", soft: "#A78BFA", chip: "rgba(109,40,217,0.48)", text: "#F3E8FF" },
    }),
    [],
  );

  const drawPoster = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const palette = accentColors[accent];
    let bg: HTMLImageElement;
    let logo: HTMLImageElement;
    try {
      [bg, logo] = await Promise.all([
        loadImage("/Zoom%20background%2003.png"),
        loadImage("/Arduino_DAYS2026_Logotype_text.svg"),
      ]);
    } catch {
      ctx.fillStyle = "#0a1628";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      return;
    }

    const scale = Math.max(CANVAS_WIDTH / bg.width, CANVAS_HEIGHT / bg.height);
    const bgW = bg.width * scale;
    const bgH = bg.height * scale;
    const bgX = (CANVAS_WIDTH - bgW) / 2;
    const bgY = (CANVAS_HEIGHT - bgH) / 2;
    ctx.drawImage(bg, bgX, bgY, bgW, bgH);

    const overlay = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    overlay.addColorStop(0, "rgba(8, 24, 44, 0.42)");
    overlay.addColorStop(1, "rgba(10, 22, 40, 0.76)");
    ctx.fillStyle = overlay;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const glow = ctx.createRadialGradient(180, 200, 20, 180, 200, 520);
    glow.addColorStop(0, `${palette.primary}33`);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // One soft outer edge (single frame, not nested cards)
    const inset = 36;
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, inset, inset, CANVAS_WIDTH - inset * 2, CANVAS_HEIGHT - inset * 2, 28);
    ctx.stroke();

    const pad = 72;
    const contentW = CANVAS_WIDTH - pad * 2;

    // Logo + date row (editorial header)
    const logoW = 400;
    const logoH = (logo.height / logo.width) * logoW;
    ctx.drawImage(logo, pad, pad + 8, logoW, logoH);

    ctx.textAlign = "right";
    ctx.fillStyle = palette.text;
    ctx.font = "600 22px Inter, Arial, sans-serif";
    ctx.fillText("Kochi", CANVAS_WIDTH - pad, pad + logoH * 0.35);
    ctx.fillStyle = "rgba(226,232,240,0.95)";
    ctx.font = "500 20px Inter, Arial, sans-serif";
    ctx.fillText("March 28, 2026", CANVAS_WIDTH - pad, pad + logoH * 0.35 + 28);
    ctx.textAlign = "left";

    // Single hero line (no duplicate in footer)
    const heroY = pad + logoH + 52;
    ctx.fillStyle = palette.primary;
    drawRoundedRect(ctx, pad, heroY - 4, 6, 56, 3);
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 78px Inter, Arial, sans-serif";
    ctx.fillText("I'M ATTENDING", pad + 22, heroY + 44);

    // Photo block — one rounded mask, one stroke (no double boxes)
    const frameX = pad;
    const frameY = heroY + 72;
    const frameW = contentW;
    const frameH = 700;
    const photoR = 28;

    ctx.save();
    drawRoundedRect(ctx, frameX, frameY, frameW, frameH, photoR);
    ctx.clip();

    if (photoUrl) {
      try {
        const people = await loadImage(photoUrl);
        const baseScale = Math.max(frameW / people.width, frameH / people.height);
        const imgScale = baseScale * zoom;
        const drawW = people.width * imgScale;
        const drawH = people.height * imgScale;
        const drawX = frameX + (frameW - drawW) / 2;
        const drawY = frameY + (frameH - drawH) / 2 + offsetY;
        ctx.drawImage(people, drawX, drawY, drawW, drawH);
      } catch {
        ctx.fillStyle = "rgba(15, 23, 42, 0.65)";
        ctx.fillRect(frameX, frameY, frameW, frameH);
      }
    } else {
      ctx.fillStyle = "rgba(15, 23, 42, 0.55)";
      ctx.fillRect(frameX, frameY, frameW, frameH);
      const dotPattern = ctx.createLinearGradient(frameX, frameY, frameX + frameW, frameY + frameH);
      dotPattern.addColorStop(0, "rgba(255,255,255,0.04)");
      dotPattern.addColorStop(1, "rgba(255,255,255,0.01)");
      ctx.fillStyle = dotPattern;
      ctx.fillRect(frameX, frameY, frameW, frameH);
      ctx.fillStyle = "rgba(248,250,252,0.55)";
      ctx.font = "600 28px Inter, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Add your photo", CANVAS_WIDTH / 2, frameY + frameH / 2 + 6);
      ctx.textAlign = "left";
    }
    ctx.restore();

    ctx.strokeStyle = "rgba(255,255,255,0.28)";
    ctx.lineWidth = 2;
    drawRoundedRect(ctx, frameX, frameY, frameW, frameH, photoR);
    ctx.stroke();

    // Minimal footer — event facts only (no repeated headline)
    const panelX = pad;
    const panelY = frameY + frameH + 28;
    const panelW = contentW;
    const panelH = 112;

    ctx.fillStyle = "rgba(2, 8, 20, 0.72)";
    drawRoundedRect(ctx, panelX, panelY, panelW, panelH, 20);
    ctx.fill();

    ctx.fillStyle = palette.primary;
    drawRoundedRect(ctx, panelX + 20, panelY + 22, 4, panelH - 44, 2);
    ctx.fill();

    const textX = panelX + 40;
    ctx.fillStyle = "#F8FAFC";
    ctx.font = "700 26px Inter, Arial, sans-serif";
    ctx.fillText("Arduino Day 2026", textX, panelY + 46);

    ctx.fillStyle = "#E2E8F0";
    ctx.font = "600 20px Inter, Arial, sans-serif";
    ctx.fillText("TinkerSpace Kochi", textX, panelY + 74);

    ctx.fillStyle = "#CBD5E1";
    ctx.font = "500 17px Inter, Arial, sans-serif";
    ctx.fillText("March 28 · 10:00 AM – 5:00 PM", textX, panelY + 98);
  }, [accent, accentColors, offsetY, photoUrl, zoom]);

  useEffect(() => {
    drawPoster().catch(() => {
      // Drawing can fail only if assets are unavailable.
    });
  }, [drawPoster]);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPhotoUrl((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return objectUrl;
    });
  };

  useEffect(() => {
    return () => {
      if (photoUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  const downloadPoster = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "arduino-day-2026-im-attending-poster.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#08172B] via-[#0B1E36] to-[#0A1730] py-10 px-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute top-56 -right-20 h-72 w-72 rounded-full bg-fuchsia-400/10 blur-3xl" />
        <div className="absolute bottom-8 left-1/3 h-56 w-56 rounded-full bg-sky-300/10 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">I&apos;m Attending Poster Generator</h1>
            <p className="text-slate-200/80 text-sm mt-1">Upload, adjust, and download.</p>
          </div>
          <Link
            href="/"
            className="text-sm sm:text-base px-4 py-2 rounded-full border border-cyan-100/50 bg-white/5 text-slate-100 hover:text-white hover:border-cyan-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            Back to Home
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 relative z-10">
          <section className="lg:col-span-4 rounded-3xl border border-cyan-100/20 bg-slate-900/55 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(4,12,26,0.45)]">
            <h2 className="text-white text-lg font-semibold mb-4 tracking-tight">Controls</h2>

            <div className="mt-4">
              <label className="block text-sm text-slate-100 mb-2 font-medium">Accent Color</label>
              <div className="flex gap-2">
                {(["teal", "orange", "violet"] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    aria-label={key}
                    onClick={() => setAccent(key)}
                    className={`h-9 w-9 rounded-full border-2 transition-transform ${
                      accent === key ? "border-white scale-110 ring-2 ring-white/70" : "border-slate-100/50"
                    }`}
                    style={{ backgroundColor: accentColors[key].primary }}
                  />
                ))}
              </div>
            </div>

            <label className="block text-sm text-slate-100 mt-5 mb-2 font-medium">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="block w-full text-sm text-slate-100 file:mr-3 file:rounded-full file:border-0 file:bg-cyan-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-cyan-600 focus-visible:outline-none"
            />

            <div className="mt-5 mb-2 flex items-center justify-between">
              <label className="block text-sm text-slate-100 font-medium">Photo Zoom</label>
              <span className="rounded-full border border-cyan-100/30 bg-cyan-400/10 px-2 py-0.5 text-xs text-cyan-100">{zoomLabel}</span>
            </div>
            <input
              type="range"
              min={1}
              max={2}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />

            <div className="mt-5 mb-2 flex items-center justify-between">
              <label className="block text-sm text-slate-100 font-medium">Vertical Position</label>
              <span className="rounded-full border border-cyan-100/30 bg-cyan-400/10 px-2 py-0.5 text-xs text-cyan-100">{offsetLabel}</span>
            </div>
            <input
              type="range"
              min={-220}
              max={220}
              step={1}
              value={offsetY}
              onChange={(e) => setOffsetY(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />

            <button
              type="button"
              onClick={downloadPoster}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-700 to-sky-600 hover:from-cyan-600 hover:to-sky-500 text-white font-semibold py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Download Poster (PNG)
            </button>

            <button
              type="button"
              onClick={() => {
                setZoom(1);
                setOffsetY(0);
                setAccent("teal");
              }}
              className="mt-2 w-full rounded-xl border border-slate-300/35 bg-slate-900/35 hover:bg-slate-800/45 text-slate-100 font-medium py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Reset Controls
            </button>
          </section>

          <section className="lg:col-span-8">
            <div className="rounded-3xl border border-cyan-100/20 bg-slate-900/55 backdrop-blur-2xl p-3 sm:p-4 shadow-[0_24px_70px_rgba(4,12,26,0.5)]">
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="w-full h-auto rounded-xl"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

