import React from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface AppLockItem {
  id: string;
  name: string;
  isLocked: boolean;
  category: string;
}

interface AppLockPanelProps {
  apps?: AppLockItem[];
  onToggleLock?: (appId: string) => void;
}

const defaultApps: AppLockItem[] = [
  { id: "1", name: "Instagram", isLocked: true, category: "Social Media" },
  { id: "2", name: "TikTok", isLocked: true, category: "Social Media" },
  { id: "3", name: "YouTube", isLocked: false, category: "Entertainment" },
  { id: "4", name: "Snapchat", isLocked: true, category: "Social Media" },
  { id: "5", name: "Games", isLocked: false, category: "Entertainment" },
];

const AppLockPanel: React.FC<AppLockPanelProps> = () => {
  const [apps, setApps] = React.useState<AppLockItem[]>(defaultApps);

  const handleToggleLock = (appId: string) => {
    setApps((prevApps) =>
      prevApps.map((app) => {
        if (app.id === appId) {
          const newState = !app.isLocked;
          toast({
            title: `${app.name} ${newState ? "Locked" : "Unlocked"}`,
            description: `${app.name} has been ${newState ? "locked" : "unlocked"}.`,
          });
          return { ...app, isLocked: newState };
        }
        return app;
      }),
    );
  };

  return (
    <Card className="w-full p-6 bg-white">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">App Restrictions</h2>
          <Badge variant="outline" className="px-3 py-1">
            {apps.filter((app) => app.isLocked).length} Apps Locked
          </Badge>
        </div>

        <div className="grid gap-4">
          {apps.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/10 transition-colors"
            >
              <div className="flex items-center space-x-4">
                {app.isLocked ? (
                  <Lock className="h-5 w-5 text-destructive" />
                ) : (
                  <Unlock className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <h3 className="font-medium">{app.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {app.category}
                  </p>
                </div>
              </div>
              <Switch
                checked={app.isLocked}
                onCheckedChange={() => handleToggleLock(app.id)}
                aria-label={`Toggle ${app.name} lock`}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default AppLockPanel;
