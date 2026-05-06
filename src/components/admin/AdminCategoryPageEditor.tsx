import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Save, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  pageKey: string;
  pageTitle: string;
  previewPath: string;
}

export default function AdminCategoryPageEditor({ pageKey, pageTitle, previewPath }: Props) {
  const { toast } = useToast();
  const qc = useQueryClient();

  const [hero, setHero] = useState<any>({});
  const [items, setItems] = useState("[]");
  const [features, setFeatures] = useState("[]");
  const [extra, setExtra] = useState("{}");
  const [cta, setCta] = useState<any>({});

  const { data, isLoading } = useQuery({
    queryKey: ["admin_category_page", pageKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("category_pages")
        .select("*")
        .eq("page_key", pageKey)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (data) {
      setHero(data.hero || {});
      setItems(JSON.stringify(data.items || [], null, 2));
      setFeatures(JSON.stringify(data.features || [], null, 2));
      setExtra(JSON.stringify(data.extra || {}, null, 2));
      setCta(data.cta || {});
    }
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      let parsedItems, parsedFeatures, parsedExtra;
      try {
        parsedItems = JSON.parse(items);
        parsedFeatures = JSON.parse(features);
        parsedExtra = JSON.parse(extra);
      } catch (e: any) {
        throw new Error("Format JSON tidak valid: " + e.message);
      }
      const payload = {
        page_key: pageKey,
        hero,
        items: parsedItems,
        features: parsedFeatures,
        extra: parsedExtra,
        cta,
        is_active: true,
      };
      if (data?.id) {
        const { error } = await supabase
          .from("category_pages")
          .update(payload)
          .eq("id", data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("category_pages").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({ title: "Tersimpan", description: "Halaman berhasil diperbarui." });
      qc.invalidateQueries({ queryKey: ["admin_category_page", pageKey] });
      qc.invalidateQueries({ queryKey: ["category_page", pageKey] });
    },
    onError: (e: any) =>
      toast({ title: "Gagal menyimpan", description: e.message, variant: "destructive" }),
  });

  const heroField = (key: string, label: string, isTextarea = false) => (
    <div>
      <Label>{label}</Label>
      {isTextarea ? (
        <Textarea
          value={hero[key] || ""}
          onChange={(e) => setHero({ ...hero, [key]: e.target.value })}
          rows={3}
        />
      ) : (
        <Input
          value={hero[key] || ""}
          onChange={(e) => setHero({ ...hero, [key]: e.target.value })}
        />
      )}
    </div>
  );

  const ctaField = (key: string, label: string, isTextarea = false) => (
    <div>
      <Label>{label}</Label>
      {isTextarea ? (
        <Textarea
          value={cta[key] || ""}
          onChange={(e) => setCta({ ...cta, [key]: e.target.value })}
          rows={3}
        />
      ) : (
        <Input
          value={cta[key] || ""}
          onChange={(e) => setCta({ ...cta, [key]: e.target.value })}
        />
      )}
    </div>
  );

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">{pageTitle}</h1>
            <p className="text-sm text-muted-foreground">
              Kelola seluruh konten halaman <code>/kategori/{pageKey}</code>
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to={previewPath} target="_blank">
                <ExternalLink className="w-4 h-4 mr-2" /> Preview
              </Link>
            </Button>
            <Button onClick={() => save.mutate()} disabled={save.isPending || isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {save.isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-10 text-muted-foreground">Memuat...</div>
        ) : (
          <Tabs defaultValue="hero">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="items">Kartu Utama</TabsTrigger>
              <TabsTrigger value="features">Keunggulan</TabsTrigger>
              <TabsTrigger value="extra">Bagian Tambahan</TabsTrigger>
              <TabsTrigger value="cta">CTA</TabsTrigger>
            </TabsList>

            <TabsContent value="hero">
              <Card>
                <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {heroField("badge", "Badge")}
                  {heroField("title", "Judul")}
                  {heroField("description", "Deskripsi", true)}
                  {heroField("button_text", "Teks Tombol Utama (WA)")}
                  {heroField("whatsapp_text", "Pesan WhatsApp Tombol Utama")}
                  {heroField("secondary_button_text", "Teks Tombol Kedua")}
                  {heroField("secondary_button_link", "Link Tombol Kedua")}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="items">
              <Card>
                <CardHeader>
                  <CardTitle>Kartu Utama (JSON Array)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Setiap item: {`{ icon, title, description, items?[], no? }`}.
                    Icons: BookOpen, Users, Heart, MapPin, Sparkles, Camera, Calendar,
                    Shirt, Briefcase, Package, FileText, PlayCircle, Headphones, Smartphone.
                  </p>
                  <Textarea
                    value={items}
                    onChange={(e) => setItems(e.target.value)}
                    rows={20}
                    className="font-mono text-xs"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features">
              <Card>
                <CardHeader>
                  <CardTitle>Daftar Keunggulan (JSON Array of String)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    rows={12}
                    className="font-mono text-xs"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="extra">
              <Card>
                <CardHeader>
                  <CardTitle>Bagian Tambahan (JSON Object)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Bisa berisi: stats[], schedule[], events[], bundle_title, bundle_description,
                    bundle_items[], bundle_button_text, bundle_whatsapp_text,
                    items_title, items_subtitle, schedule_title, events_title, dst.
                  </p>
                  <Textarea
                    value={extra}
                    onChange={(e) => setExtra(e.target.value)}
                    rows={20}
                    className="font-mono text-xs"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cta">
              <Card>
                <CardHeader><CardTitle>Call To Action</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {ctaField("title", "Judul")}
                  {ctaField("description", "Deskripsi", true)}
                  {ctaField("button_text", "Teks Tombol")}
                  {ctaField("whatsapp_text", "Pesan WhatsApp")}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </AdminLayout>
  );
}
