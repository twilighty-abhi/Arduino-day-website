import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arduino Day 2026 @ TinkerSpace Kochi | March 28",
  description:
    "Join Arduino Day 2026 at TinkerSpace Kochi on March 28. Celebrate makers, AI, edge computing, and the global Arduino community. Free event.",
  keywords: ["Arduino", "Arduino Day", "Kochi", "TinkerSpace", "makers", "IoT", "AI"],
  icons: {
    icon: [{ url: "/Arduino_DAYS2026_Logotype.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Arduino Day 2026 @ TinkerSpace Kochi | March 28",
    description: "Join Arduino Day 2026 at TinkerSpace Kochi. Celebrate makers, AI, and the Arduino community.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
