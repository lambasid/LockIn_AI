import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AppGroup {
  id: string;
  name: string;
}

interface ClassManagementFormProps {
  onSubmit?: (data: ClassFormData) => void;
  onCancel?: () => void;
  appGroups?: AppGroup[];
}

export interface ClassFormData {
  className: string;
  startTime: string;
  endTime: string;
  appGroupId: string;
  blockingEnabled: boolean;
}

const defaultAppGroups: AppGroup[] = [
  { id: "social", name: "Social Media Apps" },
  { id: "games", name: "Gaming Apps" },
  { id: "education", name: "Educational Apps" },
];

const ClassManagementForm: React.FC<ClassManagementFormProps> = ({
  onSubmit = () => {},
  onCancel = () => {},
  appGroups = defaultAppGroups,
}) => {
  const [formData, setFormData] = React.useState<ClassFormData>({
    className: "",
    startTime: "",
    endTime: "",
    appGroupId: "",
    blockingEnabled: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    field: keyof ClassFormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="className">Class Name</Label>
          <Input
            id="className"
            placeholder="Enter class name"
            value={formData.className}
            onChange={(e) => handleChange("className", e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={formData.startTime}
              onChange={(e) => handleChange("startTime", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="time"
              value={formData.endTime}
              onChange={(e) => handleChange("endTime", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="appGroup">App Group</Label>
          <Select
            value={formData.appGroupId}
            onValueChange={(value) => handleChange("appGroupId", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an app group" />
            </SelectTrigger>
            <SelectContent>
              {appGroups.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="blocking">App Blocking</Label>
            <p className="text-sm text-muted-foreground">
              Enable app restrictions during class
            </p>
          </div>
          <Switch
            id="blocking"
            checked={formData.blockingEnabled}
            onCheckedChange={(checked) =>
              handleChange("blockingEnabled", checked)
            }
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Class</Button>
        </div>
      </form>
    </Card>
  );
};

export default ClassManagementForm;
