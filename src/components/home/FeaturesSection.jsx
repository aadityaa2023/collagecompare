"use client";

import { motion } from "framer-motion";
import { IndianRupee, TrendingUp, Trophy, MessageSquare } from "lucide-react";
import SectionWrapper from "@/components/shared/SectionWrapper";

const defaultFeatures = [
  {
    icon: IndianRupee,
    title: "Compare Fees",
    description:
      "Side-by-side fee comparison across colleges. Know the exact cost of your degree before applying.",
  },
  {
    icon: TrendingUp,
    title: "Placement Data",
    description:
      "Real placement statistics — average packages, highest offers, placement percentages, and top recruiters.",
  },
  {
    icon: Trophy,
    title: "Rankings",
    description:
      "NIRF, NAAC, and institution-specific rankings consolidated in one comprehensive view.",
  },
  {
    icon: MessageSquare,
    title: "Campus & Reviews",
    description:
      "Student reviews, campus facility details, and real experiences to help you decide.",
  },
];

export default function FeaturesSection({ features = defaultFeatures }) {
  return (
    <SectionWrapper className="section-padding bg-white">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-3">Why Compare Degree?</h2>
          <p className="text-body max-w-2xl mx-auto">
            Everything you need to make an informed decision about your
            higher education, all in one place.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200"
            >
              <div className="h-10 w-10 rounded-lg bg-crimson-light flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-crimson" />
              </div>
              <h3 className="text-sm font-semibold text-navy mb-1.5">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
