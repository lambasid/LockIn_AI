import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2, X, Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface App {
  id: string;
  name: string;
  category: string;
}

interface AppGroup {
  id: string;
  name: string;
  apps: App[];
}

const installedApps: App[] = [
  { id: "1", name: "Instagram", category: "Social Media" },
  { id: "2", name: "TikTok", category: "Social Media" },
  { id: "3", name: "Snapchat", category: "Social Media" },
  { id: "4", name: "Minecraft", category: "Games" },
  { id: "5", name: "Roblox", category: "Games" },
  { id: "6", name: "YouTube", category: "Entertainment" },
  { id: "7", name: "Netflix", category: "Entertainment" },
  { id: "8", name: "Chrome", category: "Productivity" },
  { id: "9", name: "Discord", category: "Communication" },
];

const defaultGroups: AppGroup[] = [
  {
    id: "1",
    name: "Social Media",
    apps: [
      { id: "1", name: "Instagram", category: "Social Media" },
      { id: "2", name: "TikTok", category: "Social Media" },
      { id: "3", name: "Snapchat", category: "Social Media" },
    ],
  },
  {
    id: "2",
    name: "Games",
    apps: [
      { id: "4", name: "Minecraft", category: "Games" },
      { id: "5", name: "Roblox", category: "Games" },
    ],
  },
];

export const AppGroupScreen = () => {
  const [groups, setGroups] = React.useState<AppGroup[]>(defaultGroups);
  const [isAddingGroup, setIsAddingGroup] = React.useState(false);
  const [isEditingApps, setIsEditingApps] = React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState<AppGroup | null>(
    null,
  );
  const [newGroupName, setNewGroupName] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedApps, setSelectedApps] = React.useState<string[]>([]);

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      const newGroup: AppGroup = {
        id: Date.now().toString(),
        name: newGroupName,
        apps: [],
      };
      setGroups([...groups, newGroup]);
      setNewGroupName("");
      setIsAddingGroup(false);
      toast({
        title: "Group Created",
        description: `${newGroupName} has been created successfully.`,
      });
    }
  };

  const handleEditApps = (group: AppGroup) => {
    setSelectedGroup(group);
    setSelectedApps(group.apps.map((app) => app.id));
    setIsEditingApps(true);
  };

  const handleSaveApps = () => {
    if (selectedGroup) {
      const selectedAppObjects = installedApps.filter((app) =>
        selectedApps.includes(app.id),
      );

      setGroups(
        groups.map((group) =>
          group.id === selectedGroup.id
            ? { ...group, apps: selectedAppObjects }
            : group,
        ),
      );
      setIsEditingApps(false);
      toast({
        title: "Apps Updated",
        description: `${selectedGroup.name} apps have been updated.`,
      });
    }
  };

  const handleDeleteGroup = (groupId: string) => {
    const groupToDelete = groups.find((g) => g.id === groupId);
    if (groupToDelete) {
      setGroups(groups.filter((group) => group.id !== groupId));
      toast({
        title: "Group Deleted",
        description: `${groupToDelete.name} has been deleted.`,
      });
    }
  };

  const filteredApps = installedApps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const groupedApps = filteredApps.reduce(
    (acc, app) => {
      if (!acc[app.category]) {
        acc[app.category] = [];
      }
      acc[app.category].push(app);
      return acc;
    },
    {} as Record<string, App[]>,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">App Groups</h1>
            <p className="text-sm text-muted-foreground">
              Manage your app restrictions by groups
            </p>
          </div>
          <Button onClick={() => setIsAddingGroup(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Group
          </Button>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {groups.map((group) => (
            <AccordionItem
              key={group.id}
              value={group.id}
              className="border rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <AccordionTrigger className="hover:no-underline">
                  <span className="text-lg font-medium">{group.name}</span>
                </AccordionTrigger>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditApps(group);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Apps
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteGroup(group.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <AccordionContent>
                <div className="mt-4 space-y-2">
                  {group.apps.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No apps in this group
                    </p>
                  ) : (
                    group.apps.map((app) => (
                      <div
                        key={app.id}
                        className="flex items-center justify-between p-2 rounded-md bg-secondary"
                      >
                        <div>
                          <span className="font-medium">{app.name}</span>
                          <span className="ml-2 text-sm text-muted-foreground">
                            {app.category}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Dialog open={isAddingGroup} onOpenChange={setIsAddingGroup}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Enter group name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddingGroup(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddGroup}>Add Group</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditingApps} onOpenChange={setIsEditingApps}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Apps in {selectedGroup?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="max-h-[400px] overflow-y-auto space-y-4">
                {Object.entries(groupedApps).map(([category, apps]) => (
                  <div key={category} className="space-y-2">
                    <h3 className="font-medium text-sm text-muted-foreground">
                      {category}
                    </h3>
                    <div className="space-y-2">
                      {apps.map((app) => (
                        <div
                          key={app.id}
                          className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent"
                        >
                          <Checkbox
                            id={app.id}
                            checked={selectedApps.includes(app.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedApps([...selectedApps, app.id]);
                              } else {
                                setSelectedApps(
                                  selectedApps.filter((id) => id !== app.id),
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor={app.id}
                            className="flex-1 flex items-center justify-between cursor-pointer"
                          >
                            <span>{app.name}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditingApps(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveApps}>Save Changes</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
};

export default AppGroupScreen;
