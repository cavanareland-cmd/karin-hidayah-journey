import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/admin/ImageUpload";
import { Plus, Trash2 } from "lucide-react";
import { RelatedPackage } from "./types";

interface RelatedPackagesFormProps {
  packages: RelatedPackage[];
  onChange: (packages: RelatedPackage[]) => void;
}

const RelatedPackagesForm = ({ packages, onChange }: RelatedPackagesFormProps) => {
  const addPackage = () => {
    onChange([
      ...packages,
      {
        id: crypto.randomUUID(),
        name: "",
        image: "",
        link: "",
        button_text: "BOOK NOW"
      }
    ]);
  };

  const removePackage = (index: number) => {
    onChange(packages.filter((_, i) => i !== index));
  };

  const updatePackage = (index: number, field: keyof RelatedPackage, value: string) => {
    const updated = [...packages];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-base font-semibold">🧳 Paket Lainnya (Related)</Label>
        <Button type="button" variant="outline" size="sm" onClick={addPackage}>
          <Plus className="w-4 h-4 mr-1" /> Tambah
        </Button>
      </div>

      {packages.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4 border rounded-md border-dashed">
          Belum ada paket terkait. Klik "Tambah" untuk menambahkan.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {packages.map((pkg, index) => (
            <div key={pkg.id} className="relative border rounded-lg p-3 space-y-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removePackage(index)}
                className="absolute top-1 right-1 h-7 w-7"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>

              <ImageUpload
                label=""
                value={pkg.image}
                onChange={(url) => updatePackage(index, "image", url)}
                folder="packages/related"
                aspectRatio="video"
              />

              <div className="space-y-1">
                <Label className="text-xs">Nama Destinasi</Label>
                <Input
                  placeholder="Mesir"
                  value={pkg.name}
                  onChange={(e) => updatePackage(index, "name", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Link</Label>
                  <Input
                    placeholder="/package/..."
                    value={pkg.link}
                    onChange={(e) => updatePackage(index, "link", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Teks Tombol</Label>
                  <Input
                    placeholder="BOOK NOW"
                    value={pkg.button_text}
                    onChange={(e) => updatePackage(index, "button_text", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedPackagesForm;
