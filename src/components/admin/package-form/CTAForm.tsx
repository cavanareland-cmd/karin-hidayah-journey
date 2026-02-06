import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/admin/ImageUpload";
import { CTASection } from "./types";

interface CTAFormProps {
  ctaSection: CTASection;
  onChange: (section: CTASection) => void;
}

const CTAForm = ({ ctaSection, onChange }: CTAFormProps) => {
  const updateField = (field: keyof CTASection, value: string) => {
    onChange({ ...ctaSection, [field]: value });
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">📣 CTA Section (Banner Bawah)</Label>
      
      <ImageUpload
        label="Background Image"
        value={ctaSection.background_image}
        onChange={(url) => updateField("background_image", url)}
        folder="packages/cta"
        aspectRatio="video"
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="text-xs">Headline</Label>
          <Input
            placeholder="Wujudkan Niat Umrah Anda Bersama Kami"
            value={ctaSection.headline}
            onChange={(e) => updateField("headline", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Subheadline</Label>
          <Input
            placeholder="Konsultasi Gratis Sekarang"
            value={ctaSection.subheadline}
            onChange={(e) => updateField("subheadline", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-xs">Deskripsi</Label>
        <Textarea
          placeholder="Konsultasikan rencana Umrah Anda bersama tim..."
          value={ctaSection.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="text-xs">Teks Tombol CTA</Label>
          <Input
            placeholder="Hubungi Kami"
            value={ctaSection.button_text}
            onChange={(e) => updateField("button_text", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Link Tombol</Label>
          <Input
            placeholder="/contact"
            value={ctaSection.button_link}
            onChange={(e) => updateField("button_link", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CTAForm;
