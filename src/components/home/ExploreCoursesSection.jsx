import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/shared/SectionWrapper";
import CourseCard from "@/components/shared/CourseCard";
import { courses } from "@/data/courses";

export default function ExploreCoursesSection({ courseList = courses }) {
  return (
    <SectionWrapper className="section-padding bg-white">
      <div className="container-main">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="heading-2 mb-2">Explore Courses</h2>
            <p className="text-body">
              Discover programs across engineering, management, science, and
              more.
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="hidden sm:inline-flex text-sm text-crimson hover:text-crimson-dark hover:bg-crimson-light"
          >
            <Link href="/courses">
              View all courses
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courseList.slice(0, 8).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
