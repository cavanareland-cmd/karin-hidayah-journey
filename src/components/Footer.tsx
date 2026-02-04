import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useFooterSettings, useHomepageSettings } from "@/hooks/useSupabaseData";
import logo from "@/assets/logo.png";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
};

interface SocialLink {
  platform: string;
  url: string;
}

interface FooterLink {
  label: string;
  url: string;
}

interface ContactInfo {
  type: string;
  value: string;
}

const Footer = () => {
  const { data: footerSettings } = useFooterSettings();
  const { data: homepageSettings } = useHomepageSettings();
  
  const brandSettings = footerSettings?.find((s) => s.section_key === "brand");
  const servicesSettings = footerSettings?.find((s) => s.section_key === "services");
  const contactSettings = footerSettings?.find((s) => s.section_key === "contact");
  const logoSettings = homepageSettings?.find((s) => s.section_key === "logo");

  const brandName = logoSettings?.title || brandSettings?.title || "Karin Hidayah Tour";
  const brandDescription = brandSettings?.content || "Melayani perjalanan ibadah Haji dan Umrah dengan pelayanan terbaik, amanah, dan profesional sejak 2010.";
  const socialLinks = (brandSettings?.social_links as unknown as SocialLink[] | null) || [];
  
  const servicesTitle = servicesSettings?.title || "Layanan";
  const servicesLinks = (servicesSettings?.links as unknown as FooterLink[] | null) || [];
  
  const contactTitle = contactSettings?.title || "Kontak";
  const contactInfo = (contactSettings?.links as unknown as ContactInfo[] | null) || [];

  return (
    <footer className="bg-secondary text-secondary-foreground mt-8">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt={brandName} className="h-10 w-10 object-contain brightness-0 invert" />
              <span className="font-serif text-lg font-semibold text-white">
                {brandName}
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4 max-w-sm">
              {brandDescription}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = socialIcons[social.platform.toLowerCase()];
                return IconComponent ? (
                  <a 
                    key={index}
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                ) : null;
              })}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">{servicesTitle}</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {servicesLinks.length > 0 ? (
                servicesLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.url} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link to="/umrah-packages" className="hover:text-white transition-colors">Paket Umrah</Link></li>
                  <li><Link to="/hajj-packages" className="hover:text-white transition-colors">Paket Haji</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors">Konsultasi</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">{contactTitle}</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {contactInfo.length > 0 ? (
                contactInfo.map((info, index) => (
                  <li key={index}>{info.value}</li>
                ))
              ) : (
                <>
                  <li>+62 812 3456 7890</li>
                  <li>info@karinhidayahtour.com</li>
                  <li>Jakarta, Indonesia</li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
