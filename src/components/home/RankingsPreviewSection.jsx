import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { rankings } from "@/data/rankings";

export default function RankingsPreviewSection({
  rankingData = rankings.engineering,
}) {
  return (
    <SectionWrapper className="section-padding bg-white">
      <div className="container-main">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="heading-2 mb-2">Top Engineering Colleges</h2>
            <p className="text-body">NIRF 2024 Engineering Rankings</p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="hidden sm:inline-flex text-sm text-crimson hover:text-crimson-dark hover:bg-crimson-light"
          >
            <Link href="/rankings">
              Full Rankings
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-16">
                    Rank
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    College
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                    City
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                    Type
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {rankingData.slice(0, 5).map((row) => (
                  <tr
                    key={row.rank}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-slate-100 text-xs font-bold text-navy">
                        {row.rank}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/colleges/${row.collegeId}`}
                        className="font-medium text-navy hover:text-crimson transition-colors"
                      >
                        {row.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 hidden sm:table-cell">
                      {row.city}
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className="inline-flex px-2 py-0.5 text-[10px] font-medium rounded border bg-slate-50 text-slate-600 border-slate-200">
                        {row.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-semibold text-navy">
                      {row.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
