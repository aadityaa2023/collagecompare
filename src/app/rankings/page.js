"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trophy, ChevronRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { rankings, rankingCategories } from "@/data/rankings";
import { getCollegeById } from "@/data/colleges";

const typeColors = {
  IIT: "bg-amber-50 text-amber-700 border-amber-200",
  NIT: "bg-blue-50 text-blue-700 border-blue-200",
  Private: "bg-purple-50 text-purple-700 border-purple-200",
  Deemed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  State: "bg-cyan-50 text-cyan-700 border-cyan-200",
};

export default function RankingsPage() {
  const [activeCategory, setActiveCategory] = useState("engineering");

  const data = rankings[activeCategory] || [];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="container-main py-6">
            <h1 className="heading-2 mb-1">College Rankings</h1>
            <p className="text-body-sm">
              NIRF 2024 rankings across engineering, management, and overall
              categories.
            </p>
          </div>
        </div>

        <div className="container-main py-6">
          {/* Category Tabs */}
          <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1 mb-6 w-fit">
            {rankingCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeCategory === cat.id
                    ? "bg-crimson text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Rankings Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-20">
                      Rank
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      College
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                      City
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                      Type
                    </th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-24">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr
                      key={row.rank}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-bold ${
                            row.rank <= 3
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-slate-100 text-navy"
                          }`}
                        >
                          {row.rank}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 relative rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200 shadow-2xs">
                            <Image
                              src={getCollegeById(row.collegeId)?.campus || "/campus-placeholder.jpg"}
                              alt={row.name}
                              fill
                              sizes="36px"
                              className="object-cover"
                            />
                          </div>
                          <Link
                            href={`/colleges/${row.collegeId}`}
                            className="font-medium text-navy hover:text-crimson transition-colors"
                          >
                            {row.name}
                          </Link>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-500 hidden sm:table-cell">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {row.city}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span
                          className={`inline-flex px-2 py-0.5 text-[10px] font-medium rounded-md border ${
                            typeColors[row.type] || ""
                          }`}
                        >
                          {row.type}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="font-semibold text-navy">
                          {row.score}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/colleges/${row.collegeId}`}
                          className="text-xs font-medium text-crimson hover:underline"
                        >
                          View
                          <ChevronRight className="inline h-3 w-3 ml-0.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
