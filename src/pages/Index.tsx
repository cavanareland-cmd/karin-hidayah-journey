import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServiceIconsSection from "@/components/ServiceIconsSection";
import ArrangementSection from "@/components/ArrangementSection";
import PrayerTimeSection from "@/components/PrayerTimeSection";
import HajjPackagesSection from "@/components/HajjPackagesSection";
import HighlightsSection from "@/components/HighlightsSection";
import ExploreSection from "@/components/ExploreSection";
import FeaturedTourSection from "@/components/FeaturedTourSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CategoryGridSection from "@/components/CategoryGridSection";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
<main>
  {/* Hero Section */}
  <HeroSection />
  
{false && <ServiceIconsSection />}


  {/* Category Grid (Flowbite-style) */}
  <CategoryGridSection />
  
  {/* Arrangement Section */}
  <ArrangementSection />
  
  {/* Prayer Times */}
  <PrayerTimeSection />
  
  {/* Hajj Packages */}
  <HajjPackagesSection />
  
  {/* Highlights Services */}
  <HighlightsSection />
  
  {/* Explore Destinations */}
  <ExploreSection />
  
  {/* Featured Tour */}
  <FeaturedTourSection />
</main>

      
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
