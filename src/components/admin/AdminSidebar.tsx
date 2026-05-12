import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  FileText,
  Image,
  MessageSquare,
  Settings,
  Clock,
  Bookmark,
  Star,
  ShoppingBag,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Navigation,
  PanelBottom,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/assets/logo.png";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: LayoutDashboard, label: "Homepage", path: "/admin/homepage" },
  { icon: LayoutGrid, label: "Arrangement Section", path: "/admin/arrangement" },
  { icon: Package, label: "Paket Umrah", path: "/admin/umrah-packages" },
  { icon: Package, label: "Paket Haji", path: "/admin/hajj-packages" },
  { icon: FileText, label: "Blog", path: "/admin/blog" },
  { icon: Image, label: "Galeri", path: "/admin/gallery" },
  { icon: MessageSquare, label: "Pesan Kontak", path: "/admin/messages" },
  { icon: Bookmark, label: "Service Icons", path: "/admin/service-icons" },
  { icon: Clock, label: "Waktu Sholat", path: "/admin/prayer-times" },
  { icon: Star, label: "Explore Section", path: "/admin/explore" },
  { icon: ShoppingBag, label: "Produk", path: "/admin/products" },
  { icon: Users, label: "Tim & About Us", path: "/admin/about" },
  { icon: LayoutGrid, label: "Manasik Umrah", path: "/admin/manasik-umrah" },
  { icon: LayoutGrid, label: "Perlengkapan Ibadah", path: "/admin/perlengkapan-ibadah" },
  { icon: LayoutGrid, label: "E-Guide & Materi", path: "/admin/e-guide-materi" },
  { icon: LayoutGrid, label: "Aktivitas Jamaah", path: "/admin/aktivitas-jamaah" },
  { icon: Navigation, label: "Menu Navigasi", path: "/admin/navigation" },
  { icon: PanelBottom, label: "Footer", path: "/admin/footer" },
  { icon: ShieldCheck, label: "Pengguna & Peran", path: "/admin/users" },
  { icon: Settings, label: "Pengaturan", path: "/admin/settings" },
];

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-secondary text-secondary-foreground transition-all duration-300 z-50 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
            <span className="font-serif font-bold text-lg">Admin CMS</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white/70 hover:text-white hover:bg-white/10"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/10">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full text-white/70 hover:text-white hover:bg-white/10",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
