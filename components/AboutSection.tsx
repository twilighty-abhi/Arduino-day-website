"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import LedBlinkSimulator from "./LedBlinkSimulator";
import ArduinoFactCarousel from "./ArduinoFactCarousel";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1628] mb-4">
            Arduino Day in Kochi
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A full day where Kochi&apos;s makers, students, and tinkerers come together to
            learn, build, and show what&apos;s possible with Arduino.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-[#00979C]">
              Global Arduino energy, Kochi flavour
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Arduino Day is celebrated around the world, but this edition is shaped by Kochi&apos;s
              own community — from school students discovering their first LED blink to engineers
              experimenting with AI on the edge.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Expect a very Kochi mix of talks, flash sessions, competitions, and hands-on corners:
              curious learners, hardware hackers, open-source enthusiasts, and folks who just love
              building things together.
            </p>
            <ArduinoFactCarousel />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <LedBlinkSimulator />
            <div className="mt-6 flex justify-center">
              <Image
                src="https://content.arduino.cc/brand/characters-color.svg"
                alt="Arduino characters"
                width={280}
                height={120}
                className="w-64 sm:w-72 h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
