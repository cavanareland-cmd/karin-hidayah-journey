import { Facebook, Instagram, Twitter, Youtube, Linkedin, Phone, Mail, MapPin, AlertCircle } from "lucide-react";
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

const contactIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  phone: Phone,
  email: Mail,
  address: MapPin,
};

interface SocialLink { platform: string; url: string }
interface FooterLink { label: string; url: string }
interface ContactInfo { type: string; value: string }

const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`bg-white/10 rounded animate-pulse ${className}`} />
);

const Footer = () => {
  const { data: footerSettings, isLoading, isError } = useFooterSettings();
  const { data: homepageSettings } = useHomepageSettings();

  const brand = footerSettings?.find((s) => s.section_key === "brand");
  const services = footerSettings?.find((s) => s.section_key === "services");
  const contact = footerSettings?.find((s) => s.section_key === "contact");
  const logoSettings = homepageSettings?.find((s) => s.section_key === "logo");

  const brandName = logoSettings?.title || brand?.title || "Karin Hidayah Tour";
  const brandDescription = brand?.content || "";
  const socialLinks = (brand?.social_links as unknown as SocialLink[] | null) || [];

  const servicesTitle = services?.title || "Layanan";
  const servicesLinks = (services?.links as unknown as FooterLink[] | null) || [];

  const contactTitle = contact?.title || "Kontak";
  const contactInfo = (contact?.links as unknown as ContactInfo[] | null) || [];

  const hasContent = (footerSettings?.length || 0) > 0;

  return (
    <footer className="bg-secondary text-secondary-foreground mt-8">
      <div className="container mx-auto px-4 py-12">
        {isError ? (
          <div className="flex items-center justify-center gap-2 text-white/70 py-6">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Gagal memuat konten footer.</span>
          </div>
        ) : isLoading && !footerSettings ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-3">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-4 w-full max-w-sm" />
              <Skeleton className="h-4 w-3/4 max-w-xs" />
              <div className="flex gap-3 pt-2">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-24 mb-3" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-30" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-24 mb-3" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ) : !hasContent ? (
          <div className="text-center text-white/70 py-6 text-sm">
            Konten footer belum dikonfigurasi.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt={brandName} className="h-10 w-10 object-contain brightness-0 invert" />
                <span className="font-serif text-lg font-semibold text-white">{brandName}</span>
              </div>
              {brandDescription && (
                <p className="text-white/70 text-sm leading-relaxed mb-4 max-w-sm">{brandDescription}</p>
              )}
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = socialIcons[social.platform?.toLowerCase()];
                    if (!Icon) return null;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                        className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-4">{servicesTitle}</h4>
              {servicesLinks.length === 0 ? (
                <p className="text-xs text-white/50">Belum ada link.</p>
              ) : (
                <ul className="space-y-2 text-sm text-white/70">
                  {servicesLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.url} className="hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">{contactTitle}</h4>
              {contactInfo.length === 0 ? (
                <p className="text-xs text-white/50">Belum ada info kontak.</p>
              ) : (
                <ul className="space-y-2 text-sm text-white/70">
                  {contactInfo.map((info, index) => {
                    const Icon = contactIcons[info.type?.toLowerCase()];
                    return (
                      <li key={index} className="flex items-start gap-2">
                        {Icon && <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                        <span>{info.value}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        )}

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
