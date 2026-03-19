"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [attendeeName, setAttendeeName] = useState("Your Name");
  const [zoom, setZoom] = useState(1);
  const [offsetY, setOffsetY] = useState(0);

  const drawPoster = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const [bg, logo] = await Promise.all([
      loadImage("/Zoom%20background%2003.png"),
      loadImage("/Arduino_DAYS2026_Logotype_text.svg"),
    ]);

    const scale = Math.max(CANVAS_WIDTH / bg.width, CANVAS_HEIGHT / bg.height);
    const bgW = bg.width * scale;
    const bgH = bg.height * scale;
    const bgX = (CANVAS_WIDTH - bgW) / 2;
    const bgY = (CANVAS_HEIGHT - bgH) / 2;
    ctx.drawImage(bg, bgX, bgY, bgW, bgH);

    const overlay = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    overlay.addColorStop(0, "rgba(10, 22, 40, 0.65)");
    overlay.addColorStop(1, "rgba(10, 22, 40, 0.82)");
    ctx.fillStyle = overlay;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.drawImage(logo, 90, 120, 470, 95);

    ctx.fillStyle = "rgba(98, 174, 178, 0.25)";
    drawRoundedRect(ctx, 90, 255, 290, 52, 26);
    ctx.fill();
    ctx.fillStyle = "#D3F3F5";
    ctx.font = "600 24px Inter, Arial, sans-serif";
    ctx.fillText("Kochi • March 28, 2026", 122, 289);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 92px Inter, Arial, sans-serif";
    ctx.fillText("I'M ATTENDING", 90, 395);

    const frameX = 90;
    const frameY = 435;
    const frameW = 900;
    const frameH = 620;

    ctx.fillStyle = "rgba(255,255,255,0.06)";
    drawRoundedRect(ctx, frameX, frameY, frameW, frameH, 34);
    ctx.fill();

    ctx.save();
    drawRoundedRect(ctx, frameX + 10, frameY + 10, frameW - 20, frameH - 20, 28);
    ctx.clip();

    if (photoUrl) {
      const people = await loadImage(photoUrl);
      const baseScale = Math.max((frameW - 20) / people.width, (frameH - 20) / people.height);
      const imgScale = baseScale * zoom;
      const drawW = people.width * imgScale;
      const drawH = people.height * imgScale;
      const drawX = frameX + 10 + ((frameW - 20) - drawW) / 2;
      const drawY = frameY + 10 + ((frameH - 20) - drawH) / 2 + offsetY;
      ctx.drawImage(people, drawX, drawY, drawW, drawH);
    } else {
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      ctx.fillRect(frameX + 10, frameY + 10, frameW - 20, frameH - 20);
      ctx.fillStyle = "#E2E8F0";
      ctx.font = "600 34px Inter, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Upload your team photo", CANVAS_WIDTH / 2, frameY + frameH / 2);
      ctx.textAlign = "left";
    }
    ctx.restore();

    ctx.fillStyle = "rgba(10, 22, 40, 0.8)";
    drawRoundedRect(ctx, 90, 1085, 900, 165, 24);
    ctx.fill();

    ctx.fillStyle = "#D3F3F5";
    ctx.font = "700 42px Inter, Arial, sans-serif";
    ctx.fillText(`${attendeeName.toUpperCase()} IS ATTENDING`, 125, 1155);
    ctx.font = "600 30px Inter, Arial, sans-serif";
    ctx.fillText("Arduino Day 2026 @ TinkerSpace Kochi", 125, 1205);
    ctx.font = "500 26px Inter, Arial, sans-serif";
    ctx.fillText("10:00 AM - 5:00 PM", 125, 1240);
  }, [attendeeName, offsetY, photoUrl, zoom]);

  useEffect(() => {
    drawPoster().catch(() => {
      // Drawing can fail only if assets are unavailable.
    });
  }, [drawPoster]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPhotoUrl((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return objectUrl;
    });
  };

  const downloadPoster = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "arduino-day-2026-im-attending-poster.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="min-h-screen bg-[#0a1628] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="text-white text-2xl sm:text-3xl font-bold">I&apos;m Attending Poster Generator</h1>
          <Link
            href="/"
            className="text-sm sm:text-base px-4 py-2 rounded-full border border-white/30 text-white/90 hover:text-white hover:border-white/60 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <section className="lg:col-span-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <h2 className="text-white text-lg font-semibold mb-4">Customize Poster</h2>

            <label className="block text-sm text-white/80 mb-2">Your Name / Team Name</label>
            <input
              type="text"
              value={attendeeName}
              onChange={(e) => setAttendeeName(e.target.value || "Your Name")}
              maxLength={28}
              className="w-full rounded-xl border border-white/20 bg-[#0d2137] px-3 py-2.5 text-white placeholder:text-white/40 outline-none focus:border-[#62AEB2]"
              placeholder="Your Name"
            />

            <label className="block text-sm text-white/80 mt-5 mb-2">Upload People Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="block w-full text-sm text-white/80 file:mr-3 file:rounded-full file:border-0 file:bg-[#00979C] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#00878F]"
            />

            <label className="block text-sm text-white/80 mt-5 mb-2">Photo Zoom</label>
            <input
              type="range"
              min={1}
              max={2}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-[#62AEB2]"
            />

            <label className="block text-sm text-white/80 mt-5 mb-2">Photo Vertical Position</label>
            <input
              type="range"
              min={-220}
              max={220}
              step={1}
              value={offsetY}
              onChange={(e) => setOffsetY(Number(e.target.value))}
              className="w-full accent-[#62AEB2]"
            />

            <button
              type="button"
              onClick={downloadPoster}
              className="mt-6 w-full rounded-xl bg-[#00979C] hover:bg-[#00878F] text-white font-semibold py-3 transition-colors"
            >
              Download Poster (PNG)
            </button>
          </section>

          <section className="lg:col-span-8">
            <div className="rounded-2xl border border-white/10 bg-[#071223] p-3 sm:p-4">
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="w-full h-auto rounded-xl"
              />
            </div>
            <p className="mt-3 text-white/70 text-sm">
              Upload a clear group photo for best output. Poster exports at high resolution.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

