"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/shared/SectionWrapper";
import TestimonialCard from "@/components/shared/TestimonialCard";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection({
  testimonialList = testimonials,
}) {
  return (
    <SectionWrapper className="section-padding bg-slate-50">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-3">What Students Say</h2>
          <p className="text-body max-w-xl mx-auto">
            Thousands of students have used Compare Degree to make smarter
            decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {testimonialList.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06, duration: 0.35, ease: "easeOut" }}
              className="transform-gpu"
            >
              <TestimonialCard testimonial={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
