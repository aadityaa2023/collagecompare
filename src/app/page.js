import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  HeroSection,
  PopularComparisonsSection,
  FeaturesSection,
  ExploreCoursesSection,
  RankingsPreviewSection,
  HowItWorksSection,
  TestimonialsSection,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <PopularComparisonsSection />
        <FeaturesSection />
        <ExploreCoursesSection />
        <RankingsPreviewSection />
        <HowItWorksSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
