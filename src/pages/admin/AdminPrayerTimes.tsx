import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Clock } from "lucide-react";

interface PrayerTime {
  id: string;
  location_name: string;
  fajr_time: string | null;
  fajr_azan: string | null;
  zuhr_time: string | null;
  zuhr_azan: string | null;
  asr_time: string | null;
  asr_azan: string | null;
  maghrib_time: string | null;
  maghrib_azan: string | null;
  isha_time: string | null;
  isha_azan: string | null;
  jumah_time: string | null;
  jumah_azan: string | null;
  chourouk_time: string | null;
  is_active: boolean;
}

const AdminPrayerTimes = () => {
  const [prayerTime, setPrayerTime] = useState<PrayerTime | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    location_name: "",
    fajr_time: "",
    fajr_azan: "",
    zuhr_time: "",
    zuhr_azan: "",
    asr_time: "",
    asr_azan: "",
    maghrib_time: "",
    maghrib_azan: "",
    isha_time: "",
    isha_azan: "",
    jumah_time: "",
    jumah_azan: "",
    chourouk_time: "",
    is_active: true,
  });

  useEffect(() => {
    fetchPrayerTime();
  }, []);

  const fetchPrayerTime = async () => {
    try {
      const { data, error } = await supabase
        .from("prayer_times_settings")
        .select("*")
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      
      if (data) {
        setPrayerTime(data);
        setFormData({
          location_name: data.location_name,
          fajr_time: data.fajr_time || "",
          fajr_azan: data.fajr_azan || "",
          zuhr_time: data.zuhr_time || "",
          zuhr_azan: data.zuhr_azan || "",
          asr_time: data.asr_time || "",
          asr_azan: data.asr_azan || "",
          maghrib_time: data.maghrib_time || "",
          maghrib_azan: data.maghrib_azan || "",
          isha_time: data.isha_time || "",
          isha_azan: data.isha_azan || "",
          jumah_time: data.jumah_time || "",
          jumah_azan: data.jumah_azan || "",
          chourouk_time: data.chourouk_time || "",
          is_active: data.is_active,
        });
      }
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const timeData = {
        location_name: formData.location_name,
        fajr_time: formData.fajr_time || null,
        fajr_azan: formData.fajr_azan || null,
        zuhr_time: formData.zuhr_time || null,
        zuhr_azan: formData.zuhr_azan || null,
        asr_time: formData.asr_time || null,
        asr_azan: formData.asr_azan || null,
        maghrib_time: formData.maghrib_time || null,
        maghrib_azan: formData.maghrib_azan || null,
        isha_time: formData.isha_time || null,
        isha_azan: formData.isha_azan || null,
        jumah_time: formData.jumah_time || null,
        jumah_azan: formData.jumah_azan || null,
        chourouk_time: formData.chourouk_time || null,
        is_active: formData.is_active,
      };

      if (prayerTime) {
        const { error } = await supabase
          .from("prayer_times_settings")
          .update(timeData)
          .eq("id", prayerTime.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("prayer_times_settings")
          .insert(timeData);
        if (error) throw error;
      }

      toast({ title: "Berhasil", description: "Waktu sholat berhasil disimpan" });
      fetchPrayerTime();
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

  const PrayerTimeInput = ({ label, timeKey, azanKey }: { label: string; timeKey: string; azanKey: string }) => (
    <div className="grid grid-cols-3 gap-4 items-center py-3 border-b last:border-b-0">
      <div className="font-medium">{label}</div>
      <div className="space-y-1">
        <Label className="text-xs text-muted-foreground">Waktu Sholat</Label>
        <Input
          type="time"
          value={(formData as any)[timeKey]}
          onChange={(e) => setFormData({ ...formData, [timeKey]: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs text-muted-foreground">Waktu Azan</Label>
        <Input
          type="time"
          value={(formData as any)[azanKey]}
          onChange={(e) => setFormData({ ...formData, [azanKey]: e.target.value })}
        />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-48">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-serif">Waktu Sholat</h1>
          <p className="text-muted-foreground">Kelola jadwal waktu sholat</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Pengaturan Lokasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location_name">Nama Lokasi/Masjid</Label>
                  <Input
                    id="location_name"
                    value={formData.location_name}
                    onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
                    placeholder="Masjid Al-Hidayah"
                    required
                  />
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Tampilkan di Website</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Jadwal Waktu Sholat</CardTitle>
            </CardHeader>
            <CardContent>
              <PrayerTimeInput label="Subuh (Fajr)" timeKey="fajr_time" azanKey="fajr_azan" />
              <PrayerTimeInput label="Dzuhur" timeKey="zuhr_time" azanKey="zuhr_azan" />
              <PrayerTimeInput label="Ashar" timeKey="asr_time" azanKey="asr_azan" />
              <PrayerTimeInput label="Maghrib" timeKey="maghrib_time" azanKey="maghrib_azan" />
              <PrayerTimeInput label="Isya" timeKey="isha_time" azanKey="isha_azan" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Waktu Tambahan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 items-center py-3 border-b">
                <div className="font-medium">Jum'at</div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Waktu Sholat</Label>
                  <Input
                    type="time"
                    value={formData.jumah_time}
                    onChange={(e) => setFormData({ ...formData, jumah_time: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Waktu Khotbah</Label>
                  <Input
                    type="time"
                    value={formData.jumah_azan}
                    onChange={(e) => setFormData({ ...formData, jumah_azan: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center py-3">
                <div className="font-medium">Syuruq (Terbit Matahari)</div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Waktu</Label>
                  <Input
                    type="time"
                    value={formData.chourouk_time}
                    onChange={(e) => setFormData({ ...formData, chourouk_time: e.target.value })}
                  />
                </div>
                <div></div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSaving} size="lg">
              {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              <Save className="w-4 h-4 mr-2" />
              Simpan Waktu Sholat
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminPrayerTimes;
