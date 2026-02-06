import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Facility, NotIncludedItem } from "./types";

const iconOptions = [
  { value: "Wifi", label: "WiFi" },
  { value: "Coffee", label: "Coffee/Dining" },
  { value: "Utensils", label: "Utensils" },
  { value: "Car", label: "Car/Parking" },
  { value: "Bed", label: "Bed" },
  { value: "Bath", label: "Bath" },
  { value: "Dumbbell", label: "Gym/Wellness" },
  { value: "Plane", label: "Flight" },
  { value: "Bus", label: "Bus/Transport" },
  { value: "Hotel", label: "Hotel" },
  { value: "MapPin", label: "Location" },
  { value: "Package", label: "Package" },
  { value: "ShieldCheck", label: "Insurance" },
  { value: "Users", label: "Guide" },
  { value: "Clock", label: "Clock" },
  { value: "X", label: "Not Allowed" },
];

interface FacilitiesFormProps {
  facilities: Facility[];
  onChangeFacilities: (facilities: Facility[]) => void;
  notIncluded: NotIncludedItem[];
  onChangeNotIncluded: (items: NotIncludedItem[]) => void;
}

const FacilitiesForm = ({
  facilities,
  onChangeFacilities,
  notIncluded,
  onChangeNotIncluded,
}: FacilitiesFormProps) => {
  // Facilities (Included)
  const addFacility = () => {
    onChangeFacilities([...facilities, { icon: "Wifi", name: "" }]);
  };

  const removeFacility = (index: number) => {
    onChangeFacilities(facilities.filter((_, i) => i !== index));
  };

  const updateFacility = (index: number, field: keyof Facility, value: string) => {
    const updated = [...facilities];
    updated[index] = { ...updated[index], [field]: value };
    onChangeFacilities(updated);
  };

  // Not Included
  const addNotIncluded = () => {
    onChangeNotIncluded([...notIncluded, { icon: "X", text: "" }]);
  };

  const removeNotIncluded = (index: number) => {
    onChangeNotIncluded(notIncluded.filter((_, i) => i !== index));
  };

  const updateNotIncluded = (index: number, field: keyof NotIncludedItem, value: string) => {
    const updated = [...notIncluded];
    updated[index] = { ...updated[index], [field]: value };
    onChangeNotIncluded(updated);
  };

  return (
    <div className="space-y-6">
      {/* Facilities Included */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-base font-semibold">✅ Fasilitas Termasuk</Label>
          <Button type="button" variant="outline" size="sm" onClick={addFacility}>
            <Plus className="w-4 h-4 mr-1" /> Tambah
          </Button>
        </div>

        {facilities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4 border rounded-md border-dashed">
            Belum ada fasilitas. Klik "Tambah" untuk menambahkan.
          </p>
        ) : (
          <div className="space-y-2">
            {facilities.map((facility, index) => (
              <div key={index} className="flex gap-2 items-center">
                <select
                  className="w-32 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={facility.icon}
                  onChange={(e) => updateFacility(index, "icon", e.target.value)}
                >
                  {iconOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <Input
                  placeholder="Nama fasilitas"
                  value={facility.name}
                  onChange={(e) => updateFacility(index, "name", e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFacility(index)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Not Included */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-base font-semibold">❌ Tidak Termasuk / Ketentuan</Label>
          <Button type="button" variant="outline" size="sm" onClick={addNotIncluded}>
            <Plus className="w-4 h-4 mr-1" /> Tambah
          </Button>
        </div>

        {notIncluded.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4 border rounded-md border-dashed">
            Belum ada ketentuan. Klik "Tambah" untuk menambahkan.
          </p>
        ) : (
          <div className="space-y-2">
            {notIncluded.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <select
                  className="w-32 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={item.icon || "X"}
                  onChange={(e) => updateNotIncluded(index, "icon", e.target.value)}
                >
                  {iconOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <Input
                  placeholder="Deskripsi ketentuan"
                  value={item.text}
                  onChange={(e) => updateNotIncluded(index, "text", e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeNotIncluded(index)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilitiesForm;
