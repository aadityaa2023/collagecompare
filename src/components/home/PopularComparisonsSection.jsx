"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { School, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { colleges } from "@/data/colleges";

const defaultComparisons = [
  {
    college1: colleges.find((c) => c.id === "iit-bombay"),
    college2: colleges.find((c) => c.id === "iit-delhi"),
  },
  {
    college1: colleges.find((c) => c.id === "vit-vellore"),
    college2: colleges.find((c) => c.id === "srm-chennai"),
  },
  {
    college1: colleges.find((c) => c.id === "nit-trichy"),
    college2: colleges.find((c) => c.id === "bits-pilani"),
  },
];

export default function PopularComparisonsSection({
  comparisons = defaultComparisons,
}) {
  return (
    <SectionWrapper className="section-padding bg-slate-50">
      <div className="container-main">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="heading-2 mb-2">Popular Comparisons</h2>
            <p className="text-body">
              See how top colleges stack up against each other.
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="hidden sm:inline-flex text-sm text-crimson hover:text-crimson-dark hover:bg-crimson-light"
          >
            <Link href="/compare">
              View all
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {comparisons.map(({ college1, college2 }, i) => {
            if (!college1 || !college2) return null;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/compare?c1=${college1.id}&c2=${college2.id}`}
                  className="group block"
                >
                  <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1 text-center">
                        <div className="h-10 w-10 mx-auto rounded-lg bg-amber-50 flex items-center justify-center border border-amber-100 mb-2">
                          <School className="h-5 w-5 text-amber-600" />
                        </div>
                        <p className="text-xs font-semibold text-navy">
                          {college1.shortName}
                        </p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-crimson/10 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-crimson">
                          VS
                        </span>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="h-10 w-10 mx-auto rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 mb-2">
                          <School className="h-5 w-5 text-blue-600" />
                        </div>
                        <p className="text-xs font-semibold text-navy">
                          {college2.shortName}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-slate-100">
                      <div>
                        <p className="text-[10px] text-slate-400 mb-0.5">
                          Avg Pkg
                        </p>
                        <p className="text-xs font-semibold text-navy">
                          {college1.avgPackage} vs {college2.avgPackage} LPA
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 mb-0.5">
                          Placed
                        </p>
                        <p className="text-xs font-semibold text-navy">
                          {college1.placementPercentage}% vs{" "}
                          {college2.placementPercentage}%
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 mb-0.5">
                          NIRF
                        </p>
                        <p className="text-xs font-semibold text-navy">
                          #{college1.nirfRanking} vs #{college2.nirfRanking}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 text-center">
                      <span className="text-xs font-medium text-crimson group-hover:underline">
                        Compare Now
                        <ChevronRight className="inline h-3 w-3 ml-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
