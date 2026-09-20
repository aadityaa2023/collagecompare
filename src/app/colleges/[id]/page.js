"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
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
        {/* Campus Cover Banner */}
        <div className="relative min-h-[260px] sm:min-h-[300px] w-full bg-slate-900 overflow-hidden flex flex-col justify-between">
          <Image
            src={college.campus || "/campus-placeholder.jpg"}
            alt={college.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-black/30" />

          {/* Breadcrumb over banner */}
          <div className="container-main pt-4 relative z-10">
            <div className="flex items-center gap-1.5 text-xs text-white/70">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link
                href="/colleges"
                className="hover:text-white transition-colors"
              >
                Colleges
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white font-medium">{college.shortName}</span>
            </div>
          </div>

          {/* Hero Header Content */}
          <div className="container-main pb-6 pt-10 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  <span
                    className={`inline-flex px-2.5 py-0.5 text-xs font-bold rounded-md border shadow-xs ${
                      typeColors[college.type] || "bg-white/90 text-navy"
                    }`}
                  >
                    {college.type}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                    <Award className="h-3.5 w-3.5 text-amber-300" />
                    NIRF #{college.nirfRanking}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                    NAAC {college.naacGrade}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">
                  {college.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200 mt-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-crimson" />
                    {college.location.city}, {college.location.state}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-300" />
                    Est. {college.established}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    {college.rating}/5 ({college.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Button
                  asChild
                  className="bg-crimson hover:bg-crimson-dark text-white font-semibold px-5 h-10 text-sm rounded-xl shadow-md transition-all"
                >
                  <Link href={`/compare?c1=${college.id}`}>
                    Compare This College
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="font-medium px-4 h-10 text-sm rounded-xl bg-white/90 backdrop-blur-md text-navy hover:bg-white border-0"
                >
                  Save College
                </Button>
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
            <TabsContent value="campus" className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="h-64 sm:h-80 relative overflow-hidden bg-slate-900">
                  <Image
                    src={college.campus || "/campus-placeholder.jpg"}
                    alt={`${college.name} Campus`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1200px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md mb-2 inline-block">
                      Campus Infrastructure & Life
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold">
                      {college.shortName} Campus
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 mt-1 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-crimson" />
                      {college.location.city}, {college.location.state} &middot; Est. {college.established}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-base font-bold text-navy mb-4">
                    Campus Facilities & Amenities
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {college.facilities.map((facility) => (
                      <div
                        key={facility}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70"
                      >
                        <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span className="text-sm text-slate-700 font-semibold">
                          {facility}
                        </span>
                      </div>
                    ))}
                  </div>
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
