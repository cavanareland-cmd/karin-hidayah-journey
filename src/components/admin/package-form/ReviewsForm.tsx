import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import ImageUpload from "@/components/admin/ImageUpload";
import { Plus, Trash2, Star } from "lucide-react";
import { ReviewTestimonial, ReviewStats } from "./types";

interface ReviewsFormProps {
  reviewStats: ReviewStats;
  onChangeStats: (stats: ReviewStats) => void;
  reviews: ReviewTestimonial[];
  onChangeReviews: (reviews: ReviewTestimonial[]) => void;
}

const ReviewsForm = ({
  reviewStats,
  onChangeStats,
  reviews,
  onChangeReviews,
}: ReviewsFormProps) => {
  const updateStats = (field: string, value: number) => {
    if (field.startsWith("breakdown.")) {
      const star = field.split(".")[1];
      onChangeStats({
        ...reviewStats,
        breakdown: {
          ...reviewStats.breakdown,
          [star]: value
        }
      });
    } else {
      onChangeStats({
        ...reviewStats,
        [field]: value
      });
    }
  };

  const addReview = () => {
    onChangeReviews([
      ...reviews,
      {
        name: "",
        role: "",
        content: "",
        avatar: "",
        recommended: true
      }
    ]);
  };

  const removeReview = (index: number) => {
    onChangeReviews(reviews.filter((_, i) => i !== index));
  };

  const updateReview = (index: number, field: keyof ReviewTestimonial, value: any) => {
    const updated = [...reviews];
    updated[index] = { ...updated[index], [field]: value };
    onChangeReviews(updated);
  };

  return (
    <div className="space-y-6">
      {/* Review Statistics */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">⭐ Statistik Review</Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Total Reviews</Label>
            <Input
              type="number"
              placeholder="4200"
              value={reviewStats.total_reviews || ""}
              onChange={(e) => updateStats("total_reviews", parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Rating Rata-rata</Label>
            <Input
              type="number"
              step="0.1"
              placeholder="4.5"
              value={reviewStats.average_rating || ""}
              onChange={(e) => updateStats("average_rating", parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Breakdown Rating</Label>
          <div className="grid grid-cols-5 gap-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{star}</span>
                </div>
                <Input
                  type="number"
                  placeholder="0"
                  value={reviewStats.breakdown[star.toString() as keyof typeof reviewStats.breakdown] || ""}
                  onChange={(e) => updateStats(`breakdown.${star}`, parseInt(e.target.value) || 0)}
                  className="h-8"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-base font-semibold">💬 Testimonial</Label>
          <Button type="button" variant="outline" size="sm" onClick={addReview}>
            <Plus className="w-4 h-4 mr-1" /> Tambah
          </Button>
        </div>

        {reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4 border rounded-md border-dashed">
            Belum ada testimonial. Klik "Tambah" untuk menambahkan.
          </p>
        ) : (
          <div className="space-y-3">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="py-3 px-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Nama</Label>
                        <Input
                          placeholder="Arif Santoso"
                          value={review.name}
                          onChange={(e) => updateReview(index, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Role/Jabatan</Label>
                        <Input
                          placeholder="Head of Transactions"
                          value={review.role}
                          onChange={(e) => updateReview(index, "role", e.target.value)}
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeReview(index)}
                      className="ml-2"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs">Isi Review</Label>
                    <Textarea
                      placeholder="Professional, responsive, and genuinely helpful..."
                      value={review.content}
                      onChange={(e) => updateReview(index, "content", e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <ImageUpload
                        label="Avatar"
                        value={review.avatar || ""}
                        onChange={(url) => updateReview(index, "avatar", url)}
                        folder="reviews/avatars"
                        aspectRatio="square"
                      />
                    </div>
                    <div className="flex items-center gap-2 pb-2">
                      <Switch
                        checked={review.recommended}
                        onCheckedChange={(checked) => updateReview(index, "recommended", checked)}
                      />
                      <Label className="text-xs">Recommended</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsForm;
