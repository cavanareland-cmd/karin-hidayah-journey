import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/admin/ImageUpload";
import { Plus, Trash2 } from "lucide-react";
import { HotelInfo, TrustBadge } from "./types";

interface Props {
  permitNumber: string;
  airline: string;
  route: string;
  depositAmount: string;
  whatsappNumber: string;
  hotels: { madinah: HotelInfo; makkah: HotelInfo };
  trustBadges: TrustBadge[];
  onChange: (patch: Partial<{
    permit_number: string;
    airline: string;
    route: string;
    deposit_amount: string;
    whatsapp_number: string;
    hotels: { madinah: HotelInfo; makkah: HotelInfo };
    trust_badges: TrustBadge[];
  }>) => void;
}

const HotelBlock = ({
  label,
  value,
  onChange,
  folder,
}: {
  label: string;
  value: HotelInfo;
  onChange: (v: HotelInfo) => void;
  folder: string;
}) => (
  <div className="border rounded-lg p-4 space-y-3">
    <Label className="text-base font-semibold">🏨 Hotel {label}</Label>
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1">
        <Label className="text-xs">Nama Hotel</Label>
        <Input
          placeholder="Al Saha"
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Rating Bintang</Label>
        <Input
          type="number"
          min={1}
          max={5}
          value={value.stars}
          onChange={(e) => onChange({ ...value, stars: parseInt(e.target.value) || 4 })}
        />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1">
        <Label className="text-xs">Jarak / Deskripsi</Label>
        <Input
          placeholder="± 50m ke Masjid Nabawi"
          value={value.distance}
          onChange={(e) => onChange({ ...value, distance: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Catatan (mis. / Setaraf)</Label>
        <Input
          placeholder="/ Setaraf"
          value={value.note || ""}
          onChange={(e) => onChange({ ...value, note: e.target.value })}
        />
      </div>
    </div>
    <ImageUpload
      label="Foto Hotel"
      value={value.image}
      onChange={(url) => onChange({ ...value, image: url })}
      folder={folder}
      aspectRatio="video"
    />
  </div>
);

const DetailInfoForm = ({
  permitNumber,
  airline,
  route,
  depositAmount,
  whatsappNumber,
  hotels,
  trustBadges,
  onChange,
}: Props) => {
  const updateBadge = (i: number, field: keyof TrustBadge, v: string) => {
    const next = [...trustBadges];
    next[i] = { ...next[i], [field]: v };
    onChange({ trust_badges: next });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>No. Izin PPIU / PIHK</Label>
          <Input
            placeholder="04042300022560003"
            value={permitNumber}
            onChange={(e) => onChange({ permit_number: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label>Nomor WhatsApp</Label>
          <Input
            placeholder="0811-3107-707"
            value={whatsappNumber}
            onChange={(e) => onChange({ whatsapp_number: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <Label>Maskapai</Label>
          <Input
            placeholder="Lion Air"
            value={airline}
            onChange={(e) => onChange({ airline: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label>Rute Penerbangan</Label>
          <Input
            placeholder="SUB-JED"
            value={route}
            onChange={(e) => onChange({ route: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label>DP / Deposit (IDR)</Label>
          <Input
            type="number"
            placeholder="5000000"
            value={depositAmount}
            onChange={(e) => onChange({ deposit_amount: e.target.value })}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <HotelBlock
          label="Madinah"
          value={hotels.madinah}
          onChange={(v) => onChange({ hotels: { ...hotels, madinah: v } })}
          folder="packages/hotels/madinah"
        />
        <HotelBlock
          label="Makkah"
          value={hotels.makkah}
          onChange={(v) => onChange({ hotels: { ...hotels, makkah: v } })}
          folder="packages/hotels/makkah"
        />
      </div>

      <div className="space-y-2 border rounded-lg p-4">
        <div className="flex justify-between items-center">
          <Label className="text-base font-semibold">🛡️ Trust Badges</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onChange({ trust_badges: [...trustBadges, { title: "", sub: "" }] })}
          >
            <Plus className="w-4 h-4 mr-1" /> Tambah
          </Button>
        </div>
        {trustBadges.map((b, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end">
            <div className="space-y-1">
              <Label className="text-xs">Judul</Label>
              <Input value={b.title} onChange={(e) => updateBadge(i, "title", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Subjudul</Label>
              <Input value={b.sub} onChange={(e) => updateBadge(i, "sub", e.target.value)} />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onChange({ trust_badges: trustBadges.filter((_, idx) => idx !== i) })}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailInfoForm;
