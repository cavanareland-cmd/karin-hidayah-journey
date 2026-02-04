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

interface HighlightService {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  icon_name: string | null;
  link_url: string | null;
  order_index: number;
  is_active: boolean;
}

const AdminHighlights = () => {
  const [highlights, setHighlights] = useState<HighlightService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHighlight, setEditingHighlight] = useState<HighlightService | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    icon_name: "",
    link_url: "",
    order_index: "0",
    is_active: true,
  });

  useEffect(() => {
    fetchHighlights();
  }, []);

  const fetchHighlights = async () => {
    try {
      const { data, error } = await supabase
        .from("highlight_services")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setHighlights(data || []);
    } catch (error) {
      console.error("Error fetching highlights:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const highlightData = {
        title: formData.title,
        description: formData.description || null,
        image_url: formData.image_url || null,
        icon_name: formData.icon_name || null,
        link_url: formData.link_url || null,
        order_index: parseInt(formData.order_index),
        is_active: formData.is_active,
      };

      if (editingHighlight) {
        const { error } = await supabase
          .from("highlight_services")
          .update(highlightData)
          .eq("id", editingHighlight.id);
        if (error) throw error;
        toast({ title: "Berhasil", description: "Highlight berhasil diperbarui" });
      } else {
        const { error } = await supabase.from("highlight_services").insert(highlightData);
        if (error) throw error;
        toast({ title: "Berhasil", description: "Highlight berhasil ditambahkan" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchHighlights();
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

  const handleEdit = (highlight: HighlightService) => {
    setEditingHighlight(highlight);
    setFormData({
      title: highlight.title,
      description: highlight.description || "",
      image_url: highlight.image_url || "",
      icon_name: highlight.icon_name || "",
      link_url: highlight.link_url || "",
      order_index: highlight.order_index.toString(),
      is_active: highlight.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus highlight ini?")) return;

    try {
      const { error } = await supabase.from("highlight_services").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Berhasil", description: "Highlight berhasil dihapus" });
      fetchHighlights();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingHighlight(null);
    setFormData({
      title: "",
      description: "",
      image_url: "",
      icon_name: "",
      link_url: "",
      order_index: "0",
      is_active: true,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-serif">Highlight Services</h1>
            <p className="text-muted-foreground">Kelola layanan unggulan yang ditampilkan di homepage</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Highlight
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingHighlight ? "Edit Highlight" : "Tambah Highlight Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
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

                <ImageUpload
                  label="Gambar"
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  folder="highlights"
                  aspectRatio="video"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="icon_name">Nama Icon (Lucide)</Label>
                    <Input
                      id="icon_name"
                      value={formData.icon_name}
                      onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                      placeholder="Star"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="link_url">URL Link</Label>
                    <Input
                      id="link_url"
                      value={formData.link_url}
                      onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                      placeholder="/services"
                    />
                  </div>
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
                    {editingHighlight ? "Simpan" : "Tambah"}
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
            ) : highlights.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Belum ada highlight. Klik "Tambah Highlight" untuk menambahkan.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Urutan</TableHead>
                    <TableHead>Judul</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {highlights.map((highlight) => (
                    <TableRow key={highlight.id}>
                      <TableCell>{highlight.order_index}</TableCell>
                      <TableCell className="font-medium">{highlight.title}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {highlight.description || "-"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            highlight.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {highlight.is_active ? "Aktif" : "Nonaktif"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(highlight)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(highlight.id)}
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

export default AdminHighlights;
