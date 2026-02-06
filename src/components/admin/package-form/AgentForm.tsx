import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/admin/ImageUpload";
import { AgentInfo } from "./types";

interface AgentFormProps {
  agentInfo: AgentInfo;
  onChange: (info: AgentInfo) => void;
}

const AgentForm = ({ agentInfo, onChange }: AgentFormProps) => {
  const updateField = (field: keyof AgentInfo, value: string) => {
    onChange({ ...agentInfo, [field]: value });
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">👤 Agent / Contact Card</Label>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Nama Agent</Label>
            <Input
              placeholder="Febri Romadon"
              value={agentInfo.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Jabatan</Label>
            <Input
              placeholder="Agents"
              value={agentInfo.position}
              onChange={(e) => updateField("position", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Email</Label>
            <Input
              type="email"
              placeholder="admin@karinhidayahtour.com"
              value={agentInfo.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Teks Tombol</Label>
            <Input
              placeholder="Contact With Me"
              value={agentInfo.button_text}
              onChange={(e) => updateField("button_text", e.target.value)}
            />
          </div>
        </div>
        <div>
          <ImageUpload
            label="Foto Agent"
            value={agentInfo.photo_url}
            onChange={(url) => updateField("photo_url", url)}
            folder="agents"
            aspectRatio="square"
          />
        </div>
      </div>
    </div>
  );
};

export default AgentForm;
