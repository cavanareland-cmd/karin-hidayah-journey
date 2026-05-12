import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  path: string;
  order_index: number;
  is_active: boolean;
}

export default function AdminNavigation() {
  const { toast } = useToast();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [form, setForm] = useState({ label: "", path: "", order_index: "0", is_active: true });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("navigation_menu").select("*").order("order_index");
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const reset = () => {
    setEditing(null);
    setForm({ label: "", path: "", order_index: "0", is_active: true });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        label: form.label,
        path: form.path,
        order_index: parseInt(form.order_index) || 0,
        is_active: form.is_active,
      };
      if (editing) {
        const { error } = await supabase.from("navigation_menu").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("navigation_menu").insert(payload);
        if (error) throw error;
      }
      toast({ title: "Tersimpan" });
      setOpen(false);
      reset();
      load();
    } catch (e: any) {
      toast({ title: "Gagal", description: e.message, variant: "destructive" });
    }
  };

  const edit = (m: MenuItem) => {
    setEditing(m);
    setForm({ label: m.label, path: m.path, order_index: String(m.order_index), is_active: m.is_active });
    setOpen(true);
  };

  const remove = async (id: string) => {
    if (!confirm("Hapus menu ini?")) return;
    const { error } = await supabase.from("navigation_menu").delete().eq("id", id);
    if (error) toast({ title: "Gagal", description: error.message, variant: "destructive" });
    else { toast({ title: "Dihapus" }); load(); }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Menu Navigasi</h1>
            <p className="text-sm text-muted-foreground">Kelola item menu navbar</p>
          </div>
          <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" />Tambah</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{editing ? "Edit Menu" : "Tambah Menu"}</DialogTitle></DialogHeader>
              <form onSubmit={submit} className="space-y-4">
                <div><Label>Label</Label><Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} required /></div>
                <div><Label>Path</Label><Input value={form.path} onChange={(e) => setForm({ ...form, path: e.target.value })} placeholder="/umrah-packages" required /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Urutan</Label><Input type="number" value={form.order_index} onChange={(e) => setForm({ ...form, order_index: e.target.value })} /></div>
                  <div className="flex items-center gap-2 pt-7">
                    <Switch checked={form.is_active} onCheckedChange={(c) => setForm({ ...form, is_active: c })} />
                    <Label>Aktif</Label>
                  </div>
                </div>
                <Button type="submit" className="w-full">{editing ? "Simpan" : "Tambah"}</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="py-10 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
            ) : items.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground">Belum ada menu</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead><TableHead>Label</TableHead><TableHead>Path</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>{m.order_index}</TableCell>
                      <TableCell className="font-medium">{m.label}</TableCell>
                      <TableCell className="font-mono text-xs">{m.path}</TableCell>
                      <TableCell>{m.is_active ? "Aktif" : "Nonaktif"}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => edit(m)}><Pencil className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => remove(m.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
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
}
