"use client";

import { type ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/** Matches `public/attending.png` (Arduino Days 2026 poster template). */
const TEMPLATE_WIDTH = 1620;
const TEMPLATE_HEIGHT = 2025;

/**
 * Photo circle over the green placeholder — ratios of template width/height.
 * Edit these three numbers in `app/im-attending/page.tsx` to calibrate:
 * - cx: horizontal center of the green disk (0 = left, 1 = right). ~0.35 matches the template.
 * - cy: vertical center of the green disk (0 = top, 1 = bottom). ~0.50 matches the template.
 * - r: circle radius as a fraction of min(template width, height). Increase if the face looks too small
 *   inside the green ring; decrease if it spills past the green or into the title.
 */
const TEMPLATE_PHOTO = {
  cx: 0.380,
  cy: 0.562,
  /** ~0.22 fills the green disk when the crop looked ~75% too small at ~0.164 */
  r: 0.218,
} as const;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export default function ImAttendingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const zoomLabel = `${zoom.toFixed(2)}x`;
  const offsetXLabel = offsetX > 0 ? `+${offsetX}` : `${offsetX}`;
  const offsetYLabel = offsetY > 0 ? `+${offsetY}` : `${offsetY}`;

  const drawPoster = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let template: HTMLImageElement;
    try {
      template = await loadImage("/attending.png");
    } catch {
      canvas.width = TEMPLATE_WIDTH;
      canvas.height = TEMPLATE_HEIGHT;
      ctx.fillStyle = "#e8e4dc";
      ctx.fillRect(0, 0, TEMPLATE_WIDTH, TEMPLATE_HEIGHT);
      ctx.fillStyle = "#64748b";
      ctx.font = "600 28px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Could not load poster template.", TEMPLATE_WIDTH / 2, TEMPLATE_HEIGHT / 2);
      ctx.textAlign = "left";
      return;
    }

    const tw = template.width;
    const th = template.height;
    canvas.width = tw;
    canvas.height = th;

    ctx.drawImage(template, 0, 0, tw, th);

    if (!photoUrl) return;

    const cx = tw * TEMPLATE_PHOTO.cx;
    const cy = th * TEMPLATE_PHOTO.cy;
    const r = Math.min(tw, th) * TEMPLATE_PHOTO.r;
    const box = 2 * r;

    try {
      const people = await loadImage(photoUrl);
      const baseScale = Math.max(box / people.width, box / people.height);
      const imgScale = baseScale * zoom;
      const drawW = people.width * imgScale;
      const drawH = people.height * imgScale;
      const drawX = cx - drawW / 2 + offsetX;
      const drawY = cy - drawH / 2 + offsetY;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(people, drawX, drawY, drawW, drawH);
      ctx.restore();
    } catch {
      // Leave template visible if the user photo fails to decode.
    }
  }, [offsetX, offsetY, photoUrl, zoom]);

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
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#00979C]/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-slate-300/20 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <div>
              <p className="text-sm font-medium text-[#00979C] mb-1">Arduino Day 2026</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0a1628] tracking-tight">
                I&apos;m Attending
              </h1>
              <p className="text-gray-700 text-sm sm:text-base mt-2 max-w-2xl">
                Your photo is placed on the green circle on the official poster template. Upload, adjust, and download.
              </p>
            </div>
            <Link
              href="/"
              className="text-sm sm:text-base px-4 py-2 rounded-full border border-slate-300 bg-white text-slate-800 hover:border-[#00979C] hover:text-[#0f766e] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00979C]/40 shadow-sm"
            >
              Back to Home
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            <section className="lg:col-span-4 rounded-3xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
              <h2 className="text-[#0a1628] text-lg font-semibold mb-4 tracking-tight">Controls</h2>

              <label className="block text-sm text-gray-700 mb-2 font-medium">Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="block w-full text-sm text-gray-800 file:mr-3 file:rounded-full file:border-0 file:bg-[#00979C] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#00878F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00979C]/30 rounded-lg"
              />

              <div className="mt-5 mb-2 flex items-center justify-between">
                <label className="block text-sm text-gray-700 font-medium">Photo Zoom</label>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-700 tabular-nums">
                  {zoomLabel}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={2}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-[#00979C]"
              />

              <div className="mt-5 mb-2 flex items-center justify-between">
                <label className="block text-sm text-gray-700 font-medium">Horizontal Position</label>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-700 tabular-nums">
                  {offsetXLabel}
                </span>
              </div>
              <input
                type="range"
                min={-220}
                max={220}
                step={1}
                value={offsetX}
                onChange={(e) => setOffsetX(Number(e.target.value))}
                className="w-full accent-[#00979C]"
              />

              <div className="mt-5 mb-2 flex items-center justify-between">
                <label className="block text-sm text-gray-700 font-medium">Vertical Position</label>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-700 tabular-nums">
                  {offsetYLabel}
                </span>
              </div>
              <input
                type="range"
                min={-220}
                max={220}
                step={1}
                value={offsetY}
                onChange={(e) => setOffsetY(Number(e.target.value))}
                className="w-full accent-[#00979C]"
              />

              <button
                type="button"
                onClick={downloadPoster}
                className="mt-6 w-full rounded-xl bg-[#00979C] hover:bg-[#00878F] text-white font-semibold py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00979C] focus-visible:ring-offset-2"
              >
                Download Poster (PNG)
              </button>

              <button
                type="button"
                onClick={() => {
                  setZoom(1);
                  setOffsetX(0);
                  setOffsetY(0);
                }}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-medium py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              >
                Reset Controls
              </button>
            </section>

            <section className="lg:col-span-8">
              <div className="rounded-3xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm">
                <canvas
                  ref={canvasRef}
                  width={TEMPLATE_WIDTH}
                  height={TEMPLATE_HEIGHT}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
