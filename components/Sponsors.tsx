"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Sponsor = {
  name: string;
  src: string;
  href: string;
  /** Square / app-style mark — use a 1:1 frame so it matches horizontal wordmarks visually */
  square?: boolean;
};

const sponsors: Sponsor[] = [
  { name: "Screenly", src: "/Screeny logo.png", href: "https://www.screenly.io/" },
  { name: "Desh Keyboard", src: "/Desh Keyboard logo.png", href: "https://www.deshkeyboard.com/" },
  { name: "Seeed Studio", src: "/seed studio logo.png", href: "https://www.seeedstudio.com/" },
  { name: "Edge Impulse Qualcomm", src: "/Edge Impulse Qualcomm logo.svg", href: "https://www.edgeimpulse.com/qualcomm" },
  { name: "MakerGram", src: "/makergram logo.png", href: "https://makergram.com/", square: true },
];

export default function Sponsors() {
  const lgCols = 3;
  const firstRow = sponsors.slice(0, lgCols);
  const secondRow = sponsors.slice(lgCols);

  return (
    <section id="sponsors" className="py-16 sm:py-20 bg-gradient-to-b from-white to-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1628] mb-3">Supporters</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Thank you to our partners for supporting Arduino Day 2026 at TinkerSpace Kochi.
          </p>
        </motion.div>

        {/* Small/tablet: normal responsive grid */}
        <ul className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12 items-center justify-items-center">
          {sponsors.map(({ name, src, href, square }, i) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex w-full max-w-[260px] items-center justify-center"
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-xl transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00979C] focus-visible:ring-offset-2"
                aria-label={`${name} (opens in new tab)`}
              >
                <div
                  className={
                    square
                      ? "relative h-20 w-20 sm:h-24 sm:w-24 shrink-0"
                      : "relative h-14 w-full sm:h-16"
                  }
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes={square ? "96px" : "(max-width: 640px) 260px, 200px"}
                    className="object-contain object-center"
                    unoptimized
                  />
                </div>
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Large: explicit 3-on-top + centered 2-on-bottom */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-10 sm:gap-12 items-center justify-items-center">
            {firstRow.map(({ name, src, href, square }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex w-full max-w-[260px] items-center justify-center"
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-xl transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00979C] focus-visible:ring-offset-2"
                  aria-label={`${name} (opens in new tab)`}
                >
                  <div
                    className={
                      square
                        ? "relative h-20 w-20 sm:h-24 sm:w-24 shrink-0"
                        : "relative h-14 w-full sm:h-16"
                    }
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes={square ? "96px" : "(max-width: 640px) 260px, 200px"}
                      className="object-contain object-center"
                      unoptimized
                    />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          {secondRow.length > 0 && (
            <div className="mt-10 sm:mt-12 flex justify-center gap-32">
              {secondRow.map(({ name, src, href, square }, j) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (firstRow.length + j) * 0.05 }}
                  className="flex items-center justify-center"
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-xl transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00979C] focus-visible:ring-offset-2"
                    aria-label={`${name} (opens in new tab)`}
                  >
                    <div
                      className={
                        square
                          ? "relative h-20 w-20 sm:h-24 sm:w-24 shrink-0"
                          : "relative h-14 w-[220px] sm:h-16"
                      }
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes={square ? "96px" : "220px"}
                        className="object-contain object-center"
                        unoptimized
                      />
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
