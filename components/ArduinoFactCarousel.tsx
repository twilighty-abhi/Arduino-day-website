"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FACTS = [
  "Arduino was founded in 2005 in Ivrea, Italy.",
  "The name Arduino comes from a bar in Ivrea where the founders used to meet.",
  "Over 30 million Arduino boards have been sold worldwide.",
  "Arduino IDE has been downloaded more than 100 million times.",
  "Arduino Day is celebrated in over 100 countries every year.",
];

export default function ArduinoFactCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % FACTS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-[#0a1628]/5 rounded-xl p-4 border border-[#00979C]/20">
      <p className="text-xs font-medium text-[#00979C] mb-2">Did you know?</p>
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-gray-700 text-sm"
        >
          {FACTS[index]}
        </motion.p>
      </AnimatePresence>
      <div className="flex gap-1 mt-3">
        {FACTS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-[#00979C]" : "w-1.5 bg-[#00979C]/30"
            }`}
            aria-label={`Go to fact ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
