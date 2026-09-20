"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, TrendingUp, Trophy, Star, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatFees, formatPackage } from "@/data/colleges";

const typeColors = {
  IIT: "bg-amber-50 text-amber-700 border-amber-200",
  NIT: "bg-blue-50 text-blue-700 border-blue-200",
  Private: "bg-purple-50 text-purple-700 border-purple-200",
  Deemed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  State: "bg-cyan-50 text-cyan-700 border-cyan-200",
};

export default function CollegeCard({ college, compact = false }) {
  return (
    <Link href={`/colleges/${college.id}`} className="group block">
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-crimson/30 hover:-translate-y-1 h-full flex flex-col">
        {/* Image / Header */}
        {!compact && (
          <div className="h-36 relative overflow-hidden bg-slate-100">
            <Image
              src="/campus-placeholder.jpg"
              alt="Campus"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute top-3 left-3">
              <span
                className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border shadow-sm ${
                  typeColors[college.type] || typeColors.Private
                }`}
              >
                {college.type}
              </span>
            </div>
            {college.nirfRanking <= 10 && (
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md rounded-md px-2 py-0.5 flex items-center gap-1 shadow-sm">
                <Trophy className="h-3 w-3 text-amber-500" />
                <span className="text-xs font-semibold text-slate-700">
                  #{college.nirfRanking}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start gap-3 mb-2">
            {compact && (
              <span
                className={`shrink-0 inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded border ${
                  typeColors[college.type] || typeColors.Private
                }`}
              >
                {college.type}
              </span>
            )}
          </div>

          <h3 className="text-sm font-semibold text-navy leading-snug group-hover:text-crimson transition-colors line-clamp-2 mb-1">
            {college.shortName}
          </h3>

          <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
            <MapPin className="h-3 w-3 shrink-0" />
            {college.location.city}, {college.location.state}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">
                Rank
              </p>
              <p className="text-sm font-semibold text-navy">
                #{college.nirfRanking}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">
                Placed
              </p>
              <p className="text-sm font-semibold text-navy">
                {college.placementPercentage}%
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">
                Avg Pkg
              </p>
              <p className="text-sm font-semibold text-navy">
                {formatPackage(college.avgPackage)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
