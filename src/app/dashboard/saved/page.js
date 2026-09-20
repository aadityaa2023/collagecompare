"use client";

import { useState } from "react";
import Link from "next/link";
import { BookmarkX, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CollegeCard from "@/components/shared/CollegeCard";
import { colleges } from "@/data/colleges";

export default function SavedCollegesPage() {
  const [savedList, setSavedList] = useState(colleges.slice(0, 6));

  const removeCollege = (id) => {
    setSavedList((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="container-main py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="heading-2 mb-1">Saved Colleges</h1>
                <p className="text-body-sm">
                  {savedList.length} college{savedList.length !== 1 ? "s" : ""}{" "}
                  saved
                </p>
              </div>
              {savedList.length >= 2 && (
                <Button
                  asChild
                  className="bg-crimson hover:bg-crimson-dark text-white font-medium px-5 h-9 text-sm rounded-lg shadow-none"
                >
                  <Link href="/compare">
                    Compare Selected
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="container-main py-6">
          {savedList.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedList.map((college) => (
                <div key={college.id} className="relative group">
                  <CollegeCard college={college} />
                  <button
                    onClick={() => removeCollege(college.id)}
                    className="absolute top-3 right-3 h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:border-red-200 z-10"
                    title="Remove from saved"
                  >
                    <BookmarkX className="h-4 w-4 text-slate-400 hover:text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
              <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-slate-300" />
              </div>
              <h3 className="text-base font-semibold text-navy mb-2">
                No Saved Colleges
              </h3>
              <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
                Start exploring colleges and save the ones you&apos;re interested in
                to compare later.
              </p>
              <Button
                asChild
                className="bg-crimson hover:bg-crimson-dark text-white font-medium px-6 h-10 rounded-lg shadow-none"
              >
                <Link href="/colleges">
                  Explore Colleges
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
