"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight, School, CheckCircle2, TrendingUp, Award, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/shared/SearchBar";
import { colleges } from "@/data/colleges";

const HERO_COMPARISONS = [
  {
    id: "iitb-bits",
    title: "IIT-B vs BITS",
    college1: colleges.find((c) => c.id === "iit-bombay") || {
      id: "iit-bombay",
      shortName: "IIT Bombay",
      location: { city: "Mumbai", state: "MH" },
      avgPackage: 21.0,
      placementPercentage: 95,
      nirfRanking: 3,
      fees: { btech: 800000 },
      campus: "/colleges/campus-iit-bombay.jpg",
    },
    college2: colleges.find((c) => c.id === "bits-pilani") || {
      id: "bits-pilani",
      shortName: "BITS Pilani",
      location: { city: "Pilani", state: "RJ" },
      avgPackage: 16.5,
      placementPercentage: 92,
      nirfRanking: 24,
      fees: { btech: 2100000 },
      campus: "/colleges/campus-bits-pilani.jpg",
    },
  },
  {
    id: "iitb-iitd",
    title: "IIT-B vs IIT-D",
    college1: colleges.find((c) => c.id === "iit-bombay"),
    college2: colleges.find((c) => c.id === "iit-delhi"),
  },
  {
    id: "vit-srm",
    title: "VIT vs SRM",
    college1: colleges.find((c) => c.id === "vit-vellore"),
    college2: colleges.find((c) => c.id === "srm-chennai"),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function HeroSection() {
  const [selectedComparison, setSelectedComparison] = useState(0);
  const activeComp = HERO_COMPARISONS[selectedComparison];
  const c1 = activeComp?.college1;
  const c2 = activeComp?.college2;

  // Metric calculations
  const c1Pkg = c1?.avgPackage || 0;
  const c2Pkg = c2?.avgPackage || 0;
  const pkgDelta = Math.abs(c1Pkg - c2Pkg).toFixed(1);
  const c1IsPkgWinner = c1Pkg >= c2Pkg;

  const c1Fee = c1?.fees?.btech ? (c1.fees.btech / 100000).toFixed(1) + " L" : "N/A";
  const c2Fee = c2?.fees?.btech ? (c2.fees.btech / 100000).toFixed(1) + " L" : "N/A";

  return (
    <section className="relative overflow-hidden bg-white radial-glow-hero border-b border-slate-100">
      {/* Subtle Dot Pattern Overlay */}
      <div className="absolute inset-0 bg-dot-pattern opacity-60 pointer-events-none [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]" />

      <div className="container-main relative pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Copy (7 cols on lg) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Social Proof Pill with Real Avatars */}
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/80 shadow-sm backdrop-blur-sm">
                <div className="flex -space-x-2 items-center">
                  <div className="relative h-6 w-6 rounded-full overflow-hidden ring-2 ring-white shadow-xs">
                    <Image src="/avatars/avatar-1.jpg" alt="Student" fill sizes="24px" className="object-cover" />
                  </div>
                  <div className="relative h-6 w-6 rounded-full overflow-hidden ring-2 ring-white shadow-xs">
                    <Image src="/avatars/avatar-2.jpg" alt="Student" fill sizes="24px" className="object-cover" />
                  </div>
                  <div className="relative h-6 w-6 rounded-full overflow-hidden ring-2 ring-white shadow-xs">
                    <Image src="/avatars/avatar-3.jpg" alt="Student" fill sizes="24px" className="object-cover" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-700">
                  <div className="flex text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                  </div>
                  <span className="font-semibold text-navy">4.9/5</span>
                  <span className="text-slate-400">&middot;</span>
                  <span className="text-slate-600 font-medium">50,000+ Students Guided</span>
                </div>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-navy leading-[1.12] mb-5"
            >
              Compare Degrees.
              <br />
              <span className="gradient-text-crimson">Choose Your Future.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 max-w-xl"
            >
              Unbiased side-by-side comparisons of <strong className="text-navy font-semibold">fees, verified placements, NIRF rankings, and ROI</strong> for top colleges across India. Stop guessing, start deciding.
            </motion.p>

            {/* Command-Bar Search */}
            <motion.div variants={fadeUp} custom={3} className="mb-6 max-w-xl">
              <SearchBar variant="hero" />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <Button
                asChild
                className="bg-crimson hover:bg-crimson-dark text-white font-semibold px-6 h-11 text-sm rounded-xl shadow-md shadow-crimson/20 transition-all hover:shadow-lg hover:shadow-crimson/30"
              >
                <Link href="/compare">
                  Compare Colleges Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="font-medium px-5 h-11 text-sm rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-sm"
              >
                <Link href="/colleges">Explore 500+ Colleges</Link>
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeUp}
              custom={5}
              className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500 font-medium"
            >
              <span className="inline-flex items-center gap-1.5 text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                100% Free & Transparent
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                Verified NIRF & Placement Data
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                Side-by-Side ROI Analysis
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Interactive Live Comparison Widget (5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.12, ease: "easeOut" }}
            className="lg:col-span-5 relative transform-gpu"
          >
            {/* Ambient Lighting Gradients behind widget */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-rose-200/30 rounded-full blur-2xl pointer-events-none -z-10 transform-gpu" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-100/40 rounded-full blur-2xl pointer-events-none -z-10 transform-gpu" />

            {/* Main Interactive Comparison Card */}
            <div className="glass-card rounded-2xl shadow-lg shadow-slate-200/50 p-5 sm:p-6 border border-slate-200/80 transform-gpu">
              {/* Comparison Switcher Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl mb-5">
                {HERO_COMPARISONS.map((comp, idx) => (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedComparison(idx)}
                    className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg transition-all text-center truncate ${
                      selectedComparison === idx
                        ? "bg-white text-navy shadow-sm"
                        : "text-slate-500 hover:text-navy hover:bg-slate-200/50"
                    }`}
                  >
                    {comp.title}
                  </button>
                ))}
              </div>

              {/* Dynamic Animated Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeComp?.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="transform-gpu"
                >
                  {/* Two Institutions Header */}
                  <div className="relative flex items-center justify-between gap-3 mb-5">
                    {/* College 1 */}
                    <div className="flex-1 text-center bg-white/80 p-3 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="relative h-12 w-12 mx-auto rounded-xl overflow-hidden border border-slate-200 mb-2 shadow-xs">
                        <Image
                          src={c1?.campus || "/campus-placeholder.jpg"}
                          alt={c1?.shortName || "College"}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm font-bold text-navy truncate">
                        {c1?.shortName}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {c1?.location?.city}, {c1?.location?.state}
                      </p>
                      <span className="inline-flex mt-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-bold text-[10px] border border-amber-200/80">
                        NIRF #{c1?.nirfRanking}
                      </span>
                    </div>

                    {/* VS Pulse Badge */}
                    <div className="relative z-10 shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-crimson to-rose-500 text-white flex items-center justify-center font-extrabold text-xs shadow-md shadow-crimson/30">
                        VS
                      </div>
                    </div>

                    {/* College 2 */}
                    <div className="flex-1 text-center bg-white/80 p-3 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="relative h-12 w-12 mx-auto rounded-xl overflow-hidden border border-slate-200 mb-2 shadow-xs">
                        <Image
                          src={c2?.campus || "/campus-placeholder.jpg"}
                          alt={c2?.shortName || "College"}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm font-bold text-navy truncate">
                        {c2?.shortName}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {c2?.location?.city}, {c2?.location?.state}
                      </p>
                      <span className="inline-flex mt-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold text-[10px] border border-blue-200/80">
                        NIRF #{c2?.nirfRanking}
                      </span>
                    </div>
                  </div>

                  {/* Comparative Metrics Grid */}
                  <div className="space-y-2.5 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 mb-5">
                    {/* Average Package */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className={`font-bold ${c1IsPkgWinner ? "text-emerald-700 font-bold" : "text-slate-600"}`}>
                          ₹{c1Pkg} LPA
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          Avg Package
                        </span>
                        <span className={`font-bold ${!c1IsPkgWinner ? "text-emerald-700 font-bold" : "text-slate-600"}`}>
                          ₹{c2Pkg} LPA
                        </span>
                      </div>
                      {/* Metric Comparison Bar */}
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                        <div
                          className="bg-emerald-500 h-full rounded-l-full"
                          style={{ width: `${(c1Pkg / (c1Pkg + c2Pkg)) * 100}%` }}
                        />
                        <div
                          className="bg-blue-500 h-full rounded-r-full"
                          style={{ width: `${(c2Pkg / (c1Pkg + c2Pkg)) * 100}%` }}
                        />
                      </div>
                      <div className="text-center mt-1">
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <TrendingUp className="h-3 w-3" />
                          {c1IsPkgWinner ? c1?.shortName : c2?.shortName} offers +₹{pkgDelta} LPA higher
                        </span>
                      </div>
                    </div>

                    {/* Placement % */}
                    <div className="pt-2 border-t border-slate-200/60 flex justify-between items-center text-xs">
                      <span className="font-bold text-navy">{c1?.placementPercentage}%</span>
                      <span className="text-[11px] text-slate-500">Placement Record</span>
                      <span className="font-bold text-navy">{c2?.placementPercentage}%</span>
                    </div>

                    {/* B.Tech Fees */}
                    <div className="pt-2 border-t border-slate-200/60 flex justify-between items-center text-xs">
                      <span className="font-bold text-navy">₹{c1Fee}</span>
                      <span className="text-[11px] text-slate-500">Total 4-Yr Fees</span>
                      <span className="font-bold text-navy">₹{c2Fee}</span>
                    </div>
                  </div>

                  {/* Direct Compare Link Button */}
                  <Button
                    asChild
                    className="w-full bg-navy hover:bg-slate-800 text-white font-semibold h-10 text-xs rounded-xl shadow-sm transition-colors"
                  >
                    <Link href={`/compare?c1=${c1?.id}&c2=${c2?.id}`}>
                      Open Full Side-by-Side Comparison
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
