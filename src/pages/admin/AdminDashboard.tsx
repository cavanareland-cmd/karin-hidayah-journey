import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  FileText,
  Image,
  MessageSquare,
  Users,
  ShoppingBag,
  Eye,
  TrendingUp,
} from "lucide-react";

interface DashboardStats {
  umrahPackages: number;
  hajjPackages: number;
  blogPosts: number;
  galleryItems: number;
  unreadMessages: number;
  products: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    umrahPackages: 0,
    hajjPackages: 0,
    blogPosts: 0,
    galleryItems: 0,
    unreadMessages: 0,
    products: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [umrah, hajj, blog, gallery, messages, products] = await Promise.all([
          supabase.from("umrah_packages").select("id", { count: "exact", head: true }),
          supabase.from("hajj_packages").select("id", { count: "exact", head: true }),
          supabase.from("blog_posts").select("id", { count: "exact", head: true }),
          supabase.from("gallery_items").select("id", { count: "exact", head: true }),
          supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("is_read", false),
          supabase.from("products").select("id", { count: "exact", head: true }),
        ]);

        setStats({
          umrahPackages: umrah.count || 0,
          hajjPackages: hajj.count || 0,
          blogPosts: blog.count || 0,
          galleryItems: gallery.count || 0,
          unreadMessages: messages.count || 0,
          products: products.count || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: "Paket Umrah", value: stats.umrahPackages, icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Paket Haji", value: stats.hajjPackages, icon: Package, color: "text-green-600", bg: "bg-green-100" },
    { title: "Artikel Blog", value: stats.blogPosts, icon: FileText, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Item Galeri", value: stats.galleryItems, icon: Image, color: "text-orange-600", bg: "bg-orange-100" },
    { title: "Pesan Belum Dibaca", value: stats.unreadMessages, icon: MessageSquare, color: "text-red-600", bg: "bg-red-100" },
    { title: "Produk", value: stats.products, icon: ShoppingBag, color: "text-teal-600", bg: "bg-teal-100" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold font-serif text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Selamat datang di panel administrasi</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{isLoading ? "..." : stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Belum ada aktivitas tercatat. Mulai kelola konten website Anda dari menu di samping.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                Tips Cepat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                • Gunakan menu <strong>Paket Umrah/Haji</strong> untuk mengelola paket perjalanan
              </p>
              <p className="text-sm text-muted-foreground">
                • Cek <strong>Pesan Kontak</strong> secara berkala untuk merespons calon jamaah
              </p>
              <p className="text-sm text-muted-foreground">
                • Update <strong>Waktu Sholat</strong> untuk informasi terkini
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
