"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDate: Date;
  /** `light` = dark text on pale cards (hero on white). */
  theme?: "dark" | "light";
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function Countdown({ targetDate, theme = "dark" }: CountdownProps) {
  const isLight = theme === "light";
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, mins, secs });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex gap-3 sm:gap-6 justify-center flex-wrap">
        {["Days", "Hours", "Mins", "Secs"].map((label) => (
          <div key={label} className="flex flex-col items-center">
            <div
              className={`w-16 sm:w-20 h-16 sm:h-20 rounded-xl flex items-center justify-center ${
                isLight ? "bg-white border border-slate-200 shadow-sm" : "bg-white/10"
              }`}
            >
              <span
                className={`text-2xl sm:text-3xl font-bold ${isLight ? "text-slate-800" : "text-white"}`}
              >
                --
              </span>
            </div>
            <span
              className={`text-xs sm:text-sm mt-2 ${isLight ? "text-slate-500" : "text-white/70"}`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  const units = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.mins, label: "Mins" },
    { value: timeLeft.secs, label: "Secs" },
  ];

  return (
    <div className="flex gap-3 sm:gap-6 justify-center flex-wrap">
      {units.map(({ value, label }) => (
        <motion.div
          key={label}
          className="flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div
            className={`w-16 sm:w-20 h-16 sm:h-20 rounded-xl flex items-center justify-center tabular-nums ${
              isLight
                ? "bg-white border border-slate-200 shadow-sm"
                : "bg-white/10 border border-white/20"
            }`}
          >
            <span
              className={`text-2xl sm:text-3xl font-bold tabular-nums ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              {pad(value)}
            </span>
          </div>
          <span
            className={`text-xs sm:text-sm mt-2 ${isLight ? "text-slate-500" : "text-white/70"}`}
          >
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
