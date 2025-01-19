import { Suspense } from "react";
import {
  useRoutes,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./components/home";
import LoginPage from "./components/auth/LoginPage";
import AppGroupScreen from "./components/screens/AppGroupScreen";
import NetworkingScreen from "./components/screens/NetworkingScreen";
import { Navbar } from "./components/ui/navbar";
import routes from "tempo-routes";

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/login";

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/app-groups" element={<AppGroupScreen />} />
        <Route path="/network" element={<NetworkingScreen />} />
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </Suspense>
  );
}

export default App;
