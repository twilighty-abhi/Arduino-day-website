"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Countdown from "./Countdown";
import ShareButton from "./ShareButton";
import CursorTrail from "./CursorTrail";
import GlowPlusGrid from "./GlowPlusGrid";

const TYPING_TEXT = "Writing the next chapter of AI together";
const TYPING_DELAY = 80;

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= TYPING_TEXT.length) {
        setDisplayText(TYPING_TEXT.slice(0, i));
        i++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, TYPING_DELAY);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a1628] via-[#0d2137] to-[#0a1628]">
      <CursorTrail />
      {/* Circuit board background - parallax */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300979C' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <GlowPlusGrid />
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <Image
            src="https://content.arduino.cc/brand/arduino-white.svg"
            alt="Arduino"
            width={180}
            height={48}
            className="mx-auto h-10 sm:h-12 w-auto"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2"
        >
          Arduino Day 2026
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl sm:text-2xl text-[#62AEB2] font-medium mb-2"
        >
          TinkerSpace Kochi
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-[#62AEB2]/90 text-sm sm:text-base mb-8 min-h-[2rem]"
        >
          {displayText}
          {!isTypingComplete && (
            <span className="inline-block w-0.5 h-4 bg-[#00979C] ml-0.5 animate-pulse" />
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Countdown targetDate={new Date("2026-03-28T10:00:00")} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
        >
          <Link
            href="https://wa.me/919497704406?text=Hi%2C%20I%27d%20like%20to%20participate%20in%20the%20Line%20Following%20Robot%20competition%20at%20Arduino%20Day%20Kochi%202026."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold transition-colors min-w-[180px] text-center flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 32 32" aria-hidden="true">
              <path
                fill="currentColor"
                d="M16.04 5.02c-5.53 0-10.02 4.49-10.02 10.02 0 1.77.47 3.49 1.36 5.01L6 27l7.16-1.87c1.46.55 2.99.82 4.54.82h.01c5.53 0 10.02-4.49 10.02-10.02 0-2.68-1.04-5.2-2.93-7.1a10.01 10.01 0 0 0-7.76-3.8Zm0 2c4.43 0 8.02 3.6 8.02 8.03 0 4.43-3.6 8.03-8.03 8.03a8 8 0 0 1-3.3-.72l-.47-.21-4.25 1.11 1.14-4.14-.25-.43A7.98 7.98 0 0 1 8.02 15c0-4.43 3.6-8.03 8.03-8.03Zm-3.02 3.52-.57-.01c-.18 0-.47.07-.72.35-.25.28-.95.93-.95 2.26s.97 2.62 1.11 2.8c.14.18 1.9 3.02 4.61 4.16 2.28.94 2.74.84 3.23.79.49-.05 1.59-.65 1.81-1.28.22-.63.22-1.17.16-1.28-.06-.11-.25-.18-.53-.32-.28-.14-1.59-.79-1.84-.88-.25-.09-.43-.14-.62.14-.19.28-.71.88-.87 1.06-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.37-.83-.73-1.39-1.63-1.56-1.91-.16-.28-.02-.43.12-.57.12-.12.28-.32.41-.48.13-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.51-.86-2.07-.22-.52-.44-.56-.63-.57Z"
              />
            </svg>
            Line Following Robot
          </Link>
          <Link
            href="https://tinkerhub.org/events/G5DBKWNQ9K/Arduino%20Day%202026"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-[#00979C] hover:bg-[#00878F] text-white font-semibold transition-colors min-w-[180px] text-center"
          >
            Register Now
          </Link>
          <Link
            href="https://forms.gle/M91FRPjqZFS5MDVg7"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full border-2 border-white/40 hover:border-white/70 text-white font-semibold transition-colors min-w-[180px] text-center"
          >
            Call for Speakers
          </Link>
          <ShareButton className="px-8 py-4 rounded-full border-2 border-[#62AEB2]/50 hover:border-[#62AEB2] text-[#62AEB2] font-semibold transition-colors min-w-[180px] text-center flex items-center justify-center gap-2" />
        </motion.div>
      </div>

    </section>
  );
}
