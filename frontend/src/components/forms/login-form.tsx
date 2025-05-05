import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { login, LoginCredentials } from "@/services/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setToken } from "@/store/slices/authSlice";
import { closeDialog } from "@/store/slices/uiSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  setRegister: (register: boolean) => void;
}

const LoginForm = ({ setRegister }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const creds: LoginCredentials = { username, password };
      const { token } = await login(creds);

      dispatch(setToken(token));
      dispatch(closeDialog("login"));
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-4 p-1")}>
      <DialogHeader className="pb-5">
        <DialogTitle className="text-2xl">Login</DialogTitle>
        <DialogDescription>
          Enter your username below to login to your account
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="hitesh-s0lanki"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>

        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Button
            variant="link"
            type="button"
            className="underline underline-offset-4 px-1"
            onClick={() => setRegister(true)}>
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
