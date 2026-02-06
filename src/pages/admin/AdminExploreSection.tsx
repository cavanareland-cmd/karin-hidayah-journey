import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Pencil, Trash2, Loader2, Clock, Users } from "lucide-react";

interface ExploreItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
  badge_text: string | null;
  duration: string | null;
  guests: number | null;
  max_guests: number | null;
  order_index: number;
  is_active: boolean;
}

const AdminExploreSection = () => {
  const [items, setItems] = useState<ExploreItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExploreItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    link_url: "",
    badge_text: "Place",
    duration: "5 d",
    guests: "100",
    max_guests: "80",
    order_index: "0",
    is_active: true,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("highlight_services")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const itemData = {
        title: formData.title,
        description: formData.description || null,
        image_url: formData.image_url || null,
        link_url: formData.link_url || null,
        badge_text: formData.badge_text || "Place",
        duration: formData.duration || "5 d",
        guests: parseInt(formData.guests) || 100,
        max_guests: parseInt(formData.max_guests) || 80,
        order_index: parseInt(formData.order_index),
        is_active: formData.is_active,
      };

      if (editingItem) {
        const { error } = await supabase
          .from("highlight_services")
          .update(itemData)
          .eq("id", editingItem.id);
        if (error) throw error;
        toast({ title: "Berhasil", description: "Item berhasil diperbarui" });
      } else {
        const { error } = await supabase.from("highlight_services").insert(itemData);
        if (error) throw error;
        toast({ title: "Berhasil", description: "Item berhasil ditambahkan" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchItems();
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

  const handleEdit = (item: ExploreItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      image_url: item.image_url || "",
      link_url: item.link_url || "",
      badge_text: item.badge_text || "Place",
      duration: item.duration || "5 d",
      guests: item.guests?.toString() || "100",
      max_guests: item.max_guests?.toString() || "80",
      order_index: item.order_index.toString(),
      is_active: item.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus item ini?")) return;

    try {
      const { error } = await supabase.from("highlight_services").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Berhasil", description: "Item berhasil dihapus" });
      fetchItems();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      image_url: "",
      link_url: "",
      badge_text: "Place",
      duration: "5 d",
      guests: "100",
      max_guests: "80",
      order_index: "0",
      is_active: true,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-serif">Explore Section</h1>
            <p className="text-muted-foreground">Kelola kartu destinasi "Explore our Highlights services"</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Destinasi
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Edit Destinasi" : "Tambah Destinasi Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Destinasi *</Label>
                  <Input
                    id="title"
                    placeholder="Egyptian pyramids"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <ImageUpload
                  label="Gambar Destinasi"
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  folder="explore"
                  aspectRatio="video"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="badge_text">Badge Text</Label>
                    <Input
                      id="badge_text"
                      placeholder="Place"
                      value={formData.badge_text}
                      onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Durasi</Label>
                    <Input
                      id="duration"
                      placeholder="5 d"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guests">Jumlah Tamu</Label>
                    <Input
                      id="guests"
                      type="number"
                      placeholder="100"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max_guests">Maks. Tamu</Label>
                    <Input
                      id="max_guests"
                      type="number"
                      placeholder="80"
                      value={formData.max_guests}
                      onChange={(e) => setFormData({ ...formData, max_guests: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link_url">URL Link (opsional)</Label>
                  <Input
                    id="link_url"
                    placeholder="/destinations/pyramids"
                    value={formData.link_url}
                    onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="order_index">Urutan</Label>
                    <Input
                      id="order_index"
                      type="number"
                      value={formData.order_index}
                      onChange={(e) => setFormData({ ...formData, order_index: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-8">
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
                    {editingItem ? "Simpan" : "Tambah"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Preview Card */}
        {items.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Preview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="relative overflow-hidden rounded-xl h-40"
                  >
                    <img
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute top-2 left-2">
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        {item.badge_text}
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                      <div className="flex items-center gap-2 text-white/80 text-xs">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {item.guests}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {item.max_guests}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Belum ada destinasi. Klik "Tambah Destinasi" untuk menambahkan.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">No</TableHead>
                    <TableHead>Gambar</TableHead>
                    <TableHead>Judul</TableHead>
                    <TableHead>Badge</TableHead>
                    <TableHead>Durasi</TableHead>
                    <TableHead>Tamu</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.order_index}</TableCell>
                      <TableCell>
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-16 h-10 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-10 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                            No img
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.badge_text}</TableCell>
                      <TableCell>{item.duration}</TableCell>
                      <TableCell>{item.guests}/{item.max_guests}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            item.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {item.is_active ? "Aktif" : "Nonaktif"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(item.id)}
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

export default AdminExploreSection;
