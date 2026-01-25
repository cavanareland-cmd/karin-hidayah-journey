import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Play, Instagram, Camera, MapPin } from "lucide-react";

// Import images
import destination1 from "@/assets/destination-1.jpg";
import makkahLandscape from "@/assets/makkah-landscape.jpg";
import hotelRoom from "@/assets/hotel-room.jpg";
import hajjPackage1 from "@/assets/hajj-package-1.jpg";
import hajjPackage2 from "@/assets/hajj-package-2.jpg";
import hajjPackage3 from "@/assets/hajj-package-3.jpg";
import umrahPackage from "@/assets/umrah-package.jpg";
import destinationFeatured from "@/assets/destination-featured.jpg";
import zamzamWater from "@/assets/zamzam-water.jpg";
import tahallulService from "@/assets/tahallul-service.jpg";
import olehOleh from "@/assets/oleh-oleh.jpg";
import desertDunes from "@/assets/desert-dunes.jpg";

const Gallery = () => {
  const galleryImages = [
    { src: makkahLandscape, title: "Masjidil Haram", location: "Makkah Al-Mukarramah" },
    { src: destination1, title: "Masjid Nabawi", location: "Madinah Al-Munawwarah" },
    { src: hajjPackage1, title: "Tawaf di Ka'bah", location: "Makkah" },
    { src: hajjPackage2, title: "Shalat di Raudhah", location: "Madinah" },
    { src: hotelRoom, title: "Hotel Premium", location: "Makkah" },
    { src: hajjPackage3, title: "Jamaah Umrah", location: "Makkah" },
    { src: umrahPackage, title: "Perjalanan Spiritual", location: "Saudi Arabia" },
    { src: destinationFeatured, title: "Pemandangan Kota", location: "Madinah" },
    { src: zamzamWater, title: "Air Zamzam", location: "Makkah" },
    { src: tahallulService, title: "Tahallul", location: "Makkah" },
    { src: olehOleh, title: "Oleh-oleh Khas", location: "Saudi Arabia" },
    { src: desertDunes, title: "Gurun Pasir", location: "Saudi Arabia" },
  ];

  const instagramPosts = [
    "DCxQw8kS9kt",
    "DCxLvkSyhiG", 
    "DCw_tPDSLG8",
    "DCwvRbSy5u3",
    "DCwXpqqyaIi",
    "DCv7wHNyMPQ",
  ];

  const youtubeVideos = [
    { id: "YQHsXMglC9A", title: "Perjalanan Umrah Bersama Karin Hidayah" },
    { id: "dQw4w9WgXcQ", title: "Tips Ibadah di Tanah Suci" },
    { id: "L_jWHffIx5E", title: "Pengalaman Jamaah Kami" },
    { id: "M7lc1UVf-VE", title: "Panduan Lengkap Umrah" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${makkahLandscape})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>
          
          <div className="relative h-full container mx-auto px-4 lg:px-8 flex flex-col justify-center items-center text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Camera className="w-4 h-4 text-accent" />
              <span className="text-white/90 text-sm font-medium">Galeri Perjalanan</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
              Galeri
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Dokumentasi perjalanan spiritual jamaah kami ke Tanah Suci
            </p>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title">Foto Perjalanan</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Momen-momen berharga jamaah kami di Makkah dan Madinah
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div 
                  key={index}
                  className={`group relative overflow-hidden rounded-xl cursor-pointer ${
                    index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-cover aspect-square transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                    <div className="flex items-center gap-1 text-white/80 text-sm">
                      <MapPin className="w-3 h-3" />
                      <span>{image.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Section */}
        <section className="section-padding bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-full mb-4">
                <Instagram className="w-4 h-4" />
                <span className="text-sm font-medium">Instagram</span>
              </div>
              <h2 className="section-title">Ikuti Kami di Instagram</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Update terbaru perjalanan dan kegiatan jamaah kami
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {instagramPosts.map((postId, index) => (
                <div key={index} className="aspect-square rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src={`https://www.instagram.com/p/${postId}/embed/captioned`}
                    className="w-full h-full"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency={true}
                    title={`Instagram post ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <a 
                href="https://instagram.com/karinhidayahtour" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-opacity"
              >
                <Instagram className="w-5 h-5" />
                Follow @karinhidayahtour
              </a>
            </div>
          </div>
        </section>

        {/* YouTube Section */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full mb-4">
                <Play className="w-4 h-4" />
                <span className="text-sm font-medium">YouTube</span>
              </div>
              <h2 className="section-title">Video Perjalanan</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tonton pengalaman perjalanan jamaah kami ke Tanah Suci
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {youtubeVideos.map((video, index) => (
                <div 
                  key={index}
                  className="group relative rounded-xl overflow-hidden shadow-lg bg-card"
                >
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video.title}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <a 
                href="https://youtube.com/@karinhidayahtour" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-medium hover:bg-accent/90 transition-colors"
              >
                <Play className="w-5 h-5" />
                Subscribe Channel Kami
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Ingin Menjadi Bagian dari Perjalanan Ini?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Daftarkan diri Anda sekarang dan mulai perjalanan spiritual ke Tanah Suci bersama kami
            </p>
            <a 
              href="https://wa.me/6281234567890?text=Halo, saya tertarik dengan paket umrah/haji"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              Hubungi Kami Sekarang
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Gallery;
