import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import {
  PackageFormData,
  defaultFormData,
  ItineraryForm,
  FacilitiesForm,
  ReviewsForm,
  GalleryForm,
  AgentForm,
  CTAForm,
  RelatedPackagesForm,
  DetailInfoForm,
} from "@/components/admin/package-form";

interface UmrahPackage {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number;
  duration_days: number;
  departure_date: string | null;
  image_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  subtitle?: string | null;
  location_text?: string | null;
  period_text?: string | null;
  hero_image?: string | null;
  rating?: number | null;
  total_reviews?: number | null;
  itinerary?: any;
  facilities?: any;
  facilities_not_included?: any;
  gallery_images?: any;
  reviews_data?: any;
  review_stats?: any;
  agent_info?: any;
  gallery_section?: any;
  related_packages?: any;
  cta_section?: any;
}

const AdminUmrahPackages = () => {
  const [packages, setPackages] = useState<UmrahPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<UmrahPackage | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<PackageFormData>(defaultFormData);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from("umrah_packages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPackages(data || []);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const packageData = {
        name: formData.name,
        subtitle: formData.subtitle || null,
        location_text: formData.location_text || null,
        category: formData.category,
        description: formData.description || null,
        price: parseFloat(formData.price),
        duration_days: parseInt(formData.duration_days),
        departure_date: formData.departure_date || null,
        period_text: formData.period_text || null,
        image_url: formData.image_url || null,
        hero_image: formData.hero_image || null,
        is_featured: formData.is_featured,
        is_active: formData.is_active,
        rating: parseFloat(formData.rating) || 5.0,
        total_reviews: parseInt(formData.total_reviews) || 0,
        permit_number: formData.permit_number || null,
        airline: formData.airline || null,
        route: formData.route || null,
        deposit_amount: formData.deposit_amount ? parseFloat(formData.deposit_amount) : null,
        whatsapp_number: formData.whatsapp_number || null,
        hotels: JSON.parse(JSON.stringify(formData.hotels)),
        trust_badges: JSON.parse(JSON.stringify(formData.trust_badges)),
        itinerary: JSON.parse(JSON.stringify(formData.itinerary)),
        facilities: JSON.parse(JSON.stringify(formData.facilities)),
        facilities_not_included: JSON.parse(JSON.stringify(formData.facilities_not_included)),
        gallery_images: JSON.parse(JSON.stringify(formData.gallery_images)),
        reviews_data: JSON.parse(JSON.stringify(formData.reviews_data)),
        review_stats: JSON.parse(JSON.stringify(formData.review_stats)),
        agent_info: JSON.parse(JSON.stringify(formData.agent_info)),
        gallery_section: JSON.parse(JSON.stringify(formData.gallery_section)),
        related_packages: JSON.parse(JSON.stringify(formData.related_packages)),
        cta_section: JSON.parse(JSON.stringify(formData.cta_section)),
      };

      if (editingPackage) {
        const { error } = await supabase
          .from("umrah_packages")
          .update(packageData)
          .eq("id", editingPackage.id);
        if (error) throw error;
        toast({ title: "Berhasil", description: "Paket berhasil diperbarui" });
      } else {
        const { error } = await supabase.from("umrah_packages").insert(packageData);
        if (error) throw error;
        toast({ title: "Berhasil", description: "Paket berhasil ditambahkan" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchPackages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (pkg: UmrahPackage) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      subtitle: pkg.subtitle || "",
      location_text: pkg.location_text || "",
      category: pkg.category,
      description: pkg.description || "",
      price: pkg.price.toString(),
      duration_days: pkg.duration_days.toString(),
      departure_date: pkg.departure_date || "",
      period_text: pkg.period_text || "",
      image_url: pkg.image_url || "",
      hero_image: pkg.hero_image || "",
      is_featured: pkg.is_featured,
      is_active: pkg.is_active,
      rating: pkg.rating?.toString() || "5.0",
      total_reviews: pkg.total_reviews?.toString() || "0",
      permit_number: (pkg as any).permit_number || "",
      airline: (pkg as any).airline || "Lion Air",
      route: (pkg as any).route || "SUB-JED",
      deposit_amount: (pkg as any).deposit_amount?.toString() || "5000000",
      whatsapp_number: (pkg as any).whatsapp_number || "",
      hotels: (pkg as any).hotels && (pkg as any).hotels.madinah ? (pkg as any).hotels : defaultFormData.hotels,
      trust_badges: (pkg as any).trust_badges?.length ? (pkg as any).trust_badges : defaultFormData.trust_badges,
      itinerary: pkg.itinerary || [],
      facilities: pkg.facilities || [],
      facilities_not_included: pkg.facilities_not_included || [],
      gallery_images: pkg.gallery_images || [],
      reviews_data: pkg.reviews_data || [],
      review_stats: pkg.review_stats || defaultFormData.review_stats,
      agent_info: pkg.agent_info || defaultFormData.agent_info,
      gallery_section: pkg.gallery_section || defaultFormData.gallery_section,
      related_packages: pkg.related_packages || [],
      cta_section: pkg.cta_section || defaultFormData.cta_section,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus paket ini?")) return;

    try {
      const { error } = await supabase.from("umrah_packages").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Berhasil", description: "Paket berhasil dihapus" });
      fetchPackages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingPackage(null);
    setFormData(defaultFormData);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-serif">Paket Umrah</h1>
            <p className="text-muted-foreground">Kelola paket perjalanan umrah</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Paket
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPackage ? "Edit Paket Umrah" : "Tambah Paket Umrah Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-8 mb-4">
                    <TabsTrigger value="basic" className="text-xs">Info Dasar</TabsTrigger>
                    <TabsTrigger value="detail" className="text-xs">Detail</TabsTrigger>
                    <TabsTrigger value="itinerary" className="text-xs">Itinerary</TabsTrigger>
                    <TabsTrigger value="facilities" className="text-xs">Fasilitas</TabsTrigger>
                    <TabsTrigger value="reviews" className="text-xs">Reviews</TabsTrigger>
                    <TabsTrigger value="gallery" className="text-xs">Gallery</TabsTrigger>
                    <TabsTrigger value="agent" className="text-xs">Agent</TabsTrigger>
                    <TabsTrigger value="cta" className="text-xs">CTA</TabsTrigger>
                  </TabsList>

                  {/* Basic Info Tab */}
                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Paket *</Label>
                        <Input
                          id="name"
                          placeholder="PAKET UMRAH BULAN RAMADAN 2026"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Kategori</Label>
                        <select
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="Regular">Regular</option>
                          <option value="Premium">Premium</option>
                          <option value="VIP">VIP</option>
                          <option value="Ramadhan">Ramadhan</option>
                          <option value="Plus">Plus</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="subtitle">Subjudul / Lokasi</Label>
                        <Input
                          id="subtitle"
                          placeholder="Makkah Al-Mukarramah & Madinah Al-Munawwarah"
                          value={formData.subtitle}
                          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location_text">Teks Lokasi</Label>
                        <Input
                          id="location_text"
                          placeholder="Makkah Al-Mukarramah & Madinah Al-Munawwarah"
                          value={formData.location_text}
                          onChange={(e) => setFormData({ ...formData, location_text: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Deskripsi Paket</Label>
                      <Textarea
                        id="description"
                        placeholder="Paket Umrah Ramadhan 2026 bersama Karin Hidayah Tour dirancang untuk memberikan pengalaman ibadah yang khusyuk, nyaman, dan terarah..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Harga (IDR) *</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="35000000"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration_days">Durasi (Hari) *</Label>
                        <Input
                          id="duration_days"
                          type="number"
                          placeholder="12"
                          value={formData.duration_days}
                          onChange={(e) => setFormData({ ...formData, duration_days: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="period_text">Periode/Tahun</Label>
                        <Input
                          id="period_text"
                          placeholder="Ramadan 2026"
                          value={formData.period_text}
                          onChange={(e) => setFormData({ ...formData, period_text: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="departure_date">Tanggal Keberangkatan</Label>
                      <Input
                        id="departure_date"
                        type="date"
                        value={formData.departure_date}
                        onChange={(e) => setFormData({ ...formData, departure_date: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <ImageUpload
                        label="Gambar Thumbnail"
                        value={formData.image_url}
                        onChange={(url) => setFormData({ ...formData, image_url: url })}
                        folder="packages/umrah"
                        aspectRatio="video"
                      />
                      <ImageUpload
                        label="Hero Image / Banner Utama"
                        value={formData.hero_image}
                        onChange={(url) => setFormData({ ...formData, hero_image: url })}
                        folder="packages/umrah/hero"
                        aspectRatio="video"
                      />
                    </div>

                    <div className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <Switch
                          id="is_featured"
                          checked={formData.is_featured}
                          onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                        />
                        <Label htmlFor="is_featured">Featured</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          id="is_active"
                          checked={formData.is_active}
                          onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                        />
                        <Label htmlFor="is_active">Aktif</Label>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Detail Tab */}
                  <TabsContent value="detail">
                    <DetailInfoForm
                      permitNumber={formData.permit_number}
                      airline={formData.airline}
                      route={formData.route}
                      depositAmount={formData.deposit_amount}
                      whatsappNumber={formData.whatsapp_number}
                      hotels={formData.hotels}
                      trustBadges={formData.trust_badges}
                      onChange={(patch) => setFormData({ ...formData, ...patch } as any)}
                    />
                  </TabsContent>


                  {/* Itinerary Tab */}
                  <TabsContent value="itinerary">
                    <ItineraryForm
                      itinerary={formData.itinerary}
                      onChange={(itinerary) => setFormData({ ...formData, itinerary })}
                    />
                  </TabsContent>

                  {/* Facilities Tab */}
                  <TabsContent value="facilities">
                    <FacilitiesForm
                      facilities={formData.facilities}
                      onChangeFacilities={(facilities) => setFormData({ ...formData, facilities })}
                      notIncluded={formData.facilities_not_included}
                      onChangeNotIncluded={(facilities_not_included) => setFormData({ ...formData, facilities_not_included })}
                    />
                  </TabsContent>

                  {/* Reviews Tab */}
                  <TabsContent value="reviews">
                    <ReviewsForm
                      reviewStats={formData.review_stats}
                      onChangeStats={(review_stats) => setFormData({ ...formData, review_stats })}
                      reviews={formData.reviews_data}
                      onChangeReviews={(reviews_data) => setFormData({ ...formData, reviews_data })}
                    />
                  </TabsContent>

                  {/* Gallery Tab */}
                  <TabsContent value="gallery">
                    <GalleryForm
                      galleryImages={formData.gallery_images}
                      onChangeImages={(gallery_images) => setFormData({ ...formData, gallery_images })}
                      gallerySection={formData.gallery_section}
                      onChangeSection={(gallery_section) => setFormData({ ...formData, gallery_section })}
                    />
                  </TabsContent>

                  {/* Agent Tab */}
                  <TabsContent value="agent" className="space-y-6">
                    <AgentForm
                      agentInfo={formData.agent_info}
                      onChange={(agent_info) => setFormData({ ...formData, agent_info })}
                    />
                    <RelatedPackagesForm
                      packages={formData.related_packages}
                      onChange={(related_packages) => setFormData({ ...formData, related_packages })}
                    />
                  </TabsContent>

                  {/* CTA Tab */}
                  <TabsContent value="cta">
                    <CTAForm
                      ctaSection={formData.cta_section}
                      onChange={(cta_section) => setFormData({ ...formData, cta_section })}
                    />
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingPackage ? "Simpan Perubahan" : "Tambah Paket"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : packages.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Belum ada paket. Klik "Tambah Paket" untuk menambahkan.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Durasi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell className="font-medium">{pkg.name}</TableCell>
                      <TableCell>{pkg.category}</TableCell>
                      <TableCell>{formatPrice(pkg.price)}</TableCell>
                      <TableCell>{pkg.duration_days} hari</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            pkg.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {pkg.is_active ? "Aktif" : "Nonaktif"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(pkg)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(pkg.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminUmrahPackages;
