import Link from "next/link";
import Image from "next/image";

export default function ImAttendingPage() {
  return (
    <main className="min-h-screen bg-[#0a1628] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-3 mb-6">
          <h1 className="text-white text-2xl sm:text-3xl font-bold">I&apos;m Attending Poster</h1>
          <Link
            href="/"
            className="text-sm sm:text-base px-4 py-2 rounded-full border border-white/30 text-white/90 hover:text-white hover:border-white/60 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        <section
          className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
          style={{
            backgroundImage: "url('/Zoom background 03.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#0a1628]/55" />

          <div className="relative z-10 p-8 sm:p-12 md:p-16 min-h-[720px] flex flex-col justify-between">
            <div>
              <p className="inline-flex items-center rounded-full bg-[#00979C]/25 text-[#b2f2f4] border border-[#00979C]/45 px-4 py-1 text-sm font-medium">
                Kochi • March 28, 2026
              </p>

              <div className="mt-6">
                <Image
                  src="/Arduino_DAYS2026_Logotype_wordmark.svg"
                  alt="Arduino Day 2026"
                  width={560}
                  height={120}
                  className="w-full max-w-[560px] h-auto"
                  priority
                />
              </div>

              <h2 className="mt-10 text-white text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                I&apos;M ATTENDING
              </h2>
              <p className="mt-4 text-[#d3f3f5] text-lg sm:text-xl max-w-2xl">
                Arduino Day 2026 @ TinkerSpace Kochi
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm px-5 py-4 text-white/90">
                <p className="text-sm uppercase tracking-widest text-white/70">Event</p>
                <p className="mt-1 text-xl font-semibold">10:00 AM - 5:00 PM</p>
                <p className="text-white/80">TinkerSpace Kochi, Kerala</p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-white/90 text-sm sm:text-base">
                  Register:
                </p>
                <a
                  href="https://tinkerhub.org/events/G5DBKWNQ9K/Arduino%20Day%202026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-5 py-2.5 rounded-full bg-[#00979C] hover:bg-[#00878F] text-white font-semibold transition-colors"
                >
                  Event Page
                </a>
              </div>
            </div>
          </div>
        </section>

        <p className="mt-4 text-white/70 text-sm">
          Tip: open this page on mobile and take a screenshot to share your attendance poster.
        </p>
      </div>
    </main>
  );
}

