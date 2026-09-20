"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Plus,
  X,
  Check,
  Minus,
  ChevronDown,
  GraduationCap,
  MapPin,
  Trophy,
  IndianRupee,
  TrendingUp,
  Users,
  Star,
  Building2,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { colleges, getCollegeById, formatFees, formatPackage } from "@/data/colleges";

function CollegeSelector({ selectedId, onSelect, excludeIds = [] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = colleges.filter((c) => !excludeIds.includes(c.id));
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.shortName.toLowerCase().includes(q) ||
          c.location.city.toLowerCase().includes(q)
      );
    }
    return result.slice(0, 8);
  }, [query, excludeIds]);

  const selected = selectedId ? getCollegeById(selectedId) : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {selected ? (
          <button className="w-full bg-white border border-slate-200 rounded-xl p-4 text-left hover:border-slate-300 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-crimson-light flex items-center justify-center shrink-0">
                <GraduationCap className="h-5 w-5 text-crimson" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-navy truncate">
                  {selected.shortName}
                </p>
                <p className="text-xs text-slate-500">
                  {selected.location.city}, {selected.location.state}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
            </div>
          </button>
        ) : (
          <button className="w-full border-2 border-dashed border-slate-300 rounded-xl p-6 hover:border-crimson/50 hover:bg-crimson-50 transition-colors flex flex-col items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
              <Plus className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-500">
              Select College
            </p>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-navy">
            Select a College
          </DialogTitle>
        </DialogHeader>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search colleges..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20"
            autoFocus
          />
        </div>
        <div className="max-h-64 overflow-y-auto -mx-1">
          {filtered.map((college) => (
            <button
              key={college.id}
              onClick={() => {
                onSelect(college.id);
                setOpen(false);
                setQuery("");
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                selectedId === college.id
                  ? "bg-crimson-light"
                  : "hover:bg-slate-50"
              }`}
            >
              <GraduationCap className="h-4 w-4 text-slate-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-navy truncate">
                  {college.shortName}
                </p>
                <p className="text-xs text-slate-500">
                  {college.location.city} &middot; {college.type} &middot; NIRF #
                  {college.nirfRanking}
                </p>
              </div>
              {selectedId === college.id && (
                <Check className="h-4 w-4 text-crimson shrink-0" />
              )}
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-6">
              No colleges found
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CompareRow({ label, values, type = "text", highlightBetter = null }) {
  const getBetterIdx =
    highlightBetter === "higher"
      ? () => {
          const nums = values.map((v) =>
            typeof v === "number" ? v : parseFloat(String(v).replace(/[^0-9.]/g, "")) || 0
          );
          const max = Math.max(...nums.filter(n => !isNaN(n)));
          return nums.indexOf(max);
        }
      : highlightBetter === "lower"
      ? () => {
          const nums = values.map((v) =>
            typeof v === "number" ? v : parseFloat(String(v).replace(/[^0-9.]/g, "")) || 0
          );
          const min = Math.min(...nums.filter(n => !isNaN(n) && n > 0));
          return nums.indexOf(min);
        }
      : null;

  const betterIdx = getBetterIdx ? getBetterIdx() : -1;

  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="px-5 py-3 text-sm text-slate-600 font-medium bg-slate-50/50 w-48 whitespace-nowrap">
        {label}
      </td>
      {values.map((val, i) => (
        <td
          key={i}
          className={`px-5 py-3 text-sm text-center ${
            betterIdx === i && values.length > 1
              ? "text-emerald-700 font-semibold bg-emerald-50/30"
              : "text-navy"
          }`}
        >
          {type === "check" ? (
            val ? (
              <Check className="h-4 w-4 text-emerald-500 mx-auto" />
            ) : (
              <Minus className="h-4 w-4 text-slate-300 mx-auto" />
            )
          ) : (
            val || "—"
          )}
        </td>
      ))}
    </tr>
  );
}

function CompareContent() {
  const searchParams = useSearchParams();
  const initialC1 = searchParams.get("c1") || "";
  const initialC2 = searchParams.get("c2") || "";

  const [selectedIds, setSelectedIds] = useState([
    initialC1,
    initialC2,
    "",
  ]);

  const setCollegeAt = useCallback((index, id) => {
    setSelectedIds((prev) => {
      const next = [...prev];
      next[index] = id;
      return next;
    });
  }, []);

  const removeCollegeAt = useCallback((index) => {
    setSelectedIds((prev) => {
      const next = [...prev];
      next[index] = "";
      return next;
    });
  }, []);

  const selectedColleges = selectedIds
    .map((id) => (id ? getCollegeById(id) : null))
    .filter(Boolean);

  const excludeIds = selectedIds.filter(Boolean);
  const hasComparison = selectedColleges.length >= 2;

  return (
    <main className="flex-1 bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-main py-6">
          <h1 className="heading-2 mb-1">Compare Colleges</h1>
          <p className="text-body-sm">
            Select colleges to compare side by side across fees, placements,
            rankings, and more.
          </p>
        </div>
      </div>

      <div className="container-main py-6">
        {/* College Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {selectedIds.map((id, i) => (
            <div key={i} className="relative">
              <CollegeSelector
                selectedId={id}
                onSelect={(newId) => setCollegeAt(i, newId)}
                excludeIds={excludeIds.filter((eid) => eid !== id)}
              />
              {id && (
                <button
                  onClick={() => removeCollegeAt(i)}
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors z-10"
                >
                  <X className="h-3 w-3 text-slate-600" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {hasComparison ? (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                {/* Sticky Header with college names */}
                <thead>
                  <tr className="bg-white border-b-2 border-slate-200">
                    <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase w-48 bg-slate-50">
                      Parameter
                    </th>
                    {selectedColleges.map((c) => (
                      <th key={c.id} className="px-5 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className="h-8 w-8 rounded-lg bg-crimson-light flex items-center justify-center">
                            <GraduationCap className="h-4 w-4 text-crimson" />
                          </div>
                          <span className="text-sm font-semibold text-navy">
                            {c.shortName}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {c.location.city}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {/* Basic Info */}
                  <tr>
                    <td
                      colSpan={selectedColleges.length + 1}
                      className="px-5 py-2.5 bg-crimson/5 text-xs font-bold text-crimson uppercase tracking-wider"
                    >
                      Basic Information
                    </td>
                  </tr>
                  <CompareRow
                    label="Type"
                    values={selectedColleges.map((c) => c.type)}
                  />
                  <CompareRow
                    label="Established"
                    values={selectedColleges.map((c) => c.established)}
                  />
                  <CompareRow
                    label="Location"
                    values={selectedColleges.map(
                      (c) => `${c.location.city}, ${c.location.state}`
                    )}
                  />
                  <CompareRow
                    label="NAAC Grade"
                    values={selectedColleges.map((c) => c.naacGrade)}
                  />
                  <CompareRow
                    label="Total Students"
                    values={selectedColleges.map((c) =>
                      c.totalStudents.toLocaleString()
                    )}
                    highlightBetter="higher"
                  />

                  {/* Fees */}
                  <tr>
                    <td
                      colSpan={selectedColleges.length + 1}
                      className="px-5 py-2.5 bg-crimson/5 text-xs font-bold text-crimson uppercase tracking-wider"
                    >
                      Fees
                    </td>
                  </tr>
                  <CompareRow
                    label="B.Tech Fees"
                    values={selectedColleges.map((c) =>
                      c.fees.btech ? formatFees(c.fees.btech) : "—"
                    )}
                    highlightBetter="lower"
                  />
                  <CompareRow
                    label="M.Tech Fees"
                    values={selectedColleges.map((c) =>
                      c.fees.mtech ? formatFees(c.fees.mtech) : "—"
                    )}
                    highlightBetter="lower"
                  />
                  <CompareRow
                    label="MBA Fees"
                    values={selectedColleges.map((c) =>
                      c.fees.mba ? formatFees(c.fees.mba) : "—"
                    )}
                    highlightBetter="lower"
                  />

                  {/* Placements */}
                  <tr>
                    <td
                      colSpan={selectedColleges.length + 1}
                      className="px-5 py-2.5 bg-crimson/5 text-xs font-bold text-crimson uppercase tracking-wider"
                    >
                      Placements
                    </td>
                  </tr>
                  <CompareRow
                    label="Avg Package"
                    values={selectedColleges.map((c) =>
                      formatPackage(c.avgPackage)
                    )}
                    highlightBetter="higher"
                  />
                  <CompareRow
                    label="Highest Package"
                    values={selectedColleges.map((c) =>
                      formatPackage(c.highestPackage)
                    )}
                    highlightBetter="higher"
                  />
                  <CompareRow
                    label="Placement %"
                    values={selectedColleges.map(
                      (c) => `${c.placementPercentage}%`
                    )}
                    highlightBetter="higher"
                  />
                  <CompareRow
                    label="Top Recruiters"
                    values={selectedColleges.map((c) =>
                      c.topRecruiters.slice(0, 4).join(", ")
                    )}
                  />

                  {/* Rankings */}
                  <tr>
                    <td
                      colSpan={selectedColleges.length + 1}
                      className="px-5 py-2.5 bg-crimson/5 text-xs font-bold text-crimson uppercase tracking-wider"
                    >
                      Rankings & Ratings
                    </td>
                  </tr>
                  <CompareRow
                    label="NIRF Ranking"
                    values={selectedColleges.map(
                      (c) => `#${c.nirfRanking}`
                    )}
                    highlightBetter="lower"
                  />
                  <CompareRow
                    label="Student Rating"
                    values={selectedColleges.map((c) => `${c.rating}/5`)}
                    highlightBetter="higher"
                  />
                  <CompareRow
                    label="Reviews"
                    values={selectedColleges.map((c) =>
                      c.reviewCount.toLocaleString()
                    )}
                    highlightBetter="higher"
                  />

                  {/* Courses */}
                  <tr>
                    <td
                      colSpan={selectedColleges.length + 1}
                      className="px-5 py-2.5 bg-crimson/5 text-xs font-bold text-crimson uppercase tracking-wider"
                    >
                      Courses Offered
                    </td>
                  </tr>
                  {[
                    "B.Tech",
                    "M.Tech",
                    "MBA",
                    "MCA",
                    "B.Sc",
                    "M.Sc",
                    "B.Arch",
                    "B.Pharm",
                    "LLB",
                    "Ph.D",
                  ].map((course) => (
                    <CompareRow
                      key={course}
                      label={course}
                      values={selectedColleges.map((c) =>
                        c.coursesOffered.includes(course)
                      )}
                      type="check"
                    />
                  ))}

                  {/* Eligibility */}
                  <tr>
                    <td
                      colSpan={selectedColleges.length + 1}
                      className="px-5 py-2.5 bg-crimson/5 text-xs font-bold text-crimson uppercase tracking-wider"
                    >
                      Eligibility
                    </td>
                  </tr>
                  <CompareRow
                    label="Entrance Exams"
                    values={selectedColleges.map((c) =>
                      c.entranceExams.join(", ")
                    )}
                  />

                  {/* Campus Facilities */}
                  <tr>
                    <td
                      colSpan={selectedColleges.length + 1}
                      className="px-5 py-2.5 bg-crimson/5 text-xs font-bold text-crimson uppercase tracking-wider"
                    >
                      Campus Facilities
                    </td>
                  </tr>
                  {[
                    "Central Library",
                    "Sports Complex",
                    "Swimming Pool",
                    "Hospital",
                    "Wi-Fi Campus",
                    "Hostels",
                    "Research Labs",
                    "Innovation Center",
                    "Cafeteria",
                    "Auditorium",
                  ].map((facility) => (
                    <CompareRow
                      key={facility}
                      label={facility}
                      values={selectedColleges.map((c) =>
                        c.facilities.includes(facility)
                      )}
                      type="check"
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-base font-semibold text-navy mb-2">
              Select Colleges to Compare
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Choose at least two colleges above to see a detailed side-by-side
              comparison of fees, placements, rankings, and more.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ComparePage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <main className="flex-1 bg-slate-50">
            <div className="container-main py-12 text-center">
              <p className="text-sm text-slate-500">Loading...</p>
            </div>
          </main>
        }
      >
        <CompareContent />
      </Suspense>
      <Footer />
    </>
  );
}
