import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/admin/ImageUpload";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { GalleryImage, GallerySection } from "./types";

interface GalleryFormProps {
  galleryImages: GalleryImage[];
  onChangeImages: (images: GalleryImage[]) => void;
  gallerySection: GallerySection;
  onChangeSection: (section: GallerySection) => void;
}

const GalleryForm = ({
  galleryImages,
  onChangeImages,
  gallerySection,
  onChangeSection,
}: GalleryFormProps) => {
  // Gallery Images
  const addImage = () => {
    onChangeImages([...galleryImages, { url: "", caption: "" }]);
  };

  const removeImage = (index: number) => {
    onChangeImages(galleryImages.filter((_, i) => i !== index));
  };

  const updateImage = (index: number, field: keyof GalleryImage, value: string) => {
    const updated = [...galleryImages];
    updated[index] = { ...updated[index], [field]: value };
    onChangeImages(updated);
  };

  // Gallery Section Images
  const addSectionImage = () => {
    onChangeSection({
      ...gallerySection,
      images: [...gallerySection.images, { url: "", caption: "" }]
    });
  };

  const removeSectionImage = (index: number) => {
    onChangeSection({
      ...gallerySection,
      images: gallerySection.images.filter((_, i) => i !== index)
    });
  };

  const updateSectionImage = (index: number, field: keyof GalleryImage, value: string) => {
    const updated = [...gallerySection.images];
    updated[index] = { ...updated[index], [field]: value };
    onChangeSection({ ...gallerySection, images: updated });
  };

  return (
    <div className="space-y-6">
      {/* Main Gallery Images */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-base font-semibold">🖼️ Galeri Utama</Label>
          <Button type="button" variant="outline" size="sm" onClick={addImage}>
            <Plus className="w-4 h-4 mr-1" /> Tambah Gambar
          </Button>
        </div>

        {galleryImages.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4 border rounded-md border-dashed">
            Belum ada gambar. Klik "Tambah Gambar" untuk menambahkan.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {galleryImages.map((img, index) => (
              <div key={index} className="relative border rounded-lg p-3 space-y-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 h-7 w-7"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
                <ImageUpload
                  label=""
                  value={img.url}
                  onChange={(url) => updateImage(index, "url", url)}
                  folder="packages/gallery"
                  aspectRatio="video"
                />
                <Input
                  placeholder="Caption (opsional)"
                  value={img.caption || ""}
                  onChange={(e) => updateImage(index, "caption", e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gallery Section (Momen Ibadah) */}
      <div className="space-y-3 border-t pt-6">
        <Label className="text-base font-semibold">🕌 Section "Momen Ibadah"</Label>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Judul</Label>
            <Input
              placeholder="Momen Ibadah yang Menguatkan Hati"
              value={gallerySection.title}
              onChange={(e) => onChangeSection({ ...gallerySection, title: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Subjudul</Label>
            <Input
              placeholder="Subtitle"
              value={gallerySection.subtitle}
              onChange={(e) => onChangeSection({ ...gallerySection, subtitle: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-xs">Deskripsi</Label>
          <Textarea
            placeholder="Umrah bukan sekadar perjalanan..."
            value={gallerySection.description}
            onChange={(e) => onChangeSection({ ...gallerySection, description: e.target.value })}
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Teks Tombol</Label>
            <Input
              placeholder="Explore now"
              value={gallerySection.button_text}
              onChange={(e) => onChangeSection({ ...gallerySection, button_text: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Link Tombol</Label>
            <Input
              placeholder="/gallery"
              value={gallerySection.button_link}
              onChange={(e) => onChangeSection({ ...gallerySection, button_link: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs">Gambar Section</Label>
            <Button type="button" variant="ghost" size="sm" onClick={addSectionImage} className="h-7">
              <Plus className="w-3 h-3 mr-1" /> Gambar
            </Button>
          </div>
          {gallerySection.images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {gallerySection.images.map((img, index) => (
                <div key={index} className="relative border rounded-lg p-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSectionImage(index)}
                    className="absolute -top-2 -right-2 h-6 w-6 bg-background"
                  >
                    <Trash2 className="w-3 h-3 text-destructive" />
                  </Button>
                  <ImageUpload
                    label=""
                    value={img.url}
                    onChange={(url) => updateSectionImage(index, "url", url)}
                    folder="packages/gallery-section"
                    aspectRatio="square"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryForm;
