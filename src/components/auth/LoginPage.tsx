import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle authentication here
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-8 bg-white">
        <div className="flex flex-col items-center justify-center">
          <div className="mx-auto w-24 h-24 hover:scale-110 transition-transform duration-300 ease-in-out hover:rotate-6">
            <img
              src="/nfc-lock_10903012.png"
              alt="Lock Icon"
              className="w-full h-full object-contain animate-bounce"
            />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">LockIn</h2>
          <p className="mt-2 text-sm text-muted-foreground text-center">
            Sign in to manage your class schedules and app restrictions
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                type="button"
                variant="link"
                className="text-sm text-primary"
              >
                Forgot password?
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                Don't have an account?{" "}
              </span>
              <Button
                type="button"
                variant="link"
                className="text-sm text-primary"
                onClick={() => navigate("/dashboard")}
              >
                Sign up
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
