import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import PackageDetail from "./pages/PackageDetail";
import UmrahPackages from "./pages/UmrahPackages";
import HajjPackages from "./pages/HajjPackages";
import AboutUs from "./pages/AboutUs";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import CategoryDetail from "./pages/CategoryDetail";
import ManasikUmrah from "./pages/categories/ManasikUmrah";
import PerlengkapanIbadah from "./pages/categories/PerlengkapanIbadah";
import EGuideMateri from "./pages/categories/EGuideMateri";
import AktivitasJamaah from "./pages/categories/AktivitasJamaah";



// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHomepage from "./pages/admin/AdminHomepage";
import AdminUmrahPackages from "./pages/admin/AdminUmrahPackages";
import AdminHajjPackages from "./pages/admin/AdminHajjPackages";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminServiceIcons from "./pages/admin/AdminServiceIcons";
import AdminPrayerTimes from "./pages/admin/AdminPrayerTimes";
import AdminHighlights from "./pages/admin/AdminHighlights";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminArrangementSection from "./pages/admin/AdminArrangementSection";
import AdminExploreSection from "./pages/admin/AdminExploreSection";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
<HashRouter>
  <Routes>
    <Route path="/" element={<Index />} />

    {/* Public Pages */}
    <Route path="/umrah-packages" element={<UmrahPackages />} />
    <Route path="/hajj-packages" element={<HajjPackages />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/package/:id" element={<PackageDetail />} />

    {/* 🔥 CATEGORY DETAIL */}
    <Route path="/kategori/manasik-umrah" element={<ManasikUmrah />} />
    <Route path="/kategori/perlengkapan-ibadah" element={<PerlengkapanIbadah />} />
    <Route path="/kategori/e-guide-materi" element={<EGuideMateri />} />
    <Route path="/kategori/aktivitas-jamaah" element={<AktivitasJamaah />} />
    <Route path="/kategori/:slug" element={<CategoryDetail />} />

    {/* Auth */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Admin */}
    <Route path="/admin" element={<AdminLogin />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />

    {/* Catch all */}
    <Route path="*" element={<NotFound />} />
  </Routes>
</HashRouter>

      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
