import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const SECTIONS = [
  { key: "brand", label: "Brand & Sosial Media", linksLabel: "Social Links (JSON)", linksHelp: '[{"platform":"facebook","url":"https://..."}]  Platforms: facebook, instagram, twitter, youtube, linkedin' },
  { key: "services", label: "Layanan", linksLabel: "Links (JSON)", linksHelp: '[{"label":"Paket Umrah","url":"/umrah-packages"}]' },
  { key: "contact", label: "Kontak", linksLabel: "Info Kontak (JSON)", linksHelp: '[{"type":"phone","value":"+62 812..."},{"type":"email","value":"info@..."}]' },
];

interface Row {
  id?: string;
  section_key: string;
  title: string;
  content: string;
  links: string;
  social_links: string;
}

export default function AdminFooter() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Record<string, Row>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("footer_settings").select("*");
    const map: Record<string, Row> = {};
    SECTIONS.forEach((s) => {
      const found = data?.find((r: any) => r.section_key === s.key);
      map[s.key] = {
        id: found?.id,
        section_key: s.key,
        title: found?.title || "",
        content: found?.content || "",
        links: JSON.stringify(found?.links ?? [], null, 2),
        social_links: JSON.stringify(found?.social_links ?? [], null, 2),
      };
    });
    setRows(map);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async (key: string) => {
    const r = rows[key];
    setSaving(key);
    try {
      const payload: any = {
        section_key: r.section_key,
        title: r.title || null,
        content: r.content || null,
        links: JSON.parse(r.links || "[]"),
        social_links: JSON.parse(r.social_links || "[]"),
        is_active: true,
      };
      if (r.id) {
        const { error } = await supabase.from("footer_settings").update(payload).eq("id", r.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("footer_settings").insert(payload);
        if (error) throw error;
      }
      toast({ title: "Tersimpan" });
      load();
    } catch (e: any) {
      toast({ title: "Gagal", description: e.message, variant: "destructive" });
    } finally {
      setSaving(null);
    }
  };

  const update = (key: string, patch: Partial<Row>) =>
    setRows((p) => ({ ...p, [key]: { ...p[key], ...patch } }));

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Footer</h1>
          <p className="text-sm text-muted-foreground">Kelola konten footer situs</p>
        </div>

        {loading ? (
          <div className="py-10 text-center text-muted-foreground">Memuat...</div>
        ) : (
          <Tabs defaultValue="brand">
            <TabsList>
              {SECTIONS.map((s) => <TabsTrigger key={s.key} value={s.key}>{s.label}</TabsTrigger>)}
            </TabsList>
            {SECTIONS.map((s) => {
              const r = rows[s.key];
              if (!r) return null;
              return (
                <TabsContent key={s.key} value={s.key}>
                  <Card>
                    <CardHeader><CardTitle>{s.label}</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Judul</Label>
                        <Input value={r.title} onChange={(e) => update(s.key, { title: e.target.value })} />
                      </div>
                      <div>
                        <Label>Deskripsi</Label>
                        <Textarea rows={3} value={r.content} onChange={(e) => update(s.key, { content: e.target.value })} />
                      </div>
                      <div>
                        <Label>{s.linksLabel}</Label>
                        <p className="text-xs text-muted-foreground mb-1"><code>{s.linksHelp}</code></p>
                        <Textarea rows={6} className="font-mono text-xs" value={r.links} onChange={(e) => update(s.key, { links: e.target.value })} />
                      </div>
                      {s.key === "brand" && (
                        <div>
                          <Label>Social Links (JSON)</Label>
                          <Textarea rows={6} className="font-mono text-xs" value={r.social_links} onChange={(e) => update(s.key, { social_links: e.target.value })} />
                        </div>
                      )}
                      <Button onClick={() => save(s.key)} disabled={saving === s.key}>
                        <Save className="w-4 h-4 mr-2" />
                        {saving === s.key ? "Menyimpan..." : "Simpan"}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        )}
      </div>
    </AdminLayout>
  );
}
