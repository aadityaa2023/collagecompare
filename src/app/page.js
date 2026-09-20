import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  HeroSection,
  PopularComparisonsSection,
  FeaturesSection,
  ExploreCoursesSection,
  HowItWorksSection,
  TestimonialsSection,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full">
        <HeroSection />
        <PopularComparisonsSection />
        <FeaturesSection />
        <ExploreCoursesSection />
        <HowItWorksSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
