import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const SECTIONS = [
  { key: "hero", label: "Hero", hasImage: true, hasStats: false },
  { key: "profile", label: "Profil", hasImage: false, hasStats: false },
  { key: "stats", label: "Statistik", hasImage: false, hasStats: true, statsHelp: '[{"value":"14+","label":"Tahun Pengalaman"}]' },
  { key: "vision", label: "Visi", hasImage: false, hasStats: false },
  { key: "mission", label: "Misi", hasImage: false, hasStats: true, statsHelp: '["Poin misi 1","Poin misi 2"]' },
  { key: "values", label: "Nilai", hasImage: false, hasStats: true, statsHelp: '[{"icon":"Heart","title":"Amanah","description":"..."}]  Icons: Heart,Award,Shield,Users,Target,Eye' },
  { key: "cta", label: "CTA", hasImage: false, hasStats: false },
];

interface SectionRow {
  id?: string;
  section_key: string;
  title: string;
  content: string;
  image_url: string;
  stats: string;
}

export default function AboutContentEditor() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [rows, setRows] = useState<Record<string, SectionRow>>({});
  const [saving, setSaving] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin_about_us_content"],
    queryFn: async () => {
      const { data, error } = await supabase.from("about_us_content").select("*");
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    const map: Record<string, SectionRow> = {};
    SECTIONS.forEach((s) => {
      const found = data?.find((r: any) => r.section_key === s.key);
      map[s.key] = {
        id: found?.id,
        section_key: s.key,
        title: found?.title || "",
        content: found?.content || "",
        image_url: found?.image_url || "",
        stats: JSON.stringify(found?.stats ?? (s.hasStats ? [] : null), null, 2),
      };
    });
    setRows(map);
  }, [data]);

  const save = async (key: string) => {
    const r = rows[key];
    if (!r) return;
    setSaving(key);
    try {
      let parsedStats: any = null;
      if (r.stats && r.stats.trim() && r.stats.trim() !== "null") {
        parsedStats = JSON.parse(r.stats);
      }
      const payload: any = {
        section_key: r.section_key,
        title: r.title || null,
        content: r.content || null,
        image_url: r.image_url || null,
        stats: parsedStats,
        is_active: true,
      };
      if (r.id) {
        const { error } = await supabase.from("about_us_content").update(payload).eq("id", r.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("about_us_content").insert(payload);
        if (error) throw error;
      }
      toast({ title: "Tersimpan", description: `Bagian "${key}" berhasil disimpan` });
      qc.invalidateQueries({ queryKey: ["admin_about_us_content"] });
      qc.invalidateQueries({ queryKey: ["about_us_content"] });
    } catch (e: any) {
      toast({ title: "Gagal", description: e.message, variant: "destructive" });
    } finally {
      setSaving(null);
    }
  };

  const update = (key: string, patch: Partial<SectionRow>) =>
    setRows((p) => ({ ...p, [key]: { ...p[key], ...patch } }));

  if (isLoading) return <div className="py-10 text-center text-muted-foreground">Memuat...</div>;

  return (
    <Tabs defaultValue="hero">
      <TabsList className="flex flex-wrap h-auto">
        {SECTIONS.map((s) => (
          <TabsTrigger key={s.key} value={s.key}>{s.label}</TabsTrigger>
        ))}
      </TabsList>

      {SECTIONS.map((s) => {
        const r = rows[s.key];
        if (!r) return null;
        return (
          <TabsContent key={s.key} value={s.key}>
            <Card>
              <CardHeader>
                <CardTitle>{s.label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Judul</Label>
                  <Input value={r.title} onChange={(e) => update(s.key, { title: e.target.value })} />
                </div>
                <div>
                  <Label>Konten / Deskripsi</Label>
                  <Textarea rows={4} value={r.content} onChange={(e) => update(s.key, { content: e.target.value })} />
                </div>
                {s.hasImage && (
                  <div>
                    <Label>URL Gambar</Label>
                    <Input value={r.image_url} onChange={(e) => update(s.key, { image_url: e.target.value })} placeholder="https://..." />
                  </div>
                )}
                {s.hasStats && (
                  <div>
                    <Label>Data (JSON)</Label>
                    <p className="text-xs text-muted-foreground mb-1">Format: <code>{s.statsHelp}</code></p>
                    <Textarea rows={10} className="font-mono text-xs" value={r.stats} onChange={(e) => update(s.key, { stats: e.target.value })} />
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
  );
}
