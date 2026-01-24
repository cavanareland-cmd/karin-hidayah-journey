import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-8">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Karin Hidayah Tour" className="h-10 w-10 object-contain brightness-0 invert" />
              <span className="font-serif text-lg font-semibold text-white">
                Karin Hidayah Tour
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4 max-w-sm">
              Melayani perjalanan ibadah Haji dan Umrah dengan pelayanan terbaik, 
              amanah, dan profesional sejak 2010.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Paket Umrah</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Paket Haji</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Visa & Dokumen</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Konsultasi</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Kontak</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>+62 812 3456 7890</li>
              <li>info@karinhidayahtour.com</li>
              <li>Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-sm text-white/50">
            © 2024 Karin Hidayah Tour. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
