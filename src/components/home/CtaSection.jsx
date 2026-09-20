"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="bg-crimson">
      <div className="container-main py-16 lg:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to find your perfect college?
          </h2>
          <p className="text-crimson-100 text-base mb-8 max-w-lg mx-auto">
            Join 50,000+ students who made smarter decisions with Compare
            Degree.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              asChild
              className="bg-white text-crimson hover:bg-slate-50 font-medium px-6 h-10 rounded-lg shadow-none"
            >
              <Link href="/compare">
                Start Comparing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-medium px-6 h-10 rounded-lg"
            >
              <Link href="/colleges">Browse Colleges</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
