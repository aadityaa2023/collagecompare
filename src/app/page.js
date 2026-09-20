"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  IndianRupee,
  TrendingUp,
  Trophy,
  MessageSquare,
  GraduationCap,
  School,
  Users,
  BarChart3,
  ChevronRight,
  Star,
  MapPin,
  Check,
  X as XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SearchBar from "@/components/shared/SearchBar";
import CollegeCard from "@/components/shared/CollegeCard";
import CourseCard from "@/components/shared/CourseCard";
import TestimonialCard from "@/components/shared/TestimonialCard";
import { colleges, formatFees, formatPackage } from "@/data/colleges";
import { courses } from "@/data/courses";
import { testimonials } from "@/data/testimonials";
import { rankings } from "@/data/rankings";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const features = [
  {
    icon: IndianRupee,
    title: "Compare Fees",
    description:
      "Side-by-side fee comparison across colleges. Know the exact cost of your degree before applying.",
  },
  {
    icon: TrendingUp,
    title: "Placement Data",
    description:
      "Real placement statistics — average packages, highest offers, placement percentages, and top recruiters.",
  },
  {
    icon: Trophy,
    title: "Rankings",
    description:
      "NIRF, NAAC, and institution-specific rankings consolidated in one comprehensive view.",
  },
  {
    icon: MessageSquare,
    title: "Campus & Reviews",
    description:
      "Student reviews, campus facility details, and real experiences to help you decide.",
  },
];

const stats = [
  { value: "500+", label: "Colleges" },
  { value: "200+", label: "Courses" },
  { value: "50,000+", label: "Students Helped" },
  { value: "100+", label: "Rankings Tracked" },
];

const popularComparisons = [
  {
    college1: colleges.find((c) => c.id === "iit-bombay"),
    college2: colleges.find((c) => c.id === "iit-delhi"),
  },
  {
    college1: colleges.find((c) => c.id === "vit-vellore"),
    college2: colleges.find((c) => c.id === "srm-chennai"),
  },
  {
    college1: colleges.find((c) => c.id === "nit-trichy"),
    college2: colleges.find((c) => c.id === "bits-pilani"),
  },
];

const steps = [
  {
    number: "01",
    title: "Search",
    description:
      "Find any college or course from our database of 500+ institutions across India.",
    icon: Search,
  },
  {
    number: "02",
    title: "Compare",
    description:
      "Place colleges side by side and compare fees, placements, rankings, and facilities.",
    icon: BarChart3,
  },
  {
    number: "03",
    title: "Decide",
    description:
      "Make a confident, data-driven decision about your higher education journey.",
    icon: GraduationCap,
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* ─── HERO ─── */}
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

        {/* ─── STATS STRIP ─── */}
        <SectionWrapper className="bg-slate-50 border-y border-slate-100">
          <div className="container-main py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-crimson mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ─── WHY COMPARE DEGREE ─── */}
        <SectionWrapper className="section-padding bg-white">
          <div className="container-main">
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-3">Why Compare Degree?</h2>
              <p className="text-body max-w-2xl mx-auto">
                Everything you need to make an informed decision about your
                higher education, all in one place.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200"
                >
                  <div className="h-10 w-10 rounded-lg bg-crimson-light flex items-center justify-center mb-4">
                    <feature.icon className="h-5 w-5 text-crimson" />
                  </div>
                  <h3 className="text-sm font-semibold text-navy mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ─── POPULAR COMPARISONS ─── */}
        <SectionWrapper className="section-padding bg-slate-50">
          <div className="container-main">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="heading-2 mb-2">Popular Comparisons</h2>
                <p className="text-body">
                  See how top colleges stack up against each other.
                </p>
              </div>
              <Button
                asChild
                variant="ghost"
                className="hidden sm:inline-flex text-sm text-crimson hover:text-crimson-dark hover:bg-crimson-light"
              >
                <Link href="/compare">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {popularComparisons.map(({ college1, college2 }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={`/compare?c1=${college1.id}&c2=${college2.id}`}
                    className="group block"
                  >
                    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1 text-center">
                          <div className="h-10 w-10 mx-auto rounded-lg bg-amber-50 flex items-center justify-center border border-amber-100 mb-2">
                            <School className="h-5 w-5 text-amber-600" />
                          </div>
                          <p className="text-xs font-semibold text-navy">
                            {college1.shortName}
                          </p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-crimson/10 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-crimson">
                            VS
                          </span>
                        </div>
                        <div className="flex-1 text-center">
                          <div className="h-10 w-10 mx-auto rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 mb-2">
                            <School className="h-5 w-5 text-blue-600" />
                          </div>
                          <p className="text-xs font-semibold text-navy">
                            {college2.shortName}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-slate-100">
                        <div>
                          <p className="text-[10px] text-slate-400 mb-0.5">
                            Avg Pkg
                          </p>
                          <p className="text-xs font-semibold text-navy">
                            {college1.avgPackage} vs {college2.avgPackage} LPA
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 mb-0.5">
                            Placed
                          </p>
                          <p className="text-xs font-semibold text-navy">
                            {college1.placementPercentage}% vs{" "}
                            {college2.placementPercentage}%
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 mb-0.5">
                            NIRF
                          </p>
                          <p className="text-xs font-semibold text-navy">
                            #{college1.nirfRanking} vs #{college2.nirfRanking}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-100 text-center">
                        <span className="text-xs font-medium text-crimson group-hover:underline">
                          Compare Now
                          <ChevronRight className="inline h-3 w-3 ml-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ─── EXPLORE COURSES ─── */}
        <SectionWrapper className="section-padding bg-white">
          <div className="container-main">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="heading-2 mb-2">Explore Courses</h2>
                <p className="text-body">
                  Discover programs across engineering, management, science, and
                  more.
                </p>
              </div>
              <Button
                asChild
                variant="ghost"
                className="hidden sm:inline-flex text-sm text-crimson hover:text-crimson-dark hover:bg-crimson-light"
              >
                <Link href="/courses">
                  View all courses
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {courses.slice(0, 8).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ─── HOW IT WORKS ─── */}
        <SectionWrapper className="section-padding bg-slate-50">
          <div className="container-main">
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-3">How It Works</h2>
              <p className="text-body max-w-xl mx-auto">
                Three simple steps to find and compare the right college for
                you.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-center"
                >
                  <div className="relative inline-flex mb-5">
                    <div className="h-14 w-14 rounded-2xl bg-crimson/10 flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-crimson" />
                    </div>
                    <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-crimson text-white text-xs font-bold flex items-center justify-center">
                      {step.number.replace("0", "")}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ─── RANKINGS PREVIEW ─── */}
        <SectionWrapper className="section-padding bg-white">
          <div className="container-main">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="heading-2 mb-2">Top Engineering Colleges</h2>
                <p className="text-body">NIRF 2024 Engineering Rankings</p>
              </div>
              <Button
                asChild
                variant="ghost"
                className="hidden sm:inline-flex text-sm text-crimson hover:text-crimson-dark hover:bg-crimson-light"
              >
                <Link href="/rankings">
                  Full Rankings
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-16">
                        Rank
                      </th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        College
                      </th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                        City
                      </th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                        Type
                      </th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankings.engineering.slice(0, 5).map((row) => (
                      <tr
                        key={row.rank}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-slate-100 text-xs font-bold text-navy">
                            {row.rank}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <Link
                            href={`/colleges/${row.collegeId}`}
                            className="font-medium text-navy hover:text-crimson transition-colors"
                          >
                            {row.name}
                          </Link>
                        </td>
                        <td className="px-5 py-3.5 text-slate-500 hidden sm:table-cell">
                          {row.city}
                        </td>
                        <td className="px-5 py-3.5 hidden md:table-cell">
                          <span className="inline-flex px-2 py-0.5 text-[10px] font-medium rounded border bg-slate-50 text-slate-600 border-slate-200">
                            {row.type}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right font-semibold text-navy">
                          {row.score}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* ─── TESTIMONIALS ─── */}
        <SectionWrapper className="section-padding bg-slate-50">
          <div className="container-main">
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-3">What Students Say</h2>
              <p className="text-body max-w-xl mx-auto">
                Thousands of students have used Compare Degree to make smarter
                decisions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.slice(0, 3).map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <TestimonialCard testimonial={t} />
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ─── FINAL CTA ─── */}
        <section className="bg-crimson">
          <div className="container-main py-16 lg:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Ready to find your perfect college?
              </h2>
              <p className="text-crimson-100 text-base mb-8 max-w-lg mx-auto">
                Join 50,000+ students who made smarter decisions with Compare
                Degree.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  asChild
                  className="bg-white text-crimson hover:bg-slate-50 font-medium px-6 h-10 rounded-lg shadow-none"
                >
                  <Link href="/compare">
                    Start Comparing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-medium px-6 h-10 rounded-lg"
                >
                  <Link href="/colleges">Browse Colleges</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
