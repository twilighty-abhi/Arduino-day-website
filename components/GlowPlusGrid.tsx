"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const TILE = 60; // must match the SVG background tile size in Hero

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickUnique(count: number, maxExclusive: number) {
  const picked = new Set<number>();
  while (picked.size < count) picked.add(Math.floor(Math.random() * maxExclusive));
  return [...picked];
}

export default function GlowPlusGrid() {
  const [activeIds, setActiveIds] = useState<Set<number>>(() => new Set());
  const [enabled, setEnabled] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Respect reduced motion + disable on touch.
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    // Note: many Windows laptops expose `ontouchstart` even when using a mouse.
    // We only gate this effect behind reduced-motion for reliability.
    setEnabled(!prefersReduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [enabled]);

  // Create a fixed grid aligned to the repeating background tile.
  const grid = useMemo(() => {
    const cols = Math.ceil(size.w / TILE) + 2;
    const rows = Math.ceil(size.h / TILE) + 2;
    const points: { id: number; x: number; y: number }[] = [];
    let id = 0;

    // Match the SVG pluses, which appear near tile corners.
    const offsets = [
      { ox: 6, oy: 6 },
      { ox: 36, oy: 6 },
      { ox: 6, oy: 36 },
      { ox: 36, oy: 36 },
    ];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const baseX = c * TILE;
        const baseY = r * TILE;
        for (const o of offsets) {
          points.push({ id: id++, x: baseX + o.ox, y: baseY + o.oy });
        }
      }
    }
    return points;
  }, [size.h, size.w]);

  useEffect(() => {
    if (!enabled || grid.length === 0) return;

    const interval = window.setInterval(() => {
      const next = new Set<number>();
      const howMany = randomInt(2, 3);
      const ids = pickUnique(howMany, grid.length);
      ids.forEach((i) => next.add(i));
      setActiveIds(next);
    }, 700);

    return () => window.clearInterval(interval);
  }, [enabled, grid.length]);

  if (!enabled || grid.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {grid.map((p, idx) => {
        const isActive = activeIds.has(idx);
        // Only render glow when active so we don't “add” more plus icons visually.
        if (!isActive) return null;

        return (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: p.x, top: p.y, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: [0, 1, 0.1],
              scale: [1, 1.35, 1],
              filter:
                "drop-shadow(0 0 10px rgba(0,151,156,0.9)) drop-shadow(0 0 26px rgba(0,151,156,0.55))",
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5z"
                fill="rgba(0,151,156,0.95)"
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}

