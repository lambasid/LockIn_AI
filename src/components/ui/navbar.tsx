import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <Lock className="h-6 w-6" />
          <span className="text-xl font-bold">Lock In</span>
        </button>
      </div>
    </div>
  );
}
