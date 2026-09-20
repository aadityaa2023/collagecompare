"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Trophy, ArrowRight, Award, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { rankings } from "@/data/rankings";
import { getCollegeById } from "@/data/colleges";

export default function RankingsPreviewSection() {
  const [activeCategory, setActiveCategory] = useState("engineering");
  const rankingData = rankings[activeCategory] || rankings.engineering;

  return (
    <SectionWrapper className="section-padding bg-slate-50/70 relative">
      <div className="container-main">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-3 border border-amber-200/70">
              <Trophy className="h-3.5 w-3.5 text-amber-600" />
              <span>Official NIRF 2024 Rankings</span>
            </div>
            <h2 className="heading-2 mb-2">India&apos;s Top Ranked Institutions</h2>
            <p className="text-body max-w-xl">
              National Institutional Ranking Framework (NIRF) official scores evaluating teaching, research, and graduation outcomes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Category Toggle */}
            <div className="flex bg-slate-200/70 p-1 rounded-xl">
              <button
                onClick={() => setActiveCategory("engineering")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeCategory === "engineering"
                    ? "bg-white text-navy shadow-sm"
                    : "text-slate-600 hover:text-navy"
                }`}
              >
                Engineering
              </button>
              <button
                onClick={() => setActiveCategory("management")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeCategory === "management"
                    ? "bg-white text-navy shadow-sm"
                    : "text-slate-600 hover:text-navy"
                }`}
              >
                Management
              </button>
            </div>

            <Button
              asChild
              variant="outline"
              className="border-slate-200 hover:border-slate-300 text-slate-700 hover:text-navy bg-white shadow-xs font-semibold text-sm rounded-xl px-4 h-10 hidden sm:inline-flex"
            >
              <Link href="/rankings">
                Full Rankings
                <ChevronRight className="ml-1 h-4 w-4 text-slate-400" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Rankings Table Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200/80 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4 w-24">Rank</th>
                  <th className="px-6 py-4">Institution</th>
                  <th className="px-6 py-4 hidden sm:table-cell">Location</th>
                  <th className="px-6 py-4 hidden md:table-cell">Type</th>
                  <th className="px-6 py-4 w-44">NIRF Score</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 transition-opacity duration-200">
                {rankingData.slice(0, 5).map((row) => {
                  const isFirst = row.rank === 1;
                  const isSecond = row.rank === 2;
                  const isThird = row.rank === 3;

                  return (
                    <tr
                      key={row.collegeId + "-" + activeCategory}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      {/* Rank Badge */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isFirst ? (
                          <span className="inline-flex items-center justify-center h-8 w-11 rounded-lg bg-amber-50 text-amber-800 font-extrabold text-xs border border-amber-300/80 shadow-2xs">
                            #1
                          </span>
                        ) : isSecond ? (
                          <span className="inline-flex items-center justify-center h-8 w-11 rounded-lg bg-slate-100 text-slate-800 font-extrabold text-xs border border-slate-300 shadow-2xs">
                            #2
                          </span>
                        ) : isThird ? (
                          <span className="inline-flex items-center justify-center h-8 w-11 rounded-lg bg-orange-50 text-orange-800 font-extrabold text-xs border border-orange-200 shadow-2xs">
                            #3
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center h-8 w-11 rounded-lg bg-slate-100 text-slate-600 font-bold text-xs">
                            #{row.rank}
                          </span>
                        )}
                      </td>

                      {/* College Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 relative rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80 shadow-2xs">
                            <Image
                              src={getCollegeById(row.collegeId)?.campus || "/campus-placeholder.jpg"}
                              alt={row.name}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <Link
                              href={`/colleges/${row.collegeId}`}
                              className="font-bold text-navy group-hover:text-crimson transition-colors block text-sm sm:text-base truncate"
                            >
                              {row.name}
                            </Link>
                            <span className="sm:hidden text-xs text-slate-400 block mt-0.5 truncate">
                              {row.city} &middot; {row.type}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* City */}
                      <td className="px-6 py-4 text-slate-600 font-medium hidden sm:table-cell">
                        {row.city}
                      </td>

                      {/* Type */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="inline-flex px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 text-slate-700 border border-slate-200/60">
                          {row.type}
                        </span>
                      </td>

                      {/* Score Visualization Bar */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-navy text-xs min-w-[36px]">
                            {row.score}
                          </span>
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden hidden lg:block">
                            <div
                              className="bg-gradient-to-r from-crimson to-amber-500 h-full rounded-full"
                              style={{ width: `${(row.score / 100) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/colleges/${row.collegeId}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-navy px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            Profile
                            <ArrowUpRight className="h-3 w-3" />
                          </Link>
                          <Link
                            href={`/compare?c1=iit-bombay&c2=${row.collegeId}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-crimson hover:text-crimson-dark px-2.5 py-1 rounded-lg hover:bg-crimson-light transition-colors"
                          >
                            Compare
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center sm:hidden">
            <Button asChild variant="outline" className="w-full text-xs font-semibold">
              <Link href="/rankings">View Full NIRF Rankings</Link>
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
