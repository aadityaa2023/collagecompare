"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowRight, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/shared/SearchBar";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container-main py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div variants={fadeUp} custom={0} className="mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-crimson-light text-crimson text-xs font-medium rounded-full border border-crimson/10">
                <Star className="h-3 w-3" />
                India&apos;s #1 College Comparison Platform
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-navy leading-tight mb-4"
            >
              Compare Degrees.
              <br />
              <span className="text-crimson">Choose Your Future.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-base lg:text-lg text-slate-600 leading-relaxed mb-6 max-w-lg"
            >
              Compare colleges, courses, fees, placements, rankings, and
              reviews — all in one place. Make smart, data-driven decisions
              about your higher education.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mb-6">
              <SearchBar variant="hero" className="max-w-lg" />
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex flex-wrap gap-3"
            >
              <Button
                asChild
                className="bg-crimson hover:bg-crimson-dark text-white font-medium px-6 h-10 rounded-lg shadow-none"
              >
                <Link href="/compare">
                  Start Comparing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="font-medium px-6 h-10 rounded-lg border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <Link href="/colleges">Explore Colleges</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: VS Comparison Composition */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative flex items-center justify-center gap-4">
              {/* College Card 1 */}
              <div className="w-[220px] bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center border border-amber-100">
                    <School className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">
                      IIT Bombay
                    </p>
                    <p className="text-[10px] text-slate-500">Mumbai, MH</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Fees</span>
                    <span className="text-xs font-semibold text-navy">
                      8.0 L
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">
                      Placement
                    </span>
                    <span className="text-xs font-semibold text-emerald-600">
                      95%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Avg Pkg</span>
                    <span className="text-xs font-semibold text-navy">
                      21.0 LPA
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">
                      NIRF Rank
                    </span>
                    <span className="text-xs font-semibold text-amber-600">
                      #3
                    </span>
                  </div>
                </div>
              </div>

              {/* VS Badge */}
              <div className="relative z-10 shrink-0">
                <div className="h-12 w-12 rounded-full bg-crimson text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-crimson/25">
                  VS
                </div>
              </div>

              {/* College Card 2 */}
              <div className="w-[220px] bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                    <School className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">
                      BITS Pilani
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Pilani, RJ
                    </p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Fees</span>
                    <span className="text-xs font-semibold text-navy">
                      21.0 L
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">
                      Placement
                    </span>
                    <span className="text-xs font-semibold text-emerald-600">
                      92%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Avg Pkg</span>
                    <span className="text-xs font-semibold text-navy">
                      16.5 LPA
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">
                      NIRF Rank
                    </span>
                    <span className="text-xs font-semibold text-amber-600">
                      #24
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative dots */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-crimson/5 rounded-full -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-slate-100 rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
