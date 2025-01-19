import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import QuickActionCards from "./dashboard/QuickActionCards";
import StatusGrid from "./dashboard/StatusGrid";
import AppLockPanel from "./dashboard/AppLockPanel";
import SearchFilterBar from "./dashboard/SearchFilterBar";
import UploadSchedule from "./dashboard/UploadSchedule";
import ClassManagementForm from "./dashboard/ClassManagementForm";

interface HomeProps {
  onSearch?: (query: string) => void;
  onFilter?: (filters: string[]) => void;
  onToggleAppLock?: (appId: string) => void;
}

const Home = ({
  onSearch = () => {},
  onFilter = () => {},
  onToggleAppLock = () => {},
}: HomeProps) => {
  const navigate = useNavigate();
  const [uploadDialogOpen, setUploadDialogOpen] = React.useState(false);
  const [createClassDialogOpen, setCreateClassDialogOpen] =
    React.useState(false);

  return (
    <div className="min-h-screen bg-gray-100 pb-8">
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your class schedules and app restrictions
          </p>
        </div>

        <QuickActionCards
          onUploadClick={() => setUploadDialogOpen(true)}
          onCreateClick={() => setCreateClassDialogOpen(true)}
        />

        <div className="space-y-6 bg-white rounded-lg shadow">
          <SearchFilterBar onSearch={onSearch} onFilter={onFilter} />

          <StatusGrid />

          <div className="p-6">
            <AppLockPanel onToggleLock={onToggleAppLock} />
          </div>
        </div>

        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogContent className="max-w-4xl p-0">
            <UploadSchedule onClose={() => setUploadDialogOpen(false)} />
          </DialogContent>
        </Dialog>

        <Dialog
          open={createClassDialogOpen}
          onOpenChange={setCreateClassDialogOpen}
        >
          <DialogContent className="max-w-2xl p-0">
            <ClassManagementForm
              onSubmit={(data) => {
                console.log("Class data:", data);
                setCreateClassDialogOpen(false);
              }}
              onCancel={() => setCreateClassDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Home;
