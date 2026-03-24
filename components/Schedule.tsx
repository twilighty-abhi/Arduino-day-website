"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { scheduleData } from "@/lib/schedule";

const typeColors: Record<string, string> = {
  workshop: "bg-[#00979C]/20 text-[#00979C]",
  talk: "bg-[#E47128]/20 text-[#E47128]",
  "flash-talk": "bg-[#E47128]/20 text-[#E47128]",
  "hands-on": "bg-[#E5AD24]/20 text-[#8C7965]",
  interactive: "bg-[#E5AD24]/20 text-[#8C7965]",
  competition: "bg-[#C026D3]/15 text-[#A21CAF]",
  demo: "bg-[#3B82F6]/15 text-[#1D4ED8]",
  break: "bg-gray-200 text-gray-600",
  networking: "bg-[#62AEB2]/20 text-[#00878F]",
};

export default function Schedule() {
  return (
    <section id="schedule" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1628] mb-4">
            Schedule
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A day of workshops, talks, and hands-on sessions. Times are subject to change.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {scheduleData.map((item, i) => (
            <motion.div
              key={item.time}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="group flex flex-col sm:flex-row gap-4 p-4 sm:p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-transparent hover:border-[#00979C]/20 transition-all cursor-default"
            >
              <div className="sm:w-24 flex-shrink-0">
                <span className="font-mono font-semibold text-[#00979C]">
                  {item.time}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 items-center mb-1">
                  <h3 className="font-semibold text-[#0a1628]">
                    {item.type === "competition" ? (
                      <Link
                        href="/line-following"
                        className="hover:text-[#00979C] hover:underline underline-offset-2"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      typeColors[item.type] ?? "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {item.description}
                  {item.linkUrl && item.linkLabel && (
                    <>
                      {" "}
                      <a
                        href={item.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00979C] hover:underline font-medium"
                      >
                        {item.linkLabel}
                      </a>
                      .
                    </>
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
