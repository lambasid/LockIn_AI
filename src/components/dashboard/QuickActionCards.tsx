import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Calendar, LayersIcon, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const QuickActionCard = ({
  title = "Action Title",
  description = "Action description goes here",
  icon = <LayersIcon className="w-6 h-6" />,
  onClick = () => {},
}: QuickActionCardProps) => (
  <Card
    className="flex flex-col items-center p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white"
    onClick={onClick}
  >
    <div className="rounded-full bg-blue-100 p-4 mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600 text-center">{description}</p>
  </Card>
);

interface QuickActionCardsProps {
  onUploadClick?: () => void;
  onCreateClick?: () => void;
  onManageClick?: () => void;
}

const QuickActionCards = ({
  onUploadClick = () => {},
  onCreateClick = () => {},
  onManageClick = () => {},
}: QuickActionCardsProps) => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Upload Schedule",
      description: "Import your existing schedule from a file",
      icon: <Upload className="w-6 h-6" />,
      onClick: onUploadClick,
    },
    {
      title: "Create Class Schedule",
      description: "Create a new class schedule from scratch",
      icon: <Calendar className="w-6 h-6" />,
      onClick: onCreateClick,
    },
    {
      title: "Manage App Groups",
      description: "Configure and manage application restrictions",
      icon: <LayersIcon className="w-6 h-6" />,
      onClick: () => navigate("/app-groups"),
    },
    {
      title: "Student Network",
      description: "Connect with peers and join discussions",
      icon: <Users className="w-6 h-6" />,
      onClick: () => navigate("/network"),
    },
  ];

  return (
    <div className="w-full bg-gray-50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {actions.map((action, index) => (
          <QuickActionCard
            key={index}
            title={action.title}
            description={action.description}
            icon={action.icon}
            onClick={action.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActionCards;
