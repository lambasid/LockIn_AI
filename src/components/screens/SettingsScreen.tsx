import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Smartphone, Cloud, Shield, RefreshCw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  settings: Setting[];
}

interface Setting {
  id: string;
  type: "switch" | "select";
  label: string;
  description?: string;
  value: boolean | string;
  options?: { value: string; label: string }[];
  badge?: string;
}

const defaultSections: SettingsSection[] = [
  {
    id: "notifications",
    title: "Notifications",
    description: "Manage your notification preferences",
    icon: <Bell className="h-5 w-5" />,
    settings: [
      {
        id: "class-reminders",
        type: "switch",
        label: "Class Reminders",
        description: "Receive notifications before classes start",
        value: true,
      },
      {
        id: "app-blocking",
        type: "switch",
        label: "App Blocking Alerts",
        description: "Get notified when apps are blocked/unblocked",
        value: true,
      },
      {
        id: "reminder-time",
        type: "select",
        label: "Reminder Time",
        value: "15",
        options: [
          { value: "5", label: "5 minutes before" },
          { value: "10", label: "10 minutes before" },
          { value: "15", label: "15 minutes before" },
          { value: "30", label: "30 minutes before" },
        ],
      },
    ],
  },
  {
    id: "app-control",
    title: "App Control",
    description: "Configure app blocking behavior",
    icon: <Shield className="h-5 w-5" />,
    settings: [
      {
        id: "global-blocking",
        type: "switch",
        label: "Global App Blocking",
        description: "Enable/disable all app restrictions",
        value: true,
        badge: "Active",
      },
      {
        id: "strict-mode",
        type: "switch",
        label: "Strict Mode",
        description: "Prevent disabling app blocking during class hours",
        value: false,
      },
      {
        id: "block-mode",
        type: "select",
        label: "Blocking Mode",
        value: "smart",
        options: [
          { value: "smart", label: "Smart (Based on schedule)" },
          { value: "manual", label: "Manual control" },
          { value: "always", label: "Always block" },
        ],
      },
    ],
  },
  {
    id: "sync",
    title: "Sync & Backup",
    description: "Manage your data across devices",
    icon: <Cloud className="h-5 w-5" />,
    settings: [
      {
        id: "auto-sync",
        type: "switch",
        label: "Auto-Sync",
        description: "Automatically sync changes across devices",
        value: true,
      },
      {
        id: "sync-frequency",
        type: "select",
        label: "Sync Frequency",
        value: "realtime",
        options: [
          { value: "realtime", label: "Real-time" },
          { value: "hourly", label: "Hourly" },
          { value: "daily", label: "Daily" },
        ],
      },
    ],
  },
];

export const SettingsScreen = () => {
  const [sections, setSections] =
    React.useState<SettingsSection[]>(defaultSections);
  const [isSyncing, setIsSyncing] = React.useState(false);

  const handleSettingChange = (
    sectionId: string,
    settingId: string,
    newValue: boolean | string,
  ) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            settings: section.settings.map((setting) => {
              if (setting.id === settingId) {
                // Special handling for global blocking
                if (settingId === "global-blocking") {
                  toast({
                    title: newValue
                      ? "App Blocking Enabled"
                      : "App Blocking Disabled",
                    description: newValue
                      ? "All app restrictions are now active"
                      : "App restrictions have been disabled",
                  });
                }
                return { ...setting, value: newValue };
              }
              return setting;
            }),
          };
        }
        return section;
      }),
    );
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      // Simulated sync
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: "Sync Complete",
        description: "Your settings have been synchronized across all devices",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your app preferences and controls
          </p>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleSync}
          disabled={isSyncing}
        >
          <RefreshCw className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
          {isSyncing ? "Syncing..." : "Sync Now"}
        </Button>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} className="space-y-4">
            <div className="flex items-center space-x-2">
              {section.icon}
              <div>
                <h2 className="text-lg font-semibold">{section.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {section.description}
                </p>
              </div>
            </div>

            <div className="ml-7 space-y-4">
              {section.settings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={setting.id}>{setting.label}</Label>
                      {setting.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {setting.badge}
                        </Badge>
                      )}
                    </div>
                    {setting.description && (
                      <p className="text-sm text-muted-foreground">
                        {setting.description}
                      </p>
                    )}
                  </div>
                  {setting.type === "switch" ? (
                    <Switch
                      id={setting.id}
                      checked={setting.value as boolean}
                      onCheckedChange={(checked) =>
                        handleSettingChange(section.id, setting.id, checked)
                      }
                    />
                  ) : (
                    <Select
                      value={setting.value as string}
                      onValueChange={(value) =>
                        handleSettingChange(section.id, setting.id, value)
                      }
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {setting.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SettingsScreen;
