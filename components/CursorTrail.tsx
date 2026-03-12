"use client";

import { useState, useEffect } from "react";

export default function CursorTrail() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [isTouch]);

  if (isTouch || !visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-0 w-3 h-3 rounded-full bg-[#00979C]/30 blur-sm transition-transform duration-100"
      style={{
        left: pos.x - 6,
        top: pos.y - 6,
      }}
    />
  );
}
