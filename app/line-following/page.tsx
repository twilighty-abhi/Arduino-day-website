import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  LINE_FOLLOWING_FORM_URL,
  LINE_FOLLOWING_REGISTRATION_FULL,
} from "@/lib/event";

export const metadata: Metadata = {
  title: "Line Following Robot Competition | Arduino Day 2026 @ TinkerSpace Kochi",
  description:
    "Arduino Line Following Robot Competition — rules, categories, judging, and registration for Arduino Day 2026 at TinkerSpace Kochi.",
};

export default function LineFollowingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <p className="text-sm font-medium text-[#00979C] mb-2">Arduino Day 2026</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0a1628] tracking-tight mb-6">
            Line Following Robot Competition
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Welcome to the Arduino Line Following Robot Competition, part of Arduino Day 2026 at
            TinkerSpace Kochi!
          </p>

          <p className="text-gray-700 leading-relaxed mb-10">
            This competition is open to individuals and teams of up to 3 members. Build a robot that
            can autonomously follow a line track using Arduino — and compete against makers from
            across Kochi.
          </p>

          <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm mb-10">
            <h2 className="text-xl font-semibold text-[#0a1628] mb-4">Event details</h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                <span className="font-medium text-gray-900">Date:</span> Saturday, March 28, 2026
              </li>
              <li>
                <span className="font-medium text-gray-900">Venue:</span> TinkerSpace, Kochi,
                Kerala
              </li>
              <li>
                <span className="font-medium text-gray-900">Registration:</span>{" "}
                {LINE_FOLLOWING_REGISTRATION_FULL ? (
                  <span className="text-amber-800">Full — competition slots filled</span>
                ) : (
                  "Free"
                )}
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#0a1628] mb-4">Competition rules</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Robot must be Arduino-based (any Arduino board is allowed)</li>
              <li>
                Robot must follow a black line on a white surface autonomously — no remote control
              </li>
              <li>Maximum robot dimensions: 30cm × 30cm</li>
              <li>Power source must be onboard (no wired power supply during the run)</li>
              <li>Both pre-built and freshly built robots are allowed</li>
              <li>Judges&apos; decision is final</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#0a1628] mb-4">Categories</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                <span className="font-medium text-gray-900">Solo</span> — individual participant
              </li>
              <li>
                <span className="font-medium text-gray-900">Team</span> — 2 to 3 members
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#0a1628] mb-4">What to bring</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Your robot, fully assembled and tested</li>
              <li>Laptop for any last-minute code changes</li>
              <li>Spare components, wires, and batteries</li>
              <li>Arduino IDE installed and ready</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#0a1628] mb-4">Judging criteria</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Completion of the track</li>
              <li>Time taken</li>
              <li>Accuracy (penalties for going off-track)</li>
            </ul>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed border-l-4 border-[#00979C]/40 pl-4">
              <span className="font-medium text-gray-800">Note:</span> The track layout will not be
              revealed before the event. Design for adaptability, not a specific track.
            </p>
          </section>

          <section className="rounded-2xl border border-[#00979C]/25 bg-[#00979C]/5 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-[#0a1628] mb-3">Register</h2>
            {LINE_FOLLOWING_REGISTRATION_FULL ? (
              <>
                <p className="text-gray-700 mb-4">
                  Competition registration is full — all slots have been filled for the Line
                  Following Robot competition.
                </p>
                <p className="text-sm text-gray-600">
                  Main Arduino Day event registration is still available from the home page if you
                  plan to attend the day.
                </p>
                <span className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-400 text-white font-semibold px-8 py-3 cursor-default">
                  Registration full
                </span>
              </>
            ) : (
              <>
                <p className="text-gray-700 mb-6">
                  Fill in the details below to register. You will receive a confirmation on the email
                  provided.
                </p>
                <a
                  href={LINE_FOLLOWING_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#00979C] hover:bg-[#00878F] text-white font-semibold px-8 py-3 transition-colors"
                >
                  Open registration form
                </a>
              </>
            )}
          </section>

          <p className="mt-10">
            <Link
              href="/"
              className="text-[#00979C] font-medium hover:underline"
            >
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
