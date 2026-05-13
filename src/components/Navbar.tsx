import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Loader2, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigationMenu, useHomepageSettings } from "@/hooks/useSupabaseData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Fetch dynamic menu (already ordered by order_index in the hook) and branding
  const { data: navigationMenu, isLoading: menuLoading, isError: menuError } = useNavigationMenu();
  const { data: homepageSettings } = useHomepageSettings();

  const logoSettings = homepageSettings?.find((s) => s.section_key === "logo");
  const brandName = logoSettings?.title || "Karin Hidayah Tour";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const FALLBACK_MENU = [
    { label: "Beranda", href: "/", isRoute: true },
    { label: "Paket Umrah", href: "/umrah-packages", isRoute: true },
    { label: "Paket Haji", href: "/hajj-packages", isRoute: true },
    { label: "Tentang Kami", href: "/about-us", isRoute: true },
    { label: "Galleri", href: "/gallery", isRoute: true },
    { label: "Blog", href: "/blog", isRoute: true },
    { label: "Kontak", href: "/contact", isRoute: true },
  ];

  // Use realtime DB menu when available; fall back to defaults on empty/error
  const menuItems =
    navigationMenu && navigationMenu.length > 0
      ? navigationMenu.map((item) => ({ label: item.label, href: item.path, isRoute: true }))
      : FALLBACK_MENU;

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt={brandName} className="h-8 w-8 object-contain" />
            <span className="font-serif text-lg font-semibold text-foreground hidden sm:inline">
              {brandName}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 min-h-[24px]">
            {menuLoading && !navigationMenu ? (
              <div className="flex items-center gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-4 w-16 bg-muted rounded animate-pulse" />
                ))}
              </div>
            ) : menuError && !navigationMenu ? (
              <span className="text-xs text-muted-foreground">Gagal memuat menu</span>
            ) : (
              menuItems.map((item) =>
                item.isRoute ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                )
              )
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="hidden lg:flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  <User className="w-4 h-4" />
                  <span className="max-w-[120px] truncate">
                    {user.user_metadata?.full_name || user.email?.split("@")[0]}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Profil Saya
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="hidden lg:flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  <User className="w-4 h-4" />
                  Masuk
                </Link>
                <Link 
                  to="/register"
                  className="hidden lg:block bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Daftar
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {menuItems.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block py-2 text-foreground/70 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="block py-2 text-foreground/70 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              )
            )}
            <div className="pt-3 border-t border-border space-y-2">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Profil Saya</span>
                  </Link>
                  <button 
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-destructive text-destructive-foreground text-sm py-2.5 rounded-full font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Masuk</span>
                  </Link>
                  <Link
                    to="/register"
                    className="w-full block text-center bg-primary text-primary-foreground text-sm py-2.5 rounded-full font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
