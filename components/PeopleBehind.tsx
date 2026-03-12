"use client";

import { motion } from "framer-motion";

const PEOPLE = [
  {
    name: "Abhiram N J",
    role: "Host & Local Organizer",
    url: "https://www.linkedin.com/in/abhiram-n-j/",
  },
  {
    name: "Salman Faris",
    role: "Community & Program Design",
    url: "https://www.linkedin.com/in/salmanfarisvp/",
  },
  {
    name: "Abdul Samad M J",
    role: "Content & Speaker Support",
    url: "https://www.linkedin.com/in/abdulsamadmj/",
  },
  {
    name: "Midlaj C",
    role: "Tech, Demos & Workshops",
    url: "https://www.linkedin.com/in/midlajc/",
  },
];

export default function PeopleBehind() {
  return (
    <section className="py-20 sm:py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-[#62AEB2] uppercase">
            PEOPLE BEHIND IT
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">
            The crew powering Arduino Day @ Kochi
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            A small team of makers keeping things running smoothly — from
            talks and workshops to competitions and coffee.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PEOPLE.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-5 sm:px-5 sm:py-6"
            >
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <div
                  className="absolute -top-10 -right-10 h-20 w-20 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(0,151,156,0.35), transparent 60%)",
                  }}
                />
              </div>
              <div className="relative">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#00979C]/15 text-sm font-semibold text-[#62AEB2]">
                  {person.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold">{person.name}</h3>
                <p className="mt-1 text-sm text-white/70">{person.role}</p>
                <a
                  href={person.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80 hover:bg-white/10 transition-colors"
                >
                  <span>View LinkedIn</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5h10M19 5v10M19 5L9 15"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

