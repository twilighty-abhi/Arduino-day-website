"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_ITEMS = [
  {
    q: "Who can attend?",
    a: "Anyone! Arduino Day is open to makers, students, educators, hobbyists, and anyone curious about electronics and technology. No prior experience required.",
  },
  {
    q: "Is it free?",
    a: "Yes, registration is free. TinkerSpace Kochi is a free, community-driven space, and Arduino Day events are free to attend.",
  },
  {
    q: "What should I bring?",
    a: "Just yourself and your curiosity! A laptop can be helpful for workshops. Arduino kits and hardware will be available at the venue.",
  },
  {
    q: "Do I need Arduino experience?",
    a: "No. We welcome beginners. Workshops will cover basics, and there will be sessions for all skill levels.",
  },
  {
    q: "Is parking available?",
    a: "Little Parking is available in the venue. We recommend public transport or carpooling when possible.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1628] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quick answers to common questions about the event.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-[#0a1628] font-medium hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === i}
              >
                {item.q}
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  className="text-[#00979C]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-gray-600 text-sm sm:text-base">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
