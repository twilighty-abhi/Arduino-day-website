"use client";

import { motion } from "framer-motion";

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
              href="https://tinkerhub.org/events/G5DBKWNQ9K/Arduino%20Day%202026"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-10 py-4 rounded-full bg-[#00979C] hover:bg-[#00878F] text-white font-semibold text-lg transition-colors shadow-lg shadow-[#00979C]/30"
            >
              Register Now
            </motion.a>
            <motion.a
              href="https://wa.me/919497704406?text=Hi%2C%20I%27d%20like%20to%20participate%20in%20the%20Line%20Following%20Robot%20competition%20at%20Arduino%20Day%20Kochi%202026."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold text-sm transition-colors shadow-lg shadow-[#25D366]/40"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M16.04 5.02c-5.53 0-10.02 4.49-10.02 10.02 0 1.77.47 3.49 1.36 5.01L6 27l7.16-1.87c1.46.55 2.99.82 4.54.82h.01c5.53 0 10.02-4.49 10.02-10.02 0-2.68-1.04-5.2-2.93-7.1a10.01 10.01 0 0 0-7.76-3.8Zm0 2c4.43 0 8.02 3.6 8.02 8.03 0 4.43-3.6 8.03-8.03 8.03a8 8 0 0 1-3.3-.72l-.47-.21-4.25 1.11 1.14-4.14-.25-.43A7.98 7.98 0 0 1 8.02 15c0-4.43 3.6-8.03 8.03-8.03Zm-3.02 3.52-.57-.01c-.18 0-.47.07-.72.35-.25.28-.95.93-.95 2.26s.97 2.62 1.11 2.8c.14.18 1.9 3.02 4.61 4.16 2.28.94 2.74.84 3.23.79.49-.05 1.59-.65 1.81-1.28.22-.63.22-1.17.16-1.28-.06-.11-.25-.18-.53-.32-.28-.14-1.59-.79-1.84-.88-.25-.09-.43-.14-.62.14-.19.28-.71.88-.87 1.06-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.37-.83-.73-1.39-1.63-1.56-1.91-.16-.28-.02-.43.12-.57.12-.12.28-.32.41-.48.13-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.51-.86-2.07-.22-.52-.44-.56-.63-.57Z"
                />
              </svg>
              Participate in Line Following Robot Competition
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
