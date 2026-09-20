import SectionWrapper from "@/components/shared/SectionWrapper";

const defaultStats = [
  { value: "500+", label: "Colleges" },
  { value: "200+", label: "Courses" },
  { value: "50,000+", label: "Students Helped" },
  { value: "100+", label: "Rankings Tracked" },
];

export default function StatsSection({ stats = defaultStats }) {
  return (
    <SectionWrapper className="bg-slate-50 border-y border-slate-100">
      <div className="container-main py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-crimson mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
