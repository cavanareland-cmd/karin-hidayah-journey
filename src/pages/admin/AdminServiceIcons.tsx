import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
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
import { Plus, Pencil, Trash2, Loader2, GripVertical } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface ServiceIcon {
  id: string;
  icon_name: string;
  label: string;
  order_index: number;
  is_active: boolean;
}

const iconOptions = [
  "BookOpen", "Heart", "FileText", "Headphones", "HandHelping", "Compass",
  "Star", "Moon", "Sun", "Clock", "Calendar", "MapPin", "Globe", "Book",
  "Users", "Home", "Award", "Gift", "MessageCircle", "Phone"
];

const AdminServiceIcons = () => {
  const [icons, setIcons] = useState<ServiceIcon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIcon, setEditingIcon] = useState<ServiceIcon | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    icon_name: "BookOpen",
    label: "",
    order_index: "0",
    is_active: true,
  });

  useEffect(() => {
    fetchIcons();
  }, []);

  const fetchIcons = async () => {
    try {
      const { data, error } = await supabase
        .from("service_icons")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setIcons(data || []);
    } catch (error) {
      console.error("Error fetching icons:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const iconData = {
        icon_name: formData.icon_name,
        label: formData.label,
        order_index: parseInt(formData.order_index),
        is_active: formData.is_active,
      };

      if (editingIcon) {
        const { error } = await supabase
          .from("service_icons")
          .update(iconData)
          .eq("id", editingIcon.id);
        if (error) throw error;
        toast({ title: "Berhasil", description: "Icon berhasil diperbarui" });
      } else {
        const { error } = await supabase.from("service_icons").insert(iconData);
        if (error) throw error;
        toast({ title: "Berhasil", description: "Icon berhasil ditambahkan" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchIcons();
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

  const handleEdit = (icon: ServiceIcon) => {
    setEditingIcon(icon);
    setFormData({
      icon_name: icon.icon_name,
      label: icon.label,
      order_index: icon.order_index.toString(),
      is_active: icon.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus icon ini?")) return;

    try {
      const { error } = await supabase.from("service_icons").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Berhasil", description: "Icon berhasil dihapus" });
      fetchIcons();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingIcon(null);
    setFormData({
      icon_name: "BookOpen",
      label: "",
      order_index: "0",
      is_active: true,
    });
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-serif">Service Icons</h1>
            <p className="text-muted-foreground">Kelola icon layanan (Al Quran, Dzikir, dll)</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Icon
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingIcon ? "Edit Icon" : "Tambah Icon Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="icon_name">Icon</Label>
                  <select
                    id="icon_name"
                    value={formData.icon_name}
                    onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-muted-foreground">Preview:</span>
                    {renderIcon(formData.icon_name)}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="label">Label</Label>
                  <Input
                    id="label"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="Al Quran"
                    required
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
                    {editingIcon ? "Simpan" : "Tambah"}
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
            ) : icons.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Belum ada icon. Klik "Tambah Icon" untuk menambahkan.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Urutan</TableHead>
                    <TableHead>Icon</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {icons.map((icon) => (
                    <TableRow key={icon.id}>
                      <TableCell className="font-medium">{icon.order_index}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {renderIcon(icon.icon_name)}
                          <span className="text-sm text-muted-foreground">{icon.icon_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{icon.label}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            icon.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {icon.is_active ? "Aktif" : "Nonaktif"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(icon)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(icon.id)}
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

export default AdminServiceIcons;
