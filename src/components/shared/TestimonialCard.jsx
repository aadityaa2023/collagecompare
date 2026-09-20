"use client";

import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 h-full flex flex-col">
      <Quote className="h-6 w-6 text-crimson/20 mb-3" />
      <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-5">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <Avatar className="h-9 w-9 bg-crimson/10">
          <AvatarFallback className="text-xs font-semibold text-crimson bg-crimson-light">
            {testimonial.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium text-navy">{testimonial.name}</p>
          <p className="text-xs text-slate-500">
            {testimonial.course}, {testimonial.college}
          </p>
        </div>
      </div>
    </div>
  );
}
