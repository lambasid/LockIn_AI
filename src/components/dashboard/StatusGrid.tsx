import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  },
  {
    id: "2",
    name: "Physics Lab",
    startTime: "11:00 AM",
    endTime: "12:30 PM",
    isActive: false,
    students: 18,
  },
  {
    id: "3",
    name: "English Literature",
    startTime: "02:00 PM",
    endTime: "03:30 PM",
    isActive: true,
    students: 30,
  },
  {
    id: "4",
    name: "Computer Science",
    startTime: "04:00 PM",
    endTime: "05:30 PM",
    isActive: false,
    students: 22,
  },
];

const StatusGrid = ({ classes = defaultClasses }: StatusGridProps) => {
  return (
    <div className="w-full bg-background p-6">
      <h2 className="text-2xl font-bold mb-4">Class Status Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {classes.map((classItem) => (
          <TooltipProvider key={classItem.id}>
            <Tooltip>
              <TooltipTrigger>
                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold truncate mr-2">
                      {classItem.name}
                    </h3>
                    <Badge
                      variant={classItem.isActive ? "default" : "secondary"}
                      className={`${classItem.isActive ? "bg-green-500" : "bg-gray-400"}`}
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
    </div>
  );
};

export default StatusGrid;
