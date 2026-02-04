import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/umrah-packages" element={<UmrahPackages />} />
            <Route path="/hajj-packages" element={<HajjPackages />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/package/:id" element={<PackageDetail />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/umrah-packages" element={<AdminUmrahPackages />} />
            <Route path="/admin/hajj-packages" element={<AdminHajjPackages />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/gallery" element={<AdminGallery />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/service-icons" element={<AdminServiceIcons />} />
            <Route path="/admin/prayer-times" element={<AdminPrayerTimes />} />
            <Route path="/admin/highlights" element={<AdminHighlights />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/about" element={<AdminAbout />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
