"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareButtonProps {
  className?: string;
}

export default function ShareButton({ className = "" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: "Arduino Day 2026 @ TinkerSpace Kochi",
          text: "Join us for Arduino Day 2026 at TinkerSpace Kochi on March 28!",
          url,
        });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        className={className}
        aria-label="Share event"
      >
        {copied ? (
          "Link copied!"
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Share
          </>
        )}
      </button>
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#00979C] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-50"
          >
            Link copied!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
