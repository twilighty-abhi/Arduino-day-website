"use client";

import { motion } from "framer-motion";

const EVENT_DATE = "2026-03-28";
const EVENT_TIME = "09:00";
const EVENT_TITLE = "Arduino Day 2026 @ TinkerSpace Kochi";
const EVENT_DESCRIPTION = "Join us for Arduino Day 2026 - a celebration of makers, AI, and edge computing at TinkerSpace Kochi.";
const EVENT_LOCATION_LABEL = "TinkerSpace Kochi, Kochi, Kerala";
const EVENT_LOCATION_MAP_URL = "https://www.google.com/maps/search/TinkerSpace+Kochi";

function generateGoogleCalendarUrl() {
  const start = new Date(`${EVENT_DATE}T${EVENT_TIME}:00`);
  const end = new Date(start);
  end.setHours(end.getHours() + 8);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT_TITLE,
    dates: `${start.toISOString().replace(/[-:]/g, "").slice(0, 15)}Z/${end.toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    details: EVENT_DESCRIPTION,
    location: "TinkerSpace Kochi, Kochi, Kerala, India",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function IconCard({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white/70 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-2xl bg-[#00979C]/10 flex items-center justify-center text-[#00979C]">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="font-semibold text-[#0a1628]">{title}</div>
        <div className="text-gray-600 text-sm sm:text-base">{children}</div>
      </div>
    </div>
  );
}

export default function EventDetails() {
  return (
    <section id="event" className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00979C]/20 bg-[#00979C]/5 px-3 py-1 text-xs font-medium text-[#00878F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00979C]" />
              March 28, 2026 • Kochi
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0a1628] leading-tight">
              Event Details
            </h2>
            <p className="mt-3 text-lg text-gray-600 max-w-xl">
              Everything you need at a glance — date, time, venue, and quick actions.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Workshops", "Hands-on demos", "Community showcase", "Beginner-friendly"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white px-3 py-1 text-sm text-gray-700 shadow-sm border border-gray-100"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={generateGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#00979C] hover:bg-[#00878F] text-white font-semibold transition-colors px-5 py-3 shadow-lg shadow-[#00979C]/25"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Add to Calendar
              </a>
              <a
                href={EVENT_LOCATION_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-[#0a1628] font-semibold transition-colors px-5 py-3"
              >
                <svg className="w-5 h-5 text-[#00979C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Directions
              </a>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              Venue: <span className="font-medium text-gray-700">{EVENT_LOCATION_LABEL}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-3xl border border-gray-100 bg-white p-5 sm:p-7 shadow-xl overflow-hidden">
              <div className="pointer-events-none absolute inset-0 opacity-40">
                <div
                  className="absolute -top-24 -right-24 h-64 w-64 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(0,151,156,0.18), transparent 60%)" }}
                />
                <div
                  className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(228,113,40,0.12), transparent 60%)" }}
                />
              </div>

              <div className="relative grid sm:grid-cols-2 gap-4">
                <IconCard
                  title="Date"
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  Saturday, March 28, 2026
                </IconCard>

                <IconCard
                  title="Time"
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                >
                  9:00 AM onwards (full day)
                </IconCard>

                <IconCard
                  title="Venue"
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                >
                  {EVENT_LOCATION_LABEL}
                </IconCard>

                <IconCard
                  title="Format"
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  }
                >
                  In-person event • Local Arduino Days meetup
                </IconCard>
              </div>

              <div className="relative mt-5 rounded-2xl border border-gray-100 bg-slate-50 p-4 sm:p-5">
                <div className="text-sm font-semibold text-[#0a1628]">Quick tip</div>
                <p className="mt-1 text-sm text-gray-600">
                  If you’re new to Arduino, come early — we’ll help you get set up and find the right track.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
