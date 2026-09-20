"use client";

import Link from "next/link";
import {
  BookmarkCheck,
  BarChart3,
  GraduationCap,
  ArrowRight,
  ChevronRight,
  Clock,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CollegeCard from "@/components/shared/CollegeCard";
import { colleges } from "@/data/colleges";

const savedColleges = colleges.slice(0, 4);
const recentComparisons = [
  {
    id: 1,
    colleges: ["IIT Bombay", "IIT Delhi"],
    date: "2 hours ago",
  },
  {
    id: 2,
    colleges: ["VIT Vellore", "SRM Chennai"],
    date: "Yesterday",
  },
  {
    id: 3,
    colleges: ["NIT Trichy", "BITS Pilani", "IIIT Hyderabad"],
    date: "3 days ago",
  },
];

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="container-main py-6">
            <h1 className="heading-2 mb-1">Welcome back, Student</h1>
            <p className="text-body-sm">
              Track your college research and saved comparisons.
            </p>
          </div>
        </div>

        <div className="container-main py-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Saved Colleges",
                value: savedColleges.length,
                icon: BookmarkCheck,
                color: "text-crimson",
                bg: "bg-crimson-light",
              },
              {
                label: "Comparisons",
                value: recentComparisons.length,
                icon: BarChart3,
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                label: "Courses Viewed",
                value: 8,
                icon: GraduationCap,
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
              {
                label: "Time Saved",
                value: "12 hrs",
                icon: Clock,
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-3"
              >
                <div
                  className={`h-10 w-10 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xl font-bold text-navy">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Comparisons */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-navy">
                Recent Comparisons
              </h2>
              <Link
                href="/compare"
                className="text-xs font-medium text-crimson hover:underline flex items-center gap-0.5"
              >
                New Comparison
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentComparisons.map((comp) => (
                <div
                  key={comp.id}
                  className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy">
                        {comp.colleges.join(" vs ")}
                      </p>
                      <p className="text-xs text-slate-500">{comp.date}</p>
                    </div>
                  </div>
                  <Link
                    href="/compare"
                    className="text-xs font-medium text-crimson hover:underline"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Colleges */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-navy">
                Saved Colleges
              </h2>
              <Link
                href="/dashboard/saved"
                className="text-xs font-medium text-crimson hover:underline flex items-center gap-0.5"
              >
                View all
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {savedColleges.map((college) => (
                <CollegeCard key={college.id} college={college} compact />
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div>
            <h2 className="text-base font-semibold text-navy mb-4">
              Recommended for You
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {colleges.slice(4, 8).map((college) => (
                <CollegeCard key={college.id} college={college} compact />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
