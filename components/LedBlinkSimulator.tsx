"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function LedBlinkSimulator() {
  const [isBlinking, setIsBlinking] = useState(false);
  const [delayMs, setDelayMs] = useState(600);
  const [ledOn, setLedOn] = useState(false);

  useEffect(() => {
    if (!isBlinking) {
      setLedOn(false);
      return;
    }

    setLedOn(true);
    const id = window.setInterval(() => setLedOn((v) => !v), delayMs);
    return () => window.clearInterval(id);
  }, [delayMs, isBlinking]);

  const code = useMemo(() => {
    const d = Math.max(50, Math.round(delayMs));
    return [
      "void setup() {",
      "  pinMode(LED_BUILTIN, OUTPUT);",
      "}",
      "",
      "void loop() {",
      "  digitalWrite(LED_BUILTIN, HIGH);",
      `  delay(${d});`,
      "  digitalWrite(LED_BUILTIN, LOW);",
      `  delay(${d});`,
      "}",
    ];
  }, [delayMs]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden bg-[#0a1628] rounded-2xl p-6 sm:p-8 border border-[#00979C]/30"
    >
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 10%, rgba(0,151,156,0.35), transparent 40%), radial-gradient(circle at 80% 30%, rgba(228,113,40,0.18), transparent 45%), radial-gradient(circle at 50% 100%, rgba(98,174,178,0.25), transparent 55%)",
          }}
        />
      </div>

      <h4 className="text-white font-semibold mb-4 text-center">
        Arduino Hello World
      </h4>
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() => setIsBlinking(!isBlinking)}
            className="focus:outline-none focus:ring-2 focus:ring-[#00979C] rounded-full"
            aria-label="Toggle LED blink"
          >
            <motion.div
              className="w-20 h-20 rounded-full border-4 border-[#62AEB2] flex items-center justify-center bg-black/15"
              animate={{
                boxShadow: isBlinking
                  ? "0 0 22px 6px rgba(0, 151, 156, 0.55)"
                  : "0 0 0 0 rgba(0, 151, 156, 0)",
              }}
            >
              <motion.div
                className="w-10 h-10 rounded-full"
                animate={{
                  backgroundColor: ledOn ? "#E47128" : "rgba(228,113,40,0.25)",
                  opacity: isBlinking ? (ledOn ? 1 : 0.35) : 0.9,
                  scale: isBlinking ? (ledOn ? 1.08 : 0.98) : 1,
                }}
                transition={{
                  duration: 0.18,
                }}
              />
            </motion.div>
          </button>

          <div className="text-center">
            <div className="text-[#62AEB2] text-sm font-medium">
              {isBlinking ? (ledOn ? "LED: HIGH" : "LED: LOW") : "Click to start blinking"}
            </div>
            <div className="text-white/50 text-xs mt-1">
              {isBlinking ? "Tap again to stop" : "No hardware needed"}
            </div>
          </div>

          <div className="w-full max-w-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/60">Blink speed</span>
              <span className="text-xs font-mono text-[#62AEB2]">{delayMs}ms</span>
            </div>
            <input
              type="range"
              min={120}
              max={1200}
              step={20}
              value={delayMs}
              onChange={(e) => setDelayMs(Number(e.target.value))}
              className="w-full accent-[#00979C]"
              aria-label="Blink delay in milliseconds"
            />
          </div>
        </div>

        <div className="bg-black/35 rounded-xl border border-white/10 p-4 sm:p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-white/60">Sketch</div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                  isBlinking ? "bg-[#00979C]/20 text-[#62AEB2]" : "bg-white/10 text-white/60"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isBlinking ? "bg-[#00979C]" : "bg-white/30"}`} />
                {isBlinking ? "Running" : "Stopped"}
              </span>
            </div>
          </div>

          <pre className="text-sm text-[#62AEB2] overflow-x-auto leading-6">
            <code>
              {code.map((line, idx) => {
                const isHigh = idx === 5;
                const isLow = idx === 7;
                const highlight =
                  isBlinking && ((ledOn && isHigh) || (!ledOn && isLow));
                return (
                  <span
                    key={idx}
                    className={`block rounded px-2 ${
                      highlight ? "bg-[#00979C]/15 text-white" : ""
                    }`}
                  >
                    {line}
                  </span>
                );
              })}
            </code>
          </pre>
        </div>
      </div>
    </motion.div>
  );
}
