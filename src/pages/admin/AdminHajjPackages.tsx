import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
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

interface HajjPackage {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number;
  duration_days: number;
  departure_year: number | null;
  image_url: string | null;
  visa_type: string | null;
  waiting_period: string | null;
  is_featured: boolean;
  is_active: boolean;
}

const AdminHajjPackages = () => {
  const [packages, setPackages] = useState<HajjPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<HajjPackage | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    category: "Reguler",
    description: "",
    price: "",
    duration_days: "",
    departure_year: "",
    image_url: "",
    visa_type: "",
    waiting_period: "",
    is_featured: false,
    is_active: true,
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from("hajj_packages")
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
        category: formData.category,
        description: formData.description || null,
        price: parseFloat(formData.price),
        duration_days: parseInt(formData.duration_days),
        departure_year: formData.departure_year ? parseInt(formData.departure_year) : null,
        image_url: formData.image_url || null,
        visa_type: formData.visa_type || null,
        waiting_period: formData.waiting_period || null,
        is_featured: formData.is_featured,
        is_active: formData.is_active,
      };

      if (editingPackage) {
        const { error } = await supabase
          .from("hajj_packages")
          .update(packageData)
          .eq("id", editingPackage.id);
        if (error) throw error;
        toast({ title: "Berhasil", description: "Paket haji berhasil diperbarui" });
      } else {
        const { error } = await supabase.from("hajj_packages").insert(packageData);
        if (error) throw error;
        toast({ title: "Berhasil", description: "Paket haji berhasil ditambahkan" });
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

  const handleEdit = (pkg: HajjPackage) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      category: pkg.category,
      description: pkg.description || "",
      price: pkg.price.toString(),
      duration_days: pkg.duration_days.toString(),
      departure_year: pkg.departure_year?.toString() || "",
      image_url: pkg.image_url || "",
      visa_type: pkg.visa_type || "",
      waiting_period: pkg.waiting_period || "",
      is_featured: pkg.is_featured,
      is_active: pkg.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus paket ini?")) return;

    try {
      const { error } = await supabase.from("hajj_packages").delete().eq("id", id);
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
    setFormData({
      name: "",
      category: "Reguler",
      description: "",
      price: "",
      duration_days: "",
      departure_year: "",
      image_url: "",
      visa_type: "",
      waiting_period: "",
      is_featured: false,
      is_active: true,
    });
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
            <h1 className="text-3xl font-bold font-serif">Paket Haji</h1>
            <p className="text-muted-foreground">Kelola paket perjalanan haji</p>
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
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPackage ? "Edit Paket Haji" : "Tambah Paket Haji Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Paket</Label>
                    <Input
                      id="name"
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
                      <option value="Reguler">Reguler</option>
                      <option value="Haji Plus">Haji Plus</option>
                      <option value="Furoda">Furoda</option>
                      <option value="VIP">VIP</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Harga (IDR)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration_days">Durasi (Hari)</Label>
                    <Input
                      id="duration_days"
                      type="number"
                      value={formData.duration_days}
                      onChange={(e) => setFormData({ ...formData, duration_days: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departure_year">Tahun Keberangkatan</Label>
                    <Input
                      id="departure_year"
                      type="number"
                      value={formData.departure_year}
                      onChange={(e) => setFormData({ ...formData, departure_year: e.target.value })}
                      placeholder="2025"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="visa_type">Jenis Visa</Label>
                    <Input
                      id="visa_type"
                      value={formData.visa_type}
                      onChange={(e) => setFormData({ ...formData, visa_type: e.target.value })}
                      placeholder="Visa Haji Reguler"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waiting_period">Masa Tunggu</Label>
                    <Input
                      id="waiting_period"
                      value={formData.waiting_period}
                      onChange={(e) => setFormData({ ...formData, waiting_period: e.target.value })}
                      placeholder="3-5 tahun"
                    />
                  </div>
                </div>

                <ImageUpload
                  label="Gambar Paket"
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  folder="packages/hajj"
                  aspectRatio="video"
                />

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

                <div className="flex justify-end gap-2">
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
                Belum ada paket haji. Klik "Tambah Paket" untuk menambahkan.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Durasi</TableHead>
                    <TableHead>Tahun</TableHead>
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
                      <TableCell>{pkg.departure_year || "-"}</TableCell>
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

export default AdminHajjPackages;
