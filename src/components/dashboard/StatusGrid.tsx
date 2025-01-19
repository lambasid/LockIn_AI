import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ClassStatus {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
  students: number;
  description?: string;
}

interface StatusGridProps {
  classes?: ClassStatus[];
}

const defaultClasses: ClassStatus[] = [
  {
    id: "1",
    name: "Mathematics 101",
    startTime: "09:00 AM",
    endTime: "10:30 AM",
    isActive: true,
    students: 25,
    description: "Introduction to Calculus and Linear Algebra",
  },
  {
    id: "2",
    name: "Physics Lab",
    startTime: "11:00 AM",
    endTime: "12:30 PM",
    isActive: false,
    students: 18,
    description: "Practical experiments in mechanics and electricity",
  },
  {
    id: "3",
    name: "English Literature",
    startTime: "02:00 PM",
    endTime: "03:30 PM",
    isActive: true,
    students: 30,
    description: "Analysis of contemporary literature and poetry",
  },
  {
    id: "4",
    name: "Computer Science",
    startTime: "04:00 PM",
    endTime: "05:30 PM",
    isActive: false,
    students: 22,
    description: "Programming fundamentals and algorithms",
  },
];

const StatusGrid = ({
  classes: initialClasses = defaultClasses,
}: StatusGridProps) => {
  const [classes, setClasses] = React.useState<ClassStatus[]>(initialClasses);
  const [selectedClass, setSelectedClass] = React.useState<ClassStatus | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleToggleStatus = (classId: string) => {
    setClasses((prevClasses) =>
      prevClasses.map((classItem) => {
        if (classItem.id === classId) {
          const newState = !classItem.isActive;
          toast({
            title: `${classItem.name} ${newState ? "Activated" : "Deactivated"}`,
            description: `Class status has been updated.`,
          });
          return { ...classItem, isActive: newState };
        }
        return classItem;
      }),
    );
  };

  const handleCardClick = (classItem: ClassStatus) => {
    setSelectedClass(classItem);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full bg-background p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Class Status Overview</h2>
        <Badge variant="outline" className="px-3 py-1">
          {classes.filter((c) => c.isActive).length} Active Classes
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {classes.map((classItem) => (
          <TooltipProvider key={classItem.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card
                  className="p-4 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => handleCardClick(classItem)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold truncate mr-2">
                      {classItem.name}
                    </h3>
                    <Badge
                      variant={classItem.isActive ? "default" : "secondary"}
                      className={`${classItem.isActive ? "bg-green-500" : "bg-gray-400"} cursor-pointer`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStatus(classItem.id);
                      }}
                    >
                      {classItem.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>{`${classItem.startTime} - ${classItem.endTime}`}</p>
                    <p>{`${classItem.students} students`}</p>
                  </div>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to view class details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          {selectedClass && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedClass.name}</DialogTitle>
                <DialogDescription>
                  Class Details and Management
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Status:</span>
                    <Badge
                      variant={selectedClass.isActive ? "default" : "secondary"}
                      className={`${selectedClass.isActive ? "bg-green-500" : "bg-gray-400"}`}
                    >
                      {selectedClass.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Time:</span>
                    <span>{`${selectedClass.startTime} - ${selectedClass.endTime}`}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Students:</span>
                    <span>{selectedClass.students}</span>
                  </div>
                  {selectedClass.description && (
                    <div className="mt-4">
                      <span className="font-medium">Description:</span>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {selectedClass.description}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      handleToggleStatus(selectedClass.id);
                      setIsDialogOpen(false);
                    }}
                  >
                    {selectedClass.isActive ? "Deactivate" : "Activate"} Class
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StatusGrid;
