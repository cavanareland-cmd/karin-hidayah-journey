import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useArrangementSection } from "@/hooks/useSupabaseData";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, LayoutGrid } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

const AdminArrangementSection = () => {
  const { data: sections, isLoading } = useArrangementSection();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  // Left card state
  const [leftCard, setLeftCard] = useState({
    id: "",
    title: "",
    subtitle: "",
    badge_text: "",
    image_url: "",
  });
  
  // Center CTA state
  const [centerCta, setCenterCta] = useState({
    id: "",
    title: "",
    subtitle: "",
    description: "",
    button_text: "",
    button_link: "",
  });
  
  // Right card state
  const [rightCard, setRightCard] = useState({
    id: "",
    title: "",
    date_text: "",
    location_text: "",
    spots_text: "",
    image_url: "",
  });

  useEffect(() => {
    if (sections) {
      const left = sections.find((s) => s.section_key === "left_card");
      const center = sections.find((s) => s.section_key === "center_cta");
      const right = sections.find((s) => s.section_key === "right_card");
      
      if (left) {
        setLeftCard({
          id: left.id,
          title: left.title || "",
          subtitle: left.subtitle || "",
          badge_text: left.badge_text || "",
          image_url: left.image_url || "",
        });
      }
      
      if (center) {
        setCenterCta({
          id: center.id,
          title: center.title || "",
          subtitle: center.subtitle || "",
          description: center.description || "",
          button_text: center.button_text || "",
          button_link: center.button_link || "",
        });
      }
      
      if (right) {
        setRightCard({
          id: right.id,
          title: right.title || "",
          date_text: right.date_text || "",
          location_text: right.location_text || "",
          spots_text: right.spots_text || "",
          image_url: right.image_url || "",
        });
      }
    }
  }, [sections]);

  const handleSaveLeftCard = async () => {
    setSaving(true);
    try {
      if (leftCard.id) {
        const { error } = await supabase
          .from("arrangement_section")
          .update({
            title: leftCard.title,
            subtitle: leftCard.subtitle,
            badge_text: leftCard.badge_text,
            image_url: leftCard.image_url,
          })
          .eq("id", leftCard.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("arrangement_section")
          .insert({
            section_key: "left_card",
            title: leftCard.title,
            subtitle: leftCard.subtitle,
            badge_text: leftCard.badge_text,
            image_url: leftCard.image_url,
            order_index: 1,
          });
        if (error) throw error;
      }
      toast({ title: "Berhasil", description: "Kartu kiri berhasil disimpan" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCenterCta = async () => {
    setSaving(true);
    try {
      if (centerCta.id) {
        const { error } = await supabase
          .from("arrangement_section")
          .update({
            title: centerCta.title,
            subtitle: centerCta.subtitle,
            description: centerCta.description,
            button_text: centerCta.button_text,
            button_link: centerCta.button_link,
          })
          .eq("id", centerCta.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("arrangement_section")
          .insert({
            section_key: "center_cta",
            title: centerCta.title,
            subtitle: centerCta.subtitle,
            description: centerCta.description,
            button_text: centerCta.button_text,
            button_link: centerCta.button_link,
            order_index: 2,
          });
        if (error) throw error;
      }
      toast({ title: "Berhasil", description: "CTA tengah berhasil disimpan" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveRightCard = async () => {
    setSaving(true);
    try {
      if (rightCard.id) {
        const { error } = await supabase
          .from("arrangement_section")
          .update({
            title: rightCard.title,
            date_text: rightCard.date_text,
            location_text: rightCard.location_text,
            spots_text: rightCard.spots_text,
            image_url: rightCard.image_url,
          })
          .eq("id", rightCard.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("arrangement_section")
          .insert({
            section_key: "right_card",
            title: rightCard.title,
            date_text: rightCard.date_text,
            location_text: rightCard.location_text,
            spots_text: rightCard.spots_text,
            image_url: rightCard.image_url,
            order_index: 3,
          });
        if (error) throw error;
      }
      toast({ title: "Berhasil", description: "Kartu kanan berhasil disimpan" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <LayoutGrid className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Arrangement Section</h1>
            <p className="text-muted-foreground">Kelola konten section 3 kartu di homepage</p>
          </div>
        </div>

        <Tabs defaultValue="left" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="left">Kartu Kiri</TabsTrigger>
            <TabsTrigger value="center">CTA Tengah</TabsTrigger>
            <TabsTrigger value="right">Kartu Kanan</TabsTrigger>
          </TabsList>

          {/* Left Card Tab */}
          <TabsContent value="left">
            <Card>
              <CardHeader>
                <CardTitle>Kartu Oleh-oleh (Kiri)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Badge Text</Label>
                      <Input
                        value={leftCard.badge_text}
                        onChange={(e) => setLeftCard({ ...leftCard, badge_text: e.target.value })}
                        placeholder="NEW SEASON"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Judul Baris 1</Label>
                      <Input
                        value={leftCard.title}
                        onChange={(e) => setLeftCard({ ...leftCard, title: e.target.value })}
                        placeholder="OLEH-OLEH"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Judul Baris 2</Label>
                      <Input
                        value={leftCard.subtitle}
                        onChange={(e) => setLeftCard({ ...leftCard, subtitle: e.target.value })}
                        placeholder="HAJI DAN UMRAH"
                      />
                    </div>
                  </div>
                  <ImageUpload
                    value={leftCard.image_url}
                    onChange={(url) => setLeftCard({ ...leftCard, image_url: url })}
                    folder="arrangement"
                    label="Gambar Kartu"
                  />
                </div>
                <Button onClick={handleSaveLeftCard} disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  Simpan Kartu Kiri
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Center CTA Tab */}
          <TabsContent value="center">
            <Card>
              <CardHeader>
                <CardTitle>CTA Tengah</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Judul Baris 1 (dengan highlight)</Label>
                    <Input
                      value={centerCta.title}
                      onChange={(e) => setCenterCta({ ...centerCta, title: e.target.value })}
                      placeholder="Arrange your"
                    />
                    <p className="text-xs text-muted-foreground">Kata terakhir akan di-highlight dengan warna primary</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Judul Baris 2 (dengan highlight)</Label>
                    <Input
                      value={centerCta.subtitle}
                      onChange={(e) => setCenterCta({ ...centerCta, subtitle: e.target.value })}
                      placeholder="and place perfectly."
                    />
                    <p className="text-xs text-muted-foreground">Kata pertama akan di-highlight dengan warna primary</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Deskripsi</Label>
                  <Textarea
                    value={centerCta.description}
                    onChange={(e) => setCenterCta({ ...centerCta, description: e.target.value })}
                    placeholder="Plan your trip to explore the world..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Teks Tombol</Label>
                    <Input
                      value={centerCta.button_text}
                      onChange={(e) => setCenterCta({ ...centerCta, button_text: e.target.value })}
                      placeholder="Get Started"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Link Tombol</Label>
                    <Input
                      value={centerCta.button_link}
                      onChange={(e) => setCenterCta({ ...centerCta, button_link: e.target.value })}
                      placeholder="/paket-umrah"
                    />
                  </div>
                </div>
                <Button onClick={handleSaveCenterCta} disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  Simpan CTA Tengah
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Right Card Tab */}
          <TabsContent value="right">
            <Card>
              <CardHeader>
                <CardTitle>Kartu Travel (Kanan)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Judul</Label>
                      <Input
                        value={rightCard.title}
                        onChange={(e) => setRightCard({ ...rightCard, title: e.target.value })}
                        placeholder="Travelling to Bali"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Tanggal</Label>
                      <Input
                        value={rightCard.date_text}
                        onChange={(e) => setRightCard({ ...rightCard, date_text: e.target.value })}
                        placeholder="21 Oct - 24 Oct 2024"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Label Lokasi</Label>
                        <Input
                          value={rightCard.location_text}
                          onChange={(e) => setRightCard({ ...rightCard, location_text: e.target.value })}
                          placeholder="Total"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Jumlah Spots</Label>
                        <Input
                          value={rightCard.spots_text}
                          onChange={(e) => setRightCard({ ...rightCard, spots_text: e.target.value })}
                          placeholder="7 Spots"
                        />
                      </div>
                    </div>
                  </div>
                  <ImageUpload
                    value={rightCard.image_url}
                    onChange={(url) => setRightCard({ ...rightCard, image_url: url })}
                    folder="arrangement"
                    label="Gambar Kartu"
                  />
                </div>
                <Button onClick={handleSaveRightCard} disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  Simpan Kartu Kanan
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminArrangementSection;