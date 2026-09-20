"use client";

import Link from "next/link";
import { Clock, GraduationCap, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CourseCard({ course }) {
  return (
    <Link href={`/courses/${course.id}`} className="group block">
      <div className="bg-white border border-slate-200 rounded-xl p-5 transition-all duration-200 hover:shadow-md hover:border-slate-300 h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="h-10 w-10 rounded-lg bg-crimson-light flex items-center justify-center shrink-0">
            <GraduationCap className="h-5 w-5 text-crimson" />
          </div>
          <Badge
            variant="outline"
            className={`text-[10px] font-medium ${
              course.level === "UG"
                ? "border-blue-200 text-blue-600 bg-blue-50"
                : "border-purple-200 text-purple-600 bg-purple-50"
            }`}
          >
            {course.level}
          </Badge>
        </div>

        <h3 className="text-sm font-semibold text-navy leading-snug group-hover:text-crimson transition-colors mb-1.5">
          {course.shortName}
        </h3>

        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {course.description}
        </p>

        <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="h-3 w-3" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <IndianRupee className="h-3 w-3" />
            {(course.avgFees / 100000).toFixed(1)}L avg
          </div>
        </div>
      </div>
    </Link>
  );
}
