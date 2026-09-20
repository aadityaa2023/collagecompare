"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  GraduationCap,
  IndianRupee,
  BookOpen,
  ChevronRight,
  Briefcase,
  FileText,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CollegeCard from "@/components/shared/CollegeCard";
import { getCourseById } from "@/data/courses";
import { getCollegeById } from "@/data/colleges";

export default function CourseDetailPage({ params }) {
  const { id } = use(params);
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  const topColleges = course.topColleges
    .map((cid) => getCollegeById(cid))
    .filter(Boolean);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200">
          <div className="container-main py-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Link href="/" className="hover:text-crimson transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link
                href="/courses"
                className="hover:text-crimson transition-colors"
              >
                Courses
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-navy font-medium">{course.shortName}</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-white border-b border-slate-200">
          <div className="container-main py-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-crimson-light flex items-center justify-center shrink-0">
                <GraduationCap className="h-6 w-6 text-crimson" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-navy mb-2">
                  {course.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      course.level === "UG"
                        ? "border-blue-200 text-blue-600 bg-blue-50"
                        : "border-purple-200 text-purple-600 bg-purple-50"
                    }`}
                  >
                    {course.level === "UG" ? "Undergraduate" : "Postgraduate"}
                  </Badge>
                  <span className="flex items-center gap-1 text-sm text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-slate-500">
                    <IndianRupee className="h-3.5 w-3.5" />
                    {(course.avgFees / 100000).toFixed(1)}L avg fees
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-main py-8 space-y-6">
          {/* About */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-base font-semibold text-navy mb-3">
              About {course.shortName}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Key Info Grid */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-crimson" />
                <h3 className="text-sm font-semibold text-navy">
                  Entrance Exams
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {course.eligibilityExams.map((exam) => (
                  <Badge
                    key={exam}
                    variant="outline"
                    className="text-[10px] border-slate-200 text-slate-600"
                  >
                    {exam}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-crimson" />
                <h3 className="text-sm font-semibold text-navy">
                  Key Subjects
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {course.subjects.slice(0, 6).map((subject) => (
                  <Badge
                    key={subject}
                    variant="secondary"
                    className="text-[10px]"
                  >
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="h-4 w-4 text-crimson" />
                <h3 className="text-sm font-semibold text-navy">
                  Career Paths
                </h3>
              </div>
              <ul className="space-y-1.5">
                {course.careers.map((career) => (
                  <li
                    key={career}
                    className="text-xs text-slate-600 flex items-center gap-1.5"
                  >
                    <ChevronRight className="h-3 w-3 text-slate-400" />
                    {career}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Top Colleges */}
          {topColleges.length > 0 && (
            <div>
              <h2 className="heading-3 mb-4">
                Top Colleges for {course.shortName}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topColleges.map((college) => (
                  <CollegeCard key={college.id} college={college} compact />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
