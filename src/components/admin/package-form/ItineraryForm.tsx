import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUpload from "@/components/admin/ImageUpload";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { ItineraryDay, ItineraryActivity } from "./types";

interface ItineraryFormProps {
  itinerary: ItineraryDay[];
  onChange: (itinerary: ItineraryDay[]) => void;
}

const weatherOptions = ["Sunny", "Cloudy", "Rainy", "Partly Cloudy", "Clear"];

const ItineraryForm = ({ itinerary, onChange }: ItineraryFormProps) => {
  const addDay = () => {
    const newDay: ItineraryDay = {
      day: itinerary.length + 1,
      title: "",
      temperature: "",
      weather: "Sunny",
      description: "",
      activities: [],
      thumbnail: ""
    };
    onChange([...itinerary, newDay]);
  };

  const removeDay = (index: number) => {
    const updated = itinerary.filter((_, i) => i !== index);
    // Re-number days
    const renumbered = updated.map((day, i) => ({ ...day, day: i + 1 }));
    onChange(renumbered);
  };

  const updateDay = (index: number, field: keyof ItineraryDay, value: any) => {
    const updated = [...itinerary];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addActivity = (dayIndex: number) => {
    const updated = [...itinerary];
    updated[dayIndex].activities.push({ text: "", link: "" });
    onChange(updated);
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const updated = [...itinerary];
    updated[dayIndex].activities = updated[dayIndex].activities.filter((_, i) => i !== activityIndex);
    onChange(updated);
  };

  const updateActivity = (dayIndex: number, activityIndex: number, field: keyof ItineraryActivity, value: string) => {
    const updated = [...itinerary];
    updated[dayIndex].activities[activityIndex] = {
      ...updated[dayIndex].activities[activityIndex],
      [field]: value
    };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-base font-semibold">Itinerary</Label>
        <Button type="button" variant="outline" size="sm" onClick={addDay}>
          <Plus className="w-4 h-4 mr-1" /> Tambah Hari
        </Button>
      </div>

      {itinerary.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4 border rounded-md border-dashed">
          Belum ada itinerary. Klik "Tambah Hari" untuk menambahkan.
        </p>
      ) : (
        <div className="space-y-4">
          {itinerary.map((day, dayIndex) => (
            <Card key={dayIndex} className="border-l-4 border-l-primary">
              <CardHeader className="py-3 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                    Hari {day.day}
                  </CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDay(dayIndex)}
                    className="h-8 w-8"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="py-3 px-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Judul Rute</Label>
                    <Input
                      placeholder="Jeddah → Makkah"
                      value={day.title}
                      onChange={(e) => updateDay(dayIndex, "title", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Suhu</Label>
                      <Input
                        placeholder="10°"
                        value={day.temperature || ""}
                        onChange={(e) => updateDay(dayIndex, "temperature", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Cuaca</Label>
                      <select
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={day.weather || "Sunny"}
                        onChange={(e) => updateDay(dayIndex, "weather", e.target.value)}
                      >
                        {weatherOptions.map((w) => (
                          <option key={w} value={w}>{w}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Deskripsi Kegiatan</Label>
                  <Textarea
                    placeholder="Deskripsi kegiatan hari ini..."
                    value={day.description || ""}
                    onChange={(e) => updateDay(dayIndex, "description", e.target.value)}
                    rows={2}
                  />
                </div>

                <ImageUpload
                  label="Thumbnail/Map"
                  value={day.thumbnail || ""}
                  onChange={(url) => updateDay(dayIndex, "thumbnail", url)}
                  folder="packages/itinerary"
                  aspectRatio="video"
                />

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs">Aktivitas</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => addActivity(dayIndex)}
                      className="h-7 text-xs"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Aktivitas
                    </Button>
                  </div>
                  {day.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex gap-2">
                      <Input
                        placeholder="Nama aktivitas"
                        value={activity.text}
                        onChange={(e) => updateActivity(dayIndex, actIndex, "text", e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Link (opsional)"
                        value={activity.link || ""}
                        onChange={(e) => updateActivity(dayIndex, actIndex, "link", e.target.value)}
                        className="w-40"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeActivity(dayIndex, actIndex)}
                        className="h-10 w-10 shrink-0"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItineraryForm;
