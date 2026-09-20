"use client";

import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { colleges, searchColleges } from "@/data/colleges";
import { courses, searchCourses } from "@/data/courses";
import Link from "next/link";

export default function SearchBar({ className = "", variant = "hero" }) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("colleges");
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    if (activeTab === "colleges") return searchColleges(query).slice(0, 5);
    return searchCourses(query).slice(0, 5);
  }, [query, activeTab]);

  const isHero = variant === "hero";

  return (
    <div className={`relative ${className}`}>
      {/* Tab Toggle */}
      <div className="flex gap-1 mb-2">
        {["colleges", "courses"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setQuery("");
            }}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize ${
              activeTab === tab
                ? "bg-crimson text-white"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div
        className={`relative flex items-center ${
          isHero
            ? "bg-white border border-slate-200 rounded-xl shadow-sm"
            : "bg-white border border-slate-200 rounded-lg"
        }`}
      >
        <Search
          className={`absolute left-3.5 text-slate-400 ${
            isHero ? "h-5 w-5" : "h-4 w-4"
          }`}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          placeholder={
            activeTab === "colleges"
              ? "Search colleges, e.g. IIT Bombay, VIT..."
              : "Search courses, e.g. B.Tech CSE, MBA..."
          }
          className={`w-full bg-transparent outline-none text-navy placeholder:text-slate-400 ${
            isHero
              ? "pl-11 pr-4 py-3.5 text-sm"
              : "pl-10 pr-4 py-2.5 text-sm"
          }`}
        />
      </div>

      {/* Dropdown Results */}
      {showResults && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {results.length > 0 ? (
            <ul>
              {results.map((item) => (
                <li key={item.id}>
                  <Link
                    href={
                      activeTab === "colleges"
                        ? `/colleges/${item.id}`
                        : `/courses/${item.id}`
                    }
                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                  >
                    <Search className="h-4 w-4 text-slate-400 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-navy">
                        {item.shortName || item.shortName}
                      </p>
                      {activeTab === "colleges" && (
                        <p className="text-xs text-slate-500">
                          {item.location?.city}, {item.location?.state}
                        </p>
                      )}
                      {activeTab === "courses" && (
                        <p className="text-xs text-slate-500">
                          {item.level} &middot; {item.duration}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-slate-500">
                No {activeTab} found for &ldquo;{query}&rdquo;
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
