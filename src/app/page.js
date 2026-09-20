import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  HeroSection,
  FeaturesSection,
  PopularComparisonsSection,
  ExploreCoursesSection,
  HowItWorksSection,
  RankingsPreviewSection,
  TestimonialsSection,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <PopularComparisonsSection />
        <ExploreCoursesSection />
        <HowItWorksSection />
        <RankingsPreviewSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
