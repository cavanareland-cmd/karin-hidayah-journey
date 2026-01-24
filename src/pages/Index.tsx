import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RencanaIbadahSection from "@/components/RencanaIbadahSection";
import BookingSection from "@/components/BookingSection";
import PrayerTimeSection from "@/components/PrayerTimeSection";
import SpiritualServicesSection from "@/components/SpiritualServicesSection";
import TahallulSection from "@/components/TahallulSection";
import UmrahPackageSection from "@/components/UmrahPackageSection";
import ZamzamSection from "@/components/ZamzamSection";
import YoutubeSection from "@/components/YoutubeSection";
import DzikirSection from "@/components/DzikirSection";
import PanduanIbadahSection from "@/components/PanduanIbadahSection";
import BantuanSection from "@/components/BantuanSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Rencana Ibadahku */}
        <RencanaIbadahSection />
        
        {/* Booking Cards */}
        <BookingSection />
        
        {/* Prayer Times */}
        <PrayerTimeSection />
        
        {/* Spiritual Services */}
        <SpiritualServicesSection />
        
        {/* Tahallul Service Info */}
        <TahallulSection />
        
        {/* Umrah Packages */}
        <UmrahPackageSection />
        
        {/* Zamzam Water */}
        <ZamzamSection />
        
        {/* YouTube Videos */}
        <YoutubeSection />
        
        {/* Dzikir */}
        <DzikirSection />
        
        {/* Panduan Ibadah */}
        <PanduanIbadahSection />
        
        {/* Bantuan CTA */}
        <BantuanSection />
      </main>
      
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
