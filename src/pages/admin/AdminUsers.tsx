import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, ShieldCheck } from "lucide-react";

interface UserRow {
  user_id: string;
  full_name: string | null;
  phone: string | null;
  city: string | null;
  roles: string[];
}

const ROLES = ["admin", "moderator", "user"] as const;

export default function AdminUsers() {
  const { toast } = useToast();
  const [rows, setRows] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [profilesRes, rolesRes] = await Promise.all([
      supabase.from("profiles").select("user_id, full_name, phone, city"),
      supabase.from("user_roles").select("user_id, role"),
    ]);
    if (profilesRes.error || rolesRes.error) {
      toast({ title: "Gagal memuat", description: profilesRes.error?.message || rolesRes.error?.message, variant: "destructive" });
      setLoading(false);
      return;
    }
    const rolesByUser: Record<string, string[]> = {};
    rolesRes.data?.forEach((r: any) => {
      rolesByUser[r.user_id] = [...(rolesByUser[r.user_id] || []), r.role];
    });
    const merged: UserRow[] = (profilesRes.data || []).map((p: any) => ({
      user_id: p.user_id,
      full_name: p.full_name,
      phone: p.phone,
      city: p.city,
      roles: rolesByUser[p.user_id] || [],
    }));
    setRows(merged);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addRole = async (userId: string, role: string) => {
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: role as any });
    if (error) toast({ title: "Gagal", description: error.message, variant: "destructive" });
    else { toast({ title: `Role "${role}" ditambahkan` }); load(); }
  };

  const removeRole = async (userId: string, role: string) => {
    if (!confirm(`Hapus role "${role}" dari user ini?`)) return;
    const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", role as any);
    if (error) toast({ title: "Gagal", description: error.message, variant: "destructive" });
    else { toast({ title: "Dihapus" }); load(); }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><ShieldCheck className="w-6 h-6" /> Pengguna & Peran</h1>
          <p className="text-sm text-muted-foreground">Kelola peran (admin, moderator, user) untuk pengguna terdaftar.</p>
        </div>

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="py-10 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
            ) : rows.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground">Belum ada pengguna</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead><TableHead>Telepon</TableHead><TableHead>Kota</TableHead>
                    <TableHead>Roles</TableHead><TableHead className="text-right">Tambah Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((u) => (
                    <TableRow key={u.user_id}>
                      <TableCell className="font-medium">{u.full_name || "-"}</TableCell>
                      <TableCell>{u.phone || "-"}</TableCell>
                      <TableCell>{u.city || "-"}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {u.roles.length === 0 ? (
                            <span className="text-xs text-muted-foreground">-</span>
                          ) : u.roles.map((r) => (
                            <span key={r} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                              {r}
                              <button onClick={() => removeRole(u.user_id, r)} className="hover:text-destructive">
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Select onValueChange={(v) => addRole(u.user_id, v)}>
                          <SelectTrigger className="w-32 ml-auto"><SelectValue placeholder="+ Role" /></SelectTrigger>
                          <SelectContent>
                            {ROLES.filter((r) => !u.roles.includes(r)).map((r) => (
                              <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground">
          Catatan: hanya pengguna yang sudah login dan punya profile yang muncul di sini. Pengguna mendaftar lewat halaman <code>/register</code>.
        </p>
      </div>
    </AdminLayout>
  );
}
