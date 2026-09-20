"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  GraduationCap,
  Users,
  Star,
  Building2,
  IndianRupee,
  ExternalLink,
  ChevronRight,
  Check,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { colleges, getCollegeById, formatFees, formatPackage } from "@/data/colleges";

export default function CollegeDetailPage({ params }) {
  const { id } = use(params);
  const college = getCollegeById(id);

  if (!college) {
    notFound();
  }

  const typeColors = {
    IIT: "bg-amber-50 text-amber-700 border-amber-200",
    NIT: "bg-blue-50 text-blue-700 border-blue-200",
    Private: "bg-purple-50 text-purple-700 border-purple-200",
    Deemed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    State: "bg-cyan-50 text-cyan-700 border-cyan-200",
  };

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
                href="/colleges"
                className="hover:text-crimson transition-colors"
              >
                Colleges
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-navy font-medium">{college.shortName}</span>
            </div>
          </div>
        </div>

        {/* Hero Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="container-main py-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="h-16 w-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                <GraduationCap className="h-8 w-8 text-slate-400" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-navy">
                    {college.name}
                  </h1>
                  <span
                    className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-md border ${
                      typeColors[college.type]
                    }`}
                  >
                    {college.type}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {college.location.city}, {college.location.state}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Est. {college.established}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="h-3.5 w-3.5" />
                    NAAC {college.naacGrade}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-amber-500" />
                    {college.rating}/5 ({college.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="bg-crimson hover:bg-crimson-dark text-white font-medium px-5 h-9 text-sm rounded-lg shadow-none"
                  >
                    <Link href={`/compare?c1=${college.id}`}>
                      Compare This College
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="font-medium px-5 h-9 text-sm rounded-lg border-slate-300"
                  >
                    Save College
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white border-b border-slate-200">
          <div className="container-main py-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
              {[
                {
                  label: "NIRF Rank",
                  value: `#${college.nirfRanking}`,
                  icon: Trophy,
                  color: "text-amber-600",
                },
                {
                  label: "Avg Package",
                  value: formatPackage(college.avgPackage),
                  icon: IndianRupee,
                  color: "text-emerald-600",
                },
                {
                  label: "Highest Pkg",
                  value: formatPackage(college.highestPackage),
                  icon: TrendingUp,
                  color: "text-blue-600",
                },
                {
                  label: "Placement",
                  value: `${college.placementPercentage}%`,
                  icon: Briefcase,
                  color: "text-crimson",
                },
                {
                  label: "Students",
                  value:
                    college.totalStudents >= 1000
                      ? `${(college.totalStudents / 1000).toFixed(0)}K+`
                      : college.totalStudents,
                  icon: Users,
                  color: "text-purple-600",
                },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-lg bg-slate-50 flex items-center justify-center shrink-0`}
                  >
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                    <p className="text-sm font-semibold text-navy">
                      {stat.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="container-main py-8">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white border border-slate-200 rounded-lg p-1 h-auto flex-wrap">
              {[
                "Overview",
                "Courses & Fees",
                "Placements",
                "Rankings",
                "Campus",
                "Reviews",
              ].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLowerCase().replace(/ & /g, "-")}
                  className="text-xs sm:text-sm data-[state=active]:bg-crimson data-[state=active]:text-white rounded-md px-3 sm:px-4 py-1.5"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-base font-semibold text-navy mb-3">
                  About {college.shortName}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {college.about}
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-base font-semibold text-navy mb-4">
                  Key Highlights
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      label: "Established",
                      value: college.established,
                    },
                    {
                      label: "NAAC Grade",
                      value: college.naacGrade,
                    },
                    {
                      label: "NIRF Ranking",
                      value: `#${college.nirfRanking}`,
                    },
                    {
                      label: "Type",
                      value: college.type,
                    },
                    {
                      label: "Total Students",
                      value: college.totalStudents.toLocaleString(),
                    },
                    {
                      label: "Rating",
                      value: `${college.rating}/5`,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                    >
                      <span className="text-sm text-slate-500">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium text-navy">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-base font-semibold text-navy mb-3">
                  Entrance Exams
                </h2>
                <div className="flex flex-wrap gap-2">
                  {college.entranceExams.map((exam) => (
                    <Badge
                      key={exam}
                      variant="outline"
                      className="text-xs border-slate-200 text-slate-600"
                    >
                      {exam}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Courses & Fees Tab */}
            <TabsContent value="courses-fees">
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                          Course
                        </th>
                        <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                          Total Fees
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(college.fees).map(([course, fee]) => (
                        <tr
                          key={course}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="px-5 py-3.5 font-medium text-navy capitalize">
                            {course === "btech"
                              ? "B.Tech"
                              : course === "mtech"
                              ? "M.Tech"
                              : course.toUpperCase()}
                          </td>
                          <td className="px-5 py-3.5 text-right text-slate-600">
                            {formatFees(fee)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Placements Tab */}
            <TabsContent value="placements" className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    label: "Average Package",
                    value: formatPackage(college.avgPackage),
                  },
                  {
                    label: "Highest Package",
                    value: formatPackage(college.highestPackage),
                  },
                  {
                    label: "Placement Rate",
                    value: `${college.placementPercentage}%`,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white border border-slate-200 rounded-xl p-5 text-center"
                  >
                    <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-navy">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-base font-semibold text-navy mb-4">
                  Top Recruiters
                </h2>
                <div className="flex flex-wrap gap-2">
                  {college.topRecruiters.map((recruiter) => (
                    <div
                      key={recruiter}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-navy font-medium"
                    >
                      {recruiter}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Rankings Tab */}
            <TabsContent value="rankings">
              <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-sm text-slate-600">NIRF Ranking</span>
                  <span className="text-lg font-bold text-navy">
                    #{college.nirfRanking}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-sm text-slate-600">NAAC Grade</span>
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {college.naacGrade}
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-slate-600">Student Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-semibold text-navy">
                      {college.rating}/5
                    </span>
                    <span className="text-xs text-slate-500">
                      ({college.reviewCount})
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Campus Tab */}
            <TabsContent value="campus">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-base font-semibold text-navy mb-4">
                  Campus Facilities
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {college.facilities.map((facility) => (
                    <div
                      key={facility}
                      className="flex items-center gap-2 py-2"
                    >
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span className="text-sm text-slate-600">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-navy">
                      {college.rating}
                    </p>
                    <div className="flex gap-0.5 justify-center my-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(college.rating)
                              ? "text-amber-500 fill-amber-500"
                              : "text-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">
                      {college.reviewCount} reviews
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-500">
                  Detailed student reviews are being collected. Check back soon
                  for verified student experiences at {college.shortName}.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Trophy(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
