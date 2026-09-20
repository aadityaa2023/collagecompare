"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CollegeCard from "@/components/shared/CollegeCard";
import { colleges } from "@/data/colleges";

const collegeTypes = ["All", "IIT", "NIT", "Private", "Deemed", "State"];
const states = [
  "All",
  ...new Set(colleges.map((c) => c.location.state)),
].sort();
const sortOptions = [
  { value: "ranking", label: "NIRF Ranking" },
  { value: "fees-low", label: "Fees: Low to High" },
  { value: "fees-high", label: "Fees: High to Low" },
  { value: "placement", label: "Placement %" },
  { value: "package", label: "Avg Package" },
];

function FilterPanel({ type, setType, state, setState }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-navy mb-3">College Type</h3>
        <div className="flex flex-wrap gap-2">
          {collegeTypes.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                type === t
                  ? "bg-crimson text-white border-crimson"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-navy mb-3">State</h3>
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
          {states.map((s) => (
            <button
              key={s}
              onClick={() => setState(s)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                state === s
                  ? "bg-crimson text-white border-crimson"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CollegesPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [state, setState] = useState("All");
  const [sort, setSort] = useState("ranking");

  const activeFilters = [];
  if (type !== "All") activeFilters.push({ key: "type", label: type });
  if (state !== "All") activeFilters.push({ key: "state", label: state });

  const filtered = useMemo(() => {
    let result = [...colleges];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.shortName.toLowerCase().includes(q) ||
          c.location.city.toLowerCase().includes(q)
      );
    }

    if (type !== "All") {
      result = result.filter((c) => c.type === type);
    }

    if (state !== "All") {
      result = result.filter((c) => c.location.state === state);
    }

    switch (sort) {
      case "ranking":
        result.sort((a, b) => a.nirfRanking - b.nirfRanking);
        break;
      case "fees-low":
        result.sort((a, b) => (a.fees.btech || 0) - (b.fees.btech || 0));
        break;
      case "fees-high":
        result.sort((a, b) => (b.fees.btech || 0) - (a.fees.btech || 0));
        break;
      case "placement":
        result.sort(
          (a, b) => b.placementPercentage - a.placementPercentage
        );
        break;
      case "package":
        result.sort((a, b) => b.avgPackage - a.avgPackage);
        break;
    }

    return result;
  }, [query, type, state, sort]);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="container-main py-6">
            <h1 className="heading-2 mb-1">Explore Colleges</h1>
            <p className="text-body-sm">
              Browse and compare {colleges.length}+ colleges across India
            </p>
          </div>
        </div>

        <div className="container-main py-6">
          {/* Search & Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search colleges..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/20 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm bg-white border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-crimson/50 text-slate-600"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* Mobile filter trigger */}
              <Sheet>
                <SheetTrigger className="lg:hidden inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                  {activeFilters.length > 0 && (
                    <span className="h-5 w-5 rounded-full bg-crimson text-white text-[10px] font-bold flex items-center justify-center">
                      {activeFilters.length}
                    </span>
                  )}
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] p-6">
                  <SheetTitle className="text-base font-semibold text-navy mb-6">
                    Filters
                  </SheetTitle>
                  <FilterPanel
                    type={type}
                    setType={setType}
                    state={state}
                    setState={setState}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilters.map((f) => (
                <Badge
                  key={f.key}
                  variant="secondary"
                  className="gap-1 pl-2.5 pr-1.5 py-1 text-xs bg-crimson-light text-crimson border-0"
                >
                  {f.label}
                  <button
                    onClick={() =>
                      f.key === "type" ? setType("All") : setState("All")
                    }
                    className="hover:bg-crimson/10 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <button
                onClick={() => {
                  setType("All");
                  setState("All");
                }}
                className="text-xs text-slate-500 hover:text-crimson transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

          <div className="flex gap-6">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-60 shrink-0">
              <div className="bg-white border border-slate-200 rounded-xl p-5 sticky top-20">
                <h3 className="text-sm font-semibold text-navy mb-4">
                  Filters
                </h3>
                <FilterPanel
                  type={type}
                  setType={setType}
                  state={state}
                  setState={setState}
                />
              </div>
            </aside>

            {/* Results Grid */}
            <div className="flex-1">
              <p className="text-xs text-slate-500 mb-4">
                {filtered.length} college{filtered.length !== 1 ? "s" : ""}{" "}
                found
              </p>
              {filtered.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filtered.map((college) => (
                    <CollegeCard key={college.id} college={college} />
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                  <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-navy mb-1">
                    No colleges found
                  </p>
                  <p className="text-xs text-slate-500">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
