"use client";

import { motion } from "framer-motion";
import { EVENT_REGISTRATION_URL } from "@/lib/event";

export default function RegistrationCTA() {
  return (
    <section id="register" className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1628] mb-4">
            Register for Arduino Day
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join us for a day of workshops, talks, and hands-on sessions. Registration is free.
          </p>
          <div className="flex flex-col items-center justify-center gap-3">
            <motion.a
              href={EVENT_REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-10 py-4 rounded-full bg-[#00979C] hover:bg-[#00878F] text-white font-semibold text-lg transition-colors shadow-lg shadow-[#00979C]/30"
            >
              Register Now
            </motion.a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <a
              href="https://forms.gle/M91FRPjqZFS5MDVg7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00979C] hover:underline"
            >
              Call for speakers
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="https://days.arduino.cc/events"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00979C] hover:underline"
            >
              Arduino Days events
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
