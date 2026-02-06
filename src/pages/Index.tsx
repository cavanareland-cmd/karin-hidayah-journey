import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryGridSection from "@/components/CategoryGridSection";
import FeaturesSection from "@/components/FeaturesSection";
import ArrangementSection from "@/components/ArrangementSection";
import PrayerTimeSection from "@/components/PrayerTimeSection";
import HajjPackagesSection from "@/components/HajjPackagesSection";
import PricingSection from "@/components/PricingSection";
import HighlightsSection from "@/components/HighlightsSection";
import ExploreSection from "@/components/ExploreSection";
import FeaturedTourSection from "@/components/FeaturedTourSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero */}
        <HeroSection />

        {/* Category Grid (pengganti icon lama) */}
        <CategoryGridSection />

        {/* Features Umrah & Haji */}
        <FeaturesSection />

        {/* Arrangement */}
        <ArrangementSection />

        {/* Prayer Times */}
        <PrayerTimeSection />

        {/* Hajj & Umrah Packages */}
        <HajjPackagesSection />

        {/* Pricing */}
        <PricingSection />

        {/* Highlights */}
        <HighlightsSection />

        {/* Explore */}
        <ExploreSection />

        {/* Featured Tour */}
        <FeaturedTourSection />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
